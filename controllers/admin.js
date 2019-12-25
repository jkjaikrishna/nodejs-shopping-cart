const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    let products = Product.fetchAll(products => {
        res.render('admin/products', {
            pageTitle: "Admin Products", 
            path: '/admin/products',
            prods: products
        });
    })
}

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: "Add Product", 
        path: '/admin/add-product',
        editMode: false
    });
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
  };

exports.postAddProduct = ( req, res, next ) => {
    let { title, imageUrl, description, price } = req.body;
    let product = new Product( null, title, imageUrl, description, price );
    product.save();
    res.redirect('/products');
};

exports.getEditProduct = (req, res, next) => {
    const productId = req.params.productId;
    const editMode = req.query.edit;

    if(!editMode) {
        res.redirect('/');
    }

    Product.fetchById(productId, product => {
        if(!product) {
            res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: "Edit Product", 
            path: '/admin/edit-product',
            editMode,
            product
        });
    });
    
};

exports.postEditProduct = ( req, res, next ) => {
    const { 
        productId: updatedProductId, 
        title: updatedTitle, 
        imageUrl: updatedImageUrl, 
        description: updatedDescription, 
        price: updatedPrice
    } = req.body;
    const updatedProduct = new Product( updatedProductId, updatedTitle, updatedImageUrl, updatedDescription, updatedPrice );
    updatedProduct.save();
    res.redirect('/admin/products');
};

exports.deleteProduct = ( req, res, next ) => {
    const productId = req.body.productId;
    Product.deleteById(productId);
    res.redirect('/admin/products');
};
