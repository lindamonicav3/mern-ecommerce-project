const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white font-semibold mb-4">AURIA</h3>
          <p>Premium lifestyle products curated for modern living.</p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Categories</h3>
          <p>Jewellery</p>
          <p>Clothing</p>
          <p>Phone Accessories</p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Support</h3>
          <p>Contact</p>
          <p>Returns</p>
          <p>Order Tracking</p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Follow Us</h3>
          <p>Instagram</p>
          <p>Facebook</p>
          <p>Twitter</p>
        </div>
      </div>

      <p className="text-center text-gray-500 mt-10">
        © {new Date().getFullYear()} AURIA. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
