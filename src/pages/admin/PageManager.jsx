import React, { useState } from 'react';
import { Edit, Eye, Save } from 'lucide-react';

const PageManager = () => {
    const [pages, setPages] = useState([
        { id: 1, name: 'Home Page', slug: '/', status: 'Published', lastModified: '2023-12-10' },
        { id: 2, name: 'About Us', slug: '/about', status: 'Published', lastModified: '2023-11-15' },
        { id: 3, name: 'Contact Us', slug: '/contact', status: 'Published', lastModified: '2023-11-20' },
        { id: 4, name: 'Privacy Policy', slug: '/privacy', status: 'Draft', lastModified: '2023-12-01' },
    ]);

    const [editingPage, setEditingPage] = useState(null);

    const handleEdit = (page) => {
        setEditingPage(page);
    };

    const handleSave = () => {
        setEditingPage(null);
        // Mock save logic
    };

    return (
        <div className="page-manager">
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Page Content</h2>
                {!editingPage && <button className="btn btn-primary">Add New Page</button>}
            </div>

            {!editingPage ? (
                <div className="card" style={{ background: 'white', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Page Name</th>
                                <th>URL Slug</th>
                                <th>Status</th>
                                <th>Last Modified</th>
                                <th style={{ textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pages.map(page => (
                                <tr key={page.id}>
                                    <td style={{ fontWeight: '500' }}>{page.name}</td>
                                    <td style={{ color: '#666' }}>{page.slug}</td>
                                    <td>
                                        <span style={{
                                            padding: '0.25rem 0.5rem',
                                            borderRadius: '12px',
                                            fontSize: '0.75rem',
                                            background: page.status === 'Published' ? '#e6fffa' : '#fffaf0',
                                            color: page.status === 'Published' ? '#38a169' : '#dd6b20'
                                        }}>
                                            {page.status}
                                        </span>
                                    </td>
                                    <td style={{ color: '#666', fontSize: '0.9rem' }}>{page.lastModified}</td>
                                    <td style={{ textAlign: 'right' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                            <button onClick={() => handleEdit(page)} className="btn-icon" title="Edit Content"><Edit size={16} /></button>
                                            <button className="btn-icon" title="View Page"><Eye size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="edit-mode">
                    <div className="card" style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Editing: {editingPage.name}</h3>
                            <button onClick={() => setEditingPage(null)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', textDecoration: 'underline' }}>Cancel</button>
                        </div>

                        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                            <label className="form-label">Page Title (SEO)</label>
                            <input type="text" className="form-control" defaultValue={editingPage.name} />
                        </div>

                        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                            <label className="form-label">Page Content</label>
                            <div style={{ border: '1px solid #ddd', borderRadius: '4px', minHeight: '200px', background: '#fafafa', padding: '1rem', color: '#666' }}>
                                [Rich Text Editor Placeholder]
                                <br /><br />
                                Content for {editingPage.name} goes here...
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                            <button className="btn btn-primary" onClick={handleSave} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                <Save size={18} /> Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default PageManager;
