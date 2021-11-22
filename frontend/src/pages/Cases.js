import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Grid, Card, CardContent, Typography, Button, Box,
  Chip, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, MenuItem, Select, FormControl, InputLabel,
  CircularProgress, Alert, Tabs, Tab,
} from '@mui/material';
import { Add, ArrowForward, Gavel } from '@mui/icons-material';
import api from '../services/api';
import { format } from 'date-fns';

const STATUS_COLOR = {
  PENDING: 'warning', ADMITTED: 'success', IN_PROGRESS: 'info',
  JUDGMENT_RESERVED: 'warning', DECIDED: 'default', DISMISSED: 'error',
  APPEALED: 'warning', SETTLED: 'success', WITHDRAWN: 'default',
};

const CASE_TYPES = ['CIVIL', 'CRIMINAL', 'FAMILY', 'CONSUMER', 'WRIT', 'APPEAL', 'PIL', 'ARBITRATION', 'TRIBUNAL'];
const CASE_CATEGORIES = [
  'PROPERTY_DISPUTE', 'CHEQUE_BOUNCE', 'DIVORCE', 'MAINTENANCE', 'CUSTODY',
  'MURDER', 'THEFT', 'FRAUD', 'ASSAULT', 'CONSUMER_COMPLAINT', 'RECOVERY',
  'EVICTION', 'MOTOR_ACCIDENT', 'LABOUR_DISPUTE', 'OTHER',
];

const AddCaseDialog = ({ open, onClose, onAdded }) => {
  const [form, setForm] = useState({
    caseTitle: '', caseDescription: '', type: 'CIVIL', category: 'OTHER',
    courtName: '', courtType: '', state: '', district: '',
    caseNumber: '', opposingParty: '', filingDate: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    if (!form.caseTitle || !form.type) {
      setError('Case title and type are required');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await api.post('/cases', form);
      onAdded();
      onClose();
      setForm({ caseTitle: '', caseDescription: '', type: 'CIVIL', category: 'OTHER', courtName: '', courtType: '', state: '', district: '', caseNumber: '', opposingParty: '', filingDate: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create case');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Add New Case</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          <Grid item xs={12}>
            <TextField fullWidth required label="Case Title" value={form.caseTitle} onChange={e => set('caseTitle', e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth multiline rows={3} label="Case Description" value={form.caseDescription} onChange={e => set('caseDescription', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Case Type</InputLabel>
              <Select value={form.type} label="Case Type" onChange={e => set('type', e.target.value)}>
                {CASE_TYPES.map(t => <MenuItem key={t} value={t}>{t.replace('_', ' ')}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select value={form.category} label="Category" onChange={e => set('category', e.target.value)}>
                {CASE_CATEGORIES.map(c => <MenuItem key={c} value={c}>{c.replace(/_/g, ' ')}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Case Number" value={form.caseNumber} onChange={e => set('caseNumber', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Opposing Party" value={form.opposingParty} onChange={e => set('opposingParty', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Court Name" value={form.courtName} onChange={e => set('courtName', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="State" value={form.state} onChange={e => set('state', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="District" value={form.district} onChange={e => set('district', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Filing Date" type="date" value={form.filingDate} onChange={e => set('filingDate', e.target.value)} InputLabelProps={{ shrink: true }} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Saving...' : 'Add Case'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Cases = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tab, setTab] = useState(0);
  const [addOpen, setAddOpen] = useState(false);

  const fetchCases = async () => {
    setLoading(true);
    try {
      const res = await api.get('/cases');
      setCases(res.data || []);
    } catch {
      setError('Failed to load cases');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCases(); }, []);

  const tabs = ['All', 'Active', 'Decided', 'Other'];
  const filtered = cases.filter(c => {
    if (tab === 0) return true;
    if (tab === 1) return ['PENDING', 'ADMITTED', 'IN_PROGRESS', 'JUDGMENT_RESERVED'].includes(c.status);
    if (tab === 2) return ['DECIDED', 'ALLOWED', 'DISMISSED'].includes(c.status);
    return ['SETTLED', 'WITHDRAWN', 'APPEALED', 'TRANSFERRED'].includes(c.status);
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold">My Cases</Typography>
          <Typography variant="body2" color="text.secondary">Track all your legal cases</Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={() => setAddOpen(true)}>
          Add Case
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
          <Gavel sx={{ fontSize: 64, color: 'action.disabled' }} />
          <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>No cases found</Typography>
          <Button variant="contained" sx={{ mt: 2 }} onClick={() => setAddOpen(true)}>Add Your First Case</Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filtered.map(c => (
            <Grid item xs={12} md={6} key={c.id}>
              <Card sx={{ '&:hover': { boxShadow: 4 } }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="h6" fontWeight="bold" noWrap sx={{ maxWidth: '70%' }}>
                      {c.caseTitle}
                    </Typography>
                    <Chip label={c.status?.replace('_', ' ')} color={STATUS_COLOR[c.status] || 'default'} size="small" />
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                    <Chip label={c.type} size="small" variant="outlined" />
                    {c.category && <Chip label={c.category.replace(/_/g, ' ')} size="small" variant="outlined" />}
                  </Box>

                  {c.caseNumber && (
                    <Typography variant="body2" color="text.secondary">Case No: {c.caseNumber}</Typography>
                  )}
                  {c.courtName && (
                    <Typography variant="body2" color="text.secondary">Court: {c.courtName}</Typography>
                  )}
                  {c.nextHearingDate && (
                    <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
                      Next Hearing: {format(new Date(c.nextHearingDate), 'dd MMM yyyy')}
                      {c.nextHearingPurpose && ` (${c.nextHearingPurpose})`}
                    </Typography>
                  )}
                  {c.lawyerName && (
                    <Typography variant="body2" color="text.secondary">Lawyer: {c.lawyerName}</Typography>
                  )}

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button
                      size="small"
                      endIcon={<ArrowForward />}
                      component={Link}
                      to={`/cases/${c.id}`}
                    >
                      View Details
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <AddCaseDialog open={addOpen} onClose={() => setAddOpen(false)} onAdded={fetchCases} />
    </Container>
  );
};

export default Cases;
