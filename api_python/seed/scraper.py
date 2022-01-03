import time
import requests
from bs4 import BeautifulSoup as bs
from api_model import RecipeTables

headers = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) '\
           'AppleWebKit/537.36 (KHTML, like Gecko) '\
           'Chrome/75.0.3770.80 Safari/537.36'}


# Base url template, to navigate all pages
url_template="https://matekitchen.com/recipes/page/{}/"
all_urls=[url_template.format(n) for n in range(1,81)]

# Base image URL for getting the hosted images
image_url_template= "https://res.cloudinary.com/dawb3psft/" \
                    "image/upload/v1640261818/Recipes_Project-API/recipe_{}.jpg"


''' 
Code I used to scrape recipe elements and bundle
them together in single Array, so they can be imported easily
to the database.
'''

'''Helper function to make code look more readable'''
# def formats(el):
#     res= (el.text).strip()
#     return res


# def get_recipe_data(url):
#     data=requests.get(url,headers=headers)
#     soup = bs(data.text,"html.parser")
#     recipes_details = soup.select(".recipe-body")
#     recipes_meta_info =  soup.select(".recipe-meta")
#     recipes_links = soup.select(".format-standard")
#     image_urls = map(lambda x:
#                      x.img["data-lazy-src"].replace("1200x819","600x409"),
#                     recipes_links)
#     recipe_urls=map(lambda x: x.a["href"],recipes_links)
#     formated_recipes= [(formats(recipe.h3),
#                         formats(recipe.p)) for recipe in recipes_details]
#     formated_meta_info = [(formats(meta.time),
#                            float(formats(meta.find(class_='recipe-total-amount'))) /
#                            float(formats(meta.find(class_='col-xs-2')))) for meta in recipes_meta_info]
#     final_list = map(lambda x,y,z,d: x + y + (z,) + (d,),
#                      formated_recipes,
#                      formated_meta_info,
#                      image_urls,
#                      recipe_urls)
#     return list(final_list)


'''Code I used to feed the data to the Database'''

# RecipeTables.create_admin()
# RecipeTables.delete_all()
# RecipeTables.create_table()
# counter=0
#
# for url in all_urls:
#     try:
#         res = get_recipe_data(url)
#         for recipe in res:
#             try:
#                 RecipeTables.insert_one(recipe)
#                 print(recipe[0])
#             except:
#                 print(f"Did not make it for {recipe[1]}")
#         counter += 1
#         print(counter)
#     except:
#         print(f"URL FAIL {url}")
#     time.sleep(2)




''' 
Code I used to scrape the ingredients(located separately on each individual recipe webpage)
They are inserted to the DB on a separate table, that contains as foreign key the recipe ID
'''

''' A helper function '''
# def get_text(ingrs):
#     res = map(lambda el:el.text,ingrs)
#     res=list(res)
#     if len(res)<3:
#         for n in range(3-len(res)):
#             res.append(None)
#     return list(res)

# RecipeTables.create_ing_table()

# def get_ingredients(recipe_id,url):
#     data=requests.get(url,headers=headers)
#     span_classes= ["recipe-product-name","recipe-measurement","recipe-unit"]
#     soup = bs(data.text,"html.parser")
#     recipes_ingredients = soup.find("ul",class_="recipe-ingredients")
#     recipes_ingredients = recipes_ingredients\
#         .find_all("li",class_="recipe-ingredient")
#     recipes_ingredients = [rec.span.find_all("span",class_=span_classes) for rec in recipes_ingredients]
#     recipes_ingredients = [[recipe_id] + get_text(el) for el in recipes_ingredients]
#
#     return recipes_ingredients


''' 
Waiting on every 5th and 9th request, to prevent the server from overloading. 
Also to prevent potential IP block. 
'''
# all_recipes = RecipeTables.get_all()
# for recipe in all_recipes:
#     if recipe[0]%5 == 0:
#         time.sleep(2)
#         print(f"Waiting 2s at {recipe[0]}")
#     if recipe[0]%9 == 0:
#         time.sleep(1)
#         print(f"Waiting 1s at {recipe[0]}")
#     try:
#         ingredients_list = get_ingredients(recipe[0],recipe[-1])
#         RecipeTables.insert_ingredients(ingredients_list)
#         print(f"Recipe {recipe[0]}")
#     except:
#         print(f"Failed for Recipe {recipe[0]}")




''' 
Code I used to update and add the hosted images urls
(which I uploaded to 'Cloudinary' after downloading them in 'downloader.py')
to the Database. 
'''

# all_recipes = RecipeTables.get_all()
# hosted_images=[]
# for recipe in all_recipes:
#     hosted_images.append( (image_url_template.format(recipe[0]),recipe[0]) )
#
# RecipeTables.add_hosted_img(hosted_images)

