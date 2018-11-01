const express = require('express')
const mustacheExpress = require('mustache-express')
var bodyParser = require('body-parser')
const app = express()
const port = 3000
app.use(bodyParser.urlencoded({ extended: false }))
app.engine('mustache',mustacheExpress())
app.set("views","./views")
app.set("view engine","mustache")
//app.use('/',express.static('css'))

let movies = []

// route parameters
app.get('/movies/:title/:genre',function(req,res){
  res.send('<html><body><p>req.params.genre + req.params.year</p></body></html>')
})

app.post("/add_movie",function(req,res){
  let title = req.body.title
  let genre = req.body.genre
  let description = req.body.description
  let posterURL = req.body.posterURL
  movies.push({title : title , genre : genre , description : description, posterURL : posterURL })
  console.log(movies)
  res.redirect("/add-movie")
})

app.get('/add-movie',function(req,res){
  res.render('add-movie', {movies : movies})
})

app.post('/add-movie',function(req,res){
  res.redirect('/')
})

app.get('/',function(req,res){
  res.render('index', {movies : movies})
})

app.post('/delete-movie',function(req,res){

    let name = req.body.movieName
    let genre = req.body.genreName
    let description = req.body.descriptionName
    let posterURL = req.body.posterURLName

    movies = movies.filter(function(movie){
      return movie.title != name

    })
  res.redirect('/')

})



app.listen(port, function(){
  console.log("Server has started...")
})
