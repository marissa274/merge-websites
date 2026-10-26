"""Local-only fixture tests. Requires .dev.vars test admin and test webhook secret."""
import urllib.request,urllib.error,http.cookiejar,json,sqlite3,pathlib,time,hmac,hashlib
base='http://127.0.0.1:4180';jar=http.cookiejar.CookieJar();client=urllib.request.build_opener(urllib.request.HTTPCookieProcessor(jar))
def request(path,body=None,headers=None,auth=True):
 headers=headers or {}
 if isinstance(body,dict):body=json.dumps(body,separators=(',',':')).encode();headers['Content-Type']='application/json'
 r=urllib.request.Request(base+path,data=body,headers=headers)
 try:
  with (client.open(r) if auth else urllib.request.urlopen(r)) as x:return x.status,x.read(),x.geturl()
 except urllib.error.HTTPError as x:return x.code,x.read(),x.geturl()
def check(v,label):
 assert v,label
 print('PASS',label,flush=True)
request('/signin-with-chatgpt?return_to=%2Faccount')
check(b'Behind the collection.' in request('/admin')[1],'authorized admin surface')
s,b,_=request('/api/market',{'action':'product','slug':'qa-private-fixture','name':'Local QA fixture','description':'Local-only delivery integration fixture, never deployed as inventory.','category':'Local tests','price':'12.50','license':'Single website','published':True,'featured':False});check(s==200,'admin creates listing');pid=json.loads(b)['id']
check(b'Local QA fixture' in request('/collection/qa-private-fixture')[1],'published listing is discoverable')
def upload(kind,filename,data,mime):
 boundary='mek-local-qa-boundary';fields={'productId':pid,'kind':kind};body=b''
 for k,v in fields.items():body+=f'--{boundary}\r\nContent-Disposition: form-data; name="{k}"\r\n\r\n{v}\r\n'.encode()
 body+=f'--{boundary}\r\nContent-Disposition: form-data; name="file"; filename="{filename}"\r\nContent-Type: {mime}\r\n\r\n'.encode()+data+f'\r\n--{boundary}--\r\n'.encode()
 return request('/api/market',body,{'Content-Type':f'multipart/form-data; boundary={boundary}'})
s,b,_=upload('image','local.jpg',pathlib.Path('public/architecture.jpg').read_bytes(),'image/jpeg');check(s==200,'public preview upload');imageid=json.loads(b)['id'];check(request('/api/media/'+imageid,auth=False)[0]==200,'public preview can be viewed')
s,b,_=upload('asset','qa-delivery.txt',b'Private MEK LAB local QA delivery.','text/plain');check(s==200,'private delivery upload');assetid=json.loads(b)['id']
check(request('/api/download?asset='+assetid)[0]==404,'delivery denied before confirmed purchase')
files=list(pathlib.Path('.wrangler/state').rglob('*.sqlite'));conn=None
for p in files:
 c=sqlite3.connect(p)
 if c.execute("SELECT name FROM sqlite_master WHERE name='orders'").fetchone():conn=c;break
 c.close()
assert conn is not None
now=int(time.time()*1000);oid='qa-order-'+str(now);eventid='evt_local_qa_'+str(now);sessionid='cs_local_qa_'+str(now)
conn.execute('INSERT INTO orders (id,user_id,status,subtotal,currency,session_id,created_at) VALUES (?,?,?,?,?,?,?)',(oid,'local_seedy','pending',1250,'cad',sessionid,now))
conn.execute('INSERT INTO order_items (id,order_id,product_id,name,license,price) VALUES (?,?,?,?,?,?)',(oid+'-item',oid,pid,'Local QA fixture','Single website',1250))
conn.execute('INSERT OR IGNORE INTO users (id,email,name,created_at) VALUES (?,?,?,?)',('local_other','other@example.test','Other local QA owner',now))
conn.execute('INSERT INTO customizations (id,user_id,name,details,status,created_at) VALUES (?,?,?,?,?,?)',(oid+'-other','local_other','Other owner secret','This must never appear in the first account','Pending',now));conn.commit()
body={'id':eventid,'type':'checkout.session.completed','data':{'object':{'id':sessionid,'mode':'payment','payment_status':'paid','metadata':{'order_id':oid},'currency':'cad','amount_subtotal':1250,'amount_total':1250,'payment_intent':'pi_local_qa_'+str(now)}}}
raw=json.dumps(body,separators=(',',':')).encode();ts=str(int(time.time()));sig=hmac.new(b'local_qa_webhook_secret',ts.encode()+b'.'+raw,hashlib.sha256).hexdigest();headers={'Content-Type':'application/json','Stripe-Signature':f't={ts},v1={sig}'}
check(request('/api/webhook',raw,{'Content-Type':'application/json'},False)[0]==400,'unsigned payment event rejected')
check(request('/api/webhook',raw,headers,False)[0]==200,'signed payment event confirms order')
check(request('/api/webhook',raw,headers,False)[0]==200,'duplicate payment event acknowledged safely')
check(conn.execute('SELECT count(*) FROM payments WHERE order_id=?',(oid,)).fetchone()[0]==1,'duplicate event creates one payment')
s,b,url=request('/api/download?asset='+assetid);check(s==200 and b'Private MEK LAB' in b,'verified owner receives private file')
check(request(url.replace(base,''))[0]==410,'download token single-use')
state=json.loads(request('/api/market')[1]);check(not any(r['name']=='Other owner secret' for r in state['requests']),'another customer request is isolated')
check(any(r['id']==oid and r['status']=='paid' for r in state['orders']),'confirmed order appears in owner account')
s,b,_=request('/api/market',{'action':'product','id':pid,'slug':'qa-private-fixture','name':'Local QA fixture','description':'Local-only fixture','category':'Local tests','price':'12.50','license':'Single website','published':False});check(s==200,'admin unpublishes listing');check(request('/collection/qa-private-fixture')[0]==404,'unpublished listing hidden')
s,b,_=request('/api/market',{'action':'export'});check(s==200 and any(o['id']==oid for o in json.loads(b)['records']),'admin sales export contains verified order')
conn.close();print('ALL LOCAL ADMIN / DELIVERY CHECKS PASSED',flush=True)
