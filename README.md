# mevn-login-api

## contents

- [mevn-login-api](#mevn-login-api)
  - [contents](#contents)
  - [introduction](#introduction)
  - [mongo database](#mongo-database)
  - [database deployment using netlify functions](#database-deployment-using-netlify-functions)
  - [creating a `netlify.toml` file](#creating-a-netlifytoml-file)
  - [netlify functions - upgrade `nodejs` first](#netlify-functions---upgrade-nodejs-first)
  - [netlify functions (now with correct version of `nodejs`)](#netlify-functions-now-with-correct-version-of-nodejs)
  - [hosting mongodb on the cloud](#hosting-mongodb-on-the-cloud)
  - [Securing the password](#securing-the-password)
  - [local environment variables](#local-environment-variables)
  - [deploy environment variables to netlify](#deploy-environment-variables-to-netlify)
  - [Fauna alternative to Mongo](#fauna-alternative-to-mongo)
  - [netlify running a build](#netlify-running-a-build)

## introduction

this is the active deployment of the application which is built, step by step, in the repository https://github.com/philanderson888/MEVN/tree/master/projects/login and follows 3 stages.  If you follow the instructions starting with https://github.com/philanderson888/MEVN/tree/master/projects/login/login-01 then https://github.com/philanderson888/MEVN/tree/master/projects/login/login-02 and finally https://github.com/philanderson888/MEVN/tree/master/projects/login/login-03 you can build the application locally.

This then is the active deployment of that application.

The application splits into two parts

1. the back end api
2. the front end vuejs app

in this repository I have built the back end api.  

The deployment of the front end vuejs application will be found at https://github.com/philanderson888/MEVN-login

But that application uses a back-end api and this repository is the active deployment of that.

## mongo database

the api uses mongo database as its permanent storage database.

in order to host the database online we can perform the following steps

## database deployment using netlify functions

to deploy the database on netlify we use the following steps

*Note that at this point I am using instructions given by https://stephencook.dev/blog/netlify-mongodb/ dated `June 2020`*

*Note - There are other options such as using a 3rd party app `Zapier` to connect `Netlify` to `MongoDb` - they have not been explored here but are available at https://zapier.com/apps/mongodb/integrations/netlify*

## creating a `netlify.toml` file

in order to deploy our database we will have to create a script manually to run on the `Netlify` site.  This manual script is created and stored in a file with the extention `toml` which stands for `Tom's Obvious, Minimal Language` belive it or not!  Instructions for it are hosted at https://toml.io/en/. 

So we create our `netlify.toml` file which is hosted in the root of our repository

So let's go to our `VSCode` and at the root level create a new file `netlify.toml`

## netlify functions - upgrade `nodejs` first

actually just interrupting this tutorial to look at basic `netlify functions` as described at https://app.netlify.com/sites/festive-mahavira-894cfd/functions so following the instructions there to get started 

so the instructions are, firstly, to instally the `netlify cli`

run this command with `administrator` privileges from the root directory of your site

```js
yarn add global netlify-cli
```
i actually received this error when installing this command

```
error @netlify/build@18.7.2: The engine "node" is incompatible with this module. Expected version ">=10.18.0". Got "10.15.3"
```

and I verified this by running

```js
node -v
/*
v10.15.3
*/
```

so to rectify this error I firstly uninstall `nodejs` in Windows

In this instance, for `windows`, I had to locate the install package for my old version and download it and point to it in order to be able to uninstall it.  I did this by finding the install package from the [archives](https://nodejs.org/download/release/v10.15.3/) on the internet- you will have to find your own version if this is applicable.

Just to be safe, after uninstalling `nodejs` old version I restarted my computer and the uninstall can be verified if required by running

```js
node -v
/*
node: The term 'node' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
*/
```

so the uninstall is confirmed.

To reinstall `nodejs` I download the version with `latesst features` from `https://nodejs.org/en/` and run the install selecting to install the optional features including `chocolatey`

now the version shows

```js
node -v
/*
v16.8.0
*/
```

so I'm ready to move on again .... !!!  

so back to `netlify functions` again

## netlify functions (now with correct version of `nodejs`)

Now that `nodejs` is later than the version required for `netlify functions` I am free to run this command again as `administrator`

*Note - for some reason my `yarn` command did not work so I'm using instead the `npm` command below here as instructed in the Netlify docs at https://docs.netlify.com/cli/get-started 

```js
npm install -g netlify-cli
netlify
/*
 netlify

⬥ Netlify CLI
Read the docs: https://www.netlify.com/docs/cli
Support and bugs: https://github.com/netlify/cli/issues

Netlify command line tool

VERSION
  netlify-cli/6.7.7 win32-x64 node-v16.8.0

USAGE
  $ netlify [COMMAND]
*/
```

now make sure in `chrome` you are logged in to both `github` where your repository is stored, and `netlify` where your repository is linked to.  For example for this demo my `github` is https://github.com/philanderson888/mevn-login-api and my `netlify` site is deployed from this

In your `powershell` terminal navigate to the root folder of your repository.  We can then easily run

```js
// log in and authorise your site with netlify
netlify link
/*
? How do you want to link this folder to a site? 
Use current git remote origin (https://github.com/philanderson888/mevn-login-api)
Looking for sites connected to 'https://github.com/philanderson888/mevn-login-api'...
Directory Linked
Admin url: https://app.netlify.com/sites/festive-mahavira-894cfd
Site url:  https://festive-mahavira-894cfd.netlify.app
*/
```

Now we can invoke `netlify functions`

```js
netlify functions:create
```

It wasn't completely clear which template to use at this point or how to use `serverless functions` with `netlify` so I turned to the free documentation for help at https://docs.netlify.com/functions/overview/ which leads to this beginner tutorial https://explorers.netlify.com/learn/up-and-running-with-serverless-functions which I'm now following through ...

Serverless means the servers are owned and maintained by someone else's servers

- lower barrier of entry for developers
- very cheap compared with owning and managing servers
- quick to deploy and update
- allows developer to focus on business problems rather than managing servers

limitations

- not good for long processes, around 30 seconds max is good
- stateless
- latency


## hosting mongodb on the cloud

following this video https://www.youtube.com/watch?v=rPqRyYJmx2g on introduction to MongoDB Atlas - hosting MongoDB in the cloud

just create the cluster, initially open the ip for all users (can easily restrict this later) and click to load sample data

now click to connect and choose `connect your application` and make sure the `driver` is set to `nodejs` version `4.0 or later`

we can now copy the connection string and full code

```js
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://dbUser:<password>@cluster0.iilta.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
```

notice that the `dbUser` is your username which you gave when you created the database, and the `<password>` is not shown but can be manually entered

we can actually test if this is working or not by using our local deployment of our `api` if it is available.

so I, yes, have successfully gone to my `local` deployment and added a second line to `db.js`

```js
const { Schema, createConnection } = require('mongoose');
const connection2 = createConnection('mongodb://localhost:27017/mevn-example', { useNewUrlParser: true, useUnifiedTopology: true });
const connection = createConnection('mongodb+srv://dbUser:<password>@cluster0.iilta.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
//...
```

so I'm now able to use and connect to and test my database which is now running not on my local machine but actually in the cloud.  This is amazing and is one of the first steps required to deploy my app.  

## Securing the password

Now I could make my password `plain text` and `unsecured` just for trial purposes but it would be better if we could hide it as we would wish to in a real application.  Let's see if we can add this as a deployment `environment variable` in Netlify.

## local environment variables

to have a look at environment variables let us first see if we can get them working locally

so in the `api` folder of our `login` application we can now type, after stopping our `api` running using `Control-C`

```js
yarn add dotenv
```

this will add the libraries to use a file called `.env` which will hold our `environment variables`, a copy of which can be held locally and a copy of which can be held on the deployment server, in this case `netlify`.

so we create a file in the root of our application called `.env`

```js
VUE_APP_NETLIFY_MONGO_DB_USERNAME=<<dbUser>>
VUE_APP_NETLIFY_MONGO_DB_PASSWORD=<<dbPassword>>
```

and also within `.gitignore` we check that the file `.env` is present so this file does not get pushed to `github` when we push changes

so we are now ready to add environment variables into our app.

in `db.js` our database file we can now modify it as below 

*Note that connection2 is the old connection to our local database which we can still use if we wish.  connection is now the new connection to our online database stored in MongoDb Atlas for free.*

```js
const { Schema, createConnection } = require('mongoose');
const dotenv = require('dotenv').config().parsed
console.log(`mongo db username is ${process.env.VUE_APP_MONGO_DB_USERNAME}`)
console.log(`mongo db password is ${process.env.VUE_APP_MONGO_DB_PASSWORD}`)
const connection2 = createConnection('mongodb://localhost:27017/mevn-example', { useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false });
const connection = createConnection(`mongodb+srv://${process.env.VUE_APP_MONGO_DB_USERNAME}:${process.env.VUE_APP_MONGO_DB_PASSWORD}@cluster0.iilta.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);
```

To test this out we can now log into `cloud.mongodb.com` and find our `cluster` then click to view `collections`. Within `collections` we can now see our tables and our data.

For example our `todos` database shows

```json
{
  "_id":"6129fa5cc95427338c373262",
  "name":"some name",
  "done":true,
  "user":"6120bb923476c31a68ee2629",
  "__v":0
}
```

## deploy environment variables to netlify

so now that we have deployed our environment variables locally, how do we now put those same variables into Netlify?

We simply log in to `Netlify`, find our deployment and in the 


## Fauna alternative to Mongo

Note that Fauna has built-in compatibility with Netlify so makes it ideal for use as a database tool with Netlify.

It has a generous free tier also

https://docs.fauna.com/fauna/current/integrations/netlify.html

## netlify running a build

to deploy our site to `netlify` we should first create a separate github repository for our back end api such as in my example here https://github.com/philanderson888/mevn-login-api 
