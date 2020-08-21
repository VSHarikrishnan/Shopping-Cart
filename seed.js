var product = require("./modals/products")
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/shopping', { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
});

var data = [{


        imgpath: 'https://images.unsplash.com/photo-1548378329-437e1ef34263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        tittle: "headphones",
        description: " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        price: "50"
    }, {

        imgpath: "https://images.unsplash.com/photo-1572114718898-c32270a1b989?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        tittle: "mouse",
        description: " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        price: "90"
    }, {

        imgpath: "https://images.unsplash.com/photo-1548094891-c4ba474efd16?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        tittle: "smartphones",
        description: " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        price: "200"
    }, {

        imgpath: "https://images.unsplash.com/photo-1573215193469-e0b7a554873a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        tittle: "joystick",
        description: " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        price: "30"
    }, {

        imgpath: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        tittle: "laptop",
        description: " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        price: "300"
    }

]
createdb();
//productdelete();

function createdb() {
    data.forEach(function(data) {
        product.create(data, function(err, campground) {
            if (err) {
                console.log(err);
            } else {
                console.log("added a product");
            }
        })
    });
}

function productdelete() {
    product.remove({}, function(err) {
        if (err) {
            console.log(err);
        }
        console.log("removed products");
    });
}