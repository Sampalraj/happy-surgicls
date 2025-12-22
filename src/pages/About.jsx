import React, { useState, useEffect } from 'react';
import '../styles/about.css';
import { ShieldCheck, Award, TrendingUp, Users } from 'lucide-react';
import { mockBackend } from '../utils/mockBackend';

const About = () => {
    const [content, setContent] = useState({
        title: 'About Us',
        subtitle: 'Loading...',
        content: '',
        mission: '',
        vision: '',
        coreValues: [],
        diagram: {
            title: '',
            philosophy: '',
            whatWeDo: ''
        }
    });

    useEffect(() => {
        const data = mockBackend.getPageContent('about');
        if (data) {
            setContent(data);
        }
    }, []);

    // Helper to map icon string to component if we stored icon names, 
    // but for now we'll match by index or title if needed, or just keep icons static as they are design elements.
    // Let's keep icons static for now but map texts.
    const icons = [<Award />, <Users />, <TrendingUp />, <ShieldCheck />];

    return (
        <div className="about-page">

            {/* Header */}
            <div className="about-hero">
                <div className="container">
                    <h4 style={{ color: '#666', marginBottom: '1rem' }}>{content.title}</h4>
                    <p style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.8', color: '#555' }}>
                        {content.content}
                    </p>
                </div>
            </div>

            {/* Diagram Section (Simulated) */}
            {content.diagram && (
                <div className="diagram-section container">
                    <h2 style={{ fontSize: '2rem', color: '#004daa', marginBottom: '3rem', textTransform: 'uppercase' }}>
                        {content.diagram.title || 'How Are We Different?'}
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', alignItems: 'center', gap: '2rem' }}>
                        <div style={{ textAlign: 'right' }}>
                            <h4 style={{ fontWeight: 'bold', color: '#333' }}>Company's Philosophy</h4>
                            <p style={{ fontSize: '0.9rem', color: '#666' }}>{content.diagram.philosophy}</p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div style={{ width: '150px', height: '150px', background: '#e0f2f1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '5px solid white', boxShadow: '0 0 0 5px #e0f2f1' }}>
                                <img src="/logo.png" alt="Logo" style={{ width: '80px' }} onError={(e) => e.target.style.display = 'none'} />
                            </div>
                        </div>
                        <div style={{ textAlign: 'left' }}>
                            <h4 style={{ fontWeight: 'bold', color: '#333' }}>What We Do?</h4>
                            <p style={{ fontSize: '0.9rem', color: '#666' }}>{content.diagram.whatWeDo}</p>
                        </div>
                    </div>
                </div>
            )}


            {/* Core Values */}
            <div className="core-values">
                <div className="container">
                    <h2 style={{ textAlign: 'center', fontSize: '2rem', color: '#004daa', marginBottom: '4rem', textTransform: 'uppercase' }}>Core Values</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '3rem' }}>

                        {content.coreValues && content.coreValues.length > 0 ? (
                            content.coreValues.map((val, i) => (
                                <div className="value-card" key={i}>
                                    <div className="value-icon">{icons[i % icons.length]}</div>
                                    <h3>{val.title}</h3>
                                    <p>{val.desc}</p>
                                </div>
                            ))
                        ) : (
                            <p>Loading values...</p>
                        )}

                    </div>

                    <div style={{ marginTop: '4rem', background: 'white', padding: '2rem', borderRadius: '8px', textAlign: 'center', fontStyle: 'italic', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                        <p style={{ fontSize: '1.2rem', color: '#555', fontFamily: 'serif' }}>
                            "The Current Lack Of A National Standard For Operators Of Medical Imaging And Radiation Therapy Equipment Poses A Hazard To American Patients And Jeopardizes Quality Health Care."
                        </p>
                        <p style={{ fontWeight: 'bold', marginTop: '1rem', color: '#004daa' }}>- Author: Charles W. Pickering</p>
                    </div>

                </div>
            </div>

            {/* Vision & Mission */}
            <div className="vision-mission-section">
                <div className="container">

                    <div className="vm-block">
                        <div className="vm-bg-text">VISION</div>
                        <div className="vm-content">
                            <h2>Vision</h2>
                            <p style={{ lineHeight: '1.8', color: '#666' }}>
                                {content.vision}
                            </p>
                        </div>
                    </div>

                    <div className="vm-block">
                        <div className="vm-bg-text">MISSION</div>
                        <div className="vm-content">
                            <h2>Mission</h2>
                            <p style={{ lineHeight: '1.8', color: '#666' }}>
                                {content.mission}
                            </p>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default About;
