


import React, { useState, useEffect } from 'react';
import { 
  CircularProgress, 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Avatar, 
  useTheme,
  Paper,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import DashboardLayout from '../components/DashboardLayout';
import Navbar from '../components/Navbar';
import Menubar from '../components/Menubar';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: theme.shadows[2],
  borderRadius: '12px',
}));

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const VerifiedByStats = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

const fetchStats = async () => {
  try {
    const officerIds = ['police_001', 'police_002', 'police_003', 'police_004', 'police_005'];
    const promises = officerIds.map(async (id) => {
      const response = await axios.get(`https://kaapaan-backend.onrender.com/api/violations/verified?officerId=${id}`);
      return {
        _id: id,
        count: response.data.length,
        name: id.replace('_', ' ').toUpperCase(),
      };
    });

    const results = await Promise.all(promises);
    setStats(results);
  } catch (error) {
    console.error('Error fetching verification stats:', error);
  } finally {
    setLoading(false);
  }
};



  // const fetchStats = async () => {
  //   try {
  //     const res = await axios.get('http://localhost:5000/api/violations/verified-by');
  //           // const res = await axios.get('https://kaapaan-backend.onrender.com/api/violations/verified-by');

  //     // Filter to only include police_001 to police_005 and remove unknown IDs
  //     const filteredStats = res.data.filter(officer => 
  //       officer._id && officer._id.match(/^police_00[1-5]$/)
  //     ).map(officer => ({
  //       ...officer,
  //       name: officer._id.replace('_', ' ').toUpperCase()
  //     }));
  //     setStats(filteredStats);
  //   } catch (error) {
  //     console.error('Error fetching verification stats:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    fetchStats();
  }, []);

  const getProgressColor = (count) => {
    if (count >= 50) return 'success';
    if (count >= 20) return 'info';
    return 'primary';
  };

  return (
    <>
      <div className="bg-cover bg-center" style={{ backgroundImage: "url('/bg-4.jpg')" }}>
        <Navbar />
        <Menubar />
      </div>

      <DashboardLayout>
        <div
          className="min-h-screen bg-cover bg-center p-6"
          style={{ backgroundImage: `url('/bg-.jpg')` }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 bg-white/70 p-6 rounded-xl shadow">
              <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                Officer Verification Statistics
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Overview of violations verified by each traffic officer
              </Typography>
            </div>

            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                <CircularProgress size={60} />
              </Box>
            ) : stats.length === 0 ? (
              <Paper elevation={0} sx={{ p: 4, textAlign: 'center' }}>
                <VerifiedUserIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  No verification data available
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  No officers have verified violations yet.
                </Typography>
              </Paper>
            ) : (
              <>
                {/* Bar Chart Section */}
                <Box mb={6}>
                  <Paper elevation={3} sx={{ p: 3, borderRadius: 3, height: '400px' }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                      Violations Verified by Officers
                    </Typography>
                    <ResponsiveContainer width="100%" height="90%">
                      <BarChart
                        data={stats}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" scale="band" />
                        <Tooltip 
                          formatter={(value) => [`${value} violations`, 'Count']}
                          labelFormatter={(value) => `Officer: ${value}`}
                        />
                        <Legend />
                        <Bar dataKey="count" name="Verified Violations">
                          {stats.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </Paper>
                </Box>

                {/* Officer Cards Grid */}
                <Grid container spacing={3}>
                  {stats.map((officer, index) => (
                    <Grid item xs={12} sm={6} md={4} key={officer._id}>
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card sx={{ 
                          borderRadius: 3,
                          boxShadow: 3,
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          borderLeft: `4px solid ${COLORS[index % COLORS.length]}`
                        }}>
                          <CardContent sx={{ flexGrow: 1 }}>
                            <Box display="flex" alignItems="center" mb={2}>
                              <Avatar sx={{ 
                                bgcolor: COLORS[index % COLORS.length],
                                width: 56, 
                                height: 56,
                                mr: 2
                              }}>
                                <VerifiedUserIcon fontSize="large" />
                              </Avatar>
                              <Box>
                                <Typography variant="h6" component="div">
                                  {officer.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Traffic Officer
                                </Typography>
                              </Box>
                            </Box>

                            <Box mt={3} mb={2} display="flex" alignItems="center">
                              <Box flexGrow={1} mr={2}>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                  Verified Violations
                                </Typography>
                                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                                  {officer.count}
                                </Typography>
                              </Box>
                              <Box position="relative" display="inline-flex">
                                <CircularProgress 
                                  variant="determinate" 
                                  value={Math.min(100, officer.count)} 
                                  size={60}
                                  thickness={4}
                                  color={getProgressColor(officer.count)}
                                />
                                <Box
                                  top={0}
                                  left={0}
                                  bottom={0}
                                  right={0}
                                  position="absolute"
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="center"
                                >
                                  <Typography variant="caption" component="div" color="text.secondary">
                                    {`${Math.min(100, officer.count)}%`}
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>

                            <Box mt={2}>
                              <Chip 
                                label={`Rank ${index + 1}`}
                                color="primary"
                                variant="outlined"
                                size="small"
                                sx={{ mr: 1 }}
                              />
                              <Chip 
                                label={`${officer.count} cases`}
                                color="secondary"
                                size="small"
                              />
                            </Box>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}

            {stats.length > 0 && (
              <Box mt={6}>
                <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Verification Leaderboard
                  </Typography>
                  <Box component="ul" sx={{ listStyle: 'none', p: 0 }}>
                    {stats
                      .sort((a, b) => b.count - a.count)
                      .map((officer, index) => (
                        <Box 
                          component="li" 
                          key={officer._id}
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            py: 2, 
                            px: 1,
                            borderBottom: index !== stats.length - 1 ? '1px solid' : 'none',
                            borderColor: 'divider'
                          }}
                        >
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              fontWeight: 'bold', 
                              minWidth: 40,
                              color: index === 0 ? theme.palette.warning.main : 'text.primary'
                            }}
                          >
                            #{index + 1}
                          </Typography>
                          <VerifiedUserIcon 
                            sx={{ 
                              color: COLORS[index % COLORS.length],
                              mx: 2 
                            }} 
                          />
                          <Box flexGrow={1}>
                            <Typography variant="subtitle1">
                              {officer.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {officer.count} verified cases
                            </Typography>
                          </Box>
                          <Chip 
                            label={`${Math.round((officer.count / stats.reduce((acc, curr) => acc + curr.count, 0))) * 100}%`}
                            color="primary"
                            size="small"
                          />
                        </Box>
                      ))}
                  </Box>
                </Paper>
              </Box>
            )}
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default VerifiedByStats;