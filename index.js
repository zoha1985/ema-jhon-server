const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.t5r3m.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const app = express()
app.use(bodyParser.json());
app.use(cors())
const port = process.env.PORT || 5000;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri);
app.get('/', (req, res) => {
  res.send('Hello World!')
})



client.connect(err => {
  const productsCollection = client.db("emaJhonStore").collection("products");
  app.post('/addProduct', (req, res) => {
    //   const product = req.body;
    //   console.log(product)
    productsCollection.insertMany(product)
    .then(result =>{
        res.send(result.insertedCount)
    })
  }) 

app.get('/products',(req, res) =>{
    productsCollection.find({})
    .toArray((err, documents) =>{
        console.log(documents)
        res.send(documents)
    })
})

app.get('/product/:key',(req, res) =>{
    productsCollection.find({key: req.params.key})
    .toArray((err, documents) =>{
        console.log(documents)
        res.send(documents[0])
    })
})
app.post('/productBtKeys', (req, res) => {
    const productKeys = req.body;
    productsCollection.fiend({key: {$in: productKeys}})
    .toArray( (err, documents) =>{
        res.send(documents);
    })
})




  
});






app.listen(port)