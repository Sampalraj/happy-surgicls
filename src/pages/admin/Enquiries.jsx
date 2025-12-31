import React, { useState, useEffect } from 'react';
import { Eye, CheckCircle, Search, Trash2 } from 'lucide-react';
import { supabaseService } from '../../utils/supabaseService';

const Enquiries = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadEnquiries = async () => {
        setLoading(true);
        const data = await supabaseService.getEnquiries();
        setEnquiries(data || []);
        setLoading(false);
    };

    useEffect(() => {
        loadEnquiries();
    }, []);

    const handleMarkResolved = async (id) => {
        try {
            await supabaseService.updateEnquiryStatus(id, 'Resolved');
            loadEnquiries();
        } catch (error) {
            console.error(error);
            alert('Failed to update status');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this enquiry?')) {
            try {
                await supabaseService.deleteEnquiry(id);
                loadEnquiries();
            } catch (error) {
                console.error(error);
                alert('Failed to delete enquiry');
            }
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
                                    <td style={{ fontSize: '0.85rem', color: '#666' }}>{new Date(enq.created_at || Date.now()).toLocaleDateString()}</td>
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
