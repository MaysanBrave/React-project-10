const express = require("express");
const app = express();
const fs = require('fs')
var bodyParser = require('body-parser')
const cors = require('cors')

app.use(express.json());
app.use(cors());
// app.use(bodyParser({limit: '50mb'}));

app.listen(process.env.PORT || 8080);


app.get('/orders', (req, res) => {
    fs.readFile('orders.json', (err, data) => {
        if (err) throw err;
        orderList = JSON.parse(data);
        res.send(orderList)
    });
})
app.get('/users', (req, res) => {
    fs.readFile('users.json', (err, data) => {
        if (err) throw err;
        users = JSON.parse(data);
        res.send(users)
    });
})
app.get('/products', (req, res) => {
    fs.readFile('products.json', (err, data) => {
        if (err) throw err;
        products = JSON.parse(data);
        res.send(products)
    });
})

app.put('/order', (req, res) => {
    const reqOrder = req.body;
    fs.readFile('orders.json', (err, data) => {
        if (err) throw err;
        orderList = JSON.parse(data);
        orderList = orderList.filter(order => {
            if (order.pid == reqOrder.pid) {
                return reqOrder
            } else {
                return order
            }
        })
        orderList = JSON.stringify(orderList)
        fs.writeFile("orders.json", orderList, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
            console.log("JSON file has been saved.");
            res.end()
        });
    });
})

app.post('/order', (req, res) => {
    const order = req.body;
    fs.readFile('orders.json', (err, data) => {
        if (err) throw err;
        orderList = JSON.parse(data);
        orderList.push(order);
        orderList = JSON.stringify(orderList)
        fs.writeFile("orders.json", orderList, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
            console.log("JSON file has been saved.");
            res.end()
        });
    });
})
app.post('/product', (req, res) => {
    const product = req.body;
    console.log(req.body)
    fs.readFile('products.json', (err, data) => {
        if (err) throw err;
        products = JSON.parse(data);
        products.push(product);
        products = JSON.stringify(products)
        fs.writeFile("products.json", products, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
            console.log("JSON file has been saved.");
            res.end()
        });
    });
})
app.put('/product', (req, res) => {
    const reqProduct = req.body;
    var finalProduct = null ;
    fs.readFile('products.json', (err, data) => {
        if (err) throw err;
        productList = JSON.parse(data);
        finalProduct = productList.map(product => {
            if (product.pid == reqProduct.pid) {
                return reqProduct
            } else {
                return product
            }
        })
        productList = JSON.stringify(finalProduct)
        // console.log(productList)
        fs.writeFile("products.json", productList, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
            console.log("JSON file has been saved.");
            res.end()
        });
    });
})

app.delete('/order/:id?', (req, res) => {
    const id = req.params.id;
    fs.readFile('orders.json', (err, data) => {
        if (err) throw err;
        orderList = JSON.parse(data);
        orderList = orderList.filter(order => order.id !== id)
        orderList = JSON.stringify(orderList)
        fs.writeFile("orders.json", orderList, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
            console.log("JSON file has been saved.");
            res.end()
        });
    });
})

app.delete('/product/:id?', (req, res) => {
    const id = req.params.id;
    fs.readFile('products.json', (err, data) => {
        if (err) throw err;
        productList = JSON.parse(data);
        productList = productList.filter(product => product.pid != id)
        productList = JSON.stringify(productList)
        fs.writeFile("products.json", productList, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
            console.log("JSON file has been saved.");
            res.end()
        });
    });
})