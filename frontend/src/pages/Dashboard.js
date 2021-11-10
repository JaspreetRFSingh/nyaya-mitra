import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Grid, Card, CardContent, Typography, Button, Box,
  Chip, Divider, List, ListItem, ListItemText, ListItemSecondaryAction,
  CircularProgress, Alert, Paper, Avatar,
} from '@mui/material';
import {
  Gavel, Description, VideoCall, Add, ArrowForward,
  EventNote, Person,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { format } from 'date-fns';

const statusColor = {
  PENDING: 'warning', CONFIRMED: 'info', COMPLETED: 'success',
  CANCELLED: 'error', IN_PROGRESS: 'info', ADMITTED: 'success',
  DECIDED: 'default', DISMISSED: 'error',
};

const Dashboard = () => {
  const { user } = useAuth();
  const [cases, setCases] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [casesRes, consultRes, docsRes] = await Promise.all([
          api.get('/cases'),
          api.get('/consultations'),
          api.get('/documents'),
        ]);
        setCases(casesRes.data || []);
        setConsultations(consultRes.data || []);
        setDocuments(docsRes.data || []);
      } catch (err) {
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Box display="flex" justifyContent="center" mt={8}><CircularProgress /></Box>;

  const upcomingHearings = cases
    .filter(c => c.nextHearingDate && new Date(c.nextHearingDate) >= new Date())
    .sort((a, b) => new Date(a.nextHearingDate) - new Date(b.nextHearingDate))
    .slice(0, 3);

  const recentConsultations = consultations.slice(0, 3);
  const recentDocs = documents.slice(0, 3);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
          <Person fontSize="large" />
        </Avatar>
        <Box>
          <Typography variant="h5" fontWeight="bold">
            Welcome back, {user?.firstName || 'User'}!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user?.role === 'LAWYER' ? 'Lawyer Dashboard' : 'Client Dashboard'}
          </Typography>
        </Box>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {/* Stats Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { label: 'Active Cases', value: cases.filter(c => c.status === 'IN_PROGRESS' || c.status === 'ADMITTED').length, icon: <Gavel />, color: '#1976d2', link: '/cases' },
          { label: 'Consultations', value: consultations.length, icon: <VideoCall />, color: '#388e3c', link: '/consultations' },
          { label: 'Documents', value: documents.length, icon: <Description />, color: '#f57c00', link: '/documents' },
          { label: 'Upcoming Hearings', value: upcomingHearings.length, icon: <EventNote />, color: '#7b1fa2', link: '/cases' },
        ].map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.label}>
            <Card component={Link} to={stat.link} sx={{ textDecoration: 'none', '&:hover': { boxShadow: 6 } }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: stat.color + '20', color: stat.color }}>
                  {stat.icon}
                </Box>
                <Box>
                  <Typography variant="h4" fontWeight="bold">{stat.value}</Typography>
                  <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Quick Actions</Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button variant="contained" startIcon={<Add />} component={Link} to="/consultations">
            Book Consultation
          </Button>
          <Button variant="outlined" startIcon={<Add />} component={Link} to="/cases">
            Add Case
          </Button>
          <Button variant="outlined" startIcon={<Description />} component={Link} to="/documents/generate">
            Generate Document
          </Button>
          <Button variant="outlined" startIcon={<Gavel />} component={Link} to="/lawyers">
            Find a Lawyer
          </Button>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {/* Upcoming Hearings */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Upcoming Hearings</Typography>
                <Button size="small" endIcon={<ArrowForward />} component={Link} to="/cases">
                  View All
                </Button>
              </Box>
              {upcomingHearings.length === 0 ? (
                <Typography color="text.secondary" variant="body2">No upcoming hearings</Typography>
              ) : (
                <List disablePadding>
                  {upcomingHearings.map((c, i) => (
                    <React.Fragment key={c.id}>
                      {i > 0 && <Divider />}
                      <ListItem disablePadding sx={{ py: 1 }} component={Link} to={`/cases/${c.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <ListItemText
                          primary={c.caseTitle}
                          secondary={format(new Date(c.nextHearingDate), 'dd MMM yyyy')}
                        />
                        <Chip label={c.status} color={statusColor[c.status] || 'default'} size="small" />
                      </ListItem>
                    </React.Fragment>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Consultations */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Recent Consultations</Typography>
                <Button size="small" endIcon={<ArrowForward />} component={Link} to="/consultations">
                  View All
                </Button>
              </Box>
              {recentConsultations.length === 0 ? (
                <Typography color="text.secondary" variant="body2">No consultations yet</Typography>
              ) : (
                <List disablePadding>
                  {recentConsultations.map((c, i) => (
                    <React.Fragment key={c.id}>
                      {i > 0 && <Divider />}
                      <ListItem disablePadding sx={{ py: 1 }}>
                        <ListItemText
                          primary={c.title}
                          secondary={c.lawyerName}
                        />
                        <Chip label={c.status} color={statusColor[c.status] || 'default'} size="small" />
                      </ListItem>
                    </React.Fragment>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Documents */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Recent Documents</Typography>
                <Button size="small" endIcon={<ArrowForward />} component={Link} to="/documents">
                  View All
                </Button>
              </Box>
              {recentDocs.length === 0 ? (
                <Typography color="text.secondary" variant="body2">No documents yet</Typography>
              ) : (
                <List disablePadding>
                  {recentDocs.map((d, i) => (
                    <React.Fragment key={d.id}>
                      {i > 0 && <Divider />}
                      <ListItem disablePadding sx={{ py: 1 }}>
                        <ListItemText
                          primary={d.documentTitle}
                          secondary={d.documentType}
                        />
                        <Description fontSize="small" color="action" />
                      </ListItem>
                    </React.Fragment>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
