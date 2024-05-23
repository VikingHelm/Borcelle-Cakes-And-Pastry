require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const stripe = require('stripe');
const multer = require('multer');
const upload = multer();

// Conexión MongoDB
(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Te has conectado a MongoDB.')
    } catch (error) {
        console.log(error)
    }
})();


// UserSchema
const User = require('./models/user');
const Producto = require('./models/product');


//Backend
const usersRouter = require('./controllers/users');
const productsRouter = require('./controllers/products');
const {
    config
} = require('dotenv');






// Rutas de Frontend (se coloca la carpeta, no el archivo)
// Automáticamente detecta el HTML (debe llamarse index.html para que lo haga)
app.use('/', express.static(path.resolve('views', 'home')));
app.use('/login', express.static(path.resolve('views', 'login')));
app.use('/registro', express.static(path.resolve('views', 'registro')));
app.use('/carrito', express.static(path.resolve('views', 'carrito')));
app.use('/contacto', express.static(path.resolve('views', 'contacto')));
app.use('/menu', express.static(path.resolve('views', 'menu')));
app.use('/pedidos', express.static(path.resolve('views', 'pedidos')));
app.use('/sobreNosotros', express.static(path.resolve('views', 'sobreNosotros')));
app.use('/success', express.static(path.resolve('views', 'success')));
app.use('/cancel', express.static(path.resolve('views', 'cancel')));
app.use('/AdminLogin', express.static(path.resolve('views', 'AdminLogin')));
app.use('/AdminPanel', express.static(path.resolve('views', 'AdminPanel')));
app.use('/AdminPanel/EditarProducto', express.static(path.resolve('views', 'AdminPanel', 'EditarProducto')));
app.use('/AdminPanel/NuevoProducto', express.static(path.resolve('views', 'AdminPanel', 'NuevoProducto')));

app.use('/components', express.static(path.resolve('views', 'components')));
app.use('/img', express.static(path.resolve('img')));
// Morgan debe ir debajo de las rutas de frontend
app.use(morgan('tiny'));


// IMPORTANTE: Para BACKEND, convertir en .JSON
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Rutas de Backend
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);







// Nodemailer
const configNodemailer = require('./config.json');
const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: configNodemailer.email,
        pass: configNodemailer.password
    }
})


// Send email request
app.post('/send_email', async (req, res) => {
    let { name, email, subject, message } = req.body;

    try {
      await transport.sendMail({
          to: 'fernando1208.95@gmail.com',
          subject: subject,
          text: `${message}\n\n\n${name},\n${email}`
      });
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Error sending email' });
    }
});


module.exports = transport;






// STRIPE PAYMENT
let stripeGateway = stripe(process.env.STRIPE_API);

app.post("/stripe-checkout", async (req, res) => {
    if (!req.body.cart) {
        res.status(400).send('Items are required');
        return;
    }

    const lineItems = req.body.cart.map((item) => {
        return {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    images: [item.img]
                },
                unit_amount: Math.round(item.price * 100) // Convert price to cents
            },
            quantity: item.quantityAdded
        };
    });

    const session = await stripeGateway.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        success_url: "http://localhost:3000/success/",
        cancel_url: "http://localhost:3000/cancel/",
        billing_address_collection: "required",
        line_items: lineItems
    });

    res.json({ url: session.url });
});


























// EXPORT EXPRESS
module.exports = app;