import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Grid, Card, CardContent, Typography, Button, Box,
  Chip, CircularProgress, Alert, IconButton, Tooltip,
} from '@mui/material';
import { Add, Download, Delete, Description } from '@mui/icons-material';
import api from '../services/api';
import { format } from 'date-fns';

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDocs = async () => {
    setLoading(true);
    try {
      const res = await api.get('/documents');
      setDocuments(res.data || []);
    } catch {
      setError('Failed to load documents');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDocs(); }, []);

  const handleDownload = async (id, title) => {
    try {
      const res = await api.get(`/documents/${id}/download`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title || 'document'}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch {
      setError('Failed to download document');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this document?')) return;
    try {
      await api.delete(`/documents/${id}`);
      fetchDocs();
    } catch {
      setError('Failed to delete document');
    }
  };

  const docTypeColor = {
    AFFIDAVIT: 'primary', LEGAL_NOTICE: 'error', RTI_APPLICATION: 'info',
    CONSUMER_COMPLAINT: 'warning', RENT_AGREEMENT: 'success',
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold">My Documents</Typography>
          <Typography variant="body2" color="text.secondary">Manage your generated legal documents</Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} component={Link} to="/documents/generate">
          Generate Document
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {loading ? (
        <Box display="flex" justifyContent="center" mt={6}><CircularProgress /></Box>
      ) : documents.length === 0 ? (
        <Box textAlign="center" mt={8}>
          <Description sx={{ fontSize: 80, color: 'action.disabled' }} />
          <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>No documents generated yet</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Create legally valid documents in minutes using our templates
          </Typography>
          <Button variant="contained" component={Link} to="/documents/generate">
            Generate Your First Document
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {documents.map(doc => (
            <Grid item xs={12} sm={6} md={4} key={doc.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', '&:hover': { boxShadow: 6 } }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Box sx={{ p: 1.5, bgcolor: 'primary.light', borderRadius: 2, color: 'white' }}>
                      <Description />
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1" fontWeight="bold" noWrap>
                        {doc.documentTitle}
                      </Typography>
                      <Chip
                        label={doc.documentType?.replace(/_/g, ' ')}
                        size="small"
                        color={docTypeColor[doc.documentType] || 'default'}
                        sx={{ mt: 0.5 }}
                      />
                    </Box>
                  </Box>

                  {doc.templateName && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Template: {doc.templateName}
                    </Typography>
                  )}

                  {doc.createdAt && (
                    <Typography variant="caption" color="text.secondary">
                      Created: {format(new Date(doc.createdAt), 'dd MMM yyyy')}
                    </Typography>
                  )}

                  {doc.courtFee && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Court Fee: ₹{doc.courtFee}
                    </Typography>
                  )}
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1, gap: 1 }}>
                  <Tooltip title="Download PDF">
                    <IconButton
                      color="primary"
                      onClick={() => handleDownload(doc.id, doc.documentTitle)}
                    >
                      <Download />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton color="error" onClick={() => handleDelete(doc.id)}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Documents;
