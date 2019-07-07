const express = require('express')
const path = require('path')
const java = require('./public/pr2javascript')
const PORT = process.env.PORT || 5000


var app = express();
const { Pool } = require('pg');



app.use(express.static('/public'));



const connectionString = process.env.DATABASE_URL ||"postgres://pffksmlwolxddd:eed056cf82032a36e365e6d53871acf70500138b89e455f22c216222cfdf1eca@ec2-54-221-215-228.compute-1.amazonaws.com:5432/d9blinqsntetqe?ssl=true";

const pool = new Pool({connectionString: connectionString});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('public', path.join(__dirname, 'public'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/db', (req, res) => res.render('pages/db'))
  .get('/getrate', getRating)
  .get('/test', function(req, res){
    console.log("testing");
    var thing = {
      name: "harry",
      age: 45,
      weight: 4596
    }
    res.json(thing);
  })
  .post('/addMovie', addMovie)

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


  function getRating(req, res){
    const id = req.query.rating;

    var rate = getRatingValue(id, function(error, result){
      if (error || result == null || result.length != 1) {
			res.status(500).json({success: false, data: error});
		} else {
			const rate = result[0];
			res.status(200).json(rate);
		}
    })
    res.json(rate);

  }

  function getRatingValue(id, callback){
    console.log("getting the rating with id: " + id);

    const sql = "SELECT id, rating FROM rating WHERE id = $1::int";
    const params = [id];

    pool.query(sql, params, function(err, result){
      if (err){
        console.log("Error in query: ")
			console.log(err);
			callback(err, null);
      }

      //var rat = JSON.parse(result.rows);
      console.log("Found result: " +  result.rows );
      return result.rows;
      


    })

  }
  

  //adds a movie to the database
  function addMovie(req, result){
    var newMovie = req.query.newMovie;
    var title = req.query.title;
    var year = req.query.year;
    var rating = req.query.rating;

    console.log(JSON.stringify(newMovie));
    console.log("the title is:" + title);
    console.log("the year is:" + year);
    console.log("the ratingis:" + rating);
    callback(null, result.rows);

  }

