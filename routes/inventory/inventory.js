const express = require('express');
const router = express.Router();
const Inventory = require('../../models/admin/inventory');

router.get('/', (req, res, next)=>{
    Inventory.getInventorys((err, inventory)=>{
        if (err) {
            res.json({"error":"error"});
            console.log(err)
        } else {
            res.json(inventory);
        }
    })
});

router.get('/:id', (req, res, next)=>{
    let id = req.params.id;
    Inventory.getInventoryById(id, (err, inventory)=>{
        if (err) {
            res.json({"error":"error"});
            console.log(err)
        } else {
            res.json(inventory);
        }
    })
});


router.post('/', (req, res, next)=>{
    
    let date = (new Date()).toString().split(' ').splice(1,3).join(' ');
    let newInventory =new  Inventory({
        products: req.body.products,
        inventory_total: req.body.inventory_total,
        ship_date: req.body.ship_date,
        ship_address: req.body.ship_address,
        ship_pin:req.body.ship_pin,
        user_id: req.body.user_id,
        payment_id: req.body.payment_id,
        status: req.body.status,
        inventory_date:  date
    });
    Inventory.addInventory(newInventory, (err, inventory)=>{
        if (err) {
            res.json({success:false, msg:"Failed to add the inventory"});
            console.log(err);
        } else {
            res.json({success:true, msg:"Inventory added succefully"});
        }
    })
});

module.exports = router;