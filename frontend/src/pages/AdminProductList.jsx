import { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { getAllProducts, deleteProduct } from '../services/productService';
import { useNavigate } from 'react-router-dom';

function AdminProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
  };

  const handleDelete = async id => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this product?'
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      setProducts(products.filter(product => product._id !== id));
    } catch (error) {
      console.error(error);
      alert('Delete failed');
    }
  };

  const filteredProducts = products
    .filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter(product =>
      categoryFilter ? product.category === categoryFilter : true
    )
    .sort((a, b) => {
      if (sortBy === 'priceLow') return a.price - b.price;
      if (sortBy === 'priceHigh') return b.price - a.price;
      if (sortBy === 'stockLow') return a.stock - b.stock;
      if (sortBy === 'stockHigh') return b.stock - a.stock;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">All Products</h2>

        <button
          onClick={() => navigate('/admin/add-product')}
          className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800"
        >
          + Add Product
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-6">
        <div className="flex flex-wrap gap-4 mb-6">
          {/* Search */}
          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border px-4 py-2 rounded-lg w-64"
          />

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="border px-4 py-2 rounded-lg"
          >
            <option value="">All Categories</option>
            <option value="jewellery">Jewellery</option>
            <option value="clothing">Women's Clothing</option>
            <option value="phone">Phone Accessories</option>
          </select>

          {/* Sorting */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="border px-4 py-2 rounded-lg"
          >
            <option value="">Sort By</option>
            <option value="priceLow">Price: Low → High</option>
            <option value="priceHigh">Price: High → Low</option>
            <option value="stockLow">Stock: Low → High</option>
            <option value="stockHigh">Stock: High → Low</option>
          </select>
        </div>

        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-200 text-center">
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr
                key={product._id}
                className="border-b text-center align-middle"
              >
                <td className="p-3">
                  <div className="flex justify-center items-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </div>
                </td>
                <td className="p-4">{product.name}</td>
                <td className="p-4">₹{product.price}</td>
                <td className="p-4">{product.stock}</td>
                <td className="p-4">
                  <div className="flex justify-center items-center gap-5">
                    {/* Edit Icon */}
                    <button
                      onClick={() =>
                        navigate(`/admin/product/edit/${product._id}`)
                      }
                      className="text-blue-600 hover:text-blue-800 text-lg"
                    >
                      <FaEdit />
                    </button>

                    {/* Delete Icon */}
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-600 hover:text-red-800 text-lg"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminProductList;
