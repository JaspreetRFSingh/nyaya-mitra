import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Grid, Card, CardContent, CardActions, Typography,
  TextField, Button, Box, Chip, Rating, Avatar, MenuItem,
  Select, FormControl, InputLabel, CircularProgress, Alert,
  InputAdornment,
} from '@mui/material';
import { Search, LocationOn, Star } from '@mui/icons-material';
import api from '../services/api';

const SPECIALIZATIONS = [
  'All', 'Civil Law', 'Criminal Law', 'Family Law', 'Corporate Law',
  'Property Law', 'Consumer Law', 'Labour Law', 'Banking Law',
  'Cyber Law', 'Tax Law', 'Constitutional Law',
];

const STATES = [
  'All States', 'Delhi', 'Maharashtra', 'Karnataka', 'Tamil Nadu',
  'West Bengal', 'Uttar Pradesh', 'Gujarat', 'Rajasthan', 'Kerala',
];

const Lawyers = () => {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [specialization, setSpecialization] = useState('All');
  const [state, setState] = useState('All States');

  const fetchLawyers = async () => {
    setLoading(true);
    try {
      const params = {};
      if (specialization !== 'All') params.specialization = specialization;
      if (state !== 'All States') params.state = state;
      const res = await api.get('/lawyers', { params });
      setLawyers(res.data || []);
    } catch (err) {
      setError('Failed to load lawyers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLawyers(); }, [specialization, state]);

  const filtered = lawyers.filter(l =>
    !search ||
    `${l.firstName} ${l.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
    l.city?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Find a Lawyer
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Connect with verified lawyers across India
      </Typography>

      {/* Filters */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
        <TextField
          placeholder="Search by name or city..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          sx={{ flexGrow: 1, minWidth: 220 }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
          }}
        />
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Specialization</InputLabel>
          <Select value={specialization} label="Specialization" onChange={e => setSpecialization(e.target.value)}>
            {SPECIALIZATIONS.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>State</InputLabel>
          <Select value={state} label="State" onChange={e => setState(e.target.value)}>
            {STATES.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
          </Select>
        </FormControl>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {loading ? (
        <Box display="flex" justifyContent="center" mt={6}><CircularProgress /></Box>
      ) : filtered.length === 0 ? (
        <Box textAlign="center" mt={6}>
          <Typography variant="h6" color="text.secondary">No lawyers found matching your criteria</Typography>
          <Button sx={{ mt: 2 }} onClick={() => { setSearch(''); setSpecialization('All'); setState('All States'); }}>
            Clear Filters
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filtered.map(lawyer => (
            <Grid item xs={12} sm={6} md={4} key={lawyer.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', '&:hover': { boxShadow: 6 } }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.main', fontSize: 20 }}>
                      {lawyer.firstName?.[0]}{lawyer.lastName?.[0]}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight="bold">
                        Adv. {lawyer.firstName} {lawyer.lastName}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Rating value={lawyer.rating || 0} size="small" readOnly precision={0.5} />
                        <Typography variant="caption" color="text.secondary">
                          ({lawyer.totalConsultations || 0})
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {lawyer.city && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                      <LocationOn fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {lawyer.city}, {lawyer.state}
                      </Typography>
                    </Box>
                  )}

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {lawyer.yearsOfExperience} years experience
                  </Typography>

                  {lawyer.specializations?.length > 0 && (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                      {lawyer.specializations.slice(0, 3).map(s => (
                        <Chip key={s} label={s} size="small" variant="outlined" />
                      ))}
                    </Box>
                  )}

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" color="primary" fontWeight="bold">
                      ₹{lawyer.consultationFee?.toLocaleString() || 'N/A'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">per consultation</Typography>
                  </Box>

                  {lawyer.isAvailableForConsultation && (
                    <Chip label="Available" color="success" size="small" sx={{ mt: 1 }} />
                  )}
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    component={Link}
                    to={`/lawyers/${lawyer.id}`}
                  >
                    View Profile & Book
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Lawyers;
