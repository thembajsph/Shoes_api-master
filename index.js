const express = require("express");

const exphbs = require('express-handlebars');

// //get body parser / instantiate
const bodyParser = require('body-parser');

//require the settings bill factory function
const shoes = require("./public/shoes");
const api = require('./api');

// create an instance for the app, instantiate it.
const app = express();


// always require your pg
const pg = require("pg");
const Pool = pg.Pool

const connectionString = process.env.DATABASE_URL || 'postgresql://thembajsph:Themba17307@localhost:5432/shoe_database';
// postgres://{db_username}:{db_password}@{host}:{port}/{db_name}
const pool = new Pool({
  user: "thembajsph",
  password: "Themba17307",
  database: "shoe_database",
  host: "localhost",
  port: 5432
  // connectionString
});

module.exports = pool;
//instance
const instance = shoes(pool);
//const instance = waiterer(pool);



// const greetings = greet(pool);
const apiFactory = api(instance)
//after ive instantiate my app ,configure , expressJs as handlebars(middleware)
app.engine('handlebars', exphbs({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');

//make the public folder visible when using express, could be css ,js ,page wanst styled.now can see the middleware
// http://localhost:3011/css/style.css --- to see your css

app.use(express.static('public'));

// // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// // parse application/json
app.use(bodyParser.json());


app.get("/", async function (req, res) {

  try {

    //  let shoesId = req.body.id;
    //  console.log(shoesId);

    //  await instance.wf(shoesId);


    res.render("index", {

    });



  } catch (error) {
    console.log(error.name);
    console.log(error.message);
    console.log(error.stack);

  };

});
//settings route that is a post as per instructions
app.get("/api/shoes", apiFactory.allShoes);

app.get("/api/shoes/brand/:brandname", apiFactory.AllByBrands);


// another route, a get route, called Actions
app.get("/api/shoes/size/:sizename", apiFactory.AllbySize);


// another route, a get route, called Actions
app.get("/api/shoes/brand/:brandname/size/:sizename", apiFactory.AllbySizeBrand);

// do refer back to updateShoes if not utilising
app.get("/updateShoes/:id", async function (req, res) {

  let shoesId = req.params.id;
  console.log(shoesId);

  // await instance.wf(shoesId);


  res.render("update", {

  });

});

app.post("/updateShoes/:id", async function (req, res) {
  try {
    let shoesId = req.params.id;
    console.log(shoesId);

    result = await instance.wf(shoesId);


    res.render("update", {
      shoes: result

    });

  } catch (error) {
    console.log(error.name);
    console.log(error.message);
    console.log(error.stack);
  }


});


// another route a post to update id a shoe when its sold
app.post("/api/shoes/soldUpdated/:id", apiFactory.updateShoeSoldOut);


app.get("/AddShoes", async function (req, res) {


  res.render("addShoes", {

  });

});








app.get("/checkoutShoes", async function (req, res) {


  res.render("checkout", {

  });

});



app.post("/api/shoes", apiFactory.addNewNew);


const PORT = process.env.PORT || 3001

app.listen(PORT, function () {
  console.log("app started at port:", PORT);

});

