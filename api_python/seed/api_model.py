import sqlite3
from pathlib import Path

curr_dir = Path.cwd().joinpath("recipes.db")


class RecipeTables():
    db = curr_dir

    '''
    This is the class that deals with all CRUD operations on the Database.
    '''

    @classmethod
    def create_table(cls):
        con = sqlite3.connect(cls.db)
        cursor = con.cursor()
        cursor.execute("CREATE TABLE IF NOT EXISTS recipes"
                       "(ID INTEGER PRIMARY KEY, "
                       "TITLE TEXT UNIQUE ,DESCRIPTION TEXT,"
                       "TIME TEXT, PRICE INTEGER, IMAGE TEXT,"
                       "HOSTED_IMAGE TEXT, LINK TEXT )")
        con.commit()
        con.close()

    @classmethod
    def create_ing_table(cls):
        con = sqlite3.connect(cls.db)
        cursor = con.cursor()
        cursor.execute("CREATE TABLE IF NOT EXISTS ingredients"
                       "(ID INTEGER PRIMARY KEY,PRODUCT TEXT,QUANTITY TEXT,"
                       "UNIT TEXT,"
                       "RECIPE_ID INTEGER NOT NULL,"
                       "FOREIGN KEY(RECIPE_ID)"
                       "REFERENCES recipes(ID)"
                       "    ON UPDATE CASCADE"
                       "    ON DELETE CASCADE)")
        con.commit()
        con.close()

    @classmethod
    def create_admin(cls):
        con = sqlite3.connect(cls.db)
        cursor = con.cursor()
        cursor.execute("CREATE TABLE IF NOT EXISTS user"
                       "(ID INTEGER PRIMARY KEY,NAME TEXT,PASSWORD TEXT)")
        con.commit()
        cursor.execute("DELETE FROM user")
        con.commit()
        cursor.execute("INSERT INTO user (NAME,PASSWORD) VALUES(?,?);",("Admin","Admin"))
        con.commit()
        con.close()

    @classmethod
    def insert_many(cls,recipes_list):
        con = sqlite3.connect(cls.db)
        cursor = con.cursor()
        cursor.executemany('INSERT INTO recipes(TITLE,DESCRIPTION,TIME,PRICE,IMAGE,LINK) VALUES(?,?,?,?,?,?);',recipes_list)
        con.commit()
        con.close()

    @classmethod
    def insert_one(cls, recipe):
        con = sqlite3.connect(cls.db)
        cursor = con.cursor()
        cursor.execute('INSERT INTO recipes(TITLE,DESCRIPTION,TIME,PRICE,IMAGE,LINK) VALUES(?,?,?,?,?,?);', recipe)
        con.commit()
        con.close()

    # I have deployed the images to my own hosting environment - "Cloudinary" so that they will
    # be available all the time. Here I'm updating the recipes with the hosted image links.
    @classmethod
    def add_hosted_img(cls,img_list):
        con = sqlite3.connect(cls.db)
        cursor = con.cursor()
        cursor.executemany('UPDATE recipes SET HOSTED_IMAGE = ? WHERE ID = ? ;', img_list)
        con.commit()
        con.close()

    @classmethod
    def get_all(cls):
        con = sqlite3.connect(cls.db)
        cursor = con.cursor()
        cursor.execute('SELECT * FROM recipes')
        all_recipes = cursor.fetchall()
        con.commit()
        con.close()
        return  all_recipes

    @classmethod
    def search_recipe(cls, keyword):
        with sqlite3.connect(cls.db) as conn:
            result = conn.cursor().execute("SELECT * FROM recipes WHERE TITLE LIKE ? ", ("%" + keyword[:8] + "%",))
            return result.fetchall()

    @classmethod
    def find_recipe_by_id(cls, id):
        with sqlite3.connect(cls.db) as conn:
            result = conn.cursor().execute("SELECT * FROM recipes WHERE ID=?", (id,))
            return result.fetchone()

    @classmethod
    def find_ing_by_id(cls, id):
        with sqlite3.connect(cls.db) as conn:
            result = conn.cursor().execute("SELECT * FROM ingredients WHERE RECIPE_ID=?", (id,))
            return result.fetchall()

    @classmethod
    def insert_ingredients(cls,ing_list):
        with sqlite3.connect(cls.db) as conn:
            conn.cursor().executemany("INSERT INTO ingredients(RECIPE_ID,PRODUCT,QUANTITY,UNIT) VALUES(?,?,?,?);", ing_list)
            conn.commit()

    @classmethod
    def get_all_info(cls,id):
        with sqlite3.connect(cls.db) as conn:
            result = conn.cursor().execute('''SELECT recipes.ID,TITLE
                                            ,HOSTED_IMAGE,LINK,TIME,PRICE
                                            ,PRODUCT,QUANTITY,UNIT
                                      FROM recipes 
                                      LEFT JOIN ingredients ON 
                                          recipes.ID = ingredients.RECIPE_ID 
                                      WHERE recipes.ID = ?;''', (id,))

            return result.fetchall()

    @classmethod
    def get_admin(cls,username):
        with sqlite3.connect(cls.db) as conn:
            result = conn.cursor().execute("SELECT * FROM user WHERE NAME = ?;", (username,))
            return result.fetchone()

    @classmethod
    def delete_all(cls):
        con = sqlite3.connect(cls.db)
        cursor = con.cursor()
        cursor.execute("DELETE FROM recipes")
        con.commit()
        con.close()
