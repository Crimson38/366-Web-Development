// dependencies
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
// connect to database
mongoose.connect('mongodb+srv://admin:admin@cluster0.frvbw.mongodb.net/book_store?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// Create Model
const Schema = mongoose.Schema;

// Schema for placing order.
const Payment = new Schema({
  username: String,
  fname: String,
  lname: String,
  email: String,
  phoneNumber: String,

  paymentMethod: {
    paymentType: String,
    cardNumber: String,
    expirationDate: String, 
    securityCode: String
  },

  billingAddress: {
    address: String,
    city: String,
    state: String,
    zipcode: String
  },

  order: Array
});

// Export Model
Payment.plugin(passportLocalMongoose);

module.exports = mongoose.model('payment_info', Payment);


//This is used to insert testing data
//var UserDetail = mongoose.model('userinfos', User);
//UserDetail.register({fname: 'aaa', lname: 'bbb', email: 'lala@lala.com',  username: 'candy', zipcode: '111' }, 'cane');

