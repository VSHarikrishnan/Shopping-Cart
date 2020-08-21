var express = require("express");
var app = express();
var bodyparser = require("body-parser");

const http = require("http");
var mongoose = require("mongoose");

var session = require("express-session");
var cookieparser = require("cookie-parser");
var mongostore = require("connect-mongo")(session);
var Cart = require("./modals/cart")
var product = require("./modals/products");
var Order = require("./modals/order");


mongoose.connect('mongodb://localhost/shopping', { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
});
app.use(express.static(__dirname + "/public"));
app.use(bodyparser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(cookieparser());
app.use(session({
    secret: 'my shopping cart',
    resave: false,
    saveUninitialized: false,
    store: new mongostore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 5 * 60 * 1000 }
}));



// app.use(function(req, res, next) {
//     res.locals.session = req.session;
//     next();
// });
app.get("*", function(req, res, next) {
    res.locals.session = req.session;
    res.locals.qty = req.qty;
    res.locals.cart = req.session.cart;
    next();
});




app.get("/", function(req, res) {
    product.find({}, function(err, products) {
        if (err) { console.log(err); } else {

            res.render("./products/shop", { products: products });
        }
    });
});



app.get('/addtocart/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    product.findById(productId, function(err, product) {
        cart.add(product, product.id);
        req.session.cart = cart;

        res.redirect('back');
    });
});


app.get('/remfromcart/:id/m', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart);
    product.findById(productId, function(err, product) {
        cart.minus(product, product.id);
        req.session.cart = cart;

        res.redirect('back');
    });
});

app.get('/remfromcart/:id/c', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart);
    product.findById(productId, function(err, product) {
        cart.rem(product, product.id);
        req.session.cart = cart;

        res.redirect('back');
    });
});

app.post('/checkout', function(req, res) {
    var order = new Order({
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone,
        cart: req.session.cart
    });
    order.save(function(err, result) {
        if (err) {
            console.log(err);
        }

        req.session.cart = null;

        res.redirect('back');
    });

});
app.get("/orders", function(req, res) {
    Order.find({}, function(err, orders) {

        if (err) { console.log(err); }

        var cart;
        orders.forEach(function(order) {
            cart = new Cart(order.cart);
            order.items = cart.generateArray();

        });
        console.log(orders);
        res.render("./products/orders", { orders: orders });

    });
});




app.get("/cart", function(req, res) {
    if (!req.session.cart) {
        return res.render("./products/cart", { products: null, totalprice: 0 })
    }
    var cart = new Cart(req.session.cart);
    res.render("./products/cart", { products: cart.generateArray(), totalprice: cart.totalPrice })
});


app.get("/orderremove", function(req, res) {
    Order.remove({}, function(err, result) {
        if (err) { console.log(err); }

        res.redirect("/");
    });

});



const PORT = process.env.PORT || 80;
app.listen(PORT, err => {
    if (err) throw err;
    console.log("%c Server running", "color: green");
});