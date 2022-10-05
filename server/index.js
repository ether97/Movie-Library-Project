const express = require('express')

const app = express();

const cors = require('cors');

const pool = require('./db');

//middleware
app.use(cors());
app.use(express.json());

//ROUTES//

//create a movie

app.post('/movies', async (req,res) => {
    try {
        const {name, type} = req.body;
        const newMovie = await pool.query("INSERT INTO movies (name, type) VALUES($1,$2) RETURNING *", [name, type]);

        res.json(newMovie.rows[0]);
    } catch(err) {
        console.error(err.message)
    }
})

//get all movies
app.get('/movies', async (req,res) => {
    try {
        const allMovies = await pool.query("SELECT * FROM movies");
        res.json(allMovies.rows);
    } catch(err) {
        console.error(err.message)
    }
})


//get a movie
app.get('/movies/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const movie = await pool.query("SELECT * FROM movies WHERE movie_id = $1", [id])

        res.json(movie.rows[0])
    } catch(err) {
        console.error(err.message);
    }
})

//update a movie
app.put('/movies/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const {name,type} = req.body;
        const updateMovie = await pool.query("UPDATE movies SET name = $1, type = $2 WHERE movie_id = $3", [name,type,id]);

        res.json("Movie was updated!");
    } catch(err) {
        console.error(err.message)
    }
})

//delete a movie
app.delete('/movies', async(req,res) => {
    try {
        const {name} = req.body;
        const deleteMovie = await pool.query("DELETE FROM movies WHERE name = $1", [name])

        res.json("Movie was deleted!")
    } catch(err) {
        console.error(err.message)
    }
})


app.listen(5000, () => {
    console.log('server has started on port 5000')
})

