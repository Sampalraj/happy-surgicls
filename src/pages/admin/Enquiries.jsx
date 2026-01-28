import React, { useState, useEffect } from 'react';
import { Eye, CheckCircle, Search, Trash2, Mail, Clock } from 'lucide-react';
import { supabaseService } from '../../utils/supabaseService';

const Enquiries = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

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
            alert('Failed to update status');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this enquiry?')) {
            try {
                await supabaseService.deleteEnquiry(id);
                loadEnquiries();
            } catch (error) {
                alert('Failed to delete enquiry');
            }
        }
    };

    const filtered = enquiries.filter(e =>
        e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="enquiries-page">
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h2 className="page-title">Enquiries</h2>
                    <p style={{ color: '#6B7280', marginTop: '0.5rem' }}>Manage customer questions and order requests.</p>
                </div>

                <div style={{ position: 'relative', width: '300px' }}>
                    <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                    <input
                        type="text"
                        placeholder="Search enquiries..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%', padding: '0.75rem 1rem 0.75rem 3rem',
                            borderRadius: '16px', border: 'none', background: 'white',
                            boxShadow: 'var(--shadow-soft)', outline: 'none'
                        }}
                    />
                </div>
            </div>

            {/* Card List View */}
            <div className="card-list">
                {filtered.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem', color: '#9CA3AF' }}>No enquiries found.</div>
                ) : (
                    filtered.map((enq) => (
                        <div key={enq.id} className="card-list-item" style={{ background: 'white', borderRadius: '24px', padding: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', boxShadow: 'var(--shadow-soft)' }}>

                            {/* Left: Info */}
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                <div style={{
                                    background: enq.status === 'Resolved' ? '#DEF7EC' : '#FEF3C7',
                                    color: enq.status === 'Resolved' ? '#03543F' : '#92400E',
                                    padding: '0.75rem', borderRadius: '50%'
                                }}>
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.25rem' }}>
                                        <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1F2937', margin: 0 }}>{enq.subject}</h4>
                                        <span style={{
                                            fontSize: '0.75rem', fontWeight: '600', padding: '2px 8px', borderRadius: '10px',
                                            background: enq.status === 'Resolved' ? '#DEF7EC' : '#FEF3C7',
                                            color: enq.status === 'Resolved' ? '#03543F' : '#92400E'
                                        }}>
                                            {enq.status || 'Pending'}
                                        </span>
                                    </div>
                                    <p style={{ color: '#6B7280', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                                        From: <span style={{ color: '#374151', fontWeight: '500' }}>{enq.name}</span> ({enq.email})
                                    </p>
                                    <p style={{ color: '#4B5563', lineHeight: '1.5', maxWidth: '600px', background: '#F9FAFB', padding: '0.75rem', borderRadius: '12px' }}>
                                        {enq.message}
                                    </p>
                                </div>
                            </div>

                            {/* Right: Actions & Date */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem' }}>
                                <div style={{ fontSize: '0.85rem', color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    <Clock size={14} /> {new Date(enq.created_at).toLocaleDateString()}
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    {enq.status !== 'Resolved' && (
                                        <button
                                            onClick={() => handleMarkResolved(enq.id)}
                                            className="btn"
                                            style={{ background: '#DEF7EC', color: '#03543F', padding: '0.5rem 1rem', fontSize: '0.85rem', display: 'flex', gap: '0.25rem' }}
                                        >
                                            <CheckCircle size={16} /> Resolve
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(enq.id)}
                                        style={{
                                            background: '#FEE2E2', color: '#EF4444', border: 'none',
                                            padding: '0.5rem', borderRadius: '50%', width: '36px', height: '36px',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                                        }}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Enquiries;
