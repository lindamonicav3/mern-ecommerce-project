import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { createRazorpayOrder, razorpayVerify } from '../services/orderService';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // console.log('Checkout-cart', cart);

  const handleChange = e => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    try {
      setLoading(true);

      if (!address.fullName || !address.phone || !address.address) {
        toast.error('Please fill all required fields');
        setLoading(false);
        return;
      }

      const razorpayOrder = await createRazorpayOrder({
        totalAmount: total,
      });

      // console.log('Razorpay Order:', razorpayOrder);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        order_id: razorpayOrder.id,
        name: 'AURIA',
        description: 'Order Payment',

        handler: async function (response) {
          // console.log('Razorpay Response:', response);
          await razorpayVerify({
            ...response,
            items: cart,
            totalAmount: total,
            shippingDetails: address,
          });


          clearCart();
          toast.success('Payment Successful!');
          navigate('/order-success');
        },

        modal: {
          ondismiss: function () {
            setLoading(false);
            toast.error('Payment Cancelled');
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      toast.error('Payment failed');
      setLoading(false);
    }
  };

  if (!cart || cart.length === 0)
    return <h2 className="text-center mt-10">Cart is Empty</h2>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl mb-6">Checkout</h1>

      {/* Address */}
      <div className="mb-6">
        <label className="block mb-2">Shipping Address</label>
        <input
          placeholder="Full Name"
          name="fullName"
          value={address.fullName}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        />

        <input
          placeholder="Phone Number"
          name="phone"
          value={address.phone}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        />
        <textarea
          placeholder="Address"
          name="address"
          value={address.address}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
          rows="3"
          required
        />
        <input
          placeholder="City"
          name="city"
          value={address.city}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        />
        <input
          placeholder="State"
          name="state"
          value={address.state}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        />
        <input
          placeholder="Pincode"
          name="pincode"
          value={address.pincode}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        />
      </div>

      {/* Order Summary */}
      <div className="border p-4 rounded-lg">
        <h2 className="text-xl mb-4">Order Summary</h2>

        {cart.map(item => (
          <div key={item._id} className="flex justify-between mb-2">
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}

        <hr className="my-4" />

        <h3 className="text-lg font-semibold">Total: ₹{total.toFixed(2)}</h3>
      </div>

      <button
        onClick={handlePayment}
        disabled={loading}
        className="mt-6 w-full bg-black text-white py-3 rounded-lg"
      >
        {loading ? 'Processing...' : 'Place Order'}
      </button>
    </div>
  );
};

export default Checkout;
