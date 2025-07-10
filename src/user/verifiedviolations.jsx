


import Navbar from '../components/Navbar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VerifiedViolations = () => {
  const [verified, setVerified] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const formatDateTime = (isoString) => {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    return `${date.toLocaleDateString()} • ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  const fetchVerified = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/violations');
      const verifiedOnly = res.data
        .filter(v => v.verified === true)
        .map(v => ({
          ...v,
          formattedTime: formatDateTime(v.analyzedAt),
          imageUrl: v.imageUrl.replace(/000/g, '')  // Remove '000' from imageUrl
        }));
      setVerified(verifiedOnly);
    } catch (err) {
      console.error('Error fetching verified violations', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVerified();
  }, []);

  const totalPages = Math.ceil(verified.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = verified.slice(indexOfFirst, indexOfLast);

  if (loading) return <div>Loading verified violations...</div>;

  const tagStyle = {
    padding: '4px 8px',
    fontSize: '12px',
    borderRadius: '4px',
    color: 'white',
    margin: '2px',
    display: 'inline-block'
  };

  const downloadCSV = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/violations/verified/csv', {
        responseType: 'blob', // Important to handle the file as a blob
      });
      // Create a link element to trigger the download
      const link = document.createElement('a');
      const url = window.URL.createObjectURL(new Blob([response.data]));
      link.href = url;
      link.setAttribute('download', 'verified_violations_report.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading CSV file:', error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Navbar />
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Verified Violations</h2>
      <div style={{ marginBottom: 20, textAlign: 'center' }}>
        <button onClick={downloadCSV} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}>
          Download CSV Report
        </button>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: '20px'
      }}>
        {currentItems.map(v => (
          <div key={v._id} style={{ border: '3px solid green', borderRadius: 8, padding: 10 }}>
            <img src={v.imageUrl} alt="Verified" style={{ width: '100%', height: 160, objectFit: 'cover' }} />
            <div style={{ marginTop: 10, textAlign: 'center' }}>
              <strong>{v.licensePlate || 'N/A'}</strong>
              <div style={{ fontSize: 12, color: '#555' }}>{v.formattedTime}</div>
              <div style={{ marginTop: 8 }}>
                <div className="text-center text-sm font-medium mt-2">
                  {v.noHelmet > 0 && <div>No Helmet</div>}
                  {v.phoneUsage > 0 && <div>Phone Usage</div>}
                  {v.tripling > 0 && <div>Triple Riding</div>}
                  {v.wrongway > 0 && <div>Wrong Way</div>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 20, textAlign: 'center' }}>
        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>⬅ Prev</button>
        <span style={{ margin: '0 10px' }}>Page {currentPage} of {totalPages}</span>
        <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Next ➡</button>
      </div>
    </div>
  );
};

export default VerifiedViolations;
