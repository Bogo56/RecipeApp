<h1 align="center">
  <br>
  <a href="https://recipe-app-2022.herokuapp.com/#467"><img src="https://res.cloudinary.com/dawb3psft/image/upload/v1647878417/Portfolio/logo.png" alt="RecipeAPP" width="300"></a>
</h1>

<h4 align="center">Personal Project - Creating a Frontend JS App </h4>

<p align="center">
  <a href="https://img.shields.io/badge/Made%20with-JavaScript-yellow"><img src="https://img.shields.io/badge/Made%20with-JavaScript-yellow"></a>
  <a href="https://img.shields.io/badge/Made%20with-Python-blue">
    <img src="https://img.shields.io/badge/Made%20with-Python-blue"
         alt="Gitter">
  </a>
  <a href="https://img.shields.io/tokei/lines/github/Bogo56/RecipeApp">
      <img src="https://img.shields.io/tokei/lines/github/Bogo56/RecipeApp">
  </a>
  <a href="https://img.shields.io/github/languages/count/Bogo56/RecipeApp?color=f">
    <img src="https://img.shields.io/github/languages/count/Bogo56/RecipeApp?color=f">
  </a>
  <a href="https://badgen.net/github/commits/Bogo56/RecipeApp">
    <img src="https://badgen.net/github/commits/Bogo56/RecipeApp">
  </a>
</p>

<p align="center">
  <a href="#about-the-project">About The Project</a> •
  <a href="#check-out-the-project">Check out the Project</a> •
  <a href="#about-the-api">About the API</a> 
</p>

## Built With
###  Languages
<p>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<p>
  
### Frameworks
<p>
<img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white">
</p>

### Databases
<p>
<img src="https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white">
</p>

### Additional Libraries and Technologies
<p>
  <img src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white">
  <img src="https://img.shields.io/badge/OS-Ubuntu-orange?style=for-the-badge">
   <img src="https://img.shields.io/badge/Security-JWT-green?style=for-the-badge">
  <img src="https://img.shields.io/badge/Web Scrape-Pandas-blue?style=for-the-badge">
</p>

## About The Project
Ever since I learned JavaScript, my focus was pointed primarily towards NodeJS ( and Python), since backend development is what I'm most passionate about. After a while I realized that that my frontend skills were lagging behind. I knew that frontend is important (even though I'm not very excited about it). So I decided on upgrading my competencies in using JavaScipt in it's natural habitat 😁 - on the client-side. So I made this App. It'a an SPA (vanilla JS, no React), that renders different recipes. I wanted to make it authentic - so I used bulgarian recipes. I generated the data ( almost 900 recipes) by using python to scrape popular bulgarian cooking websites and modeling that into a database, serving it trough a simple API.

I have **deployed the Flask API on my own Ubuntu 18.04 server**, and the frontend on Heroku (to save some time). You can find the link to the Project in the next section.

## Check out the Project
As I mentioned, I have deployed the frontend part to Heroku - so you can play around with it. Here is the link:
https://recipe-app-2022.herokuapp.com/#467

Login with theese credentials. It will ask them from you once you try to search.

You can log with:
**USERNAME**: "Admin"
**PASSWORD**: "Admin"

Searching is made in bulgarian -  intentionally. I could've scraped an international site and do it all in english - BUT where is the fun in that😁


## Project Workflow
Here, I'm outlining very briefly the phases that the project went trough from start to finish.

### Phase 1 - Creating Data
Before creating the app, I needed some data. In this case I needed a lot of recipes - at least a couple of hundred. So where do I get that data? Well, I actually decided to create it myself, or let's use the term "borrow it"😁 from another site (only for the sake of the project). SOO I did a research on the popular cooking websites in Bulgaria, and chose one with proper structure for scraping. Then I wrote a couple of scripts in Python using the Pandas Library that:
  1.Scraped the summary info of the recipes, shown in the "All Recipes Section", while going trough all results pages - inserting the info into a DB.
  2.Visited every individual recipe page and scraped it's full description and ingredients - updating the recipe data in the DB.
  3.Scraping once more - this time downloading the images (that I later upload on Cloudinary) - updating the recipes with the imgage links in the DB.
  
### Phase 2 - Making Data Accessible
So now that I had the data, I had to make it available to be consumed by another entity - e.g. frontend. So I created a simple API in Flask that delivered the data
to my frontend application.

### Phase 3 - Creating the Frontend
Now that I have laid the foundation, I could start working on the App itself.

### Phase 4 - Deployment
I have deployed the simple Flask API to my own server in the beginning, so I could test the frontend app during development with it.

I deployed the frontend to Heroku - since this would save me some time, with server configuration.
