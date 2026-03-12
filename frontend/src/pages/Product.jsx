import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { useCart } from '../context/CartContext';

const Product = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { cart, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const existingItem = cart.find(item => item._id === product?._id);

  const fetchProduct = async () => {
    try {
      // console.log(id);
      const data = await getProductById(id);
      setProduct(data);
      // console.log(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
      {/* Image */}
      <div>
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-2xl shadow-md"
        />
      </div>

      {/* Details */}
      <div>
        <h1 className="text-4xl font-serif mb-4">{product.name}</h1>
        <p className="text-2xl text-gray-600 mb-6">₹{product.price}</p>
        {/* {product.stock < 5 && (
          <p className="text-red-500 text-sm mb-4">
            Only {product.stock} items left in stock
          </p>
        )} */}
        <p className="text-gray-500 mb-6">{product.description}</p>

        <p className="mb-4">Stock: {product.stock}</p>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center border rounded-lg">
            <button
              onClick={() => setQuantity(prev => (prev > 1 ? prev - 1 : 1))}
              className="px-4 py-2"
            >
              -
            </button>

            <span className="px-4">{quantity}</span>

            <button
              onClick={() =>
                setQuantity(prev => (prev < product.stock ? prev + 1 : prev))
              }
              className="px-4 py-2"
            >
              +
            </button>
          </div>

          {existingItem ? (
            <button className="px-8 py-3 rounded-xl bg-green-600 text-white">
              Already in Cart ({existingItem.quantity})
            </button>
          ) : (
            <button
              onClick={() => {
                addToCart({ ...product, quantity });
              }}
              className="px-8 py-3 rounded-xl bg-black text-white hover:bg-gray-800"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
