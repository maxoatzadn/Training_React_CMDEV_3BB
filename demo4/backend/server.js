const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
let dataArray = [];

app.post('/record_position', async (req, res) => {
  console.log(JSON.stringify(req.body));
  const data = {...req.body, id: dataArray.length};
  dataArray.push(data);
  res.json({result: 'ok'});
});

app.get('/position', async (req, res) => {
  res.json(dataArray);
});

app.listen(3001, () => {
  console.log('Server is running..');
});