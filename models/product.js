const path = require('path');
const fs = require('fs');

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
    constructor( title, imageUrl, description, price ) {
        this.title= title;
        this.imageUrl= imageUrl;
        this.description= description;
        this.price= price;
    }

    save() {
        this.id = (Math.random() * 100).toString();
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(filePath, JSON.stringify(products), (err) => {
                console.log(err);
            });
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
}