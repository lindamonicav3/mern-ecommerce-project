import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2 } from 'lucide-react';

const Cart = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-semibold mb-8">Your Cart</h1>

      {/* EMPTY CART */}
      {cart.length === 0 ? (
        <div className="text-center mt-20">
          <h2 className="text-2xl font-semibold mb-3">Your Cart is Empty</h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven't added anything yet.
          </p>

          <button
            onClick={() => navigate('/')}
            className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          {/* CART ITEMS */}
          <AnimatePresence>
            {cart.map(item => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="flex justify-between items-center border rounded-xl p-4 mb-4 shadow-sm bg-white"
              >
                <div className="flex items-center gap-4">
                  {/* PRODUCT IMAGE */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-xl border"
                  />

                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-500">₹{item.price}</p>

                    {item.stock <= 5 && (
                      <p className="text-xs text-red-500">
                        Only {item.stock} left in stock
                      </p>
                    )}

                    {/* QUANTITY */}
                    <div className="flex items-center mt-2 border rounded-lg w-fit">
                      <button
                        onClick={() => {
                          if (item.quantity > 1) {
                            updateQuantity(item._id, item.quantity - 1);
                          }
                        }}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        -
                      </button>

                      <span className="px-4">{item.quantity}</span>

                      <button
                        onClick={() => {
                          if (item.quantity < item.stock) {
                            updateQuantity(item._id, item.quantity + 1);
                          }
                        }}
                        disabled={item.quantity >= item.stock}
                        className={`px-3 py-1 ${
                          item.quantity >= item.stock
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        +
                      </button>
                    </div>

                    <p className="text-sm mt-1 text-gray-600">
                      Total: ₹{item.price * item.quantity}
                    </p>
                  </div>
                </div>

                {/* DELETE */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  drag="x"
                  dragConstraints={{ left: -100, right: 0 }}
                  onDragEnd={(event, info) => {
                    if (info.offset.x < -80) {
                      removeFromCart(item._id);
                    }
                  }}
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <Trash2 size={22} />
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* ORDER SUMMARY */}
          <div className="mt-10 p-6 border rounded-xl bg-gray-50">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="flex justify-between text-lg mb-4">
              <span>Total</span>
              <span className="font-semibold">₹{total.toFixed(2)}</span>
            </div>

            {user?.role !== 'ADMIN' ? (
              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
              >
                Proceed to Checkout
              </button>
            ) : (
              <p className="text-red-500 text-center">
                Admin accounts cannot place orders.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
