import React, { useEffect, useState } from "react";
import {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";
import "./ProductList.css"; // Import the CSS file

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
  };

  const handleAddProduct = async () => {
    await addProduct(newProduct);
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchProducts();
  };

  return (
    <div className="product-container">
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price} - {product.quantity} in stock
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h3>Add Product</h3>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        onChange={(e) =>
          setNewProduct({ ...newProduct, price: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Quantity"
        onChange={(e) =>
          setNewProduct({ ...newProduct, quantity: e.target.value })
        }
      />
      <button onClick={handleAddProduct}>Add</button>
    </div>
  );
};

export default ProductList;
