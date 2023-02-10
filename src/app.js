const path = require('path');
const express = require('express');
const hbs = require('hbs');
// console.log(__dirname);  //目錄名路徑
// console.log(__filename); //檔案名路徑
const geocode = require('./utils/geocode');
const forcecast = require('./utils/forcecast');

const app = express();
const port = process.env.PORT || 3000;

//define paths for Express confing
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
// console.log(partialsPath);
//Setup handlebars engine and view location 
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);
// Setup static directory to sever
app.use(express.static(publicDirectoryPath));
// express.static提供靜態檔案服務

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Creat by Andy'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Andy Wang'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Andy Wang',
        message:'What Can I halp you with'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address.'       
        })
    }
    geocode(req.query.address, (error, {longitude, latitude, location } = {}) => {
        if(error) {
         return res.send({ error: error })
        }
        forcecast(longitude, latitude, (error, forcecastdata) => {
            if(error) {
                return res.send({ error: error })
            }
               res.send([{
                forecast: forcecastdata,
                loaction: location,
                address: req.query.address,
            }]);
        })
        
    })
    
   
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send ({
            error: 'You must provide a search term.'
        })
    }

    // console.log(req.query.search);
    
    res.send({
        products: [],
    });
})
app.get('/help/*', (req, res) => {
    res.render('help', {
        title: '404',
        name: 'Andy Wang',
        message:'Help article not found'
    })
})

app.get('*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Andy Wang',
        errorMessage: 'Page not found'
    });
})


app.listen(port, () =>{
    console.log('Server is up on port', port);
});