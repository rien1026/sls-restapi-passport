# sls-restapi-passport
It's RESTFul API with passport by Serverless framework. With Typescript, Node, AWS Lambda, Koa.

## Explanation
### 1. Root folder tree
```
src             # source codes
.env            # environment variables for dev serverless deploy
.env.local      # environment variables for local start
.gitignore      # gitignore
package.json    # packages, scripts, project infos.
serverless.yml  # serverless configration (AWS)
tsconfig.json   # typescript compile options
```
### 2. Src Folder tree
```
src
  ㄴcomponents   
    ㄴUser
      -index.ts
      -User.ts            # Model
      -UserController.ts  # Router functions
      -UserService.ts     # Adapter functions
      -UserErrCode.ts     # err codes about User
  ㄴconfigs
    -index.ts
    -SwaggerConfig.ts     # API document
    -PassportConfig.ts    # init passport
  ㄴutils
    -index.ts       
    -Logger.ts            # Global Logger
    -Constants.ts         # Global Variables
    -AppError.ts          # Centralized error class
    -HTTPResCodes         # Common HTTP response codes
  -app.ts
```

## Usage
### 1. Prefare AWS Account for Serverless Framework
https://github.com/rien1026/document/blob/master/ServerlessWithAWS.md
### 2. Install Serverless Framework
```
npm i -g serverless
```
### 3. Install Packages
```
npm i
```
### 4. Local Start 
```
npm run start 
or
npm run watch
```
### 5. Fill Environment Values
```
vi .env

# SOCIAL_CONFIG
SOCIAL_CONFIG_CLIENT_ID_NAVER = CLIENT_ID_NAVER
SOCIAL_CONFIG_CLIENT_SECRET_NAVER = CLIENT_SECRET_NAVER
SOCIAL_CONFIG_CALLBACK_URL_NAVER = /app/login/naver

SOCIAL_CONFIG_CLIENT_ID_FACEBOOK = CLIENT_ID_FACEBOOK
SOCIAL_CONFIG_CLIENT_SECRET_FACEBOOK = CLIENT_SECRET_FACEBOOK
SOCIAL_CONFIG_CALLBACK_URL_FACEBOOK = /app/login/facebook

SOCIAL_CONFIG_CLIENT_ID_KAKAO = CLIENT_ID_KAKAO
SOCIAL_CONFIG_CALLBACK_URL_KAKAO = /app/login/kakao

SOCIAL_CONFIG_CLIENT_ID_GOOGLE = CLIENT_ID_GOOGLE
SOCIAL_CONFIG_CLIENT_SECRET_GOOGLE = CLIENT_SECRET_GOOGLE
SOCIAL_CONFIG_CALLBACK_URL_GOOGLE = /app/login/google

SOCIAL_CONFIG_SUC_LOGIN_URL = /signin/auth
SOCIAL_CONFIG_FAIL_LOGIN_URL = /signin
```
### 6. Deploy
```
sls deploy
```
### 7. Usage
```
# deploy usage
METHOD : GET
URL : https://[your-amazon-lambda-endpoint]/dev/login/kakao
URL : https://[your-amazon-lambda-endpoint]/dev/login/facebook
URL : https://[your-amazon-lambda-endpoint]/dev/login/google
URL : https://[your-amazon-lambda-endpoint]/dev/login/naver

# local api-docs
http://localhost:3000/app/api-docs
```
#### POSTMAN Example
