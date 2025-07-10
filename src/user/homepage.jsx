


import Navbar from '../components/Navbar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViolationManagement = () => {
  const [violations, setViolations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedViolations, setSelectedViolations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isVerifying, setIsVerifying] = useState(false);
  const itemsPerPage = 20;
  const navigate = useNavigate();

  const formatDateTime = (isoString) => {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    return `${date.toLocaleDateString()} • ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  const fetchViolations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/violations');
      const processed = response.data.map(v => ({
        ...v,
        verified: v.verified === true,
        formattedTime: formatDateTime(v.analyzedAt)
      }));
      setViolations(processed.filter(v => !v.verified)); // Only show unverified
      setLoading(false);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchViolations();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = violations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(violations.length / itemsPerPage);

  const toggleSelection = (id) => {
    setSelectedViolations(prev =>
      prev.includes(id) ? prev.filter(vId => vId !== id) : [...prev, id]
    );
  };

  const handleVerifySelected = async () => {
    if (selectedViolations.length === 0) return;
    setIsVerifying(true);
    try {
      await axios.patch('http://localhost:5000/api/violations/verify-multiple', {
        ids: selectedViolations
      });
      await fetchViolations();
      setSelectedViolations([]);
    } catch (err) {
      console.error('Verification error:', err);
      setError('Failed to verify violations. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  if (loading) return <div style={styles.loadingContainer}>Loading...</div>;
  if (error) return <div style={styles.errorContainer}>Error: {error}</div>;

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.pageTitleContainer}>
        <h1 style={styles.pageTitle}>VIOLATION MANAGEMENT SYSTEM</h1>
      </div>

      <main style={styles.mainContent}>
        <div style={{ marginBottom: 20 }}>
          <button
            onClick={() => navigate('/verified')}
            style={{ ...styles.verifyButton, backgroundColor: '#4CAF50' }}
          >
            VIEW VERIFIED IMAGES
          </button>
        </div>

        <div style={styles.violationGrid}>
          {currentItems.map(violation => (
            <div
              key={violation._id}
              style={{
                ...styles.violationCard,
                border: '4px solid #f44336',
                boxShadow: selectedViolations.includes(violation._id)
                  ? '0 0 15px rgba(255, 193, 7, 0.9)'
                  : 'none'
              }}
              onClick={() => toggleSelection(violation._id)}
            >
              <div style={styles.imageContainer}>
                <img
                  src={violation.imageUrl}
                  alt={`Violation ${violation._id}`}
                  style={{
                    ...styles.violationImage,
                    border: '3px solid #f44336'
                  }}
                />
                <div style={styles.pendingBadge}>PENDING</div>
              </div>
            
              <div style={styles.violationDetails}>
  <div style={styles.plateNumber}>{violation.licensePlate}</div>
  <div style={styles.timeDate}>{violation.formattedTime}</div>

 
  <div className="text-center text-sm font-medium mt-2">
  {violation.noHelmet > 0 && <div>No Helmet</div>}
  {violation.phoneUsage > 0 && <div>Phone Usage</div>}
  {violation.tripling > 0 && <div>Triple Riding</div>}
  {violation.wrongway > 0 && <div>Wrong Way</div>}
</div>

</div>

            </div>
          ))}
        </div>

        <div style={styles.pagination}>
          <button
            style={styles.paginationButton}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            ⬅ Prev
          </button>
          <div style={styles.pageInfo}>
            Page {currentPage} of {totalPages}
          </div>
          <button
            style={styles.paginationButton}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next ➡
          </button>
        </div>
      </main>

      <div style={styles.verificationControls}>
        <button
          style={styles.verifyButton}
          onClick={handleVerifySelected}
          disabled={selectedViolations.length === 0 || isVerifying}
        >
          {isVerifying ? 'VERIFYING...' : `VERIFY SELECTED (${selectedViolations.length})`}
        </button>
      </div>
    </div>
  );
};

const styles = {
  
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f5f5f5'
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontSize: '20px',
    color: '#666'
  },
  errorContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontSize: '18px',
    color: '#d32f2f',
    padding: '20px',
    textAlign: 'center'
  },
  pageTitleContainer: {
    textAlign: 'center',
    margin: '30px 0 20px',
    padding: '0 20px'
  },
  pageTitle: {
    margin: 0,
    fontSize: '28px',
    fontWeight: '600',
    color: '#333',
    letterSpacing: '1px',
    textTransform: 'uppercase'
  },
  mainContent: {
    flex: 1,
    padding: '20px',
    maxWidth: '1400px',
    margin: '0 auto',
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  violationGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '20px',
    marginBottom: '20px'
  },
  violationCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    transition: 'transform 0.2s ease',
    cursor: 'pointer',
    position: 'relative'
  },
  imageContainer: {
    position: 'relative',
    height: '160px',
    overflow: 'hidden'
  },
  violationImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block'
  },
  verifiedBadge: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'rgba(76, 175, 80, 0.9)',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold'
  },
  pendingBadge: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'rgba(244, 67, 54, 0.9)',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold'
  },
  violationDetails: {
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  plateNumber: {
    fontWeight: 'bold',
    fontSize: '16px',
    color: '#333',
    textAlign: 'center'
  },
  timeDate: {
    fontSize: '12px',
    color: '#666',
    textAlign: 'center'
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    margin: '20px 0'
  },
  paginationButton: {
    padding: '8px 16px',
    backgroundColor: '#1976D2',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    minWidth: '100px'
  },
  pageInfo: {
    fontSize: '14px',
    color: '#555',
    fontWeight: '500'
  },
  verificationControls: {
    backgroundColor: 'white',
    padding: '15px 20px',
    boxShadow: '0 -2px 4px rgba(0,0,0,0.05)',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  verifyButton: {
    padding: '12px 24px',
    backgroundColor: '#1976D2',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    minWidth: '200px',
    letterSpacing: '0.5px',
    textTransform: 'uppercase'
  }
};

export default ViolationManagement;
