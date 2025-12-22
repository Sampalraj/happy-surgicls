import React, { useState, useEffect } from 'react';
import { Clock, User, Activity, FileText } from 'lucide-react';
import { mockBackend } from '../../utils/mockBackend';

const AuditLog = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        setLogs(mockBackend.getLogs());
    }, []);

    const formatDate = (isoString) => {
        return new Date(isoString).toLocaleString('en-US', {
            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    const getActionColor = (action) => {
        if (action.includes('Created')) return '#16a34a';
        if (action.includes('Deleted')) return '#dc2626';
        if (action.includes('Updated')) return '#2563eb';
        return '#475569';
    };

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h1 className="admin-title">System Audit Log</h1>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                    Track all system activities and compliance overrides.
                </div>
            </div>

            <div className="admin-card">
                {logs.length === 0 ? (
                    <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
                        <Activity size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                        <p>No activity logs found.</p>
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th style={{ width: '180px' }}>Timestamp</th>
                                    <th style={{ width: '120px' }}>User</th>
                                    <th style={{ width: '150px' }}>Action</th>
                                    <th>Target / Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.map(log => (
                                    <tr key={log.id}>
                                        <td style={{ color: '#64748b', fontSize: '0.85rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <Clock size={14} />
                                                {formatDate(log.timestamp)}
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <User size={14} color="#64748b" />
                                                </div>
                                                <span style={{ fontWeight: 500 }}>{log.user}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span style={{
                                                display: 'inline-block',
                                                padding: '2px 8px',
                                                borderRadius: '12px',
                                                fontSize: '0.75rem',
                                                fontWeight: '600',
                                                background: `${getActionColor(log.action)}15`,
                                                color: getActionColor(log.action)
                                            }}>
                                                {log.action}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ fontWeight: 500, color: '#1e293b' }}>{log.target}</div>
                                            {log.details && (
                                                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>
                                                    {log.details.includes('|') ? (
                                                        log.details.split('|').map((part, i) => (
                                                            <span key={i} style={{ display: i > 0 ? 'block' : 'inline', color: i > 0 ? '#d97706' : 'inherit' }}>
                                                                {part.trim()}
                                                            </span>
                                                        ))
                                                    ) : log.details}
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuditLog;
