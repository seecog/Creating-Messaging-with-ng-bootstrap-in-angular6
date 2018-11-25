var express = require('express');

var app = express();
var route = express.Router();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json());
var mongoose = require('mongoose');
var Product = require('./models/product.model')
mongoose.connect("mongodb://pankaj_119_119:pankaj12345@ds019866.mlab.com:19866/mycompany",()=>{
    console.log('database connecetd')
})
var cors = require('cors');
var originsWhitelist = [
'http://localhost:4200'
];
var corsOptions = {
origin: function(origin, callback){
var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
callback(null, isWhitelisted);
},
credentials:true
}
app.use(cors(corsOptions));

route.get('/test',(req,res)=>{
    res.json({
        message : 'Hello Product'
    })
})

route.delete('/products/:id',(req,res)=>{
    Product.remove({_id : req.params.id},(err,product)=>{
        if(err){
            console.log('The error is ',err)
        }
        res.json({
            message : "Record deleted"
        })
    })
})
route.post('/products',(req,res)=>{
    console.log('Req is ',req.body)
var product = new Product();
product.name = req.body.name;
product.cost = req.body.cost;
product.image = req.body.image;
product.brand = req.body.brand;
product.save();
res.json({
    message : "record Inserted"
})

})

route.put('/products/:id',(req,res)=>{
    Product.update({_id : req.params.id},req.body,(err,product)=>{
        if(err){
            console.log('The error is ',err)
        }
        res.json({
            message : 'Updated'
        })
    })
})

route.get('/products',(req,res)=>{
    Product.find({},(err,products)=>{
res.json(products)
    })
})

app.use('/api',route);
app.listen(3000,()=>{
    console.log('Server starts')
})