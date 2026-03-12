import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import {
  createProduct,
  imageUpload,
  updateProduct,
  getProductById,
} from '../services/productService';

function AdminAddProduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    stock: '',
    image: null,
  });

  const [isEdit, setIsEdit] = useState(false);
  const [productId, setProductId] = useState(null);

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    const data = await getProductById(id);

    setProduct(data);
    setPreview(data.image);
    setIsEdit(true);
    setProductId(id);
  };

  const onfieldChange = (e, field) => {
    setProduct({ ...product, [field]: e.target.value });
  };

  const onImageUpload = e => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmitProduct = async e => {
    e.preventDefault(); // prevent refresh

    if (!product.name.trim()) {
      return toast.error('Please enter product name');
    }

    if (!product.price) {
      return toast.error('Please enter price');
    }

    if (product.price <= 0) {
      return toast.error('Price must be greater than 0');
    }

    if (!product.category.trim()) {
      return toast.error('Please enter category');
    }

    if (!product.stock) {
      return toast.error('Please enter stock');
    }

    try {
      setLoading(true);

      let imageUrl = product.image;

      if (imageFile) {
        const formdata = new FormData();
        formdata.append('image', imageFile);

        const imageResponse = await imageUpload(formdata);
        imageUrl = imageResponse.url;
      }

      const updatedProduct = {
        ...product,
        image: imageUrl,
      };

      if (isEdit) {
        await updateProduct(productId, updatedProduct);
        toast.success('Product updated successfully');
      } else {
        await createProduct(updatedProduct);
        toast.success('Product added successfully');
      }

      navigate('/admin/products');
    } catch (error) {
      toast.error('Something went wrong');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {id ? 'Edit Product' : 'Add New Product'}
        </h2>

        <form onSubmit={onSubmitProduct} className="flex flex-col gap-4">
          <input
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={e => onfieldChange(e, 'name')}
            className="border rounded-lg p-3 focus:ring-2 focus:ring-black outline-none"
          />

          <input
            name="price"
            type="number"
            value={product.price}
            placeholder="Price"
            onChange={e => onfieldChange(e, 'price')}
            className="border rounded-lg p-3 focus:ring-2 focus:ring-black outline-none"
          />

          <input
            name="category"
            placeholder="Category"
            value={product.category}
            onChange={e => onfieldChange(e, 'category')}
            className="border rounded-lg p-3 focus:ring-2 focus:ring-black outline-none"
          />

          <input
            name="stock"
            type="number"
            placeholder="Stock"
            value={product.stock}
            onChange={e => onfieldChange(e, 'stock')}
            className="border rounded-lg p-3 focus:ring-2 focus:ring-black outline-none"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={product.description}
            rows="4"
            onChange={e => onfieldChange(e, 'description')}
            className="border rounded-lg p-3 focus:ring-2 focus:ring-black outline-none"
          />

          <input
            type="file"
            accept="image/*"
            onChange={onImageUpload}
            ref={fileInputRef}
            className="border rounded-lg p-3"
          />

          {preview && (
            <img
              src={preview}
              alt="Product preview"
              className="w-40 h-40 object-cover rounded-lg shadow-md"
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >
            {loading
              ? isEdit
                ? 'Updating...'
                : 'Adding...'
              : isEdit
                ? 'Update Product'
                : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminAddProduct;
