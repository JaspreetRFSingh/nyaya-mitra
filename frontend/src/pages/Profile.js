import React, { useState, useEffect } from 'react';
import {
  Container, Grid, Card, CardContent, Typography, Button, Box,
  TextField, Avatar, Divider, CircularProgress, Alert, Chip,
  MenuItem, Select, FormControl, InputLabel,
} from '@mui/material';
import { Edit, Save, Cancel } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const STATES = [
  'Delhi', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'West Bengal',
  'Uttar Pradesh', 'Gujarat', 'Rajasthan', 'Kerala', 'Madhya Pradesh',
  'Andhra Pradesh', 'Telangana', 'Punjab', 'Haryana', 'Bihar',
];

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    api.get('/auth/me')
      .then(r => {
        setProfile(r.data);
        setForm(r.data);
      })
      .catch(() => setError('Failed to load profile'))
      .finally(() => setLoading(false));
  }, []);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const res = await api.put('/auth/profile', form);
      setProfile(res.data);
      setForm(res.data);
      setEditing(false);
      setSuccess('Profile updated successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setForm(profile);
    setEditing(false);
    setError('');
  };

  if (loading) return <Box display="flex" justifyContent="center" mt={8}><CircularProgress /></Box>;

  const isLawyer = profile?.role === 'LAWYER';

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">My Profile</Typography>
        {!editing ? (
          <Button variant="outlined" startIcon={<Edit />} onClick={() => setEditing(true)}>
            Edit Profile
          </Button>
        ) : (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="outlined" startIcon={<Cancel />} onClick={handleCancel}>Cancel</Button>
            <Button variant="contained" startIcon={<Save />} onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </Box>
        )}
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Grid container spacing={3}>
        {/* Avatar & Role */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ width: 100, height: 100, bgcolor: 'primary.main', fontSize: 36, mx: 'auto', mb: 2 }}>
                {profile?.firstName?.[0]}{profile?.lastName?.[0]}
              </Avatar>
              <Typography variant="h6" fontWeight="bold">
                {profile?.firstName} {profile?.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {profile?.email}
              </Typography>
              <Chip
                label={profile?.role}
                color={profile?.role === 'LAWYER' ? 'primary' : 'default'}
              />
              {isLawyer && profile?.isVerified && (
                <Chip label="Verified" color="success" size="small" sx={{ ml: 1 }} />
              )}
              {isLawyer && profile?.rating > 0 && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Rating: {profile.rating.toFixed(1)} / 5.0
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Personal Info */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Personal Information</Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    value={form.firstName || ''}
                    onChange={e => set('firstName', e.target.value)}
                    disabled={!editing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    value={form.lastName || ''}
                    onChange={e => set('lastName', e.target.value)}
                    disabled={!editing}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={form.email || ''}
                    disabled
                    helperText="Email cannot be changed"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={form.phone || ''}
                    onChange={e => set('phone', e.target.value)}
                    disabled={!editing}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    value={form.address || ''}
                    onChange={e => set('address', e.target.value)}
                    disabled={!editing}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="City"
                    value={form.city || ''}
                    onChange={e => set('city', e.target.value)}
                    disabled={!editing}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  {editing ? (
                    <FormControl fullWidth>
                      <InputLabel>State</InputLabel>
                      <Select value={form.state || ''} label="State" onChange={e => set('state', e.target.value)}>
                        {STATES.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                      </Select>
                    </FormControl>
                  ) : (
                    <TextField fullWidth label="State" value={form.state || ''} disabled />
                  )}
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Pincode"
                    value={form.pincode || ''}
                    onChange={e => set('pincode', e.target.value)}
                    disabled={!editing}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Lawyer-specific info */}
          {isLawyer && (
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Lawyer Information</Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Bar Council Number"
                      value={form.barCouncilNumber || ''}
                      onChange={e => set('barCouncilNumber', e.target.value)}
                      disabled={!editing}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Bar Council Name"
                      value={form.barCouncilName || ''}
                      onChange={e => set('barCouncilName', e.target.value)}
                      disabled={!editing}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Years of Experience"
                      type="number"
                      value={form.yearsOfExperience || ''}
                      onChange={e => set('yearsOfExperience', parseInt(e.target.value))}
                      disabled={!editing}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Consultation Fee (₹)"
                      type="number"
                      value={form.consultationFee || ''}
                      onChange={e => set('consultationFee', parseFloat(e.target.value))}
                      disabled={!editing}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Education / Qualifications"
                      value={form.education || ''}
                      onChange={e => set('education', e.target.value)}
                      disabled={!editing}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Chamber Address"
                      value={form.chamberAddress || ''}
                      onChange={e => set('chamberAddress', e.target.value)}
                      disabled={!editing}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
