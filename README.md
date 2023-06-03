<h1 align="center">Botani Scan</h1>
<p align="center">Capstone project bangkit 2023-Cloud computing</p>

Botani Scan Web Service is a cutting-edge platform that allows users to accurately predict plant diseases by simply uploading images of plant leaves. Currently, the service is undergoing development and is set to introduce new features in the near future. The initial release includes three key features: Pepper Leaf Disease Prediction, Corn Leaf Disease Prediction, and Potato Leaf Disease Prediction.

To ensure secure access to the service, authentication is required. Users must log in using their email and password. If you are new to the platform, you can easily register through the registration service. We kindly request that you refrain from spamming the registration service to maintain its optimal performance.

We appreciate your cooperation and eagerly anticipate providing you with an enhanced experience as we continue to update and expand the service.

## Team Profile
Team ID : C23-PS159 \
\
Our Member : 
1. (ML) Fitrahuda Aulia (M284DSY2506) - Universitas Negeri Medan
2. (ML) Aissa Putri Pertiwi (M295DSY2469) - Universitas Padjadjaran
3. (ML) Carica Deffa Yullinda ( M169DSY2146) - Universitas Gadjah Mada
4. (CC) Rifqi Naufal (C146DSX0903) – Universitas Bengkulu
5. (CC) Rivaldi Arta Wijaya (C146DSX0901) - Universitas Bengkulu
6. (MD) Muhammad Nur Salim (A361DSX3176) – Universitas Terbuka

## Another Github
1. Machine Learning
> https://github.com/caricadeffa/ML_BotaniScan_C23-PS159
2. Mobile Development
> https://github.com/nursalim92/MD_BotaniScan_C23-PS159

## The service available:
> Base url of this service is: http://localhost:4000/
- Authentications
  <pre>POST /login</pre>
  <pre>POST  /register</pre>
  <pre>POST  /refresh</pre>

- User
  <pre>GET  /user</pre>
  <pre>PUT  /user/{userI</pre>

- Predictions (under development)
  <pre>POST /prediction/potato</pre>
  <pre>POST /prediction/peppers</pre>
  <pre>POST /predictions/corn</pre>

- History (under development)
  <pre>GET  /history/</pre>
  <pre>GET  /history/{historyId}</pre>
  <pre>POST /history</pre>
  <pre>DEL  /history/{historyId}</pre>

- Plant
  <pre>GET   /plants</pre>
  <pre>POST  /plants</pre>
  <pre>PUT   /plants/{plantId}</pre>
  <pre>GET   /plants/{plantId}</pre>
  <pre>DEL   /plants/{plantId}</pre> 

- Diseases
  <pre>GET   /disease</pre>
  <pre>POST  /disease</pre>
  <pre>PUT   /disease/{diseaseId}</pre>
  <pre>GET   /disease/{diseaseId}</pre>
  <pre>DEL   /disease/{diseaseId}</pre>

- Recomendation Store
  <pre>GET   /store</pre>
  <pre>POST  /store</pre>
  <pre>PUT   /store/{storeId}</pre>
  <pre>GET   /store/{storeId}</pre>
  <pre>DEL   /store/{storeId}</pre>

# Quick Look

## Authentications

This service utilizes token-based authentication, requiring users to have an account for accessing its features. If you don't have an account, please create a new one. Once registered, you can generate an authentication token. This token serves as a means of logging in, requiring you to authenticate yourself using your email and password. If the authentication is successful, you will receive an access token, enabling you to access the service. If the authentication fails, an error message will be displayed.

The provided tokens are the accessToken and refreshToken. The refreshToken is used for token refreshing purposes. To refresh the token, you must send the refreshToken to the service. If the refreshToken is valid, a new accessToken will be provided. If the refreshToken is invalid, an error message will be returned.

By following this authentication process, you can securely access the service and enjoy its functionalities.

## Instructions
This project run in node js version 18.13.0. 
1. Install all dependencies with
```bash
npm install
```
2. Make your database and export from database/botaniscan.sql
3. Run server:
<P>-development<p>

```bash
npm run start-dev
```
<p>-production<p>

```bash 
npm run start  
```

## Environment

In order to run this project, you need to configure the following environment variables:

```bash

PORT= {your server port}

# Database Configuration MySQL
DB_HOST= {define your db host}
DB_USERNAME= {define your db username}
DB_PASSWORD= {define your db password}
DB_NAME= {define your db name}

# JWT TOKEN
SECRET_KEY= {define your secret key}
REFRESH_TOKEN_KEY= {define your refresh key}

```

Then you can use the following image to create your own database:
<h2 align="center">Database design</h2>
<a href="">
  <img src="images/Bangkit%20Capstone%20Botaniscan.png" />
</a>
<h2 align="center">ERD</h2>
<p align="center">Databases Design</p>
<a href="">
  <img src="images/ERD%20Bangkit.png" />
</a>
<p align="center">Databases ERD</p>

## Dependency

* [Express Server](https://www.npmjs.com/package/express)
* [JWT](https://www.npmjs.com/package/jsonwebtoken)
* [Bcrypt](https://www.npmjs.com/package/bcrypt)
* [DotEnv](https://www.npmjs.com/package/dotenv)
* [Joi](https://www.npmjs.com/package/joi)
* [Nanoid](https://www.npmjs.com/package/nanoid)
* [Multer](https://www.npmjs.com/package/multer)
* [axios](https://www.npmjs.com/package/axios)
* [mysql2](https://www.npmjs.com/package/mysql2)

## Pull Requests

I'd be happy to review any pull requests that may better the BotaniScan project, in particular if you have a bug fix, enhancement, or a new idea, you can contact us.
