import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container, Grid, Card, CardContent, Typography, Button, Box,
  Chip, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, CircularProgress, Alert, Divider, Timeline,
  TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent,
  TimelineDot, Paper,
} from '@mui/material';
import { ArrowBack, Add, Gavel, EventNote } from '@mui/icons-material';
import api from '../services/api';
import { format } from 'date-fns';

const STATUS_COLOR = {
  PENDING: 'warning', ADMITTED: 'success', IN_PROGRESS: 'info',
  JUDGMENT_RESERVED: 'warning', DECIDED: 'default', DISMISSED: 'error',
  APPEALED: 'warning', SETTLED: 'success', WITHDRAWN: 'default',
};

const AddHearingDialog = ({ open, onClose, caseId, onAdded }) => {
  const [form, setForm] = useState({ date: '', purpose: '', order: '', judge: '', nextDate: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    if (!form.date || !form.purpose) {
      setError('Date and purpose are required');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await api.post(`/cases/${caseId}/hearing`, form);
      onAdded();
      onClose();
      setForm({ date: '', purpose: '', order: '', judge: '', nextDate: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add hearing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Hearing Record</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth required label="Hearing Date" type="date" value={form.date} onChange={e => set('date', e.target.value)} InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth required label="Purpose" value={form.purpose} onChange={e => set('purpose', e.target.value)} placeholder="e.g., Arguments, Evidence" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Court Order / Proceedings" multiline rows={3} value={form.order} onChange={e => set('order', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Judge Name" value={form.judge} onChange={e => set('judge', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Next Hearing Date" type="date" value={form.nextDate} onChange={e => set('nextDate', e.target.value)} InputLabelProps={{ shrink: true }} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Saving...' : 'Add Hearing'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const InfoRow = ({ label, value }) => (
  value ? (
    <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
      <Typography variant="body2" color="text.secondary" sx={{ minWidth: 140 }}>{label}:</Typography>
      <Typography variant="body2">{value}</Typography>
    </Box>
  ) : null
);

const CaseDetail = () => {
  const { id } = useParams();
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [hearingOpen, setHearingOpen] = useState(false);

  const fetchCase = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/cases/${id}`);
      setCaseData(res.data);
    } catch {
      setError('Failed to load case details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCase(); }, [id]);

  if (loading) return <Box display="flex" justifyContent="center" mt={8}><CircularProgress /></Box>;
  if (error) return <Container sx={{ py: 4 }}><Alert severity="error">{error}</Alert></Container>;
  if (!caseData) return null;

  const hearings = caseData.hearingHistory || [];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button startIcon={<ArrowBack />} component={Link} to="/cases" sx={{ mb: 2 }}>
        Back to Cases
      </Button>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold">{caseData.caseTitle}</Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            <Chip label={caseData.status?.replace(/_/g, ' ')} color={STATUS_COLOR[caseData.status] || 'default'} />
            <Chip label={caseData.type} variant="outlined" />
            {caseData.category && <Chip label={caseData.category.replace(/_/g, ' ')} variant="outlined" />}
          </Box>
        </Box>
        <Button variant="outlined" startIcon={<Add />} onClick={() => setHearingOpen(true)}>
          Add Hearing
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Case Info */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Gavel fontSize="small" /> Case Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <InfoRow label="Case Number" value={caseData.caseNumber} />
              <InfoRow label="Court" value={caseData.courtName} />
              <InfoRow label="Court Type" value={caseData.courtType} />
              <InfoRow label="State" value={caseData.state} />
              <InfoRow label="District" value={caseData.district} />
              <InfoRow label="Opposing Party" value={caseData.opposingParty} />
              <InfoRow label="Lawyer" value={caseData.lawyerName} />
              {caseData.filingDate && (
                <InfoRow label="Filing Date" value={format(new Date(caseData.filingDate), 'dd MMM yyyy')} />
              )}
              {caseData.firNumber && <InfoRow label="FIR Number" value={caseData.firNumber} />}
              {caseData.policeStation && <InfoRow label="Police Station" value={caseData.policeStation} />}
              {caseData.claimAmount && <InfoRow label="Claim Amount" value={`₹${caseData.claimAmount.toLocaleString()}`} />}
            </CardContent>
          </Card>
        </Grid>

        {/* Next Hearing */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EventNote fontSize="small" /> Next Hearing
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {caseData.nextHearingDate ? (
                <Box>
                  <Typography variant="h5" color="primary" fontWeight="bold">
                    {format(new Date(caseData.nextHearingDate), 'dd MMM yyyy')}
                  </Typography>
                  {caseData.nextHearingPurpose && (
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                      Purpose: {caseData.nextHearingPurpose}
                    </Typography>
                  )}
                </Box>
              ) : (
                <Typography color="text.secondary">No upcoming hearing scheduled</Typography>
              )}

              {caseData.caseDescription && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2" gutterBottom>Description</Typography>
                  <Typography variant="body2" color="text.secondary">{caseData.caseDescription}</Typography>
                </>
              )}

              {caseData.judgment && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2" gutterBottom>Judgment</Typography>
                  <Typography variant="body2">{caseData.judgment}</Typography>
                  {caseData.judgmentDate && (
                    <Typography variant="caption" color="text.secondary">
                      Dated: {format(new Date(caseData.judgmentDate), 'dd MMM yyyy')}
                    </Typography>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Hearing History */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Hearing History</Typography>
              <Divider sx={{ mb: 2 }} />
              {hearings.length === 0 ? (
                <Typography color="text.secondary">No hearing records yet. Add your first hearing above.</Typography>
              ) : (
                <Box>
                  {[...hearings].reverse().map((h, i) => (
                    <Paper key={i} variant="outlined" sx={{ p: 2, mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography fontWeight="bold">
                          {h.date ? format(new Date(h.date), 'dd MMM yyyy') : 'Date N/A'}
                        </Typography>
                        <Chip label={h.purpose} size="small" color="info" />
                      </Box>
                      {h.judge && <Typography variant="body2" color="text.secondary">Judge: {h.judge}</Typography>}
                      {h.order && <Typography variant="body2" sx={{ mt: 1 }}>{h.order}</Typography>}
                      {h.nextDate && (
                        <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
                          Next: {h.nextDate}
                        </Typography>
                      )}
                    </Paper>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <AddHearingDialog
        open={hearingOpen}
        onClose={() => setHearingOpen(false)}
        caseId={id}
        onAdded={fetchCase}
      />
    </Container>
  );
};

export default CaseDetail;
