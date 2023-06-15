// // server.js
// import express from 'express'
// import cors from 'cors'
// import path, { dirname } from 'path';
// import { fileURLToPath } from 'url';

// import dotenv from 'dotenv'
// import mongoose from 'mongoose'
// import productRoute from './routes/products.js'
// import uploadRoutes from '../api/routes/upload.js'
// import usersRoute from "../api/routes/users.js";
// import customerEmail from "../api/routes/customerEmail.js"
// import auth from "../api/routes/auth.js"



// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const app = express();
// app.use(express.json());
// dotenv.config();
// const connect = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO);
//     console.log("Connect to mongoBD");
//   } catch (error) {
//     throw error;
//   }
// };

// mongoose.connection.on("disconnected", () => {
//   console.log("mongoDB disconnected");
// });
// mongoose.connection.on("connected", () => {
//   console.log("mongoDB connected");
// });

// // app.use(cors());
// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true
// }));

// app.use((req, res, next) => {
//   res.setHeader('Content-Security-Policy', "default-src 'self'; font-src 'self' 'unsafe-inline';");
//   // res.setHeader('Content-Security-Policy', "default-src 'self'; font-src 'self' http://localhost:5000;");
//   next();
// });




// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use('/uploads', uploadRoutes);
// app.use("/product", productRoute);
// app.use("/users", usersRoute);
// app.use("/email", customerEmail);
// app.use("/auth",auth)
// // ...





// app.listen(8080, () => {
//   connect();
//   console.log('Server is running on port 5000');
// });



// check out test 
//worked
// server.js
import express from 'express';
import cors from 'cors';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productRoute from './routes/products.js';
import uploadRoutes from '../api/routes/upload.js';
import usersRoute from '../api/routes/users.js';
import customerEmail from '../api/routes/customerEmail.js';
import auth from '../api/routes/auth.js';
import Stripe from 'stripe';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
app.use(express.json());
dotenv.config();
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('Connect to MongoDB');
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'; font-src 'self' 'unsafe-inline';");
  next();
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/uploads', uploadRoutes);
app.use('/product', productRoute);
app.use('/users', usersRoute);
app.use('/email', customerEmail);
app.use('/auth', auth);

// Create an instance of the Stripe class
const stripe = new Stripe('sk_test_51NIJN7Irjtx2dPjPvtTb1kB3G6eXHQH0SGCjjzRKMaYgi5hdz1avkS9hcSeZdWaODulJZtxdTPjvqwOoNUdR7Nfy00Yby2YoYS');

app.post('/create-checkout-session', async (req, res) => {
  try {
    const lineItems = req.body.map(item => {
      let name = item.title;
      if (item.size) {
        name += ` ${item.size} ml`;
      }
      if (item.color) {
        name += ` ${item.color}`;
      }
      
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});


app.listen(8080, () => {
  connect();
  console.log('Server is running on port 8080');
});
