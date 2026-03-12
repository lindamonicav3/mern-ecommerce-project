const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        name: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    shippingDetails: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
    },

    paymentId: {
      type: String,
      required: true,
    },

    razorpayOrderId: {
      type: String,
      required: true,
    },

    paymentSignature: {
      type: String,
      required: true,
    },

    isPaid: {
      type: Boolean,
      default: true,
    },

    paidAt: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },

    deliveredAt: Date,
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', userSchema);

module.exports = Order;
