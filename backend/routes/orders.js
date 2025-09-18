const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');

// Create new order
router.post('/', async (req, res) => {
  try {
    const { userId, shippingAddress, paymentMethod } = req.body;
    
    // Get user's cart
    const cart = await Cart.findOne({ userId }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }
    
    // Calculate totals
    const subtotal = cart.totalAmount;
    const deliveryFee = 40;
    const tax = Math.round(subtotal * 0.05);
    const totalAmount = subtotal + deliveryFee + tax;
    
    // Create order items with current prices
    const orderItems = cart.items.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price,
    }));
    
    // Create order
    const order = new Order({
      userId,
      items: orderItems,
      totalAmount,
      shippingAddress,
      paymentMethod,
      deliveryFee,
      tax,
    });
    
    await order.save();
    await order.populate('items.product');
    
    // Clear cart after successful order
    cart.items = [];
    await cart.save();
    
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get orders by user ID
router.get('/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .populate('items.product')
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get order by ID
router.get('/order/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate('items.product');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update order status
router.put('/:orderId/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status },
      { new: true }
    ).populate('items.product');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;