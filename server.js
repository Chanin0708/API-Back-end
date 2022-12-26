let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mysql = require('mysql');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// homepage route
app.get('/', (req, res) => {
    return res.send({ 
        error: false, 
        message: 'Welcome to RESTful CRUD API with NodeJS, Express, MYSQL',
    })
})

// connection to mysql database
let dbConnection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'nodejs_api'
})
dbConnection.connect();

// retrieve all books 
app.get('/getdatafruit', (req, res) => {
    dbConnection.query('SELECT * FROM books', (error, results, fields) => {
        if (error) throw error;

        let message = ""
        if (results === undefined || results.length == 0) {
            message = "Books table is empty";
        } else {
            message = "Successfully retrieved all fruits";
        }
        return res.send({ data: results, message: message});
    })
})

// add a new fruit
app.post('/addfruit', (req, res) => {
    let name = req.body.name;
    let author = req.body.author;

    // validation
    if (!name || !author) {
        return res.status(400).send({ message: "Please provide fruit name and author."});
    } else {
        dbConnection.query('INSERT INTO books (name, author) VALUES(?, ?)', [name, author], (error, results, fields) => {
            if (error) throw error;
            return res.send({message: "fruit successfully added"})
        })
    }
});

// retrieve fruit by name 
app.get('/getdatafruit/:name', (req, res) => {
    let name = req.params.name;

    if (!name) {
        return res.status(400).send({ message: "Please provide fruit name"});
    } else {
        dbConnection.query("SELECT * FROM books WHERE name = ?", name, (error, results, fields) => {
            if (error) throw error;

            let message = "";
            if (results === undefined || results.length == 0) {
                message = "fruit not found";
            } else {
                message = "Successfully retrieved fruit data";
            }
            return res.send({data: results[0], message: message })
        })
    }
})

// update book with id 
app.put('/updatefruit', (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
    let author = req.body.author;

    // validation
    if (!id || !name || !author) {
        return res.status(400).send({ message: 'Please provide fruit id, name and author'});
    } else {
        dbConnection.query('UPDATE books SET name = ?, author = ? WHERE id = ?', [name, author, id], (error, results, fields) => {
            if (error) throw error;

            let message = "";
            if (results.changedRows === 0) {
                message = "fruit not found or data are same";
            } else {
                message = "fruit successfully updated";
            }

            return res.send({ error: false, data: results, message: message })
        })
    }
})

// delete fruit by id
app.delete('/deletefruit', (req, res) => {
    let id = req.body.id;

    if (!id) {
        return res.status(400).send({ error: true, message: "Please provide fruit id"});
    } else {
        dbConnection.query('DELETE FROM books WHERE id = ?', [id], (error, results, fields) => {
            if (error) throw error;

            let message = "";
            if (results.affectedRows === 0) {
                message = "fruit not found";
            } else {
                message = "fruit successfully deleted";
            }

            return res.send({ error: false, data: results, message: message })
        })
    }
})

app.listen(3000, () => {
    console.log('Node App is running on port 3000');
})

module.exports = app;
