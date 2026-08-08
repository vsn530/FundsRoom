import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Search, Plus, FileText } from 'lucide-react';

interface Challan {
  id: string;
  challanNo: string;
  customer: { name: string };
  totalQuantity: number;
  status: string;
  timestamp: string;
}

const Challans: React.FC = () => {
  const [challans, setChallans] = useState<Challan[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchChallans = async () => {
    try {
      const response = await api.get('/challans');
      setChallans(response.data);
    } catch (error) {
      console.error('Failed to fetch challans', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChallans();
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Sales Challans</h1>
        <button className="btn-primary">
          <Plus size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          Create Challan
        </button>
      </div>

      <div className="card">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Challan No</th>
                  <th>Customer</th>
                  <th>Total Quantity</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {challans.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center">No challans found</td>
                  </tr>
                ) : (
                  challans.map(c => (
                    <tr key={c.id}>
                      <td>
                        <span style={{fontFamily: 'monospace', fontWeight: 600, color: 'var(--primary-color)'}}>
                          {c.challanNo}
                        </span>
                      </td>
                      <td>{c.customer?.name}</td>
                      <td>{c.totalQuantity} items</td>
                      <td>{new Date(c.timestamp).toLocaleDateString()}</td>
                      <td>
                        <span className={`badge ${c.status === 'CONFIRMED' ? 'badge-wholesale' : 'badge-retail'}`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="actions">
                        <button className="icon-btn" title="View"><FileText size={18} /></button>
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

export default Challans;
