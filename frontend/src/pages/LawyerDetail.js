import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container, Grid, Card, CardContent, Typography, Button, Box,
  Chip, Rating, Avatar, Divider, CircularProgress, Alert, Tab, Tabs,
  List, ListItem, ListItemText,
} from '@mui/material';
import {
  LocationOn, Work, School, Phone, Star, VideoCall, Person,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const LawyerDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [lawyer, setLawyer] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tab, setTab] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      try {
        const [lawyerRes, reviewsRes] = await Promise.all([
          api.get(`/lawyers/${id}`),
          api.get(`/lawyers/${id}/reviews`),
        ]);
        setLawyer(lawyerRes.data);
        setReviews(reviewsRes.data || []);
      } catch {
        setError('Failed to load lawyer profile');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) return <Box display="flex" justifyContent="center" mt={8}><CircularProgress /></Box>;
  if (error) return <Container sx={{ py: 4 }}><Alert severity="error">{error}</Alert></Container>;
  if (!lawyer) return null;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Left Column - Profile */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ width: 100, height: 100, bgcolor: 'primary.main', fontSize: 36, mx: 'auto', mb: 2 }}>
                {lawyer.firstName?.[0]}{lawyer.lastName?.[0]}
              </Avatar>
              <Typography variant="h5" fontWeight="bold">
                Adv. {lawyer.firstName} {lawyer.lastName}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mt: 1 }}>
                <Rating value={lawyer.rating || 0} readOnly precision={0.5} />
                <Typography variant="body2">({lawyer.totalConsultations || 0} consultations)</Typography>
              </Box>

              {lawyer.city && (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mt: 1 }}>
                  <LocationOn fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">{lawyer.city}, {lawyer.state}</Typography>
                </Box>
              )}

              {lawyer.isAvailableForConsultation && (
                <Chip label="Available for Consultation" color="success" sx={{ mt: 1 }} />
              )}

              <Divider sx={{ my: 2 }} />

              <Typography variant="h5" color="primary" fontWeight="bold">
                ₹{lawyer.consultationFee?.toLocaleString()}
              </Typography>
              <Typography variant="caption" color="text.secondary">per consultation</Typography>

              <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
                {user ? (
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<VideoCall />}
                    component={Link}
                    to={`/consultations?lawyer=${id}`}
                  >
                    Book Consultation
                  </Button>
                ) : (
                  <Button variant="contained" fullWidth component={Link} to="/login">
                    Login to Book
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>

          {/* Quick Info */}
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Quick Info</Typography>
              <List dense>
                {[
                  { icon: <Work fontSize="small" />, label: `${lawyer.yearsOfExperience} years experience` },
                  { icon: <School fontSize="small" />, label: lawyer.education || 'N/A' },
                  { icon: <Person fontSize="small" />, label: `Bar Council: ${lawyer.barCouncilName || 'N/A'}` },
                  { icon: <Phone fontSize="small" />, label: lawyer.phone || 'N/A' },
                ].map((item, i) => (
                  <ListItem key={i} disablePadding sx={{ py: 0.5 }}>
                    <Box sx={{ color: 'action.active', mr: 1 }}>{item.icon}</Box>
                    <ListItemText primary={item.label} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column - Details */}
        <Grid item xs={12} md={8}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={tab} onChange={(_, v) => setTab(v)}>
              <Tab label="About" />
              <Tab label="Specializations" />
              <Tab label="Reviews" />
            </Tabs>
          </Box>

          {tab === 0 && (
            <Box>
              <Typography variant="h6" gutterBottom>About</Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Adv. {lawyer.firstName} {lawyer.lastName} is a qualified lawyer with {lawyer.yearsOfExperience} years
                of experience practicing in {lawyer.barCouncilName || 'Indian courts'}. With expertise in
                {lawyer.specializations?.join(', ')}, they provide comprehensive legal solutions.
              </Typography>
              {lawyer.chamberAddress && (
                <>
                  <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Chamber Address</Typography>
                  <Typography variant="body1" color="text.secondary">{lawyer.chamberAddress}</Typography>
                </>
              )}
              {lawyer.address && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {lawyer.address}, {lawyer.city}, {lawyer.state} - {lawyer.pincode}
                </Typography>
              )}
            </Box>
          )}

          {tab === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>Areas of Specialization</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {lawyer.specializations?.map(s => (
                  <Chip key={s} label={s} color="primary" variant="outlined" />
                ))}
              </Box>
            </Box>
          )}

          {tab === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>Client Reviews</Typography>
              {reviews.length === 0 ? (
                <Typography color="text.secondary">No reviews yet</Typography>
              ) : (
                reviews.map((r, i) => (
                  <Card key={i} sx={{ mb: 2, bgcolor: 'grey.50' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography fontWeight="bold">{r.reviewerName || 'Anonymous'}</Typography>
                        <Rating value={r.rating} readOnly size="small" />
                      </Box>
                      <Typography variant="body2" color="text.secondary">{r.comment}</Typography>
                    </CardContent>
                  </Card>
                ))
              )}
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default LawyerDetail;
