const Product = require("../models/product");

exports.getIndex = (req, res)=>{
    Product.find({})
    .then(products=>{
        res.render('index', {products: products});
    })
    .catch(error =>{
        console.log(error);});
    
};
exports.getNewProduct = (req, res)=>{
    res.render("new");
};
exports.productSearch = (req, res)=>{
    res.render("search");
};

exports.search = (req, res)=>{ 
     const search ={code: req.query.code};
      
        Product.findOne(search)
        .then(product=>{
            if(!product){
            req.flash("error_msg", `Product does not existe with this code`);
            res.redirect("/product/search");
            }else{
            res.render("search", {product: product});
        }
        })
        .catch(error =>{           
            console.log(error);});   
};

exports.editProduct = (req, res)=>{
    const searchById ={_id: req.params.id};

    Product.findOne(searchById)
    .then(product=>{
        res.render("edit", {product: product});
    })
    .catch(error =>{
        console.log(error);});    
};

exports.updateProduct = (req, res)=>{
    const searchById ={_id: req.params.id};

    Product.updateOne(searchById, {$set:{
        code: req.body.code,
        description: req.body.description,
        price: req.body.price
    }}).then((product)=>{
        req.flash("success_msg", "Product data updates successfully");
        res.redirect("/");
    })
    .catch(error=>{res.redirect("/");});
};

exports.newProduct = (req, res)=>{    
    const code_value = req.body.code;
    const description_value = req.body.description;
    const price_value = req.body.price;

    const newProduit = new Product({code : code_value, description : description_value, price : price_value});
    newProduit.save()
    .then(result=>{
        req.flash("success_msg", "Product data added to database successfully");
        res.redirect("/");
    })
    .catch(error =>{
        console.log(error);});
};
exports.delete = (req, res)=>{    
    const searchById = {_id: req.params.id}; 

     Product.deleteOne(searchById).then(()=>{
        req.flash("success_msg", "Product deleted successfully");
        res.redirect("/");
     })
     .catch(error =>{
        res.redirect("/");
 });
 };