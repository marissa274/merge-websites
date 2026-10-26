"""Read-only checks against the local preview; no product inventory is created."""
import urllib.request, urllib.error
base='http://127.0.0.1:4180'
def get(path):
 with urllib.request.urlopen(base+path) as response:
  assert response.status == 200
  return response.read().decode()
for slug in ['muse','offgrid','sunday','studio-09','forma','still-life','aura','mono','roam','pulse','gallery-18','casa']:
 page=get('/concepts/'+slug)
 for value in ['website-detail','detail-hero-stage','detail-hero-purchase','About This Website.','make-it-yours','not for sale','Watch Website Demo']:
  assert value in page,(slug,value)
 assert page.index('detail-hero-stage') < page.index('detail-final-offer')
 assert '/personalize/custom?concept='+slug in page
 assert 'Buy Now' in page
 assert 'See it in motion.' not in page
 assert 'collage' not in page
 assert 'data-device="desktop"' in page and 'laptop-base' in page and page.count('class="concept-site') >= 5 and 'coming soon' not in page
 assert 'private/' not in page
 print('PASS editorial study /concepts/'+slug)
page=get('/contact?demo=muse&concept=1')
assert 'Private demo: MUSE' in page and 'private demo of MUSE (muse)' in page
assert 'demo%3Dmuse' in page,'sign-in retains inquiry context'
assert 'MUSE' in get('/personalize/custom?concept=muse')
for path in ['/collection/not-a-real-product','/api/media/not-a-public-image']:
 try: get(path);raise AssertionError(path)
 except urllib.error.HTTPError as error: assert error.code==404
print('PASS contextual demo inquiry/sign-in, personalization and nonexistent/private media boundary')
