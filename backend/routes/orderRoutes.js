const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const razorpay = require('../utils/razorpay');
const Order = require('../db/models/orderSchema');
const Product = require('../db/models/productSchema');
const { checkToken, adminOnly } = require('../middlewares/checkToken');

// GET USER'S ORDER
router.get('/my-orders', checkToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ALL ORDER (Admin)
router.get('/admin/orders', checkToken, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update order status (Admin)
router.put('/admin/orders/:id', checkToken, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;

    const updateData = {
      status,
    };

    if (status === 'Delivered') {
      updateData.deliveredAt = new Date();
    }

    const order = await Order.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    }).populate('userId', 'name email');

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating order' });
  }
});

//Create Razorpay Order
router.post('/create-razorpay-order', checkToken, async (req, res) => {
  try {
    const { totalAmount } = req.body;

    // console.log('Total:', totalAmount);
    // console.log('Amount in paise:', Math.round(totalAmount * 100));

    const options = {
      amount: Number(totalAmount) * 100, // paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Verify Payment
router.post('/verify-payment', checkToken, async (req, res) => {
  // console.log('User:', req.user);
  // console.log('Body:', req.body);
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      items,
      totalAmount,
      shippingDetails,
    } = req.body;

    const userId = req.user.id;

    // console.log('userId', userId);

    const body = razorpay_order_id + '|' + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: 'Payment verification failed' });
    }

    const formattedItems = items.map(item => ({
      productId: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    }));

    const newOrder = new Order({
      userId,
      items: formattedItems,
      totalAmount,
      shippingDetails,
      paymentId: razorpay_payment_id,
      razorpayOrderId: razorpay_order_id,
      paymentSignature: razorpay_signature,
      isPaid: true,
      paidAt: Date.now(),
      status: 'Processing',
    });

    // Validate stock
    for (const item of formattedItems) {
      const product = await Product.findById(item.productId);

      if (!product || product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product?.name || 'product'}`,
        });
      }
    }

    // Save order
    await newOrder.save();

    // Reduce Stock
    for (const item of formattedItems) {
      await Product.findByIdAndUpdate(
        item.productId,
        { $inc: { stock: -item.quantity } },
        { new: true }
      );
    }

    return res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE ORDER - COD ONlY
router.post('/order-cod', checkToken, async (req, res) => {
  try {
    const { items, totalAmount, shippingDetails } = req.body;

    const userId = req.user.id;

    const newOrder = new Order({
      userId,
      items,
      totalAmount,
      shippingDetails,
      status: 'Pending',
      paymentMethod: 'COD',
    });

    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
