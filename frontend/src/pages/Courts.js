import React, { useState, useEffect } from 'react';
import {
  Container, Grid, Card, CardContent, Typography, Box,
  TextField, MenuItem, Select, FormControl, InputLabel,
  Chip, CircularProgress, Alert, InputAdornment,
  Accordion, AccordionSummary, AccordionDetails, Paper,
} from '@mui/material';
import { Search, LocationOn, Gavel, ExpandMore, Phone, Email } from '@mui/icons-material';
import api from '../services/api';

const COURT_TYPES = [
  'All Types', 'SUPREME_COURT', 'HIGH_COURT', 'DISTRICT_COURT',
  'SESSIONS_COURT', 'MAGISTRATE_COURT', 'FAMILY_COURT',
  'CONSUMER_FORUM', 'LABOUR_COURT', 'TRIBUNAL',
];

const STATES = [
  'All States', 'Delhi', 'Maharashtra', 'Karnataka', 'Tamil Nadu',
  'West Bengal', 'Uttar Pradesh', 'Gujarat', 'Rajasthan', 'Kerala',
  'Madhya Pradesh', 'Andhra Pradesh', 'Telangana', 'Punjab', 'Haryana',
];

const formatCourtType = t => t === 'All Types' ? t : t.replace(/_/g, ' ');

const CourtCard = ({ court }) => (
  <Card sx={{ mb: 2, '&:hover': { boxShadow: 4 } }}>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
        <Typography variant="h6" fontWeight="bold">{court.name}</Typography>
        <Chip label={formatCourtType(court.courtType || '')} size="small" color="primary" variant="outlined" />
      </Box>

      {(court.city || court.state) && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
          <LocationOn fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary">
            {[court.address, court.district, court.city, court.state, court.pincode].filter(Boolean).join(', ')}
          </Typography>
        </Box>
      )}

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 1 }}>
        {court.phone && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Phone fontSize="small" color="action" />
            <Typography variant="body2">{court.phone}</Typography>
          </Box>
        )}
        {court.email && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Email fontSize="small" color="action" />
            <Typography variant="body2">{court.email}</Typography>
          </Box>
        )}
      </Box>

      <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
        {court.hasEFiling && <Chip label="E-Filing" size="small" color="success" />}
        {court.hasVideoConferencing && <Chip label="Video Conferencing" size="small" color="info" />}
        {court.isHighCourt && <Chip label="High Court" size="small" color="warning" />}
      </Box>

      {court.jurisdiction && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Jurisdiction: {court.jurisdiction}
        </Typography>
      )}
    </CardContent>
  </Card>
);

const Courts = () => {
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [courtType, setCourtType] = useState('All Types');
  const [state, setState] = useState('All States');

  const fetchCourts = async () => {
    setLoading(true);
    try {
      let res;
      if (search) {
        res = await api.get('/courts/search', { params: { query: search } });
      } else if (courtType !== 'All Types') {
        res = await api.get(`/courts/type/${courtType}`);
      } else if (state !== 'All States') {
        res = await api.get(`/courts/state/${state}`);
      } else {
        res = await api.get('/courts');
      }
      setCourts(res.data || []);
    } catch {
      setError('Failed to load courts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCourts(); }, [courtType, state]);

  const handleSearch = () => fetchCourts();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>Court Information</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Find courts across India, their jurisdictions, contact information, and facilities
      </Typography>

      {/* Search & Filters */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
        <TextField
          placeholder="Search courts by name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleSearch()}
          sx={{ flexGrow: 1, minWidth: 220 }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
          }}
        />
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Court Type</InputLabel>
          <Select value={courtType} label="Court Type" onChange={e => { setCourtType(e.target.value); setSearch(''); }}>
            {COURT_TYPES.map(t => <MenuItem key={t} value={t}>{formatCourtType(t)}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel>State</InputLabel>
          <Select value={state} label="State" onChange={e => { setState(e.target.value); setSearch(''); }}>
            {STATES.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
          </Select>
        </FormControl>
      </Box>

      {/* Indian Court Hierarchy Info */}
      <Accordion sx={{ mb: 4 }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Gavel color="primary" />
            <Typography fontWeight="bold">Indian Court Hierarchy</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {[
              { level: '1', name: 'Supreme Court of India', desc: 'Highest court. Located in New Delhi. Final appellate court.' },
              { level: '2', name: 'High Courts', desc: '25 High Courts across states/UTs. Hear appeals from district courts.' },
              { level: '3', name: 'District & Sessions Courts', desc: 'One per district. Civil & criminal jurisdiction.' },
              { level: '4', name: 'Subordinate Courts', desc: 'Civil Judge Courts, Magistrate Courts, Family Courts, Consumer Forums.' },
            ].map(c => (
              <Grid item xs={12} sm={6} md={3} key={c.level}>
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" color="primary" fontWeight="bold">{c.level}</Typography>
                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom>{c.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{c.desc}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
        {loading ? 'Loading...' : `${courts.length} courts found`}
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={6}><CircularProgress /></Box>
      ) : courts.length === 0 ? (
        <Box textAlign="center" mt={6}>
          <Gavel sx={{ fontSize: 64, color: 'action.disabled' }} />
          <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>No courts found</Typography>
        </Box>
      ) : (
        courts.map(court => <CourtCard key={court.id} court={court} />)
      )}
    </Container>
  );
};

export default Courts;
