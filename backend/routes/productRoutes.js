const express = require('express');
const router = express.Router();
const Product = require('../db/models/productSchema');
const { checkToken, adminOnly } = require('../middlewares/checkToken');

// GET all products
router.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// GET single product
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// CREATE PRODUCT (Admin)
router.post('/product', checkToken, adminOnly, async (req, res) => {
  try {
    //console.log('BODY RECEIVED:', req.body);
    const { name, price, description, category, stock, image } = req.body;

    const product = await Product.create({
      name,
      price,
      description,
      category,
      stock,
      image,
    });

    return res
      .status(201)
      .json({ message: 'Product added successfully', product });
  } catch (error) {
    console.log('ERROR:', error);
    res.status(500).json({ message: 'Error creating product' });
  }
});

// UPDATE PRODUCT (Admin)
router.put('/product/:id', checkToken, adminOnly, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product updated successfully', updatedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product' });
  }
});

// DELETE PRODUCT (Admin)
router.delete('/product/:id', checkToken, adminOnly, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product' });
  }
});

module.exports = router;
