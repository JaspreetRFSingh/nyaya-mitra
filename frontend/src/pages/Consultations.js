import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Container, Grid, Card, CardContent, Typography, Button, Box,
  Chip, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, MenuItem, Select, FormControl, InputLabel,
  CircularProgress, Alert, Tabs, Tab, Divider,
} from '@mui/material';
import { Add, VideoCall, Phone, Person, Cancel } from '@mui/icons-material';
import api from '../services/api';
import { format } from 'date-fns';

const STATUS_COLOR = {
  PENDING: 'warning', CONFIRMED: 'info', COMPLETED: 'success',
  CANCELLED: 'error', RESCHEDULED: 'default', NO_SHOW: 'error',
};

const TYPE_ICON = { VIDEO: <VideoCall />, PHONE: <Phone />, IN_PERSON: <Person /> };

const BookDialog = ({ open, onClose, onBooked, lawyerId }) => {
  const [lawyers, setLawyers] = useState([]);
  const [form, setForm] = useState({
    lawyerId: lawyerId || '',
    title: '',
    description: '',
    caseType: '',
    scheduledDate: '',
    duration: 30,
    type: 'VIDEO',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/consultations/lawyer/available').then(r => setLawyers(r.data || [])).catch(() => {});
  }, []);

  const handleSubmit = async () => {
    if (!form.lawyerId || !form.title || !form.scheduledDate) {
      setError('Please fill in all required fields');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await api.post('/consultations', form);
      onBooked();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book consultation');
    } finally {
      setLoading(false);
    }
  };

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Book a Consultation</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Select Lawyer</InputLabel>
              <Select value={form.lawyerId} label="Select Lawyer" onChange={e => set('lawyerId', e.target.value)}>
                {lawyers.map(l => (
                  <MenuItem key={l.id} value={l.id}>
                    Adv. {l.firstName} {l.lastName} - ₹{l.consultationFee}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth required label="Consultation Title" value={form.title} onChange={e => set('title', e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth multiline rows={3} label="Describe your legal issue" value={form.description} onChange={e => set('description', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Case Type (e.g., Family, Property)" value={form.caseType} onChange={e => set('caseType', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Consultation Type</InputLabel>
              <Select value={form.type} label="Consultation Type" onChange={e => set('type', e.target.value)}>
                <MenuItem value="VIDEO">Video Call</MenuItem>
                <MenuItem value="PHONE">Phone Call</MenuItem>
                <MenuItem value="IN_PERSON">In-Person</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth required
              label="Date & Time"
              type="datetime-local"
              value={form.scheduledDate}
              onChange={e => set('scheduledDate', e.target.value)}
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: new Date().toISOString().slice(0, 16) }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Duration</InputLabel>
              <Select value={form.duration} label="Duration" onChange={e => set('duration', e.target.value)}>
                <MenuItem value={30}>30 minutes</MenuItem>
                <MenuItem value={60}>1 hour</MenuItem>
                <MenuItem value={90}>1.5 hours</MenuItem>
                <MenuItem value={120}>2 hours</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Booking...' : 'Book Consultation'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Consultations = () => {
  const [searchParams] = useSearchParams();
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tab, setTab] = useState(0);
  const [bookOpen, setBookOpen] = useState(false);
  const lawyerId = searchParams.get('lawyer');

  useEffect(() => {
    if (lawyerId) setBookOpen(true);
  }, [lawyerId]);

  const fetchConsultations = async () => {
    setLoading(true);
    try {
      const res = await api.get('/consultations');
      setConsultations(res.data || []);
    } catch {
      setError('Failed to load consultations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchConsultations(); }, []);

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this consultation?')) return;
    try {
      await api.post(`/consultations/${id}/cancel`, { reason: 'Cancelled by client' });
      fetchConsultations();
    } catch {
      setError('Failed to cancel consultation');
    }
  };

  const tabs = ['All', 'Upcoming', 'Completed', 'Cancelled'];
  const filtered = consultations.filter(c => {
    if (tab === 0) return true;
    if (tab === 1) return ['PENDING', 'CONFIRMED', 'RESCHEDULED'].includes(c.status);
    if (tab === 2) return c.status === 'COMPLETED';
    if (tab === 3) return c.status === 'CANCELLED';
    return true;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold">My Consultations</Typography>
          <Typography variant="body2" color="text.secondary">Manage your lawyer consultations</Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={() => setBookOpen(true)}>
          Book Consultation
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          {tabs.map(t => <Tab key={t} label={t} />)}
        </Tabs>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={6}><CircularProgress /></Box>
      ) : filtered.length === 0 ? (
        <Box textAlign="center" mt={6}>
          <Typography variant="h6" color="text.secondary">No consultations found</Typography>
          <Button variant="contained" sx={{ mt: 2 }} onClick={() => setBookOpen(true)}>
            Book Your First Consultation
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filtered.map(c => (
            <Grid item xs={12} md={6} key={c.id}>
              <Card sx={{ '&:hover': { boxShadow: 4 } }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6" fontWeight="bold">{c.title}</Typography>
                    <Chip label={c.status} color={STATUS_COLOR[c.status] || 'default'} size="small" />
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    {TYPE_ICON[c.type]}
                    <Typography variant="body2">
                      {c.type === 'VIDEO' ? 'Video' : c.type === 'PHONE' ? 'Phone' : 'In-Person'} with {c.lawyerName}
                    </Typography>
                  </Box>

                  {c.scheduledDate && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {format(new Date(c.scheduledDate), 'dd MMM yyyy, hh:mm a')} ({c.duration} min)
                    </Typography>
                  )}

                  {c.description && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }} noWrap>
                      {c.description}
                    </Typography>
                  )}

                  <Divider sx={{ my: 1 }} />

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      {c.paymentStatus === 'PAID' ? `₹${c.amount} Paid` : `₹${c.amount || 0} Pending`}
                    </Typography>
                    {['PENDING', 'CONFIRMED'].includes(c.status) && (
                      <Button
                        size="small"
                        color="error"
                        startIcon={<Cancel />}
                        onClick={() => handleCancel(c.id)}
                      >
                        Cancel
                      </Button>
                    )}
                    {c.status === 'CONFIRMED' && c.meetingLink && (
                      <Button size="small" variant="contained" href={c.meetingLink} target="_blank">
                        Join Meeting
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <BookDialog
        open={bookOpen}
        onClose={() => setBookOpen(false)}
        onBooked={fetchConsultations}
        lawyerId={lawyerId}
      />
    </Container>
  );
};

export default Consultations;
