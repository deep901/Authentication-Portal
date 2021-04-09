const express = require('express');
const app = express();
// const port=8080;
const mongoose = require('mongoose');
const dotenv=require('dotenv');
const bodyParser=require('body-parser');
dotenv.config()
// import routes
const authRoute=require('./routes/auth.js');
const private=require('./routes/private.js');


// route middlewares
app.use(express.json());  // just like bodyparser
app.use('/api/user',authRoute); // routing middleware
app.use('/api/user/post',private);



//database setup


const uri = "mongodb+srv://deeproshan:robpiper@details.wfjdg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

app.listen(3000, function(){
	console.log("Success!");
});