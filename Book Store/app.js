const express = require('express');
const app = express();
const user = require('./model.js');
const payment = require('./payment.js');
const passport = require('passport');
const session = require('express-session');
const connectEnsureLogin = require('connect-ensure-login');

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

app.set("view engine", "ejs");

app.set("views", './');

// will add property body for req.
app.use(express.urlencoded({extended:true}));

// also for use to call authenticate to see if login is correct.
app.use(passport.initialize());

// create user session.
app.use(session({
  secret:'alsdflkasdfjhkalsdjfalkshgghaslfjoawejwpva',
  resave: false,
  saveUninitailized: true,
  cookie: {maxAge: 60*60*1000}
}));
app.use(passport.session());
// type of login strategy. 
passport.use(payment.createStrategy());

passport.use(user.createStrategy());
// user session to pass info from one page to another. 
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

// for acessing images.
app.use(express.static(__dirname));

// app.get is handling get requests for each file. 
app.get('/bookstore', connectEnsureLogin.ensureLoggedIn(), (req, res) => {

  res.render('BookStore', {
    fname: req.user.fname,
    lname: req.user.lname,
    email: req.user.email
  });
});

app.get('/css', (req, res) => {
  res.sendFile(__dirname + '/Style.css');
});

app.get('/js', (req, res) => {
  res.sendFile(__dirname + '/Fetch.js');
});

app.get('/products', (req, res) => {
  res.sendFile(__dirname + '/products.json');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/register.html');
});

app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy((err) => {
    console.log(err);
  });
  res.redirect('/');
})


// post request for registering an account to the book store. 
app.post('/register-server', (req, res, next) => {
  user.register({fname: req.body.fname, lname: req.body.lname, 
                email: req.body.email, username: req.body.username, 
                zipcode: req.body.zipcode}, req.body.password, 
                function(err){
                    if(err){
                      console.log('error', err);
                      return next(err);
                    }
                    console.log('registered!');
                    res.redirect('/');
                });
});

// post request for logging into the book store.
app.post('/login-server', passport.authenticate('local', {failureRedirect:'/'}), (req, res) => {
    res.redirect('/bookstore');
});

//   order: {
//     Item: {
//       book: String,
//       amount: Number
//     },
//     total: String
//   }
app.post('/payment-server', (req, res, next) => {
  // cart = getCart();
  // print(cart);
  // type of login strategy.
  console.log("here");
  var localStorage = String(req.body.localStorage);  
  localStorage = localStorage.split("/");
  console.log(localStorage);
  var total = 0;
  var items = []
  for(let i=0; i<localStorage.length-1; i=i+3){
    items.push({ 
      book: localStorage[i],
      amount: localStorage[i+1]
    }); 
    total = parseFloat(total) + parseFloat(localStorage[i+2]);
    total.toFixed(2);
  }
  payment.insertMany({username: makeid(32), 
                fname: req.user.fname, 
                lname: req.user.lname,
                email: req.user.email, 
                phoneNumber: req.body.phoneNum, 
                paymentMethod: {paymentType: req.body.paymentMethod, 
                                cardNumber: req.body.cardNumber,
                                expirationDate: req.body.expiration,
                                securityCode: req.body.securityCode},
                billingAddress: {address: req.body.address, 
                                city: req.body.city,
                                state: req.body.state,
                                zipcode: req.body.zipcode},
                order: {items: items, total: total} 
                }, 
                  function(err){
                    if(err){
                      console.log('error', err);
                      return next(err);
                    }
                  });
});

const port = 3000;
app.listen(port, () => console.log(`This app is listening on port ${port}`));
