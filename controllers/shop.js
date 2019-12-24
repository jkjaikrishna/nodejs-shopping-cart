const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = (req, res, next) => {
	res.render('shop/index', {
		pageTitle: 'Shopping Cart',
		path: '/'
	});
}

exports.getProducts = (req, res, next) => {
	let products = Product.fetchAll(products => {
		res.render('shop/products-list', {
			pageTitle: 'Products', 
			path: '/products', 
			prods: products
		});
  	});
}

exports.getProduct = (req, res, next) => {
	let productId = req.params.productId;
	Product.fetchById(productId, product => {
		console.log(product);
		res.render('shop/product-details', {
			pageTitle: product.title, 
			path: '/products', 
			product: product
		})
	});
}

exports.getCart = (req, res, next) => {
	res.render('shop/cart', {
		pageTitle: 'Cart',
		path: '/cart'
	});
}

exports.postCart = (req, res, next) => {
	const productId = req.body.productId;
	console.log(productId);
	Product.fetchById(productId, product => {
		Cart.addProduct(productId, product.price);
	});
	res.redirect('/cart');

}

exports.getOrders = (req, res, next) => {
	res.render('shop/orders', {
		pageTitle: 'Orders',
		path: '/orders'
	});
}

exports.getCheckout = (req, res, next) => {
	res.render('shop/checkout', {
		pageTitle: 'Checkout',
		path: '/checkout'
	})
}

