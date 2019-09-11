# nodejs-api-jobs

> In this project i use free trial (14 days) ElasticSearch, so if the account is expired you can make apply free trial and change config for elastic

####  Library
- Node Js
- Elastic Search
- Redis
- Bluebird
- Moongose (MongoDB)
- cron
- JWT

####  Prepare this before continue
- Redis have to installed in your local PC/Laptop
- MongoDB have to installed
- NPM and Node.js version v8.11.4
####  Installation


```
> git clone https://github.com/bagus123/nodejs-api-jobs.git

> npm install

> npm start
```



#### Structure
```.
.
├── config                  # App configuration files
│   ├── default.js          # default config
│   ├── production.js       # production config
│   ├── development.js      # development config
│   └── ...                 # Other configurations
├── middlewares             # Request middlewares
├── controllers             # Request managers
│   ├── api
│   ├── admin
├── routes                  # Define routes and middlewares here
├── services                # Business logic implementations
│   ├── api
│   └── admin
│   └── ...                 # Other services
├── db                      # Data access stuff
│   ├── models              # Models
│   ├── migrations          # Migrations
│   ├── seeds               # Seeds
├── utils                   # Util libs (formats, validation, etc)
├── tests                   # Testing
├── scripts                 # Standalone scripts for dev uses
├── package.json           
├── README.md         
└── app.js                  # App starting point
 ```


#### Controllers
- Don’t put your business logic inside the controllers!!

#### Services
 - Don’t pass the req or res object to the service layer
 - Don’t return anything related to the HTTP transport layer like a status code or headers from the service layer.

#### API
```
POST {{url}}/auth/register
body:
{
	"name":"John Doe",
	"email":"johndoe@gmail.com",
	"password":"123"
}

response:
{
    "status": "Success",
    "statusCode": 200,
    "data": {
        "user": {
            "role": "USER",
            "_id": "5d751fe9abc3b4411c31264d",
            "name": "John Doe",
            "email": "johndoe@gmail.com",
            "__v": 0
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDc1MWZlOWFiYzNiNDQxMWMzMTI2NGQiLCJpYXQiOjE1Njc5NTY5NjksImV4cCI6MTU3NjU5Njk2OX0._EiUv3Oa93N3mZIOnDDFQIN-fgRKOwoNkN-1kKVBHd4"
    }
}

Login as ADMIN
POST {{url}}/auth/login

body:
{
	"email":"jobdb.sa@gmail.com",
	"password":"123456"
}

response:
{
    "status": "Success",
    "statusCode": 200,
    "data": {
        "user": {
            "role": "ADMIN",
            "_id": "5d787aee97045122d46146dc",
            "name": "superAdmin",
            "email": "jobdb.sa@gmail.com",
            "__v": 1
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDc4N2FlZTk3MDQ1MTIyZDQ2MTQ2ZGMiLCJpYXQiOjE1NjgxNzcwNTV9.5VeEV0nHtAmMdWIEsb8q7g7f5zNyrhHuV_Tc704PXcQ"
    }
}

GET {{url}}/api/v1/user

headers:
- token : [token from login]

reponse:
{
    "status": "Success",
    "statusCode": 200,
    "data": {
        "user": {
            "role": "USER",
            "_id": "5d751fe9abc3b4411c31264d",
            "name": "John Doe",
            "email": "johndoe@gmail.com",
            "__v": 1
        }
    }
}



// get job detail by job _id
GET {{url}}/admin/v1/job/{{jobId}}

// create job
POST {{url}}/admin/v1/job

// update job
PUT {{url}}/admin/v1/job/{{jobId}}

// delete job
DELETE {{url}}/admin/v1/job/{{jobId}}

// search job by elasticSearch
GET {{url}}/api/v1/job/search?q=&page=1



 ```









#### API List in Postman
You can downloand [here](https://www.getpostman.com/collections/fed469752e232ae0b55d "here")