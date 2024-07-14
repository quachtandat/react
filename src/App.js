import './App.css';
import React, { useState , useEffect } from 'react';
import Product from './components/Product';

function App() {
  /* tạo api hiện */
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchUsers();
  }, []);


 // State để lưu trữ danh sách sản phẩm
 const [products, setProducts] = useState([
  { id: 1, name: 'Product 1', price: 10, description: 'Description for Product 1' },
  { id: 2, name: 'Product 2', price: 20, description: 'Description for Product 2' },
  { id: 3, name: 'Product 3', price: 30, description: 'Description for Product 3' }
]);

// State để lưu trữ thông tin sản phẩm mới
const [newProduct, setNewProduct] = useState({
  name: '',
  price: '',
  description: ''
});

 // Hàm xử lý khi người dùng nhập thông tin sản phẩm mới
 const handleInputChange = (e) => {
  const { name, value } = e.target;
  setNewProduct({ ...newProduct, [name]: value });
};

// Hàm xử lý khi người dùng thêm sản phẩm mới
const addProduct = () => {
  // Tạo một sản phẩm mới từ state newProduct
  const product = {
    id: products.length + 1,
    name: newProduct.name,
    price: parseFloat(newProduct.price),
    description: newProduct.description
  };

// Thêm sản phẩm vào danh sách sản phẩm
setProducts([...products, product]);

// Đặt lại state newProduct về trạng thái ban đầu để chuẩn bị cho sản phẩm tiếp theo
setNewProduct({ name: '', price: '', description: '' });
};

  return (
    <div className="App">
    <h1>Product List</h1>

    {/* Form nhập thông tin sản phẩm mới */}
    <form onSubmit={(e) => { e.preventDefault(); addProduct(); }}>
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={newProduct.name}
        onChange={handleInputChange}
        required
      />
      <br />
      <input
        type="number"
        name="price"
        placeholder="Product Price"
        value={newProduct.price}
        onChange={handleInputChange}
        required
      />
      <br />
      <textarea
        name="description"
        placeholder="Product Description"
        value={newProduct.description}
        onChange={handleInputChange}
        required
      ></textarea>
      <br />
      <button type="submit">Add Product</button>
    </form>

    {/* Hiển thị danh sách sản phẩm */}
    <div className='products'>
      {products.map((product) => (
        <Product
          key={product.id}
          name={product.name}
          price={product.price}
          description={product.description}
        />
      ))}
    </div>

    {/* KẾT HỢP API */}

    <h1>Users List</h1>
    <div className="users-list">
    {users.map(user => (
          <div key={user.id} className="user-card">
            <h2>{user.name}</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
          </div>
        ))}
    </div>
  </div>
  );
}

export default App;
