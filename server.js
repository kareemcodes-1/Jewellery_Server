import express from "express";
import {configDotenv} from "dotenv";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import collectionRoutes from "./routes/collectionRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import stripeRoutes from "./routes/stripeRoutes.js";
import { stripeWebhook } from "./controllers/stripeController.js";
import bodyParser from "body-parser";

configDotenv();

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors({
    origin: [process.env.VITE_ADMIN_URL, process.env.VITE_CLIENT_URL],
    credentials: true,
}));

app.post('/api/stripe/webhook', bodyParser.raw({ type: 'application/json' }), stripeWebhook);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Hosted on Port ${port}`);
})

connectDB();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/collections', collectionRoutes);
app.use('/api/products', productRoutes);
app.use('/api/wishlists', wishlistRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/stripe', stripeRoutes);