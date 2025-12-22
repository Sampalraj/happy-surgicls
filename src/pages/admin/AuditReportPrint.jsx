import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { mockBackend } from '../../utils/mockBackend';

const AuditReportPrint = () => {
    const [searchParams] = useSearchParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const scope = searchParams.get('scope');
    const targetId = searchParams.get('targetId');
    const sections = JSON.parse(searchParams.get('sections') || '{}');
    const generatedBy = searchParams.get('generatedBy');
    const timestamp = searchParams.get('timestamp');

    useEffect(() => {
        // Gather data based on scope
        const gatherData = () => {
            const allCerts = mockBackend.getCertificates();
            const allProducts = mockBackend.getProducts();
            const allCats = mockBackend.getCategories();
            const allLogs = mockBackend.getLogs();

            let reportData = {
                scope,
                targetName: scope === 'Company' ? 'Happy Surgicals' : '',
                certificates: [],
                products: [],
                logs: allLogs.slice(0, 50) // Last 50 relevant logs?
            };

            if (scope === 'Company') {
                reportData.certificates = allCerts;
                reportData.products = allProducts;
            } else if (scope === 'Category') {
                const cat = allCats.find(c => c.id === targetId);
                reportData.targetName = cat?.name || 'Unknown Category';
                reportData.certificates = mockBackend.getCertificatesForCategory(targetId);
                reportData.products = allProducts.filter(p => p.category === cat?.name);
            } else if (scope === 'Product') {
                const prod = allProducts.find(p => p.id === targetId);
                reportData.targetName = prod?.name || 'Unknown Product';
                reportData.products = prod ? [prod] : [];
                reportData.certificates = mockBackend.getEffectiveCertificates(prod);
            }

            setData(reportData);
            setLoading(false);

            // Auto-print removed for dev; can be re-enabled if needed
            // setTimeout(() => {
            //     window.print();
            // }, 1000);
        };

        gatherData();
    }, [scope, targetId]);

    if (loading) return <div>Loading Report Data...</div>;

    const styles = `
        @media print {
            @page { margin: 15mm; size: A4; }
            body { font-family: 'Times New Roman', serif; color: #000; background: #fff; -webkit-print-color-adjust: exact; }
            .no-print { display: none !important; }
            .page-break { page-break-after: always; }
            .report-header { border-bottom: 2px solid #1e3a8a; padding-bottom: 15px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: flex-end; }
            .report-footer { position: fixed; bottom: 0; left: 0; right: 0; border-top: 1px solid #ccc; padding-top: 10px; font-size: 10px; text-align: center; color: #666; background: white; }
            h1 { font-size: 26px; margin-bottom: 10px; color: #1e3a8a; text-transform: uppercase; letter-spacing: 1px; }
            h2 { font-size: 18px; margin-top: 25px; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 5px; color: #333; }
            h3 { font-size: 14px; margin-top: 15px; font-weight: bold; color: #444; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 12px; border: 1px solid #e5e7eb; }
            th, td { border: 1px solid #e5e7eb; padding: 8px 12px; text-align: left; }
            th { background-color: #f1f5f9 !important; font-weight: bold; color: #1e293b; -webkit-print-color-adjust: exact; }
            tr:nth-child(even) { background-color: #f8fafc !important; -webkit-print-color-adjust: exact; }
            .badge { padding: 4px 8px; border: 1px solid #ccc; border-radius: 4px; font-size: 10px; display: inline-block; margin-right: 4px; }
            .status-active { background: #dcfce7 !important; color: #166534; border-color: #bbf7d0; -webkit-print-color-adjust: exact; }
            .watermark { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-45deg); font-size: 100px; color: rgba(200, 200, 200, 0.2); pointer-events: none; z-index: -1; text-transform: uppercase; white-space: nowrap; }
        }
        body { font-family: sans-serif; background: #525659; padding: 40px; display: flex; justify-content: center; }
        .report-page { background: white; width: 210mm; min-height: 297mm; padding: 20mm; box-shadow: 0 0 10px rgba(0,0,0,0.3); margin-bottom: 20px; position: relative; }
        .print-btn { position: fixed; top: 20px; right: 20px; padding: 12px 24px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1); z-index: 1000; }
        .print-btn:hover { background: #1d4ed8; }
    `;

    return (
        <>
            <style>{styles}</style>
            <button className="print-btn no-print" onClick={() => window.print()}>Print / Save as PDF</button>
            <div className="watermark no-print">CONFIDENTIAL COPY</div>

            {/* PAGE 1: COVER */}
            <div className="report-page page-break">
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 0 }}>
                    <div style={{ fontSize: '120px', color: '#f3f4f6', transform: 'rotate(-45deg)', fontWeight: 'bold' }}>CONFIDENTIAL</div>
                </div>
                <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', marginTop: '45%' }}>
                    <div style={{ fontSize: '42px', fontWeight: 'bold', color: '#1e3a8a', marginBottom: '10px' }}>Happy Surgicals</div>
                    <div style={{ width: '100px', height: '4px', background: '#3b82f6', margin: '0 auto 40px' }}></div>

                    <h1 style={{ fontSize: '36px', marginBottom: '40px', color: '#111827' }}>Compliance Audit Report</h1>

                    <div style={{ display: 'inline-block', textAlign: 'left', background: '#f8fafc', padding: '30px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                        <p style={{ margin: '10px 0' }}><strong style={{ color: '#666', width: '120px', display: 'inline-block' }}>Scope:</strong> <span style={{ fontSize: '18px' }}>{scope}</span></p>
                        {data.targetName && <p style={{ margin: '10px 0' }}><strong style={{ color: '#666', width: '120px', display: 'inline-block' }}>Target:</strong> <span style={{ fontSize: '18px' }}>{data.targetName}</span></p>}
                        <p style={{ margin: '10px 0' }}><strong style={{ color: '#666', width: '120px', display: 'inline-block' }}>Date:</strong> {new Date(timestamp).toLocaleDateString()}</p>
                        <p style={{ margin: '10px 0' }}><strong style={{ color: '#666', width: '120px', display: 'inline-block' }}>Generated By:</strong> {generatedBy}</p>
                    </div>
                </div>
                <div className="report-footer">Confidential – Internal & Audit Use Only | Happy Surgicals</div>
            </div>

            {/* PAGE 2: MANUFACTURER INFO */}
            {sections.companyInfo && (
                <div className="report-page page-break">
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(-45deg)', fontSize: '100px', color: '#f3f4f6', zIndex: 0, pointerEvents: 'none' }}>CONFIDENTIAL</div>
                    <div className="report-header">
                        <span style={{ fontWeight: 'bold', fontSize: '20px', color: '#1e3a8a' }}>Happy Surgicals</span>
                        <span style={{ fontSize: '12px', color: '#666' }}>Compliance Report Ref: {new Date().getTime().toString().slice(-8)}</span>
                    </div>

                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <h2>Company & Manufacturing Details</h2>
                        <table style={{ border: 'none' }}>
                            <tbody>
                                <tr>
                                    <td style={{ border: 'none', width: '30%', fontWeight: 'bold', color: '#444' }}>Business Type:</td>
                                    <td style={{ border: 'none' }}>Manufacturer & Supplier</td>
                                </tr>
                                <tr>
                                    <td style={{ border: 'none', fontWeight: 'bold', color: '#444' }}>Address:</td>
                                    <td style={{ border: 'none' }}>123 Medical Park, Industrial Zone, New Delhi, India</td>
                                </tr>
                                <tr>
                                    <td style={{ border: 'none', fontWeight: 'bold', color: '#444' }}>Standards:</td>
                                    <td style={{ border: 'none' }}>ISO 13485:2016, ISO 9001:2015, GMP Compliant</td>
                                </tr>
                                <tr>
                                    <td style={{ border: 'none', fontWeight: 'bold', color: '#444' }}>Contact:</td>
                                    <td style={{ border: 'none' }}>+91 98765 43210 | info@happysurgicals.com</td>
                                </tr>
                            </tbody>
                        </table>

                        <h2>Quality Policy Statement</h2>
                        <div style={{ padding: '20px', background: '#f8fafc', borderLeft: '4px solid #3b82f6', fontStyle: 'italic', color: '#334155', lineHeight: '1.6' }}>
                            "Happy Surgicals is committed to designing, manufacturing, and supplying medical devices that meet or exceed customer expectations and regulatory requirements. We maintain a robust Quality Management System (QMS) in accordance with ISO 13485:2016 standards."
                        </div>
                    </div>
                    <div className="report-footer">Confidential – Internal & Audit Use Only | Page 2</div>
                </div>
            )}

            {/* PAGE 3: CERTIFICATES */}
            {sections.certSummary && (
                <div className="report-page page-break">
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(-45deg)', fontSize: '100px', color: '#f3f4f6', zIndex: 0, pointerEvents: 'none' }}>CONFIDENTIAL</div>
                    <div className="report-header">
                        <span style={{ fontWeight: 'bold', fontSize: '20px', color: '#1e3a8a' }}>Happy Surgicals</span>
                        <span style={{ fontSize: '12px', color: '#666' }}>Certificates</span>
                    </div>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <h2>Active Certificates</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Certificate Name</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Issue Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.certificates.length > 0 ? data.certificates.map(cert => (
                                    <tr key={cert.id}>
                                        <td><strong>{cert.name}</strong></td>
                                        <td>{cert.type}</td>
                                        <td><span className="badge status-active">{cert.status}</span></td>
                                        <td>{new Date(cert.created_at).toLocaleDateString()}</td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>No active certificates found for this scope.</td></tr>
                                )}
                            </tbody>
                        </table>

                        <div style={{ marginTop: '20px', fontSize: '11px', color: '#64748b' }}>
                            * Certificates valid as of the generation date of this report. Verified against central database.
                        </div>
                    </div>
                    <div className="report-footer">Confidential – Internal & Audit Use Only | Page 3</div>
                </div>
            )}

            {/* PAGE 4: PRODUCT COMPLIANCE */}
            {sections.complianceDetails && (
                <div className="report-page page-break">
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(-45deg)', fontSize: '100px', color: '#f3f4f6', zIndex: 0, pointerEvents: 'none' }}>CONFIDENTIAL</div>
                    <div className="report-header">
                        <span style={{ fontWeight: 'bold', fontSize: '20px', color: '#1e3a8a' }}>Happy Surgicals</span>
                        <span style={{ fontSize: '12px', color: '#666' }}>Product Compliance</span>
                    </div>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <h2>Product Compliance Matrix</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Category</th>
                                    <th>Applicable Standards / Certs</th>
                                    <th>Compliance Mode</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.products.length > 0 ? data.products.map(prod => {
                                    const certs = mockBackend.getEffectiveCertificates(prod);
                                    const isInherited = prod.inherit_certificates !== false;
                                    return (
                                        <tr key={prod.id}>
                                            <td style={{ fontWeight: 'bold' }}>{prod.name}</td>
                                            <td>{prod.category}</td>
                                            <td>
                                                {certs.length > 0 ? certs.map(c => (
                                                    <div key={c.id} style={{ fontSize: '11px', marginBottom: '2px' }}>• {c.name}</div>
                                                )) : <span style={{ color: '#ef4444' }}>No Certificates Linked</span>}
                                            </td>
                                            <td>
                                                {isInherited ? (
                                                    <span className="badge" style={{ background: '#e0f2fe', color: '#0369a1', borderColor: '#bae6fd' }}>Inherited</span>
                                                ) : (
                                                    <span className="badge" style={{ background: '#fffbeb', color: '#b45309', borderColor: '#fde68a' }}>Manual Override</span>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                }) : (
                                    <tr><td colSpan="4" style={{ textAlign: 'center' }}>No products in scope.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="report-footer">Confidential – Internal & Audit Use Only | Page 4</div>
                </div>
            )}

            {/* PAGE 5: EXCEPTIONS (Conditional) */}
            {sections.exceptions && data.products.some(p => p.inherit_certificates === false) && (
                <div className="report-page page-break">
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(-45deg)', fontSize: '100px', color: '#f3f4f6', zIndex: 0, pointerEvents: 'none' }}>CONFIDENTIAL</div>
                    <div className="report-header">
                        <span style={{ fontWeight: 'bold', fontSize: '20px', color: '#1e3a8a' }}>Happy Surgicals</span>
                        <span style={{ fontSize: '12px', color: '#666' }}>Exceptions Log</span>
                    </div>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <h2 style={{ borderBottomColor: '#f59e0b', color: '#b45309' }}>⚠ Compliance Exceptions / Overrides</h2>
                        <p style={{ fontSize: '13px', marginBottom: '20px' }}>The following products have specific certificate overrides, deviating from category defaults.</p>

                        {data.products.filter(p => p.inherit_certificates === false).map(prod => (
                            <div key={prod.id} style={{ marginBottom: '20px', border: '1px solid #e2e8f0', padding: '15px', borderRadius: '6px', background: '#fffbeb' }}>
                                <h3 style={{ margin: '0 0 10px 0', color: '#92400e' }}>{prod.name}</h3>
                                <div style={{ fontSize: '12px' }}>
                                    <strong>Configured Certificates:</strong>
                                    <div style={{ marginTop: '5px' }}>
                                        {mockBackend.getEffectiveCertificates(prod).map(c => (
                                            <span key={c.id} className="badge" style={{ marginRight: '8px', background: 'white' }}>{c.name}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="report-footer">Confidential – Internal & Audit Use Only | Page 5</div>
                </div>
            )}

            {/* PAGE 6: AUDIT LOG & DECLARATION */}
            <div className="report-page">
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(-45deg)', fontSize: '100px', color: '#f3f4f6', zIndex: 0, pointerEvents: 'none' }}>CONFIDENTIAL</div>
                <div className="report-header">
                    <span style={{ fontWeight: 'bold', fontSize: '20px', color: '#1e3a8a' }}>Happy Surgicals</span>
                    <span style={{ fontSize: '12px', color: '#666' }}>Declaration</span>
                </div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                    {sections.auditLog && (
                        <div style={{ marginBottom: '40px' }}>
                            <h2>Recent System Activity Log</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Time</th>
                                        <th>User</th>
                                        <th>Action</th>
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.logs.slice(0, 10).map(log => (
                                        <tr key={log.id}>
                                            <td style={{ whiteSpace: 'nowrap' }}>{new Date(log.timestamp).toLocaleDateString()}</td>
                                            <td>{log.user}</td>
                                            <td><strong>{log.action}</strong></td>
                                            <td style={{ fontSize: '11px', color: '#444' }}>{log.details || log.target}</td>
                                        </tr>
                                    ))}
                                    {data.logs.length === 0 && <tr><td colSpan="4" style={{ textAlign: 'center' }}>No recent activity logged.</td></tr>}
                                </tbody>
                            </table>
                        </div>
                    )}

                    <div style={{ marginTop: '60px', borderTop: '2px solid #1e293b', paddingTop: '30px' }}>
                        <h3 style={{ fontSize: '16px', textTransform: 'uppercase' }}>Final Declaration</h3>
                        <p style={{ fontSize: '13px', lineHeight: '1.6', margin: '20px 0' }}>
                            I hereby certify that the information contained in this report is accurate and reflects the current status of the Quality Management System and Product Compliance records of Happy Surgicals as of <strong>{new Date(timestamp).toLocaleDateString()}</strong>.
                        </p>

                        <div style={{ marginTop: '80px', display: 'flex', justifyContent: 'space-between', padding: '0 40px' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ borderTop: '1px solid #000', width: '200px', marginBottom: '8px' }}></div>
                                <div style={{ fontSize: '12px', fontWeight: 'bold' }}>Authorized Signatory</div>
                                <div style={{ fontSize: '10px', color: '#666' }}>Quality Assurance Manager</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ borderTop: '1px solid #000', width: '200px', marginBottom: '8px' }}></div>
                                <div style={{ fontSize: '12px', fontWeight: 'bold' }}>Date</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="report-footer">Confidential – Internal & Audit Use Only | Final Page</div>
            </div>
        </>
    );
};

export default AuditReportPrint;
