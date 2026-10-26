"""Read-only local HTTP checks for the MK LAB Home/Collection redesign."""
import urllib.request,re
base='http://127.0.0.1:4180'
def html(path):
 with urllib.request.urlopen(base+path) as r:
  assert r.status==200,path
  return r.read().decode()
home=html('/')
for text in ['Websites that','make you','look twice','Find your vibe.','About MK LAB','Request a Custom Website','Good design','Explore More','View Our Collection','Pause motion','Switch to light theme']:
 assert text in home,text
assert 'data-theme="dark"' in home
assert 'hero-bubble' not in home and 'scroll-orbit' not in home and 'cta-sculpture' not in home
assert 'Independent minds.' not in home and 'Creative studio + digital marketplace' not in home
assert 'cinematic-home' in home and 'water-footer' in home
assert 'home-mosaic-gallery' in home and 'hero-line-mask' in home
assert home.count('data-work="study-') == 6
assert 'cinema-stage' not in home
assert home.index('magnetic-hero') < home.index('home-mosaic-gallery') < home.index('vibe-section')
assert 'data-story-drop' not in home and 'data-water-wave' not in home and 'data-splash-fan' not in home
assert 'liquid-stage' not in home and 'data-liquid-outline' not in home
assert 'Disturb water surface' not in home and 'vibe-surface' in home
assert 'We create websites' in home and 'impossible to ignore.' in home
assert 'mosaic-site-muse' in home and 'lucide-gamepad' in home and 'mosaic-site-offgrid' in home
print('PASS cinematic hero, no water effect, accessible motion control, premium pills and retained bento compositions')
assert 'Designed to stand out.<br' not in home
for slug in ['muse','offgrid','sunday','studio-09']:
 assert '/concepts/'+slug in home
 assert 'Concept · preview only' in home
 assert slug in html('/concepts/'+slug)
print('PASS Home mosaic directly after hero, six featured concept covers, dark default and detail routes')
collection=html('/collection?category=Beauty&sort=price-low')
for text in ['v2-search','discovery-icon','aria-expanded="false"','Filters','From the playground.']:
 assert text in collection,text
assert 'collection-shelf' in collection
print('PASS Collection poster shelf, icon search and compact filter trigger')
for path in ['/about','/pricing','/account','/cart','/checkout','/concepts/forma','/concepts/still-life']:
 assert 'MK LAB' in html(path),path
print('PASS existing route ownership and MK LAB identity retained')
css=html('/app/expressive.css')
for text in ['prefers-reduced-motion','data-motion','max-width:39.99rem','backdrop-filter','vibe-equalizer']:
 assert text in css,text
print('PASS motion fallback and responsive rules delivered; browser rendering NOT verified')
motion_css=html('/app/cinematic.css')
for text in ['prefers-reduced-motion','data-motion','22.49rem','vibe-bar:focus-visible','cinema-grid']:
 assert text in motion_css,text
print('PASS static fallback, narrow-mobile layout and keyboard focus rules delivered')

assert 'collection-atmosphere' not in home
assert 'compact-filter-panel' not in collection
for slug in ['aura','mono','roam','pulse','gallery-18','casa']:
 assert 'mockup-'+slug in html('/concepts/'+slug)
 assert slug in html('/personalize/custom?concept='+slug)
assert html('/collection').count('data-work="study-') == 9
assert 'mockup-mono' in html('/collection?category=Music')
print('PASS six new concept routes, personalization context, nine-item initial shelf and no Home atmosphere')
