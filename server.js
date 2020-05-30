const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const dotenv = require('dotenv')
const app = express();
dotenv.config();
require('./config/database')
const cors = require('cors')

var path = require('path');
var hbs = require('hbs');
var methodOverride = require('method-override');

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views", "pages"));
app.set("view options", { layout: "../layouts/default" });
//hbs.registerPartials(path.join(__dirname, "views", "partials"));
//app.use(express.static('public'));
app.use(methodOverride('_method'));

app.use(cors())
const empRoutes = require('./routes/employe')
const cmpRoutes = require('./routes/company');

app.use(morgan('dev'));

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const port = process.env.PORT || 8080

app.get('/',(req,res,next)=>
res.render('home'))

app.use('/company',cmpRoutes);
app.use('/employe',empRoutes);



//Error hndleres
app.use((req,res,next) => {
    const error = new Error('Not Found');
    error.status=404;
    next(error);
})
//Error handler for DAtabae
app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    })
})


app.listen(port,function(){
    console.log(`server is running on port no : ${port}`)
})

module.exports = app ;