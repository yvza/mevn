var Product = require('../models/products.model.js');

exports.create = function(req, res){
    //Create and Save a new Product
    Product.create(req.body, function(err, product){
        if (err) throw err;
        console.log('Product created!');
        var id = product._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the product with id '+id);
    });
};

exports.findAll = function(req, res){
    //Retrieve and return all products from the database.
    Product.find(function(err, products){
        if(err){
            res.status(500).send({message: "Some error occurred while retrieving products."});
        }else{
            res.send(products);
        }
    });
};

exports.findOne = function(req, res){
    //Find a single product with a productId
    Product.findById(req.params.productId, function(err, data){
        if(err){
            res.status(500).send({message: "Could not retrieve product with id "+req.params.productId});
        }else{
            res.send(data);
        }
    });
};

exports.update = function(req, res){
    //Update a product identified by the productId in the request
    Product.findById(req.params.productId, function(err, product){
        if(err){
            res.status(500).send({message: "Could not find a product with id "+req.params.productId});
        }
        product.category = req.body.category;
        product.description = req.body.description;
        product.items = req.body.items;
        product.save(function(err, data){
            if(err){
                res.status(500).send({message: "Could not update product with id " + req.params.productId});
            }else{
                res.send(data);
            }
        });
    });
};

exports.delete = function(req, res){
    //Detele a product with the specified productId in the request
    Product.remove({_id: req.params.productId}, function(err, data){
        if(err){
            res.status(500).send({message: "Could not delete product with id "+req.params.id});
        }else{
            res.send({message: "Product deleted successfully!"});
        }
    });
};