# movie-backend
다시보기 api 서버

## 개발환경
- IDE : WebStorm
- Framework : nest + fastify
- ORM : mongoDB

## 프로젝트 아키텍쳐
## 주요 기능
- 동영상 다시보기 url 제공

## 실행 가이드(최초)
1. 해당 폴더로 이동
2. npm install
3. tsc
4. cd dist
5. pm2 start app.js --name movie-back

## 실행 가이드(수정사항 적용)
1. 해당 폴더로 이동
2. npm install(npm install 사항이 있을 경우에만 실행)
3. tsc
4. pm2 restart movie-back

Deploy to server use pm2
TS_NODE_PROJECT=./tsconfig.json pm2 start --interpreter ts-node src/server.ts --name movie-backend

PORT=8000
MONGO_URL=mongodb+srv://buitragiabao2016:b83mBRnAhA3npQQr@cluster0.deitt.mongodb.net/
MOVIE_PROVIDER_API=https://moviesapi.m27.shop
MOVIE_PROVIDER_API_KEY=pdhzCBjiwGD9a0ZFVjkIm00Adl95rGU9PobVI9XYzE8U2374vuL80ROgDl220XkchjWPxutITxFkDqsGdVYycDqBsGE9KOMTzOptXFZv8ZFJDpP2OjYbuHa8pHIUQbb7UITA3YpYOGwKGSSLlWYzRmAbhXcJ1hOtttdaYBJlBBc7UkkTuEVQAdpmjb341x
JWT_SECRET=ms27BMajodxIQKyh
JWT_REFRESH_SECRET=PHQv3jjdG2YdMIHN
