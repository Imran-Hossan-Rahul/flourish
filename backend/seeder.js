import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Product from './models/Product.js';
import User from './models/User.js';

dotenv.config();

const importData = async () => {
  try {
    await connectDB();

    // Clear existing products
    await Product.deleteMany();

    // Check for an existing admin or user, create one if not found
    let adminUser = await User.findOne({});
    
    if (!adminUser) {
      adminUser = await User.create({
        name: 'Admin User',
        email: 'admin@flourish.com',
        password: 'password123',
        isAdmin: true,
      });
    }

    const adminId = adminUser._id;

    const products = [
      {
        user: adminId,
        name: 'Eternity Rose Box Set',
        image: '/images/products/product-1.jpg',
        description: 'A striking mix of pristine white and passionate red roses elegantly presented alongside a luxurious geometric gift box, perfect for marking an unforgettable anniversary or declaration of love.',
        category: 'Romantic',
        price: 45.00,
        countInStock: 10,
        rating: 5,
        numReviews: 12,
      },
      {
        user: adminId,
        name: 'Sweet Affection Basket',
        image: '/images/products/product-2.jpg',
        description: 'A delightful basket overflowing with vivid red roses, delicate baby\'s breath, and interwoven with premium chocolate bars. Hand-arranged to perfection.',
        category: 'Bouquets',
        price: 55.00,
        countInStock: 8,
        rating: 4.5,
        numReviews: 8,
      },
      {
        user: adminId,
        name: 'Summer Sunshine Bouquet',
        image: '/images/products/product-3.jpg',
        description: 'Brighten someone\'s day with this vibrant mix of sunflowers, pink lilies, purple orchids, and blush pink roses, beautifully wrapped in premium frosted paper.',
        category: 'Mixed Florals',
        price: 40.00,
        countInStock: 15,
        rating: 4.8,
        numReviews: 20,
      },
      {
        user: adminId,
        name: 'My Soulmate Chocolate & Balloon Box',
        image: '/images/products/product-4.jpg',
        description: 'The ultimate romantic gesture: a sleek dark cylinder box brimming with assorted chocolates (Snickers, Mars, KitKat), romantic red roses, and a personalized \'My Soulmate\' helium balloon.',
        category: 'Gift Boxes',
        price: 65.00,
        countInStock: 5,
        rating: 5,
        numReviews: 6,
      },
      {
        user: adminId,
        name: 'Angelic White Rose Totebox',
        image: '/images/products/product-5.jpg',
        description: 'Classic elegance redefined. A blush pink square tote packed densely with fresh, premium white roses and subtle purple accent flowers, finished with a signature Flourish ribbon.',
        category: 'Premium Selection',
        price: 50.00,
        countInStock: 12,
        rating: 4.7,
        numReviews: 15,
      }
    ];

    await Product.insertMany(products);
    console.log('Data Imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
