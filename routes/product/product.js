const express = require('express');
const router = express.Router();
const Product = require('../../models/product/product');
const Rating = require('../../models/product/rating');
const Review = require('../../models/product/review');

router.get('/', (req, res, next)=>{
    Product.getProducts((err, product)=>{
        if (err) {
            res.json({"error":"error"});
            console.log(err)
        } else {
            res.json(product);
        }
    })
});

router.get('/product/:id', (req, res, next)=>{
    let id = req.params.id
    Product.getProductById(id,(err, product)=>{
        if (err) {
            res.json({"error":"error"});
            console.log(err)
        } else {
            res.json(product);
        }
    })
});

router.get('/category/:category/:subcategory', (req, res, next)=>{
    let category = req.params.category;
    let subcategory = req.params.subcategory;
    Product.getProductByCategory(category, subcategory, (err, product)=>{
        if (err) {
            res.json({success:false,msg:"Category not found"});
        } else {
            if(product.lenght !=0){
                res.json(product);
            }
            else{
                res.json({success:false,msg:"Category not found"})
            }
        }
    })
});

router.post('/product', (req, res, next)=>{
    
    let date = (new Date()).toString().split(' ').splice(1,3).join(' ');
    let newProduct =new  Product({
        product_category: req.body.product_category,
        product_subCategory: req.body.product_subCategory,
        product_name: req.body.product_name,
        product_description: req.body.product_description,
        product_quantity:req.body.product_quantity,
        product_sPrice: req.body.product_sPrice,
        product_cPrice:  req.body.product_cPrice,
        product_img: req.body.product_img,
        product_high: req.body.product_high,
        product_spec: req.body.product_spec

    });

    Product.addProduct(newProduct, (err, product)=>{
        if (err) {
            res.json({success:false, msg:"Failed to product the product"});
            console.log(err);
        } else {
            res.json({success:true, msg:"Product added succefully"});
        }
    })

});

router.patch('product/:id', (req, res, next)=>{

});

router.patch('/product/:id/quantity/:qt', (req, res, next)=>{
    let id = req.params.id;
    let qt = req.params.qt;
    let product = {
        $inc:{
            product_quantity: -parseInt(qt)
        }
    }
    Product.updateProductAttribute(id, product, (err, post)=>{
        if (err) {
            res.json({success:false, msg:"Failed to update post "});
            console.log(err);
        } else {
            res.json({success:true, msg:"Updated post success"});
        }
    })
});

router.delete('product/:id', (req, res, next)=>{
});

module.exports = router;