const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post("/raw", function (req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.end(JSON.stringify(req.body, null, 2));
});

app.post("/pretty", function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  if (typeof req.body === 'object') {
    console.log(req.body)
    res.end(`
	  	<ul>${Object.keys(req.body).map(k => (`<li>${k}: ${req.body[k]}</li>`))}</ul>
  	`);
  } else {
    res.end('Ne podpiram tega tipa!')
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
