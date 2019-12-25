const path = require('path');
const fs = require('fs');

const filePath = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');

module.exports = class {
    static addProduct(id, productPrice) {
        //Fetch the previous cart
        fs.readFile(filePath, (err, fileContent) => {
            let cart = {
                products: [],
                totalPrice: 0
            }
            if(!err) {
                cart = JSON.parse(fileContent);
            }
            //Analyze and find existing product
            const existingProductIndex = cart.products.findIndex(product => product.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if(existingProduct) {
                updatedProduct = {...existingProduct};
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            }
            else {
                updatedProduct = {id: id, qty: 1};
                cart.products = [...cart.products, updatedProduct];
            }
    
            //Update the cart
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(filePath, JSON.stringify(cart), err => {
                console.log(err);
            });
        });
    }

    static getCart(callback) {
        fs.readFile(filePath, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            if(err) {
                return callback(null);
            }
            else {
                return callback(cart);
            }
        })
    }

    static deletedProduct(id, productPrice) {
        fs.readFile(filePath, (err, fileContent) => {
            if(err)
                return;
            const updatedCart = {...JSON.parse(fileContent)};
            const product = updatedCart.products.find(product => product.id === id);
            if(!product) {
                return;
            }
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter( product => product.id != id);
            updatedCart.totalPrice = updatedCart.totalPrice - productQty * productPrice;
            fs.writeFile(filePath, JSON.stringify(updatedCart), err => {
                console.log(err);
            });
        })
    }
}