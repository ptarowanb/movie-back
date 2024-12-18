# movie-backend

Deploy to server use pm2
TS_NODE_PROJECT=./tsconfig.json pm2 start --interpreter ts-node src/server.ts --name movie-backend


PORT=8000
MONGO_URL=mongodb+srv://buitragiabao2016:b83mBRnAhA3npQQr@cluster0.deitt.mongodb.net/
MOVIE_PROVIDER_API=https://moviesapi.m27.shop
MOVIE_PROVIDER_API_KEY=pdhzCBjiwGD9a0ZFVjkIm00Adl95rGU9PobVI9XYzE8U2374vuL80ROgDl220XkchjWPxutITxFkDqsGdVYycDqBsGE9KOMTzOptXFZv8ZFJDpP2OjYbuHa8pHIUQbb7UITA3YpYOGwKGSSLlWYzRmAbhXcJ1hOtttdaYBJlBBc7UkkTuEVQAdpmjb341x
JWT_SECRET=ms27BMajodxIQKyh
JWT_REFRESH_SECRET=PHQv3jjdG2YdMIHN