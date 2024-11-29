# ITEC 4010 Project - Deliverable 3
### Group Members: 
- Faraaz Abdul - 218099655
- Samir Patel - 218034876
- Krystian Ivach - 219008465
- Shaun Pangilinan - 218023044

**All Executable Files are within the QuickWhip Folder**
# Documentation
## **index.html:**

The index.HTML is the main landing page of the QuickWhip website! It is where everything else begins! It features dynamic scrolling for easy navigation so that the user can get a warm, welcoming introduction to the best car rental search engine ever made! With mind blowing statistics, easy to follow instructions and testimonials from some high profile clients, the home page is what makes the user’s mind up about choosing us with full confidence! With easy navigation to the rent-a-car page and contact information listed at the bottom, a home page has never been so accessible and convincing to all users! Once the user clicks the Rent-a-car button on the top right of the home page, the user will be navigated to the car selection page. 


## **rent-a-car.html:**

The rent-a-car.html page displays the dropdown list of makes, models, years, colours and rates of the vehicles available for rent. Once a make and model is selected, the page will display the vehicle selected. If no make or model is selected, the page will display a variety of vehicles available for rent. Once the user clicks the reserve now button, they will be brought to a page where they can complete the transaction to reserve the vehicle. 


## **script.js:**

This .js file is responsible for the following:
- Populating our dropdown menus and data inside our dropdown menus.
- Dynamically updating the “Model” dropdown to update depending on the “Make” that is selected.
- Querying vehicles depending on the selections chosen in the filter.
- Sorting functionality to sort price from low to high or vice versa.
- Event listeners for when users interact with with dropdown menu and “Search” button

## **server.js:**

Server.js creates an Express server which hosts the website over Port 3000. Server.JS also grabs the MongoDB URI from the .env file which creates an instance of the MongoDB in our code, which we use to pull data directly from our database. Our database is hosted on the cloud version of MongoDB. This file handles all communication between the database and our server. This file uses the GET method to retrieve car data from the database. This data is then used to populate the drop downs on the rent-a-car html page. This file contains methods for querying the database based on certain parameters, by make, model, color, year. 
