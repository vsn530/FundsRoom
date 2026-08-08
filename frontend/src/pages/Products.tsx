import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Search, Plus, Edit, ArrowRightLeft } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  unitPrice: number;
  stock: number;
  minStockAlert: number;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await api.get(`/products?search=${search}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search]);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Inventory</h1>
        <button className="btn-primary">
          <Plus size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          Add Product
        </button>
      </div>

      <div className="card">
        <div className="table-toolbar">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search products by SKU or Name..." 
              className="input-field pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Product Details</th>
                  <th>SKU</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center">No products found</td>
                  </tr>
                ) : (
                  products.map(p => (
                    <tr key={p.id}>
                      <td>
                        <div className="customer-name">{p.name}</div>
                      </td>
                      <td><span style={{fontFamily: 'monospace', color: 'var(--text-muted)'}}>{p.sku}</span></td>
                      <td>{p.category}</td>
                      <td>${p.unitPrice.toFixed(2)}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ 
                            fontWeight: 600, 
                            color: p.stock <= p.minStockAlert ? 'var(--danger)' : 'var(--success)' 
                          }}>
                            {p.stock}
                          </span>
                          {p.stock <= p.minStockAlert && (
                            <span className="badge badge-retail" style={{backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)'}}>Low Stock</span>
                          )}
                        </div>
                      </td>
                      <td className="actions">
                        <button className="icon-btn" title="Stock Movement"><ArrowRightLeft size={18} /></button>
                        <button className="icon-btn" title="Edit"><Edit size={18} /></button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
