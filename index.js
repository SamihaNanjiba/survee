const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

// const authRoutes = require('./routes/authRoutes');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
// the above lines just mean authRoutes(app);
// calling the funtion returned by the file authRoutes
// in the folder routes

/*test route, don't need anymore
prints the object below in the browser when visited localhost:5000*/
// route handler
// app.get('/', (req, res) => {
//     res.send({bye: 'blah'});
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT);