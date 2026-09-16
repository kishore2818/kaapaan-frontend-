
// // import React, { useState, useEffect } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { 
// //   Search, Filter, Edit, Trash2, Eye, Download, AlertTriangle,
// //   ChevronDown, ChevronUp, X, Shield, MapPin, Calendar,
// //   FileText, User, Camera, Clock, AlertCircle, CheckCircle,
// //   Plus, UserX, Building, Landmark, UserCheck, BadgeCheck,
// //   RefreshCw, Database, Users, EyeOff, Upload, Image as ImageIcon
// // } from 'lucide-react';
// // import DashboardLayout from '../components/DashboardLayout';

// // function CriminalPage({ onLogout }) {
// //   // State for detections
// //   const [detections, setDetections] = useState([]);
// //   // State for CRM details
// //   const [crmDetails, setCrmDetails] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [refreshing, setRefreshing] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [selectedItem, setSelectedItem] = useState(null);
// //   const [showDetailModal, setShowDetailModal] = useState(false);
// //   const [showAddModal, setShowAddModal] = useState(false);
// //   const [filterOpen, setFilterOpen] = useState(false);
// //   const [cameraFilter, setCameraFilter] = useState('all');
// //   const [statusFilter, setStatusFilter] = useState('all');
// //   const [districtFilter, setDistrictFilter] = useState('all');
// //   const [sortBy, setSortBy] = useState('latest');

// //   // Fetch both detections and CRM details
// //   const fetchData = async () => {
// //     try {
// //       setLoading(true);
// //       setRefreshing(true);
      
// //       // Build query parameters
// //       const params = new URLSearchParams();
// //       if (statusFilter !== 'all') params.append('status', statusFilter);
// //       if (districtFilter !== 'all') params.append('district', districtFilter);
// //       if (searchTerm) params.append('search', searchTerm);
      
// //       // Fetch CRM details from backend
// //       const crmResponse = await fetch(`/api/crm-details?${params}`);
// //       const crmData = await crmResponse.json();
      
// //       // Fetch detections from backend
// //       const detectionsResponse = await fetch('/api/detections');
// //       const detectionsData = await detectionsResponse.json();
      
// //       // Handle CRM data
// //       if (crmData.success && Array.isArray(crmData.data)) {
// //         setCrmDetails(crmData.data);
// //       } else {
// //         console.error('Unexpected CRM data format:', crmData);
// //         setCrmDetails([]);
// //       }
      
// //       // Handle detections data
// //       if (detectionsData.success && Array.isArray(detectionsData.data)) {
// //         setDetections(detectionsData.data);
// //       } else {
// //         console.error('Unexpected detections data format:', detectionsData);
// //         setDetections([]);
// //       }
      
// //       setError(null);
// //     } catch (err) {
// //       console.error('Error fetching data:', err);
// //       setError('Failed to fetch data. Please check your connection and try again.');
// //     } finally {
// //       setLoading(false);
// //       setRefreshing(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchData();
// //   }, []);

// //   // Re-fetch when filters change
// //   useEffect(() => {
// //     if (!loading) {
// //       fetchData();
// //     }
// //   }, [statusFilter, districtFilter]);

// //   // Filter CRM details locally for search
// //   const filteredCrmDetails = crmDetails.filter(item => {
// //     const searchLower = searchTerm.toLowerCase();
// //     if (searchTerm && !item.name?.toLowerCase().includes(searchLower) &&
// //         !item.additionalDetails?.toLowerCase().includes(searchLower) &&
// //         !item.district?.toLowerCase().includes(searchLower)) {
// //       return false;
// //     }
    
// //     if (districtFilter !== 'all' && item.district !== districtFilter) {
// //       return false;
// //     }
    
// //     return true;
// //   }).sort((a, b) => {
// //     if (sortBy === 'latest') {
// //       return new Date(b.createdAt) - new Date(a.createdAt);
// //     } else if (sortBy === 'oldest') {
// //       return new Date(a.createdAt) - new Date(b.createdAt);
// //     }
// //     return 0;
// //   });

// //   // Filter detections locally
// //   const filteredDetections = detections.filter(detection => {
// //     const searchLower = searchTerm.toLowerCase();
// //     if (searchTerm && !detection.criminal_name?.toLowerCase().includes(searchLower)) {
// //       return false;
// //     }
    
// //     if (cameraFilter !== 'all' && detection.camera_id?.toString() !== cameraFilter) {
// //       return false;
// //     }
    
// //     return true;
// //   }).sort((a, b) => {
// //     if (sortBy === 'latest') {
// //       return new Date(b.timestamp) - new Date(a.timestamp);
// //     } else if (sortBy === 'oldest') {
// //       return new Date(a.timestamp) - new Date(b.timestamp);
// //     }
// //     return 0;
// //   });

// //   // Get unique districts and camera numbers
// //   const districts = [...new Set(crmDetails.map(d => d.district))].filter(Boolean).sort();
// //   const cameraNumbers = [...new Set(detections.map(d => d.camera_id))].filter(Boolean).sort((a, b) => a - b);

// //   // Stats calculation
// //   const stats = {
// //     totalCriminals: crmDetails.filter(p => p.status === 'criminal').length,
// //     totalMissing: crmDetails.filter(p => p.status === 'missing').length,
// //     totalDetections: detections.length,
// //     todayDetections: detections.filter(d => {
// //       const today = new Date().toDateString();
// //       return new Date(d.timestamp).toDateString() === today;
// //     }).length,
// //     activeCameras: cameraNumbers.length,
// //     totalDistricts: districts.length
// //   };

// //   const handleViewDetails = (item) => {
// //     setSelectedItem(item);
// //     setShowDetailModal(true);
// //   };

// //   const handleDeleteCrm = async (id) => {
// //     if (window.confirm('Are you sure you want to delete this record? This action cannot be undone.')) {
// //       try {
// //         const response = await fetch(`/api/crm-details/${id}`, {
// //           method: 'DELETE',
// //         });
        
// //         if (response.ok) {
// //           const result = await response.json();
// //           if (result.success) {
// //             setCrmDetails(prev => prev.filter(item => item._id !== id));
// //             alert('Record deleted successfully!');
// //           } else {
// //             throw new Error(result.message || 'Failed to delete record');
// //           }
// //         } else {
// //           const error = await response.json();
// //           throw new Error(error.message || 'Failed to delete record');
// //         }
// //       } catch (err) {
// //         console.error('Error deleting record:', err);
// //         alert(`Error deleting record: ${err.message}`);
// //       }
// //     }
// //   };

// //   const handleDeleteDetection = async (id) => {
// //     if (window.confirm('Are you sure you want to delete this detection?')) {
// //       try {
// //         const response = await fetch(`/api/detections/${id}`, {
// //           method: 'DELETE',
// //         });
        
// //         if (response.ok) {
// //           const result = await response.json();
// //           if (result.success) {
// //             setDetections(prev => prev.filter(d => d._id !== id));
// //             alert('Detection deleted successfully!');
// //           }
// //         } else {
// //           throw new Error('Failed to delete detection');
// //         }
// //       } catch (err) {
// //         console.error('Error deleting detection:', err);
// //         alert('Error deleting detection. Please try again.');
// //       }
// //     }
// //   };

// //   const handleAddCrmDetail = async (formData, imageFile) => {
// //     try {
// //       setRefreshing(true);
      
// //       // Create FormData for file upload
// //       const formDataToSend = new FormData();
// //       formDataToSend.append('name', formData.name);
// //       formDataToSend.append('age', formData.age);
// //       formDataToSend.append('lastSeen', formData.lastSeen);
// //       formDataToSend.append('district', formData.district);
// //       formDataToSend.append('status', formData.status);
// //       formDataToSend.append('additionalDetails', formData.additionalDetails || '');
// //       if (imageFile) {
// //         formDataToSend.append('image', imageFile);
// //       }
      
// //       const response = await fetch('/api/crm-details', {
// //         method: 'POST',
// //         body: formDataToSend,
// //       });
      
// //       if (response.ok) {
// //         const result = await response.json();
// //         if (result.success) {
// //           // Add new record to state (optimistic update)
// //           setCrmDetails(prev => [result.data, ...prev]);
// //           alert('Record added successfully!');
// //           return true;
// //         } else {
// //           throw new Error(result.message || 'Failed to add record');
// //         }
// //       } else {
// //         const error = await response.json();
// //         throw new Error(error.message || 'Failed to add record');
// //       }
// //     } catch (err) {
// //       console.error('Error adding CRM detail:', err);
// //       alert(`Error adding record: ${err.message}`);
// //       return false;
// //     } finally {
// //       setRefreshing(false);
// //     }
// //   };

// //   const handleUpdateCrmDetail = async (id, formData, imageFile) => {
// //     try {
// //       setRefreshing(true);
      
// //       let formDataToSend;
      
// //       if (imageFile) {
// //         // If new image is provided, use FormData
// //         formDataToSend = new FormData();
// //         Object.keys(formData).forEach(key => {
// //           formDataToSend.append(key, formData[key]);
// //         });
// //         formDataToSend.append('image', imageFile);
// //       } else {
// //         // If no new image, use JSON
// //         formDataToSend = JSON.stringify(formData);
// //       }
      
// //       const response = await fetch(`/api/crm-details/${id}`, {
// //         method: 'PUT',
// //         headers: imageFile ? {} : { 'Content-Type': 'application/json' },
// //         body: formDataToSend,
// //       });
      
// //       if (response.ok) {
// //         const result = await response.json();
// //         if (result.success) {
// //           // Update record in state
// //           setCrmDetails(prev => prev.map(item => 
// //             item._id === id ? result.data : item
// //           ));
// //           alert('Record updated successfully!');
// //           return true;
// //         } else {
// //           throw new Error(result.message || 'Failed to update record');
// //         }
// //       } else {
// //         const error = await response.json();
// //         throw new Error(error.message || 'Failed to update record');
// //       }
// //     } catch (err) {
// //       console.error('Error updating CRM detail:', err);
// //       alert(`Error updating record: ${err.message}`);
// //       return false;
// //     } finally {
// //       setRefreshing(false);
// //     }
// //   };

// //   const exportToCSV = () => {
// //     const headers = ['Name', 'Status', 'Age', 'District', 'Last Seen', 'Additional Details', 'Image URL', 'Created At', 'Updated At'];
// //     const rows = filteredCrmDetails.map(item => [
// //       item.name,
// //       item.status,
// //       item.age,
// //       item.district,
// //       new Date(item.lastSeen).toLocaleDateString(),
// //       item.additionalDetails || '',
// //       item.image || '',
// //       new Date(item.createdAt).toLocaleDateString(),
// //       new Date(item.updatedAt).toLocaleDateString()
// //     ]);
    
// //     const csvContent = [
// //       headers.join(','),
// //       ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
// //     ].join('\n');
    
// //     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
// //     const url = URL.createObjectURL(blob);
// //     const a = document.createElement('a');
// //     a.href = url;
// //     a.download = `tamilnadu_police_database_${new Date().toISOString().slice(0,10)}.csv`;
// //     document.body.appendChild(a);
// //     a.click();
// //     document.body.removeChild(a);
// //     URL.revokeObjectURL(url);
// //   };

// //   const formatDate = (dateString) => {
// //     if (!dateString) return 'Unknown';
// //     const date = new Date(dateString);
// //     return date.toLocaleString('en-IN', {
// //       day: '2-digit',
// //       month: 'short',
// //       year: 'numeric',
// //       hour: '2-digit',
// //       minute: '2-digit',
// //       hour12: true
// //     });
// //   };

// //   const handleRefresh = () => {
// //     fetchData();
// //   };

// //   const handleSearch = (e) => {
// //     e.preventDefault();
// //     fetchData();
// //   };

// //   if (loading && !refreshing) {
// //     return (
// //       <>
// //         <DashboardLayout>
// //           <div className="min-h-screen p-6 ml-[210px] px-6 py-10">
// //             <div className="max-w-7xl mx-auto">
// //               <div className="flex justify-center items-center h-64">
// //                 <div className="text-center">
// //                   <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
// //                   <p className="mt-4 text-gray-600">Loading police database...</p>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </DashboardLayout>
// //       </>
// //     );
// //   }

// //   return (
// //     <>
// //       <DashboardLayout>
// //         <div className="min-h-screen p-6 ml-[210px] px-6 py-10 bg-gray-50">
// //           <div className="max-w-7xl mx-auto">
// //             {/* Header Section */}
// //             <div className="mb-8">
// //               <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-6">
// //                 <div>
// //                   <div className="flex items-center gap-3">
// //                     <div className="p-2 bg-blue-100 rounded-lg">
// //                       <Database className="text-blue-600" size={24} />
// //                     </div>
// //                     <div>
// //                       <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Tamil Nadu Police Database</h1>
// //                       <p className="text-gray-600 mt-1">Criminal Records & Surveillance System</p>
// //                     </div>
// //                   </div>
// //                 </div>
                
// //                 <div className="flex flex-col sm:flex-row gap-4">
// //                   <button
// //                     onClick={handleRefresh}
// //                     disabled={refreshing}
// //                     className={`flex items-center justify-center gap-2 bg-white border border-gray-300 
// //                              text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-colors font-medium
// //                              ${refreshing ? 'opacity-70 cursor-not-allowed' : ''}`}
// //                   >
// //                     <RefreshCw size={18} className={refreshing ? 'animate-spin' : ''} />
// //                     {refreshing ? 'Refreshing...' : 'Refresh Data'}
// //                   </button>
// //                   <button
// //                     onClick={exportToCSV}
// //                     className="flex items-center justify-center gap-2 bg-white border border-gray-300 
// //                              text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-colors font-medium"
// //                   >
// //                     <Download size={18} />
// //                     Export Data
// //                   </button>
// //                   <button
// //                     onClick={() => setShowAddModal(true)}
// //                     className="flex items-center justify-center gap-2 bg-blue-600 text-white 
// //                              px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
// //                   >
// //                     <Plus size={18} />
// //                     Add New Record
// //                   </button>
// //                 </div>
// //               </div>

// //               {/* Stats Cards */}
// //               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
// //                 <StatCard
// //                   title="Criminal Records"
// //                   value={stats.totalCriminals}
// //                   icon={<UserX className="text-red-500" size={24} />}
// //                   color="bg-gradient-to-br from-red-50 to-red-100"
// //                   borderColor="border-red-200"
// //                   description="Registered criminals"
// //                 />
// //                 <StatCard
// //                   title="Missing Persons"
// //                   value={stats.totalMissing}
// //                   icon={<Users className="text-amber-500" size={24} />}
// //                   color="bg-gradient-to-br from-amber-50 to-amber-100"
// //                   borderColor="border-amber-200"
// //                   description="Reported missing"
// //                 />
// //                 <StatCard
// //                   title="Total Detections"
// //                   value={stats.totalDetections}
// //                   icon={<Camera className="text-blue-500" size={24} />}
// //                   color="bg-gradient-to-br from-blue-50 to-blue-100"
// //                   borderColor="border-blue-200"
// //                   description="Camera detections"
// //                 />
// //                 <StatCard
// //                   title="Active Districts"
// //                   value={stats.totalDistricts}
// //                   icon={<MapPin className="text-green-500" size={24} />}
// //                   color="bg-gradient-to-br from-green-50 to-green-100"
// //                   borderColor="border-green-200"
// //                   description="Districts covered"
// //                 />
// //               </div>
// //             </div>

// //             {/* Search and Filter Section */}
// //             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
// //               <form onSubmit={handleSearch} className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
// //                 {/* Search Bar */}
// //                 <div className="relative w-full lg:w-80">
// //                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
// //                   <input
// //                     type="text"
// //                     placeholder="Search by name, district, details..."
// //                     value={searchTerm}
// //                     onChange={(e) => setSearchTerm(e.target.value)}
// //                     className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
// //                   />
// //                   <button
// //                     type="submit"
// //                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-800"
// //                   >
// //                     <Search size={18} />
// //                   </button>
// //                 </div>
                
// //                 {/* Filter and Sort Controls */}
// //                 <div className="flex flex-wrap items-center gap-4">
// //                   <select
// //                     value={sortBy}
// //                     onChange={(e) => setSortBy(e.target.value)}
// //                     className="px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
// //                   >
// //                     <option value="latest">Latest First</option>
// //                     <option value="oldest">Oldest First</option>
// //                   </select>
                  
// //                   <button
// //                     type="button"
// //                     onClick={() => setFilterOpen(!filterOpen)}
// //                     className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 text-sm font-medium"
// //                   >
// //                     <Filter size={16} />
// //                     Filters
// //                     {filterOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
// //                   </button>
// //                 </div>
// //               </form>

// //               {/* Advanced Filters */}
// //               {filterOpen && (
// //                 <motion.div
// //                   initial={{ opacity: 0, height: 0 }}
// //                   animate={{ opacity: 1, height: 'auto' }}
// //                   className="pt-4 border-t border-gray-200"
// //                 >
// //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-2">
// //                         Status
// //                       </label>
// //                       <select
// //                         value={statusFilter}
// //                         onChange={(e) => setStatusFilter(e.target.value)}
// //                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
// //                       >
// //                         <option value="all">All Status</option>
// //                         <option value="criminal">Criminal</option>
// //                         <option value="missing">Missing</option>
// //                       </select>
// //                     </div>
                    
// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-2">
// //                         District
// //                       </label>
// //                       <select
// //                         value={districtFilter}
// //                         onChange={(e) => setDistrictFilter(e.target.value)}
// //                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
// //                       >
// //                         <option value="all">All Districts</option>
// //                         {districts.map(district => (
// //                           <option key={district} value={district}>{district}</option>
// //                         ))}
// //                       </select>
// //                     </div>
                    
// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-2">
// //                         Camera
// //                       </label>
// //                       <select
// //                         value={cameraFilter}
// //                         onChange={(e) => setCameraFilter(e.target.value)}
// //                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
// //                       >
// //                         <option value="all">All Cameras</option>
// //                         {cameraNumbers.map(camera => (
// //                           <option key={camera} value={camera}>Camera {camera}</option>
// //                         ))}
// //                       </select>
// //                     </div>
// //                   </div>
// //                 </motion.div>
// //               )}
// //             </div>

// //             {/* Results Count */}
// //             <div className="mb-4 flex justify-between items-center">
// //               <p className="text-sm text-gray-600">
// //                 Showing {filteredCrmDetails.length} of {crmDetails.length} records
// //                 {searchTerm && ` for "${searchTerm}"`}
// //               </p>
// //               {(searchTerm || statusFilter !== 'all' || districtFilter !== 'all') && (
// //                 <button
// //                   onClick={() => {
// //                     setSearchTerm('');
// //                     setStatusFilter('all');
// //                     setDistrictFilter('all');
// //                   }}
// //                   className="text-sm text-blue-600 hover:text-blue-800 font-medium"
// //                 >
// //                   Clear all filters
// //                 </button>
// //               )}
// //             </div>

// //             {/* CRM Database Section */}
// //             <AnimatePresence mode="wait">
// //               {filteredCrmDetails.length > 0 ? (
// //                 <motion.div
// //                   key="crm-grid"
// //                   initial={{ opacity: 0 }}
// //                   animate={{ opacity: 1 }}
// //                   exit={{ opacity: 0 }}
// //                   className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12"
// //                 >
// //                   {filteredCrmDetails.map((item, index) => (
// //                     <CrmCard
// //                       key={item._id || index}
// //                       item={item}
// //                       index={index}
// //                       onView={() => handleViewDetails(item)}
// //                       onDelete={() => handleDeleteCrm(item._id)}
// //                       onEdit={() => {
// //                         setSelectedItem(item);
// //                         setShowAddModal(true);
// //                       }}
// //                     />
// //                   ))}
// //                 </motion.div>
// //               ) : (
// //                 <motion.div
// //                   initial={{ opacity: 0 }}
// //                   animate={{ opacity: 1 }}
// //                   className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center mb-12"
// //                 >
// //                   <Database className="text-gray-400 mx-auto mb-4" size={48} />
// //                   <h3 className="text-lg font-semibold text-gray-600 mb-2">No records found</h3>
// //                   <p className="text-gray-500 mb-4">
// //                     {searchTerm || statusFilter !== 'all' || districtFilter !== 'all'
// //                       ? 'Try adjusting your search filters' 
// //                       : 'No records in police database'}
// //                   </p>
// //                   <button
// //                     onClick={() => setShowAddModal(true)}
// //                     className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
// //                   >
// //                     <Plus size={16} />
// //                     Add First Record
// //                   </button>
// //                 </motion.div>
// //               )}
// //             </AnimatePresence>

// //             {/* Evidence Section - Latest Detections */}
// //             {detections.length > 0 && (
// //               <div className="mt-8">
// //                 <div className="flex items-center justify-between mb-6">
// //                   <div className="flex items-center gap-3">
// //                     <h2 className="text-xl font-bold text-gray-900">Latest Evidence Detections</h2>
// //                     <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">
// //                       Live
// //                     </span>
// //                   </div>
// //                   <div className="text-sm text-gray-500">
// //                     Real-time updates from surveillance system
// //                   </div>
// //                 </div>
                
// //                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
// //                   <div className="overflow-x-auto">
// //                     <table className="w-full">
// //                       <thead className="bg-gray-50 border-b border-gray-200">
// //                         <tr>
// //                           <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Criminal</th>
// //                           <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Camera</th>
// //                           <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Timestamp</th>
// //                           <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Confidence</th>
// //                           <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Actions</th>
// //                         </tr>
// //                       </thead>
// //                       <tbody className="divide-y divide-gray-200">
// //                         {detections.slice(0, 5).map((detection) => (
// //                           <tr key={detection._id} className="hover:bg-gray-50">
// //                             <td className="py-3 px-4">
// //                               <div className="flex items-center gap-3">
// //                                 <img
// //                                   src={detection.imageUrl || detection.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${detection.criminal_name}&backgroundColor=b6e3f4`}
// //                                   alt={detection.criminal_name}
// //                                   className="w-10 h-10 rounded-full object-cover"
// //                                   onError={(e) => {
// //                                     e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${detection.criminal_name}&backgroundColor=b6e3f4`;
// //                                   }}
// //                                 />
// //                                 <div>
// //                                   <p className="font-medium text-gray-900">
// //                                     {detection.criminal_name || 'Unknown'}
// //                                   </p>
// //                                   <p className="text-xs text-gray-500">
// //                                     {detection.district || 'Unknown location'}
// //                                   </p>
// //                                 </div>
// //                               </div>
// //                             </td>
// //                             <td className="py-3 px-4">
// //                               <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">
// //                                 <Camera size={12} />
// //                                 {detection.camera_id || 'N/A'}
// //                               </span>
// //                             </td>
// //                             <td className="py-3 px-4 text-sm text-gray-600">
// //                               {formatDate(detection.timestamp)}
// //                             </td>
// //                             <td className="py-3 px-4">
// //                               <div className="flex items-center gap-2">
// //                                 <div className="w-24 bg-gray-200 rounded-full h-2">
// //                                   <div 
// //                                     className="bg-green-500 h-2 rounded-full"
// //                                     style={{ width: `${detection.confidence || 0}%` }}
// //                                   ></div>
// //                                 </div>
// //                                 <span className="text-xs font-medium">
// //                                   {detection.confidence ? `${detection.confidence.toFixed(1)}%` : 'N/A'}
// //                                 </span>
// //                               </div>
// //                             </td>
// //                             <td className="py-3 px-4">
// //                               <div className="flex items-center gap-3">
// //                                 <button
// //                                   onClick={() => handleViewDetails(detection)}
// //                                   className="text-blue-600 hover:text-blue-800 text-sm font-medium"
// //                                 >
// //                                   View Evidence
// //                                 </button>
// //                                 <button
// //                                   onClick={() => handleDeleteDetection(detection._id)}
// //                                   className="text-red-600 hover:text-red-800 text-sm font-medium"
// //                                 >
// //                                   Delete
// //                                 </button>
// //                               </div>
// //                             </td>
// //                           </tr>
// //                         ))}
// //                       </tbody>
// //                     </table>
// //                   </div>
// //                   {detections.length > 5 && (
// //                     <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
// //                       <button
// //                         onClick={() => {/* Navigate to full detections page */}}
// //                         className="text-sm text-blue-600 hover:text-blue-800 font-medium"
// //                       >
// //                         View all {detections.length} detections →
// //                       </button>
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </DashboardLayout>

// //       {/* Add/Edit Record Modal */}
// //       <AnimatePresence>
// //         {showAddModal && (
// //           <AddRecordModal 
// //             item={selectedItem}
// //             onClose={() => {
// //               setShowAddModal(false);
// //               setSelectedItem(null);
// //             }}
// //             onSubmit={selectedItem ? 
// //               (formData, imageFile) => handleUpdateCrmDetail(selectedItem._id, formData, imageFile) : 
// //               handleAddCrmDetail}
// //             uploading={refreshing}
// //             isEdit={!!selectedItem}
// //           />
// //         )}
// //       </AnimatePresence>

// //       {/* Detail View Modal */}
// //       <AnimatePresence>
// //         {showDetailModal && selectedItem && (
// //           <DetailModal 
// //             item={selectedItem} 
// //             onClose={() => setShowDetailModal(false)}
// //             onEdit={() => {
// //               setShowDetailModal(false);
// //               setShowAddModal(true);
// //             }}
// //           />
// //         )}
// //       </AnimatePresence>
// //     </>
// //   );
// // }

// // // Stat Card Component
// // function StatCard({ title, value, icon, color, borderColor, description }) {
// //   return (
// //     <div className={`${color} p-5 rounded-xl border ${borderColor} hover:shadow-md transition-shadow duration-300`}>
// //       <div className="flex items-center justify-between mb-4">
// //         <div className="p-2 rounded-lg bg-white">
// //           {icon}
// //         </div>
// //       </div>
// //       <div>
// //         <p className="text-2xl lg:text-3xl font-bold text-gray-900">{value}</p>
// //         <p className="text-sm font-medium text-gray-700 mt-1">{title}</p>
// //         {description && (
// //           <p className="text-xs text-gray-500 mt-1">{description}</p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // // CRM Card Component
// // function CrmCard({ item, index, onView, onDelete, onEdit }) {
// //   const statusColors = {
// //     criminal: 'bg-red-100 text-red-700',
// //     missing: 'bg-amber-100 text-amber-700',
// //   };

// //   const statusIcons = {
// //     criminal: <UserX size={10} />,
// //     missing: <Users size={10} />,
// //   };

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, y: 20 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       transition={{ delay: index * 0.05 }}
// //       whileHover={{ y: -4 }}
// //       className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
// //     >
// //       {/* Image */}
// //       <div className="relative h-48 overflow-hidden bg-gray-100">
// //         <img
// //           src={item.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${item.name}&backgroundColor=b6e3f4`}
// //           alt={item.name}
// //           className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
// //           onError={(e) => {
// //             e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${item.name}&backgroundColor=b6e3f4`;
// //           }}
// //         />
// //         <div className="absolute top-2 right-2">
// //           <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${statusColors[item.status] || 'bg-gray-100 text-gray-700'}`}>
// //             {statusIcons[item.status]}
// //             {item.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : 'Unknown'}
// //           </span>
// //         </div>
// //       </div>

// //       {/* Details */}
// //       <div className="p-4">
// //         <div className="mb-3">
// //           <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
// //           <div className="flex items-center gap-2 mt-1">
// //             <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${item.status === 'criminal' ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'}`}>
// //               {item.status === 'criminal' ? 'CRIMINAL' : 'MISSING PERSON'}
// //             </span>
// //             <span className="text-gray-600 text-sm">{item.age} yrs</span>
// //           </div>
// //         </div>

// //         <div className="space-y-2 mb-4">
// //           <div>
// //             <p className="text-xs text-gray-500 flex items-center gap-1">
// //               <MapPin size={10} />
// //               District
// //             </p>
// //             <p className="text-sm text-gray-900 truncate">{item.district}</p>
// //           </div>
// //           <div className="flex items-center gap-3">
// //             <div className="flex-1">
// //               <p className="text-xs text-gray-500 flex items-center gap-1">
// //                 <Calendar size={10} />
// //                 Last Seen
// //               </p>
// //               <p className="text-sm text-gray-900">
// //                 {item.lastSeen ? new Date(item.lastSeen).toLocaleDateString('en-IN') : 'Unknown'}
// //               </p>
// //             </div>
// //           </div>
// //           {item.additionalDetails && (
// //             <div>
// //               <p className="text-xs text-gray-500">Details</p>
// //               <p className="text-sm text-gray-900 truncate">{item.additionalDetails}</p>
// //             </div>
// //           )}
// //         </div>

// //         {/* Action Buttons */}
// //         <div className="flex justify-between border-t border-gray-100 pt-3">
// //           <button
// //             onClick={onView}
// //             className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium"
// //           >
// //             <Eye size={16} />
// //             View
// //           </button>
// //           <div className="flex items-center gap-2">
// //             <button
// //               onClick={onEdit}
// //               className="text-gray-400 hover:text-blue-600 p-1 hover:bg-blue-50 rounded transition-colors"
// //               title="Edit Record"
// //             >
// //               <Edit size={16} />
// //             </button>
// //             <button
// //               onClick={onDelete}
// //               className="text-gray-400 hover:text-red-600 p-1 hover:bg-red-50 rounded transition-colors"
// //               title="Delete Record"
// //             >
// //               <Trash2 size={16} />
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </motion.div>
// //   );
// // }

// // // Add/Edit Record Modal Component
// // function AddRecordModal({ item, onClose, onSubmit, uploading, isEdit = false }) {
// //   const [formData, setFormData] = useState({
// //     name: item?.name || '',
// //     age: item?.age || '',
// //     lastSeen: item?.lastSeen ? new Date(item.lastSeen).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
// //     district: item?.district || '',
// //     status: item?.status || 'criminal',
// //     additionalDetails: item?.additionalDetails || ''
// //   });
  
// //   const [imageFile, setImageFile] = useState(null);
// //   const [imagePreview, setImagePreview] = useState(item?.image || null);
// //   const [imageError, setImageError] = useState('');

// //   const handleImageChange = (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;

// //     // Validate file type
// //     const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
// //     if (!validTypes.includes(file.type)) {
// //       setImageError('Please upload a valid image file (JPEG, PNG, or WebP)');
// //       return;
// //     }

// //     // Validate file size (5MB max)
// //     if (file.size > 5 * 1024 * 1024) {
// //       setImageError('Image size should be less than 5MB');
// //       return;
// //     }

// //     setImageFile(file);
// //     setImageError('');

// //     // Create preview
// //     const reader = new FileReader();
// //     reader.onloadend = () => {
// //       setImagePreview(reader.result);
// //     };
// //     reader.readAsDataURL(file);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
    
// //     // For new records, image is required
// //     if (!isEdit && !imageFile) {
// //       setImageError('Please upload an image');
// //       return;
// //     }

// //     try {
// //       const success = await onSubmit(formData, imageFile);
// //       if (success) {
// //         onClose();
// //       }
// //     } catch (err) {
// //       console.error('Error submitting form:', err);
// //       alert(`Error: ${err.message}`);
// //     }
// //   };

// //   const tamilNaduDistricts = [
// //     "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem",
// //     "Erode", "Tirunelveli", "Vellore", "Thoothukudi", "Dindigul",
// //     "Kanchipuram", "Tiruvallur", "Chengalpattu", "Villupuram", "Krishnagiri",
// //     "Dharmapuri", "Kanyakumari", "Theni", "Nagapattinam", "Ramanathapuram",
// //     "Sivaganga", "Pudukkottai", "Karur", "Perambalur", "Ariyalur",
// //     "Cuddalore", "Kallakurichi", "Tirupathur", "Tenkasi", "Ranipet"
// //   ];

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0 }}
// //       animate={{ opacity: 1 }}
// //       exit={{ opacity: 0 }}
// //       className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
// //       onClick={onClose}
// //     >
// //       <motion.div
// //         initial={{ scale: 0.95, opacity: 0 }}
// //         animate={{ scale: 1, opacity: 1 }}
// //         exit={{ scale: 0.95, opacity: 0 }}
// //         className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
// //         onClick={(e) => e.stopPropagation()}
// //       >
// //         <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
// //           <div>
// //             <h2 className="text-xl font-bold text-gray-900">
// //               {isEdit ? 'Edit Police Record' : 'Add New Police Record'}
// //             </h2>
// //             <p className="text-gray-600 text-sm">Tamil Nadu Police Database</p>
// //           </div>
// //           <button
// //             onClick={onClose}
// //             disabled={uploading}
// //             className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
// //           >
// //             <X size={20} />
// //           </button>
// //         </div>

// //         <form onSubmit={handleSubmit} className="p-6">
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //             {/* Left Column - Image Upload */}
// //             <div className="md:col-span-1">
// //               <div className="space-y-4">
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     {isEdit ? 'Update Photo (Optional)' : 'Upload Photo *'}
// //                   </label>
// //                   <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 transition-colors">
// //                     <div className="space-y-1 text-center">
// //                       {imagePreview ? (
// //                         <div className="relative">
// //                           <img
// //                             src={imagePreview}
// //                             alt="Preview"
// //                             className="mx-auto h-48 w-48 object-cover rounded-lg"
// //                           />
// //                           <button
// //                             type="button"
// //                             onClick={() => {
// //                               setImageFile(null);
// //                               setImagePreview(null);
// //                             }}
// //                             className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
// //                             disabled={uploading}
// //                           >
// //                             <X size={16} />
// //                           </button>
// //                         </div>
// //                       ) : (
// //                         <>
// //                           <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
// //                           <div className="flex text-sm text-gray-600">
// //                             <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
// //                               <span>{isEdit ? 'Update file' : 'Upload a file'}</span>
// //                               <input
// //                                 type="file"
// //                                 accept="image/*"
// //                                 onChange={handleImageChange}
// //                                 className="sr-only"
// //                                 required={!isEdit}
// //                                 disabled={uploading}
// //                               />
// //                             </label>
// //                             <p className="pl-1">or drag and drop</p>
// //                           </div>
// //                           <p className="text-xs text-gray-500">
// //                             PNG, JPG, WebP up to 5MB
// //                           </p>
// //                         </>
// //                       )}
// //                     </div>
// //                   </div>
// //                   {imageError && (
// //                     <p className="mt-1 text-sm text-red-600">{imageError}</p>
// //                   )}
// //                   {!isEdit && !imageFile && (
// //                     <p className="mt-1 text-xs text-red-600">Image is required for new records</p>
// //                   )}
// //                 </div>

// //                 {/* Record Type */}
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Record Type *
// //                   </label>
// //                   <div className="flex gap-3">
// //                     <button
// //                       type="button"
// //                       onClick={() => setFormData({...formData, status: 'criminal'})}
// //                       disabled={uploading}
// //                       className={`flex-1 py-3 px-4 rounded-lg border transition-all disabled:opacity-50 ${
// //                         formData.status === 'criminal'
// //                           ? 'border-red-500 bg-red-50 text-red-700'
// //                           : 'border-gray-300 hover:border-gray-400'
// //                       }`}
// //                     >
// //                       Criminal Record
// //                     </button>
// //                     <button
// //                       type="button"
// //                       onClick={() => setFormData({...formData, status: 'missing'})}
// //                       disabled={uploading}
// //                       className={`flex-1 py-3 px-4 rounded-lg border transition-all disabled:opacity-50 ${
// //                         formData.status === 'missing'
// //                           ? 'border-blue-500 bg-blue-50 text-blue-700'
// //                           : 'border-gray-300 hover:border-gray-400'
// //                       }`}
// //                     >
// //                       Missing Person
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Right Column - Form Fields */}
// //             <div className="md:col-span-1 space-y-4">
// //               {/* Basic Information */}
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   Full Name *
// //                 </label>
// //                 <input
// //                   type="text"
// //                   required
// //                   value={formData.name}
// //                   onChange={(e) => setFormData({...formData, name: e.target.value})}
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:opacity-50"
// //                   placeholder="Enter full name"
// //                   disabled={uploading}
// //                 />
// //               </div>

// //               <div className="grid grid-cols-2 gap-4">
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Age *
// //                   </label>
// //                   <input
// //                     type="number"
// //                     required
// //                     min="1"
// //                     max="120"
// //                     value={formData.age}
// //                     onChange={(e) => setFormData({...formData, age: e.target.value})}
// //                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:opacity-50"
// //                     placeholder="Enter age"
// //                     disabled={uploading}
// //                   />
// //                 </div>

// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Last Seen Date *
// //                   </label>
// //                   <input
// //                     type="date"
// //                     required
// //                     value={formData.lastSeen}
// //                     onChange={(e) => setFormData({...formData, lastSeen: e.target.value})}
// //                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:opacity-50"
// //                     disabled={uploading}
// //                   />
// //                 </div>
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   District *
// //                 </label>
// //                 <select
// //                   required
// //                   value={formData.district}
// //                   onChange={(e) => setFormData({...formData, district: e.target.value})}
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:opacity-50"
// //                   disabled={uploading}
// //                 >
// //                   <option value="">Select District</option>
// //                   {tamilNaduDistricts.map(district => (
// //                     <option key={district} value={district}>{district}</option>
// //                   ))}
// //                 </select>
// //               </div>

// //               {/* Additional Details */}
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   Additional Details
// //                 </label>
// //                 <textarea
// //                   value={formData.additionalDetails}
// //                   onChange={(e) => setFormData({...formData, additionalDetails: e.target.value})}
// //                   rows="3"
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:opacity-50"
// //                   placeholder="Enter additional details, last known location, description, etc."
// //                   disabled={uploading}
// //                 />
// //               </div>
// //             </div>
// //           </div>

// //           {/* Form Actions */}
// //           <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
// //             <button
// //               type="button"
// //               onClick={onClose}
// //               className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium disabled:opacity-50"
// //               disabled={uploading}
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               type="submit"
// //               disabled={uploading || (!isEdit && !imageFile)}
// //               className={`px-4 py-2 bg-blue-600 text-white rounded-lg transition-colors text-sm font-medium flex items-center gap-2 ${
// //                 uploading || (!isEdit && !imageFile) ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
// //               }`}
// //             >
// //               {uploading ? (
// //                 <>
// //                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
// //                   {isEdit ? 'Updating...' : 'Adding...'}
// //                 </>
// //               ) : (
// //                 isEdit ? 'Update Record' : 'Add to Police Database'
// //               )}
// //             </button>
// //           </div>
// //         </form>
// //       </motion.div>
// //     </motion.div>
// //   );
// // }

// // // Detail Modal Component
// // function DetailModal({ item, onClose, onEdit }) {
// //   const statusColors = {
// //     criminal: 'bg-red-100 text-red-700',
// //     missing: 'bg-amber-100 text-amber-700',
// //   };

// //   const formatDate = (dateString) => {
// //     if (!dateString) return 'Unknown';
// //     const date = new Date(dateString);
// //     return date.toLocaleString('en-IN', {
// //       day: '2-digit',
// //       month: 'short',
// //       year: 'numeric',
// //       hour: '2-digit',
// //       minute: '2-digit',
// //       hour12: true
// //     });
// //   };

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0 }}
// //       animate={{ opacity: 1 }}
// //       exit={{ opacity: 0 }}
// //       className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
// //       onClick={onClose}
// //     >
// //       <motion.div
// //         initial={{ scale: 0.95, opacity: 0 }}
// //         animate={{ scale: 1, opacity: 1 }}
// //         exit={{ scale: 0.95, opacity: 0 }}
// //         className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
// //         onClick={(e) => e.stopPropagation()}
// //       >
// //         <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
// //           <div>
// //             <h2 className="text-xl font-bold text-gray-900">Police Record Details</h2>
// //             <p className="text-gray-600 text-sm">Tamil Nadu Police Database</p>
// //           </div>
// //           <div className="flex items-center gap-3">
// //             <button
// //               onClick={onEdit}
// //               className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
// //             >
// //               <Edit size={16} />
// //               Edit
// //             </button>
// //             <button
// //               onClick={onClose}
// //               className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
// //             >
// //               <X size={20} />
// //             </button>
// //           </div>
// //         </div>

// //         <div className="p-6">
// //           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// //             {/* Left Column */}
// //             <div className="lg:col-span-1">
// //               <div className="bg-gray-100 rounded-lg p-4 mb-4">
// //                 <img
// //                   src={item.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${item.name}&backgroundColor=b6e3f4`}
// //                   alt={item.name}
// //                   className="w-full h-64 object-cover rounded-lg"
// //                   onError={(e) => {
// //                     e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${item.name}&backgroundColor=b6e3f4`;
// //                   }}
// //                 />
// //               </div>
              
// //               <div className="space-y-4">
// //                 <div className="bg-blue-50 p-4 rounded-lg">
// //                   <h3 className="font-semibold text-blue-900 mb-3">Record Information</h3>
// //                   <div className="space-y-2">
// //                     <div>
// //                       <span className="text-sm text-gray-600">Created:</span>
// //                       <p className="font-medium text-gray-900">
// //                         {formatDate(item.createdAt)}
// //                       </p>
// //                     </div>
// //                     <div>
// //                       <span className="text-sm text-gray-600">Updated:</span>
// //                       <p className="font-medium text-gray-900">
// //                         {formatDate(item.updatedAt)}
// //                       </p>
// //                     </div>
// //                     <div>
// //                       <span className="text-sm text-gray-600">Database ID:</span>
// //                       <p className="font-medium text-gray-900 font-mono text-xs truncate">{item._id}</p>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Right Column */}
// //             <div className="lg:col-span-2">
// //               <div className="mb-6">
// //                 <div className="flex items-center justify-between">
// //                   <h1 className="text-2xl font-bold text-gray-900">{item.name}</h1>
// //                   <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[item.status] || 'bg-gray-100 text-gray-700'}`}>
// //                     {item.status ? item.status.toUpperCase() : 'UNKNOWN'}
// //                   </span>
// //                 </div>
// //                 <div className="flex items-center gap-3 mt-2">
// //                   <span className="text-gray-600">{item.age} years old</span>
// //                   <span className="text-gray-600">•</span>
// //                   <span className="text-gray-600">{item.district} District</span>
// //                 </div>
// //               </div>

// //               <div className="space-y-6">
// //                 {/* Case Details */}
// //                 <div className="bg-gray-50 p-4 rounded-lg">
// //                   <h3 className="font-semibold text-gray-900 mb-3">Case Details</h3>
// //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                     <div>
// //                       <span className="text-sm text-gray-600">Last Seen:</span>
// //                       <p className="font-medium text-lg">
// //                         {item.lastSeen ? new Date(item.lastSeen).toLocaleDateString('en-IN', {
// //                           weekday: 'long',
// //                           year: 'numeric',
// //                           month: 'long',
// //                           day: 'numeric'
// //                         }) : 'Unknown'}
// //                       </p>
// //                     </div>
// //                     <div>
// //                       <span className="text-sm text-gray-600">District:</span>
// //                       <p className="font-medium text-lg">{item.district}</p>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Additional Details */}
// //                 {item.additionalDetails && (
// //                   <div className="bg-blue-50 p-4 rounded-lg">
// //                     <h3 className="font-semibold text-blue-900 mb-3">Additional Details</h3>
// //                     <p className="text-gray-700 whitespace-pre-wrap">{item.additionalDetails}</p>
// //                   </div>
// //                 )}
                
// //                 {/* Removed Image Information section */}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </motion.div>
// //     </motion.div>
// //   );
// // }

// // export default CriminalPage;









// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Search, Filter, Edit, Trash2, Eye, Download, AlertTriangle,
//   ChevronDown, ChevronUp, X, Shield, MapPin, Calendar,
//   FileText, User, Camera, Clock, AlertCircle, CheckCircle,
//   Plus, UserX, Building, Landmark, UserCheck, BadgeCheck,
//   RefreshCw, Database, Users, EyeOff, Upload, Image as ImageIcon,
//   BarChart3, Target, Zap, Activity, TrendingUp, Video,
//   Grid, List, Columns, ShieldAlert, Fingerprint
// } from 'lucide-react';
// import DashboardLayout from '../components/DashboardLayout';

// function CriminalPage({ onLogout }) {
//   // State for detections
//   const [detections, setDetections] = useState([]);
//   // State for CRM details
//   const [crmDetails, setCrmDetails] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [showDetailModal, setShowDetailModal] = useState(false);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEvidenceModal, setShowEvidenceModal] = useState(false);
//   const [filterOpen, setFilterOpen] = useState(false);
//   const [cameraFilter, setCameraFilter] = useState('all');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [districtFilter, setDistrictFilter] = useState('all');
//   const [sortBy, setSortBy] = useState('latest');
//   const [evidenceView, setEvidenceView] = useState('grid');
//   const [selectedEvidence, setSelectedEvidence] = useState(null);

//   // Fetch both detections and CRM details
//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       setRefreshing(true);
      
//       const params = new URLSearchParams();
//       if (statusFilter !== 'all') params.append('status', statusFilter);
//       if (districtFilter !== 'all') params.append('district', districtFilter);
//       if (searchTerm) params.append('search', searchTerm);
      
//       const crmResponse = await fetch(`/api/crm-details?${params}`);
//       const crmData = await crmResponse.json();
      
//       const detectionsResponse = await fetch('/api/detections?includeImages=true');
//       const detectionsData = await detectionsResponse.json();
      
//       if (crmData.success && Array.isArray(crmData.data)) {
//         setCrmDetails(crmData.data);
//       } else {
//         console.error('Unexpected CRM data format:', crmData);
//         setCrmDetails([]);
//       }
      
//       if (detectionsData.success && Array.isArray(detectionsData.data)) {
//         const processedDetections = detectionsData.data.map(detection => ({
//           ...detection,
//           evidenceImage: detection.evidence_image || detection.imageUrl || detection.image,
//           thumbnail: detection.thumbnail || detection.imageUrl || detection.image
//         }));
//         setDetections(processedDetections);
//       } else {
//         console.error('Unexpected detections data format:', detectionsData);
//         setDetections([]);
//       }
      
//       setError(null);
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setError('Failed to fetch data. Please check your connection and try again.');
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (!loading) {
//       fetchData();
//     }
//   }, [statusFilter, districtFilter]);

//   // Filter CRM details
//   const filteredCrmDetails = crmDetails.filter(item => {
//     const searchLower = searchTerm.toLowerCase();
//     if (searchTerm && !item.name?.toLowerCase().includes(searchLower) &&
//         !item.additionalDetails?.toLowerCase().includes(searchLower) &&
//         !item.district?.toLowerCase().includes(searchLower)) {
//       return false;
//     }
    
//     if (districtFilter !== 'all' && item.district !== districtFilter) {
//       return false;
//     }
    
//     return true;
//   }).sort((a, b) => {
//     if (sortBy === 'latest') {
//       return new Date(b.createdAt) - new Date(a.createdAt);
//     } else if (sortBy === 'oldest') {
//       return new Date(a.createdAt) - new Date(b.createdAt);
//     }
//     return 0;
//   });

//   // Filter detections
//   const filteredDetections = detections.filter(detection => {
//     const searchLower = searchTerm.toLowerCase();
//     if (searchTerm && !detection.criminal_name?.toLowerCase().includes(searchLower)) {
//       return false;
//     }
    
//     if (cameraFilter !== 'all' && detection.camera_id?.toString() !== cameraFilter) {
//       return false;
//     }
    
//     return true;
//   }).sort((a, b) => {
//     if (sortBy === 'latest') {
//       return new Date(b.timestamp) - new Date(a.timestamp);
//     } else if (sortBy === 'oldest') {
//       return new Date(a.timestamp) - new Date(b.timestamp);
//     }
//     return 0;
//   });

//   const districts = [...new Set(crmDetails.map(d => d.district))].filter(Boolean).sort();
//   const cameraNumbers = [...new Set(detections.map(d => d.camera_id))].filter(Boolean).sort((a, b) => a - b);

//   const todayDetections = detections.filter(d => {
//     const today = new Date().toDateString();
//     return new Date(d.timestamp).toDateString() === today;
//   });

//   // Stats calculation
//   const stats = {
//     totalCriminals: crmDetails.filter(p => p.status === 'criminal').length,
//     totalMissing: crmDetails.filter(p => p.status === 'missing').length,
//     totalDetections: detections.length,
//     todayDetections: todayDetections.length,
//     activeCameras: cameraNumbers.length,
//     totalDistricts: districts.length,
//     highConfidence: detections.filter(d => d.confidence > 90).length,
//     recentMatches: detections.filter(d => {
//       const sevenDaysAgo = new Date();
//       sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
//       return new Date(d.timestamp) > sevenDaysAgo;
//     }).length
//   };

//   const handleViewDetails = (item) => {
//     setSelectedItem(item);
//     setShowDetailModal(true);
//   };

//   const handleViewEvidence = (evidence) => {
//     setSelectedEvidence(evidence);
//     setShowEvidenceModal(true);
//   };

//   const handleDeleteCrm = async (id) => {
//     if (window.confirm('Are you sure you want to delete this record? This action cannot be undone.')) {
//       try {
//         const response = await fetch(`/api/crm-details/${id}`, {
//           method: 'DELETE',
//         });
        
//         if (response.ok) {
//           const result = await response.json();
//           if (result.success) {
//             setCrmDetails(prev => prev.filter(item => item._id !== id));
//             alert('Record deleted successfully!');
//           } else {
//             throw new Error(result.message || 'Failed to delete record');
//           }
//         } else {
//           const error = await response.json();
//           throw new Error(error.message || 'Failed to delete record');
//         }
//       } catch (err) {
//         console.error('Error deleting record:', err);
//         alert(`Error deleting record: ${err.message}`);
//       }
//     }
//   };

//   const handleDeleteDetection = async (id) => {
//     if (window.confirm('Are you sure you want to delete this detection?')) {
//       try {
//         const response = await fetch(`/api/detections/${id}`, {
//           method: 'DELETE',
//         });
        
//         if (response.ok) {
//           const result = await response.json();
//           if (result.success) {
//             setDetections(prev => prev.filter(d => d._id !== id));
//             alert('Detection deleted successfully!');
//           }
//         } else {
//           throw new Error('Failed to delete detection');
//         }
//       } catch (err) {
//         console.error('Error deleting detection:', err);
//         alert('Error deleting detection. Please try again.');
//       }
//     }
//   };

//   const handleAddCrmDetail = async (formData, imageFile) => {
//     try {
//       setRefreshing(true);
      
//       const formDataToSend = new FormData();
//       formDataToSend.append('name', formData.name);
//       formDataToSend.append('age', formData.age);
//       formDataToSend.append('lastSeen', formData.lastSeen);
//       formDataToSend.append('district', formData.district);
//       formDataToSend.append('status', formData.status);
//       formDataToSend.append('additionalDetails', formData.additionalDetails || '');
//       if (imageFile) {
//         formDataToSend.append('image', imageFile);
//       }
      
//       const response = await fetch('/api/crm-details', {
//         method: 'POST',
//         body: formDataToSend,
//       });
      
//       if (response.ok) {
//         const result = await response.json();
//         if (result.success) {
//           setCrmDetails(prev => [result.data, ...prev]);
//           alert('Record added successfully!');
//           return true;
//         } else {
//           throw new Error(result.message || 'Failed to add record');
//         }
//       } else {
//         const error = await response.json();
//         throw new Error(error.message || 'Failed to add record');
//       }
//     } catch (err) {
//       console.error('Error adding CRM detail:', err);
//       alert(`Error adding record: ${err.message}`);
//       return false;
//     } finally {
//       setRefreshing(false);
//     }
//   };

//   const handleUpdateCrmDetail = async (id, formData, imageFile) => {
//     try {
//       setRefreshing(true);
      
//       let formDataToSend;
      
//       if (imageFile) {
//         formDataToSend = new FormData();
//         Object.keys(formData).forEach(key => {
//           formDataToSend.append(key, formData[key]);
//         });
//         formDataToSend.append('image', imageFile);
//       } else {
//         formDataToSend = JSON.stringify(formData);
//       }
      
//       const response = await fetch(`/api/crm-details/${id}`, {
//         method: 'PUT',
//         headers: imageFile ? {} : { 'Content-Type': 'application/json' },
//         body: formDataToSend,
//       });
      
//       if (response.ok) {
//         const result = await response.json();
//         if (result.success) {
//           setCrmDetails(prev => prev.map(item => 
//             item._id === id ? result.data : item
//           ));
//           alert('Record updated successfully!');
//           return true;
//         } else {
//           throw new Error(result.message || 'Failed to update record');
//         }
//       } else {
//         const error = await response.json();
//         throw new Error(error.message || 'Failed to update record');
//       }
//     } catch (err) {
//       console.error('Error updating CRM detail:', err);
//       alert(`Error updating record: ${err.message}`);
//       return false;
//     } finally {
//       setRefreshing(false);
//     }
//   };

//   const exportToCSV = () => {
//     const headers = ['Name', 'Status', 'Age', 'District', 'Last Seen', 'Additional Details', 'Image URL', 'Created At', 'Updated At'];
//     const rows = filteredCrmDetails.map(item => [
//       item.name,
//       item.status,
//       item.age,
//       item.district,
//       new Date(item.lastSeen).toLocaleDateString(),
//       item.additionalDetails || '',
//       item.image || '',
//       new Date(item.createdAt).toLocaleDateString(),
//       new Date(item.updatedAt).toLocaleDateString()
//     ]);
    
//     const csvContent = [
//       headers.join(','),
//       ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
//     ].join('\n');
    
//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `tamilnadu_police_database_${new Date().toISOString().slice(0,10)}.csv`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'Unknown';
//     const date = new Date(dateString);
//     return date.toLocaleString('en-IN', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true
//     });
//   };

//   const formatTime = (dateString) => {
//     if (!dateString) return 'Unknown';
//     const date = new Date(dateString);
//     return date.toLocaleTimeString('en-IN', {
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true
//     });
//   };

//   const handleRefresh = () => {
//     fetchData();
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     fetchData();
//   };

//   if (loading && !refreshing) {
//     return (
//       <>
//         <DashboardLayout>
//           <div className="min-h-screen p-6 ml-[210px] px-6 py-10 bg-gray-50">
//             <div className="max-w-7xl mx-auto">
//               <div className="flex justify-center items-center h-64">
//                 <div className="text-center">
//                   <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//                   <p className="mt-4 text-gray-600">Loading police database...</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </DashboardLayout>
//       </>
//     );
//   }

//   return (
//     <>
//       <DashboardLayout>
//         <div className="min-h-screen p-6 ml-[210px] px-6 py-10 bg-gradient-to-b from-gray-50 to-gray-100">
//           <div className="max-w-7xl mx-auto">
//             {/* Header Section */}
//             <div className="mb-8">
//               <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-6">
//                 <div>
//                   <div className="flex items-center gap-3">
//                     <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg">
//                       <Shield className="text-white" size={28} />
//                     </div>
//                     <div>
//                       <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Tamil Nadu Police Intelligence System</h1>
//                       <p className="text-gray-600 mt-1">Real-time Criminal Tracking & Evidence Management</p>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="flex flex-col sm:flex-row gap-3">
//                   <button
//                     onClick={handleRefresh}
//                     disabled={refreshing}
//                     className={`flex items-center justify-center gap-2 bg-white shadow-sm border border-gray-200 
//                              text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium
//                              ${refreshing ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-md'}`}
//                   >
//                     <RefreshCw size={18} className={refreshing ? 'animate-spin' : ''} />
//                     {refreshing ? 'Refreshing...' : 'Refresh'}
//                   </button>
//                   <button
//                     onClick={exportToCSV}
//                     className="flex items-center justify-center gap-2 bg-white shadow-sm border border-gray-200 
//                              text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium hover:shadow-md"
//                   >
//                     <Download size={18} />
//                     Export
//                   </button>
//                   <button
//                     onClick={() => setShowAddModal(true)}
//                     className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white 
//                              px-4 py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 
//                              font-medium shadow-lg hover:shadow-xl"
//                   >
//                     <Plus size={18} />
//                     Add Record
//                   </button>
//                 </div>
//               </div>

//               {/* Enhanced Stats Cards */}
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//                 <StatCard
//                   title="Active Criminal Records"
//                   value={stats.totalCriminals}
//                   icon={<UserX className="text-white" size={24} />}
//                   color="bg-gradient-to-br from-red-500 to-red-600"
//                   trend={`+${Math.floor(stats.totalCriminals * 0.05)} this week`}
//                   trendUp={true}
//                   description="High-priority targets"
//                 />
//                 <StatCard
//                   title="Missing Persons"
//                   value={stats.totalMissing}
//                   icon={<Users className="text-white" size={24} />}
//                   color="bg-gradient-to-br from-amber-500 to-amber-600"
//                   trend={`${Math.floor(stats.totalMissing * 0.12)} resolved`}
//                   trendUp={false}
//                   description="Cases under investigation"
//                 />
//                 <StatCard
//                   title="Recent Detections"
//                   value={stats.todayDetections}
//                   icon={<Zap className="text-white" size={24} />}
//                   color="bg-gradient-to-br from-blue-500 to-blue-600"
//                   trend={`${stats.highConfidence} high confidence`}
//                   trendUp={true}
//                   description="Today's alerts"
//                 />
//                 <StatCard
//                   title="Evidence Collected"
//                   value={stats.totalDetections}
//                   icon={<Camera className="text-white" size={24} />}
//                   color="bg-gradient-to-br from-green-500 to-green-600"
//                   trend={`${stats.recentMatches} last 7 days`}
//                   trendUp={true}
//                   description="Total evidence pieces"
//                 />
//               </div>
//             </div>

//             {/* Search and Filter Section */}
//             <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
//               <form onSubmit={handleSearch} className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
//                 {/* Search Bar */}
//                 <div className="relative w-full lg:w-80">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//                   <input
//                     type="text"
//                     placeholder="Search by name, district, case details..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm shadow-sm"
//                   />
//                   <button
//                     type="submit"
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-800"
//                   >
//                     <Search size={18} />
//                   </button>
//                 </div>
                
//                 {/* Filter and Sort Controls */}
//                 <div className="flex flex-wrap items-center gap-3">
//                   <select
//                     value={sortBy}
//                     onChange={(e) => setSortBy(e.target.value)}
//                     className="px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-sm"
//                   >
//                     <option value="latest">Latest First</option>
//                     <option value="oldest">Oldest First</option>
//                   </select>
                  
//                   <button
//                     type="button"
//                     onClick={() => setFilterOpen(!filterOpen)}
//                     className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-100 text-sm font-medium shadow-sm transition-all duration-200"
//                   >
//                     <Filter size={16} />
//                     Advanced Filters
//                     {filterOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
//                   </button>
//                 </div>
//               </form>

//               {/* Advanced Filters */}
//               {filterOpen && (
//                 <motion.div
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: 'auto' }}
//                   className="pt-6 border-t border-gray-200"
//                 >
//                   <h3 className="text-sm font-semibold text-gray-900 mb-4">Filter Options</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Record Status
//                       </label>
//                       <select
//                         value={statusFilter}
//                         onChange={(e) => setStatusFilter(e.target.value)}
//                         className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-sm"
//                       >
//                         <option value="all">All Status</option>
//                         <option value="criminal">Criminal Records</option>
//                         <option value="missing">Missing Persons</option>
//                       </select>
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         District Jurisdiction
//                       </label>
//                       <select
//                         value={districtFilter}
//                         onChange={(e) => setDistrictFilter(e.target.value)}
//                         className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-sm"
//                       >
//                         <option value="all">All Districts</option>
//                         {districts.map(district => (
//                           <option key={district} value={district}>{district}</option>
//                         ))}
//                       </select>
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Camera Source
//                       </label>
//                       <select
//                         value={cameraFilter}
//                         onChange={(e) => setCameraFilter(e.target.value)}
//                         className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-sm"
//                       >
//                         <option value="all">All Surveillance Cameras</option>
//                         {cameraNumbers.map(camera => (
//                           <option key={camera} value={camera}>Camera #{camera}</option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                 </motion.div>
//               )}
//             </div>

//             {/* CRM Database Section - NOW ON TOP */}
//             <div className="mb-8">
//               <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
//                 {/* CRM Header */}
//                 <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
//                   <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//                     <div>
//                       <div className="flex items-center gap-3">
//                         <div className="p-2 bg-blue-100 rounded-lg">
//                           <Database className="text-blue-600" size={20} />
//                         </div>
//                         <h2 className="text-xl font-bold text-gray-900">Criminal & Missing Persons Database</h2>
//                       </div>
//                       <p className="text-sm text-gray-600 mt-1">Active records in Tamil Nadu Police System</p>
//                     </div>
                    
//                     <div className="flex items-center gap-3">
//                       <div className="text-sm text-gray-500">
//                         <span className="font-medium text-blue-600">{filteredCrmDetails.length}</span> of <span className="font-medium text-blue-600">{crmDetails.length}</span> records
//                       </div>
//                       {(searchTerm || statusFilter !== 'all' || districtFilter !== 'all') && (
//                         <button
//                           onClick={() => {
//                             setSearchTerm('');
//                             setStatusFilter('all');
//                             setDistrictFilter('all');
//                           }}
//                           className="text-sm text-blue-600 hover:text-blue-800 font-medium"
//                         >
//                           Clear filters
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* CRM Content */}
//                 <div className="p-6">
//                   <AnimatePresence mode="wait">
//                     {filteredCrmDetails.length > 0 ? (
//                       <motion.div
//                         key="crm-grid"
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
//                       >
//                         {filteredCrmDetails.map((item, index) => (
//                           <CrmCard
//                             key={item._id || index}
//                             item={item}
//                             index={index}
//                             onView={() => handleViewDetails(item)}
//                             onDelete={() => handleDeleteCrm(item._id)}
//                             onEdit={() => {
//                               setSelectedItem(item);
//                               setShowAddModal(true);
//                             }}
//                           />
//                         ))}
//                       </motion.div>
//                     ) : (
//                       <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         className="p-12 text-center"
//                       >
//                         <Database className="text-gray-400 mx-auto mb-4" size={48} />
//                         <h3 className="text-lg font-semibold text-gray-600 mb-2">No records found</h3>
//                         <p className="text-gray-500 mb-4">
//                           {searchTerm || statusFilter !== 'all' || districtFilter !== 'all'
//                             ? 'Try adjusting your search filters' 
//                             : 'No records in police database'}
//                         </p>
//                         <button
//                           onClick={() => setShowAddModal(true)}
//                           className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
//                         >
//                           <Plus size={16} />
//                           Add First Record
//                         </button>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               </div>
//             </div>

//             {/* Evidence Section - NOW BELOW CRM DATABASE */}
//             {detections.length > 0 && (
//               <div className="mb-6">
//                 <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
//                   {/* Evidence Header */}
//                   <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
//                     <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//                       <div>
//                         <div className="flex items-center gap-3">
//                           <div className="p-2 bg-blue-100 rounded-lg">
//                             <Camera className="text-blue-600" size={20} />
//                           </div>
//                           <h2 className="text-xl font-bold text-gray-900">Evidence & Detections</h2>
//                         </div>
//                         <p className="text-sm text-gray-600 mt-1">Real-time surveillance evidence with AI analysis</p>
//                       </div>
                      
//                       <div className="flex items-center gap-3">
//                         <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg">
//                           <button
//                             onClick={() => setEvidenceView('grid')}
//                             className={`p-1.5 rounded-md transition-colors ${evidenceView === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//                           >
//                             <Grid size={16} />
//                           </button>
//                           <button
//                             onClick={() => setEvidenceView('timeline')}
//                             className={`p-1.5 rounded-md transition-colors ${evidenceView === 'timeline' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//                           >
//                             <List size={16} />
//                           </button>
//                         </div>
//                         <div className="text-sm text-gray-500">
//                           <span className="font-medium text-blue-600">{detections.length}</span> pieces of evidence
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Evidence Content */}
//                   <div className="p-6">
//                     {evidenceView === 'grid' ? (
//                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                         {filteredDetections.slice(0, 6).map((detection) => (
//                           <EvidenceCard
//                             key={detection._id}
//                             detection={detection}
//                             onView={() => handleViewEvidence(detection)}
//                             onDelete={() => handleDeleteDetection(detection._id)}
//                           />
//                         ))}
//                       </div>
//                     ) : (
//                       <div className="space-y-4">
//                         {filteredDetections.slice(0, 5).map((detection, index) => (
//                           <TimelineEvidenceItem
//                             key={detection._id}
//                             detection={detection}
//                             index={index}
//                             onView={() => handleViewEvidence(detection)}
//                           />
//                         ))}
//                       </div>
//                     )}
                    
//                     {filteredDetections.length > 6 && evidenceView === 'grid' && (
//                       <div className="mt-6 text-center">
//                         <button
//                           onClick={() => {/* Navigate to full evidence page */}}
//                           className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center justify-center gap-2 mx-auto"
//                         >
//                           View all {filteredDetections.length} evidence pieces
//                           <ChevronDown size={16} />
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </DashboardLayout>

//       {/* Add/Edit Record Modal */}
//       <AnimatePresence>
//         {showAddModal && (
//           <AddRecordModal 
//             item={selectedItem}
//             onClose={() => {
//               setShowAddModal(false);
//               setSelectedItem(null);
//             }}
//             onSubmit={selectedItem ? 
//               (formData, imageFile) => handleUpdateCrmDetail(selectedItem._id, formData, imageFile) : 
//               handleAddCrmDetail}
//             uploading={refreshing}
//             isEdit={!!selectedItem}
//           />
//         )}
//       </AnimatePresence>

//       {/* Evidence Detail Modal */}
//       <AnimatePresence>
//         {showEvidenceModal && selectedEvidence && (
//           <EvidenceDetailModal 
//             evidence={selectedEvidence}
//             onClose={() => {
//               setShowEvidenceModal(false);
//               setSelectedEvidence(null);
//             }}
//           />
//         )}
//       </AnimatePresence>

//       {/* Detail View Modal */}
//       <AnimatePresence>
//         {showDetailModal && selectedItem && (
//           <DetailModal 
//             item={selectedItem} 
//             onClose={() => setShowDetailModal(false)}
//             onEdit={() => {
//               setShowDetailModal(false);
//               setShowAddModal(true);
//             }}
//           />
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

// // Enhanced Stat Card Component
// function StatCard({ title, value, icon, color, trend, trendUp, description }) {
//   return (
//     <div className={`${color} p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-white`}>
//       <div className="flex items-center justify-between mb-4">
//         <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
//           {icon}
//         </div>
//         {trend && (
//           <span className={`text-xs font-medium px-2 py-1 rounded-full ${trendUp ? 'bg-green-500/30 text-green-100' : 'bg-amber-500/30 text-amber-100'}`}>
//             {trend}
//           </span>
//         )}
//       </div>
//       <div>
//         <p className="text-2xl lg:text-3xl font-bold mb-1">{value}</p>
//         <p className="text-white/90 font-medium mb-1">{title}</p>
//         {description && (
//           <p className="text-white/70 text-xs">{description}</p>
//         )}
//       </div>
//     </div>
//   );
// }

// // CRM Card Component
// function CrmCard({ item, index, onView, onDelete, onEdit }) {
//   const statusColors = {
//     criminal: 'bg-gradient-to-r from-red-500 to-red-600',
//     missing: 'bg-gradient-to-r from-amber-500 to-amber-600',
//   };

//   const statusIcons = {
//     criminal: <ShieldAlert size={12} />,
//     missing: <Users size={12} />,
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: index * 0.05 }}
//       whileHover={{ y: -8 }}
//       className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
//     >
//       {/* Image with gradient overlay */}
//       <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
//         <img
//           src={item.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${item.name}&backgroundColor=b6e3f4`}
//           alt={item.name}
//           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90"
//           onError={(e) => {
//             e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${item.name}&backgroundColor=b6e3f4`;
//           }}
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
//         <div className="absolute top-3 right-3">
//           <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-white ${statusColors[item.status] || 'bg-gray-700'}`}>
//             {statusIcons[item.status]}
//             {item.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : 'Unknown'}
//           </span>
//         </div>
//       </div>

//       {/* Details */}
//       <div className="p-5">
//         <div className="mb-4">
//           <h3 className="font-bold text-gray-900 text-lg truncate mb-1">{item.name}</h3>
//           <div className="flex items-center gap-3">
//             <span className="text-sm font-medium text-gray-700 bg-gray-100 px-2 py-0.5 rounded">
//               {item.age} years
//             </span>
//             <span className="text-sm text-gray-500 flex items-center gap-1">
//               <MapPin size={12} />
//               {item.district}
//             </span>
//           </div>
//         </div>

//         <div className="space-y-3 mb-4">
//           <div>
//             <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
//               <Calendar size={12} />
//               Last Seen
//             </p>
//             <p className="text-sm font-medium text-gray-900">
//               {item.lastSeen ? new Date(item.lastSeen).toLocaleDateString('en-IN', {
//                 day: 'numeric',
//                 month: 'short',
//                 year: 'numeric'
//               }) : 'Unknown'}
//             </p>
//           </div>
//           {item.additionalDetails && (
//             <div>
//               <p className="text-xs text-gray-500 mb-1">Case Notes</p>
//               <p className="text-sm text-gray-700 line-clamp-2">{item.additionalDetails}</p>
//             </div>
//           )}
//         </div>

//         {/* Action Buttons */}
//         <div className="flex justify-between items-center border-t border-gray-100 pt-4">
//           <button
//             onClick={onView}
//             className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 group-hover:gap-3 transition-all"
//           >
//             <Eye size={16} />
//             View Details
//           </button>
//           <div className="flex items-center gap-1">
//             <button
//               onClick={onEdit}
//               className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//               title="Edit Record"
//             >
//               <Edit size={16} />
//             </button>
//             <button
//               onClick={onDelete}
//               className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//               title="Delete Record"
//             >
//               <Trash2 size={16} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// // Evidence Card Component (Grid View)
// function EvidenceCard({ detection, onView, onDelete }) {
//   const formatTime = (dateString) => {
//     if (!dateString) return 'Unknown';
//     const date = new Date(dateString);
//     return date.toLocaleTimeString('en-IN', {
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true
//     });
//   };

//   const confidenceColor = detection.confidence >= 90 ? 'bg-green-100 text-green-800 border-green-200' :
//                         detection.confidence >= 75 ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
//                         'bg-red-100 text-red-800 border-red-200';

//   return (
//     <motion.div
//       whileHover={{ scale: 1.02 }}
//       className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
//     >
//       {/* Evidence Image */}
//       <div className="relative h-40 overflow-hidden bg-gray-900">
//         <img
//           src={detection.thumbnail || detection.evidenceImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${detection.criminal_name}&backgroundColor=b6e3f4`}
//           alt={`Evidence of ${detection.criminal_name}`}
//           className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//           onError={(e) => {
//             e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${detection.criminal_name}&backgroundColor=b6e3f4`;
//           }}
//         />
//         <div className="absolute top-2 left-2">
//           <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-black/70 text-white text-xs font-bold">
//             <Camera size={10} />
//             Cam #{detection.camera_id || 'N/A'}
//           </span>
//         </div>
//         <div className="absolute bottom-2 right-2">
//           <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold border ${confidenceColor}`}>
//             <Target size={10} />
//             {detection.confidence ? `${detection.confidence.toFixed(0)}%` : 'N/A'}
//           </span>
//         </div>
//       </div>

//       {/* Evidence Details */}
//       <div className="p-4">
//         <div className="mb-3">
//           <div className="flex items-center justify-between mb-2">
//             <h4 className="font-bold text-gray-900 truncate">
//               {detection.criminal_name || 'Unknown Subject'}
//             </h4>
//             <span className="text-xs text-gray-500">
//               {formatTime(detection.timestamp)}
//             </span>
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
//               {detection.district || 'Unknown Location'}
//             </span>
//             <span className="text-xs text-gray-500">
//               ID: {detection._id?.slice(-6) || 'N/A'}
//             </span>
//           </div>
//         </div>

//         {/* Confidence Bar */}
//         <div className="mb-4">
//           <div className="flex justify-between text-xs text-gray-600 mb-1">
//             <span>Match Confidence</span>
//             <span className="font-medium">{detection.confidence ? `${detection.confidence.toFixed(1)}%` : 'N/A'}</span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-2">
//             <div 
//               className={`h-2 rounded-full ${detection.confidence >= 90 ? 'bg-green-500' : detection.confidence >= 75 ? 'bg-yellow-500' : 'bg-red-500'}`}
//               style={{ width: `${detection.confidence || 0}%` }}
//             ></div>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex justify-between items-center">
//           <button
//             onClick={onView}
//             className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800"
//           >
//             <Eye size={14} />
//             Analyze Evidence
//           </button>
//           <button
//             onClick={onDelete}
//             className="text-sm text-red-600 hover:text-red-800 font-medium"
//           >
//             Remove
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// // Timeline Evidence Item Component
// function TimelineEvidenceItem({ detection, index, onView }) {
//   const formatTime = (dateString) => {
//     if (!dateString) return 'Unknown';
//     const date = new Date(dateString);
//     return date.toLocaleTimeString('en-IN', {
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true
//     });
//   };

//   const confidenceColor = detection.confidence >= 90 ? 'bg-green-500' :
//                         detection.confidence >= 75 ? 'bg-yellow-500' :
//                         'bg-red-500';

//   return (
//     <motion.div
//       initial={{ opacity: 0, x: -20 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ delay: index * 0.1 }}
//       className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow duration-300"
//     >
//       {/* Timeline Dot */}
//       <div className="relative flex flex-col items-center">
//         <div className={`w-3 h-3 rounded-full ${confidenceColor} z-10`}></div>
//         <div className="w-px h-full bg-gray-300 absolute top-4"></div>
//       </div>

//       {/* Evidence Thumbnail */}
//       <div className="flex-shrink-0">
//         <img
//           src={detection.thumbnail || detection.evidenceImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${detection.criminal_name}&backgroundColor=b6e3f4`}
//           alt={`Evidence of ${detection.criminal_name}`}
//           className="w-16 h-16 object-cover rounded-lg border border-gray-300"
//           onError={(e) => {
//             e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${detection.criminal_name}&backgroundColor=b6e3f4`;
//           }}
//         />
//       </div>

//       {/* Evidence Details */}
//       <div className="flex-1 min-w-0">
//         <div className="flex justify-between items-start mb-1">
//           <h4 className="font-semibold text-gray-900 truncate">
//             {detection.criminal_name || 'Unknown Subject'}
//           </h4>
//           <span className="text-xs text-gray-500 whitespace-nowrap">
//             {formatTime(detection.timestamp)}
//           </span>
//         </div>
//         <div className="flex items-center gap-3 mb-2">
//           <span className="inline-flex items-center gap-1 text-xs text-gray-600">
//             <Camera size={12} />
//             Camera #{detection.camera_id || 'N/A'}
//           </span>
//           <span className="inline-flex items-center gap-1 text-xs text-gray-600">
//             <MapPin size={12} />
//             {detection.district || 'Unknown'}
//           </span>
//         </div>
//         <div className="flex items-center gap-4">
//           <div className="flex-1">
//             <div className="flex justify-between text-xs text-gray-600 mb-1">
//               <span>Confidence Score</span>
//               <span className="font-medium">{detection.confidence ? `${detection.confidence.toFixed(1)}%` : 'N/A'}</span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-1.5">
//               <div 
//                 className={`h-1.5 rounded-full ${confidenceColor}`}
//                 style={{ width: `${detection.confidence || 0}%` }}
//               ></div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Action Button */}
//       <button
//         onClick={onView}
//         className="flex-shrink-0 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
//       >
//         View
//       </button>
//     </motion.div>
//   );
// }

// // Evidence Detail Modal Component
// function EvidenceDetailModal({ evidence, onClose }) {
//   const formatDate = (dateString) => {
//     if (!dateString) return 'Unknown';
//     const date = new Date(dateString);
//     return date.toLocaleString('en-IN', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true
//     });
//   };

//   const formatTime = (dateString) => {
//     if (!dateString) return 'Unknown';
//     const date = new Date(dateString);
//     return date.toLocaleTimeString('en-IN', {
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true
//     });
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
//       onClick={onClose}
//     >
//       <motion.div
//         initial={{ scale: 0.95, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         exit={{ scale: 0.95, opacity: 0 }}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Header */}
//         <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
//           <div>
//             <h2 className="text-xl font-bold text-gray-900">Evidence Analysis</h2>
//             <p className="text-gray-600 text-sm">AI-powered match verification</p>
//           </div>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="p-6">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* Left Column - Evidence Image */}
//             <div>
//               <div className="bg-gray-900 rounded-xl overflow-hidden mb-4">
//                 <img
//                   src={evidence.evidenceImage || evidence.imageUrl || evidence.image}
//                   alt={`Evidence of ${evidence.criminal_name}`}
//                   className="w-full h-80 object-cover"
//                   onError={(e) => {
//                     e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${evidence.criminal_name}&backgroundColor=b6e3f4`;
//                   }}
//                 />
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="bg-blue-50 p-4 rounded-lg">
//                   <p className="text-sm text-gray-600 mb-1">Camera Source</p>
//                   <p className="font-bold text-lg text-blue-700">#{evidence.camera_id || 'N/A'}</p>
//                 </div>
//                 <div className="bg-green-50 p-4 rounded-lg">
//                   <p className="text-sm text-gray-600 mb-1">Detection Time</p>
//                   <p className="font-bold text-lg text-green-700">{formatTime(evidence.timestamp)}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Right Column - Analysis */}
//             <div className="space-y-6">
//               {/* Subject Info */}
//               <div className="bg-gray-50 p-5 rounded-xl">
//                 <h3 className="font-bold text-gray-900 mb-3 text-lg">Subject Information</h3>
//                 <div className="space-y-3">
//                   <div>
//                     <p className="text-sm text-gray-600">Matched Criminal</p>
//                     <p className="font-bold text-lg text-gray-900">{evidence.criminal_name || 'Unknown'}</p>
//                   </div>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <p className="text-sm text-gray-600">District</p>
//                       <p className="font-medium text-gray-900">{evidence.district || 'Unknown'}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-600">Timestamp</p>
//                       <p className="font-medium text-gray-900">{formatDate(evidence.timestamp)}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Confidence Analysis */}
//               <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-200">
//                 <h3 className="font-bold text-gray-900 mb-3 text-lg">AI Match Analysis</h3>
//                 <div className="space-y-4">
//                   <div>
//                     <div className="flex justify-between mb-1">
//                       <span className="text-sm font-medium text-gray-700">Confidence Score</span>
//                       <span className="text-sm font-bold text-blue-700">
//                         {evidence.confidence ? `${evidence.confidence.toFixed(1)}%` : 'N/A'}
//                       </span>
//                     </div>
//                     <div className="w-full bg-blue-200 rounded-full h-3">
//                       <div 
//                         className={`h-3 rounded-full ${evidence.confidence >= 90 ? 'bg-green-500' : evidence.confidence >= 75 ? 'bg-yellow-500' : 'bg-red-500'}`}
//                         style={{ width: `${evidence.confidence || 0}%` }}
//                       ></div>
//                     </div>
//                   </div>
//                   <div className="text-sm text-gray-600">
//                     <div className="flex items-center gap-2">
//                       {evidence.confidence >= 90 ? (
//                         <>
//                           <CheckCircle className="text-green-500" size={16} />
//                           <span>High confidence match - Recommended for immediate action</span>
//                         </>
//                       ) : evidence.confidence >= 75 ? (
//                         <>
//                           <AlertCircle className="text-yellow-500" size={16} />
//                           <span>Moderate confidence - Requires verification</span>
//                         </>
//                       ) : (
//                         <>
//                           <AlertTriangle className="text-red-500" size={16} />
//                           <span>Low confidence - Needs manual review</span>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Technical Details */}
//               <div className="bg-gray-50 p-5 rounded-xl">
//                 <h3 className="font-bold text-gray-900 mb-3 text-lg">Technical Details</h3>
//                 <div className="grid grid-cols-2 gap-4 text-sm">
//                   <div>
//                     <p className="text-gray-600">Evidence ID</p>
//                     <p className="font-medium text-gray-900 font-mono">{evidence._id?.slice(-8) || 'N/A'}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-600">Detection ID</p>
//                     <p className="font-medium text-gray-900">{evidence.detection_id || 'N/A'}</p>
//                   </div>
//                   <div className="col-span-2">
//                     <p className="text-gray-600">Image Source</p>
//                     <p className="font-medium text-gray-900 truncate">
//                       {evidence.evidenceImage || evidence.imageUrl || 'Not available'}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
//             <button
//               onClick={onClose}
//               className="px-4 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium"
//             >
//               Close Analysis
//             </button>
//             <button className="px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2">
//               <Download size={16} />
//               Download Evidence
//             </button>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }

// // AddRecordModal Component
// function AddRecordModal({ item, onClose, onSubmit, uploading, isEdit = false }) {
//   const [formData, setFormData] = useState({
//     name: item?.name || '',
//     age: item?.age || '',
//     lastSeen: item?.lastSeen ? new Date(item.lastSeen).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
//     district: item?.district || '',
//     status: item?.status || 'criminal',
//     additionalDetails: item?.additionalDetails || ''
//   });
  
//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(item?.image || null);
//   const [imageError, setImageError] = useState('');

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
//     if (!validTypes.includes(file.type)) {
//       setImageError('Please upload a valid image file (JPEG, PNG, or WebP)');
//       return;
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       setImageError('Image size should be less than 5MB');
//       return;
//     }

//     setImageFile(file);
//     setImageError('');

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setImagePreview(reader.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!isEdit && !imageFile) {
//       setImageError('Please upload an image');
//       return;
//     }

//     try {
//       const success = await onSubmit(formData, imageFile);
//       if (success) {
//         onClose();
//       }
//     } catch (err) {
//       console.error('Error submitting form:', err);
//       alert(`Error: ${err.message}`);
//     }
//   };

//   const tamilNaduDistricts = [
//     "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem",
//     "Erode", "Tirunelveli", "Vellore", "Thoothukudi", "Dindigul",
//     "Kanchipuram", "Tiruvallur", "Chengalpattu", "Villupuram", "Krishnagiri",
//     "Dharmapuri", "Kanyakumari", "Theni", "Nagapattinam", "Ramanathapuram",
//     "Sivaganga", "Pudukkottai", "Karur", "Perambalur", "Ariyalur",
//     "Cuddalore", "Kallakurichi", "Tirupathur", "Tenkasi", "Ranipet"
//   ];

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
//       onClick={onClose}
//     >
//       <motion.div
//         initial={{ scale: 0.95, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         exit={{ scale: 0.95, opacity: 0 }}
//         className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
//           <div>
//             <h2 className="text-xl font-bold text-gray-900">
//               {isEdit ? 'Edit Police Record' : 'Add New Police Record'}
//             </h2>
//             <p className="text-gray-600 text-sm">Tamil Nadu Police Database</p>
//           </div>
//           <button
//             onClick={onClose}
//             disabled={uploading}
//             className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Left Column - Image Upload */}
//             <div className="md:col-span-1">
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     {isEdit ? 'Update Photo (Optional)' : 'Upload Photo *'}
//                   </label>
//                   <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 transition-colors">
//                     <div className="space-y-1 text-center">
//                       {imagePreview ? (
//                         <div className="relative">
//                           <img
//                             src={imagePreview}
//                             alt="Preview"
//                             className="mx-auto h-48 w-48 object-cover rounded-lg"
//                           />
//                           <button
//                             type="button"
//                             onClick={() => {
//                               setImageFile(null);
//                               setImagePreview(null);
//                             }}
//                             className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
//                             disabled={uploading}
//                           >
//                             <X size={16} />
//                           </button>
//                         </div>
//                       ) : (
//                         <>
//                           <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
//                           <div className="flex text-sm text-gray-600">
//                             <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
//                               <span>{isEdit ? 'Update file' : 'Upload a file'}</span>
//                               <input
//                                 type="file"
//                                 accept="image/*"
//                                 onChange={handleImageChange}
//                                 className="sr-only"
//                                 required={!isEdit}
//                                 disabled={uploading}
//                               />
//                             </label>
//                             <p className="pl-1">or drag and drop</p>
//                           </div>
//                           <p className="text-xs text-gray-500">
//                             PNG, JPG, WebP up to 5MB
//                           </p>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                   {imageError && (
//                     <p className="mt-1 text-sm text-red-600">{imageError}</p>
//                   )}
//                   {!isEdit && !imageFile && (
//                     <p className="mt-1 text-xs text-red-600">Image is required for new records</p>
//                   )}
//                 </div>

//                 {/* Record Type */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Record Type *
//                   </label>
//                   <div className="flex gap-3">
//                     <button
//                       type="button"
//                       onClick={() => setFormData({...formData, status: 'criminal'})}
//                       disabled={uploading}
//                       className={`flex-1 py-3 px-4 rounded-lg border transition-all disabled:opacity-50 ${
//                         formData.status === 'criminal'
//                           ? 'border-red-500 bg-red-50 text-red-700'
//                           : 'border-gray-300 hover:border-gray-400'
//                       }`}
//                     >
//                       Criminal Record
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => setFormData({...formData, status: 'missing'})}
//                       disabled={uploading}
//                       className={`flex-1 py-3 px-4 rounded-lg border transition-all disabled:opacity-50 ${
//                         formData.status === 'missing'
//                           ? 'border-blue-500 bg-blue-50 text-blue-700'
//                           : 'border-gray-300 hover:border-gray-400'
//                       }`}
//                     >
//                       Missing Person
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right Column - Form Fields */}
//             <div className="md:col-span-1 space-y-4">
//               {/* Basic Information */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Full Name *
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   value={formData.name}
//                   onChange={(e) => setFormData({...formData, name: e.target.value})}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:opacity-50"
//                   placeholder="Enter full name"
//                   disabled={uploading}
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Age *
//                   </label>
//                   <input
//                     type="number"
//                     required
//                     min="1"
//                     max="120"
//                     value={formData.age}
//                     onChange={(e) => setFormData({...formData, age: e.target.value})}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:opacity-50"
//                     placeholder="Enter age"
//                     disabled={uploading}
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Last Seen Date *
//                   </label>
//                   <input
//                     type="date"
//                     required
//                     value={formData.lastSeen}
//                     onChange={(e) => setFormData({...formData, lastSeen: e.target.value})}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:opacity-50"
//                     disabled={uploading}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   District *
//                 </label>
//                 <select
//                   required
//                   value={formData.district}
//                   onChange={(e) => setFormData({...formData, district: e.target.value})}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:opacity-50"
//                   disabled={uploading}
//                 >
//                   <option value="">Select District</option>
//                   {tamilNaduDistricts.map(district => (
//                     <option key={district} value={district}>{district}</option>
//                   ))}
//                 </select>
//               </div>

//               {/* Additional Details */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Additional Details
//                 </label>
//                 <textarea
//                   value={formData.additionalDetails}
//                   onChange={(e) => setFormData({...formData, additionalDetails: e.target.value})}
//                   rows="3"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:opacity-50"
//                   placeholder="Enter additional details, last known location, description, etc."
//                   disabled={uploading}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Form Actions */}
//           <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium disabled:opacity-50"
//               disabled={uploading}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={uploading || (!isEdit && !imageFile)}
//               className={`px-4 py-2 bg-blue-600 text-white rounded-lg transition-colors text-sm font-medium flex items-center gap-2 ${
//                 uploading || (!isEdit && !imageFile) ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
//               }`}
//             >
//               {uploading ? (
//                 <>
//                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                   {isEdit ? 'Updating...' : 'Adding...'}
//                 </>
//               ) : (
//                 isEdit ? 'Update Record' : 'Add to Police Database'
//               )}
//             </button>
//           </div>
//         </form>
//       </motion.div>
//     </motion.div>
//   );
// }

// // Detail Modal Component
// function DetailModal({ item, onClose, onEdit }) {
//   const statusColors = {
//     criminal: 'bg-red-100 text-red-700',
//     missing: 'bg-amber-100 text-amber-700',
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'Unknown';
//     const date = new Date(dateString);
//     return date.toLocaleString('en-IN', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true
//     });
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
//       onClick={onClose}
//     >
//       <motion.div
//         initial={{ scale: 0.95, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         exit={{ scale: 0.95, opacity: 0 }}
//         className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
//           <div>
//             <h2 className="text-xl font-bold text-gray-900">Police Record Details</h2>
//             <p className="text-gray-600 text-sm">Tamil Nadu Police Database</p>
//           </div>
//           <div className="flex items-center gap-3">
//             <button
//               onClick={onEdit}
//               className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
//             >
//               <Edit size={16} />
//               Edit
//             </button>
//             <button
//               onClick={onClose}
//               className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
//             >
//               <X size={20} />
//             </button>
//           </div>
//         </div>

//         <div className="p-6">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Left Column */}
//             <div className="lg:col-span-1">
//               <div className="bg-gray-100 rounded-lg p-4 mb-4">
//                 <img
//                   src={item.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${item.name}&backgroundColor=b6e3f4`}
//                   alt={item.name}
//                   className="w-full h-64 object-cover rounded-lg"
//                   onError={(e) => {
//                     e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${item.name}&backgroundColor=b6e3f4`;
//                   }}
//                 />
//               </div>
              
//               <div className="space-y-4">
//                 <div className="bg-blue-50 p-4 rounded-lg">
//                   <h3 className="font-semibold text-blue-900 mb-3">Record Information</h3>
//                   <div className="space-y-2">
//                     <div>
//                       <span className="text-sm text-gray-600">Created:</span>
//                       <p className="font-medium text-gray-900">
//                         {formatDate(item.createdAt)}
//                       </p>
//                     </div>
//                     <div>
//                       <span className="text-sm text-gray-600">Updated:</span>
//                       <p className="font-medium text-gray-900">
//                         {formatDate(item.updatedAt)}
//                       </p>
//                     </div>
//                     <div>
//                       <span className="text-sm text-gray-600">Database ID:</span>
//                       <p className="font-medium text-gray-900 font-mono text-xs truncate">{item._id}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right Column */}
//             <div className="lg:col-span-2">
//               <div className="mb-6">
//                 <div className="flex items-center justify-between">
//                   <h1 className="text-2xl font-bold text-gray-900">{item.name}</h1>
//                   <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[item.status] || 'bg-gray-100 text-gray-700'}`}>
//                     {item.status ? item.status.toUpperCase() : 'UNKNOWN'}
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-3 mt-2">
//                   <span className="text-gray-600">{item.age} years old</span>
//                   <span className="text-gray-600">•</span>
//                   <span className="text-gray-600">{item.district} District</span>
//                 </div>
//               </div>

//               <div className="space-y-6">
//                 {/* Case Details */}
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <h3 className="font-semibold text-gray-900 mb-3">Case Details</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <span className="text-sm text-gray-600">Last Seen:</span>
//                       <p className="font-medium text-lg">
//                         {item.lastSeen ? new Date(item.lastSeen).toLocaleDateString('en-IN', {
//                           weekday: 'long',
//                           year: 'numeric',
//                           month: 'long',
//                           day: 'numeric'
//                         }) : 'Unknown'}
//                       </p>
//                     </div>
//                     <div>
//                       <span className="text-sm text-gray-600">District:</span>
//                       <p className="font-medium text-lg">{item.district}</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Additional Details */}
//                 {item.additionalDetails && (
//                   <div className="bg-blue-50 p-4 rounded-lg">
//                     <h3 className="font-semibold text-blue-900 mb-3">Additional Details</h3>
//                     <p className="text-gray-700 whitespace-pre-wrap">{item.additionalDetails}</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }

// export default CriminalPage;







import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Edit, Trash2, Eye, Download, AlertTriangle,
  ChevronDown, ChevronUp, X, Shield, MapPin, Calendar,
  FileText, User, Camera, Clock, AlertCircle, CheckCircle,
  Plus, UserX, Building, Landmark, UserCheck, BadgeCheck,
  RefreshCw, Database, Users, EyeOff, Upload, Image as ImageIcon,
  BarChart3, Target, Zap, Activity, TrendingUp, Video,
  Grid, List, Columns, ShieldAlert, Fingerprint, ExternalLink,
  Maximize2, Minimize2, Filter as FilterIcon, SortAsc, SortDesc,
  DownloadCloud, Printer, Share2, Copy, Link
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { CRIMINAL_API_BASE_URL, criminalApiUrl, normalizeAssetUrl } from '../lib/api';

function CriminalPage({ onLogout }) {
  // State for detections
  const [detections, setDetections] = useState([]);
  // State for CRM details
  const [crmDetails, setCrmDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);
  const [showFullEvidenceModal, setShowFullEvidenceModal] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [cameraFilter, setCameraFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [districtFilter, setDistrictFilter] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [evidenceView, setEvidenceView] = useState('grid');
  const [selectedEvidence, setSelectedEvidence] = useState(null);
  const [evidencePage, setEvidencePage] = useState(1);
  const [evidencePerPage, setEvidencePerPage] = useState(10);
  const [evidenceSearch, setEvidenceSearch] = useState('');
  const [selectedEvidenceItems, setSelectedEvidenceItems] = useState([]);

  // Fetch both detections and CRM details
  const fetchData = async () => {
    try {
      setLoading(true);
      setRefreshing(true);
      
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (districtFilter !== 'all') params.append('district', districtFilter);
      if (searchTerm) params.append('search', searchTerm);
      
      const crmResponse = await fetch(criminalApiUrl(`/crm-details?${params.toString()}`));
      const crmData = await crmResponse.json();
      
      const detectionsResponse = await fetch(criminalApiUrl('/detections?includeImages=true'));
      const detectionsData = await detectionsResponse.json();
      
      if (crmData.success && Array.isArray(crmData.data)) {
        setCrmDetails(crmData.data);
      } else {
        console.error('Unexpected CRM data format:', crmData);
        setCrmDetails([]);
      }
      
      if (detectionsData.success && Array.isArray(detectionsData.data)) {
        const processedDetections = detectionsData.data.map(detection => ({
          ...detection,
          evidenceImage: normalizeAssetUrl(detection.evidence_image || detection.imageUrl || detection.image, CRIMINAL_API_BASE_URL),
          thumbnail: normalizeAssetUrl(detection.thumbnail || detection.imageUrl || detection.image, CRIMINAL_API_BASE_URL),
          isSelected: false
        }));
        setDetections(processedDetections);
      } else {
        console.error('Unexpected detections data format:', detectionsData);
        setDetections([]);
      }
      
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch data. Please check your connection and try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) {
      fetchData();
    }
  }, [statusFilter, districtFilter]);

  // Filter CRM details
  const filteredCrmDetails = crmDetails.filter(item => {
    const searchLower = searchTerm.toLowerCase();
    if (searchTerm && !item.name?.toLowerCase().includes(searchLower) &&
        !item.additionalDetails?.toLowerCase().includes(searchLower) &&
        !item.district?.toLowerCase().includes(searchLower)) {
      return false;
    }
    
    if (districtFilter !== 'all' && item.district !== districtFilter) {
      return false;
    }
    
    return true;
  }).sort((a, b) => {
    if (sortBy === 'latest') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === 'oldest') {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    return 0;
  });

  // Filter detections with enhanced search
  const filteredDetections = detections.filter(detection => {
    const searchLower = evidenceSearch.toLowerCase();
    
    // Search across multiple fields
    if (evidenceSearch && 
        !detection.criminal_name?.toLowerCase().includes(searchLower) &&
        !detection.district?.toLowerCase().includes(searchLower) &&
        !detection.camera_id?.toString().includes(searchLower)) {
      return false;
    }
    
    if (cameraFilter !== 'all' && detection.camera_id?.toString() !== cameraFilter) {
      return false;
    }
    
    return true;
  }).sort((a, b) => {
    if (sortBy === 'latest') {
      return new Date(b.timestamp) - new Date(a.timestamp);
    } else if (sortBy === 'oldest') {
      return new Date(a.timestamp) - new Date(b.timestamp);
    } else if (sortBy === 'confidence') {
      return (b.confidence || 0) - (a.confidence || 0);
    }
    return 0;
  });

  // Pagination for evidence
  const totalEvidencePages = Math.ceil(filteredDetections.length / evidencePerPage);
  const paginatedDetections = filteredDetections.slice(
    (evidencePage - 1) * evidencePerPage,
    evidencePage * evidencePerPage
  );

  const districts = [...new Set(crmDetails.map(d => d.district))].filter(Boolean).sort();
  const cameraNumbers = [...new Set(detections.map(d => d.camera_id))].filter(Boolean).sort((a, b) => a - b);

  const todayDetections = detections.filter(d => {
    const today = new Date().toDateString();
    return new Date(d.timestamp).toDateString() === today;
  });

  // Stats calculation
  const stats = {
    totalCriminals: crmDetails.filter(p => p.status === 'criminal').length,
    totalMissing: crmDetails.filter(p => p.status === 'missing').length,
    totalDetections: detections.length,
    todayDetections: todayDetections.length,
    activeCameras: cameraNumbers.length,
    totalDistricts: districts.length,
    highConfidence: detections.filter(d => d.confidence > 90).length,
    recentMatches: detections.filter(d => {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return new Date(d.timestamp) > sevenDaysAgo;
    }).length
  };

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setShowDetailModal(true);
  };

  const handleViewEvidence = (evidence) => {
    setSelectedEvidence(evidence);
    setShowEvidenceModal(true);
  };

  const handleDeleteCrm = async (id) => {
    if (window.confirm('Are you sure you want to delete this record? This action cannot be undone.')) {
      try {
        const response = await fetch(criminalApiUrl(`/crm-details/${id}`), {
          method: 'DELETE',
        });
        
        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            setCrmDetails(prev => prev.filter(item => item._id !== id));
            alert('Record deleted successfully!');
          } else {
            throw new Error(result.message || 'Failed to delete record');
          }
        } else {
          const error = await response.json();
          throw new Error(error.message || 'Failed to delete record');
        }
      } catch (err) {
        console.error('Error deleting record:', err);
        alert(`Error deleting record: ${err.message}`);
      }
    }
  };

  const handleDeleteDetection = async (id) => {
    if (window.confirm('Are you sure you want to delete this detection?')) {
      try {
        const response = await fetch(criminalApiUrl(`/detections/${id}`), {
          method: 'DELETE',
        });
        
        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            setDetections(prev => prev.filter(d => d._id !== id));
            alert('Detection deleted successfully!');
          }
        } else {
          throw new Error('Failed to delete detection');
        }
      } catch (err) {
        console.error('Error deleting detection:', err);
        alert('Error deleting detection. Please try again.');
      }
    }
  };

  const handleAddCrmDetail = async (formData, imageFile) => {
    try {
      setRefreshing(true);
      
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('age', formData.age);
      formDataToSend.append('lastSeen', formData.lastSeen);
      formDataToSend.append('district', formData.district);
      formDataToSend.append('status', formData.status);
      formDataToSend.append('additionalDetails', formData.additionalDetails || '');
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }
      
      const response = await fetch(criminalApiUrl('/crm-details'), {
        method: 'POST',
        body: formDataToSend,
      });
      
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setCrmDetails(prev => [result.data, ...prev]);
          alert('Record added successfully!');
          return true;
        } else {
          throw new Error(result.message || 'Failed to add record');
        }
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to add record');
      }
    } catch (err) {
      console.error('Error adding CRM detail:', err);
      alert(`Error adding record: ${err.message}`);
      return false;
    } finally {
      setRefreshing(false);
    }
  };

  const handleUpdateCrmDetail = async (id, formData, imageFile) => {
    try {
      setRefreshing(true);
      
      let formDataToSend;
      
      if (imageFile) {
        formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
          formDataToSend.append(key, formData[key]);
        });
        formDataToSend.append('image', imageFile);
      } else {
        formDataToSend = JSON.stringify(formData);
      }
      
      const response = await fetch(criminalApiUrl(`/crm-details/${id}`), {
        method: 'PUT',
        headers: imageFile ? {} : { 'Content-Type': 'application/json' },
        body: formDataToSend,
      });
      
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setCrmDetails(prev => prev.map(item => 
            item._id === id ? result.data : item
          ));
          alert('Record updated successfully!');
          return true;
        } else {
          throw new Error(result.message || 'Failed to update record');
        }
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update record');
      }
    } catch (err) {
      console.error('Error updating CRM detail:', err);
      alert(`Error updating record: ${err.message}`);
      return false;
    } finally {
      setRefreshing(false);
    }
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Status', 'Age', 'District', 'Last Seen', 'Additional Details', 'Image URL', 'Created At', 'Updated At'];
    const rows = filteredCrmDetails.map(item => [
      item.name,
      item.status,
      item.age,
      item.district,
      new Date(item.lastSeen).toLocaleDateString(),
      item.additionalDetails || '',
      item.image || '',
      new Date(item.createdAt).toLocaleDateString(),
      new Date(item.updatedAt).toLocaleDateString()
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tamilnadu_police_database_${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportEvidenceToCSV = () => {
    const headers = ['ID', 'Criminal Name', 'Confidence', 'Camera ID', 'District', 'Timestamp', 'Evidence URL'];
    const rows = filteredDetections.map(detection => [
      detection._id || '',
      detection.criminal_name || '',
      `${detection.confidence || 0}%`,
      detection.camera_id || '',
      detection.district || '',
      new Date(detection.timestamp).toLocaleString(),
      detection.evidenceImage || ''
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `evidence_detections_${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleRefresh = () => {
    fetchData();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchData();
  };

  const handleEvidenceSearch = (e) => {
    e.preventDefault();
    setEvidencePage(1);
  };

  const toggleSelectEvidence = (id) => {
    setSelectedEvidenceItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const selectAllEvidence = () => {
    if (selectedEvidenceItems.length === paginatedDetections.length) {
      setSelectedEvidenceItems([]);
    } else {
      setSelectedEvidenceItems(paginatedDetections.map(d => d._id));
    }
  };

  const deleteSelectedEvidence = async () => {
    if (selectedEvidenceItems.length === 0) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedEvidenceItems.length} selected evidence items?`)) {
      try {
        const deletePromises = selectedEvidenceItems.map(id => 
          fetch(criminalApiUrl(`/detections/${id}`), {
            method: 'DELETE',
          })
        );
        
        const results = await Promise.all(deletePromises);
        const allSuccess = results.every(res => res.ok);
        
        if (allSuccess) {
          setDetections(prev => prev.filter(d => !selectedEvidenceItems.includes(d._id)));
          setSelectedEvidenceItems([]);
          alert(`${selectedEvidenceItems.length} evidence items deleted successfully!`);
        } else {
          throw new Error('Some items failed to delete');
        }
      } catch (err) {
        console.error('Error deleting evidence items:', err);
        alert('Error deleting evidence items. Please try again.');
      }
    }
  };

  if (loading && !refreshing) {
    return (
      <>
        <DashboardLayout>
          <div className="min-h-screen bg-gray-50 px-4 py-6 md:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-center items-center h-64">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading police database...</p>
                </div>
              </div>
            </div>
          </div>
        </DashboardLayout>
      </>
    );
  }

  return (
    <>
      <DashboardLayout>
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-6">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg">
                      <Shield className="text-white" size={28} />
                    </div>
                    <div>
                      <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Tamil Nadu Police Intelligence System</h1>
                      <p className="text-gray-600 mt-1">Real-time Criminal Tracking & Evidence Management</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleRefresh}
                    disabled={refreshing}
                    className={`flex items-center justify-center gap-2 bg-white shadow-sm border border-gray-200 
                             text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium
                             ${refreshing ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-md'}`}
                  >
                    <RefreshCw size={18} className={refreshing ? 'animate-spin' : ''} />
                    {refreshing ? 'Refreshing...' : 'Refresh'}
                  </button>
                  <button
                    onClick={exportToCSV}
                    className="flex items-center justify-center gap-2 bg-white shadow-sm border border-gray-200 
                             text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium hover:shadow-md"
                  >
                    <Download size={18} />
                    Export
                  </button>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white 
                             px-4 py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 
                             font-medium shadow-lg hover:shadow-xl"
                  >
                    <Plus size={18} />
                    Add Record
                  </button>
                </div>
              </div>

              {/* Enhanced Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StatCard
                  title="Active Criminal Records"
                  value={stats.totalCriminals}
                  icon={<UserX className="text-white" size={24} />}
                  color="bg-gradient-to-br from-red-500 to-red-600"
                  trend={`+${Math.floor(stats.totalCriminals * 0.05)} this week`}
                  trendUp={true}
                  description="High-priority targets"
                />
                <StatCard
                  title="Missing Persons"
                  value={stats.totalMissing}
                  icon={<Users className="text-white" size={24} />}
                  color="bg-gradient-to-br from-amber-500 to-amber-600"
                  trend={`${Math.floor(stats.totalMissing * 0.12)} resolved`}
                  trendUp={false}
                  description="Cases under investigation"
                />
                <StatCard
                  title="Recent Detections"
                  value={stats.todayDetections}
                  icon={<Zap className="text-white" size={24} />}
                  color="bg-gradient-to-br from-blue-500 to-blue-600"
                  trend={`${stats.highConfidence} high confidence`}
                  trendUp={true}
                  description="Today's alerts"
                />
                <StatCard
                  title="Evidence Collected"
                  value={stats.totalDetections}
                  icon={<Camera className="text-white" size={24} />}
                  color="bg-gradient-to-br from-green-500 to-green-600"
                  trend={`${stats.recentMatches} last 7 days`}
                  trendUp={true}
                  description="Total evidence pieces"
                />
              </div>
            </div>

            {/* Search and Filter Section */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
              <form onSubmit={handleSearch} className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
                {/* Search Bar */}
                <div className="relative w-full lg:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search by name, district, case details..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm shadow-sm"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-800"
                  >
                    <Search size={18} />
                  </button>
                </div>
                
                {/* Filter and Sort Controls */}
                <div className="flex flex-wrap items-center gap-3">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-sm"
                  >
                    <option value="latest">Latest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="confidence">Highest Confidence</option>
                  </select>
                  
                  <button
                    type="button"
                    onClick={() => setFilterOpen(!filterOpen)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-100 text-sm font-medium shadow-sm transition-all duration-200"
                  >
                    <Filter size={16} />
                    Advanced Filters
                    {filterOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>
              </form>

              {/* Advanced Filters */}
              {filterOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="pt-6 border-t border-gray-200"
                >
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">Filter Options</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Record Status
                      </label>
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-sm"
                      >
                        <option value="all">All Status</option>
                        <option value="criminal">Criminal Records</option>
                        <option value="missing">Missing Persons</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        District Jurisdiction
                      </label>
                      <select
                        value={districtFilter}
                        onChange={(e) => setDistrictFilter(e.target.value)}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-sm"
                      >
                        <option value="all">All Districts</option>
                        {districts.map(district => (
                          <option key={district} value={district}>{district}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Camera Source
                      </label>
                      <select
                        value={cameraFilter}
                        onChange={(e) => setCameraFilter(e.target.value)}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-sm"
                      >
                        <option value="all">All Surveillance Cameras</option>
                        {cameraNumbers.map(camera => (
                          <option key={camera} value={camera}>Camera #{camera}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* CRM Database Section */}
            <div className="mb-8">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                {/* CRM Header */}
                <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Database className="text-blue-600" size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Criminal & Missing Persons Database</h2>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Active records in Tamil Nadu Police System</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="text-sm text-gray-500">
                        <span className="font-medium text-blue-600">{filteredCrmDetails.length}</span> of <span className="font-medium text-blue-600">{crmDetails.length}</span> records
                      </div>
                      {(searchTerm || statusFilter !== 'all' || districtFilter !== 'all') && (
                        <button
                          onClick={() => {
                            setSearchTerm('');
                            setStatusFilter('all');
                            setDistrictFilter('all');
                          }}
                          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Clear filters
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* CRM Content */}
                <div className="p-6">
                  <AnimatePresence mode="wait">
                    {filteredCrmDetails.length > 0 ? (
                      <motion.div
                        key="crm-grid"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                      >
                        {filteredCrmDetails.map((item, index) => (
                          <CrmCard
                            key={item._id || index}
                            item={item}
                            index={index}
                            onView={() => handleViewDetails(item)}
                            onDelete={() => handleDeleteCrm(item._id)}
                            onEdit={() => {
                              setSelectedItem(item);
                              setShowAddModal(true);
                            }}
                          />
                        ))}
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-12 text-center"
                      >
                        <Database className="text-gray-400 mx-auto mb-4" size={48} />
                        <h3 className="text-lg font-semibold text-gray-600 mb-2">No records found</h3>
                        <p className="text-gray-500 mb-4">
                          {searchTerm || statusFilter !== 'all' || districtFilter !== 'all'
                            ? 'Try adjusting your search filters' 
                            : 'No records in police database'}
                        </p>
                        <button
                          onClick={() => setShowAddModal(true)}
                          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                          <Plus size={16} />
                          Add First Record
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Enhanced Evidence Section */}
            <div className="mb-6">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                {/* Evidence Header with Bulk Actions */}
                <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Camera className="text-blue-600" size={20} />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-gray-900">Evidence & Detections</h2>
                          <p className="text-sm text-gray-600 mt-1">AI-powered surveillance evidence with comprehensive management</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {selectedEvidenceItems.length > 0 && (
                        <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-lg">
                          <span className="text-sm font-medium text-blue-700">
                            {selectedEvidenceItems.length} selected
                          </span>
                          <button
                            onClick={deleteSelectedEvidence}
                            className="text-sm text-red-600 hover:text-red-800 font-medium"
                          >
                            Delete Selected
                          </button>
                        </div>
                      )}
                      <button
                        onClick={() => setShowFullEvidenceModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        <Maximize2 size={16} />
                        Full View
                      </button>
                    </div>
                  </div>
                </div>

                {/* Evidence Search & Controls */}
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <form onSubmit={handleEvidenceSearch} className="flex-1 max-w-md">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="text"
                          placeholder="Search evidence by name, camera, district..."
                          value={evidenceSearch}
                          onChange={(e) => setEvidenceSearch(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                        />
                        <button
                          type="submit"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-800"
                        >
                          <Search size={16} />
                        </button>
                      </div>
                    </form>
                    
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">View:</span>
                        <button
                          onClick={() => setEvidenceView('grid')}
                          className={`p-2 rounded-lg transition-colors ${evidenceView === 'grid' ? 'bg-white shadow border border-gray-300 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                          <Grid size={16} />
                        </button>
                        <button
                          onClick={() => setEvidenceView('timeline')}
                          className={`p-2 rounded-lg transition-colors ${evidenceView === 'timeline' ? 'bg-white shadow border border-gray-300 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                          <List size={16} />
                        </button>
                      </div>
                      <button
                        onClick={exportEvidenceToCSV}
                        className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
                      >
                        <DownloadCloud size={16} />
                        Export
                      </button>
                    </div>
                  </div>
                </div>

                {/* Evidence Content */}
                <div className="p-6">
                  {/* Evidence Statistics */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Total Evidence</p>
                          <p className="text-2xl font-bold text-gray-900">{filteredDetections.length}</p>
                        </div>
                        <Database className="text-blue-500" size={24} />
                      </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">High Confidence</p>
                          <p className="text-2xl font-bold text-gray-900">{filteredDetections.filter(d => d.confidence >= 90).length}</p>
                        </div>
                        <CheckCircle className="text-green-500" size={24} />
                      </div>
                    </div>
                    <div className="bg-amber-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Active Cameras</p>
                          <p className="text-2xl font-bold text-gray-900">{cameraNumbers.length}</p>
                        </div>
                        <Camera className="text-amber-500" size={24} />
                      </div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Today's Alerts</p>
                          <p className="text-2xl font-bold text-gray-900">{todayDetections.length}</p>
                        </div>
                        <Zap className="text-purple-500" size={24} />
                      </div>
                    </div>
                  </div>

                  {/* Evidence Items */}
                  <AnimatePresence mode="wait">
                    {filteredDetections.length > 0 ? (
                      <div>
                        {/* Bulk Actions Bar */}
                        <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={selectedEvidenceItems.length === paginatedDetections.length && paginatedDetections.length > 0}
                                onChange={selectAllEvidence}
                                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                              />
                              <label className="ml-2 text-sm text-gray-700">Select All</label>
                            </div>
                            {selectedEvidenceItems.length > 0 && (
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">
                                  {selectedEvidenceItems.length} items selected
                                </span>
                                <button
                                  onClick={deleteSelectedEvidence}
                                  className="text-sm text-red-600 hover:text-red-800 font-medium"
                                >
                                  Delete Selected
                                </button>
                              </div>
                            )}
                          </div>
                          <div className="text-sm text-gray-600">
                            Showing {(evidencePage - 1) * evidencePerPage + 1} - {Math.min(evidencePage * evidencePerPage, filteredDetections.length)} of {filteredDetections.length}
                          </div>
                        </div>

                        {/* Evidence Grid/List */}
                        {evidenceView === 'grid' ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {paginatedDetections.map((detection, index) => (
                              <EnhancedEvidenceCard
                                key={detection._id}
                                detection={detection}
                                index={index}
                                isSelected={selectedEvidenceItems.includes(detection._id)}
                                onSelect={() => toggleSelectEvidence(detection._id)}
                                onView={() => handleViewEvidence(detection)}
                                onDelete={() => handleDeleteDetection(detection._id)}
                              />
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {paginatedDetections.map((detection, index) => (
                              <EnhancedTimelineEvidenceItem
                                key={detection._id}
                                detection={detection}
                                index={index}
                                isSelected={selectedEvidenceItems.includes(detection._id)}
                                onSelect={() => toggleSelectEvidence(detection._id)}
                                onView={() => handleViewEvidence(detection)}
                              />
                            ))}
                          </div>
                        )}

                        {/* Pagination */}
                        {totalEvidencePages > 1 && (
                          <div className="flex justify-center items-center gap-2 mt-6">
                            <button
                              onClick={() => setEvidencePage(prev => Math.max(prev - 1, 1))}
                              disabled={evidencePage === 1}
                              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Previous
                            </button>
                            {Array.from({ length: Math.min(5, totalEvidencePages) }, (_, i) => {
                              let pageNum;
                              if (totalEvidencePages <= 5) {
                                pageNum = i + 1;
                              } else if (evidencePage <= 3) {
                                pageNum = i + 1;
                              } else if (evidencePage >= totalEvidencePages - 2) {
                                pageNum = totalEvidencePages - 4 + i;
                              } else {
                                pageNum = evidencePage - 2 + i;
                              }
                              
                              return (
                                <button
                                  key={pageNum}
                                  onClick={() => setEvidencePage(pageNum)}
                                  className={`px-3 py-2 border rounded-lg ${
                                    evidencePage === pageNum
                                      ? 'bg-blue-600 text-white border-blue-600'
                                      : 'border-gray-300 hover:bg-gray-50'
                                  }`}
                                >
                                  {pageNum}
                                </button>
                              );
                            })}
                            <button
                              onClick={() => setEvidencePage(prev => Math.min(prev + 1, totalEvidencePages))}
                              disabled={evidencePage === totalEvidencePages}
                              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Next
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-12 text-center"
                      >
                        <Camera className="text-gray-400 mx-auto mb-4" size={48} />
                        <h3 className="text-lg font-semibold text-gray-600 mb-2">No evidence found</h3>
                        <p className="text-gray-500 mb-4">
                          {evidenceSearch 
                            ? 'No evidence matches your search criteria' 
                            : 'No surveillance evidence available'}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>

      {/* Add/Edit Record Modal */}
      <AnimatePresence>
        {showAddModal && (
          <AddRecordModal 
            item={selectedItem}
            onClose={() => {
              setShowAddModal(false);
              setSelectedItem(null);
            }}
            onSubmit={selectedItem ? 
              (formData, imageFile) => handleUpdateCrmDetail(selectedItem._id, formData, imageFile) : 
              handleAddCrmDetail}
            uploading={refreshing}
            isEdit={!!selectedItem}
          />
        )}
      </AnimatePresence>

      {/* Evidence Detail Modal */}
      <AnimatePresence>
        {showEvidenceModal && selectedEvidence && (
          <EvidenceDetailModal 
            evidence={selectedEvidence}
            onClose={() => {
              setShowEvidenceModal(false);
              setSelectedEvidence(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* Full Evidence View Modal */}
      <AnimatePresence>
        {showFullEvidenceModal && (
          <FullEvidenceModal
            detections={filteredDetections}
            onClose={() => setShowFullEvidenceModal(false)}
            onViewEvidence={handleViewEvidence}
          />
        )}
      </AnimatePresence>

      {/* Detail View Modal */}
      <AnimatePresence>
        {showDetailModal && selectedItem && (
          <DetailModal 
            item={selectedItem} 
            onClose={() => setShowDetailModal(false)}
            onEdit={() => {
              setShowDetailModal(false);
              setShowAddModal(true);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// Enhanced Stat Card Component
function StatCard({ title, value, icon, color, trend, trendUp, description }) {
  return (
    <div className={`${color} p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-white`}>
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
          {icon}
        </div>
        {trend && (
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${trendUp ? 'bg-green-500/30 text-green-100' : 'bg-amber-500/30 text-amber-100'}`}>
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className="text-2xl lg:text-3xl font-bold mb-1">{value}</p>
        <p className="text-white/90 font-medium mb-1">{title}</p>
        {description && (
          <p className="text-white/70 text-xs">{description}</p>
        )}
      </div>
    </div>
  );
}

// CRM Card Component
function CrmCard({ item, index, onView, onDelete, onEdit }) {
  const statusColors = {
    criminal: 'bg-gradient-to-r from-red-500 to-red-600',
    missing: 'bg-gradient-to-r from-amber-500 to-amber-600',
  };

  const statusIcons = {
    criminal: <ShieldAlert size={12} />,
    missing: <Users size={12} />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
    >
      {/* Image with gradient overlay */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
        <img
          src={item.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${item.name}&backgroundColor=b6e3f4`}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90"
          onError={(e) => {
            e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${item.name}&backgroundColor=b6e3f4`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-white ${statusColors[item.status] || 'bg-gray-700'}`}>
            {statusIcons[item.status]}
            {item.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : 'Unknown'}
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="p-5">
        <div className="mb-4">
          <h3 className="font-bold text-gray-900 text-lg truncate mb-1">{item.name}</h3>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700 bg-gray-100 px-2 py-0.5 rounded">
              {item.age} years
            </span>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <MapPin size={12} />
              {item.district}
            </span>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div>
            <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
              <Calendar size={12} />
              Last Seen
            </p>
            <p className="text-sm font-medium text-gray-900">
              {item.lastSeen ? new Date(item.lastSeen).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              }) : 'Unknown'}
            </p>
          </div>
          {item.additionalDetails && (
            <div>
              <p className="text-xs text-gray-500 mb-1">Case Notes</p>
              <p className="text-sm text-gray-700 line-clamp-2">{item.additionalDetails}</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center border-t border-gray-100 pt-4">
          <button
            onClick={onView}
            className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 group-hover:gap-3 transition-all"
          >
            <Eye size={16} />
            View Details
          </button>
          <div className="flex items-center gap-1">
            <button
              onClick={onEdit}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Edit Record"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete Record"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Enhanced Evidence Card Component
function EnhancedEvidenceCard({ detection, index, isSelected, onSelect, onView, onDelete }) {
  const formatTime = (dateString) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const confidenceColor = detection.confidence >= 90 ? 'bg-green-100 text-green-800 border-green-200' :
                        detection.confidence >= 75 ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                        'bg-red-100 text-red-800 border-red-200';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group relative"
    >
      {/* Selection Checkbox */}
      <div className="absolute top-3 left-3 z-10">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
        />
      </div>

      {/* Evidence Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
        <img
          src={detection.thumbnail || detection.evidenceImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${detection.criminal_name}&backgroundColor=b6e3f4`}
          alt={`Evidence of ${detection.criminal_name}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${detection.criminal_name}&backgroundColor=b6e3f4`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
        
        {/* Camera Badge */}
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-black/80 text-white text-xs font-bold">
            <Camera size={10} />
            Cam #{detection.camera_id || 'N/A'}
          </span>
        </div>
        
        {/* Confidence Badge */}
        <div className="absolute bottom-3 right-3">
          <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold border ${confidenceColor}`}>
            <Target size={10} />
            {detection.confidence ? `${detection.confidence.toFixed(0)}%` : 'N/A'}
          </span>
        </div>
        
        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
          <button
            onClick={onView}
            className="p-3 bg-white/90 rounded-full hover:bg-white transition-colors"
          >
            <Maximize2 size={20} className="text-gray-800" />
          </button>
        </div>
      </div>

      {/* Evidence Details */}
      <div className="p-4">
        <div className="mb-3">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-gray-900 truncate text-sm">
                {detection.criminal_name || 'Unknown Subject'}
              </h4>
              <p className="text-xs text-gray-500 mt-0.5">
                {formatTime(detection.timestamp)} • {formatDate(detection.timestamp)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
              <MapPin size={10} />
              {detection.district || 'Unknown'}
            </span>
            <span className="text-xs text-gray-500 truncate">
              ID: {detection._id?.slice(-8) || 'N/A'}
            </span>
          </div>
        </div>

        {/* Confidence Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Match Confidence</span>
            <span className="font-semibold">{detection.confidence ? `${detection.confidence.toFixed(1)}%` : 'N/A'}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${detection.confidence >= 90 ? 'bg-green-500' : detection.confidence >= 75 ? 'bg-yellow-500' : 'bg-red-500'}`}
              style={{ width: `${detection.confidence || 0}%` }}
            ></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center border-t border-gray-100 pt-3">
          <button
            onClick={onView}
            className="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-800"
          >
            <Eye size={12} />
            Details
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {/* Share functionality */}}
              className="text-gray-400 hover:text-blue-600 p-1"
              title="Share"
            >
              <Share2 size={12} />
            </button>
            <button
              onClick={() => {/* Download functionality */}}
              className="text-gray-400 hover:text-green-600 p-1"
              title="Download"
            >
              <Download size={12} />
            </button>
            <button
              onClick={onDelete}
              className="text-gray-400 hover:text-red-600 p-1"
              title="Delete"
            >
              <Trash2 size={12} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Enhanced Timeline Evidence Item
function EnhancedTimelineEvidenceItem({ detection, index, isSelected, onSelect, onView }) {
  const formatTime = (dateString) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const confidenceColor = detection.confidence >= 90 ? 'bg-green-500' :
                        detection.confidence >= 75 ? 'bg-yellow-500' :
                        'bg-red-500';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all duration-300 group"
    >
      {/* Selection Checkbox */}
      <div className="flex items-start pt-1">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
        />
      </div>

      {/* Timeline Dot */}
      <div className="relative flex flex-col items-center pt-1">
        <div className={`w-3 h-3 rounded-full ${confidenceColor} z-10`}></div>
        <div className="w-px h-full bg-gray-300 absolute top-4"></div>
      </div>

      {/* Evidence Thumbnail */}
      <div className="flex-shrink-0 relative">
        <img
          src={detection.thumbnail || detection.evidenceImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${detection.criminal_name}&backgroundColor=b6e3f4`}
          alt={`Evidence of ${detection.criminal_name}`}
          className="w-20 h-20 object-cover rounded-lg border border-gray-300 group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${detection.criminal_name}&backgroundColor=b6e3f4`;
          }}
        />
        <div className="absolute bottom-1 right-1">
          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-black/70 text-white text-xs">
            <Camera size={8} />
            #{detection.camera_id}
          </span>
        </div>
      </div>

      {/* Evidence Details */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h4 className="font-semibold text-gray-900 text-sm truncate">
              {detection.criminal_name || 'Unknown Subject'}
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center gap-1 text-xs text-gray-600">
                <MapPin size={12} />
                {detection.district || 'Unknown'}
              </span>
              <span className="text-xs text-gray-500">•</span>
              <span className="text-xs text-gray-500">
                {formatTime(detection.timestamp)}
              </span>
            </div>
          </div>
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
            detection.confidence >= 90 ? 'bg-green-100 text-green-800' :
            detection.confidence >= 75 ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {detection.confidence ? `${detection.confidence.toFixed(0)}%` : 'N/A'}
          </span>
        </div>
        
        <div className="flex items-center gap-4 mb-3">
          <div className="flex-1">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Confidence Score</span>
              <span className="font-medium">{detection.confidence ? `${detection.confidence.toFixed(1)}%` : 'N/A'}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className={`h-1.5 rounded-full ${confidenceColor}`}
                style={{ width: `${detection.confidence || 0}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500">
            {formatDate(detection.timestamp)}
          </span>
          <span className="text-xs text-gray-400">•</span>
          <span className="text-xs text-gray-500 font-mono">
            ID: {detection._id?.slice(-6) || 'N/A'}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2">
        <button
          onClick={onView}
          className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium flex items-center gap-1.5"
        >
          <Eye size={12} />
          View
        </button>
        <button
          onClick={() => {/* Quick actions */}}
          className="px-3 py-1.5 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm"
        >
          Actions
        </button>
      </div>
    </motion.div>
  );
}

// Evidence Detail Modal Component
function EvidenceDetailModal({ evidence, onClose }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const confidenceLevel = evidence.confidence >= 90 ? 'High' :
                        evidence.confidence >= 75 ? 'Medium' :
                        'Low';

  const confidenceColor = evidence.confidence >= 90 ? 'text-green-600 bg-green-50' :
                        evidence.confidence >= 75 ? 'text-yellow-600 bg-yellow-50' :
                        'text-red-600 bg-red-50';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Evidence Analysis Report</h2>
            <p className="text-gray-600 text-sm">AI-powered forensic analysis and match verification</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium flex items-center gap-2">
              <Printer size={16} />
              Print
            </button>
            <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium flex items-center gap-2">
              <Share2 size={16} />
              Share
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Evidence Image */}
            <div className="lg:col-span-2">
              <div className="bg-gray-900 rounded-xl overflow-hidden mb-6">
                <img
                  src={evidence.evidenceImage || evidence.imageUrl || evidence.image}
                  alt={`Evidence of ${evidence.criminal_name}`}
                  className="w-full h-96 object-contain bg-black"
                  onError={(e) => {
                    e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${evidence.criminal_name}&backgroundColor=b6e3f4`;
                  }}
                />
              </div>
              
              {/* Technical Metadata */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Camera Source</p>
                  <p className="font-bold text-lg text-blue-700 flex items-center gap-2">
                    <Camera size={16} />
                    #{evidence.camera_id || 'N/A'}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Detection Time</p>
                  <p className="font-bold text-lg text-green-700 flex items-center gap-2">
                    <Clock size={16} />
                    {formatTime(evidence.timestamp)}
                  </p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Detection Date</p>
                  <p className="font-bold text-lg text-amber-700">
                    {formatDate(evidence.timestamp).split(',')[0]}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Evidence ID</p>
                  <p className="font-bold text-lg text-purple-700 font-mono text-sm truncate">
                    {evidence._id?.slice(-12)}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Analysis */}
            <div className="lg:col-span-1 space-y-6">
              {/* Subject Info */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-xl border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">
                  <User size={18} />
                  Subject Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Matched Individual</p>
                    <p className="font-bold text-xl text-gray-900 truncate">{evidence.criminal_name || 'Unknown'}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">District</p>
                      <p className="font-semibold text-gray-900 flex items-center gap-1">
                        <MapPin size={14} />
                        {evidence.district || 'Unknown'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Detection ID</p>
                      <p className="font-medium text-gray-900 font-mono text-xs">{evidence.detection_id || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Confidence Analysis */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-200">
                <h3 className="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">
                  <Target size={18} />
                  AI Match Analysis
                </h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${confidenceColor} font-semibold mb-2`}>
                      <span className="text-2xl">{evidence.confidence ? `${evidence.confidence.toFixed(0)}%` : 'N/A'}</span>
                      <span>Confidence</span>
                    </div>
                    <p className="text-sm text-gray-600">{confidenceLevel} confidence match</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm text-gray-700 mb-1">
                      <span>Confidence Score</span>
                      <span className="font-semibold">{evidence.confidence ? `${evidence.confidence.toFixed(1)}%` : 'N/A'}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${evidence.confidence >= 90 ? 'bg-green-500' : evidence.confidence >= 75 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${evidence.confidence || 0}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      {evidence.confidence >= 90 ? (
                        <>
                          <CheckCircle className="text-green-500" size={16} />
                          <span className="text-gray-700">High confidence - Immediate action recommended</span>
                        </>
                      ) : evidence.confidence >= 75 ? (
                        <>
                          <AlertCircle className="text-yellow-500" size={16} />
                          <span className="text-gray-700">Moderate confidence - Verification required</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="text-red-500" size={16} />
                          <span className="text-gray-700">Low confidence - Manual review needed</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="bg-gray-50 p-5 rounded-xl">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="px-3 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                    <Download size={16} />
                    Download
                  </button>
                  <button className="px-3 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                    <Link size={16} />
                    Copy Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Full Evidence View Modal
function FullEvidenceModal({ detections, onClose, onViewEvidence }) {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('latest');

  const filteredDetections = detections.filter(det => {
    if (selectedFilter === 'high') return det.confidence >= 90;
    if (selectedFilter === 'medium') return det.confidence >= 75 && det.confidence < 90;
    if (selectedFilter === 'low') return det.confidence < 75;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'latest') return new Date(b.timestamp) - new Date(a.timestamp);
    if (sortBy === 'oldest') return new Date(a.timestamp) - new Date(b.timestamp);
    if (sortBy === 'confidence') return (b.confidence || 0) - (a.confidence || 0);
    return 0;
  });

  const stats = {
    total: detections.length,
    high: detections.filter(d => d.confidence >= 90).length,
    medium: detections.filter(d => d.confidence >= 75 && d.confidence < 90).length,
    low: detections.filter(d => d.confidence < 75).length,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Evidence Management Console</h2>
              <p className="text-gray-600 text-sm">Comprehensive evidence viewing and management</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          {/* Stats Bar */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Total Evidence</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">High Confidence</p>
              <p className="text-2xl font-bold text-gray-900">{stats.high}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Medium Confidence</p>
              <p className="text-2xl font-bold text-gray-900">{stats.medium}</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Low Confidence</p>
              <p className="text-2xl font-bold text-gray-900">{stats.low}</p>
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Filter:</span>
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="all">All Evidence</option>
                  <option value="high">High Confidence (≥90%)</option>
                  <option value="medium">Medium Confidence (75-89%)</option>
                  <option value="low">Low Confidence (&lt;75%)</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="latest">Latest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="confidence">Highest Confidence</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {filteredDetections.length > 0 ? (
            <div>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredDetections.map((detection, index) => (
                    <div
                      key={detection._id}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => onViewEvidence(detection)}
                    >
                      <div className="relative h-40">
                        <img
                          src={detection.thumbnail || detection.evidenceImage}
                          alt="Evidence"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${detection.criminal_name}&backgroundColor=b6e3f4`;
                          }}
                        />
                        <div className="absolute bottom-2 right-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                            detection.confidence >= 90 ? 'bg-green-100 text-green-800' :
                            detection.confidence >= 75 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {detection.confidence ? `${detection.confidence.toFixed(0)}%` : 'N/A'}
                          </span>
                        </div>
                      </div>
                      <div className="p-3">
                        <h4 className="font-semibold text-sm truncate">{detection.criminal_name}</h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(detection.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredDetections.map((detection, index) => (
                    <div
                      key={detection._id}
                      className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => onViewEvidence(detection)}
                    >
                      <img
                        src={detection.thumbnail || detection.evidenceImage}
                        alt="Evidence"
                        className="w-16 h-16 object-cover rounded"
                        onError={(e) => {
                          e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${detection.criminal_name}&backgroundColor=b6e3f4`;
                        }}
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{detection.criminal_name}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                          <span>Camera #{detection.camera_id}</span>
                          <span>•</span>
                          <span>{new Date(detection.timestamp).toLocaleString()}</span>
                          <span>•</span>
                          <span>{detection.district}</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                        detection.confidence >= 90 ? 'bg-green-100 text-green-800' :
                        detection.confidence >= 75 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {detection.confidence ? `${detection.confidence.toFixed(0)}%` : 'N/A'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <Camera className="text-gray-400 mx-auto mb-4" size={48} />
              <h3 className="text-lg font-semibold text-gray-600">No evidence found</h3>
              <p className="text-gray-500">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// AddRecordModal Component (Keep as is from original)
function AddRecordModal({ item, onClose, onSubmit, uploading, isEdit = false }) {
  const [formData, setFormData] = useState({
    name: item?.name || '',
    age: item?.age || '',
    lastSeen: item?.lastSeen ? new Date(item.lastSeen).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    district: item?.district || '',
    status: item?.status || 'criminal',
    additionalDetails: item?.additionalDetails || ''
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(item?.image || null);
  const [imageError, setImageError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setImageError('Please upload a valid image file (JPEG, PNG, or WebP)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setImageError('Image size should be less than 5MB');
      return;
    }

    setImageFile(file);
    setImageError('');

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isEdit && !imageFile) {
      setImageError('Please upload an image');
      return;
    }

    try {
      const success = await onSubmit(formData, imageFile);
      if (success) {
        onClose();
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      alert(`Error: ${err.message}`);
    }
  };

  const tamilNaduDistricts = [
    "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem",
    "Erode", "Tirunelveli", "Vellore", "Thoothukudi", "Dindigul",
    "Kanchipuram", "Tiruvallur", "Chengalpattu", "Villupuram", "Krishnagiri",
    "Dharmapuri", "Kanyakumari", "Theni", "Nagapattinam", "Ramanathapuram",
    "Sivaganga", "Pudukkottai", "Karur", "Perambalur", "Ariyalur",
    "Cuddalore", "Kallakurichi", "Tirupathur", "Tenkasi", "Ranipet"
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {isEdit ? 'Edit Police Record' : 'Add New Police Record'}
            </h2>
            <p className="text-gray-600 text-sm">Tamil Nadu Police Database</p>
          </div>
          <button
            onClick={onClose}
            disabled={uploading}
            className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - Image Upload */}
            <div className="md:col-span-1">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isEdit ? 'Update Photo (Optional)' : 'Upload Photo *'}
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 transition-colors">
                    <div className="space-y-1 text-center">
                      {imagePreview ? (
                        <div className="relative">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="mx-auto h-48 w-48 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setImageFile(null);
                              setImagePreview(null);
                            }}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                            disabled={uploading}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                              <span>{isEdit ? 'Update file' : 'Upload a file'}</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="sr-only"
                                required={!isEdit}
                                disabled={uploading}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, WebP up to 5MB
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  {imageError && (
                    <p className="mt-1 text-sm text-red-600">{imageError}</p>
                  )}
                  {!isEdit && !imageFile && (
                    <p className="mt-1 text-xs text-red-600">Image is required for new records</p>
                  )}
                </div>

                {/* Record Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Record Type *
                  </label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, status: 'criminal'})}
                      disabled={uploading}
                      className={`flex-1 py-3 px-4 rounded-lg border transition-all disabled:opacity-50 ${
                        formData.status === 'criminal'
                          ? 'border-red-500 bg-red-50 text-red-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      Criminal Record
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, status: 'missing'})}
                      disabled={uploading}
                      className={`flex-1 py-3 px-4 rounded-lg border transition-all disabled:opacity-50 ${
                        formData.status === 'missing'
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      Missing Person
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form Fields */}
            <div className="md:col-span-1 space-y-4">
              {/* Basic Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:opacity-50"
                  placeholder="Enter full name"
                  disabled={uploading}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="120"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:opacity-50"
                    placeholder="Enter age"
                    disabled={uploading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Seen Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.lastSeen}
                    onChange={(e) => setFormData({...formData, lastSeen: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:opacity-50"
                    disabled={uploading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  District *
                </label>
                <select
                  required
                  value={formData.district}
                  onChange={(e) => setFormData({...formData, district: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:opacity-50"
                  disabled={uploading}
                >
                  <option value="">Select District</option>
                  {tamilNaduDistricts.map(district => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>

              {/* Additional Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Details
                </label>
                <textarea
                  value={formData.additionalDetails}
                  onChange={(e) => setFormData({...formData, additionalDetails: e.target.value})}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:opacity-50"
                  placeholder="Enter additional details, last known location, description, etc."
                  disabled={uploading}
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium disabled:opacity-50"
              disabled={uploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading || (!isEdit && !imageFile)}
              className={`px-4 py-2 bg-blue-600 text-white rounded-lg transition-colors text-sm font-medium flex items-center gap-2 ${
                uploading || (!isEdit && !imageFile) ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
            >
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  {isEdit ? 'Updating...' : 'Adding...'}
                </>
              ) : (
                isEdit ? 'Update Record' : 'Add to Police Database'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

// Detail Modal Component (Keep as is from original)
function DetailModal({ item, onClose, onEdit }) {
  const statusColors = {
    criminal: 'bg-red-100 text-red-700',
    missing: 'bg-amber-100 text-amber-700',
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Police Record Details</h2>
            <p className="text-gray-600 text-sm">Tamil Nadu Police Database</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onEdit}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <Edit size={16} />
              Edit
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-1">
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <img
                  src={item.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${item.name}&backgroundColor=b6e3f4`}
                  alt={item.name}
                  className="w-full h-64 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${item.name}&backgroundColor=b6e3f4`;
                  }}
                />
              </div>
              
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-3">Record Information</h3>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-gray-600">Created:</span>
                      <p className="font-medium text-gray-900">
                        {formatDate(item.createdAt)}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Updated:</span>
                      <p className="font-medium text-gray-900">
                        {formatDate(item.updatedAt)}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Database ID:</span>
                      <p className="font-medium text-gray-900 font-mono text-xs truncate">{item._id}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-gray-900">{item.name}</h1>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[item.status] || 'bg-gray-100 text-gray-700'}`}>
                    {item.status ? item.status.toUpperCase() : 'UNKNOWN'}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-gray-600">{item.age} years old</span>
                  <span className="text-gray-600">•</span>
                  <span className="text-gray-600">{item.district} District</span>
                </div>
              </div>

              <div className="space-y-6">
                {/* Case Details */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Case Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-600">Last Seen:</span>
                      <p className="font-medium text-lg">
                        {item.lastSeen ? new Date(item.lastSeen).toLocaleDateString('en-IN', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : 'Unknown'}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">District:</span>
                      <p className="font-medium text-lg">{item.district}</p>
                    </div>
                  </div>
                </div>

                {/* Additional Details */}
                {item.additionalDetails && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-3">Additional Details</h3>
                    <p className="text-gray-700 whitespace-pre-wrap">{item.additionalDetails}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default CriminalPage;
