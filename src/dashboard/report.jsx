
// // import React, { useEffect, useState } from 'react';
// // import { motion } from 'framer-motion';
// // import DashboardLayout from '../components/DashboardLayout';
// // import Navbar from '../components/Navbar';
// // import { Pie, Bar, Line } from 'react-chartjs-2';
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
// //   Title
// // } from 'chart.js';
// // import DatePicker from 'react-datepicker';
// // import 'react-datepicker/dist/react-datepicker.css';
// // import Select from 'react-select';
// // import { FiAlertTriangle, FiClock, FiCalendar, FiDownload, FiTrash2, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
// // import * as htmlToImage from 'html-to-image';
// // import { jsPDF } from 'jspdf';

// // ChartJS.register(
// //   ArcElement,
// //   Tooltip,
// //   Legend,
// //   CategoryScale,
// //   LinearScale,
// //   PointElement,
// //   LineElement,
// //   BarElement,
// //   Title
// // );

// // const VIOLATION_FIELD_MAPPING = {
// //   phoneUsage: 'Phone Usage',
// //   stuntRiding: 'Stunt Riding',
// //   smoking: 'Smoking',
// //   fire: 'Fire',
// //   withHelmet: 'With Helmet',
// //   withoutHelmet: 'Without Helmet',
// //   triples: 'Triples'
// // };

// // const TrafficViolationDashboard = () => {
// //   const [statsData, setStatsData] = useState([]);
// //   const [filteredData, setFilteredData] = useState([]);
// //   const [totalViolations, setTotalViolations] = useState(0);
// //   const [violationTypes, setViolationTypes] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [timeAnalysis, setTimeAnalysis] = useState({});
// //   const [violationImages, setViolationImages] = useState([]);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [itemsPerPage] = useState(20);
// //   const [isDeleting, setIsDeleting] = useState(false);
// //   const [deletingId, setDeletingId] = useState(null);
// //   const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

// //   // Filter states
// //   const [dateRange, setDateRange] = useState([null, null]);
// //   const [startDate, endDate] = dateRange;
// //   const [timeRange, setTimeRange] = useState([0, 23]);
// //   const [startHour, endHour] = timeRange;
// //   const [selectedViolation, setSelectedViolation] = useState(null);

// //   // Professional, high-contrast color palette
// //   const VIOLATION_COLORS = {
// //     'Without Helmet': {
// //       primary: '#E63946',
// //       secondary: '#FFCAD4',
// //       text: '#5C0000',
// //       chartColor: 'rgba(230, 57, 70, 0.8)'
// //     },
// //     'Phone Usage': {
// //       primary: '#457B9D',
// //       secondary: '#A8DADC',
// //       text: '#1D3557',
// //       chartColor: 'rgba(69, 123, 157, 0.8)'
// //     },
// //     'Triples': {
// //       primary: '#FF9F1C',
// //       secondary: '#FFBF69',
// //       text: '#8B5000',
// //       chartColor: 'rgba(255, 159, 28, 0.8)'
// //     },
// //     'Stunt Riding': {
// //       primary: '#2A9D8F',
// //       secondary: '#8AC6AF',
// //       text: '#1D4C4F',
// //       chartColor: 'rgba(42, 157, 143, 0.8)'
// //     },
// //     'Smoking': {
// //       primary: '#7209B7',
// //       secondary: '#C77DFF',
// //       text: '#3A0CA3',
// //       chartColor: 'rgba(114, 9, 183, 0.8)'
// //     },
// //     'Fire': {
// //       primary: '#F72585',
// //       secondary: '#FF70A6',
// //       text: '#72063C',
// //       chartColor: 'rgba(247, 37, 133, 0.8)'
// //     },
// //     'With Helmet': {
// //       primary: '#4CC9F0',
// //       secondary: '#B8F2E6',
// //       text: '#05668D',
// //       chartColor: 'rgba(76, 201, 240, 0.8)'
// //     }
// //   };

// //   useEffect(() => {
// //     fetchData();
// //   }, []);

// //   useEffect(() => {
// //     applyFilters();
// //   }, [dateRange, timeRange, selectedViolation, statsData]);

// //   const fetchData = async () => {
// //     try {
// //       setIsLoading(true);
// //       const response = await fetch('https://kaapaan-backend.onrender.com/api/violations/all');
// //       const data = await response.json();

// //       if (response.ok) {
// //         setStatsData(data);
// //         setFilteredData(data);
// //         processViolationData(data);
// //         analyzeTimeData(data);
// //         setViolationImages(data.map(v => ({
// //           imageUrl: v.imageUrl,
// //           plateImageUrl: v.plateImageUrl,
// //           type: getViolationType(v),
// //           time: new Date(v.analyzedAt).toLocaleString(),
// //           id: v._id,
// //           analyzedAt: v.analyzedAt,
// //           publicId: v.publicId,
// //           platePublicId: v.platePublicId,
// //           details: getViolationDetails(v)
// //         })));
// //       }
// //     } catch (error) {
// //       console.error('Error fetching data:', error);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const getViolationDetails = (item) => {
// //     const details = [];
// //     Object.keys(VIOLATION_FIELD_MAPPING).forEach(field => {
// //       if (item[field]) {
// //         details.push(VIOLATION_FIELD_MAPPING[field]);
// //       }
// //     });
// //     return details.length > 0 ? details.join(', ') : 'No specific violation detected';
// //   };

// //   const applyFilters = () => {
// //     let filtered = [...statsData];

// //     if (startDate && endDate) {
// //       filtered = filtered.filter(item => {
// //         const itemDate = new Date(item.analyzedAt);
// //         return itemDate >= startDate && itemDate <= endDate;
// //       });
// //     }

// //     filtered = filtered.filter(item => {
// //       const itemHour = new Date(item.analyzedAt).getHours();
// //       return itemHour >= startHour && itemHour <= endHour;
// //     });

// //     if (selectedViolation) {
// //       filtered = filtered.filter(item => {
// //         const violations = [];
// //         Object.keys(VIOLATION_FIELD_MAPPING).forEach(field => {
// //           if (item[field]) {
// //             violations.push(VIOLATION_FIELD_MAPPING[field]);
// //           }
// //         });
// //         return violations.includes(selectedViolation);
// //       });
// //     }

// //     setFilteredData(filtered);
// //     processViolationData(filtered);
// //     analyzeTimeData(filtered);
    
// //     setViolationImages(filtered.map(v => ({
// //       imageUrl: v.imageUrl,
// //       plateImageUrl: v.plateImageUrl,
// //       type: getViolationType(v),
// //       time: new Date(v.analyzedAt).toLocaleString(),
// //       id: v._id,
// //       analyzedAt: v.analyzedAt,
// //       publicId: v.publicId,
// //       platePublicId: v.platePublicId,
// //       details: getViolationDetails(v)
// //     })));
    
// //     setCurrentPage(1);
// //   };

// //   const getViolationType = (item) => {
// //     const types = [];
// //     Object.keys(VIOLATION_FIELD_MAPPING).forEach(field => {
// //       if (item[field]) {
// //         types.push(VIOLATION_FIELD_MAPPING[field]);
// //       }
// //     });
// //     return types.length > 0 ? types.join(', ') : 'None';
// //   };

// //   const processViolationData = (data) => {
// //     const counts = {};
    
// //     data.forEach(item => {
// //       Object.keys(VIOLATION_FIELD_MAPPING).forEach(field => {
// //         if (item[field]) {
// //           const violationName = VIOLATION_FIELD_MAPPING[field];
// //           counts[violationName] = (counts[violationName] || 0) + 1;
// //         }
// //       });
// //     });

// //     const violationData = Object.keys(counts).map(key => ({
// //       name: key,
// //       value: counts[key],
// //       color: VIOLATION_COLORS[key] || {
// //         primary: '#64748B',
// //         secondary: '#F1F5F9',
// //         text: '#334155'
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

// //   const handleDeleteImage = async (imageId, publicId, platePublicId) => {
// //     if (isDeleting) return;
    
// //     try {
// //       setIsDeleting(true);
// //       setDeletingId(imageId);
      
// //       const deleteResponse = await fetch('https://kaapaan-backend.onrender.com/api/violations/delete', {
// //         method: 'DELETE',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({
// //           id: imageId,
// //           publicId: publicId,
// //           platePublicId: platePublicId
// //         }),
// //       });

// //       if (deleteResponse.ok) {
// //         setViolationImages(prevImages => prevImages.filter(img => img.id !== imageId));
// //         setStatsData(prevData => prevData.filter(item => item._id !== imageId));
// //         setFilteredData(prevData => prevData.filter(item => item._id !== imageId));
        
// //         processViolationData(statsData.filter(item => item._id !== imageId));
// //         analyzeTimeData(statsData.filter(item => item._id !== imageId));
// //       } else {
// //         const errorData = await deleteResponse.json();
// //         console.error('Error deleting:', errorData.message);
// //         alert('Failed to delete violation. Please try again.');
// //       }
// //     } catch (error) {
// //       console.error('Error deleting image:', error);
// //       alert('An error occurred while deleting. Please try again.');
// //     } finally {
// //       setIsDeleting(false);
// //       setDeletingId(null);
// //     }
// //   };

// //   const downloadCSVReport = () => {
// //     const headers = ['Date', 'Time', 'Violation Type', 'Details', 'Image URL', 'Plate Image URL'];
    
// //     const rows = filteredData.map(violation => {
// //       const date = new Date(violation.analyzedAt);
// //       const formattedDate = date.toLocaleDateString();
// //       const formattedTime = date.toLocaleTimeString();
// //       const violationType = getViolationType(violation);
// //       const details = getViolationDetails(violation);
      
// //       return [
// //         formattedDate,
// //         formattedTime,
// //         violationType,
// //         details,
// //         violation.imageUrl,
// //         violation.plateImageUrl || 'N/A'
// //       ].join(',');
// //     });

// //     const csvContent = [headers.join(','), ...rows].join('\n');
// //     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
// //     const url = URL.createObjectURL(blob);
// //     const link = document.createElement('a');
// //     link.setAttribute('href', url);
// //     link.setAttribute('download', `violation_report_${new Date().toISOString().slice(0,10)}.csv`);
// //     link.style.visibility = 'hidden';
// //     document.body.appendChild(link);
// //     link.click();
// //     document.body.removeChild(link);
// //   };




// //   const generatePDFReport = async () => {
// //     setIsGeneratingPDF(true);
// //     try {
// //       const doc = new jsPDF({
// //         orientation: 'landscape',
// //         unit: 'mm',
// //         format: 'a4'
// //       });

// //       // Add title and date
// //       doc.setFontSize(18);
// //       doc.setTextColor(40);
// //       doc.setFont('helvetica', 'bold');
// //       doc.text('Traffic Violation Report', 148, 15, { align: 'center' });
      
// //       doc.setFontSize(12);
// //       doc.setTextColor(100);
// //       doc.setFont('helvetica', 'normal');
// //       doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 148, 22, { align: 'center' });

// //       // Add filter information
// //       doc.setFontSize(10);
// //       doc.text('Filters Applied:', 15, 30);
      
// //       let filterText = 'All violations';
// //       if (startDate && endDate) {
// //         filterText += ` | Date: ${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
// //       }
// //       if (selectedViolation) {
// //         filterText += ` | Violation: ${selectedViolation}`;
// //       }
// //       filterText += ` | Time: ${startHour}:00 - ${endHour}:00`;
      
// //       doc.text(filterText, 15, 35);

// //       // Add summary statistics
// //       doc.setFontSize(12);
// //       doc.setTextColor(40);
// //       doc.text('Summary Statistics', 15, 45);
      
// //       doc.setFontSize(10);
// //       doc.text(`Total Violations: ${totalViolations}`, 15, 52);
      
// //       let yPos = 52;
// //       violationTypes.slice(0, 3).forEach((item, idx) => {
// //         yPos += 7;
// //         doc.text(`${item.name}: ${item.value} (${((item.value / totalViolations) * 100).toFixed(1)}%)`, 15, yPos);
// //       });

// //       // Add each violation with images and details
// //       const imagesPerRow = 5;
// //       const imageWidth = 45; // mm
// //       const imageHeight = 30; // mm
// //       const marginX = 15; // mm
// //       const marginY = 70; // mm
// //       const gapX = 5; // mm between images
// //       const gapY = 30; // mm between rows
// //       const textHeight = 15; // mm for text below image

// //       let currentX = marginX;
// //       let currentY = marginY;
// //       let itemsOnCurrentRow = 0;

// //       for (let i = 0; i < filteredData.length; i++) {
// //         const violation = filteredData[i];
// //         const formattedDateTime = new Date(violation.analyzedAt).toLocaleString();
// //         const violationType = getViolationType(violation);
// //         const details = getViolationDetails(violation);

// //         // Check if we need a new page
// //         if (currentY + imageHeight + textHeight > 190) { // A4 landscape height is 210mm
// //           doc.addPage('landscape');
// //           currentX = marginX;
// //           currentY = 20; // Reset Y position for new page
// //           itemsOnCurrentRow = 0;
// //         }

// //         try {
// //           // Load violation image
// //           const violationImg = new Image();
// //           violationImg.crossOrigin = 'Anonymous';
// //           violationImg.src = violation.imageUrl;
          
// //           await new Promise((resolve) => {
// //             violationImg.onload = resolve;
// //             violationImg.onerror = resolve;
// //           });

// //           // Add violation image to PDF if it loaded successfully
// //           if (violationImg.width > 0) {
// //             doc.addImage(
// //               violationImg, 
// //               'JPEG', 
// //               currentX, 
// //               currentY, 
// //               imageWidth, 
// //               imageHeight
// //             );
// //           } else {
// //             doc.text('Image not available', currentX, currentY + imageHeight/2);
// //           }

// //           // Add violation details below image
// //           doc.setFontSize(8);
// //           doc.setTextColor(0);
          
// //           // Violation type
// //           doc.text(
// //             doc.splitTextToSize(violationType, imageWidth),
// //             currentX,
// //             currentY + imageHeight + 5
// //           );
          
// //           // Timestamp
// //           doc.text(
// //             doc.splitTextToSize(formattedDateTime, imageWidth),
// //             currentX,
// //             currentY + imageHeight + 10
// //           );

// //           // If there's a plate image, add it to the right of the violation image
// //           if (violation.plateImageUrl) {
// //             const plateImg = new Image();
// //             plateImg.crossOrigin = 'Anonymous';
// //             plateImg.src = violation.plateImageUrl;
            
// //             await new Promise((resolve) => {
// //               plateImg.onload = resolve;
// //               plateImg.onerror = resolve;
// //             });

// //             if (plateImg.width > 0) {
// //               const plateWidth = 20; // mm
// //               const plateHeight = (plateImg.height / plateImg.width) * plateWidth;
// //               doc.addImage(
// //                 plateImg, 
// //                 'JPEG', 
// //                 currentX + imageWidth - plateWidth, 
// //                 currentY + imageHeight - plateHeight, 
// //                 plateWidth, 
// //                 plateHeight
// //               );
// //             }
// //           }
// //         } catch (error) {
// //           console.error('Error adding image to PDF:', error);
// //           doc.text('Image load error', currentX, currentY + imageHeight/2);
// //         }

// //         // Move to next position
// //         itemsOnCurrentRow++;
// //         if (itemsOnCurrentRow >= imagesPerRow) {
// //           currentX = marginX;
// //           currentY += imageHeight + textHeight + gapY;
// //           itemsOnCurrentRow = 0;
// //         } else {
// //           currentX += imageWidth + gapX;
// //         }
// //       }

// //       // Save the PDF
// //       doc.save(`violation_report_${new Date().toISOString().slice(0,10)}.pdf`);
// //     } catch (error) {
// //       console.error('Error generating PDF:', error);
// //       alert('Failed to generate PDF. Please try again.');
// //     } finally {
// //       setIsGeneratingPDF(false);
// //     }
// //   };

// //   const violationOptions = [
// //     { value: null, label: 'All Violation Types' },
// //     ...Object.values(VIOLATION_FIELD_MAPPING).map(name => ({
// //       value: name,
// //       label: name
// //     }))
// //   ];

// //   const timeMarks = {
// //     0: '12 AM',
// //     6: '6 AM',
// //     12: '12 PM',
// //     18: '6 PM',
// //     23: '11 PM'
// //   };

// //   const indexOfLastItem = currentPage * itemsPerPage;
// //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// //   const currentImages = violationImages.slice(indexOfFirstItem, indexOfLastItem);
// //   const totalPages = Math.ceil(violationImages.length / itemsPerPage);

// //   const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
// //       },
// //     ],
// //   };

// //   const barChartData = {
// //     labels: violationTypes.map(item => item.name),
// //     datasets: [
// //       {
// //         label: 'Violation Count',
// //         data: violationTypes.map(item => item.value),
// //         backgroundColor: violationTypes.map(item => item.color.primary),
// //         borderColor: violationTypes.map(item => item.color.primary),
// //         borderWidth: 1,
// //       },
// //     ],
// //   };

// //   const timeChartData = {
// //     labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
// //     datasets: [
// //       {
// //         label: 'Violations by Hour',
// //         data: timeAnalysis.hourly || [],
// //         backgroundColor: 'rgba(69, 123, 157, 0.1)',
// //         borderColor: '#457B9D',
// //         borderWidth: 2,
// //         tension: 0.3,
// //         fill: true,
// //         pointBackgroundColor: '#ffffff',
// //         pointBorderColor: '#457B9D',
// //         pointBorderWidth: 2
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
// //         <div className="min-h-screen w-full bg-gray-40 p-4 md:p-6 ml-[100px] px-8 py-10 transform scale-[.93] origin-top-left">
// //           <div className="max-w-7xl mx-auto">
// //             {/* Header Section */}
// //             <motion.header 
// //               className="mb-8"
// //               initial={{ opacity: 0, y: -20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.5 }}
// //             >
// //               <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-2">Traffic Violation Analytics</h1>
// //               <p className="text-blue-700">Comprehensive analysis of traffic violations</p>
// //             </motion.header>

// //             {/* Filter Section */}
// //             <motion.section 
// //               className="bg-white p-4 md:p-6 rounded-lg shadow border border-gray-200 mb-6"
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //             >
// //               <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
// //                 <h2 className="text-lg md:text-xl font-semibold text-blue-900">Filter Violations</h2>
// //                 <div className="flex gap-2">
// //                   <button
// //                     onClick={downloadCSVReport}
// //                     className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center text-sm md:text-base shadow-sm"
// //                   >
// //                     <FiDownload className="mr-2" />
// //                     Export CSV
// //                   </button>
// //                   <button
// //                     onClick={generatePDFReport}
// //                     disabled={isGeneratingPDF}
// //                     className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center text-sm md:text-base shadow-sm disabled:opacity-50"
// //                   >
// //                     {isGeneratingPDF ? (
// //                       <svg className="animate-spin h-4 w-4 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
// //                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// //                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// //                       </svg>
// //                     ) : (
// //                       <FiDownload className="mr-2" />
// //                     )}
// //                     Export PDF
// //                   </button>
// //                 </div>
// //               </div>
              
// //               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
// //                 {/* Date Range Picker */}
// //                 <div>
// //                   <label className="block text-sm font-medium text-blue-900 mb-1">Date Range</label>
// //                   <div className="relative">
// //                     <DatePicker
// //                       selectsRange={true}
// //                       startDate={startDate}
// //                       endDate={endDate}
// //                       onChange={(update) => setDateRange(update)}
// //                       isClearable={true}
// //                       placeholderText="Select date range"
// //                       className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
// //                     />
// //                     <FiCalendar className="absolute left-3 top-2.5 text-gray-400" />
// //                   </div>
// //                 </div>

// //                 {/* Time Range Slider */}
// //                 <div>
// //                   <label className="block text-sm font-medium text-blue-900 mb-1">
// //                     Time Range: {startHour}:00 - {endHour}:00
// //                   </label>
// //                   <div className="relative py-4">
// //                     <div className="absolute h-1.5 bg-gray-200 rounded-full w-full top-1/2 transform -translate-y-1/2"></div>
// //                     <div 
// //                       className="absolute h-1.5 bg-blue-600 rounded-full top-1/2 transform -translate-y-1/2"
// //                       style={{ 
// //                         left: `${(startHour / 23) * 100}%`, 
// //                         width: `${((endHour - startHour) / 23) * 100}%` 
// //                       }}
// //                     ></div>
// //                     <div 
// //                       className="absolute w-4 h-4 bg-blue-700 rounded-full top-1/2 transform -translate-y-1/2 cursor-pointer z-20 shadow-sm"
// //                       style={{ left: `calc(${(startHour / 23) * 100}% - 8px)` }}
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
// //                       className="absolute w-4 h-4 bg-blue-700 rounded-full top-1/2 transform -translate-y-1/2 cursor-pointer z-20 shadow-sm"
// //                       style={{ left: `calc(${(endHour / 23) * 100}% - 8px)` }}
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
// //                   <div className="flex justify-between text-xs text-gray-500 mt-1">
// //                     {Object.entries(timeMarks).map(([hour, label]) => (
// //                       <span key={hour}>{label}</span>
// //                     ))}
// //                   </div>
// //                 </div>

// //                 {/* Violation Type Selector */}
// //                 <div>
// //                   <label className="block text-sm font-medium text-blue-900 mb-1">Violation Type</label>
// //                   <Select
// //                     options={violationOptions}
// //                     value={violationOptions.find(option => option.value === selectedViolation)}
// //                     onChange={(selected) => setSelectedViolation(selected?.value || null)}
// //                     isClearable
// //                     placeholder="Select violation type"
// //                     className="text-sm"
// //                     classNamePrefix="select"
// //                     styles={{
// //                       control: (base) => ({
// //                         ...base,
// //                         minHeight: '40px',
// //                         borderColor: '#d1d5db',
// //                         '&:hover': {
// //                           borderColor: '#3b82f6'
// //                         }
// //                       }),
// //                       option: (base) => ({
// //                         ...base,
// //                         fontSize: '0.875rem'
// //                       })
// //                     }}
// //                   />
// //                 </div>
// //               </div>
// //             </motion.section>

// //             {/* Key Metrics Section */}
// //             <motion.section 
// //               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //               transition={{ staggerChildren: 0.1 }}
// //             >
// //               {/* Total Violations Card */}
// //               <motion.div 
// //                 className="bg-white p-4 rounded-lg shadow border border-gray-200 hover:shadow-md transition-shadow"
// //                 whileHover={{ y: -4 }}
// //               >
// //                 <div className="flex items-center mb-3">
// //                   <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
// //                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
// //                     </svg>
// //                   </div>
// //                   <h3 className="ml-3 text-base font-medium text-blue-900">Total Violations</h3>
// //                 </div>
// //                 <p className="text-2xl font-bold text-blue-900">{totalViolations}</p>
// //                 <p className="mt-1 text-xs text-blue-700">All recorded violations</p>
// //               </motion.div>

// //               {/* Top Violation Cards */}
// //               {violationTypes.slice(0, 3).map((item, idx) => (
// //                 <motion.div 
// //                   key={idx}
// //                   className="p-4 rounded-lg shadow hover:shadow-md transition-shadow"
// //                   style={{ 
// //                     backgroundColor: item.color.secondary,
// //                     borderTop: `4px solid ${item.color.primary}`
// //                   }}
// //                   whileHover={{ y: -4 }}
// //                 >
// //                   <div className="flex items-center mb-3">
// //                     <div 
// //                       className="p-2 rounded-lg text-white"
// //                       style={{ backgroundColor: item.color.primary }}
// //                     >
// //                       <FiAlertTriangle className="h-5 w-5" />
// //                     </div>
// //                     <h3 className="ml-3 text-base font-medium" style={{ color: item.color.text }}>{item.name}</h3>
// //                   </div>
// //                   <p className="text-2xl font-bold" style={{ color: item.color.text }}>{item.value}</p>
// //                   <div className="mt-1">
// //                     <span className="text-xs font-medium" style={{ color: item.color.text }}>
// //                       {percentages[item.name]}% of total
// //                     </span>
// //                   </div>
// //                 </motion.div>
// //               ))}
// //             </motion.section>

// //             {/* Charts Section */}
// //             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
// //               {/* Pie Chart */}
// //               <motion.div 
// //                 className="bg-white p-4 rounded-lg shadow border border-gray-200"
// //                 initial={{ opacity: 0, x: -20 }}
// //                 animate={{ opacity: 1, x: 0 }}
// //               >
// //                 <div className="flex justify-between items-center mb-4">
// //                   <h2 className="text-lg font-semibold text-blue-900">Violation Distribution</h2>
// //                   <span className="text-xs text-blue-700">Percentage of total</span>
// //                 </div>
// //                 <div className="h-64">
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
// //                             padding: 16,
// //                             font: {
// //                               size: 12
// //                             }
// //                           }
// //                         },
// //                         tooltip: {
// //                           callbacks: {
// //                             label: function (context) {
// //                               return `${context.label}: ${context.raw} (${percentages[context.label]}%)`;
// //                             }
// //                           },
// //                           bodyFont: {
// //                             size: 12
// //                           }
// //                         }
// //                       },
// //                       cutout: '60%'
// //                     }}
// //                   />
// //                 </div>
// //               </motion.div>

// //               {/* Time Chart */}
// //               <motion.div 
// //                 className="bg-white p-4 rounded-lg shadow border border-gray-200"
// //                 initial={{ opacity: 0, x: 20 }}
// //                 animate={{ opacity: 1, x: 0 }}
// //               >
// //                 <div className="flex justify-between items-center mb-4">
// //                   <h2 className="text-lg font-semibold text-blue-900">Hourly Violation Trends</h2>
// //                   <span className="text-xs text-blue-700">24-hour period</span>
// //                 </div>
// //                 <div className="h-64">
// //                   <Line
// //                     data={timeChartData}
// //                     options={{
// //                       responsive: true,
// //                       maintainAspectRatio: false,
// //                       plugins: { 
// //                         legend: { display: false },
// //                         tooltip: {
// //                           bodyFont: {
// //                             size: 12
// //                           }
// //                         }
// //                       },
// //                       scales: {
// //                         y: { 
// //                           beginAtZero: true, 
// //                           title: { 
// //                             display: true, 
// //                             text: 'Violations',
// //                             font: {
// //                               size: 12
// //                             }
// //                           },
// //                           grid: {
// //                             color: 'rgba(0, 0, 0, 0.05)'
// //                           },
// //                           ticks: {
// //                             font: {
// //                               size: 11
// //                             }
// //                           }
// //                         },
// //                         x: { 
// //                           title: { 
// //                             display: true, 
// //                             text: 'Hour of Day',
// //                             font: {
// //                               size: 12
// //                             }
// //                           },
// //                           grid: {
// //                             display: false
// //                           },
// //                           ticks: {
// //                             font: {
// //                               size: 11
// //                             }
// //                           }
// //                         }
// //                       },
// //                       elements: {
// //                         line: {
// //                           tension: 0.3
// //                         }
// //                       }
// //                     }}
// //                   />
// //                 </div>
// //               </motion.div>
// //             </div>

// //             {/* Violation Records Section */}
// //             <motion.div 
// //               className="bg-white p-4 rounded-lg shadow border border-gray-200 mb-6"
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //             >
// //               <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
// //                 <div>
// //                   <h2 className="text-lg font-semibold text-blue-900">Violation Records</h2>
// //                   <p className="text-xs text-blue-700">
// //                     Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, violationImages.length)} of {violationImages.length} records
// //                   </p>
// //                 </div>
// //                 {totalPages > 1 && (
// //                   <div className="flex items-center gap-2">
// //                     <button
// //                       onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
// //                       disabled={currentPage === 1}
// //                       className="p-2 rounded-md border border-gray-200 bg-white text-blue-900 hover:bg-gray-50 disabled:opacity-50"
// //                     >
// //                       <FiChevronLeft className="h-4 w-4" />
// //                     </button>
// //                     <span className="text-sm text-blue-900">
// //                       Page {currentPage} of {totalPages}
// //                     </span>
// //                     <button
// //                       onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
// //                       disabled={currentPage === totalPages}
// //                       className="p-2 rounded-md border border-gray-200 bg-white text-blue-900 hover:bg-gray-50 disabled:opacity-50"
// //                     >
// //                       <FiChevronRight className="h-4 w-4" />
// //                     </button>
// //                   </div>
// //                 )}
// //               </div>
              
// //               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
// //                 {currentImages.map((item) => (
// //                   <div
// //                     key={item.id}
// //                     className="group relative overflow-hidden rounded-md border border-gray-200 hover:shadow-md transition-shadow"
// //                   >
// //                     <div className="relative aspect-video">
// //                       <img
// //                         src={item.imageUrl}
// //                         alt="Violation"
// //                         className="h-full w-full object-cover"
// //                       />
// //                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
// //                         <p className="text-white text-sm font-medium truncate">
// //                           {item.type}
// //                         </p>
// //                         <p className="text-white/80 text-xs">
// //                           {new Date(item.analyzedAt).toLocaleTimeString()}
// //                         </p>
// //                       </div>
// //                     </div>
// //                     <div className="p-2 bg-white flex justify-between items-start">
// //                       <div className="flex-1 min-w-0">
// //                         <p className="text-xs font-medium text-blue-900 truncate">
// //                           {item.type}
// //                         </p>
// //                         <p className="text-xs text-blue-700">
// //                           {new Date(item.analyzedAt).toLocaleDateString()}
// //                         </p>
// //                         <p className="text-xs text-gray-500 truncate">
// //                           {item.details}
// //                         </p>
// //                       </div>
// //                       {item.plateImageUrl && (
// //                         <div className="ml-2 flex-shrink-0">
// //                           <img 
// //                             src={item.plateImageUrl} 
// //                             alt="Number Plate" 
// //                             className="h-8 w-12 object-cover rounded border border-gray-200"
// //                           />
// //                         </div>
// //                       )}
// //                     </div>
// //                     <button
// //                       onClick={(e) => {
// //                         e.stopPropagation();
// //                         if (window.confirm('Are you sure you want to permanently delete this violation record and associated images?')) {
// //                           handleDeleteImage(item.id, item.publicId, item.platePublicId);
// //                         }
// //                       }}
// //                       disabled={isDeleting && deletingId === item.id}
// //                       className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
// //                     >
// //                       {isDeleting && deletingId === item.id ? (
// //                         <svg className="animate-spin h-3.5 w-3.5 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
// //                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// //                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// //                         </svg>
// //                       ) : (
// //                         <FiTrash2 className="h-3.5 w-3.5" />
// //                       )}
// //                     </button>
// //                   </div>
// //                 ))}
// //               </div>
// //             </motion.div>

// //             {/* Peak Time Analysis */}
// //             <motion.div 
// //               className="bg-white p-4 rounded-lg shadow border border-gray-200"
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //             >
// //               <h2 className="text-lg font-semibold mb-4 text-blue-900">Peak Violation Times</h2>
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                 <div className="p-3 rounded-lg bg-blue-50 border border-blue-100">
// //                   <div className="flex items-center">
// //                     <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
// //                       <FiClock className="h-4 w-4" />
// //                     </div>
// //                     <div>
// //                       <h3 className="text-sm font-medium text-blue-900">Peak Hour</h3>
// //                       <p className="text-lg font-bold text-blue-900">
// //                         {timeAnalysis.peakHour}:00 - {timeAnalysis.peakHour + 1}:00
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </div>
// //                 <div className="p-3 rounded-lg bg-green-50 border border-green-100">
// //                   <div className="flex items-center">
// //                     <div className="p-2 rounded-full bg-green-100 text-green-600 mr-3">
// //                       <FiCalendar className="h-4 w-4" />
// //                     </div>
// //                     <div>
// //                       <h3 className="text-sm font-medium text-blue-900">Peak Day</h3>
// //                       <p className="text-lg font-bold text-blue-900">{timeAnalysis.peakDay}</p>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </motion.div>
// //           </div>
// //         </div>
// //       </DashboardLayout>
// //     </>
// //   );
// // };

// // export default TrafficViolationDashboard;





import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';
import Navbar from '../components/Navbar';
import { Pie, Bar, Line } from 'react-chartjs-2';
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
  Title
} from 'chart.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import { FiAlertTriangle, FiClock, FiCalendar, FiDownload, FiTrash2, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { jsPDF } from 'jspdf';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title
);

const VIOLATION_FIELD_MAPPING = {
  phoneUsage: 'Phone Usage',
  stuntRiding: 'Stunt Riding',
  smoking: 'Smoking',
  fire: 'Fire',
  withHelmet: 'With Helmet',
  withoutHelmet: 'Without Helmet',
  triples: 'Triples'
};

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
  const [deletingId, setDeletingId] = useState(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // Filter states
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [timeRange, setTimeRange] = useState([0, 23]);
  const [startHour, endHour] = timeRange;
  const [selectedViolation, setSelectedViolation] = useState(null);

  // Professional, high-contrast color palette
  const VIOLATION_COLORS = {
    'Without Helmet': {
      primary: '#E63946',
      secondary: '#FFCAD4',
      text: '#5C0000',
      chartColor: 'rgba(230, 57, 70, 0.8)'
    },
    'Phone Usage': {
      primary: '#457B9D',
      secondary: '#A8DADC',
      text: '#1D3557',
      chartColor: 'rgba(69, 123, 157, 0.8)'
    },
    'Triples': {
      primary: '#FF9F1C',
      secondary: '#FFBF69',
      text: '#8B5000',
      chartColor: 'rgba(255, 159, 28, 0.8)'
    },
    'Stunt Riding': {
      primary: '#2A9D8F',
      secondary: '#8AC6AF',
      text: '#1D4C4F',
      chartColor: 'rgba(42, 157, 143, 0.8)'
    },
    'Smoking': {
      primary: '#7209B7',
      secondary: '#C77DFF',
      text: '#3A0CA3',
      chartColor: 'rgba(114, 9, 183, 0.8)'
    },
    'Fire': {
      primary: '#F72585',
      secondary: '#FF70A6',
      text: '#72063C',
      chartColor: 'rgba(247, 37, 133, 0.8)'
    },
    'With Helmet': {
      primary: '#4CC9F0',
      secondary: '#B8F2E6',
      text: '#05668D',
      chartColor: 'rgba(76, 201, 240, 0.8)'
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
      const response = await fetch('https://kaapaan-backend.onrender.com/api/violations/all');
      const data = await response.json();

      if (response.ok) {
        setStatsData(data);
        setFilteredData(data);
        processViolationData(data);
        analyzeTimeData(data);
        setViolationImages(data.map(v => ({
          imageUrl: v.imageUrl,
          plateImageUrl: v.plateImageUrl,
          type: getViolationType(v),
          time: new Date(v.analyzedAt).toLocaleString(),
          id: v._id,
          analyzedAt: v.analyzedAt,
          publicId: v.publicId,
          platePublicId: v.platePublicId,
          details: getViolationDetails(v)
        })));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getViolationDetails = (item) => {
    const details = [];
    Object.keys(VIOLATION_FIELD_MAPPING).forEach(field => {
      if (item[field]) {
        details.push(VIOLATION_FIELD_MAPPING[field]);
      }
    });
    return details.length > 0 ? details.join(', ') : 'No specific violation detected';
  };

  const applyFilters = () => {
    let filtered = [...statsData];

    if (startDate && endDate) {
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.analyzedAt);
        return itemDate >= startDate && itemDate <= endDate;
      });
    }

    filtered = filtered.filter(item => {
      const itemHour = new Date(item.analyzedAt).getHours();
      return itemHour >= startHour && itemHour <= endHour;
    });

    if (selectedViolation) {
      filtered = filtered.filter(item => {
        const violations = [];
        Object.keys(VIOLATION_FIELD_MAPPING).forEach(field => {
          if (item[field]) {
            violations.push(VIOLATION_FIELD_MAPPING[field]);
          }
        });
        return violations.includes(selectedViolation);
      });
    }

    setFilteredData(filtered);
    processViolationData(filtered);
    analyzeTimeData(filtered);
    
    setViolationImages(filtered.map(v => ({
      imageUrl: v.imageUrl,
      plateImageUrl: v.plateImageUrl,
      type: getViolationType(v),
      time: new Date(v.analyzedAt).toLocaleString(),
      id: v._id,
      analyzedAt: v.analyzedAt,
      publicId: v.publicId,
      platePublicId: v.platePublicId,
      details: getViolationDetails(v)
    })));
    
    setCurrentPage(1);
  };

  const getViolationType = (item) => {
    const types = [];
    Object.keys(VIOLATION_FIELD_MAPPING).forEach(field => {
      if (item[field]) {
        types.push(VIOLATION_FIELD_MAPPING[field]);
      }
    });
    return types.length > 0 ? types.join(', ') : 'None';
  };

  const processViolationData = (data) => {
    const counts = {};
    
    data.forEach(item => {
      Object.keys(VIOLATION_FIELD_MAPPING).forEach(field => {
        if (item[field]) {
          const violationName = VIOLATION_FIELD_MAPPING[field];
          counts[violationName] = (counts[violationName] || 0) + 1;
        }
      });
    });

    const violationData = Object.keys(counts).map(key => ({
      name: key,
      value: counts[key],
      color: VIOLATION_COLORS[key] || {
        primary: '#64748B',
        secondary: '#F1F5F9',
        text: '#334155'
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

  const handleDeleteImage = async (imageId, publicId, platePublicId) => {
    if (isDeleting) return;
    
    try {
      setIsDeleting(true);
      setDeletingId(imageId);
      
      const deleteResponse = await fetch('https://kaapaan-backend.onrender.com/api/violations/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: imageId,
          publicId: publicId,
          platePublicId: platePublicId
        }),
      });

      if (deleteResponse.ok) {
        setViolationImages(prevImages => prevImages.filter(img => img.id !== imageId));
        setStatsData(prevData => prevData.filter(item => item._id !== imageId));
        setFilteredData(prevData => prevData.filter(item => item._id !== imageId));
        
        processViolationData(statsData.filter(item => item._id !== imageId));
        analyzeTimeData(statsData.filter(item => item._id !== imageId));
      } else {
        const errorData = await deleteResponse.json();
        console.error('Error deleting:', errorData.message);
        alert('Failed to delete violation. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('An error occurred while deleting. Please try again.');
    } finally {
      setIsDeleting(false);
      setDeletingId(null);
    }
  };

  const downloadCSVReport = () => {
    const headers = ['Date', 'Time', 'Violation Type', 'Details', 'Image URL', 'Plate Image URL'];
    
    const rows = filteredData.map(violation => {
      const date = new Date(violation.analyzedAt);
      const formattedDate = date.toLocaleDateString();
      const formattedTime = date.toLocaleTimeString();
      const violationType = getViolationType(violation);
      const details = getViolationDetails(violation);
      
      return [
        `"${formattedDate}"`,
        `"${formattedTime}"`,
        `"${violationType}"`,
        `"${details}"`,
        `"${violation.imageUrl}"`,
        `"${violation.plateImageUrl || 'N/A'}"`
      ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
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

  const generatePDFReport = async () => {
    setIsGeneratingPDF(true);
    try {
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      // Add title and date
      doc.setFontSize(18);
      doc.setTextColor(40);
      doc.setFont('helvetica', 'bold');
      doc.text('Traffic Violation Report', 148, 15, { align: 'center' });
      
      doc.setFontSize(12);
      doc.setTextColor(100);
      doc.setFont('helvetica', 'normal');
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 148, 22, { align: 'center' });

      // Add filter information
      doc.setFontSize(10);
      doc.text('Filters Applied:', 15, 30);
      
      let filterText = 'All violations';
      if (startDate && endDate) {
        filterText += ` | Date: ${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
      }
      if (selectedViolation) {
        filterText += ` | Violation: ${selectedViolation}`;
      }
      filterText += ` | Time: ${startHour}:00 - ${endHour}:00`;
      
      doc.text(filterText, 15, 35);

      // Add summary statistics
      doc.setFontSize(12);
      doc.setTextColor(40);
      doc.text('Summary Statistics', 15, 45);
      
      doc.setFontSize(10);
      doc.text(`Total Violations: ${totalViolations}`, 15, 52);
      
      let yPos = 52;
      violationTypes.slice(0, 3).forEach((item, idx) => {
        yPos += 7;
        doc.text(`${item.name}: ${item.value} (${((item.value / totalViolations) * 100).toFixed(1)}%)`, 15, yPos);
      });

      // Add each violation with images and details
      const imagesPerRow = 5;
      const imageWidth = 45; // mm
      const imageHeight = 30; // mm
      const marginX = 15; // mm
      const marginY = 70; // mm
      const gapX = 5; // mm between images
      const gapY = 30; // mm between rows
      const textHeight = 15; // mm for text below image

      let currentX = marginX;
      let currentY = marginY;
      let itemsOnCurrentRow = 0;

      for (let i = 0; i < filteredData.length; i++) {
        const violation = filteredData[i];
        const formattedDateTime = new Date(violation.analyzedAt).toLocaleString();
        const violationType = getViolationType(violation);
        const details = getViolationDetails(violation);

        // Check if we need a new page
        if (currentY + imageHeight + textHeight > 190) { // A4 landscape height is 210mm
          doc.addPage('landscape');
          currentX = marginX;
          currentY = 20; // Reset Y position for new page
          itemsOnCurrentRow = 0;
        }

        try {
          // Load violation image
          const violationImg = new Image();
          violationImg.crossOrigin = 'Anonymous';
          violationImg.src = violation.imageUrl;
          
          await new Promise((resolve) => {
            violationImg.onload = resolve;
            violationImg.onerror = resolve;
          });

          // Add violation image to PDF if it loaded successfully
          if (violationImg.width > 0) {
            doc.addImage(
              violationImg, 
              'JPEG', 
              currentX, 
              currentY, 
              imageWidth, 
              imageHeight
            );
          } else {
            doc.text('Image not available', currentX, currentY + imageHeight/2);
          }

          // Add violation details below image
          doc.setFontSize(8);
          doc.setTextColor(0);
          
          // Violation type
          doc.text(
            doc.splitTextToSize(violationType, imageWidth),
            currentX,
            currentY + imageHeight + 5
          );
          
          // Timestamp
          doc.text(
            doc.splitTextToSize(formattedDateTime, imageWidth),
            currentX,
            currentY + imageHeight + 10
          );

          // If there's a plate image, add it to the right of the violation image
          if (violation.plateImageUrl) {
            const plateImg = new Image();
            plateImg.crossOrigin = 'Anonymous';
            plateImg.src = violation.plateImageUrl;
            
            await new Promise((resolve) => {
              plateImg.onload = resolve;
              plateImg.onerror = resolve;
            });

            if (plateImg.width > 0) {
              const plateWidth = 20; // mm
              const plateHeight = (plateImg.height / plateImg.width) * plateWidth;
              doc.addImage(
                plateImg, 
                'JPEG', 
                currentX + imageWidth - plateWidth, 
                currentY + imageHeight - plateHeight, 
                plateWidth, 
                plateHeight
              );
            }
          }
        } catch (error) {
          console.error('Error adding image to PDF:', error);
          doc.text('Image load error', currentX, currentY + imageHeight/2);
        }

        // Move to next position
        itemsOnCurrentRow++;
        if (itemsOnCurrentRow >= imagesPerRow) {
          currentX = marginX;
          currentY += imageHeight + textHeight + gapY;
          itemsOnCurrentRow = 0;
        } else {
          currentX += imageWidth + gapX;
        }
      }

      // Save the PDF
      doc.save(`violation_report_${new Date().toISOString().slice(0,10)}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleSliderStart = (e, handleType) => {
    e.preventDefault();
    const slider = e.target.closest('.relative');
    const rect = slider.getBoundingClientRect();
    
    const handleMove = (moveEvent) => {
      const clientX = moveEvent.clientX || (moveEvent.touches && moveEvent.touches[0].clientX);
      if (!clientX) return;
      
      const percent = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
      const newValue = Math.round(percent * 23);
      
      if (handleType === 'start') {
        if (newValue <= endHour) {
          setTimeRange([newValue, endHour]);
        }
      } else {
        if (newValue >= startHour) {
          setTimeRange([startHour, newValue]);
        }
      }
    };

    const handleEnd = () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchend', handleEnd);
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('touchmove', handleMove, { passive: false });
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchend', handleEnd);
  };

  const violationOptions = [
    { value: null, label: 'All Violation Types' },
    ...Object.values(VIOLATION_FIELD_MAPPING).map(name => ({
      value: name,
      label: name
    }))
  ];

  const timeMarks = {
    0: '12 AM',
    6: '6 AM',
    12: '12 PM',
    18: '6 PM',
    23: '11 PM'
  };

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

  const barChartData = {
    labels: violationTypes.map(item => item.name),
    datasets: [
      {
        label: 'Violation Count',
        data: violationTypes.map(item => item.value),
        backgroundColor: violationTypes.map(item => item.color.primary),
        borderColor: violationTypes.map(item => item.color.primary),
        borderWidth: 1,
      },
    ],
  };

  const timeChartData = {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    datasets: [
      {
        label: 'Violations by Hour',
        data: timeAnalysis.hourly || [],
        backgroundColor: 'rgba(69, 123, 157, 0.1)',
        borderColor: '#457B9D',
        borderWidth: 2,
        tension: 0.3,
        fill: true,
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#457B9D',
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
        <div className="min-h-screen w-full bg-gray-50 p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <motion.header 
              className="mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-2">Traffic Violation Analytics</h1>
              <p className="text-blue-700">Comprehensive analysis of traffic violations</p>
            </motion.header>

            {/* Filter Section */}
            <motion.section 
              className="bg-white p-4 md:p-6 rounded-lg shadow border border-gray-200 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
                <h2 className="text-lg md:text-xl font-semibold text-blue-900">Filter Violations</h2>
                <div className="flex gap-2">
                  <button
                    onClick={downloadCSVReport}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center text-sm md:text-base shadow-sm"
                  >
                    <FiDownload className="mr-2" />
                    Export CSV
                  </button>
                  <button
                    onClick={generatePDFReport}
                    disabled={isGeneratingPDF}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center text-sm md:text-base shadow-sm disabled:opacity-50"
                  >
                    {isGeneratingPDF ? (
                      <svg className="animate-spin h-4 w-4 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <FiDownload className="mr-2" />
                    )}
                    Export PDF
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {/* Date Range Picker */}
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-1">Date Range</label>
                  <div className="relative">
                    <DatePicker
                      selectsRange={true}
                      startDate={startDate}
                      endDate={endDate}
                      onChange={(update) => setDateRange(update)}
                      isClearable={true}
                      placeholderText="Select date range"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <FiCalendar className="absolute left-3 top-2.5 text-gray-400" />
                  </div>
                </div>

                {/* Time Range Slider - Updated for mobile */}
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-1">
                    Time Range: {startHour}:00 - {endHour}:00
                  </label>
                  <div className="relative py-4">
                    <div className="absolute h-1.5 bg-gray-200 rounded-full w-full top-1/2 transform -translate-y-1/2"></div>
                    <div 
                      className="absolute h-1.5 bg-blue-600 rounded-full top-1/2 transform -translate-y-1/2"
                      style={{ 
                        left: `${(startHour / 23) * 100}%`, 
                        width: `${((endHour - startHour) / 23) * 100}%` 
                      }}
                    ></div>
                    {/* Start Handle - Larger for mobile */}
                    <div 
                      className="absolute w-6 h-6 bg-blue-700 rounded-full top-1/2 transform -translate-y-1/2 cursor-pointer z-20 shadow-sm slider-handle"
                      style={{ left: `calc(${(startHour / 23) * 100}% - 12px)` }}
                      onMouseDown={(e) => handleSliderStart(e, 'start')}
                      onTouchStart={(e) => handleSliderStart(e, 'start')}
                    ></div>
                    {/* End Handle - Larger for mobile */}
                    <div 
                      className="absolute w-6 h-6 bg-blue-700 rounded-full top-1/2 transform -translate-y-1/2 cursor-pointer z-20 shadow-sm slider-handle"
                      style={{ left: `calc(${(endHour / 23) * 100}% - 12px)` }}
                      onMouseDown={(e) => handleSliderStart(e, 'end')}
                      onTouchStart={(e) => handleSliderStart(e, 'end')}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    {Object.entries(timeMarks).map(([hour, label]) => (
                      <span key={hour}>{label}</span>
                    ))}
                  </div>
                </div>

                {/* Violation Type Selector */}
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-1">Violation Type</label>
                  <Select
                    options={violationOptions}
                    value={violationOptions.find(option => option.value === selectedViolation)}
                    onChange={(selected) => setSelectedViolation(selected?.value || null)}
                    isClearable
                    placeholder="Select violation type"
                    className="text-sm"
                    classNamePrefix="select"
                    styles={{
                      control: (base) => ({
                        ...base,
                        minHeight: '40px',
                        borderColor: '#d1d5db',
                        '&:hover': {
                          borderColor: '#3b82f6'
                        }
                      }),
                      option: (base) => ({
                        ...base,
                        fontSize: '0.875rem'
                      })
                    }}
                  />
                </div>
              </div>
            </motion.section>

            {/* Key Metrics Section */}
            <motion.section 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {/* Total Violations Card */}
              <motion.div 
                className="bg-white p-4 rounded-lg shadow border border-gray-200 hover:shadow-md transition-shadow"
                whileHover={{ y: -4 }}
              >
                <div className="flex items-center mb-3">
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="ml-3 text-base font-medium text-blue-900">Total Violations</h3>
                </div>
                <p className="text-2xl font-bold text-blue-900">{totalViolations}</p>
                <p className="mt-1 text-xs text-blue-700">All recorded violations</p>
              </motion.div>

              {/* Top Violation Cards */}
              {violationTypes.slice(0, 3).map((item, idx) => (
                <motion.div 
                  key={idx}
                  className="p-4 rounded-lg shadow hover:shadow-md transition-shadow"
                  style={{ 
                    backgroundColor: item.color.secondary,
                    borderTop: `4px solid ${item.color.primary}`
                  }}
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-center mb-3">
                    <div 
                      className="p-2 rounded-lg text-white"
                      style={{ backgroundColor: item.color.primary }}
                    >
                      <FiAlertTriangle className="h-5 w-5" />
                    </div>
                    <h3 className="ml-3 text-base font-medium" style={{ color: item.color.text }}>{item.name}</h3>
                  </div>
                  <p className="text-2xl font-bold" style={{ color: item.color.text }}>{item.value}</p>
                  <div className="mt-1">
                    <span className="text-xs font-medium" style={{ color: item.color.text }}>
                      {percentages[item.name]}% of total
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.section>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              {/* Pie Chart */}
              <motion.div 
                className="bg-white p-4 rounded-lg shadow border border-gray-200"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-blue-900">Violation Distribution</h2>
                  <span className="text-xs text-blue-700">Percentage of total</span>
                </div>
                <div className="h-64">
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
                            padding: 16,
                            font: {
                              size: 12
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
                            size: 12
                          }
                        }
                      },
                      cutout: '60%'
                    }}
                  />
                </div>
              </motion.div>

              {/* Time Chart */}
              <motion.div 
                className="bg-white p-4 rounded-lg shadow border border-gray-200"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-blue-900">Hourly Violation Trends</h2>
                  <span className="text-xs text-blue-700">24-hour period</span>
                </div>
                <div className="h-64">
                  <Line
                    data={timeChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { 
                        legend: { display: false },
                        tooltip: {
                          bodyFont: {
                            size: 12
                          }
                        }
                      },
                      scales: {
                        y: { 
                          beginAtZero: true, 
                          title: { 
                            display: true, 
                            text: 'Violations',
                            font: {
                              size: 12
                            }
                          },
                          grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                          },
                          ticks: {
                            font: {
                              size: 11
                            }
                          }
                        },
                        x: { 
                          title: { 
                            display: true, 
                            text: 'Hour of Day',
                            font: {
                              size: 12
                            }
                          },
                          grid: {
                            display: false
                          },
                          ticks: {
                            font: {
                              size: 11
                            }
                          }
                        }
                      },
                      elements: {
                        line: {
                          tension: 0.3
                        }
                      }
                    }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Violation Records Section */}
            <motion.div 
              className="bg-white p-4 rounded-lg shadow border border-gray-200 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
                <div>
                  <h2 className="text-lg font-semibold text-blue-900">Violation Records</h2>
                  <p className="text-xs text-blue-700">
                    Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, violationImages.length)} of {violationImages.length} records
                  </p>
                </div>
                {totalPages > 1 && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                      disabled={currentPage === 1}
                      className="p-2 rounded-md border border-gray-200 bg-white text-blue-900 hover:bg-gray-50 disabled:opacity-50"
                    >
                      <FiChevronLeft className="h-4 w-4" />
                    </button>
                    <span className="text-sm text-blue-900">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-md border border-gray-200 bg-white text-blue-900 hover:bg-gray-50 disabled:opacity-50"
                    >
                      <FiChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {currentImages.map((item) => (
                  <div
                    key={item.id}
                    className="group relative overflow-hidden rounded-md border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="relative aspect-video">
                      <img
                        src={item.imageUrl}
                        alt="Violation"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                        <p className="text-white text-sm font-medium truncate">
                          {item.type}
                        </p>
                        <p className="text-white/80 text-xs">
                          {new Date(item.analyzedAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <div className="p-2 bg-white flex justify-between items-start">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-blue-900 truncate">
                          {item.type}
                        </p>
                        <p className="text-xs text-blue-700">
                          {new Date(item.analyzedAt).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {item.details}
                        </p>
                      </div>
                      {item.plateImageUrl && (
                        <div className="ml-2 flex-shrink-0">
                          <img 
                            src={item.plateImageUrl} 
                            alt="Number Plate" 
                            className="h-8 w-12 object-cover rounded border border-gray-200"
                          />
                        </div>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm('Are you sure you want to permanently delete this violation record and associated images?')) {
                          handleDeleteImage(item.id, item.publicId, item.platePublicId);
                        }
                      }}
                      disabled={isDeleting && deletingId === item.id}
                      className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {isDeleting && deletingId === item.id ? (
                        <svg className="animate-spin h-3.5 w-3.5 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <FiTrash2 className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Peak Time Analysis */}
            <motion.div 
              className="bg-white p-4 rounded-lg shadow border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-lg font-semibold mb-4 text-blue-900">Peak Violation Times</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-100">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
                      <FiClock className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-blue-900">Peak Hour</h3>
                      <p className="text-lg font-bold text-blue-900">
                        {timeAnalysis.peakHour}:00 - {timeAnalysis.peakHour + 1}:00
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-green-50 border border-green-100">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-green-100 text-green-600 mr-3">
                      <FiCalendar className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-blue-900">Peak Day</h3>
                      <p className="text-lg font-bold text-blue-900">{timeAnalysis.peakDay}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </DashboardLayout>

      <style jsx global>{`
        /* Slider touch improvements */
        .slider-handle {
          touch-action: none;
          width: 24px;
          height: 24px;
          transition: transform 0.1s;
        }
        .slider-handle:active {
          transform: scale(1.2);
        }
        @media (max-width: 640px) {
          .slider-handle {
            width: 28px;
            height: 28px;
          }
        }
      `}</style>
    </>
  );
};

export default TrafficViolationDashboard;