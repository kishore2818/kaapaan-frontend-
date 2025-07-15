

// import React, { useState, useEffect } from 'react';
// import Modal from 'react-modal';
// import axios from 'axios';
// import html2canvas from 'html2canvas';
// import { motion, AnimatePresence } from 'framer-motion';
// import clsx from 'clsx';
// import DashboardLayout from '../components/DashboardLayout';
// import Navbar from '../components/Navbar';
// import Menubar from '../components/Menubar';

// Modal.setAppElement('#root');

// const VIOLATION_FIELD_MAPPING = {
//   phoneUsage: 'Phone Usage',
//   stuntRiding: 'Stunt Riding',
//   smoking: 'Smoking',
//   fire: 'Fire',
//   withoutHelmet: 'Without Helmet',
//   triples: 'Triples'
// };

// const Photos = () => {
//   const [violations, setViolations] = useState([]);
//   const [filteredViolations, setFilteredViolations] = useState([]);
//   const [selectedViolation, setSelectedViolation] = useState(null);
//   const [filterType, setFilterType] = useState('all');
//   const [loading, setLoading] = useState(true);
//   const [totalViolations, setTotalViolations] = useState(0);

//   // Vibrant color scheme
//   const colorMap = {
//     all: 'bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 hover:from-gray-200 hover:to-gray-100 border border-gray-200',
//     withoutHelmet: 'bg-gradient-to-r from-red-100 to-red-50 text-red-800 hover:from-red-200 hover:to-red-100 border border-red-200',
//     triples: 'bg-gradient-to-r from-amber-100 to-amber-50 text-amber-800 hover:from-amber-200 hover:to-amber-100 border border-amber-200',
//     phoneUsage: 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 hover:from-blue-200 hover:to-blue-100 border border-blue-200',
//     stuntRiding: 'bg-gradient-to-r from-purple-100 to-purple-50 text-purple-800 hover:from-purple-200 hover:to-purple-100 border border-purple-200',
//     smoking: 'bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 hover:from-gray-200 hover:to-gray-100 border border-gray-200',
//     fire: 'bg-gradient-to-r from-orange-100 to-orange-50 text-orange-800 hover:from-orange-200 hover:to-orange-100 border border-orange-200'
//   };

//   const activeColorMap = {
//     all: 'bg-gradient-to-r from-gray-800 to-gray-700 text-white border border-gray-800 shadow-md',
//     withoutHelmet: 'bg-gradient-to-r from-red-600 to-red-500 text-white border border-red-600 shadow-md',
//     triples: 'bg-gradient-to-r from-amber-600 to-amber-500 text-white border border-amber-600 shadow-md',
//     phoneUsage: 'bg-gradient-to-r from-blue-600 to-blue-500 text-white border border-blue-600 shadow-md',
//     stuntRiding: 'bg-gradient-to-r from-purple-600 to-purple-500 text-white border border-purple-600 shadow-md',
//     smoking: 'bg-gradient-to-r from-gray-600 to-gray-500 text-white border border-gray-600 shadow-md',
//     fire: 'bg-gradient-to-r from-orange-600 to-orange-500 text-white border border-orange-600 shadow-md'
//   };

//   const fetchViolations = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get('http://localhost:5000/api/violations');
//       setViolations(response.data);
//       setFilteredViolations(response.data);
//       setTotalViolations(response.data.length);
//     } catch (error) {
//       console.error('Error fetching violations:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchViolations();
//   }, []);

//   useEffect(() => {
//     if (filterType === 'all') {
//       setFilteredViolations(violations);
//     } else {
//       setFilteredViolations(violations.filter(v => v[filterType]));
//     }
//   }, [filterType, violations]);

//   const getViolationLabels = (violation) => {
//     return Object.entries(VIOLATION_FIELD_MAPPING)
//       .filter(([key]) => violation[key])
//       .map(([key, label]) => ({
//         type: key,
//         label: label,
//         color: key === 'withoutHelmet' ? 'red' : 
//                key === 'triples' ? 'amber' :
//                key === 'phoneUsage' ? 'blue' :
//                key === 'stuntRiding' ? 'purple' :
//                key === 'smoking' ? 'gray' : 'orange'
//       }));
//   };

//   const getViolationCount = (type) => {
//     return violations.filter(v => v[type]).length;
//   };

//   const openModal = (violation) => setSelectedViolation(violation);
//   const closeModal = () => setSelectedViolation(null);

//   const downloadPDF = async () => {
//     const input = document.getElementById('violation-details');
//     const canvas = await html2canvas(input);
//     const imgData = canvas.toDataURL('image/png');
//     const pdf = new jsPDF();
//     const imgProps = pdf.getImageProperties(imgData);
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//     pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//     pdf.save(`violation_${selectedViolation._id}.pdf`);
//   };

//   const filters = [
//     { type: 'all', label: 'All' },
//     { type: 'withoutHelmet', label: 'Without Helmet' },
//     { type: 'triples', label: 'Triples' },
//     { type: 'phoneUsage', label: 'Phone Usage' },
//     { type: 'stuntRiding', label: 'Stunt Riding' },
//     { type: 'smoking', label: 'Smoking' },
//     { type: 'fire', label: 'Fire' }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <Menubar />

//       <DashboardLayout>
//         <div className="min-h-screen p-6">
//           <div className="max-w-7xl mx-auto">
//             {/* Header with Only Total Count */}
//             <div className="mb-8">
//               <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6">
//                 <div>
//                   <h1 className="text-3xl font-bold text-gray-800">Traffic Violation Dashboard</h1>
//                   <p className="text-gray-600">Real-time monitoring and analysis of traffic violations</p>
//                 </div>
//                 <div className="mt-4 md:mt-0">
//                   <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center min-w-[120px]">
//                     <div className="text-2xl font-bold text-blue-600">{totalViolations}</div>
//                     <div className="text-xs text-gray-500 uppercase tracking-wider">Total Violations</div>
//                   </div>
//                 </div>
//               </div>

//               {/* Compact Filter Section */}
//               <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
//                 <h2 className="text-lg font-semibold text-gray-800 mb-3">Latest Violations</h2>
//                 <div className="flex flex-nowrap overflow-x-auto pb-2 gap-2">
//                   {filters.map(({ type, label }) => (
//                     <motion.button
//                       key={type}
//                       whileHover={{ scale: 1.03 }}
//                       whileTap={{ scale: 0.97 }}
//                       className={clsx(
//                         'px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap',
//                         'flex items-center',
//                         filterType === type ? activeColorMap[type] : colorMap[type]
//                       )}
//                       onClick={() => setFilterType(type)}
//                     >
//                       {label}
//                       {type !== 'all' && (
//                         <span className="ml-2 bg-white bg-opacity-20 px-2 py-0.5 rounded-full text-xs">
//                           {getViolationCount(type)}
//                         </span>
//                       )}
//                     </motion.button>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Loader or grid */}
//             {loading ? (
//               <div className="flex justify-center items-center h-64">
//                 <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//               </div>
//             ) : filteredViolations.length === 0 ? (
//               <div className="text-center bg-white p-12 rounded-xl shadow-sm border border-gray-100 max-w-4xl mx-auto">
//                 <div className="w-20 h-20 mx-auto mb-4 text-gray-300">
//                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                 </div>
//                 <p className="text-lg font-medium text-gray-700">No violations found</p>
//                 <p className="text-sm text-gray-500">
//                   {filterType !== 'all' ? 'Try a different filter' : 'No records yet'}
//                 </p>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 <AnimatePresence>
//                   {filteredViolations.map((violation, index) => (
//                     <motion.div
//                       key={violation._id}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, scale: 0.9 }}
//                       transition={{ delay: index * 0.05 }}
//                       whileHover={{ y: -5 }}
//                       className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer transition-all hover:shadow-md border border-gray-100 group"
//                       onClick={() => openModal(violation)}
//                     >
//                       <div className="aspect-video relative">
//                         <img
//                           src={violation.imageUrl}
//                           alt="Violation"
//                           className="w-full h-full object-cover group-hover:brightness-90 transition-all"
//                         />
//                         <div className="absolute bottom-2 left-2 flex gap-2 flex-wrap">
//                           {getViolationLabels(violation).map(({ type, label, color }) => (
//                             <span
//                               key={type}
//                               className={`bg-${color}-600 text-white px-2 py-1 rounded-lg text-xs font-medium capitalize shadow-sm`}
//                             >
//                               {label}
//                             </span>
//                           ))}
//                         </div>
//                         <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
//                           {new Date(violation.analyzedAt).toLocaleTimeString()}
//                         </div>
//                       </div>
//                       <div className="p-4 space-y-2">
//                         {violation.plateImageUrl && (
//                           <div className="flex justify-between items-center">
//                             <div>
//                               <div className="text-xs text-gray-500 mb-1">License Plate</div>
//                               <img 
//                                 src={violation.plateImageUrl} 
//                                 alt="Number Plate" 
//                                 className="w-24 h-12 object-contain rounded border border-gray-200 bg-gray-50 p-1"
//                               />
//                             </div>
//                             <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
//                               View Details
//                               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                               </svg>
//                             </button>
//                           </div>
//                         )}
//                       </div>
//                     </motion.div>
//                   ))}
//                 </AnimatePresence>
//               </div>
//             )}
//           </div>
//         </div>
//       </DashboardLayout>

//       {/* Modal */}
//       <Modal
//         isOpen={!!selectedViolation}
//         onRequestClose={closeModal}
//         style={{
//           overlay: {
//             backgroundColor: 'rgba(0,0,0,0.5)',
//             zIndex: 50,
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             backdropFilter: 'blur(4px)'
//           },
//           content: {
//             inset: 'auto',
//             padding: 0,
//             borderRadius: '1rem',
//             overflow: 'hidden',
//             maxWidth: '90vw',
//             maxHeight: '90vh',
//             margin: 'auto',
//             border: 'none',
//             boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)'
//           },
//         }}
//       >
//         {selectedViolation && (
//           <motion.div
//             id="violation-details"
//             className="flex flex-col lg:flex-row h-full"
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//           >
//             <div className="lg:w-2/3 bg-gray-100 flex items-center justify-center p-8">
//               <img 
//                 src={selectedViolation.imageUrl} 
//                 alt="Violation" 
//                 className="max-h-[70vh] rounded-lg shadow-lg object-contain" 
//               />
//             </div>
//             <div className="lg:w-1/3 bg-white p-6 overflow-y-auto space-y-6">
//               <div className="flex justify-between items-start">
//                 <h2 className="text-xl font-bold text-gray-800">Violation Report</h2>
//                 <button 
//                   onClick={closeModal}
//                   className="text-gray-500 hover:text-gray-800 transition-colors"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>
              
//               <div className="space-y-4">
//                 <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   {new Date(selectedViolation.analyzedAt).toLocaleString()}
//                 </div>
                
//                 <div className="space-y-3">
//                   {getViolationLabels(selectedViolation).map(({ type, label, color }) => (
//                     <div
//                       key={type}
//                       className={`p-3 rounded-lg bg-${color}-50 text-${color}-800 font-medium capitalize border-l-4 border-${color}-500 flex items-center`}
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                       </svg>
//                       {label}
//                     </div>
//                   ))}
//                 </div>
//               </div>
              
//               {selectedViolation.plateImageUrl && (
//                 <div className="mt-4">
//                   <h3 className="text-sm font-medium text-gray-700 mb-2">License Plate Detection</h3>
//                   <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
//                     <img 
//                       src={selectedViolation.plateImageUrl} 
//                       alt="Number Plate" 
//                       className="w-full h-auto max-h-40 object-contain mx-auto"
//                     />
//                     <div className="mt-3 text-center">
//                       <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
//                         Detected with 98% confidence
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               )}
              
//               <div className="mt-6 space-y-3">
//                 <button
//                   onClick={downloadPDF}
//                   className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center shadow-md"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
//                   </svg>
//                   Download Full Report
//                 </button>
//                 <button className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
//                   </svg>
//                   Generate Citation
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default Photos;



import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import html2canvas from 'html2canvas';
import { motion, AnimatePresence } from 'framer-motion';
import { jsPDF } from 'jspdf';
import DashboardLayout from '../components/DashboardLayout';
import Navbar from '../components/Navbar';
import Menubar from '../components/Menubar';


Modal.setAppElement('#root');

const VIOLATION_FIELD_MAPPING = {
  phoneUsage: 'Phone Usage',
  stuntRiding: 'Stunt Riding',
  smoking: 'Smoking',
  fire: 'Fire',
  withoutHelmet: 'Without Helmet',
  triples: 'Tripling'
};

const VIOLATION_COLORS = {
  withoutHelmet: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-200',
    dark: 'bg-red-600',
    icon: '🚨'
  },
  triples: {
    bg: 'bg-amber-100',
    text: 'text-amber-800',
    border: 'border-amber-200',
    dark: 'bg-amber-600',
    icon: '👥'
  },
  phoneUsage: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    border: 'border-blue-200',
    dark: 'bg-blue-600',
    icon: '📱'
  },
  stuntRiding: {
    bg: 'bg-purple-100',
    text: 'text-purple-800',
    border: 'border-purple-200',
    dark: 'bg-purple-600',
    icon: '🤸'
  },
  smoking: {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    border: 'border-gray-200',
    dark: 'bg-gray-600',
    icon: '🚬'
  },
  fire: {
    bg: 'bg-orange-100',
    text: 'text-orange-800',
    border: 'border-orange-200',
    dark: 'bg-orange-600',
    icon: '🔥'
  }
};

const Photos = () => {
  const [violations, setViolations] = useState([]);
  const [filteredViolations, setFilteredViolations] = useState([]);
  const [selectedViolation, setSelectedViolation] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchViolations = async () => {
    try {
      setLoading(true);
      // const response = await axios.get('http://localhost:5000/api/violations');
            const response = await axios.get('https://kaapaan-backend.onrender.com/api/violations');

      setViolations(response.data);
      setFilteredViolations(response.data);
    } catch (error) {
      console.error('Error fetching violations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchViolations();
  }, []);

  useEffect(() => {
    let result = violations;
    
    // Apply type filter
    if (filterType !== 'all') {
      result = result.filter(v => v[filterType]);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(v => 
        v.plateNumber?.toLowerCase().includes(query) ||
        new Date(v.analyzedAt).toLocaleString().toLowerCase().includes(query)
      );
    }
    
    setFilteredViolations(result);
  }, [filterType, violations, searchQuery]);

  const getViolationLabels = (violation) => {
    return Object.entries(VIOLATION_FIELD_MAPPING)
      .filter(([key]) => violation[key])
      .map(([key]) => ({
        type: key,
        label: VIOLATION_FIELD_MAPPING[key],
        ...VIOLATION_COLORS[key]
      }));
  };

  const getViolationCount = (type) => {
    return violations.filter(v => v[type]).length;
  };

  const openModal = (violation) => setSelectedViolation(violation);
  const closeModal = () => setSelectedViolation(null);

  const downloadPDF = async () => {
    const input = document.getElementById('violation-details');
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`violation_${selectedViolation._id}.pdf`);
  };

  const filters = [
    { type: 'all', label: 'All Violations', icon: '📋', count: violations.length },
    { type: 'withoutHelmet', label: 'No Helmet', icon: '⛑️', count: getViolationCount('withoutHelmet') },
    { type: 'triples', label: 'Tripling', icon: '👥', count: getViolationCount('triples') },
    { type: 'phoneUsage', label: 'Phone', icon: '📱', count: getViolationCount('phoneUsage') },
    { type: 'stuntRiding', label: 'Stunts', icon: '🤸', count: getViolationCount('stuntRiding') },
    { type: 'smoking', label: 'Smoking', icon: '🚬', count: getViolationCount('smoking') },
    { type: 'fire', label: 'Fire', icon: '🔥', count: getViolationCount('fire') }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Menubar />

      <DashboardLayout>
        <div className="min-h-screen p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Traffic Violation Gallery</h1>
              <p className="text-gray-600">Review and analyze captured traffic violations in real-time</p>
            </div>

            {/* Stats and Filters Section */}
            <div className="mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">Latest Violations</h2>
                    <p className="text-sm text-gray-500">Showing {filteredViolations.length} of {violations.length} total violations</p>
                  </div>
                  
                  <div className="relative w-full md:w-64">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Search violations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* Horizontal Filter Chips */}
                <div className="flex flex-wrap gap-2">
                  {filters.map(({ type, label, icon, count }) => (
                    <motion.button
                      key={type}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                        filterType === type 
                          ? `${VIOLATION_COLORS[type]?.dark || 'bg-gray-700'} text-white`
                          : `${VIOLATION_COLORS[type]?.bg || 'bg-gray-100'} ${VIOLATION_COLORS[type]?.text || 'text-gray-700'} hover:bg-opacity-80`
                      }`}
                      onClick={() => setFilterType(type)}
                    >
                      <span className="text-lg">{icon}</span>
                      <span>{label}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        filterType === type ? 'bg-white bg-opacity-20' : 'bg-white bg-opacity-50'
                      }`}>
                        {count}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Content Section */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : filteredViolations.length === 0 ? (
              <div className="text-center bg-white p-12 rounded-xl shadow-sm border border-gray-100 max-w-4xl mx-auto">
                <div className="text-gray-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">No violations found</h3>
                <p className="text-sm text-gray-500">
                  {filterType !== 'all' ? 'Try a different filter' : 'No records available yet'}
                </p>
                <button 
                  onClick={() => {
                    setFilterType('all');
                    setSearchQuery('');
                  }}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredViolations.map((violation) => (
                    <motion.div
                      key={violation._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer transition-all hover:shadow-md border border-gray-100 group"
                      onClick={() => openModal(violation)}
                    >
                      <div className="aspect-video relative">
                        <img
                          src={violation.imageUrl}
                          alt="Violation"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute bottom-2 left-2 flex gap-2">
                          {getViolationLabels(violation).map(({ type, label, bg, text, border }) => (
                            <span
                              key={type}
                              className={`${bg} ${text} ${border} px-2 py-1 rounded-lg text-xs font-medium capitalize shadow-sm flex items-center gap-1`}
                            >
                              {VIOLATION_COLORS[type]?.icon} {label}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="p-4 space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="text-sm font-medium text-gray-700">
                            {new Date(violation.analyzedAt).toLocaleString()}
                          </div>
                          {violation.plateNumber && (
                            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-mono">
                              {violation.plateNumber}
                            </span>
                          )}
                        </div>
                        {violation.plateImageUrl && (
                          <div className="pt-2 border-t border-gray-100">
                            <div className="text-xs text-gray-500 mb-1">Detected Plate</div>
                            <img 
                              src={violation.plateImageUrl} 
                              alt="Number Plate" 
                              className="w-24 h-12 object-contain rounded border border-gray-200"
                            />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>

      {/* Violation Details Modal */}
      <Modal
        isOpen={!!selectedViolation}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 50,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backdropFilter: 'blur(4px)'
          },
          content: {
            inset: 'auto',
            padding: 0,
            borderRadius: '1rem',
            overflow: 'hidden',
            maxWidth: '90vw',
            maxHeight: '90vh',
            margin: 'auto',
            border: 'none',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)'
          },
        }}
      >
        {selectedViolation && (
          <motion.div
            id="violation-details"
            className="flex flex-col lg:flex-row h-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="lg:w-2/3 bg-gray-50 flex items-center justify-center p-6">
              <div className="relative max-h-[80vh]">
                <img 
                  src={selectedViolation.imageUrl} 
                  alt="Violation" 
                  className="max-h-[70vh] rounded-lg shadow-lg border border-gray-200" 
                />
                {selectedViolation.plateImageUrl && (
                  <div className="absolute bottom-4 right-4 bg-white p-2 rounded-lg shadow-md border border-gray-200">
                    <img 
                      src={selectedViolation.plateImageUrl} 
                      alt="Number Plate" 
                      className="h-12 object-contain"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="lg:w-1/3 bg-white p-6 overflow-y-auto space-y-4">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-bold text-gray-800">Violation Details</h2>
                <button 
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(selectedViolation.analyzedAt).toLocaleString()}
                </div>
                
                {selectedViolation.plateNumber && (
                  <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Plate: <span className="font-mono ml-1">{selectedViolation.plateNumber}</span>
                  </div>
                )}
                
                <div className="grid grid-cols-1 gap-3">
                  {getViolationLabels(selectedViolation).map(({ type, label, bg, text, border }) => (
                    <div
                      key={type}
                      className={`${bg} ${text} p-4 rounded-lg font-medium capitalize border-l-4 ${border} flex items-center`}
                    >
                      <span className="text-xl mr-3">{VIOLATION_COLORS[type]?.icon}</span>
                      <div>
                        <div className="font-semibold">{label}</div>
                        <div className="text-xs opacity-80 mt-1">Traffic violation detected</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <button
                onClick={downloadPDF}
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Violation Report
              </button>
            </div>
          </motion.div>
        )}
      </Modal>
    </div>
  );
};

export default Photos;