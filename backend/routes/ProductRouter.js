const ensureAuthenticated = require("../middleware/Auth");

const router = require("express").Router();

const products = [
    { _id: "691b51c1a4692182a0cd60a8", image: "../assets/images/bb1.jpg", name: "Afsana", price: 1299 },
    { _id: "691b51c1a4692182a0cd60a9", image: "../assets/images/bb2.jpg", name: "Mehnoor", price: 1399 },
    { _id: "691b51c1a4692182a0cd60aa", image: "../assets/images/pehrin11.jpg", name: "Noorjahan", price: 1499 },
    { _id: "691b51c1a4692182a0cd60ab", image: "../assets/images/bb4.jpg", name: "Gulzar", price: 1199 },
    { _id: "691b51c1a4692182a0cd60ac", image: "../assets/images/pehrin10.jpg", name: "Sahiba", price: 1599 },
    { _id: "691b51c1a4692182a0cd60ad", image: "../assets/images/pehrin13.jpg", name: "Rukhsana", price: 1699 },
    { _id: "691b51c1a4692182a0cd60ae", image: "../assets/images/pehrin12.jpg", name: "Dilruba", price: 1499 },
    { _id: "691b51c1a4692182a0cd60af", image: "../assets/images/pehrin1.jpg", name: "Mehrunisa", price: 1399 },
];



router.get("/", ensureAuthenticated, (req, res) => {
    res.status(200).json(products)
});

module.exports = router;
