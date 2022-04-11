const express = require('express')
var session = require('express-session');

var app = express();


const oneDay = 1000 * 60 * 60 * 24;// creating 24 hours from milliseconds

let sessionparams = {
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767", // this is the only required parameter, in a production environment you would want this to be randomly generated refer to the docs for more
  // the rest of these values do different things and there are a ton of options, but the explanations are all really meaty so Ill leave it for later.
  saveUninitialized: true,
  cookie: { maxAge: oneDay },
  resave: false,
  name: 'test'
}

app.use(session(sessionparams));

app.get('/', function (req, res) {
  console.log(req.session)

  if (req.session.page_views) {
    req.session.page_views++;

    res.send("You visited this page " + req.session.page_views + " times, to decrement the counter visit <a href='http://localhost:"+port+"/session-'>http://localhost:"+port+"/session-</a>");
    res.end()
  } else {
    req.session.page_views = 1;
    res.send("Welcome to this page for the first time!");
  }
});

app.get('/-', function (req, res) {
  if (req.session.page_views) {
    req.session.page_views--;
    res.send("the counter has been decremented, it is now " + req.session.page_views);
  } else {

    res.send("you have 0 page views, you might want to go back to <a href='http://localhost:"+port+"/session'>http://localhost:"+port+"/session</a>");
  }
}
);

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


//curl http://localhost:9999