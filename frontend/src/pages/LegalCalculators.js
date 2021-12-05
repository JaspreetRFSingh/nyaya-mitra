import React, { useState } from 'react';
import {
  Container, Grid, Card, CardContent, Typography, Box, Tab, Tabs,
  TextField, Button, Paper, Divider, Alert, MenuItem, Select,
  FormControl, InputLabel, Chip, Table, TableBody, TableRow, TableCell,
} from '@mui/material';
import { Calculate, Calculate as CalcIcon, Info } from '@mui/icons-material';

// ─── Court Fee Calculator ──────────────────────────────────────────────────
const CourtFeeCalc = () => {
  const [amount, setAmount] = useState('');
  const [state, setState] = useState('Delhi');
  const [caseType, setCaseType] = useState('money_recovery');
  const [result, setResult] = useState(null);

  const RATES = {
    Delhi: { base: 200, tiers: [[10000, 200], [50000, 0.02], [100000, 0.015], [500000, 0.01], [Infinity, 0.0075]] },
    Maharashtra: { base: 250, tiers: [[10000, 250], [50000, 0.025], [100000, 0.015], [500000, 0.01], [Infinity, 0.0075]] },
    Karnataka: { base: 200, tiers: [[10000, 200], [50000, 0.02], [100000, 0.015], [500000, 0.0125], [Infinity, 0.01]] },
    UP: { base: 200, tiers: [[10000, 200], [50000, 0.02], [100000, 0.015], [500000, 0.01], [Infinity, 0.0075]] },
  };

  const calculate = () => {
    const val = parseFloat(amount);
    if (!val || val <= 0) return;

    let fee = 0;
    if (caseType === 'fixed') {
      fee = 200; // Fixed fee cases
    } else {
      if (val <= 10000) fee = 200;
      else if (val <= 50000) fee = 200 + (val - 10000) * 0.02;
      else if (val <= 100000) fee = 1000 + (val - 50000) * 0.015;
      else if (val <= 500000) fee = 1750 + (val - 100000) * 0.01;
      else fee = 5750 + (val - 500000) * 0.0075;
    }

    const stampDuty = caseType === 'property_suit' ? val * 0.06 : 0;
    const processService = 50; // approximate
    const advocateFee = Math.max(5000, val * 0.05); // rough estimate

    setResult({
      courtFee: Math.round(fee),
      stampDuty: Math.round(stampDuty),
      processService,
      advocateFee: Math.round(advocateFee),
      total: Math.round(fee + stampDuty + processService),
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Court Fee Calculator</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Estimate court fees based on the claim amount. Fees are under Court Fees Act, 1870 and vary by state.
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        These are approximate estimates. Actual fees depend on your state's Court Fees Act. Consult a lawyer for exact calculation.
      </Alert>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Claim Amount (₹)"
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="e.g., 500000"
            InputProps={{ startAdornment: '₹ ' }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>State</InputLabel>
            <Select value={state} label="State" onChange={e => setState(e.target.value)}>
              {['Delhi', 'Maharashtra', 'Karnataka', 'UP'].map(s => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Case Type</InputLabel>
            <Select value={caseType} label="Case Type" onChange={e => setCaseType(e.target.value)}>
              <MenuItem value="money_recovery">Money Recovery / Cheque Bounce</MenuItem>
              <MenuItem value="property_suit">Property Suit</MenuItem>
              <MenuItem value="fixed">Matrimonial / Divorce (Fixed Fee)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={calculate} startIcon={<CalcIcon />} disabled={!amount}>
            Calculate Fees
          </Button>
        </Grid>
      </Grid>

      {result && (
        <Paper variant="outlined" sx={{ mt: 3, p: 3 }}>
          <Typography variant="h6" gutterBottom>Fee Estimate</Typography>
          <Table size="small">
            <TableBody>
              {[
                { label: 'Court Fee (ad valorem)', value: `₹ ${result.courtFee.toLocaleString()}` },
                ...(result.stampDuty > 0 ? [{ label: 'Stamp Duty (est.)', value: `₹ ${result.stampDuty.toLocaleString()}` }] : []),
                { label: 'Process Service Fee (approx.)', value: `₹ ${result.processService}` },
                { label: 'Estimated Advocate Fees (10% of claim)', value: `₹ ${result.advocateFee.toLocaleString()}` },
              ].map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{row.label}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: i === 0 ? 'bold' : 'normal' }}>{row.value}</TableCell>
                </TableRow>
              ))}
              <TableRow sx={{ bgcolor: 'primary.50' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Total Court Costs</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  ₹ {result.total.toLocaleString()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
            * Advocate fees are a rough estimate only. Actual fee depends on lawyer and complexity.
            Consumer court complaints up to Rs 5 lakh are FREE.
          </Typography>
        </Paper>
      )}

      <Paper variant="outlined" sx={{ mt: 3, p: 2 }}>
        <Typography variant="subtitle2" gutterBottom color="primary">Court Fee Slabs (Approximate, Civil Suits)</Typography>
        <Table size="small">
          <TableBody>
            {[
              ['Up to ₹10,000', '₹200 (fixed)'],
              ['₹10,001 – ₹50,000', '2% of amount'],
              ['₹50,001 – ₹1,00,000', '₹1,000 + 1.5% of excess'],
              ['₹1,00,001 – ₹5,00,000', '₹1,750 + 1% of excess'],
              ['Above ₹5,00,000', '₹5,750 + 0.75% of excess'],
            ].map(([slab, fee]) => (
              <TableRow key={slab}>
                <TableCell>{slab}</TableCell>
                <TableCell>{fee}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

// ─── Limitation Period Checker ─────────────────────────────────────────────
const LimitationCalc = () => {
  const [caseType, setCaseType] = useState('');
  const [incidentDate, setIncidentDate] = useState('');
  const [result, setResult] = useState(null);

  const LIMITATION = [
    { id: 'money_recovery', label: 'Money Recovery Suit', period: 3, unit: 'years', note: 'From when money became due', law: 'Article 113, Limitation Act' },
    { id: 'contract_breach', label: 'Contract Breach', period: 3, unit: 'years', note: 'From date of breach', law: 'Article 54, 55 Limitation Act' },
    { id: 'cheque_bounce', label: 'Cheque Bounce (Section 138)', period: null, unit: 'days', note: 'Notice within 30 days of dishonour; 15 days to pay; complaint within 30 days after that', law: 'Section 142 NI Act' },
    { id: 'property_recovery', label: 'Property Recovery (Possession)', period: 12, unit: 'years', note: 'From date of dispossession', law: 'Article 65, Limitation Act' },
    { id: 'mortgage', label: 'Mortgage Redemption', period: 30, unit: 'years', note: 'From date of mortgage', law: 'Article 61, Limitation Act' },
    { id: 'consumer', label: 'Consumer Complaint', period: 2, unit: 'years', note: 'From cause of action', law: 'Section 69 Consumer Protection Act, 2019' },
    { id: 'motor_accident', label: 'Motor Accident Compensation (MACT)', period: 6, unit: 'months', note: 'From date of accident (courts have discretion)', law: 'Section 166(3) MV Act, 2019' },
    { id: 'appeal_lower', label: 'Appeal from District Court', period: 90, unit: 'days', note: 'From date of decree (High Court)', law: 'Article 116, Limitation Act' },
    { id: 'execution', label: 'Execution of Decree', period: 12, unit: 'years', note: 'From date of decree', law: 'Article 136, Limitation Act' },
    { id: 'specific_performance', label: 'Specific Performance of Contract', period: 3, unit: 'years', note: 'From date fixed for performance', law: 'Article 54, Limitation Act' },
    { id: 'defamation', label: 'Defamation Suit', period: 1, unit: 'year', note: 'From date of defamatory statement', law: 'Article 75, Limitation Act' },
    { id: 'tort', label: 'Tort / Personal Injury', period: 3, unit: 'years', note: 'From date of injury', law: 'Article 113, Limitation Act' },
    { id: 'service_matter', label: 'Service Matter (Government Employee)', period: 3, unit: 'years', note: 'From date of cause of action', law: 'Article 58, Limitation Act' },
    { id: 'writ', label: 'Writ Petition (High Court)', period: null, unit: 'none', note: 'No fixed period but courts reject stale claims. File within 3 years for best results.', law: 'No fixed limitation — court discretion' },
  ];

  const calculate = () => {
    if (!caseType) return;
    const selected = LIMITATION.find(l => l.id === caseType);
    if (!selected) return;

    let deadline = null;
    let daysLeft = null;
    let status = null;

    if (selected.period && incidentDate) {
      const incident = new Date(incidentDate);
      const now = new Date();
      deadline = new Date(incident);

      if (selected.unit === 'years' || selected.unit === 'year') {
        deadline.setFullYear(deadline.getFullYear() + selected.period);
      } else if (selected.unit === 'months') {
        deadline.setMonth(deadline.getMonth() + selected.period);
      } else if (selected.unit === 'days') {
        deadline.setDate(deadline.getDate() + selected.period);
      }

      daysLeft = Math.floor((deadline - now) / (1000 * 60 * 60 * 24));
      status = daysLeft > 30 ? 'safe' : daysLeft > 0 ? 'urgent' : 'expired';
    }

    setResult({ selected, deadline, daysLeft, status });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Limitation Period Checker</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Check how much time you have to file your case. Filing after the limitation period can result in dismissal.
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={7}>
          <FormControl fullWidth>
            <InputLabel>Type of Case</InputLabel>
            <Select value={caseType} label="Type of Case" onChange={e => { setCaseType(e.target.value); setResult(null); }}>
              {LIMITATION.map(l => <MenuItem key={l.id} value={l.id}>{l.label}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            fullWidth
            label="Date of Incident / Cause of Action"
            type="date"
            value={incidentDate}
            onChange={e => setIncidentDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={calculate} startIcon={<CalcIcon />} disabled={!caseType}>
            Check Deadline
          </Button>
        </Grid>
      </Grid>

      {result && (
        <Paper variant="outlined" sx={{ mt: 3, p: 3, borderColor: result.status === 'expired' ? 'error.main' : result.status === 'urgent' ? 'warning.main' : 'success.main' }}>
          <Typography variant="h6" gutterBottom>{result.selected.label}</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Typography variant="caption" color="text.secondary">Limitation Period</Typography>
              <Typography variant="h5" fontWeight="bold" color="primary">
                {result.selected.period ? `${result.selected.period} ${result.selected.unit}` : 'Varies'}
              </Typography>
            </Grid>
            {result.deadline && (
              <Grid item xs={12} sm={4}>
                <Typography variant="caption" color="text.secondary">Deadline</Typography>
                <Typography variant="h6" fontWeight="bold">
                  {result.deadline.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
                </Typography>
              </Grid>
            )}
            {result.daysLeft !== null && (
              <Grid item xs={12} sm={4}>
                <Typography variant="caption" color="text.secondary">Status</Typography>
                {result.status === 'expired' ? (
                  <Alert severity="error" sx={{ mt: 0.5 }}>Limitation expired! File condonation of delay application.</Alert>
                ) : result.status === 'urgent' ? (
                  <Alert severity="warning" sx={{ mt: 0.5 }}>{result.daysLeft} days remaining — FILE URGENTLY!</Alert>
                ) : (
                  <Alert severity="success" sx={{ mt: 0.5 }}>{result.daysLeft} days remaining.</Alert>
                )}
              </Grid>
            )}
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body2" color="text.secondary">📌 {result.selected.note}</Typography>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>Law: {result.selected.law}</Typography>
        </Paper>
      )}

      <Alert severity="warning" sx={{ mt: 3 }}>
        <strong>Delay condonation:</strong> Even if limitation has expired, courts can condone delay if you show "sufficient cause". Always file a condonation application with your petition. Don't give up without consulting a lawyer.
      </Alert>
    </Box>
  );
};

// ─── Stamp Duty Calculator ─────────────────────────────────────────────────
const StampDutyCalc = () => {
  const [propertyValue, setPropertyValue] = useState('');
  const [state, setState] = useState('Maharashtra');
  const [buyerGender, setBuyerGender] = useState('male');
  const [result, setResult] = useState(null);

  const RATES = {
    Maharashtra: { male: 0.06, female: 0.05, registration: 0.01, regCap: 30000 },
    Delhi: { male: 0.06, female: 0.04, registration: 0.01, regCap: 0 },
    Karnataka: { male: 0.056, female: 0.056, registration: 0.01, regCap: 0 },
    'Uttar Pradesh': { male: 0.07, female: 0.065, registration: 0.01, regCap: 0 },
    'Tamil Nadu': { male: 0.07, female: 0.07, registration: 0.01, regCap: 0 },
    Gujarat: { male: 0.047, female: 0.047, registration: 0.01, regCap: 0 },
    Rajasthan: { male: 0.06, female: 0.05, registration: 0.01, regCap: 0 },
    Haryana: { male: 0.07, female: 0.05, registration: 0.01, regCap: 0 },
    Kerala: { male: 0.08, female: 0.08, registration: 0.02, regCap: 0 },
    'West Bengal': { male: 0.05, female: 0.05, registration: 0.01, regCap: 0 },
  };

  const calculate = () => {
    const val = parseFloat(propertyValue);
    if (!val) return;
    const rates = RATES[state] || RATES['Maharashtra'];
    const stampRate = buyerGender === 'female' ? rates.female : rates.male;
    const stampDuty = val * stampRate;
    let regCharges = val * rates.registration;
    if (rates.regCap > 0) regCharges = Math.min(regCharges, rates.regCap);
    const total = stampDuty + regCharges;

    setResult({ stampDuty: Math.round(stampDuty), regCharges: Math.round(regCharges), total: Math.round(total), stampRate, state });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Stamp Duty & Registration Calculator</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Estimate stamp duty and registration charges for property purchase. Rates are as of 2024 and may vary.
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        Stamp duty is calculated on <strong>circle rate or agreement value, whichever is HIGHER</strong>. Always check with your Sub-Registrar office.
      </Alert>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Property Value (₹)"
            type="number"
            value={propertyValue}
            onChange={e => setPropertyValue(e.target.value)}
            InputProps={{ startAdornment: '₹ ' }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>State</InputLabel>
            <Select value={state} label="State" onChange={e => setState(e.target.value)}>
              {Object.keys(RATES).map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Buyer Gender</InputLabel>
            <Select value={buyerGender} label="Buyer Gender" onChange={e => setBuyerGender(e.target.value)}>
              <MenuItem value="male">Male / Joint</MenuItem>
              <MenuItem value="female">Female (concession applies)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={calculate} startIcon={<CalcIcon />} disabled={!propertyValue}>
            Calculate
          </Button>
        </Grid>
      </Grid>

      {result && (
        <Paper variant="outlined" sx={{ mt: 3, p: 3 }}>
          <Typography variant="h6" gutterBottom>Estimated Charges for {result.state}</Typography>
          <Table size="small">
            <TableBody>
              {[
                { label: `Stamp Duty (${(result.stampRate * 100).toFixed(1)}%)`, value: `₹ ${result.stampDuty.toLocaleString()}` },
                { label: 'Registration Charges (~1%)', value: `₹ ${result.regCharges.toLocaleString()}` },
                { label: 'TOTAL', value: `₹ ${result.total.toLocaleString()}`, bold: true },
              ].map((row, i) => (
                <TableRow key={i} sx={row.bold ? { bgcolor: 'primary.50' } : {}}>
                  <TableCell sx={{ fontWeight: row.bold ? 'bold' : 'normal' }}>{row.label}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: row.bold ? 'bold' : 'normal', color: row.bold ? 'primary.main' : 'inherit' }}>{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            * Women buyers get concession in Delhi (2%), Maharashtra (1%), Haryana (2%), Rajasthan (1%), etc.
          </Typography>
        </Paper>
      )}

      {/* State-wise table */}
      <Paper variant="outlined" sx={{ mt: 3, p: 2 }}>
        <Typography variant="subtitle2" gutterBottom color="primary">State-wise Stamp Duty Rates (2024)</Typography>
        <Table size="small">
          <TableBody>
            {Object.entries(RATES).map(([st, r]) => (
              <TableRow key={st}>
                <TableCell>{st}</TableCell>
                <TableCell>{(r.male * 100).toFixed(1)}% (male)</TableCell>
                <TableCell>{(r.female * 100).toFixed(1)}% (female)</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

// ─── Main component ────────────────────────────────────────────────────────
const TABS = [
  { label: 'Court Fee', component: <CourtFeeCalc /> },
  { label: 'Limitation Period', component: <LimitationCalc /> },
  { label: 'Stamp Duty', component: <StampDutyCalc /> },
];

const LegalCalculators = () => {
  const [tab, setTab] = useState(0);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Calculate sx={{ fontSize: 40, color: 'primary.main' }} />
        <Box>
          <Typography variant="h4" fontWeight="bold">Legal Calculators</Typography>
          <Typography variant="body2" color="text.secondary">
            Calculate court fees, check limitation periods, and estimate stamp duty
          </Typography>
        </Box>
      </Box>

      <Alert severity="warning" sx={{ mb: 3 }}>
        These calculators provide <strong>estimates only</strong>. For exact figures and legal advice, consult a qualified lawyer or the relevant authority.
      </Alert>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          {TABS.map((t, i) => <Tab key={i} label={t.label} />)}
        </Tabs>
      </Box>

      {TABS[tab].component}
    </Container>
  );
};

export default LegalCalculators;
