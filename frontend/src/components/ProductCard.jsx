import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const { cart, addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const isInCart = cart.some(item => item._id === product?._id);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition duration-300 p-4">
      <Link to={`/product/${product._id}`}>
        <div className="h-56 overflow-hidden rounded-xl mb-4 bg-gray-100 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition duration-300"
          />
        </div>

        <h3 className="font-semibold text-[17px] line-clamp-2 leading-snug min-h-[3rem]">
          {product.name}
        </h3>
        <p className="text-gray-500 mt-1">₹{product.price}</p>
      </Link>

      {isInCart ? (
        <Link
          to="/cart"
          className="mt-4 block text-center w-full py-2 rounded-lg bg-green-600 text-white"
        >
          Go to Cart
        </Link>
      ) : (
        <button
          onClick={handleAddToCart}
          className="mt-4 w-full py-2 rounded-lg bg-black text-white hover:bg-gray-800"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;
