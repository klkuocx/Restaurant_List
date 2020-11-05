# Restaurant List
A simple web application for **_epicure_ to manage favorite restaurants**

## Features
- create an account to manage restaurant list
- read the details of each restaurant
- create new restaurant
- edit restaurant
- delete restaurant
- searching restaurants by name
- sort restaurants by name, category and location

### Account
create an account with your email or Facebook

### Read
Click restaurant card to see details

### Create
user can press "Create" button to add new restaurant

### Edit
user can press "edit" button in index and detail page to edit restaurant

### Delete
user can press "delete" button in index and detail page to delete restaurant

### Search
search the restaurants by name

### Sort
select method to sort restaurants

## Environment SetUp
1. [Node.js](https://nodejs.org/en/) 10.22.0
2. [Express](https://expressjs.com/en/starter/installing.html) 4.17.1
3. [nodemon](https://nodemon.io/) 2.0.4
4. [MongoDB](https://www.mongodb.com/try/download/community) 4.2.9

## Installation and Execution
### Setup MongoDB
1. Turn on the DB
```
[~] $ cd ~/mongodb/bin/
[~/mongodb/bin] $ ./mongod --dbpath ~/mongodb-data
```
2. Create database name "restaurant-list"

### Activate Project
1. Clone this git to local
```
[~] $ git clone https://github.com/klkuocx/Restaurant_List.git
```

2. Get into the directory
```
[~] $ cd Restaurant_List
```

3. Install packages
```
[~/Restaurant_List] $ npm install
```

4. Run the project
```
[~/Restaurant_List] $ npm run seed
[~/Restaurant_List] $ npm run start
```