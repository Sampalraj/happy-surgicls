import React, { useState, useEffect } from 'react';
import { Eye, CheckCircle, Search, Trash2 } from 'lucide-react';
import { mockBackend } from '../../utils/mockBackend';

const Enquiries = () => {
    const [enquiries, setEnquiries] = useState([]);

    useEffect(() => {
        // Load enquiries from backend
        setEnquiries(mockBackend.getEnquiries());
    }, []);

    const handleMarkResolved = (id) => {
        mockBackend.updateEnquiryStatus(id, 'Resolved');
        setEnquiries(mockBackend.getEnquiries()); // Refresh
    };

    const handleDelete = (id) => {
        if (window.confirm('Delete this enquiry?')) {
            mockBackend.deleteEnquiry(id);
            setEnquiries(mockBackend.getEnquiries());
        }
    };

    return (
        <div className="enquiries-page">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Enquiries & Requests</h2>
                <div style={{ position: 'relative' }}>
                    <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                    <input type="text" placeholder="Search enquiries..." style={{ padding: '0.5rem 0.5rem 0.5rem 2.2rem', borderRadius: '4px', border: '1px solid #ddd', width: '250px' }} />
                </div>
            </div>

            <div className="card" style={{ background: 'white', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Name</th>
                            <th>Subject</th>
                            <th>Status</th>
                            <th>Detail</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enquiries.length === 0 ? (
                            <tr><td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>No enquiries found.</td></tr>
                        ) : (
                            enquiries.map((enq) => (
                                <tr key={enq.id}>
                                    <td style={{ fontSize: '0.85rem', color: '#666' }}>{new Date(enq.date).toLocaleDateString()}</td>
                                    <td>
                                        <div style={{ fontWeight: '500' }}>{enq.name}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#888' }}>{enq.email}</div>
                                    </td>
                                    <td style={{ fontWeight: '500' }}>{enq.subject}</td>
                                    <td>
                                        <span style={{
                                            padding: '0.25rem 0.5rem',
                                            borderRadius: '12px',
                                            fontSize: '0.75rem',
                                            fontWeight: 'bold',
                                            background: enq.status === 'Resolved' ? '#e6fffa' : '#fff5f5',
                                            color: enq.status === 'Resolved' ? '#38a169' : '#c53030'
                                        }}>
                                            {enq.status}
                                        </span>
                                    </td>
                                    <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#666' }}>
                                        {enq.message}
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            {enq.status !== 'Resolved' && (
                                                <button onClick={() => handleMarkResolved(enq.id)} className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', color: 'green', borderColor: 'green' }} title="Mark Resolved">
                                                    <CheckCircle size={14} />
                                                </button>
                                            )}
                                            <button onClick={() => handleDelete(enq.id)} className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', color: 'red', borderColor: 'red' }} title="Delete">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Enquiries;
