import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Grid, Card, CardContent, Typography, Button, Box,
  Chip, Stepper, Step, StepLabel, TextField, CircularProgress,
  Alert, Divider, Paper,
} from '@mui/material';
import { Description, ArrowBack, ArrowForward, CheckCircle } from '@mui/icons-material';
import api from '../services/api';

const DOC_TYPE_COLORS = {
  AFFIDAVIT: 'primary', LEGAL_NOTICE: 'error', RTI_APPLICATION: 'info',
  CONSUMER_COMPLAINT: 'warning', RENT_AGREEMENT: 'success', PETITION: 'secondary',
};

const steps = ['Select Template', 'Fill Details', 'Generate'];

const DocumentGenerator = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [fieldValues, setFieldValues] = useState({});
  const [docTitle, setDocTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  const [generated, setGenerated] = useState(null);

  useEffect(() => {
    api.get('/documents/templates').then(r => setTemplates(r.data || [])).catch(() => setError('Failed to load templates')).finally(() => setLoading(false));
  }, []);

  const handleSelectTemplate = (t) => {
    setSelectedTemplate(t);
    const initial = {};
    (t.fields || []).forEach(f => { initial[f.name] = ''; });
    setFieldValues(initial);
    setDocTitle(`${t.name} - ${new Date().toLocaleDateString('en-IN')}`);
    setActiveStep(1);
  };

  const handleGenerate = async () => {
    const emptyRequired = (selectedTemplate?.fields || []).filter(f => f.required && !fieldValues[f.name]);
    if (emptyRequired.length > 0) {
      setError(`Please fill required fields: ${emptyRequired.map(f => f.label).join(', ')}`);
      return;
    }
    if (!docTitle) {
      setError('Document title is required');
      return;
    }
    setGenerating(true);
    setError('');
    try {
      const res = await api.post('/documents/generate', {
        templateId: selectedTemplate.id,
        documentTitle: docTitle,
        fieldValues,
      });
      setGenerated(res.data);
      setActiveStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate document');
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = async () => {
    try {
      const res = await api.get(`/documents/${generated.id}/download`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
      const a = document.createElement('a');
      a.href = url;
      a.download = `${generated.documentTitle || 'document'}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch {
      setError('Failed to download PDF');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>Generate Legal Document</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Create legally valid documents in minutes using our professional templates
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map(label => (
          <Step key={label}><StepLabel>{label}</StepLabel></Step>
        ))}
      </Stepper>

      {error && <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>{error}</Alert>}

      {/* Step 1: Select Template */}
      {activeStep === 0 && (
        <Box>
          <Typography variant="h6" gutterBottom>Choose a Document Template</Typography>
          {loading ? (
            <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>
          ) : templates.length === 0 ? (
            <Alert severity="info">No templates available. Please check back later.</Alert>
          ) : (
            <Grid container spacing={3}>
              {templates.map(t => (
                <Grid item xs={12} sm={6} md={4} key={t.id}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      border: '2px solid',
                      borderColor: 'transparent',
                      '&:hover': { borderColor: 'primary.main', boxShadow: 6 },
                    }}
                    onClick={() => handleSelectTemplate(t)}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <Box sx={{ p: 1.5, bgcolor: 'primary.light', borderRadius: 2, color: 'white' }}>
                          <Description />
                        </Box>
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold">{t.name}</Typography>
                          <Chip
                            label={t.documentType?.replace(/_/g, ' ')}
                            size="small"
                            color={DOC_TYPE_COLORS[t.documentType] || 'default'}
                          />
                        </Box>
                      </Box>
                      <Typography variant="body2" color="text.secondary">{t.description}</Typography>
                      {t.courtFee > 0 && (
                        <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
                          Stamp Duty: ₹{t.courtFee}
                        </Typography>
                      )}
                      {t.instructions && (
                        <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                          {t.instructions.substring(0, 100)}...
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      )}

      {/* Step 2: Fill Details */}
      {activeStep === 1 && selectedTemplate && (
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Button startIcon={<ArrowBack />} onClick={() => setActiveStep(0)}>Back</Button>
            <Typography variant="h6">{selectedTemplate.name}</Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Document Title"
                value={docTitle}
                onChange={e => setDocTitle(e.target.value)}
                helperText="Give a descriptive title for your document"
              />
            </Grid>

            <Grid item xs={12}>
              <Divider><Typography variant="body2" color="text.secondary">Fill in the required details</Typography></Divider>
            </Grid>

            {(selectedTemplate.fields || []).map(field => (
              <Grid item xs={12} sm={6} key={field.name}>
                <TextField
                  fullWidth
                  required={field.required}
                  label={field.label || field.name}
                  value={fieldValues[field.name] || ''}
                  onChange={e => setFieldValues(v => ({ ...v, [field.name]: e.target.value }))}
                  helperText={field.description}
                  multiline={field.type === 'TEXTAREA'}
                  rows={field.type === 'TEXTAREA' ? 3 : 1}
                  type={field.type === 'DATE' ? 'date' : 'text'}
                  InputLabelProps={field.type === 'DATE' ? { shrink: true } : undefined}
                  placeholder={field.placeholder}
                />
              </Grid>
            ))}

            {selectedTemplate.legalReferences?.length > 0 && (
              <Grid item xs={12}>
                <Paper variant="outlined" sx={{ p: 2, bgcolor: 'info.50' }}>
                  <Typography variant="subtitle2" gutterBottom color="info.main">Legal References</Typography>
                  {selectedTemplate.legalReferences.map((ref, i) => (
                    <Typography key={i} variant="body2" color="text.secondary">• {ref}</Typography>
                  ))}
                </Paper>
              </Grid>
            )}

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button onClick={() => setActiveStep(0)}>Back</Button>
                <Button
                  variant="contained"
                  endIcon={<ArrowForward />}
                  onClick={handleGenerate}
                  disabled={generating}
                >
                  {generating ? 'Generating...' : 'Generate Document'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Step 3: Success */}
      {activeStep === 2 && generated && (
        <Box textAlign="center" sx={{ py: 6 }}>
          <CheckCircle sx={{ fontSize: 80, color: 'success.main' }} />
          <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
            Document Generated Successfully!
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 4 }}>
            Your {generated.documentTitle} has been created and is ready to download.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Button variant="contained" size="large" onClick={handleDownload}>
              Download PDF
            </Button>
            <Button variant="outlined" size="large" onClick={() => navigate('/documents')}>
              View All Documents
            </Button>
            <Button size="large" onClick={() => { setActiveStep(0); setGenerated(null); setSelectedTemplate(null); }}>
              Generate Another
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default DocumentGenerator;
