import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Search, Plus, Edit, Eye } from 'lucide-react';
import './Customers.css';

interface Customer {
  id: string;
  name: string;
  mobile: string;
  email: string | null;
  businessName: string | null;
  status: string;
  type: string;
}

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    try {
      const response = await api.get(`/customers?search=${search}`);
      setCustomers(response.data);
    } catch (error) {
      console.error('Failed to fetch customers', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [search]);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Customers CRM</h1>
        <button className="btn-primary">
          <Plus size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          Add Customer
        </button>
      </div>

      <div className="card">
        <div className="table-toolbar">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search customers..." 
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
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center">No customers found</td>
                  </tr>
                ) : (
                  customers.map(c => (
                    <tr key={c.id}>
                      <td>
                        <div className="customer-name">{c.name}</div>
                        {c.businessName && <div className="customer-business">{c.businessName}</div>}
                      </td>
                      <td>
                        <div>{c.mobile}</div>
                        {c.email && <div className="text-muted text-sm">{c.email}</div>}
                      </td>
                      <td>
                        <span className={`badge badge-${c.type.toLowerCase()}`}>{c.type}</span>
                      </td>
                      <td>
                        <span className={`status-dot status-${c.status.toLowerCase()}`}></span>
                        {c.status}
                      </td>
                      <td className="actions">
                        <button className="icon-btn" title="View"><Eye size={18} /></button>
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

export default Customers;
