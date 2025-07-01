import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", price: "", stock: "", quantityLabel: ""});
  const [image, setImage] = useState(null);
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  const API = "https://api-padpu-farms-backend.onrender.com/api/admin/products";

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get(API);
    setProducts(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("stock", form.stock);
    formData.append("quantityLabel", form.quantityLabel);
    if (image) formData.append("image", image);

    if (editId) {
      await axios.put(`${API}/${editId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } else {
      await axios.post(API, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    setForm({ name: "", description: "", price: "", stock: "", quantityLabel: "" });
    setImage(null);
    setEditId(null);
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditId(product._id);
    setImage(null); // Reset image upload for editing
  };

  return (
    <div className="p-6">
        <button
            onClick={() => navigate(-1)}
            className="mb-4 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition duration-200"
            >
            ← Back
        </button>
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8 bg-white p-4 rounded shadow" encType="multipart/form-data">
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Product Name"
            className="border p-2 rounded w-full"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Price"
            className="border p-2 rounded w-full"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Quantity Label (e.g. 1 liter)"
            className="border p-2 rounded w-full"
            value={form.quantityLabel}
            onChange={(e) => setForm({ ...form, quantityLabel: e.target.value })}
            />
          <input
            type="number"
            placeholder="Stock"
            className="border p-2 rounded w-full"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            required
          />
          <input
            type="file"
            accept="image/*"
            className="border p-2 rounded w-full"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <textarea
          placeholder="Description"
          className="border p-2 rounded w-full"
          rows="3"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button
          type="submit"
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
        >
          {editId ? "Update Product" : "Add Product"}
        </button>
      </form>

      <div className="grid gap-4">
        {products.map((product) => (
          <div key={product._id} className="p-4 bg-white shadow rounded flex justify-between">
            <div>
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p>{product.description}</p>
              <p className="text-green-700 font-bold">₹{product.price} | Stock: {product.stock}</p>
              {product.imageUrl && (
                <img src={`https://api-padpu-farms-backend.onrender.com${product.imageUrl}`} alt={product.name} className="mt-2 w-32 h-32 object-cover rounded" />
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0">
              <button onClick={() => handleEdit(product)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded shadow-md transition duration-200 w-full sm:w-auto">
                Edit
              </button>
              <button onClick={() => handleDelete(product._id)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow-md transition duration-200 w-full sm:w-auto">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
