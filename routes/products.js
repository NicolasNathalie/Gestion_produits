const express = require("express");
const router = express.Router();
const homeController = require('./homeController');

router.get("/",homeController.getIndex);
router.get("/product/new",homeController.getNewProduct);
router.get("/search/", homeController.search);
router.get("/product/search", homeController.productSearch);
router.get("/edit/:id", homeController.editProduct);
router.put("/edit/:id", homeController.updateProduct);
router.post("/product", homeController.newProduct);
router.delete("/delete/:id", homeController.delete);


module.exports = router;