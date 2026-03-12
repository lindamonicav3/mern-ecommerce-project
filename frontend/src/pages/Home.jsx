import Navbar from '../components/Navbar';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import { useEffect, useState } from 'react';
import { getAllProducts } from '../services/productService';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();

        // Example: top 4 products as best sellers
        setProducts(data.slice(0, 4));
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <img
          src="/images/clothing_landscape.png"
          alt="Fashion lifestyle"
          className="absolute inset-0 w-full h-full object-cover object-[center_25%]"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/35"></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-serif font-semibold leading-tight">
            Elevate Your Everyday Style
          </h1>

          <p className="mt-6 text-lg text-gray-200">
            Discover curated jewellery, stylish clothing and modern phone
            accessories designed for everyday living.
          </p>

          {/* Shop Now Button */}
          <div className="mt-8">
            <a
              href="/collection/clothing"
              className="inline-block px-8 py-3 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition duration-300"
            >
              Shop Now
            </a>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="py-10 bg-gray-50 border-y">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center text-center group">
            <div className="text-3xl mb-2 group-hover:scale-110 transition">
              🔒
            </div>
            <p className="font-semibold">Secure Payments</p>
            <p className="text-sm text-gray-500">100% protected checkout</p>
          </div>

          <div className="flex flex-col items-center text-center group">
            <div className="text-3xl mb-2 group-hover:scale-110 transition">
              📞
            </div>
            <p className="font-semibold">24/7 Support</p>
            <p className="text-sm text-gray-500">We’re here to help</p>
          </div>

          <div className="flex flex-col items-center text-center group">
            <div className="text-3xl mb-2 group-hover:scale-110 transition">
              ↩️
            </div>
            <p className="font-semibold">Easy Returns</p>
            <p className="text-sm text-gray-500">Hassle-free returns</p>
          </div>

          <div className="flex flex-col items-center text-center group">
            <div className="text-3xl mb-2 group-hover:scale-110 transition">
              🚚
            </div>
            <p className="font-semibold">Fast Delivery</p>
            <p className="text-sm text-gray-500">Quick doorstep shipping</p>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-16 bg-ivory">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-4xl text-center mb-16">
            Curated Collections
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            <CategoryCard
              title="Jewellery"
              image="/images/Jewellery.jpg"
              link="/collection/jewellery"
            />
            <CategoryCard
              title="Clothing"
              image="/images/Clothing.jpg"
              link="/collection/clothing"
            />
            <CategoryCard
              title="Phone Accessories"
              image="/images/Phone_essentials.jpg"
              link="/collection/phone"
            />
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-4xl mb-16 text-center">
            Best Sellers
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1520975922284-0b58c8a0b8e1')",
        }}
      >
        <div className="bg-black/60 py-24">
          <div className="max-w-4xl mx-auto text-center text-white px-6">
            <h2 className="font-serif text-4xl mb-4">
              Style that fits your lifestyle
            </h2>

            <p className="text-lg text-gray-200 mb-6">
              Discover pieces designed for everyday elegance.
            </p>

            <button
              onClick={() => navigate('/collection/jewellery')}
              className="bg-white text-black px-6 py-3 rounded-full hover:bg-gray-200"
            >
              Shop Now
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
