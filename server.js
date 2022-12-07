let express = require('express');
let app = express();
let bodyParser = require('body-parser');
const res = require('express/lib/response');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

//homepage route
app.get('/', (req, res) => {
    return res.send({ 
        error: false, 
        message: 'Welcome to RESTful CRUD API with NodeJS, Express, MYSQL'
    })
})

app.get('/Hello', (req, res) => {
    var value = []; //สร้าง Arry 
    var X = 0;
    var Y = 0;
    var Z = 0;
    var value1 = 3;
    value.push(value1);
    for (var i = 1; i < 7; i++) {     
        value1 = value1+(i*2);
        value.push(value1)
        if(i == 4){ 
            X = value1
        }else if(i == 5){
            Y = value1
        }else if(i == 6){
            Z = value1
        }
    }
    return res.send({ 
        Value : value,
        "X": X,
        "Y": Y,
        "Z": Z
    })
})

app.listen(3000, () => {
    console.log('Node App is running or port 3000');
})

module.exports = app;