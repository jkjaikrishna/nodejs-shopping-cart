const path = require('path');
const fs = require('fs');

const Cart = require('./cart');

const filePath = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

const getProductsFromFile = (callback) => {
    fs.readFile(filePath, (err, fileContent) => {
        if(err) {
            callback([]);
        }
        else
            callback(JSON.parse(fileContent));
    });
};

module.exports = class Products {
    constructor( id, title, imageUrl, description, price ) {
        this.id = id;
        this.title= title;
        this.imageUrl= imageUrl;
        this.description= description;
        this.price= price;
    }

    save() {
        getProductsFromFile(products => {
            if(this.id) {
                const existingProductIndex = products.findIndex(product => product.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(filePath, JSON.stringify(updatedProducts), (err) => {
                    console.log(err);
                });
            }
            else {
                this.id = (Math.random() * 100).toString();
                products.push(this);
                fs.writeFile(filePath, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            }
        });
    }

    static fetchAll(callback) {
        getProductsFromFile(callback);
    }

    static fetchById(id, callback) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            callback(product);
        })
    }

    static deleteById(id, callback) {
        getProductsFromFile(products => {
            let productToDelete = products.find(product => product.id === id);
            let updatedProducts = products.filter(product => product.id != id);
            fs.writeFile(filePath, JSON.stringify(updatedProducts), err => {
                if(!err) {
                    Cart.deletedProduct(id, productToDelete.price);
                }
            });
        });
    }
}