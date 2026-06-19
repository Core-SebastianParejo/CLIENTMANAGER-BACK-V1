import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/health', (req, res) => {
  res.status(200).json({status: 'ok'})
})

app.listen(3000, () => {
  console.log('App Listening on http://Localhost:3000');
});
