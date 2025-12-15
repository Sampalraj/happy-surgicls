import React from 'react';
import '../styles/about.css';
import { ShieldCheck, Award, TrendingUp, Users } from 'lucide-react';

const About = () => {
    return (
        <div className="about-page">

            {/* Header */}
            <div className="about-hero">
                <div className="container">
                    <h4 style={{ color: '#666', marginBottom: '1rem' }}>ABOUT US</h4>
                    <p style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.8', color: '#555' }}>
                        Lofty Mediquip is a one-stop online shop for all your medical, surgical and laboratory supplies.
                        We ensure access to all of your medical and surgical supplies at your fingertips.
                        Offering a wide range of products from industry leading manufacturers at most affordable rates.
                    </p>
                </div>
            </div>

            {/* Diagram Section (Simulated) */}
            <div className="diagram-section container">
                <h2 style={{ fontSize: '2rem', color: '#004daa', marginBottom: '3rem', textTransform: 'uppercase' }}>How Are We Different?</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', alignItems: 'center', gap: '2rem' }}>
                    <div style={{ textAlign: 'right' }}>
                        <h4 style={{ fontWeight: 'bold', color: '#333' }}>Company's Philosophy</h4>
                        <p style={{ fontSize: '0.9rem', color: '#666' }}>Customer centric approach in everything we do.</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ width: '150px', height: '150px', background: '#e0f2f1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '5px solid white', boxShadow: '0 0 0 5px #e0f2f1' }}>
                            <img src="/logo.png" alt="Logo" style={{ width: '80px' }} />
                        </div>
                    </div>
                    <div style={{ textAlign: 'left' }}>
                        <h4 style={{ fontWeight: 'bold', color: '#333' }}>What We Do?</h4>
                        <p style={{ fontSize: '0.9rem', color: '#666' }}>Supplying premium quality medical equipment.</p>
                    </div>
                </div>
            </div>


            {/* Core Values */}
            <div className="core-values">
                <div className="container">
                    <h2 style={{ textAlign: 'center', fontSize: '2rem', color: '#004daa', marginBottom: '4rem', textTransform: 'uppercase' }}>Core Values</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '3rem' }}>

                        <div className="value-card">
                            <div className="value-icon"><Award /></div>
                            <h3>Quality</h3>
                            <p>Lofty Mediquip Quality is First In Everything We Do.</p>
                        </div>

                        <div className="value-card">
                            <div className="value-icon"><Users /></div>
                            <h3>Commitment</h3>
                            <p>Adhere To The Best Products, Services And Other Initiatives.</p>
                        </div>

                        <div className="value-card">
                            <div className="value-icon"><TrendingUp /></div>
                            <h3>Performance</h3>
                            <p>Creating A Pathway To Success By Developing Plans That Ensure Results.</p>
                        </div>

                        <div className="value-card">
                            <div className="value-icon"><ShieldCheck /></div>
                            <h3>Safety</h3>
                            <p>Ensuring Safety On Top Of All By Adopting The Measures By Deliberating Health Care.</p>
                        </div>

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
                                Offering solutions and products that are verifiably effective - that is our vision.
                                She is our guiding principle on all levels - whether in strategic decision making within the management teams or in the daily operative work of each of our employees.
                            </p>
                        </div>
                    </div>

                    <div className="vm-block">
                        <div className="vm-bg-text">MISSION</div>
                        <div className="vm-content">
                            <h2>Mission</h2>
                            <p style={{ lineHeight: '1.8', color: '#666' }}>
                                Our mission is to always improve the quality of life and the quality of work for all our clients and patients with our work and our solutions.
                                Safety and success of therapies are always our focus. For us, just as for every other business, economical success is the basic foundation for fulfilling our mission.
                            </p>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default About;
