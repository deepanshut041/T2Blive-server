const express = require('express');
const router = express.Router();
const Order = require('../../models/admin/order');

router.get('/', (req, res, next)=>{
    Order.getOrders((err, order)=>{
        if (err) {
            res.json({"error":"error"});
            console.log(err)
        } else {
            res.json(order);
        }
    })
});

router.get('/:id', (req, res, next)=>{
    let id = req.params.id;
    Order.getOrderByID(id, (err, order)=>{
        if (err) {
            res.json({"error":"error"});
            console.log(err)
        } else {
            res.json(order);
        }
    })
});


router.post('/', (req, res, next)=>{
    
    let date = (new Date()).toString().split(' ').splice(1,3).join(' ');
    let newOrder =new  Order({
        products: req.body.products,
        order_total: req.body.order_total,
        ship_date: req.body.ship_date,
        ship_address: req.body.ship_address,
        ship_pin:req.body.ship_pin,
        user_id: req.body.user_id,
        payment_id: req.body.payment_id,
        order_date:  date
    });
    Order.addOrder(newOrder, (err, order)=>{
        if (err) {
            res.json({success:false, msg:"Failed to add the order"});
            console.log(err);
        } else {
            res.json({success:true, msg:"Order added succefully"});
        }
    })
});

module.exports = router;