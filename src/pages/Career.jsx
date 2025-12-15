import React from 'react';
import { Briefcase, Settings, Users, Truck, DollarSign, PenTool } from 'lucide-react';

const Career = () => {
    return (
        <div className="career-page">
            {/* Header / Hero */}
            <div className="container" style={{ padding: '4rem 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', color: '#004daa', marginBottom: '1rem', textTransform: 'uppercase' }}>Career</h1>
                    <p style={{ fontSize: '1.2rem', lineHeight: '1.6', color: '#333', fontStyle: 'italic', marginBottom: '1rem' }}>
                        "Creating Good Jobs In Advanced Manufacturing, Especially In Medical Technology And Life Sciences, Has Been A Priority For Me Since Before Taking Office."
                    </p>
                    <p style={{ color: '#666', fontWeight: 'bold' }}>-- Jake Auchincloss</p>
                </div>
                <div style={{ position: 'relative' }}>
                    <img src="/placeholder.jpg" alt="Career" style={{ width: '100%', borderRadius: '8px', boxShadow: 'var(--shadow-lg)' }} />
                    <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', background: '#ccc', width: '100%', height: '100%', zIndex: -1, borderRadius: '8px' }}></div>
                </div>
            </div>

            {/* Various Types of Jobs */}
            <div style={{ background: '#f8f9fa', padding: '4rem 0' }}>
                <div className="container">
                    <h3 style={{ textTransform: 'uppercase', marginBottom: '2rem', fontSize: '1.1rem', color: '#004daa' }}>Job Opportunities</h3>
                    <h2 style={{ fontSize: '2rem', marginBottom: '3rem', fontWeight: 'bold' }}>HERE VARIOUS TYPES OF JOBS</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' }}>
                        {[
                            { icon: <Settings size={40} />, title: 'Medical Engineers' },
                            { icon: <PenTool size={40} />, title: 'Medical Technicians' },
                            { icon: <Users size={40} />, title: 'Skilled Workers' },
                            { icon: <Briefcase size={40} />, title: 'Quality Controllers' },
                            { icon: <Truck size={40} />, title: 'Warehouse Experts' },
                            { icon: <DollarSign size={40} />, title: 'Sales & Marketing' },
                        ].map((job, idx) => (
                            <div key={idx} style={{ background: '#eef6fc', padding: '2rem 1rem', borderRadius: '8px', textAlign: 'center', transition: 'transform 0.2s', cursor: 'pointer' }}>
                                <div style={{ color: '#004daa', marginBottom: '1rem' }}>{job.icon}</div>
                                <h4 style={{ color: '#004daa', fontSize: '0.9rem', lineHeight: '1.4' }}>{job.title}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Join Our Team Form */}
            <div className="container" style={{ padding: '6rem 0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>

                    {/* Left Form */}
                    <div style={{ background: '#f0f7ff', padding: '3rem', borderRadius: '12px' }}>
                        <h2 style={{ textAlign: 'center', color: '#004daa', marginBottom: '2rem', fontSize: '1.5rem' }}>JOIN WITH OUR TEAM</h2>
                        <form>
                            <div className="form-group" style={{ marginBottom: '1rem' }}>
                                <input type="text" className="form-control" placeholder="Name *" style={{ background: 'white', border: 'none', padding: '1rem' }} />
                            </div>
                            <div className="form-group" style={{ marginBottom: '1rem' }}>
                                <input type="email" className="form-control" placeholder="Email *" style={{ background: 'white', border: 'none', padding: '1rem' }} />
                            </div>
                            <div className="form-group" style={{ marginBottom: '1rem' }}>
                                <input type="tel" className="form-control" placeholder="Phone *" style={{ background: 'white', border: 'none', padding: '1rem' }} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                <input type="file" className="form-control" style={{ background: 'white', border: 'none', padding: '0.8rem', fontSize: '0.9rem' }} text="Choose File" />
                                <span style={{ display: 'flex', alignItems: 'center', fontSize: '0.8rem', color: '#666' }}>No file chosen</span>
                            </div>
                            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                <textarea className="form-control" placeholder="Write Your Message here..." rows="4" style={{ background: 'white', border: 'none', padding: '1rem' }}></textarea>
                            </div>
                            <button className="btn" style={{ width: '100%', background: '#e0e7ff', color: '#004daa', fontWeight: 'bold', padding: '1rem' }}>APPLY NOW</button>
                        </form>
                    </div>

                    {/* Right Form (Duplicate for visual balance as per ref, or maybe different purpose? implementation one is sufficient usually but ref had two columns) */}
                    {/* Converting right side to Info/alternative for better UX than duplicate form */}
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#004daa', lineHeight: '1.2', marginBottom: '2rem' }}>
                            Build Your Future With Happy Surgicals
                        </h2>
                        <p style={{ fontSize: '1.1rem', color: '#666', lineHeight: '1.8', marginBottom: '2rem' }}>
                            We are always looking for talented individuals to join our growing team. If you are passionate about medical technology and want to make a difference, we want to hear from you.
                        </p>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {['Competitive Salary', 'Health Insurance', 'Career Growth', 'Global Exposure'].map(item => (
                                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', fontWeight: '500', color: '#333' }}>
                                    <div style={{ width: '24px', height: '24px', background: '#dcfce7', borderRadius: '50%', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>✓</div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Career;
