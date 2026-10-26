"""Local HTTP integration checks. Does not contact payment or email providers."""
import urllib.request, urllib.error, http.cookiejar, json
base='http://127.0.0.1:4180'
jar=http.cookiejar.CookieJar();client=urllib.request.build_opener(urllib.request.HTTPCookieProcessor(jar))
def req(path,body=None,auth=False,origin=None):
 headers={}
 if body is not None:headers['Content-Type']='application/json'
 if origin:headers['Origin']=origin
 r=urllib.request.Request(base+path,data=json.dumps(body).encode() if body is not None else None,headers=headers)
 try:
  with (client.open(r) if auth else urllib.request.urlopen(r)) as x:return x.status,x.read().decode()
 except urllib.error.HTTPError as x:return x.code,x.read().decode()
def check(condition,label):
 assert condition,label
 print('PASS',label)
for path in ['/','/collection','/about','/pricing','/subscriptions','/faq','/contact','/cart','/checkout','/checkout/success','/checkout/cancel','/login','/signup','/forgot-password','/terms','/privacy','/licenses','/account','/account/purchases','/account/downloads','/account/customizations','/account/subscriptions','/account/settings','/admin','/personalize/custom','/concepts/forma','/concepts/still-life']:
 status,body=req(path);check(status==200 and 'MK LAB' in body,f'route {path}')
for path in ['/not-a-page','/about/unexpected','/collection/missing','/checkout/unknown','/concepts/missing']:
 check(req(path)[0]==404,f'404 {path}')
check(req('/api/market')[0]==401,'anonymous account API denied')
check(req('/api/market',{'action':'profile','name':'Unauthorized'})[0]==401,'anonymous account write denied')
check(req('/api/download?asset=anything')[0]==401,'anonymous private download denied')
check(req('/api/media/missing')[0]==404,'missing public image 404')
check(req('/signin-with-chatgpt?return_to=%2Faccount',auth=True)[0]==200,'local supported sign-in')
s,body=req('/api/market',auth=True);check(s==200 and 'orders' in json.loads(body),'authenticated account API')
check(req('/api/market',{'action':'product','name':'Unauthorized'},True)[0]==403,'customer cannot manage products')
check(req('/api/market',{'action':'profile','name':'Test'},True,'https://other.example')[0]==403,'cross-origin write rejected')
check(req('/api/market',{'action':'inquiry','name':'Local QA','email':'invalid','body':'short'},True)[0]==400,'invalid inquiry rejected')
s,b=req('/api/market',{'action':'inquiry','name':'Local QA','email':'localqa@example.test','subject':'Local integration test','body':'A local test inquiry. Not an email.'},True);check(s==200,'inquiry persists')
s,b=req('/api/market',{'action':'customize','name':'Local QA design','details':'Change colors for local testing.','options':['Brand colors & typography']},True);check(s==200,'customization persists')
s,b=req('/api/market',auth=True);data=json.loads(b);check(any(x['subject']=='Local integration test' for x in data['inquiries']),'inquiry visible to owner');check(any(x['name']=='Local QA design' for x in data['requests']),'customization visible to owner')
check(req('/api/download?asset=anything',auth=True)[0]==404,'unowned download denied')
check(req('/api/checkout',{'items':['anything']},True)[0]==503,'checkout honestly disabled without credentials')
check(req('/api/webhook',{})[0]==503,'webhook disabled without secret')
check(req('/robots.txt')[0]==200,'robots served')
check(req('/sitemap.xml')[0]==200,'sitemap served')
print('ALL LOCAL HTTP CHECKS PASSED')
