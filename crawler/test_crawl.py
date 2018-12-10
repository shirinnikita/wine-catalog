#!/usr/bin/env python
# coding: utf-8

# In[23]:


food_schema = ('id', 'name', 'seo_name', 'img')
winery_schema = ('id', 'name', 'seo_name')
grapes_schema = ('id', 'name', 'seo_name')
wine_schema = ('id', 'name', 'seo_name', 'style', 'region', 'winery')
vintage_schema = ('id', 'name', 'seo_name', 'year', 'wine', 'img')
style_schema = ('id', 'name')
region_schema = ('id', 'name', 'seo_name', 'country')
country_schema = ('code', 'name')
# style_schema = ('id')
food_pairing_schema = ('style_id', 'food_id')
grapes_pairing_schema = ('style_id', 'grape_id')
# regions = ('id', 'country', 'name_en', 'seo_name', 'name', 'background_image')

def parse_single_vintage(raw):
    
    vintage = raw['vintage']
    wine = vintage['wine']
    winery = wine['winery']
    style = wine['style']
    region = wine['region']
    country = region['country']
    
    # vintage
    vintages[vintage['id']] = {
        'name': vintage['name'],
        'seo_name': vintage['seo_name'],
        'year': vintage['year'],
        'wine': vintage['wine']['id'],
        'img': vintage['image']['variations']['small_square'],
    }
    # wine
    wines[wine['id']] = {
        'name': wine['name'],
        'seo_name': wine['seo_name'],
        'style': style['id'] if style else None,
        'region': region['id'],
        'winery': winery['id'],
    }
    # winery
    wineries[winery['id']] = {
        'name': winery['name'],
        'seo_name': winery['seo_name'],
    }


    
    # regions
    regions[region['id']] = {
        'name': region['name'],
        'seo_name': region['seo_name'],
        'country': country['code'],
    }
    
    # countries
    countries[country['code']] = {
        'name': country['name'],
    }
    

    if style:
        # grapes + pairing
        for grape in style['grapes']:
            grapes_pairings.add((style['id'], grape['id']))
            grapes[grape['id']] = {
                'name': grape['name'],
                'seo_name': grape['seo_name'],
            }
        # style
        styles[style['id']] = {
            'name': style['name'] if style else None,
        }
            
        # food + pairing
        for food in style['food']:
            food_pairings.add((style['id'], food['id']))
            foods[food['id']] = {
                'name': food['name'],
                'seo_name': food['seo_name'],
                'img': food['background_image']['variations']['small'],
            }


# In[24]:


import requests
import time
import json

http_headers = {
'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
'x-requested-with': 'XMLHttpRequest',
'content-type': 'application/json'
}
url = (
    'https://www.vivino.com/api/explore/explore?'
    'country_code=ru&'
    'currency_code=RUB&'
    'grape_filter=varietal&'
    'merchant_id=&'
    'min_rating=1&'
    'order_by=ratings_count&'
    'order=desc&'
    'page={}&'
    'price_range_max=12500&'
    'price_range_min=0'
)
foods = {}
wineries = {}
grapes = {}
wines = {}
vintages = {}
styles = {}
countries = {}
regions = {}
food_pairings = set()
grapes_pairings = set()
n_pages = 10
for i in range(n_pages):
    time.sleep(1)
    r = requests.get(url.format(i),headers=http_headers)
    response = json.loads(r.text)
    for raw in response['explore_vintage']['records']:
        parse_single_vintage(raw)


# In[16]:


def make_formatter(schema):
    def csvy(args):
        k, v = args
        s = [str(k)]
        for col in schema[1:]:
            s.append(str(v[col]) if v[col] else '')
        return '#'.join(s)
    return csvy


# In[26]:


with open('foods.csv', 'w') as f:
    f.write('\n'.join(map(make_formatter(food_schema), foods.items())))
    
with open('style-food.csv', 'w') as f:
    f.write('\n'.join(map(lambda x: '#'.join(map(str, x)), food_pairings)))

with open('styles.csv', 'w') as f:
    f.write('\n'.join(map(make_formatter(style_schema), styles.items())))

with open('vintages.csv', 'w') as f:
    f.write('\n'.join(map(make_formatter(vintage_schema), vintages.items())))

with open('wines.csv', 'w') as f:
    f.write('\n'.join(map(make_formatter(wine_schema), wines.items())))

with open('regions.csv', 'w') as f:
    f.write('\n'.join(map(make_formatter(region_schema), regions.items())))

with open('countries.csv', 'w') as f:
    f.write('\n'.join(map(make_formatter(country_schema), countries.items())))

with open('grapes.csv', 'w') as f:
    f.write('\n'.join(map(make_formatter(grapes_schema), grapes.items())))

with open('wineries.csv', 'w') as f:
    f.write('\n'.join(map(make_formatter(winery_schema), wineries.items())))
    
with open('grapes_pairings.csv', 'w') as f:
    f.write('\n'.join(map(lambda x: '#'.join(map(str, x)), grapes_pairings)))


# In[ ]:




