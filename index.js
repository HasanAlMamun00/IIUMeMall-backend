const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./server");
const stripe = require("stripe")('sk_test_51OOhqABezfSpiXxQqyg3n71Uf5EHPDtryPLKGkPQGgrbau7aMH3af7LbeYeXzPq9OYvOk0scMeWSQzwBJ4C5H73f00baDy0NyX');

// Route Import
const userRegRoutes = require('./routes/userRegRoutes');
const cafeRoutes = require('./routes/cafeRoutes');
const wishlistRoutes = require('./routes/wishListRoutes');
const cartRoutes = require('./routes/cartRoutes');
const contactUsRoutes = require('./routes/ContactUsRoutes');
const bookingRoutes = require('./routes/bookingRooute');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("llumemall App is working! YaY!");
});

// Route Declaration
app.use('/userReg', userRegRoutes);
app.use('/cafe', cafeRoutes);
app.use('/wishlist', wishlistRoutes);
app.use('/cart', cartRoutes);
app.use('/contactUs', contactUsRoutes);
app.use('/booking', bookingRoutes);


// Payment page active
app.post('/create-payment-intent', async (req, res) => {
    const totalPrice = req.body.totalPrice;

    if (typeof totalPrice !== 'number' || isNaN(totalPrice) || totalPrice <= 0) {
        return res.status(400).send({ error: 'Invalid totalPrice' });
    }

    const amount = Math.round(totalPrice * 100);

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            currency: 'usd',
            amount: amount,
            payment_method_types: ['card'],
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error('Error creating PaymentIntent:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});



connectDB();

const port = 5000 || 8080;

app.listen(port, () => {
    console.log(`llumemall app is running on port ${port}`);
});



// index.js -> routes -> controllers -> services -> models.