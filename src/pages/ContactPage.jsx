

// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import DashboardLayout from '../components/DashboardLayout';
// import Navbar from '../components/Navbar';
// import { Pie, Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title
// } from 'chart.js';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import Select from 'react-select';

// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title
// );

// const TrafficViolationDashboard = () => {
//   const [statsData, setStatsData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [totalViolations, setTotalViolations] = useState(0);
//   const [violationTypes, setViolationTypes] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [timeAnalysis, setTimeAnalysis] = useState({});
//   const [violationImages, setViolationImages] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(20);
//   const [isDeleting, setIsDeleting] = useState(false);

//   // Filter states
//   const [dateRange, setDateRange] = useState([null, null]);
//   const [startDate, endDate] = dateRange;
//   const [timeRange, setTimeRange] = useState([0, 23]);
//   const [startHour, endHour] = timeRange;
//   const [selectedViolation, setSelectedViolation] = useState(null);

//   // Professional color palette for each violation type
//   const VIOLATION_COLORS = {
//     'No Helmet': {
//       primary: '#EF4444',
//       secondary: '#FEE2E2'
//     },
//     'Phone Usage': {
//       primary: '#3B82F6',
//       secondary: '#DBEAFE'
//     },
//     'Triple Riding': {
//       primary: '#F59E0B',
//       secondary: '#FEF3C7'
//     },
//     'Wrong Way': {
//       primary: '#10B981',
//       secondary: '#D1FAE5'
//     },
//     'No Helmet + Phone Usage': {
//       primary: '#8B5CF6',
//       secondary: '#EDE9FE'
//     },
//     'No Helmet + Triple Riding': {
//       primary: '#EC4899',
//       secondary: '#FCE7F3'
//     },
//     'Phone Usage + Triple Riding': {
//       primary: '#14B8A6',
//       secondary: '#CCFBF1'
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   useEffect(() => {
//     applyFilters();
//   }, [dateRange, timeRange, selectedViolation, statsData]);

//   const fetchData = async () => {
//     try {
//       setIsLoading(true);
//       const response = await fetch('http://localhost:5000/api/violations/all');
//       const data = await response.json();

//       if (response.ok) {
//         setStatsData(data);
//         setFilteredData(data);
//         processViolationData(data);
//         analyzeTimeData(data);
//         setViolationImages(data.map(v => ({
//           imageUrl: v.imageUrl,
//           type: getViolationType(v),
//           time: new Date(v.analyzedAt).toLocaleString(),
//           id: v._id,
//           analyzedAt: v.analyzedAt
//         })));
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const applyFilters = () => {
//     let filtered = [...statsData];

//     // Apply date filter
//     if (startDate && endDate) {
//       filtered = filtered.filter(item => {
//         const itemDate = new Date(item.analyzedAt);
//         return itemDate >= startDate && itemDate <= endDate;
//       });
//     }

//     // Apply time filter
//     filtered = filtered.filter(item => {
//       const itemHour = new Date(item.analyzedAt).getHours();
//       return itemHour >= startHour && itemHour <= endHour;
//     });

//     // Apply violation type filter
//     if (selectedViolation) {
//       filtered = filtered.filter(item => {
//         const violations = [];
//         if (item.noHelmet) violations.push('No Helmet');
//         if (item.phoneUsage) violations.push('Phone Usage');
//         if (item.tripling) violations.push('Triple Riding');
//         if (item.wrongway) violations.push('Wrong Way');
        
//         if (selectedViolation.includes('+')) {
//           const requiredViolations = selectedViolation.split(' + ');
//           return requiredViolations.every(v => violations.includes(v));
//         }
//         return violations.includes(selectedViolation);
//       });
//     }

//     setFilteredData(filtered);
//     processViolationData(filtered);
//     analyzeTimeData(filtered);
    
//     // Update images with filtered data
//     setViolationImages(filtered.map(v => ({
//       imageUrl: v.imageUrl,
//       type: getViolationType(v),
//       time: new Date(v.analyzedAt).toLocaleString(),
//       id: v._id,
//       analyzedAt: v.analyzedAt
//     })));
    
//     // Reset to first page when filters change
//     setCurrentPage(1);
//   };

//   const getViolationType = (item) => {
//     const types = [];
//     if (item.noHelmet) types.push('No Helmet');
//     if (item.phoneUsage) types.push('Phone Usage');
//     if (item.tripling) types.push('Triple Riding');
//     if (item.wrongway) types.push('Wrong Way');
//     return types.length > 0 ? types.join(' + ') : 'None';
//   };

//   const processViolationData = (data) => {
//     const counts = {};
    
//     data.forEach(item => {
//       const violations = [];
//       if (item.noHelmet) violations.push('No Helmet');
//       if (item.phoneUsage) violations.push('Phone Usage');
//       if (item.tripling) violations.push('Triple Riding');
//       if (item.wrongway) violations.push('Wrong Way');

//       // Count individual violations
//       violations.forEach(v => {
//         counts[v] = (counts[v] || 0) + 1;
//       });

//       // Count combinations if more than one violation
//       if (violations.length > 1) {
//         const comboKey = violations.join(' + ');
//         counts[comboKey] = (counts[comboKey] || 0) + 1;
//       }
//     });

//     // Convert to array and assign colors
//     const violationData = Object.keys(counts).map(key => ({
//       name: key,
//       value: counts[key],
//       color: VIOLATION_COLORS[key] || {
//         primary: '#64748B',
//         secondary: '#F1F5F9'
//       }
//     }));

//     // Sort by count (descending)
//     violationData.sort((a, b) => b.value - a.value);
    
//     setViolationTypes(violationData);
//     setTotalViolations(data.length);
//   };

//   const analyzeTimeData = (data) => {
//     const hourlyCounts = Array(24).fill(0);
//     const dailyCounts = Array(7).fill(0);

//     data.forEach(violation => {
//       const date = new Date(violation.analyzedAt);
//       const hour = date.getHours();
//       const day = date.getDay();

//       hourlyCounts[hour]++;
//       dailyCounts[day]++;
//     });

//     setTimeAnalysis({
//       hourly: hourlyCounts,
//       daily: dailyCounts,
//       peakHour: hourlyCounts.indexOf(Math.max(...hourlyCounts)),
//       peakDay: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][
//         dailyCounts.indexOf(Math.max(...dailyCounts))
//       ]
//     });
//   };

//   const handleDeleteImage = async (imageId) => {
//     if (isDeleting) return;
    
//     try {
//       setIsDeleting(true);
//       const response = await fetch(`http://localhost:5000/api/violations/${imageId}`, {
//         method: 'DELETE',
//       });

//       if (response.ok) {
//         setViolationImages(violationImages.filter(img => img.id !== imageId));
//         fetchData();
//       } else {
//         console.error('Failed to delete image');
//       }
//     } catch (error) {
//       console.error('Error deleting image:', error);
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   // Prepare violation options for select dropdown
//   const violationOptions = [
//     { value: null, label: 'All Violation Types' },
//     ...violationTypes.map(item => ({
//       value: item.name,
//       label: item.name
//     }))
//   ];

//   // Time range slider marks
//   const timeMarks = {
//     0: '12 AM',
//     6: '6 AM',
//     12: '12 PM',
//     18: '6 PM',
//     23: '11 PM'
//   };

//   // Pagination
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentImages = violationImages.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(violationImages.length / itemsPerPage);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const percentages = violationTypes.reduce((acc, item) => {
//     acc[item.name] = totalViolations > 0 ? ((item.value / totalViolations) * 100).toFixed(1) : 0;
//     return acc;
//   }, {});

//   const pieChartData = {
//     labels: violationTypes.map(item => item.name),
//     datasets: [
//       {
//         data: violationTypes.map(item => item.value),
//         backgroundColor: violationTypes.map(item => item.color.primary),
//         borderColor: '#ffffff',
//         borderWidth: 2,
//       },
//     ],
//   };

//   const timeChartData = {
//     labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
//     datasets: [
//       {
//         label: 'Violations by Hour',
//         data: timeAnalysis.hourly || [],
//         backgroundColor: 'rgba(59, 130, 246, 0.1)',
//         borderColor: VIOLATION_COLORS['Phone Usage'].primary,
//         borderWidth: 2,
//         tension: 0.3,
//         fill: true,
//         pointBackgroundColor: '#ffffff',
//         pointBorderColor: VIOLATION_COLORS['Phone Usage'].primary,
//         pointBorderWidth: 2
//       },
//     ],
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-50">
//         <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <DashboardLayout>
//         <div className="min-h-screen w-full bg-gray-50 p-6">
//           <div className="max-w-7xl mx-auto">
//             <motion.header 
//               className="mb-8 text-center" 
//               initial={{ opacity: 0, y: -20 }} 
//               animate={{ opacity: 1, y: 0 }} 
//               transition={{ duration: 0.5 }}
//             >
//               <h1 className="text-3xl font-bold text-gray-800 mb-2">Traffic Violation Report</h1>
//               <p className="text-lg text-gray-600">Complete record of all traffic violations</p>
//             </motion.header>

//             {/* Filter Section */}
//             <motion.section 
//               className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//             >
//               <h2 className="text-xl font-semibold mb-4">Filter Violations</h2>
              
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {/* Date Range Picker */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
//                   <DatePicker
//                     selectsRange={true}
//                     startDate={startDate}
//                     endDate={endDate}
//                     onChange={(update) => setDateRange(update)}
//                     isClearable={true}
//                     placeholderText="Select date range"
//                     className="w-full p-2 border border-gray-300 rounded-md"
//                   />
//                 </div>

//                 {/* Time Range Slider */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Time Range: {startHour}:00 - {endHour}:00
//                   </label>
//                   <div className="relative py-4">
//                     <div className="absolute h-0.5 bg-gray-300 rounded-full w-full top-1/2 transform -translate-y-1/2"></div>
//                     <div 
//                       className="absolute h-2 bg-blue-600 rounded-full top-1/2 transform -translate-y-1/2"
//                       style={{ 
//                         left: `${(startHour / 23) * 100}%`, 
//                         width: `${((endHour - startHour) / 23) * 100}%` 
//                       }}
//                     ></div>
//                     <div 
//                       className="absolute w-5 h-5 bg-blue-700 rounded-full top-1/2 transform -translate-y-1/2 cursor-pointer z-20 shadow-lg"
//                       style={{ left: `calc(${(startHour / 23) * 100}% - 10px)` }}
//                       onMouseDown={(e) => {
//                         const handleMove = (moveEvent) => {
//                           const slider = e.target.closest('.relative');
//                           const rect = slider.getBoundingClientRect();
//                           const percent = Math.min(Math.max((moveEvent.clientX - rect.left) / rect.width, 0), 1);
//                           const newValue = Math.round(percent * 23);
//                           if (newValue <= endHour) {
//                             setTimeRange([newValue, endHour]);
//                           }
//                         };
//                         const handleUp = () => {
//                           document.removeEventListener('mousemove', handleMove);
//                           document.removeEventListener('mouseup', handleUp);
//                         };
//                         document.addEventListener('mousemove', handleMove);
//                         document.addEventListener('mouseup', handleUp);
//                       }}
//                     ></div>
//                     <div 
//                       className="absolute w-5 h-5 bg-blue-700 rounded-full top-1/2 transform -translate-y-1/2 cursor-pointer z-20 shadow-lg"
//                       style={{ left: `calc(${(endHour / 23) * 100}% - 10px)` }}
//                       onMouseDown={(e) => {
//                         const handleMove = (moveEvent) => {
//                           const slider = e.target.closest('.relative');
//                           const rect = slider.getBoundingClientRect();
//                           const percent = Math.min(Math.max((moveEvent.clientX - rect.left) / rect.width, 0), 1);
//                           const newValue = Math.round(percent * 23);
//                           if (newValue >= startHour) {
//                             setTimeRange([startHour, newValue]);
//                           }
//                         };
//                         const handleUp = () => {
//                           document.removeEventListener('mousemove', handleMove);
//                           document.removeEventListener('mouseup', handleUp);
//                         };
//                         document.addEventListener('mousemove', handleMove);
//                         document.addEventListener('mouseup', handleUp);
//                       }}
//                     ></div>
//                   </div>
//                   <div className="flex justify-between text-xs text-gray-600 mt-1">
//                     {Object.entries(timeMarks).map(([hour, label]) => (
//                       <span key={hour}>{label}</span>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Violation Type Selector */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Violation Type</label>
//                   <Select
//                     options={violationOptions}
//                     value={violationOptions.find(option => option.value === selectedViolation)}
//                     onChange={(selected) => setSelectedViolation(selected?.value || null)}
//                     isClearable
//                     placeholder="Select violation type"
//                     className="basic-select"
//                     classNamePrefix="select"
//                   />
//                 </div>
//               </div>
//             </motion.section>

//             {/* Summary Section */}
//             <motion.section 
//               className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ staggerChildren: 0.1 }}
//             >
//               {/* Total Violations Card */}
//               <motion.div 
//                 className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
//                 whileHover={{ y: -5 }}
//               >
//                 <div className="flex items-center mb-4">
//                   <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//                     </svg>
//                   </div>
//                   <h3 className="ml-3 text-lg font-medium text-gray-700">Total Violations</h3>
//                 </div>
//                 <p className="text-3xl font-bold text-gray-800">{totalViolations}</p>
//                 <p className="mt-2 text-sm text-gray-500">All recorded violations</p>
//               </motion.div>

//               {/* Top 3 Violation Type Cards */}
//               {violationTypes.slice(0, 3).map((item, idx) => (
//                 <motion.div 
//                   key={idx}
//                   className="p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
//                   style={{ 
//                     backgroundColor: item.color.secondary,
//                     borderTop: `4px solid ${item.color.primary}`
//                   }}
//                   whileHover={{ y: -5 }}
//                 >
//                   <div className="flex items-center mb-4">
//                     <div 
//                       className="p-3 rounded-lg text-white"
//                       style={{ backgroundColor: item.color.primary }}
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                       </svg>
//                     </div>
//                     <h3 className="ml-3 text-lg font-medium" style={{ color: item.color.primary }}>{item.name}</h3>
//                   </div>
//                   <p className="text-3xl font-bold text-gray-800">{item.value}</p>
//                   <div className="mt-2">
//                     <span className="text-sm font-medium" style={{ color: item.color.primary }}>
//                       {percentages[item.name]}% of total
//                     </span>
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.section>

//             {/* Charts Section */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
//               {/* Pie Chart */}
//               <motion.div 
//                 className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//               >
//                 <div className="flex justify-between items-center mb-4">
//                   <h2 className="text-xl font-semibold text-gray-800">Violation Distribution</h2>
//                   <span className="text-sm text-gray-500">Percentage of total</span>
//                 </div>
//                 <div className="h-80">
//                   <Pie
//                     data={pieChartData}
//                     options={{
//                       responsive: true,
//                       maintainAspectRatio: false,
//                       plugins: {
//                         legend: { 
//                           position: 'right',
//                           labels: {
//                             usePointStyle: true,
//                             padding: 20,
//                             font: {
//                               family: 'Inter, sans-serif'
//                             }
//                           }
//                         },
//                         tooltip: {
//                           callbacks: {
//                             label: function (context) {
//                               return `${context.label}: ${context.raw} (${percentages[context.label]}%)`;
//                             }
//                           },
//                           bodyFont: {
//                             family: 'Inter, sans-serif',
//                             size: 14
//                           }
//                         }
//                       },
//                       cutout: '60%'
//                     }}
//                   />
//                 </div>
//               </motion.div>

//               {/* Line Chart */}
//               <motion.div 
//                 className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//               >
//                 <div className="flex justify-between items-center mb-4">
//                   <h2 className="text-xl font-semibold text-gray-800">Hourly Violation Patterns</h2>
//                   <span className="text-sm text-gray-500">24-hour period</span>
//                 </div>
//                 <div className="h-80">
//                   <Line
//                     data={timeChartData}
//                     options={{
//                       responsive: true,
//                       maintainAspectRatio: false,
//                       plugins: { 
//                         legend: { display: false },
//                         tooltip: {
//                           bodyFont: {
//                             family: 'Inter, sans-serif',
//                             size: 14
//                           }
//                         }
//                       },
//                       scales: {
//                         y: { 
//                           beginAtZero: true, 
//                           title: { 
//                             display: true, 
//                             text: 'Number of Violations',
//                             font: {
//                               family: 'Inter, sans-serif'
//                             }
//                           },
//                           grid: {
//                             color: 'rgba(0, 0, 0, 0.05)'
//                           }
//                         },
//                         x: { 
//                           title: { 
//                             display: true, 
//                             text: 'Hour of Day',
//                             font: {
//                               family: 'Inter, sans-serif'
//                             }
//                           },
//                           grid: {
//                             display: false
//                           }
//                         }
//                       },
//                       elements: {
//                         line: {
//                           tension: 0.4
//                         }
//                       }
//                     }}
//                   />
//                 </div>
//               </motion.div>
//             </div>
            
//             {/* All Violation Images Section */}
//             <motion.div 
//               className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//             >
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-xl font-semibold text-gray-800">All Violation Records</h2>
//                 <span className="text-sm text-gray-500">
//                   Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, violationImages.length)} of {violationImages.length} violations
//                 </span>
//               </div>
              
//               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//                 {currentImages.map((item) => (
//                   <div
//                     key={item.id}
//                     className="group relative overflow-hidden rounded-md border border-gray-200 hover:shadow-md transition-shadow"
//                   >
//                     <img
//                       src={item.imageUrl}
//                       alt="Violation"
//                       className="h-40 w-full object-cover"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
//                       <p className="text-white text-sm font-medium">
//                         {item.type}
//                       </p>
//                       <p className="text-white/80 text-xs">
//                         {item.time}
//                       </p>
//                     </div>
//                     <div className="p-2 bg-white flex justify-between items-center">
//                       <div>
//                         <p className="text-xs text-gray-700 truncate">
//                           {item.type}
//                         </p>
//                         <p className="text-xs text-gray-500">
//                           {item.time.split(',')[0]}
//                         </p>
//                       </div>
//                       <button
//                         onClick={() => handleDeleteImage(item.id)}
//                         disabled={isDeleting}
//                         className="text-red-500 hover:text-red-700 p-1"
//                         title="Delete this violation"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                         </svg>
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Pagination */}
//               {totalPages > 1 && (
//                 <div className="flex justify-center mt-6">
//                   <nav className="inline-flex rounded-md shadow-sm -space-x-px">
//                     <button
//                       onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
//                       disabled={currentPage === 1}
//                       className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
//                     >
//                       Previous
//                     </button>
//                     {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
//                       <button
//                         key={number}
//                         onClick={() => paginate(number)}
//                         className={`px-3 py-1 border border-gray-300 text-sm font-medium ${currentPage === number ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
//                       >
//                         {number}
//                       </button>
//                     ))}
//                     <button
//                       onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
//                       disabled={currentPage === totalPages}
//                       className="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
//                     >
//                       Next
//                     </button>
//                   </nav>
//                 </div>
//               )}
//             </motion.div>

//             {/* Peak Time Analysis */}
//             <motion.div 
//               className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//             >
//               <h2 className="text-xl font-semibold mb-6 text-gray-800">Peak Violation Times</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
//                   <div className="flex items-center">
//                     <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-4">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-medium text-gray-700">Peak Hour</h3>
//                       <p className="text-2xl font-bold text-gray-800">
//                         {timeAnalysis.peakHour}:00 - {timeAnalysis.peakHour + 1}:00
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="p-4 rounded-lg bg-green-50 border border-green-100">
//                   <div className="flex items-center">
//                     <div className="p-2 rounded-full bg-green-100 text-green-600 mr-4">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                       </svg>
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-medium text-gray-700">Peak Day</h3>
//                       <p className="text-2xl font-bold text-gray-800">{timeAnalysis.peakDay}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </DashboardLayout>
//     </>
//   );
// };

// export default TrafficViolationDashboard;




import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';
import Navbar from '../components/Navbar';
import { Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
} from 'chart.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

const TrafficViolationDashboard = () => {
  const [statsData, setStatsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [totalViolations, setTotalViolations] = useState(0);
  const [violationTypes, setViolationTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeAnalysis, setTimeAnalysis] = useState({});
  const [violationImages, setViolationImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [isDeleting, setIsDeleting] = useState(false);

  // Filter states
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [timeRange, setTimeRange] = useState([0, 23]);
  const [startHour, endHour] = timeRange;
  const [selectedViolation, setSelectedViolation] = useState(null);

  // Professional color palette for each violation type
  const VIOLATION_COLORS = {
    'No Helmet': {
      primary: '#EF4444',
      secondary: '#FEE2E2'
    },
    'Phone Usage': {
      primary: '#3B82F6',
      secondary: '#DBEAFE'
    },
    'Triple Riding': {
      primary: '#F59E0B',
      secondary: '#FEF3C7'
    },
    'Wrong Way': {
      primary: '#10B981',
      secondary: '#D1FAE5'
    },
    'No Helmet + Phone Usage': {
      primary: '#8B5CF6',
      secondary: '#EDE9FE'
    },
    'No Helmet + Triple Riding': {
      primary: '#EC4899',
      secondary: '#FCE7F3'
    },
    'Phone Usage + Triple Riding': {
      primary: '#14B8A6',
      secondary: '#CCFBF1'
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [dateRange, timeRange, selectedViolation, statsData]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/api/violations/all');
      const data = await response.json();

      if (response.ok) {
        setStatsData(data);
        setFilteredData(data);
        processViolationData(data);
        analyzeTimeData(data);
        setViolationImages(data.map(v => ({
          imageUrl: v.imageUrl,
          type: getViolationType(v),
          time: new Date(v.analyzedAt).toLocaleString(),
          id: v._id,
          analyzedAt: v.analyzedAt
        })));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...statsData];

    // Apply date filter
    if (startDate && endDate) {
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.analyzedAt);
        return itemDate >= startDate && itemDate <= endDate;
      });
    }

    // Apply time filter
    filtered = filtered.filter(item => {
      const itemHour = new Date(item.analyzedAt).getHours();
      return itemHour >= startHour && itemHour <= endHour;
    });

    // Apply violation type filter
    if (selectedViolation) {
      filtered = filtered.filter(item => {
        const violations = [];
        if (item.noHelmet) violations.push('No Helmet');
        if (item.phoneUsage) violations.push('Phone Usage');
        if (item.tripling) violations.push('Triple Riding');
        if (item.wrongway) violations.push('Wrong Way');
        
        if (selectedViolation.includes('+')) {
          const requiredViolations = selectedViolation.split(' + ');
          return requiredViolations.every(v => violations.includes(v));
        }
        return violations.includes(selectedViolation);
      });
    }

    setFilteredData(filtered);
    processViolationData(filtered);
    analyzeTimeData(filtered);
    
    // Update images with filtered data
    setViolationImages(filtered.map(v => ({
      imageUrl: v.imageUrl,
      type: getViolationType(v),
      time: new Date(v.analyzedAt).toLocaleString(),
      id: v._id,
      analyzedAt: v.analyzedAt
    })));
    
    // Reset to first page when filters change
    setCurrentPage(1);
  };

  const getViolationType = (item) => {
    const types = [];
    if (item.noHelmet) types.push('No Helmet');
    if (item.phoneUsage) types.push('Phone Usage');
    if (item.tripling) types.push('Triple Riding');
    if (item.wrongway) types.push('Wrong Way');
    return types.length > 0 ? types.join(' + ') : 'None';
  };

  const processViolationData = (data) => {
    const counts = {};
    
    data.forEach(item => {
      const violations = [];
      if (item.noHelmet) violations.push('No Helmet');
      if (item.phoneUsage) violations.push('Phone Usage');
      if (item.tripling) violations.push('Triple Riding');
      if (item.wrongway) violations.push('Wrong Way');

      // Count individual violations
      violations.forEach(v => {
        counts[v] = (counts[v] || 0) + 1;
      });

      // Count combinations if more than one violation
      if (violations.length > 1) {
        const comboKey = violations.join(' + ');
        counts[comboKey] = (counts[comboKey] || 0) + 1;
      }
    });

    // Convert to array and assign colors
    const violationData = Object.keys(counts).map(key => ({
      name: key,
      value: counts[key],
      color: VIOLATION_COLORS[key] || {
        primary: '#64748B',
        secondary: '#F1F5F9'
      }
    }));

    // Sort by count (descending)
    violationData.sort((a, b) => b.value - a.value);
    
    setViolationTypes(violationData);
    setTotalViolations(data.length);
  };

  const analyzeTimeData = (data) => {
    const hourlyCounts = Array(24).fill(0);
    const dailyCounts = Array(7).fill(0);

    data.forEach(violation => {
      const date = new Date(violation.analyzedAt);
      const hour = date.getHours();
      const day = date.getDay();

      hourlyCounts[hour]++;
      dailyCounts[day]++;
    });

    setTimeAnalysis({
      hourly: hourlyCounts,
      daily: dailyCounts,
      peakHour: hourlyCounts.indexOf(Math.max(...hourlyCounts)),
      peakDay: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][
        dailyCounts.indexOf(Math.max(...dailyCounts))
      ]
    });
  };

  const handleDeleteImage = async (imageId) => {
    if (isDeleting) return;
    
    try {
      setIsDeleting(true);
      const response = await fetch(`http://localhost:5000/api/violations/${imageId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setViolationImages(violationImages.filter(img => img.id !== imageId));
        fetchData();
      } else {
        console.error('Failed to delete image');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Function to download CSV report
  const downloadCSVReport = () => {
    // Prepare CSV content
    const headers = ['Date', 'Time', 'Violation Type', 'Image URL'];
    
    // Convert each violation to CSV row
    const rows = filteredData.map(violation => {
      const date = new Date(violation.analyzedAt);
      const formattedDate = date.toLocaleDateString();
      const formattedTime = date.toLocaleTimeString();
      const violationType = getViolationType(violation);
      
      return [
        `"${formattedDate}"`,
        `"${formattedTime}"`,
        `"${violationType}"`,
        `"${violation.imageUrl}"`
      ].join(',');
    });

    // Combine headers and rows
    const csvContent = [headers.join(','), ...rows].join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `violation_report_${new Date().toISOString().slice(0,10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Prepare violation options for select dropdown
  const violationOptions = [
    { value: null, label: 'All Violation Types' },
    ...violationTypes.map(item => ({
      value: item.name,
      label: item.name
    }))
  ];

  // Time range slider marks
  const timeMarks = {
    0: '12 AM',
    6: '6 AM',
    12: '12 PM',
    18: '6 PM',
    23: '11 PM'
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentImages = violationImages.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(violationImages.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const percentages = violationTypes.reduce((acc, item) => {
    acc[item.name] = totalViolations > 0 ? ((item.value / totalViolations) * 100).toFixed(1) : 0;
    return acc;
  }, {});

  const pieChartData = {
    labels: violationTypes.map(item => item.name),
    datasets: [
      {
        data: violationTypes.map(item => item.value),
        backgroundColor: violationTypes.map(item => item.color.primary),
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  const timeChartData = {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    datasets: [
      {
        label: 'Violations by Hour',
        data: timeAnalysis.hourly || [],
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderColor: VIOLATION_COLORS['Phone Usage'].primary,
        borderWidth: 2,
        tension: 0.3,
        fill: true,
        pointBackgroundColor: '#ffffff',
        pointBorderColor: VIOLATION_COLORS['Phone Usage'].primary,
        pointBorderWidth: 2
      },
    ],
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <DashboardLayout>
        <div className="min-h-screen w-full bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            <motion.header 
              className="mb-8 text-center" 
              initial={{ opacity: 0, y: -20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Traffic Violation Report</h1>
              <p className="text-lg text-gray-600">Complete record of all traffic violations</p>
            </motion.header>

            {/* Filter Section */}
            <motion.section 
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Filter Violations</h2>
                <button
                  onClick={downloadCSVReport}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Download Report 
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Date Range Picker */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                  <DatePicker
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(update) => setDateRange(update)}
                    isClearable={true}
                    placeholderText="Select date range"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                {/* Time Range Slider */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time Range: {startHour}:00 - {endHour}:00
                  </label>
                  <div className="relative py-4">
                    <div className="absolute h-0.5 bg-gray-300 rounded-full w-full top-1/2 transform -translate-y-1/2"></div>
                    <div 
                      className="absolute h-2 bg-blue-600 rounded-full top-1/2 transform -translate-y-1/2"
                      style={{ 
                        left: `${(startHour / 23) * 100}%`, 
                        width: `${((endHour - startHour) / 23) * 100}%` 
                      }}
                    ></div>
                    <div 
                      className="absolute w-5 h-5 bg-blue-700 rounded-full top-1/2 transform -translate-y-1/2 cursor-pointer z-20 shadow-lg"
                      style={{ left: `calc(${(startHour / 23) * 100}% - 10px)` }}
                      onMouseDown={(e) => {
                        const handleMove = (moveEvent) => {
                          const slider = e.target.closest('.relative');
                          const rect = slider.getBoundingClientRect();
                          const percent = Math.min(Math.max((moveEvent.clientX - rect.left) / rect.width, 0), 1);
                          const newValue = Math.round(percent * 23);
                          if (newValue <= endHour) {
                            setTimeRange([newValue, endHour]);
                          }
                        };
                        const handleUp = () => {
                          document.removeEventListener('mousemove', handleMove);
                          document.removeEventListener('mouseup', handleUp);
                        };
                        document.addEventListener('mousemove', handleMove);
                        document.addEventListener('mouseup', handleUp);
                      }}
                    ></div>
                    <div 
                      className="absolute w-5 h-5 bg-blue-700 rounded-full top-1/2 transform -translate-y-1/2 cursor-pointer z-20 shadow-lg"
                      style={{ left: `calc(${(endHour / 23) * 100}% - 10px)` }}
                      onMouseDown={(e) => {
                        const handleMove = (moveEvent) => {
                          const slider = e.target.closest('.relative');
                          const rect = slider.getBoundingClientRect();
                          const percent = Math.min(Math.max((moveEvent.clientX - rect.left) / rect.width, 0), 1);
                          const newValue = Math.round(percent * 23);
                          if (newValue >= startHour) {
                            setTimeRange([startHour, newValue]);
                          }
                        };
                        const handleUp = () => {
                          document.removeEventListener('mousemove', handleMove);
                          document.removeEventListener('mouseup', handleUp);
                        };
                        document.addEventListener('mousemove', handleMove);
                        document.addEventListener('mouseup', handleUp);
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 mt-1">
                    {Object.entries(timeMarks).map(([hour, label]) => (
                      <span key={hour}>{label}</span>
                    ))}
                  </div>
                </div>

                {/* Violation Type Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Violation Type</label>
                  <Select
                    options={violationOptions}
                    value={violationOptions.find(option => option.value === selectedViolation)}
                    onChange={(selected) => setSelectedViolation(selected?.value || null)}
                    isClearable
                    placeholder="Select violation type"
                    className="basic-select"
                    classNamePrefix="select"
                  />
                </div>
              </div>
            </motion.section>

            {/* Summary Section */}
            <motion.section 
              className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {/* Total Violations Card */}
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="ml-3 text-lg font-medium text-gray-700">Total Violations</h3>
                </div>
                <p className="text-3xl font-bold text-gray-800">{totalViolations}</p>
                <p className="mt-2 text-sm text-gray-500">All recorded violations</p>
              </motion.div>

              {/* Top 3 Violation Type Cards */}
              {violationTypes.slice(0, 3).map((item, idx) => (
                <motion.div 
                  key={idx}
                  className="p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  style={{ 
                    backgroundColor: item.color.secondary,
                    borderTop: `4px solid ${item.color.primary}`
                  }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center mb-4">
                    <div 
                      className="p-3 rounded-lg text-white"
                      style={{ backgroundColor: item.color.primary }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <h3 className="ml-3 text-lg font-medium" style={{ color: item.color.primary }}>{item.name}</h3>
                  </div>
                  <p className="text-3xl font-bold text-gray-800">{item.value}</p>
                  <div className="mt-2">
                    <span className="text-sm font-medium" style={{ color: item.color.primary }}>
                      {percentages[item.name]}% of total
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.section>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Pie Chart */}
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Violation Distribution</h2>
                  <span className="text-sm text-gray-500">Percentage of total</span>
                </div>
                <div className="h-80">
                  <Pie
                    data={pieChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { 
                          position: 'right',
                          labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: {
                              family: 'Inter, sans-serif'
                            }
                          }
                        },
                        tooltip: {
                          callbacks: {
                            label: function (context) {
                              return `${context.label}: ${context.raw} (${percentages[context.label]}%)`;
                            }
                          },
                          bodyFont: {
                            family: 'Inter, sans-serif',
                            size: 14
                          }
                        }
                      },
                      cutout: '60%'
                    }}
                  />
                </div>
              </motion.div>

              {/* Line Chart */}
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Hourly Violation Patterns</h2>
                  <span className="text-sm text-gray-500">24-hour period</span>
                </div>
                <div className="h-80">
                  <Line
                    data={timeChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { 
                        legend: { display: false },
                        tooltip: {
                          bodyFont: {
                            family: 'Inter, sans-serif',
                            size: 14
                          }
                        }
                      },
                      scales: {
                        y: { 
                          beginAtZero: true, 
                          title: { 
                            display: true, 
                            text: 'Number of Violations',
                            font: {
                              family: 'Inter, sans-serif'
                            }
                          },
                          grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                          }
                        },
                        x: { 
                          title: { 
                            display: true, 
                            text: 'Hour of Day',
                            font: {
                              family: 'Inter, sans-serif'
                            }
                          },
                          grid: {
                            display: false
                          }
                        }
                      },
                      elements: {
                        line: {
                          tension: 0.4
                        }
                      }
                    }}
                  />
                </div>
              </motion.div>
            </div>
            
            {/* All Violation Images Section */}
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">All Violation Records</h2>
                <span className="text-sm text-gray-500">
                  Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, violationImages.length)} of {violationImages.length} violations
                </span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {currentImages.map((item) => (
                  <div
                    key={item.id}
                    className="group relative overflow-hidden rounded-md border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <img
                      src={item.imageUrl}
                      alt="Violation"
                      className="h-40 w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                      <p className="text-white text-sm font-medium">
                        {item.type}
                      </p>
                      <p className="text-white/80 text-xs">
                        {item.time}
                      </p>
                    </div>
                    <div className="p-2 bg-white flex justify-between items-center">
                      <div>
                        <p className="text-xs text-gray-700 truncate">
                          {item.type}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.time.split(',')[0]}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteImage(item.id)}
                        disabled={isDeleting}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Delete this violation"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-6">
                  <nav className="inline-flex rounded-md shadow-sm -space-x-px">
                    <button
                      onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`px-3 py-1 border border-gray-300 text-sm font-medium ${currentPage === number ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                      >
                        {number}
                      </button>
                    ))}
                    <button
                      onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </motion.div>

            {/* Peak Time Analysis */}
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-xl font-semibold mb-6 text-gray-800">Peak Violation Times</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-700">Peak Hour</h3>
                      <p className="text-2xl font-bold text-gray-800">
                        {timeAnalysis.peakHour}:00 - {timeAnalysis.peakHour + 1}:00
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-green-50 border border-green-100">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-green-100 text-green-600 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-700">Peak Day</h3>
                      <p className="text-2xl font-bold text-gray-800">{timeAnalysis.peakDay}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default TrafficViolationDashboard;