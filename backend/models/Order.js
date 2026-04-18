import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ],
    deliveryMode: {
      type: String,
      required: true,
      enum: ['Online', 'Offline'],
      default: 'Online',
    },
    shippingAddress: {
      fullName: { type: String, required: function() { return this.deliveryMode === 'Online'; } },
      address: { type: String, required: function() { return this.deliveryMode === 'Online'; } },
      city: { type: String, required: function() { return this.deliveryMode === 'Online'; } },
      postalCode: { type: String, required: function() { return this.deliveryMode === 'Online'; } },
      phone: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true, // bKash, Nagad, CashOnDelivery
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
