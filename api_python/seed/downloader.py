import requests
from api_model import RecipeTables
import shutil,time

all_recipes = RecipeTables.get_all()

headers = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) '\
           'AppleWebKit/537.36 (KHTML, like Gecko) '\
           'Chrome/75.0.3770.80 Safari/537.36'}

## Script for downloading all the recipe images
# so they can be uploaded and hosted on "Cloudinary"


def download_img(url, index):
    req = requests.get(url,stream=True,headers=headers)
    if req.status_code == 200 :
        req.raw.decode_content = True
        with open(f"images/recipe_{index}.jpg","wb") as f:
            shutil.copyfileobj(req.raw, f)


if __name__ == "__main__":

    for recipe in all_recipes:
        try:
            download_img(recipe[-3],recipe[0])
            print(f"{recipe[0]} ready")
            time.sleep(1)
        except:
            print(f"Failed for image{recipe[0]}")