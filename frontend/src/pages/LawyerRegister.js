import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container, Card, CardContent, Typography, TextField, Button,
  Box, Grid, Stepper, Step, StepLabel, Alert, Chip, Divider,
  MenuItem, Select, FormControl, InputLabel, FormControlLabel, Switch,
} from '@mui/material';
import { Gavel } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const STEPS = ['Personal Info', 'Professional Details', 'Specializations'];

const SPECIALIZATIONS = [
  'Civil Law', 'Criminal Law', 'Family Law', 'Corporate Law', 'Property Law',
  'Consumer Law', 'Labour Law', 'Banking Law', 'Cyber Law', 'Tax Law',
  'Constitutional Law', 'Intellectual Property', 'Immigration Law',
  'Environmental Law', 'Arbitration', 'Mediation',
];

const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi',
];

const LawyerRegister = () => {
  const navigate = useNavigate();
  const { registerLawyer } = useAuth();
  const [step, setStep] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [specializations, setSpecializations] = useState([]);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '', confirmPassword: '',
    phone: '', address: '', city: '', state: '', pincode: '',
    barCouncilNumber: '', barCouncilName: '', yearsOfExperience: '',
    education: '', chamberAddress: '', consultationFee: '',
    isAvailableForConsultation: true,
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const toggleSpec = (s) => {
    setSpecializations(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    );
  };

  const validateStep = () => {
    if (step === 0) {
      if (!form.firstName || !form.lastName || !form.email || !form.password) {
        setError('Please fill all required fields');
        return false;
      }
      if (form.password !== form.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
      if (form.password.length < 6) {
        setError('Password must be at least 6 characters');
        return false;
      }
    }
    if (step === 1) {
      if (!form.barCouncilNumber || !form.barCouncilName || !form.yearsOfExperience) {
        setError('Bar council number, name and years of experience are required');
        return false;
      }
    }
    if (step === 2) {
      if (specializations.length === 0) {
        setError('Please select at least one specialization');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    setError('');
    if (validateStep()) setStep(s => s + 1);
  };

  const handleSubmit = async () => {
    setError('');
    if (!validateStep()) return;
    setLoading(true);
    try {
      await registerLawyer({
        ...form,
        specializations,
        yearsOfExperience: parseInt(form.yearsOfExperience),
        consultationFee: parseFloat(form.consultationFee) || 0,
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Gavel sx={{ fontSize: 48, color: 'primary.main' }} />
        <Typography variant="h4" fontWeight="bold">Register as a Lawyer</Typography>
        <Typography variant="body2" color="text.secondary">
          Join NyayaMitra and connect with clients seeking legal help
        </Typography>
      </Box>

      <Stepper activeStep={step} sx={{ mb: 4 }}>
        {STEPS.map(label => <Step key={label}><StepLabel>{label}</StepLabel></Step>)}
      </Stepper>

      <Card>
        <CardContent sx={{ p: 4 }}>
          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

          {/* Step 1: Personal Info */}
          {step === 0 && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>Personal Information</Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth required label="First Name" value={form.firstName} onChange={e => set('firstName', e.target.value)} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth required label="Last Name" value={form.lastName} onChange={e => set('lastName', e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth required type="email" label="Email Address" value={form.email} onChange={e => set('email', e.target.value)} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth required type="password" label="Password" value={form.password} onChange={e => set('password', e.target.value)} helperText="Minimum 6 characters" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth required type="password" label="Confirm Password" value={form.confirmPassword} onChange={e => set('confirmPassword', e.target.value)} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Phone Number" value={form.phone} onChange={e => set('phone', e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Address" value={form.address} onChange={e => set('address', e.target.value)} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="City" value={form.city} onChange={e => set('city', e.target.value)} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>State</InputLabel>
                  <Select value={form.state} label="State" onChange={e => set('state', e.target.value)}>
                    {STATES.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="Pincode" value={form.pincode} onChange={e => set('pincode', e.target.value)} />
              </Grid>
            </Grid>
          )}

          {/* Step 2: Professional Details */}
          {step === 1 && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>Professional Details</Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth required label="Bar Council Number" value={form.barCouncilNumber} onChange={e => set('barCouncilNumber', e.target.value)} helperText="Your enrollment number" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth required label="Bar Council Name" value={form.barCouncilName} onChange={e => set('barCouncilName', e.target.value)} helperText="e.g., Bar Council of Delhi" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth required type="number" label="Years of Experience" value={form.yearsOfExperience} onChange={e => set('yearsOfExperience', e.target.value)} inputProps={{ min: 0, max: 60 }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth type="number" label="Consultation Fee (₹)" value={form.consultationFee} onChange={e => set('consultationFee', e.target.value)} helperText="Per consultation" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Education / Qualifications" value={form.education} onChange={e => set('education', e.target.value)} helperText="e.g., LLB - Delhi University, LLM - NLU" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Chamber Address" value={form.chamberAddress} onChange={e => set('chamberAddress', e.target.value)} helperText="Your office/chamber address" />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={form.isAvailableForConsultation}
                      onChange={e => set('isAvailableForConsultation', e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Available for online consultations"
                />
              </Grid>
            </Grid>
          )}

          {/* Step 3: Specializations */}
          {step === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>Areas of Specialization</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Select all areas you specialize in (minimum 1 required)
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {SPECIALIZATIONS.map(s => (
                  <Chip
                    key={s}
                    label={s}
                    onClick={() => toggleSpec(s)}
                    color={specializations.includes(s) ? 'primary' : 'default'}
                    variant={specializations.includes(s) ? 'filled' : 'outlined'}
                    clickable
                  />
                ))}
              </Box>
              {specializations.length > 0 && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Selected: {specializations.length} area(s)
                  </Typography>
                </Box>
              )}
            </Box>
          )}

          {/* Navigation */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              onClick={() => { setStep(s => s - 1); setError(''); }}
              disabled={step === 0}
            >
              Back
            </Button>
            {step < 2 ? (
              <Button variant="contained" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button variant="contained" onClick={handleSubmit} disabled={loading}>
                {loading ? 'Registering...' : 'Create Lawyer Account'}
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>

      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Typography variant="body2">
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'inherit' }}>Sign in</Link>
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Registering as a client?{' '}
          <Link to="/register" style={{ color: 'inherit' }}>Client Registration</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default LawyerRegister;
