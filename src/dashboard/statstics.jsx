
// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import DashboardLayout from '../components/DashboardLayout';
// import Navbar from '../components/Navbar';
// import { Pie, Line, Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Filler
// } from 'chart.js';
// import GaugeChart from 'react-gauge-chart';
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
//   BarElement,
//   Title,
//   Filler
// );

// // Field name mapping (backend field -> display name)
// const VIOLATION_FIELD_MAPPING = {
//   noHelmet: 'Without Helmet',
//   phoneUsage: 'Phone Usage',
//   tripling: 'Tripling',
//   stuntRiding: 'Stunt Riding',
//   smoking: 'Smoking',
//   fire: 'Fire'
// };

// const TrafficViolationDashboard = () => {
//   const [statsData, setStatsData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [totalViolations, setTotalViolations] = useState(0);
//   const [violationTypes, setViolationTypes] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [timeAnalysis, setTimeAnalysis] = useState({});

//   // Filter states
//   const [dateRange, setDateRange] = useState([null, null]);
//   const [startDate, endDate] = dateRange;
//   const [timeRange, setTimeRange] = useState([0, 23]);
//   const [startHour, endHour] = timeRange;
//   const [selectedViolation, setSelectedViolation] = useState(null);

//   // Professional color palette with harmonious combinations
//   const VIOLATION_COLORS = {
//     'Without Helmet': {
//       primary: '#3B82F6', // Blue
//       secondary: '#EFF6FF',
//       gauge: ['#3B82F6', '#93C5FD'],
//       chart: '#3B82F6'
//     },
//     'Phone Usage': {
//       primary: '#10B981', // Emerald
//       secondary: '#ECFDF5',
//       gauge: ['#10B981', '#6EE7B7'],
//       chart: '#10B981'
//     },
//     'Tripling': {
//       primary: '#F59E0B', // Amber
//       secondary: '#FFFBEB',
//       gauge: ['#F59E0B', '#FCD34D'],
//       chart: '#F59E0B'
//     },
//     'Stunt Riding': {
//       primary: '#EF4444', // Red
//       secondary: '#FEF2F2',
//       gauge: ['#EF4444', '#FCA5A5'],
//       chart: '#EF4444'
//     },
//     'Smoking': {
//       primary: '#8B5CF6', // Violet
//       secondary: '#F5F3FF',
//       gauge: ['#8B5CF6', '#C4B5FD'],
//       chart: '#8B5CF6'
//     },
//     'Fire': {
//       primary: '#EC4899', // Pink
//       secondary: '#FDF2F8',
//       gauge: ['#EC4899', '#F9A8D4'],
//       chart: '#EC4899'
//     },
//     'Without Helmet + Phone Usage': {
//       primary: '#06B6D4', // Cyan
//       secondary: '#ECFEFF',
//       gauge: ['#06B6D4', '#67E8F9'],
//       chart: 'linear-gradient(90deg, #3B82F6 0%, #10B981 100%)'
//     },
//     'Without Helmet + Tripling': {
//       primary: '#F97316', // Orange
//       secondary: '#FFF7ED',
//       gauge: ['#F97316', '#FDBA74'],
//       chart: 'linear-gradient(90deg, #3B82F6 0%, #F59E0B 100%)'
//     },
//     'Phone Usage + Smoking': {
//       primary: '#14B8A6', // Teal
//       secondary: '#F0FDFA',
//       gauge: ['#14B8A6', '#5EEAD4'],
//       chart: 'linear-gradient(90deg, #10B981 0%, #8B5CF6 100%)'
//     },
//     'Stunt Riding + Fire': {
//       primary: '#D946EF', // Fuchsia
//       secondary: '#FAF5FF',
//       gauge: ['#D946EF', '#E9D5FF'],
//       chart: 'linear-gradient(90deg, #EF4444 0%, #EC4899 100%)'
//     }
//   };

//   // Professional icon components for each violation type
//   const VIOLATION_ICONS = {
//     'Without Helmet': (
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//       </svg>
//     ),
//     'Phone Usage': (
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
//       </svg>
//     ),
//     'Tripling': (
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//       </svg>
//     ),
//     'Stunt Riding': (
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//       </svg>
//     ),
//     'Smoking': (
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 14V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2V14z" />
//       </svg>
//     ),
//     'Fire': (
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
//       </svg>
//     ),
//     'default': (
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
//       </svg>
//     )
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoading(true);
//         // const response = await fetch('http://localhost:5000/api/violations');
//                 // const response = await fetch('http://kaapaan-backend.onrender.com/api/violations');
//                                 const response = await fetch('https://kaapaan-backend.onrender.com/api/violations');


//         const data = await response.json();

//         if (response.ok) {
//           setStatsData(data);
//           setFilteredData(data);
//           processViolationData(data);
//           analyzeTimeData(data);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     applyFilters();
//   }, [dateRange, timeRange, selectedViolation, statsData]);

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
//         // Check each possible violation field
//         Object.keys(VIOLATION_FIELD_MAPPING).forEach(field => {
//           if (item[field]) {
//             violations.push(VIOLATION_FIELD_MAPPING[field]);
//           }
//         });
        
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
//   };

//   const processViolationData = (data) => {
//     const counts = {};
    
//     data.forEach(item => {
//       const violations = [];
//       // Map backend fields to display names
//       Object.keys(VIOLATION_FIELD_MAPPING).forEach(field => {
//         if (item[field]) {
//           violations.push(VIOLATION_FIELD_MAPPING[field]);
//         }
//       });

//       if (violations.length > 0) {
//         violations.forEach(v => {
//           counts[v] = (counts[v] || 0) + 1;
//         });
        
//         if (violations.length > 1) {
//           const comboKey = violations.join(' + ');
//           counts[comboKey] = (counts[comboKey] || 0) + 1;
//         }
//       }
//     });

//     const violationData = Object.keys(counts).map(key => ({
//       name: key,
//       value: counts[key],
//       maxValue: Math.max(...Object.values(counts)) * 1.2,
//       color: VIOLATION_COLORS[key] || {
//         primary: '#6B7280',
//         secondary: '#F3F4F6',
//         gauge: ['#6B7280', '#E5E7EB'],
//         chart: '#6B7280'
//       }
//     }));

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
//         hoverBorderColor: '#1F2937',
//         hoverOffset: 10
//       },
//     ],
//   };

//   const timeChartData = {
//     labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
//     datasets: [
//       {
//         label: 'Violations by Hour',
//         data: timeAnalysis.hourly || [],
//         backgroundColor: (context) => {
//           const ctx = context.chart.ctx;
//           const gradient = ctx.createLinearGradient(0, 0, 0, 300);
//           gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
//           gradient.addColorStop(1, 'rgba(59, 130, 246, 0.05)');
//           return gradient;
//         },
//         borderColor: VIOLATION_COLORS['Without Helmet'].primary,
//         borderWidth: 2,
//         tension: 0.4,
//         fill: true,
//         pointBackgroundColor: '#ffffff',
//         pointBorderColor: VIOLATION_COLORS['Without Helmet'].primary,
//         pointBorderWidth: 2,
//         pointRadius: 4,
//         pointHoverRadius: 6
//       },
//     ],
//   };

//   const dailyChartData = {
//     labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
//     datasets: [
//       {
//         label: 'Violations by Day',
//         data: timeAnalysis.daily || [],
//         backgroundColor: (context) => {
//           const ctx = context.chart.ctx;
//           const gradient = ctx.createLinearGradient(0, 0, 0, 300);
//           gradient.addColorStop(0, 'rgba(16, 185, 129, 0.3)');
//           gradient.addColorStop(1, 'rgba(16, 185, 129, 0.05)');
//           return gradient;
//         },
//         borderColor: VIOLATION_COLORS['Phone Usage'].primary,
//         borderWidth: 2,
//         borderRadius: 4,
//         tension: 0.4,
//         fill: true
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
//               <h1 className="text-3xl font-bold text-gray-800 mb-2">Traffic Violation Analytics</h1>
//               <p className="text-lg text-gray-600">Comprehensive insights into traffic violation patterns</p>
//             </motion.header>

//             {/* Filter Section */}
//             <motion.section 
//               className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//             >
//               <h2 className="text-xl font-semibold mb-4 text-gray-800">Filter Violations</h2>
              
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
//                     className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>

//                 {/* Time Range Slider */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Time Range: {startHour}:00 - {endHour}:00
//                   </label>
//                   <div className="relative py-4">
//                     <div className="absolute h-1 bg-gray-200 rounded-full w-full top-1/2 transform -translate-y-1/2"></div>
//                     <div 
//                       className="absolute h-2 bg-blue-500 rounded-full top-1/2 transform -translate-y-1/2"
//                       style={{ 
//                         left: `${(startHour / 23) * 100}%`, 
//                         width: `${((endHour - startHour) / 23) * 100}%` 
//                       }}
//                     ></div>
//                     <div 
//                       className="absolute w-5 h-5 bg-blue-600 rounded-full top-1/2 transform -translate-y-1/2 cursor-pointer z-20 shadow-md hover:shadow-lg transition-shadow"
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
//                       className="absolute w-5 h-5 bg-blue-600 rounded-full top-1/2 transform -translate-y-1/2 cursor-pointer z-20 shadow-md hover:shadow-lg transition-shadow"
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
//                     className="react-select-container"
//                     classNamePrefix="react-select"
//                     styles={{
//                       control: (base) => ({
//                         ...base,
//                         minHeight: '42px',
//                         borderColor: '#D1D5DB',
//                         '&:hover': {
//                           borderColor: '#9CA3AF'
//                         }
//                       }),
//                       option: (base, { isFocused, isSelected }) => ({
//                         ...base,
//                         backgroundColor: isSelected ? '#3B82F6' : isFocused ? '#EFF6FF' : 'white',
//                         color: isSelected ? 'white' : isFocused ? '#1E40AF' : '#374151'
//                       })
//                     }}
//                   />
//                 </div>
//               </div>
//             </motion.section>

//             {/* Summary Cards */}
//             <motion.section 
//               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ staggerChildren: 0.1 }}
//             >
//               {/* Total Violations Card */}
//               <motion.div 
//                 className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all"
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

//               {/* Violation Type Cards - Show top 3 individual violations */}
//               {violationTypes
//                 .filter(item => !item.name.includes('+'))
//                 .slice(0, 3)
//                 .map((item, idx) => (
//                   <motion.div 
//                     key={idx}
//                     className="p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
//                     style={{ 
//                       backgroundColor: item.color.secondary,
//                       borderTop: `4px solid ${item.color.primary}`
//                     }}
//                     whileHover={{ y: -5 }}
//                   >
//                     <div className="flex items-center mb-4">
//                       <div 
//                         className="p-3 rounded-lg text-white"
//                         style={{ backgroundColor: item.color.primary }}
//                       >
//                         {VIOLATION_ICONS[item.name] || VIOLATION_ICONS['default']}
//                       </div>
//                       <h3 className="ml-3 text-lg font-medium" style={{ color: item.color.primary }}>{item.name}</h3>
//                     </div>
//                     <p className="text-3xl font-bold text-gray-800">{item.value}</p>
//                     <div className="mt-2 flex justify-between items-center">
//                       <span className="text-sm font-medium" style={{ color: item.color.primary }}>
//                         {percentages[item.name]}% of total
//                       </span>
//                     </div>
//                   </motion.div>
//                 ))}
//             </motion.section>

//             {/* Gauge Charts Section - 4 in one row */}
//             <motion.section 
//               className="mb-8"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.3 }}
//             >
//               <h2 className="text-2xl font-bold text-gray-800 mb-6">Violation Metrics</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 {violationTypes
//                   .filter(item => !item.name.includes('+'))
//                   .slice(0, 4) // Show only first 4 for the gauge row
//                   .map((item, idx) => (
//                     <motion.div 
//                       key={idx}
//                       className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all relative"
//                       whileHover={{ y: -3 }}
//                     >
//                       <div className="absolute top-4 right-4 bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold">
//                         {item.value} violations
//                       </div>
//                       <div className="flex items-center mb-4">
//                         <div 
//                           className="p-3 rounded-lg text-white"
//                           style={{ backgroundColor: item.color.primary }}
//                         >
//                           {VIOLATION_ICONS[item.name] || VIOLATION_ICONS['default']}
//                         </div>
//                         <h3 className="ml-3 text-lg font-medium" style={{ color: item.color.primary }}>
//                           {item.name}
//                         </h3>
//                       </div>
//                       <div className="h-40">
//                         <GaugeChart
//                           id={`gauge-${idx}`}
//                           nrOfLevels={20}
//                           colors={item.color.gauge}
//                           arcWidth={0.3}
//                           percent={item.value / item.maxValue}
//                           textColor={item.color.primary}
//                           needleColor={item.color.primary}
//                           needleBaseColor="#6B7280"
//                           arcPadding={0.02}
//                           cornerRadius={3}
//                           formatTextValue={() => `${item.value}`}
//                           hideText={true}
//                         />
//                       </div>
//                       <div className="text-center mt-4">
//                         <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium" 
//                              style={{ backgroundColor: item.color.secondary, color: item.color.primary }}>
//                           {percentages[item.name]}% of total
//                         </div>
//                       </div>
//                     </motion.div>
//                   ))}
//               </div>
//             </motion.section>

//             {/* Combined Violations Section - Moved above distribution */}
//             <motion.section 
//               className="mb-8"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.2 }}
//             >
//               <h2 className="text-2xl font-bold text-gray-800 mb-6">Combined Violations</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {violationTypes
//                   .filter(item => item.name.includes('+'))
//                   .map((item, idx) => (
//                     <motion.div 
//                       key={idx}
//                       className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all"
//                       whileHover={{ y: -3 }}
//                     >
//                       <div className="flex items-start mb-4">
//                         <div 
//                           className="p-3 rounded-lg text-white flex-shrink-0"
//                           style={{ backgroundColor: item.color.primary }}
//                         >
//                           {VIOLATION_ICONS['default']}
//                         </div>
//                         <div className="ml-4">
//                           <h3 className="text-lg font-semibold" style={{ color: item.color.primary }}>
//                             {item.name}
//                           </h3>
//                           <p className="text-sm text-gray-600 mt-1">
//                             Combination of {item.name.split(' + ').length} violations
//                           </p>
//                         </div>
//                       </div>
//                       <div className="flex justify-between items-end">
//                         <div>
//                           <p className="text-3xl font-bold text-gray-800">{item.value}</p>
//                           <p className="text-sm text-gray-500 mt-1">
//                             {percentages[item.name]}% of total violations
//                           </p>
//                         </div>
//                         <div className="flex space-x-1">
//                           {item.name.split(' + ').map((v, i) => (
//                             <span 
//                               key={i}
//                               className="px-2 py-1 text-xs rounded-full"
//                               style={{ 
//                                 backgroundColor: VIOLATION_COLORS[v]?.secondary || '#F3F4F6',
//                                 color: VIOLATION_COLORS[v]?.primary || '#6B7280'
//                               }}
//                             >
//                               {v}
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     </motion.div>
//                   ))}
//               </div>
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
//                 <div className="h-80 relative">
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
//                               family: 'Inter, sans-serif',
//                               size: 12
//                             },
//                             generateLabels: (chart) => {
//                               const data = chart.data;
//                               if (data.labels.length && data.datasets.length) {
//                                 return data.labels.map((label, i) => {
//                                   const dataset = data.datasets[0];
//                                   const value = dataset.data[i];
//                                   const percentage = Math.round((value / dataset.data.reduce((a, b) => a + b, 0)) * 100);
                                  
//                                   return {
//                                     text: `${label}: ${value} (${percentage}%)`,
//                                     fillStyle: dataset.backgroundColor[i],
//                                     strokeStyle: dataset.borderColor,
//                                     lineWidth: dataset.borderWidth,
//                                     hidden: isNaN(dataset.data[i]) || chart.getDatasetMeta(0).data[i].hidden,
//                                     index: i
//                                   };
//                                 });
//                               }
//                               return [];
//                             }
//                           }
//                         },
//                         tooltip: {
//                           callbacks: {
//                             label: function (context) {
//                               const label = context.label || '';
//                               const value = context.raw || 0;
//                               const total = context.dataset.data.reduce((a, b) => a + b, 0);
//                               const percentage = Math.round((value / total) * 100);
//                               return `${label}: ${value} (${percentage}%)`;
//                             }
//                           },
//                           bodyFont: {
//                             family: 'Inter, sans-serif',
//                             size: 14
//                           },
//                           displayColors: true,
//                           usePointStyle: true,
//                           padding: 12,
//                           backgroundColor: 'rgba(31, 41, 55, 0.9)'
//                         }
//                       },
//                       cutout: '65%',
//                       animation: {
//                         animateScale: true,
//                         animateRotate: true
//                       }
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
//                           },
//                           backgroundColor: 'rgba(31, 41, 55, 0.9)',
//                           displayColors: false,
//                           callbacks: {
//                             title: (context) => `Hour: ${context[0].label}`,
//                             label: (context) => `Violations: ${context.raw}`
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

//             {/* Additional Analysis Section */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
//               {/* Daily Chart */}
//               <motion.div 
//                 className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 col-span-2"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//               >
//                 <div className="flex justify-between items-center mb-4">
//                   <h2 className="text-xl font-semibold text-gray-800">Weekly Violation Trends</h2>
//                   <span className="text-sm text-gray-500">7-day period</span>
//                 </div>
//                 <div className="h-80">
//                   <Bar
//                     data={dailyChartData}
//                     options={{
//                       responsive: true,
//                       maintainAspectRatio: false,
//                       plugins: { 
//                         legend: { display: false },
//                         tooltip: {
//                           bodyFont: {
//                             family: 'Inter, sans-serif',
//                             size: 14
//                           },
//                           backgroundColor: 'rgba(31, 41, 55, 0.9)',
//                           displayColors: false,
//                           callbacks: {
//                             title: (context) => `Day: ${context[0].label}`,
//                             label: (context) => `Violations: ${context.raw}`
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
//                             text: 'Day of Week',
//                             font: {
//                               family: 'Inter, sans-serif'
//                             }
//                           },
//                           grid: {
//                             display: false
//                           }
//                         }
//                       }
//                     }}
//                   />
//                 </div>
//               </motion.div>

//               {/* Peak Time Analysis */}
//               <motion.div 
//                 className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 }}
//               >
//                 <h2 className="text-xl font-semibold mb-6 text-gray-800">Peak Violation Times</h2>
//                 <div className="space-y-4">
//                   <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
//                     <div className="flex items-center">
//                       <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-4">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                         </svg>
//                       </div>
//                       <div>
//                         <h3 className="text-lg font-medium text-gray-700">Peak Hour</h3>
//                         <p className="text-2xl font-bold text-gray-800">
//                           {timeAnalysis.peakHour}:00 - {timeAnalysis.peakHour + 1}:00
//                         </p>
//                         <p className="text-sm text-gray-600 mt-1">
//                           {timeAnalysis.hourly ? Math.max(...timeAnalysis.hourly) : 0} violations recorded
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100 border border-green-200">
//                     <div className="flex items-center">
//                       <div className="p-2 rounded-full bg-green-100 text-green-600 mr-4">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                         </svg>
//                       </div>
//                       <div>
//                         <h3 className="text-lg font-medium text-gray-700">Peak Day</h3>
//                         <p className="text-2xl font-bold text-gray-800">{timeAnalysis.peakDay}</p>
//                         <p className="text-sm text-gray-600 mt-1">
//                           {timeAnalysis.daily ? Math.max(...timeAnalysis.daily) : 0} violations recorded
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </div>
//       </DashboardLayout>

//       <style jsx global>{`
//         .react-select-container .react-select__control {
//           min-height: 42px;
//           border-color: #D1D5DB;
//           transition: all 0.2s;
//         }
//         .react-select-container .react-select__control:hover {
//           border-color: #9CA3AF;
//         }
//         .react-select-container .react-select__control--is-focused {
//           border-color: #3B82F6;
//           box-shadow: 0 0 0 1px #3B82F6;
//         }
//         .react-select-container .react-select__option--is-focused {
//           background-color: #EFF6FF;
//           color: #1E40AF;
//         }
//         .react-select-container .react-select__option--is-selected {
//           background-color: #3B82F6;
//           color: white;
//         }
//       `}</style>
//     </>
//   );
// };

// export default TrafficViolationDashboard;







// // import React, { useEffect, useState } from 'react';
// // import { motion } from 'framer-motion';
// // import DashboardLayout from '../components/DashboardLayout';
// // import Navbar from '../components/Navbar';
// // import { Pie, Line, Bar } from 'react-chartjs-2';
// // import {
// //   Chart as ChartJS,
// //   ArcElement,
// //   Tooltip,
// //   Legend,
// //   CategoryScale,
// //   LinearScale,
// //   PointElement,
// //   LineElement,
// //   BarElement,
// //   Title,
// //   Filler
// // } from 'chart.js';
// // import GaugeChart from 'react-gauge-chart';
// // import DatePicker from 'react-datepicker';
// // import 'react-datepicker/dist/react-datepicker.css';
// // import Select from 'react-select';

// // ChartJS.register(
// //   ArcElement,
// //   Tooltip,
// //   Legend,
// //   CategoryScale,
// //   LinearScale,
// //   PointElement,
// //   LineElement,
// //   BarElement,
// //   Title,
// //   Filler
// // );

// // // Field name mapping (backend field -> display name)
// // const VIOLATION_FIELD_MAPPING = {
// //   noHelmet: 'Without Helmet',
// //   phoneUsage: 'Phone Usage',
// //   tripling: 'Tripling',
// //   stuntRiding: 'Stunt Riding',
// //   smoking: 'Smoking',
// //   fire: 'Fire'
// // };

// // const TrafficViolationDashboard = () => {
// //   const [statsData, setStatsData] = useState([]);
// //   const [filteredData, setFilteredData] = useState([]);
// //   const [totalViolations, setTotalViolations] = useState(0);
// //   const [violationTypes, setViolationTypes] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [timeAnalysis, setTimeAnalysis] = useState({});

// //   // Filter states
// //   const [dateRange, setDateRange] = useState([null, null]);
// //   const [startDate, endDate] = dateRange;
// //   const [timeRange, setTimeRange] = useState([0, 23]);
// //   const [startHour, endHour] = timeRange;
// //   const [selectedViolation, setSelectedViolation] = useState(null);

// //   // Professional color palette with harmonious combinations
// //   const VIOLATION_COLORS = {
// //     'Without Helmet': {
// //       primary: '#3B82F6', // Blue
// //       secondary: '#EFF6FF',
// //       gauge: ['#3B82F6', '#93C5FD'],
// //       chart: '#3B82F6'
// //     },
// //     'Phone Usage': {
// //       primary: '#10B981', // Emerald
// //       secondary: '#ECFDF5',
// //       gauge: ['#10B981', '#6EE7B7'],
// //       chart: '#10B981'
// //     },
// //     'Tripling': {
// //       primary: '#F59E0B', // Amber
// //       secondary: '#FFFBEB',
// //       gauge: ['#F59E0B', '#FCD34D'],
// //       chart: '#F59E0B'
// //     },
// //     'Stunt Riding': {
// //       primary: '#EF4444', // Red
// //       secondary: '#FEF2F2',
// //       gauge: ['#EF4444', '#FCA5A5'],
// //       chart: '#EF4444'
// //     },
// //     'Smoking': {
// //       primary: '#8B5CF6', // Violet
// //       secondary: '#F5F3FF',
// //       gauge: ['#8B5CF6', '#C4B5FD'],
// //       chart: '#8B5CF6'
// //     },
// //     'Fire': {
// //       primary: '#EC4899', // Pink
// //       secondary: '#FDF2F8',
// //       gauge: ['#EC4899', '#F9A8D4'],
// //       chart: '#EC4899'
// //     },
// //     'Without Helmet + Phone Usage': {
// //       primary: '#06B6D4', // Cyan
// //       secondary: '#ECFEFF',
// //       gauge: ['#06B6D4', '#67E8F9'],
// //       chart: 'linear-gradient(90deg, #3B82F6 0%, #10B981 100%)'
// //     },
// //     'Without Helmet + Tripling': {
// //       primary: '#F97316', // Orange
// //       secondary: '#FFF7ED',
// //       gauge: ['#F97316', '#FDBA74'],
// //       chart: 'linear-gradient(90deg, #3B82F6 0%, #F59E0B 100%)'
// //     },
// //     'Phone Usage + Smoking': {
// //       primary: '#14B8A6', // Teal
// //       secondary: '#F0FDFA',
// //       gauge: ['#14B8A6', '#5EEAD4'],
// //       chart: 'linear-gradient(90deg, #10B981 0%, #8B5CF6 100%)'
// //     },
// //     'Stunt Riding + Fire': {
// //       primary: '#D946EF', // Fuchsia
// //       secondary: '#FAF5FF',
// //       gauge: ['#D946EF', '#E9D5FF'],
// //       chart: 'linear-gradient(90deg, #EF4444 0%, #EC4899 100%)'
// //     }
// //   };

// //   // Professional icon components for each violation type
// //   const VIOLATION_ICONS = {
// //     'Without Helmet': (
// //       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
// //       </svg>
// //     ),
// //     'Phone Usage': (
// //       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
// //       </svg>
// //     ),
// //     'Tripling': (
// //       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
// //       </svg>
// //     ),
// //     'Stunt Riding': (
// //       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
// //       </svg>
// //     ),
// //     'Smoking': (
// //       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 14V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2V14z" />
// //       </svg>
// //     ),
// //     'Fire': (
// //       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
// //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
// //       </svg>
// //     ),
// //     'default': (
// //       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
// //       </svg>
// //     )
// //   };

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         setIsLoading(true);
// //         // const response = await fetch('http://localhost:5000/api/violations');
// //                                 const response = await fetch('https://kaapaan-backend.onrender.com/api/violations');


// //         const data = await response.json();

// //         if (response.ok) {
// //           setStatsData(data);
// //           setFilteredData(data);
// //           processViolationData(data);
// //           analyzeTimeData(data);
// //         }
// //       } catch (error) {
// //         console.error('Error fetching data:', error);
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, []);

// //   useEffect(() => {
// //     applyFilters();
// //   }, [dateRange, timeRange, selectedViolation, statsData]);

// //   const applyFilters = () => {
// //     let filtered = [...statsData];

// //     // Apply date filter
// //     if (startDate && endDate) {
// //       filtered = filtered.filter(item => {
// //         const itemDate = new Date(item.analyzedAt);
// //         return itemDate >= startDate && itemDate <= endDate;
// //       });
// //     }

// //     // Apply time filter
// //     filtered = filtered.filter(item => {
// //       const itemHour = new Date(item.analyzedAt).getHours();
// //       return itemHour >= startHour && itemHour <= endHour;
// //     });

// //     // Apply violation type filter
// //     if (selectedViolation) {
// //       filtered = filtered.filter(item => {
// //         const violations = [];
// //         // Check each possible violation field
// //         Object.keys(VIOLATION_FIELD_MAPPING).forEach(field => {
// //           if (item[field]) {
// //             violations.push(VIOLATION_FIELD_MAPPING[field]);
// //           }
// //         });
        
// //         if (selectedViolation.includes('+')) {
// //           const requiredViolations = selectedViolation.split(' + ');
// //           return requiredViolations.every(v => violations.includes(v));
// //         }
// //         return violations.includes(selectedViolation);
// //       });
// //     }

// //     setFilteredData(filtered);
// //     processViolationData(filtered);
// //     analyzeTimeData(filtered);
// //   };

// //   const processViolationData = (data) => {
// //     const counts = {};
    
// //     data.forEach(item => {
// //       const violations = [];
// //       // Map backend fields to display names
// //       Object.keys(VIOLATION_FIELD_MAPPING).forEach(field => {
// //         if (item[field]) {
// //           violations.push(VIOLATION_FIELD_MAPPING[field]);
// //         }
// //       });

// //       if (violations.length > 0) {
// //         violations.forEach(v => {
// //           counts[v] = (counts[v] || 0) + 1;
// //         });
        
// //         if (violations.length > 1) {
// //           const comboKey = violations.join(' + ');
// //           counts[comboKey] = (counts[comboKey] || 0) + 1;
// //         }
// //       }
// //     });

// //     const violationData = Object.keys(counts).map(key => ({
// //       name: key,
// //       value: counts[key],
// //       maxValue: Math.max(...Object.values(counts)) * 1.2,
// //       color: VIOLATION_COLORS[key] || {
// //         primary: '#6B7280',
// //         secondary: '#F3F4F6',
// //         gauge: ['#6B7280', '#E5E7EB'],
// //         chart: '#6B7280'
// //       }
// //     }));

// //     violationData.sort((a, b) => b.value - a.value);
// //     setViolationTypes(violationData);
// //     setTotalViolations(data.length);
// //   };

// //   const analyzeTimeData = (data) => {
// //     const hourlyCounts = Array(24).fill(0);
// //     const dailyCounts = Array(7).fill(0);

// //     data.forEach(violation => {
// //       const date = new Date(violation.analyzedAt);
// //       const hour = date.getHours();
// //       const day = date.getDay();

// //       hourlyCounts[hour]++;
// //       dailyCounts[day]++;
// //     });

// //     setTimeAnalysis({
// //       hourly: hourlyCounts,
// //       daily: dailyCounts,
// //       peakHour: hourlyCounts.indexOf(Math.max(...hourlyCounts)),
// //       peakDay: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][
// //         dailyCounts.indexOf(Math.max(...dailyCounts))
// //       ]
// //     });
// //   };

// //   // Prepare violation options for select dropdown
// //   const violationOptions = [
// //     { value: null, label: 'All Violation Types' },
// //     ...violationTypes.map(item => ({
// //       value: item.name,
// //       label: item.name
// //     }))
// //   ];

// //   // Time range slider marks
// //   const timeMarks = {
// //     0: '12 AM',
// //     6: '6 AM',
// //     12: '12 PM',
// //     18: '6 PM',
// //     23: '11 PM'
// //   };

// //   const percentages = violationTypes.reduce((acc, item) => {
// //     acc[item.name] = totalViolations > 0 ? ((item.value / totalViolations) * 100).toFixed(1) : 0;
// //     return acc;
// //   }, {});

// //   const pieChartData = {
// //     labels: violationTypes.map(item => item.name),
// //     datasets: [
// //       {
// //         data: violationTypes.map(item => item.value),
// //         backgroundColor: violationTypes.map(item => item.color.primary),
// //         borderColor: '#ffffff',
// //         borderWidth: 2,
// //         hoverBorderColor: '#1F2937',
// //         hoverOffset: 10
// //       },
// //     ],
// //   };

// //   const timeChartData = {
// //     labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
// //     datasets: [
// //       {
// //         label: 'Violations by Hour',
// //         data: timeAnalysis.hourly || [],
// //         backgroundColor: (context) => {
// //           const ctx = context.chart.ctx;
// //           const gradient = ctx.createLinearGradient(0, 0, 0, 300);
// //           gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
// //           gradient.addColorStop(1, 'rgba(59, 130, 246, 0.05)');
// //           return gradient;
// //         },
// //         borderColor: VIOLATION_COLORS['Without Helmet'].primary,
// //         borderWidth: 2,
// //         tension: 0.4,
// //         fill: true,
// //         pointBackgroundColor: '#ffffff',
// //         pointBorderColor: VIOLATION_COLORS['Without Helmet'].primary,
// //         pointBorderWidth: 2,
// //         pointRadius: 4,
// //         pointHoverRadius: 6
// //       },
// //     ],
// //   };

// //   const dailyChartData = {
// //     labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
// //     datasets: [
// //       {
// //         label: 'Violations by Day',
// //         data: timeAnalysis.daily || [],
// //         backgroundColor: (context) => {
// //           const ctx = context.chart.ctx;
// //           const gradient = ctx.createLinearGradient(0, 0, 0, 300);
// //           gradient.addColorStop(0, 'rgba(16, 185, 129, 0.3)');
// //           gradient.addColorStop(1, 'rgba(16, 185, 129, 0.05)');
// //           return gradient;
// //         },
// //         borderColor: VIOLATION_COLORS['Phone Usage'].primary,
// //         borderWidth: 2,
// //         borderRadius: 4,
// //         tension: 0.4,
// //         fill: true
// //       },
// //     ],
// //   };

// //   if (isLoading) {
// //     return (
// //       <div className="flex justify-center items-center h-screen bg-gray-50">
// //         <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <>
// //       <Navbar />
// //       <DashboardLayout>
// //         <div className="min-h-screen w-full bg-gray-50 p-6 pl-60 pt-8 pr-8">
// //           <div className="max-w-7xl mx-auto">
// //             <motion.header 
// //               className="mb-8 text-center" 
// //               initial={{ opacity: 0, y: -20 }} 
// //               animate={{ opacity: 1, y: 0 }} 
// //               transition={{ duration: 0.5 }}
// //             >
// //               <h1 className="text-3xl font-bold text-gray-800 mb-2">Traffic Violation Analytics</h1>
// //               <p className="text-lg text-gray-600">Comprehensive insights into traffic violation patterns</p>
// //             </motion.header>

// //             {/* Filter Section */}
// //             <motion.section 
// //               className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8"
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //             >
// //               <h2 className="text-xl font-semibold mb-4 text-gray-800">Filter Violations</h2>
              
// //               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //                 {/* Date Range Picker */}
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
// //                   <DatePicker
// //                     selectsRange={true}
// //                     startDate={startDate}
// //                     endDate={endDate}
// //                     onChange={(update) => setDateRange(update)}
// //                     isClearable={true}
// //                     placeholderText="Select date range"
// //                     className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                   />
// //                 </div>

// //                 {/* Time Range Slider */}
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-1">
// //                     Time Range: {startHour}:00 - {endHour}:00
// //                   </label>
// //                   <div className="relative py-4">
// //                     <div className="absolute h-1 bg-gray-200 rounded-full w-full top-1/2 transform -translate-y-1/2"></div>
// //                     <div 
// //                       className="absolute h-2 bg-blue-500 rounded-full top-1/2 transform -translate-y-1/2"
// //                       style={{ 
// //                         left: `${(startHour / 23) * 100}%`, 
// //                         width: `${((endHour - startHour) / 23) * 100}%` 
// //                       }}
// //                     ></div>
// //                     <div 
// //                       className="absolute w-5 h-5 bg-blue-600 rounded-full top-1/2 transform -translate-y-1/2 cursor-pointer z-20 shadow-md hover:shadow-lg transition-shadow"
// //                       style={{ left: `calc(${(startHour / 23) * 100}% - 10px)` }}
// //                       onMouseDown={(e) => {
// //                         const handleMove = (moveEvent) => {
// //                           const slider = e.target.closest('.relative');
// //                           const rect = slider.getBoundingClientRect();
// //                           const percent = Math.min(Math.max((moveEvent.clientX - rect.left) / rect.width, 0), 1);
// //                           const newValue = Math.round(percent * 23);
// //                           if (newValue <= endHour) {
// //                             setTimeRange([newValue, endHour]);
// //                           }
// //                         };
// //                         const handleUp = () => {
// //                           document.removeEventListener('mousemove', handleMove);
// //                           document.removeEventListener('mouseup', handleUp);
// //                         };
// //                         document.addEventListener('mousemove', handleMove);
// //                         document.addEventListener('mouseup', handleUp);
// //                       }}
// //                     ></div>
// //                     <div 
// //                       className="absolute w-5 h-5 bg-blue-600 rounded-full top-1/2 transform -translate-y-1/2 cursor-pointer z-20 shadow-md hover:shadow-lg transition-shadow"
// //                       style={{ left: `calc(${(endHour / 23) * 100}% - 10px)` }}
// //                       onMouseDown={(e) => {
// //                         const handleMove = (moveEvent) => {
// //                           const slider = e.target.closest('.relative');
// //                           const rect = slider.getBoundingClientRect();
// //                           const percent = Math.min(Math.max((moveEvent.clientX - rect.left) / rect.width, 0), 1);
// //                           const newValue = Math.round(percent * 23);
// //                           if (newValue >= startHour) {
// //                             setTimeRange([startHour, newValue]);
// //                           }
// //                         };
// //                         const handleUp = () => {
// //                           document.removeEventListener('mousemove', handleMove);
// //                           document.removeEventListener('mouseup', handleUp);
// //                         };
// //                         document.addEventListener('mousemove', handleMove);
// //                         document.addEventListener('mouseup', handleUp);
// //                       }}
// //                     ></div>
// //                   </div>
// //                   <div className="flex justify-between text-xs text-gray-600 mt-1">
// //                     {Object.entries(timeMarks).map(([hour, label]) => (
// //                       <span key={hour}>{label}</span>
// //                     ))}
// //                   </div>
// //                 </div>

// //                 {/* Violation Type Selector */}
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-1">Violation Type</label>
// //                   <Select
// //                     options={violationOptions}
// //                     value={violationOptions.find(option => option.value === selectedViolation)}
// //                     onChange={(selected) => setSelectedViolation(selected?.value || null)}
// //                     isClearable
// //                     placeholder="Select violation type"
// //                     className="react-select-container"
// //                     classNamePrefix="react-select"
// //                     styles={{
// //                       control: (base) => ({
// //                         ...base,
// //                         minHeight: '42px',
// //                         borderColor: '#D1D5DB',
// //                         '&:hover': {
// //                           borderColor: '#9CA3AF'
// //                         }
// //                       }),
// //                       option: (base, { isFocused, isSelected }) => ({
// //                         ...base,
// //                         backgroundColor: isSelected ? '#3B82F6' : isFocused ? '#EFF6FF' : 'white',
// //                         color: isSelected ? 'white' : isFocused ? '#1E40AF' : '#374151'
// //                       })
// //                     }}
// //                   />
// //                 </div>
// //               </div>
// //             </motion.section>

// //             {/* Summary Cards */}
// //             <motion.section 
// //               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //               transition={{ staggerChildren: 0.1 }}
// //             >
// //               {/* Total Violations Card */}
// //               <motion.div 
// //                 className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all"
// //                 whileHover={{ y: -5 }}
// //               >
// //                 <div className="flex items-center mb-4">
// //                   <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
// //                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
// //                     </svg>
// //                   </div>
// //                   <h3 className="ml-3 text-lg font-medium text-gray-700">Total Violations</h3>
// //                 </div>
// //                 <p className="text-3xl font-bold text-gray-800">{totalViolations}</p>
// //                 <p className="mt-2 text-sm text-gray-500">All recorded violations</p>
// //               </motion.div>

// //               {/* Violation Type Cards - Show top 3 individual violations */}
// //               {violationTypes
// //                 .filter(item => !item.name.includes('+'))
// //                 .slice(0, 3)
// //                 .map((item, idx) => (
// //                   <motion.div 
// //                     key={idx}
// //                     className="p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
// //                     style={{ 
// //                       backgroundColor: item.color.secondary,
// //                       borderTop: `4px solid ${item.color.primary}`
// //                     }}
// //                     whileHover={{ y: -5 }}
// //                   >
// //                     <div className="flex items-center mb-4">
// //                       <div 
// //                         className="p-3 rounded-lg text-white"
// //                         style={{ backgroundColor: item.color.primary }}
// //                       >
// //                         {VIOLATION_ICONS[item.name] || VIOLATION_ICONS['default']}
// //                       </div>
// //                       <h3 className="ml-3 text-lg font-medium" style={{ color: item.color.primary }}>{item.name}</h3>
// //                     </div>
// //                     <p className="text-3xl font-bold text-gray-800">{item.value}</p>
// //                     <div className="mt-2 flex justify-between items-center">
// //                       <span className="text-sm font-medium" style={{ color: item.color.primary }}>
// //                         {percentages[item.name]}% of total
// //                       </span>
// //                     </div>
// //                   </motion.div>
// //                 ))}
// //             </motion.section>

// //             {/* Gauge Charts Section - 4 in one row */}
// //             <motion.section 
// //               className="mb-8"
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //               transition={{ delay: 0.3 }}
// //             >
// //               <h2 className="text-2xl font-bold text-gray-800 mb-6">Violation Metrics</h2>
// //               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// //                 {violationTypes
// //                   .filter(item => !item.name.includes('+'))
// //                   .slice(0, 4) // Show only first 4 for the gauge row
// //                   .map((item, idx) => (
// //                     <motion.div 
// //                       key={idx}
// //                       className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all relative"
// //                       whileHover={{ y: -3 }}
// //                     >
// //                       <div className="absolute top-4 right-4 bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold">
// //                         {item.value} violations
// //                       </div>
// //                       <div className="flex items-center mb-4">
// //                         <div 
// //                           className="p-3 rounded-lg text-white"
// //                           style={{ backgroundColor: item.color.primary }}
// //                         >
// //                           {VIOLATION_ICONS[item.name] || VIOLATION_ICONS['default']}
// //                         </div>
// //                         <h3 className="ml-3 text-lg font-medium" style={{ color: item.color.primary }}>
// //                           {item.name}
// //                         </h3>
// //                       </div>
// //                       <div className="h-40">
// //                         <GaugeChart
// //                           id={`gauge-${idx}`}
// //                           nrOfLevels={20}
// //                           colors={item.color.gauge}
// //                           arcWidth={0.3}
// //                           percent={item.value / item.maxValue}
// //                           textColor={item.color.primary}
// //                           needleColor={item.color.primary}
// //                           needleBaseColor="#6B7280"
// //                           arcPadding={0.02}
// //                           cornerRadius={3}
// //                           formatTextValue={() => `${item.value}`}
// //                           hideText={true}
// //                         />
// //                       </div>
// //                       <div className="text-center mt-4">
// //                         <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium" 
// //                              style={{ backgroundColor: item.color.secondary, color: item.color.primary }}>
// //                           {percentages[item.name]}% of total
// //                         </div>
// //                       </div>
// //                     </motion.div>
// //                   ))}
// //               </div>
// //             </motion.section>

// //             {/* Combined Violations Section - Moved above distribution */}
// //             <motion.section 
// //               className="mb-8"
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //               transition={{ delay: 0.2 }}
// //             >
// //               <h2 className="text-2xl font-bold text-gray-800 mb-6">Combined Violations</h2>
// //               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //                 {violationTypes
// //                   .filter(item => item.name.includes('+'))
// //                   .map((item, idx) => (
// //                     <motion.div 
// //                       key={idx}
// //                       className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all"
// //                       whileHover={{ y: -3 }}
// //                     >
// //                       <div className="flex items-start mb-4">
// //                         <div 
// //                           className="p-3 rounded-lg text-white flex-shrink-0"
// //                           style={{ backgroundColor: item.color.primary }}
// //                         >
// //                           {VIOLATION_ICONS['default']}
// //                         </div>
// //                         <div className="ml-4">
// //                           <h3 className="text-lg font-semibold" style={{ color: item.color.primary }}>
// //                             {item.name}
// //                           </h3>
// //                           <p className="text-sm text-gray-600 mt-1">
// //                             Combination of {item.name.split(' + ').length} violations
// //                           </p>
// //                         </div>
// //                       </div>
// //                       <div className="flex justify-between items-end">
// //                         <div>
// //                           <p className="text-3xl font-bold text-gray-800">{item.value}</p>
// //                           <p className="text-sm text-gray-500 mt-1">
// //                             {percentages[item.name]}% of total violations
// //                           </p>
// //                         </div>
// //                         <div className="flex space-x-1">
// //                           {item.name.split(' + ').map((v, i) => (
// //                             <span 
// //                               key={i}
// //                               className="px-2 py-1 text-xs rounded-full"
// //                               style={{ 
// //                                 backgroundColor: VIOLATION_COLORS[v]?.secondary || '#F3F4F6',
// //                                 color: VIOLATION_COLORS[v]?.primary || '#6B7280'
// //                               }}
// //                             >
// //                               {v}
// //                             </span>
// //                           ))}
// //                         </div>
// //                       </div>
// //                     </motion.div>
// //                   ))}
// //               </div>
// //             </motion.section>

// //             {/* Charts Section */}
// //             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
// //               {/* Pie Chart */}
// //               <motion.div 
// //                 className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
// //                 initial={{ opacity: 0, x: -20 }}
// //                 animate={{ opacity: 1, x: 0 }}
// //               >
// //                 <div className="flex justify-between items-center mb-4">
// //                   <h2 className="text-xl font-semibold text-gray-800">Violation Distribution</h2>
// //                   <span className="text-sm text-gray-500">Percentage of total</span>
// //                 </div>
// //                 <div className="h-80 relative">
// //                   <Pie
// //                     data={pieChartData}
// //                     options={{
// //                       responsive: true,
// //                       maintainAspectRatio: false,
// //                       plugins: {
// //                         legend: { 
// //                           position: 'right',
// //                           labels: {
// //                             usePointStyle: true,
// //                             padding: 20,
// //                             font: {
// //                               family: 'Inter, sans-serif',
// //                               size: 12
// //                             },
// //                             generateLabels: (chart) => {
// //                               const data = chart.data;
// //                               if (data.labels.length && data.datasets.length) {
// //                                 return data.labels.map((label, i) => {
// //                                   const dataset = data.datasets[0];
// //                                   const value = dataset.data[i];
// //                                   const percentage = Math.round((value / dataset.data.reduce((a, b) => a + b, 0)) * 100);
                                  
// //                                   return {
// //                                     text: `${label}: ${value} (${percentage}%)`,
// //                                     fillStyle: dataset.backgroundColor[i],
// //                                     strokeStyle: dataset.borderColor,
// //                                     lineWidth: dataset.borderWidth,
// //                                     hidden: isNaN(dataset.data[i]) || chart.getDatasetMeta(0).data[i].hidden,
// //                                     index: i
// //                                   };
// //                                 });
// //                               }
// //                               return [];
// //                             }
// //                           }
// //                         },
// //                         tooltip: {
// //                           callbacks: {
// //                             label: function (context) {
// //                               const label = context.label || '';
// //                               const value = context.raw || 0;
// //                               const total = context.dataset.data.reduce((a, b) => a + b, 0);
// //                               const percentage = Math.round((value / total) * 100);
// //                               return `${label}: ${value} (${percentage}%)`;
// //                             }
// //                           },
// //                           bodyFont: {
// //                             family: 'Inter, sans-serif',
// //                             size: 14
// //                           },
// //                           displayColors: true,
// //                           usePointStyle: true,
// //                           padding: 12,
// //                           backgroundColor: 'rgba(31, 41, 55, 0.9)'
// //                         }
// //                       },
// //                       cutout: '65%',
// //                       animation: {
// //                         animateScale: true,
// //                         animateRotate: true
// //                       }
// //                     }}
// //                   />
// //                 </div>
// //               </motion.div>

// //               {/* Line Chart */}
// //               <motion.div 
// //                 className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
// //                 initial={{ opacity: 0, x: 20 }}
// //                 animate={{ opacity: 1, x: 0 }}
// //               >
// //                 <div className="flex justify-between items-center mb-4">
// //                   <h2 className="text-xl font-semibold text-gray-800">Hourly Violation Patterns</h2>
// //                   <span className="text-sm text-gray-500">24-hour period</span>
// //                 </div>
// //                 <div className="h-80">
// //                   <Line
// //                     data={timeChartData}
// //                     options={{
// //                       responsive: true,
// //                       maintainAspectRatio: false,
// //                       plugins: { 
// //                         legend: { display: false },
// //                         tooltip: {
// //                           bodyFont: {
// //                             family: 'Inter, sans-serif',
// //                             size: 14
// //                           },
// //                           backgroundColor: 'rgba(31, 41, 55, 0.9)',
// //                           displayColors: false,
// //                           callbacks: {
// //                             title: (context) => `Hour: ${context[0].label}`,
// //                             label: (context) => `Violations: ${context.raw}`
// //                           }
// //                         }
// //                       },
// //                       scales: {
// //                         y: { 
// //                           beginAtZero: true, 
// //                           title: { 
// //                             display: true, 
// //                             text: 'Number of Violations',
// //                             font: {
// //                               family: 'Inter, sans-serif'
// //                             }
// //                           },
// //                           grid: {
// //                             color: 'rgba(0, 0, 0, 0.05)'
// //                           }
// //                         },
// //                         x: { 
// //                           title: { 
// //                             display: true, 
// //                             text: 'Hour of Day',
// //                             font: {
// //                               family: 'Inter, sans-serif'
// //                             }
// //                           },
// //                           grid: {
// //                             display: false
// //                           }
// //                         }
// //                       },
// //                       elements: {
// //                         line: {
// //                           tension: 0.4
// //                         }
// //                       }
// //                     }}
// //                   />
// //                 </div>
// //               </motion.div>
// //             </div>

// //             {/* Additional Analysis Section */}
// //             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
// //               {/* Daily Chart */}
// //               <motion.div 
// //                 className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 col-span-2"
// //                 initial={{ opacity: 0, y: 20 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //               >
// //                 <div className="flex justify-between items-center mb-4">
// //                   <h2 className="text-xl font-semibold text-gray-800">Weekly Violation Trends</h2>
// //                   <span className="text-sm text-gray-500">7-day period</span>
// //                 </div>
// //                 <div className="h-80">
// //                   <Bar
// //                     data={dailyChartData}
// //                     options={{
// //                       responsive: true,
// //                       maintainAspectRatio: false,
// //                       plugins: { 
// //                         legend: { display: false },
// //                         tooltip: {
// //                           bodyFont: {
// //                             family: 'Inter, sans-serif',
// //                             size: 14
// //                           },
// //                           backgroundColor: 'rgba(31, 41, 55, 0.9)',
// //                           displayColors: false,
// //                           callbacks: {
// //                             title: (context) => `Day: ${context[0].label}`,
// //                             label: (context) => `Violations: ${context.raw}`
// //                           }
// //                         }
// //                       },
// //                       scales: {
// //                         y: { 
// //                           beginAtZero: true, 
// //                           title: { 
// //                             display: true, 
// //                             text: 'Number of Violations',
// //                             font: {
// //                               family: 'Inter, sans-serif'
// //                             }
// //                           },
// //                           grid: {
// //                             color: 'rgba(0, 0, 0, 0.05)'
// //                           }
// //                         },
// //                         x: { 
// //                           title: { 
// //                             display: true, 
// //                             text: 'Day of Week',
// //                             font: {
// //                               family: 'Inter, sans-serif'
// //                             }
// //                           },
// //                           grid: {
// //                             display: false
// //                           }
// //                         }
// //                       }
// //                     }}
// //                   />
// //                 </div>
// //               </motion.div>

// //               {/* Peak Time Analysis */}
// //               <motion.div 
// //                 className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
// //                 initial={{ opacity: 0, y: 20 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ delay: 0.2 }}
// //               >
// //                 <h2 className="text-xl font-semibold mb-6 text-gray-800">Peak Violation Times</h2>
// //                 <div className="space-y-4">
// //                   <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
// //                     <div className="flex items-center">
// //                       <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-4">
// //                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
// //                         </svg>
// //                       </div>
// //                       <div>
// //                         <h3 className="text-lg font-medium text-gray-700">Peak Hour</h3>
// //                         <p className="text-2xl font-bold text-gray-800">
// //                           {timeAnalysis.peakHour}:00 - {timeAnalysis.peakHour + 1}:00
// //                         </p>
// //                         <p className="text-sm text-gray-600 mt-1">
// //                           {timeAnalysis.hourly ? Math.max(...timeAnalysis.hourly) : 0} violations recorded
// //                         </p>
// //                       </div>
// //                     </div>
// //                   </div>
// //                   <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100 border border-green-200">
// //                     <div className="flex items-center">
// //                       <div className="p-2 rounded-full bg-green-100 text-green-600 mr-4">
// //                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
// //                         </svg>
// //                       </div>
// //                       <div>
// //                         <h3 className="text-lg font-medium text-gray-700">Peak Day</h3>
// //                         <p className="text-2xl font-bold text-gray-800">{timeAnalysis.peakDay}</p>
// //                         <p className="text-sm text-gray-600 mt-1">
// //                           {timeAnalysis.daily ? Math.max(...timeAnalysis.daily) : 0} violations recorded
// //                         </p>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </motion.div>
// //             </div>
// //           </div>
// //         </div>
// //       </DashboardLayout>

// //       <style jsx global>{`
// //         .react-select-container .react-select__control {
// //           min-height: 42px;
// //           border-color: #D1D5DB;
// //           transition: all 0.2s;
// //         }
// //         .react-select-container .react-select__control:hover {
// //           border-color: #9CA3AF;
// //         }
// //         .react-select-container .react-select__control--is-focused {
// //           border-color: #3B82F6;
// //           box-shadow: 0 0 0 1px #3B82F6;
// //         }
// //         .react-select-container .react-select__option--is-focused {
// //           background-color: #EFF6FF;
// //           color: #1E40AF;
// //         }
// //         .react-select-container .react-select__option--is-selected {
// //           background-color: #3B82F6;
// //           color: white;
// //         }
// //       `}</style>
// //     </>
// //   );
// // };

// // export default TrafficViolationDashboard;






import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';
import Navbar from '../components/Navbar';
import { Pie, Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Filler
} from 'chart.js';
import GaugeChart from 'react-gauge-chart';
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
  BarElement,
  Title,
  Filler
);

// Field name mapping (backend field -> display name)
const VIOLATION_FIELD_MAPPING = {
  noHelmet: 'Without Helmet',
  phoneUsage: 'Phone Usage',
  tripling: 'Tripling',
  stuntRiding: 'Stunt Riding',
  smoking: 'Smoking',
  fire: 'Fire'
};

const TrafficViolationDashboard = () => {
  const [statsData, setStatsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [totalViolations, setTotalViolations] = useState(0);
  const [violationTypes, setViolationTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeAnalysis, setTimeAnalysis] = useState({});

  // Filter states
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [timeRange, setTimeRange] = useState([0, 23]);
  const [startHour, endHour] = timeRange;
  const [selectedViolation, setSelectedViolation] = useState(null);

  // Professional color palette with harmonious combinations
  const VIOLATION_COLORS = {
    'Without Helmet': {
      primary: '#3B82F6', // Blue
      secondary: '#EFF6FF',
      gauge: ['#3B82F6', '#93C5FD'],
      chart: '#3B82F6'
    },
    'Phone Usage': {
      primary: '#10B981', // Emerald
      secondary: '#ECFDF5',
      gauge: ['#10B981', '#6EE7B7'],
      chart: '#10B981'
    },
    'Tripling': {
      primary: '#F59E0B', // Amber
      secondary: '#FFFBEB',
      gauge: ['#F59E0B', '#FCD34D'],
      chart: '#F59E0B'
    },
    'Stunt Riding': {
      primary: '#EF4444', // Red
      secondary: '#FEF2F2',
      gauge: ['#EF4444', '#FCA5A5'],
      chart: '#EF4444'
    },
    'Smoking': {
      primary: '#8B5CF6', // Violet
      secondary: '#F5F3FF',
      gauge: ['#8B5CF6', '#C4B5FD'],
      chart: '#8B5CF6'
    },
    'Fire': {
      primary: '#EC4899', // Pink
      secondary: '#FDF2F8',
      gauge: ['#EC4899', '#F9A8D4'],
      chart: '#EC4899'
    },
    'Without Helmet + Phone Usage': {
      primary: '#06B6D4', // Cyan
      secondary: '#ECFEFF',
      gauge: ['#06B6D4', '#67E8F9'],
      chart: 'linear-gradient(90deg, #3B82F6 0%, #10B981 100%)'
    },
    'Without Helmet + Tripling': {
      primary: '#F97316', // Orange
      secondary: '#FFF7ED',
      gauge: ['#F97316', '#FDBA74'],
      chart: 'linear-gradient(90deg, #3B82F6 0%, #F59E0B 100%)'
    },
    'Phone Usage + Smoking': {
      primary: '#14B8A6', // Teal
      secondary: '#F0FDFA',
      gauge: ['#14B8A6', '#5EEAD4'],
      chart: 'linear-gradient(90deg, #10B981 0%, #8B5CF6 100%)'
    },
    'Stunt Riding + Fire': {
      primary: '#D946EF', // Fuchsia
      secondary: '#FAF5FF',
      gauge: ['#D946EF', '#E9D5FF'],
      chart: 'linear-gradient(90deg, #EF4444 0%, #EC4899 100%)'
    }
  };

  // Professional icon components for each violation type
  const VIOLATION_ICONS = {
    'Without Helmet': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    'Phone Usage': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    'Tripling': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    'Stunt Riding': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    'Smoking': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 14V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2V14z" />
      </svg>
    ),
    'Fire': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
      </svg>
    ),
    'default': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    )
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://kaapaan-backend.onrender.com/api/violations');
        const data = await response.json();

        if (response.ok) {
          setStatsData(data);
          setFilteredData(data);
          processViolationData(data);
          analyzeTimeData(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [dateRange, timeRange, selectedViolation, statsData]);

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
        // Check each possible violation field
        Object.keys(VIOLATION_FIELD_MAPPING).forEach(field => {
          if (item[field]) {
            violations.push(VIOLATION_FIELD_MAPPING[field]);
          }
        });
        
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
  };

  const processViolationData = (data) => {
    const counts = {};
    
    data.forEach(item => {
      const violations = [];
      // Map backend fields to display names
      Object.keys(VIOLATION_FIELD_MAPPING).forEach(field => {
        if (item[field]) {
          violations.push(VIOLATION_FIELD_MAPPING[field]);
        }
      });

      if (violations.length > 0) {
        violations.forEach(v => {
          counts[v] = (counts[v] || 0) + 1;
        });
        
        if (violations.length > 1) {
          const comboKey = violations.join(' + ');
          counts[comboKey] = (counts[comboKey] || 0) + 1;
        }
      }
    });

    const violationData = Object.keys(counts).map(key => ({
      name: key,
      value: counts[key],
      maxValue: Math.max(...Object.values(counts)) * 1.2,
      color: VIOLATION_COLORS[key] || {
        primary: '#6B7280',
        secondary: '#F3F4F6',
        gauge: ['#6B7280', '#E5E7EB'],
        chart: '#6B7280'
      }
    }));

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
        hoverBorderColor: '#1F2937',
        hoverOffset: 10
      },
    ],
  };

  const timeChartData = {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    datasets: [
      {
        label: 'Violations by Hour',
        data: timeAnalysis.hourly || [],
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0.05)');
          return gradient;
        },
        borderColor: VIOLATION_COLORS['Without Helmet'].primary,
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#ffffff',
        pointBorderColor: VIOLATION_COLORS['Without Helmet'].primary,
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      },
    ],
  };

  const dailyChartData = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Violations by Day',
        data: timeAnalysis.daily || [],
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, 'rgba(16, 185, 129, 0.3)');
          gradient.addColorStop(1, 'rgba(16, 185, 129, 0.05)');
          return gradient;
        },
        borderColor: VIOLATION_COLORS['Phone Usage'].primary,
        borderWidth: 2,
        borderRadius: 4,
        tension: 0.4,
        fill: true
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
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Traffic Violation Analytics</h1>
              <p className="text-lg text-gray-600">Comprehensive insights into traffic violation patterns</p>
            </motion.header>

            {/* Filter Section */}
            <motion.section 
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Filter Violations</h2>
              
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
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Time Range Slider - Updated for Mobile Responsiveness */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time Range: {startHour}:00 - {endHour}:00
                  </label>
                  <div className="relative py-4">
                    {/* Background track */}
                    <div className="absolute h-1 bg-gray-200 rounded-full w-full top-1/2 transform -translate-y-1/2"></div>
                    
                    {/* Active range */}
                    <div 
                      className="absolute h-2 bg-blue-500 rounded-full top-1/2 transform -translate-y-1/2"
                      style={{ 
                        left: `${(startHour / 23) * 100}%`, 
                        width: `${((endHour - startHour) / 23) * 100}%` 
                      }}
                    ></div>
                    
                    {/* Start handle */}
                    <div 
                      className="absolute w-5 h-5 bg-blue-600 rounded-full top-1/2 transform -translate-y-1/2 cursor-pointer z-20 shadow-md hover:shadow-lg transition-shadow touch-none"
                      style={{ left: `calc(${(startHour / 23) * 100}% - 10px)` }}
                      onTouchStart={(e) => {
                        e.preventDefault();
                        const slider = e.target.closest('.relative');
                        const rect = slider.getBoundingClientRect();
                        
                        const handleMove = (moveEvent) => {
                          const clientX = moveEvent.touches ? moveEvent.touches[0].clientX : moveEvent.clientX;
                          const percent = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
                          const newValue = Math.round(percent * 23);
                          if (newValue <= endHour) {
                            setTimeRange([newValue, endHour]);
                          }
                        };
                        
                        const handleEnd = () => {
                          document.removeEventListener('touchmove', handleMove);
                          document.removeEventListener('touchend', handleEnd);
                          document.removeEventListener('mousemove', handleMove);
                          document.removeEventListener('mouseup', handleEnd);
                        };
                        
                        document.addEventListener('touchmove', handleMove, { passive: false });
                        document.addEventListener('touchend', handleEnd);
                        document.addEventListener('mousemove', handleMove);
                        document.addEventListener('mouseup', handleEnd);
                      }}
                      onMouseDown={(e) => {
                        const slider = e.target.closest('.relative');
                        const rect = slider.getBoundingClientRect();
                        
                        const handleMove = (moveEvent) => {
                          const clientX = moveEvent.touches ? moveEvent.touches[0].clientX : moveEvent.clientX;
                          const percent = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
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
                    
                    {/* End handle */}
                    <div 
                      className="absolute w-5 h-5 bg-blue-600 rounded-full top-1/2 transform -translate-y-1/2 cursor-pointer z-20 shadow-md hover:shadow-lg transition-shadow touch-none"
                      style={{ left: `calc(${(endHour / 23) * 100}% - 10px)` }}
                      onTouchStart={(e) => {
                        e.preventDefault();
                        const slider = e.target.closest('.relative');
                        const rect = slider.getBoundingClientRect();
                        
                        const handleMove = (moveEvent) => {
                          const clientX = moveEvent.touches ? moveEvent.touches[0].clientX : moveEvent.clientX;
                          const percent = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
                          const newValue = Math.round(percent * 23);
                          if (newValue >= startHour) {
                            setTimeRange([startHour, newValue]);
                          }
                        };
                        
                        const handleEnd = () => {
                          document.removeEventListener('touchmove', handleMove);
                          document.removeEventListener('touchend', handleEnd);
                          document.removeEventListener('mousemove', handleMove);
                          document.removeEventListener('mouseup', handleEnd);
                        };
                        
                        document.addEventListener('touchmove', handleMove, { passive: false });
                        document.addEventListener('touchend', handleEnd);
                        document.addEventListener('mousemove', handleMove);
                        document.addEventListener('mouseup', handleEnd);
                      }}
                      onMouseDown={(e) => {
                        const slider = e.target.closest('.relative');
                        const rect = slider.getBoundingClientRect();
                        
                        const handleMove = (moveEvent) => {
                          const clientX = moveEvent.touches ? moveEvent.touches[0].clientX : moveEvent.clientX;
                          const percent = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
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
                    className="react-select-container"
                    classNamePrefix="react-select"
                    styles={{
                      control: (base) => ({
                        ...base,
                        minHeight: '42px',
                        borderColor: '#D1D5DB',
                        '&:hover': {
                          borderColor: '#9CA3AF'
                        }
                      }),
                      option: (base, { isFocused, isSelected }) => ({
                        ...base,
                        backgroundColor: isSelected ? '#3B82F6' : isFocused ? '#EFF6FF' : 'white',
                        color: isSelected ? 'white' : isFocused ? '#1E40AF' : '#374151'
                      })
                    }}
                  />
                </div>
              </div>
            </motion.section>

            {/* Summary Cards */}
            <motion.section 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {/* Total Violations Card */}
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all"
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

              {/* Violation Type Cards - Show top 3 individual violations */}
              {violationTypes
                .filter(item => !item.name.includes('+'))
                .slice(0, 3)
                .map((item, idx) => (
                  <motion.div 
                    key={idx}
                    className="p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
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
                        {VIOLATION_ICONS[item.name] || VIOLATION_ICONS['default']}
                      </div>
                      <h3 className="ml-3 text-lg font-medium" style={{ color: item.color.primary }}>{item.name}</h3>
                    </div>
                    <p className="text-3xl font-bold text-gray-800">{item.value}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-sm font-medium" style={{ color: item.color.primary }}>
                        {percentages[item.name]}% of total
                      </span>
                    </div>
                  </motion.div>
                ))}
            </motion.section>

            {/* Gauge Charts Section - 4 in one row */}
            <motion.section 
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Violation Metrics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {violationTypes
                  .filter(item => !item.name.includes('+'))
                  .slice(0, 4) // Show only first 4 for the gauge row
                  .map((item, idx) => (
                    <motion.div 
                      key={idx}
                      className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all relative"
                      whileHover={{ y: -3 }}
                    >
                      <div className="absolute top-4 right-4 bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold">
                        {item.value} violations
                      </div>
                      <div className="flex items-center mb-4">
                        <div 
                          className="p-3 rounded-lg text-white"
                          style={{ backgroundColor: item.color.primary }}
                        >
                          {VIOLATION_ICONS[item.name] || VIOLATION_ICONS['default']}
                        </div>
                        <h3 className="ml-3 text-lg font-medium" style={{ color: item.color.primary }}>
                          {item.name}
                        </h3>
                      </div>
                      <div className="h-40">
                        <GaugeChart
                          id={`gauge-${idx}`}
                          nrOfLevels={20}
                          colors={item.color.gauge}
                          arcWidth={0.3}
                          percent={item.value / item.maxValue}
                          textColor={item.color.primary}
                          needleColor={item.color.primary}
                          needleBaseColor="#6B7280"
                          arcPadding={0.02}
                          cornerRadius={3}
                          formatTextValue={() => `${item.value}`}
                          hideText={true}
                        />
                      </div>
                      <div className="text-center mt-4">
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium" 
                             style={{ backgroundColor: item.color.secondary, color: item.color.primary }}>
                          {percentages[item.name]}% of total
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.section>

            {/* Combined Violations Section - Moved above distribution */}
            <motion.section 
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Combined Violations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {violationTypes
                  .filter(item => item.name.includes('+'))
                  .map((item, idx) => (
                    <motion.div 
                      key={idx}
                      className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all"
                      whileHover={{ y: -3 }}
                    >
                      <div className="flex items-start mb-4">
                        <div 
                          className="p-3 rounded-lg text-white flex-shrink-0"
                          style={{ backgroundColor: item.color.primary }}
                        >
                          {VIOLATION_ICONS['default']}
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-semibold" style={{ color: item.color.primary }}>
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Combination of {item.name.split(' + ').length} violations
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-3xl font-bold text-gray-800">{item.value}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            {percentages[item.name]}% of total violations
                          </p>
                        </div>
                        <div className="flex space-x-1">
                          {item.name.split(' + ').map((v, i) => (
                            <span 
                              key={i}
                              className="px-2 py-1 text-xs rounded-full"
                              style={{ 
                                backgroundColor: VIOLATION_COLORS[v]?.secondary || '#F3F4F6',
                                color: VIOLATION_COLORS[v]?.primary || '#6B7280'
                              }}
                            >
                              {v}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
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
                <div className="h-80 relative">
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
                              family: 'Inter, sans-serif',
                              size: 12
                            },
                            generateLabels: (chart) => {
                              const data = chart.data;
                              if (data.labels.length && data.datasets.length) {
                                return data.labels.map((label, i) => {
                                  const dataset = data.datasets[0];
                                  const value = dataset.data[i];
                                  const percentage = Math.round((value / dataset.data.reduce((a, b) => a + b, 0)) * 100);
                                  
                                  return {
                                    text: `${label}: ${value} (${percentage}%)`,
                                    fillStyle: dataset.backgroundColor[i],
                                    strokeStyle: dataset.borderColor,
                                    lineWidth: dataset.borderWidth,
                                    hidden: isNaN(dataset.data[i]) || chart.getDatasetMeta(0).data[i].hidden,
                                    index: i
                                  };
                                });
                              }
                              return [];
                            }
                          }
                        },
                        tooltip: {
                          callbacks: {
                            label: function (context) {
                              const label = context.label || '';
                              const value = context.raw || 0;
                              const total = context.dataset.data.reduce((a, b) => a + b, 0);
                              const percentage = Math.round((value / total) * 100);
                              return `${label}: ${value} (${percentage}%)`;
                            }
                          },
                          bodyFont: {
                            family: 'Inter, sans-serif',
                            size: 14
                          },
                          displayColors: true,
                          usePointStyle: true,
                          padding: 12,
                          backgroundColor: 'rgba(31, 41, 55, 0.9)'
                        }
                      },
                      cutout: '65%',
                      animation: {
                        animateScale: true,
                        animateRotate: true
                      }
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
                          },
                          backgroundColor: 'rgba(31, 41, 55, 0.9)',
                          displayColors: false,
                          callbacks: {
                            title: (context) => `Hour: ${context[0].label}`,
                            label: (context) => `Violations: ${context.raw}`
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

            {/* Additional Analysis Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* Daily Chart */}
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 col-span-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Weekly Violation Trends</h2>
                  <span className="text-sm text-gray-500">7-day period</span>
                </div>
                <div className="h-80">
                  <Bar
                    data={dailyChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { 
                        legend: { display: false },
                        tooltip: {
                          bodyFont: {
                            family: 'Inter, sans-serif',
                            size: 14
                          },
                          backgroundColor: 'rgba(31, 41, 55, 0.9)',
                          displayColors: false,
                          callbacks: {
                            title: (context) => `Day: ${context[0].label}`,
                            label: (context) => `Violations: ${context.raw}`
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
                            text: 'Day of Week',
                            font: {
                              family: 'Inter, sans-serif'
                            }
                          },
                          grid: {
                            display: false
                          }
                        }
                      }
                    }}
                  />
                </div>
              </motion.div>

              {/* Peak Time Analysis */}
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-xl font-semibold mb-6 text-gray-800">Peak Violation Times</h2>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
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
                        <p className="text-sm text-gray-600 mt-1">
                          {timeAnalysis.hourly ? Math.max(...timeAnalysis.hourly) : 0} violations recorded
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100 border border-green-200">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-green-100 text-green-600 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-700">Peak Day</h3>
                        <p className="text-2xl font-bold text-gray-800">{timeAnalysis.peakDay}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {timeAnalysis.daily ? Math.max(...timeAnalysis.daily) : 0} violations recorded
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </DashboardLayout>

      <style jsx global>{`
        .react-select-container .react-select__control {
          min-height: 42px;
          border-color: #D1D5DB;
          transition: all 0.2s;
        }
        .react-select-container .react-select__control:hover {
          border-color: #9CA3AF;
        }
        .react-select-container .react-select__control--is-focused {
          border-color: #3B82F6;
          box-shadow: 0 0 0 1px #3B82F6;
        }
        .react-select-container .react-select__option--is-focused {
          background-color: #EFF6FF;
          color: #1E40AF;
        }
        .react-select-container .react-select__option--is-selected {
          background-color: #3B82F6;
          color: white;
        }
      `}</style>
    </>
  );
};

export default TrafficViolationDashboard;