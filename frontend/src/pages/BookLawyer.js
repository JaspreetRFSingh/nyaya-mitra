import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container, Grid, Card, CardContent, CardActions, Typography,
  TextField, Button, Box, Chip, Rating, Avatar, Divider,
  CircularProgress, Alert, Step, Stepper, StepLabel, Paper,
  MenuItem, Select, FormControl, InputLabel, InputAdornment,
  Dialog, DialogTitle, DialogContent, DialogActions, List,
  ListItem, ListItemText,
} from '@mui/material';
import {
  Search, VideoCall, Phone, Person, Star, LocationOn, CheckCircle,
  Gavel, ArrowForward, ArrowBack,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { format } from 'date-fns';

const STEPS = ['Find a Lawyer', 'Choose Slot', 'Confirm Booking'];

const SPECIALIZATIONS = [
  'All', 'Civil Law', 'Criminal Law', 'Family Law', 'Corporate Law',
  'Property Law', 'Consumer Law', 'Labour Law', 'Banking Law', 'Cyber Law',
];

const LawyerCard = ({ lawyer, onSelect, selected }) => (
  <Card
    sx={{
      cursor: 'pointer',
      border: '2px solid',
      borderColor: selected ? 'primary.main' : 'transparent',
      boxShadow: selected ? 6 : 1,
      '&:hover': { boxShadow: 4, borderColor: 'primary.light' },
    }}
    onClick={() => onSelect(lawyer)}
  >
    <CardContent>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.main', fontSize: 20, flexShrink: 0 }}>
          {lawyer.firstName?.[0]}{lawyer.lastName?.[0]}
        </Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Typography fontWeight="bold">Adv. {lawyer.firstName} {lawyer.lastName}</Typography>
            {selected && <CheckCircle color="primary" />}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Rating value={lawyer.rating || 0} size="small" readOnly precision={0.5} />
            <Typography variant="caption" color="text.secondary">({lawyer.totalConsultations || 0})</Typography>
          </Box>
        </Box>
      </Box>

      {(lawyer.city || lawyer.state) && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
          <LocationOn fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary">{lawyer.city}, {lawyer.state}</Typography>
        </Box>
      )}

      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        {lawyer.yearsOfExperience} yrs exp · {lawyer.education || 'LLB'}
      </Typography>

      {lawyer.specializations?.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1.5 }}>
          {lawyer.specializations.slice(0, 3).map(s => (
            <Chip key={s} label={s} size="small" variant="outlined" />
          ))}
        </Box>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h6" color="primary" fontWeight="bold">
            ₹{lawyer.consultationFee?.toLocaleString() || 'N/A'}
          </Typography>
          <Typography variant="caption" color="text.secondary">per consultation</Typography>
        </Box>
        {lawyer.isAvailableForConsultation && (
          <Chip label="Available Now" color="success" size="small" />
        )}
      </Box>
    </CardContent>
    <CardActions sx={{ pt: 0, px: 2, pb: 2 }}>
      <Button
        fullWidth
        variant={selected ? 'contained' : 'outlined'}
        endIcon={<ArrowForward />}
        onClick={() => onSelect(lawyer)}
      >
        {selected ? 'Selected' : 'Select This Lawyer'}
      </Button>
      <Button size="small" component={Link} to={`/lawyers/${lawyer.id}`} onClick={e => e.stopPropagation()}>
        View Profile
      </Button>
    </CardActions>
  </Card>
);

const BookLawyer = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [specialization, setSpecialization] = useState('All');
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [booking, setBooking] = useState({
    title: '',
    description: '',
    caseType: '',
    scheduledDate: '',
    duration: 60,
    type: 'VIDEO',
  });
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(null);

  useEffect(() => {
    api.get('/consultations/lawyer/available', {
      params: specialization !== 'All' ? { specialization } : {}
    })
      .then(r => setLawyers(r.data || []))
      .catch(() => setError('Failed to load lawyers'))
      .finally(() => setLoading(false));
  }, [specialization]);

  const filtered = lawyers.filter(l =>
    !search || `${l.firstName} ${l.lastName} ${l.city || ''}`.toLowerCase().includes(search.toLowerCase())
  );

  const handleBook = async () => {
    if (!booking.title || !booking.scheduledDate) {
      setError('Please fill in title and date');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const res = await api.post('/consultations', {
        ...booking,
        lawyerId: selectedLawyer.id,
      });
      setConfirmed(res.data);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
        <Gavel sx={{ fontSize: 64, color: 'primary.main' }} />
        <Typography variant="h5" fontWeight="bold" sx={{ mt: 2, mb: 1 }}>Login to Book a Lawyer</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Create a free account to book consultations with verified lawyers.
        </Typography>
        <Button variant="contained" size="large" component={Link} to="/login" sx={{ mr: 2 }}>
          Login
        </Button>
        <Button variant="outlined" size="large" component={Link} to="/register">
          Register Free
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>Book a Lawyer / Advocate</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Connect with verified lawyers for video call, phone, or in-person consultations.
      </Typography>

      <Stepper activeStep={step} sx={{ mb: 4 }}>
        {STEPS.map(label => <Step key={label}><StepLabel>{label}</StepLabel></Step>)}
      </Stepper>

      {error && <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>{error}</Alert>}

      {/* Step 1: Find a Lawyer */}
      {step === 0 && (
        <Box>
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <TextField
              placeholder="Search by name or city..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              sx={{ flexGrow: 1, minWidth: 220 }}
              InputProps={{ startAdornment: <InputAdornment position="start"><Search /></InputAdornment> }}
            />
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Specialization</InputLabel>
              <Select value={specialization} label="Specialization" onChange={e => setSpecialization(e.target.value)}>
                {SPECIALIZATIONS.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
              </Select>
            </FormControl>
          </Box>

          {loading ? (
            <Box display="flex" justifyContent="center" mt={6}><CircularProgress /></Box>
          ) : filtered.length === 0 ? (
            <Box textAlign="center" mt={6}>
              <Typography color="text.secondary">No lawyers found matching your criteria.</Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {filtered.map(l => (
                <Grid item xs={12} sm={6} md={4} key={l.id}>
                  <LawyerCard
                    lawyer={l}
                    selected={selectedLawyer?.id === l.id}
                    onSelect={lawyer => { setSelectedLawyer(lawyer); setStep(1); }}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      )}

      {/* Step 2: Booking Details */}
      {step === 1 && selectedLawyer && (
        <Box>
          <Button startIcon={<ArrowBack />} onClick={() => setStep(0)} sx={{ mb: 3 }}>
            Back to Lawyers
          </Button>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper variant="outlined" sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>Selected Lawyer</Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
                    {selectedLawyer.firstName?.[0]}{selectedLawyer.lastName?.[0]}
                  </Avatar>
                  <Box>
                    <Typography fontWeight="bold">Adv. {selectedLawyer.firstName} {selectedLawyer.lastName}</Typography>
                    <Rating value={selectedLawyer.rating || 0} size="small" readOnly />
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary">{selectedLawyer.yearsOfExperience} years experience</Typography>
                <Typography variant="h6" color="primary" fontWeight="bold" sx={{ mt: 1 }}>
                  ₹{selectedLawyer.consultationFee?.toLocaleString()}
                </Typography>
                <Typography variant="caption" color="text.secondary">per consultation</Typography>
                <Divider sx={{ my: 1.5 }} />
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selectedLawyer.specializations?.slice(0, 4).map(s => (
                    <Chip key={s} label={s} size="small" variant="outlined" />
                  ))}
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>Booking Details</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth required
                    label="Subject / Title of Consultation"
                    value={booking.title}
                    onChange={e => setBooking(b => ({ ...b, title: e.target.value }))}
                    placeholder="e.g., Property Dispute Advice, Divorce Consultation"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth multiline rows={3}
                    label="Describe your legal issue"
                    value={booking.description}
                    onChange={e => setBooking(b => ({ ...b, description: e.target.value }))}
                    placeholder="Brief description of your legal problem..."
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Type of case (optional)"
                    value={booking.caseType}
                    onChange={e => setBooking(b => ({ ...b, caseType: e.target.value }))}
                    placeholder="e.g., Family, Property, Criminal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Consultation Mode</InputLabel>
                    <Select
                      value={booking.type}
                      label="Consultation Mode"
                      onChange={e => setBooking(b => ({ ...b, type: e.target.value }))}
                    >
                      <MenuItem value="VIDEO"><VideoCall sx={{ mr: 1 }} fontSize="small" />Video Call</MenuItem>
                      <MenuItem value="PHONE"><Phone sx={{ mr: 1 }} fontSize="small" />Phone Call</MenuItem>
                      <MenuItem value="IN_PERSON"><Person sx={{ mr: 1 }} fontSize="small" />In-Person</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth required
                    label="Preferred Date & Time"
                    type="datetime-local"
                    value={booking.scheduledDate}
                    onChange={e => setBooking(b => ({ ...b, scheduledDate: e.target.value }))}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ min: new Date().toISOString().slice(0, 16) }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Duration</InputLabel>
                    <Select
                      value={booking.duration}
                      label="Duration"
                      onChange={e => setBooking(b => ({ ...b, duration: e.target.value }))}
                    >
                      <MenuItem value={30}>30 minutes</MenuItem>
                      <MenuItem value={60}>1 hour</MenuItem>
                      <MenuItem value={90}>1.5 hours</MenuItem>
                      <MenuItem value={120}>2 hours</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Paper sx={{ p: 2, bgcolor: 'primary.50' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography>Consultation fee ({booking.duration} min)</Typography>
                      <Typography fontWeight="bold">₹{selectedLawyer.consultationFee?.toLocaleString()}</Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">Payment collected by the lawyer directly</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handleBook}
                    disabled={submitting}
                    endIcon={<CheckCircle />}
                  >
                    {submitting ? 'Confirming...' : 'Confirm Booking'}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Step 3: Confirmation */}
      {step === 2 && (
        <Box textAlign="center" sx={{ py: 6 }}>
          <CheckCircle sx={{ fontSize: 80, color: 'success.main' }} />
          <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>Consultation Booked!</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 4 }}>
            Your consultation with <strong>Adv. {selectedLawyer?.firstName} {selectedLawyer?.lastName}</strong> is confirmed.
            The lawyer will reach out to confirm the slot.
          </Typography>

          {confirmed && booking.scheduledDate && (
            <Paper variant="outlined" sx={{ p: 3, maxWidth: 400, mx: 'auto', mb: 4, textAlign: 'left' }}>
              <Typography variant="subtitle2" gutterBottom color="text.secondary">BOOKING DETAILS</Typography>
              <Divider sx={{ mb: 2 }} />
              <List dense>
                {[
                  ['Consultation', booking.title],
                  ['Mode', booking.type === 'VIDEO' ? 'Video Call' : booking.type === 'PHONE' ? 'Phone Call' : 'In-Person'],
                  ['Date & Time', format(new Date(booking.scheduledDate), 'dd MMM yyyy, hh:mm a')],
                  ['Duration', `${booking.duration} minutes`],
                  ['Lawyer Fee', `₹${selectedLawyer?.consultationFee?.toLocaleString()}`],
                ].map(([label, value]) => (
                  <ListItem key={label} disablePadding sx={{ py: 0.5 }}>
                    <ListItemText
                      primary={<><span style={{ color: '#666', minWidth: 120, display: 'inline-block' }}>{label}:</span> <strong>{value}</strong></>}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="contained" component={Link} to="/consultations">
              View My Consultations
            </Button>
            <Button variant="outlined" onClick={() => { setStep(0); setSelectedLawyer(null); setConfirmed(null); }}>
              Book Another
            </Button>
            <Button component={Link} to="/dashboard">
              Go to Dashboard
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default BookLawyer;
