// src/components/Product.js
import React from 'react';

const Product = ({ name, price, description }) => (
  <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '5px' }}>
    <h3>{name}</h3>
    <p><strong>Price:</strong> ${price}</p>
    <p><strong>Description:</strong> {description}</p>
  </div>
);

export default Product;
