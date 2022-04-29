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

// Schema for registering and login. 
const User = new Schema({
  fname: String,
  lname: String,
  email: String,
  username: String,
  zipcode: String
});

// Export Model

User.plugin(passportLocalMongoose);

module.exports =  mongoose.model('user_info', User);


//This is used to insert testing data
//var UserDetail = mongoose.model('userinfos', User);
//UserDetail.register({fname: 'aaa', lname: 'bbb', email: 'lala@lala.com',  username: 'candy', zipcode: '111' }, 'cane');

