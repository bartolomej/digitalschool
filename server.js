const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// set form attribute enctype="application/json"
// parse application/json
app.use(bodyParser.json())

app.post("/raw", function (req, res) {
  if (req.is('application/json')) {
    res.setHeader('Content-Type', 'text/plain')
    res.end(JSON.stringify(req.body, null, 2))
  } else {
    res.setHeader('Content-Type', 'text/html');
    res.end('Ne podpiram tega tipa vsebine!');
  }
});

app.post("/pretty", function (req, res) {
  if (req.is('application/json')) {
    res.setHeader('Content-Type', 'text/html');
    res.end(`
  	<ul>
      ${Object.keys(req.body).map(k => (`
        <li>${k}: ${req.body[k]}</li>
      `))}
    </ul>
  `);
  } else {
    res.setHeader('Content-Type', 'text/html');
    res.end('Ne podpiram tega tipa vsebine!');
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
