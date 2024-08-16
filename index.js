// index.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/:date", (req, res) => {
  const date = req.params.date;
  const newDate = new Date(date);

  if (newDate == "Invalid Date") {
    return res.json({error: "Invalid Date"});
  }

  res.json({
    unix: newDate.getTime(),
    utc: newDate.toUTCString(),
  });
});

// respond with current unix time string & utc date string when no date param
app.get("/api", (req, res) => {
  const today = new Date();
  res.json({
    unix: today.getTime(),
    utc: today.toUTCString()
  })
})

// Listen on port set in environment variable or default to 3000
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
