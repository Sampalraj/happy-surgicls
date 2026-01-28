import React, { useState, useEffect } from 'react';
import { Truck, Users, Activity, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabaseService } from '../utils/supabaseService';

const Services = () => {
    const [content, setContent] = useState({
        title: 'Our Services',
        subtitle: 'Comprehensive healthcare solutions for hospitals, clinics, and distributors.',
        items: []
    });

    useEffect(() => {
        const loadContent = async () => {
            const data = await supabaseService.getPageContent('services');
            if (data) {
                setContent(prev => ({ ...prev, ...data }));
            }
        };
        loadContent();
    }, []);

    return (
        <div className="services-page">
            {/* Hero */}
            <section style={{ background: '#d32f2f', color: 'white', padding: '5rem 0', textAlign: 'center' }}>
                <div className="container">
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{content.title}</h1>
                    <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '800px', margin: '0 auto' }}>
                        {content.subtitle}
                    </p>
                </div>
            </section>

            {/* Service 1: Rentals */}
            <section style={{ padding: '5rem 0', borderBottom: '1px solid #eee' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '4rem', alignItems: 'center' }}>
                        <div>
                            <div style={{ color: '#d32f2f', marginBottom: '1rem' }}><Activity size={48} /></div>
                            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Medical Equipment Rental</h2>
                            <p style={{ color: '#666', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                                We provide high-end medical equipment on flexible rental terms. Ideal for home care setups or hospitals needing temporary capacity expansion during peak loads.
                            </p>
                            <ul style={{ marginBottom: '2rem', display: 'grid', gap: '0.5rem', color: '#555' }}>
                                <li>• Ventilators & BiPAPs</li>
                                <li>• Oxygen Concentrators (5L/10L)</li>
                                <li>• Cardiac Monitors & Pulse Oximeters</li>
                                <li>• Hospital Beds (ICU/Fowler)</li>
                            </ul>
                            <Link to="/contact" className="btn btn-primary" style={{ background: '#d32f2f', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '4px' }}>Request Rental Quote</Link>
                        </div>
                        <div>
                            <img src="/services-rental.jpg" alt="Equipment Rental" style={{ width: '100%', borderRadius: '8px' }}
                                onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=Medical+Equipment+Rental' }} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Service 2: Bulk Supply */}
            <section style={{ padding: '5rem 0', background: '#f8f9fa' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center' }}>
                        <div>
                            <img src="/services-bulk.jpg" alt="Bulk Supply" style={{ width: '100%', borderRadius: '8px' }}
                                onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=Bulk+Supply' }} />
                        </div>
                        <div>
                            <div style={{ color: '#004daa', marginBottom: '1rem' }}><Truck size={48} /></div>
                            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Bulk Supply for Hospitals</h2>
                            <p style={{ color: '#666', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                                End-to-end procurement solutions for large institutions. We offer competitive tiered pricing for bulk orders of consumables, disposables, and furniture.
                            </p>
                            <p style={{ color: '#666', marginBottom: '1.5rem', fontStyle: 'italic' }}>
                                "Trusted by over 150+ Hospitals across India for timely supplies."
                            </p>
                            <Link to="/contact" className="btn btn-primary" style={{ background: '#004daa', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '4px' }}>Get Institutional Rates</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service 3: Partnerships */}
            <section style={{ padding: '5rem 0' }}>
                <div className="container" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ color: '#d32f2f', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}><Users size={48} /></div>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Distributor Partnership Program</h2>
                    <p style={{ color: '#666', marginBottom: '2rem', lineHeight: '1.6' }}>
                        We are expanding our network! Join us as an authorized dealer or distributor. We provide complete marketing support, attractive margins, and product training to help you grow.
                    </p>
                    <Link to="/contact" className="btn btn-outline" style={{ border: '2px solid #d32f2f', color: '#d32f2f', padding: '0.75rem 2rem', borderRadius: '4px', fontWeight: 'bold' }}>Apply for Partnership</Link>
                </div>
            </section>

            {/* Contact Strip */}
            <section style={{ background: '#333', color: 'white', padding: '2rem 0' }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
                    <Phone /> <span>Need immediate assistance? Call our Support Line: <strong>+91 98765 43210</strong></span>
                </div>
            </section>
        </div>
    );
};

export default Services;
