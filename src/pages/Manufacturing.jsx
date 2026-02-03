import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabaseService } from '../utils/supabaseService';

const Manufacturing = () => {
    const [content, setContent] = useState({
        title: 'Manufacturing Excellence',
        subtitle: 'State-of-the-art facility',
        content: 'Our state-of-the-art manufacturing facility operates under strict ISO 13485:2016 and GMP guidelines. We combine advanced automation with skilled craftsmanship.',
        image: null,
        facilities: []
    });

    useEffect(() => {
        const loadContent = async () => {
            const data = await supabaseService.getPageContent('manufacturing');
            if (data) {
                setContent(prev => ({ ...prev, ...data }));
            }
        };
        loadContent();
    }, []);

    return (
        <div style={{ padding: '5rem 0', background: '#f8fafc', minHeight: '80vh' }}>
            <div className="container">
                <div style={{ background: 'white', padding: '3rem', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                    <h1 style={{ color: '#1e3a8a', fontSize: '2.5rem', marginBottom: '0.5rem' }}>{content.title}</h1>
                    {content.subtitle && <p style={{ color: '#64748b', marginBottom: '1.5rem', fontWeight: 500 }}>{content.subtitle}</p>}

                    <p style={{ color: '#64748b', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto 2rem' }}>
                        {content.content}
                    </p>

                    {/* Video Cover Section */}
                    <div style={{ position: 'relative', width: '100%', height: '400px', borderRadius: '12px', overflow: 'hidden', marginBottom: '2rem', cursor: 'pointer', group: 'group' }}>
                        <img
                            src={content.image || "/factory-cover.jpg"}
                            alt="Factory Tour"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                            className="factory-image"
                            onError={(e) => e.target.src = 'https://placehold.co/1200x600/e2e8f0/64748b?text=Factory+Tour+Video'}
                        />
                        {/* Overlay */}
                        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(0,0,0,0.2)' }}>
                                <div style={{
                                    width: 0,
                                    height: 0,
                                    borderTop: '15px solid transparent',
                                    borderBottom: '15px solid transparent',
                                    borderLeft: '24px solid #0F766E',
                                    marginLeft: '6px'
                                }}></div>
                            </div>
                        </div>
                    </div>

                    {content.facilities && content.facilities.length > 0 && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem', textAlign: 'left' }}>
                            {content.facilities.map((facility, index) => (
                                <div key={index} style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #2EBF68' }}>
                                    <h3 style={{ fontSize: '1.1rem', color: '#1e293b', marginBottom: '0.5rem' }}>{facility.title}</h3>
                                    <p style={{ fontSize: '0.9rem', color: '#64748b' }}>{facility.desc}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    <Link to="/contact" className="btn btn-primary" style={{ display: 'inline-block', padding: '0.8rem 2rem', background: '#1e3a8a', color: 'white', textDecoration: 'none', borderRadius: '6px' }}>
                        Schedule a Factory Visit
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Manufacturing;
