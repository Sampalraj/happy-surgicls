import React, { useEffect, useState } from 'react';
import { Target, Users, TrendingUp, ShieldCheck } from 'lucide-react';
import { supabaseService } from '../utils/supabaseService';
import styles from './Home.module.css'; // Reusing Home styles for consistency

const About = () => {
    const [content, setContent] = useState({});

    useEffect(() => {
        const loadContent = async () => {
            const data = await supabaseService.getPageContent('about');
            if (data) setContent(data);
        };
        loadContent();
    }, []);

    const icons = [<ShieldCheck size={32} />, <Users size={32} />, <TrendingUp size={32} />, <Target size={32} />];

    return (
        <div style={{ background: '#f8f9fa', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>

            {/* HERO SECTION (Split Layout) */}
            <div className={styles.heroSection} style={{ padding: '4rem 2rem', background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>

                    {/* Left Text */}
                    <div style={{ position: 'relative', zIndex: 10 }}>
                        <div style={{
                            display: 'inline-block', padding: '0.5rem 1rem', background: '#E0F2F1',
                            color: '#16A085', fontWeight: 'bold', fontSize: '0.85rem',
                            marginBottom: '1.5rem', letterSpacing: '0.05em'
                        }}>
                            ABOUT HAPPY SURGICALS
                        </div>
                        <h1 style={{ fontSize: '3rem', fontWeight: '800', lineHeight: '1.1', color: '#2C3E50', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                            {content.title || 'Precision in Every Instrument.'}
                        </h1>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#64748B', maxWidth: '540px' }}>
                            {content.content || 'We are dedicated to providing the highest quality surgical instruments defined by precision, durability, and reliability for healthcare professionals worldwide.'}
                        </p>
                    </div>

                    {/* Right Image with Diagonal Slash */}
                    <div className={styles.heroImageWrapper} style={{ height: '400px' }}>
                        <div className={styles.heroSlash}></div>
                        <img
                            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            alt="About Hero"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'relative', zIndex: 2 }}
                        />
                    </div>
                </div>
            </div>

            {/* DIAGRAM / PHILOSOPHY SECTION */}
            {content.diagram && (
                <div style={{ background: '#fff', padding: '6rem 2rem' }}>
                    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                            <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#2C3E50' }}>{content.diagram.title || 'Our Philosophy'}</h2>
                            <div style={{ width: '60px', height: '4px', background: '#2EBF68', margin: '1rem auto 0' }}></div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
                            <div style={{ padding: '2rem', background: '#F8FAFC', borderLeft: '4px solid #2EBF68' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '1rem' }}>Our Mission</h3>
                                <p style={{ color: '#64748B', lineHeight: '1.7' }}>{content.mission}</p>
                            </div>

                            <div style={{ padding: '2rem', background: '#F8FAFC', borderLeft: '4px solid #2EBF68' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '1rem' }}>Our Vision</h3>
                                <p style={{ color: '#64748B', lineHeight: '1.7' }}>{content.vision}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* CORE VALUES (Flat Cards) */}
            <div style={{ padding: '6rem 2rem', background: '#F8F9FA' }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#2C3E50', marginBottom: '3rem', textAlign: 'center' }}>Core Values</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        {content.coreValues && content.coreValues.length > 0 ? (
                            content.coreValues.map((val, i) => (
                                <div key={i} style={{
                                    background: '#fff', padding: '2.5rem',
                                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                                    borderTop: '4px solid transparent',
                                    transition: 'border-color 0.2s'
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.borderTopColor = '#2EBF68'}
                                    onMouseLeave={(e) => e.currentTarget.style.borderTopColor = 'transparent'}
                                >
                                    <div style={{ color: '#2EBF68', marginBottom: '1.5rem' }}>{icons[i % icons.length]}</div>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#2C3E50', marginBottom: '1rem' }}>{val.title}</h3>
                                    <p style={{ color: '#64748B', lineHeight: '1.6', fontSize: '0.95rem' }}>{val.desc}</p>
                                </div>
                            ))
                        ) : (
                            <p>Loading values...</p>
                        )}
                    </div>
                </div>
            </div>

            {/* QUOTE SECTION */}
            <div style={{ padding: '4rem 2rem', background: '#2C3E50', color: 'white', textAlign: 'center' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <p style={{ fontSize: '1.5rem', fontStyle: 'italic', lineHeight: '1.6', marginBottom: '2rem', opacity: 0.9 }}>
                        "The Current Lack Of A National Standard For Operators Of Medical Imaging And Radiation Therapy Equipment Poses A Hazard To American Patients And Jeopardizes Quality Health Care."
                    </p>
                    <cite style={{ fontStyle: 'normal', fontWeight: 'bold', color: '#1ABC9C' }}>— Charles W. Pickering</cite>
                </div>
            </div>

        </div>
    );
};

export default About;
