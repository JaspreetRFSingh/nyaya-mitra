import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container, Typography, Box, Chip, CircularProgress, Alert,
  Card, CardContent, Button, Divider, Paper,
} from '@mui/material';
import {
  ArrowBack, ThumbUp, ThumbDown, Verified, QuestionAnswer,
} from '@mui/icons-material';
import api from '../services/api';

const FAQDetail = () => {
  const { id } = useParams();
  const [faq, setFaq] = useState(null);
  const [relatedFaqs, setRelatedFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [voted, setVoted] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get(`/faqs/${id}`);
        setFaq(res.data);
        if (res.data?.relatedQuestions?.length > 0) {
          const relRes = await api.get(`/faqs/category/${res.data.category}`);
          setRelatedFaqs((relRes.data || []).filter(f => f.id !== id).slice(0, 4));
        }
      } catch {
        setError('Failed to load FAQ');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const handleVote = async (helpful) => {
    if (voted !== null) return;
    try {
      await api.post(`/faqs/${id}/${helpful ? 'helpful' : 'not-helpful'}`);
      setVoted(helpful);
      setFaq(f => ({
        ...f,
        helpfulCount: helpful ? (f.helpfulCount || 0) + 1 : f.helpfulCount,
        notHelpfulCount: !helpful ? (f.notHelpfulCount || 0) + 1 : f.notHelpfulCount,
      }));
    } catch {}
  };

  if (loading) return <Box display="flex" justifyContent="center" mt={8}><CircularProgress /></Box>;
  if (error) return <Container sx={{ py: 4 }}><Alert severity="error">{error}</Alert></Container>;
  if (!faq) return null;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button startIcon={<ArrowBack />} component={Link} to="/faqs" sx={{ mb: 3 }}>
        Back to FAQs
      </Button>

      <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
        <Chip
          label={faq.category?.replace(/_/g, ' ')}
          color="primary"
          variant="outlined"
        />
        {faq.isVerified && (
          <Chip icon={<Verified />} label="Verified Answer" color="success" size="small" />
        )}
        {faq.tags?.map(t => <Chip key={t} label={t} size="small" />)}
      </Box>

      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ lineHeight: 1.4 }}>
        {faq.question}
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <Typography variant="caption" color="text.secondary">{faq.viewCount || 0} views</Typography>
        <Typography variant="caption" color="text.secondary">·</Typography>
        <Typography variant="caption" color="text.secondary">{faq.helpfulCount || 0} found helpful</Typography>
      </Box>

      {/* Answer */}
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          {faq.shortAnswer && (
            <Paper variant="outlined" sx={{ p: 2, mb: 3, bgcolor: 'primary.50', borderColor: 'primary.light' }}>
              <Typography variant="subtitle1" fontWeight="bold" color="primary" gutterBottom>
                Quick Answer
              </Typography>
              <Typography variant="body1">{faq.shortAnswer}</Typography>
            </Paper>
          )}

          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Detailed Answer</Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
            {faq.answer}
          </Typography>
        </CardContent>
      </Card>

      {/* Legal References */}
      {faq.legalReferences?.length > 0 && (
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Legal References</Typography>
            <Divider sx={{ mb: 2 }} />
            {faq.legalReferences.map((ref, i) => (
              <Box key={i} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <Typography color="primary" fontWeight="bold">§</Typography>
                <Typography variant="body2">{ref}</Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Was this helpful */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Was this answer helpful?</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant={voted === true ? 'contained' : 'outlined'}
              color="success"
              startIcon={<ThumbUp />}
              onClick={() => handleVote(true)}
              disabled={voted !== null}
            >
              Yes ({faq.helpfulCount || 0})
            </Button>
            <Button
              variant={voted === false ? 'contained' : 'outlined'}
              color="error"
              startIcon={<ThumbDown />}
              onClick={() => handleVote(false)}
              disabled={voted !== null}
            >
              No ({faq.notHelpfulCount || 0})
            </Button>
          </Box>
          {voted !== null && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Thank you for your feedback!
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* Related FAQs */}
      {relatedFaqs.length > 0 && (
        <Box>
          <Typography variant="h6" gutterBottom>Related Questions</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {relatedFaqs.map(f => (
              <Card
                key={f.id}
                component={Link}
                to={`/faqs/${f.id}`}
                sx={{ textDecoration: 'none', '&:hover': { boxShadow: 4 } }}
              >
                <CardContent sx={{ py: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <QuestionAnswer fontSize="small" color="primary" />
                    <Typography variant="body1">{f.question}</Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      )}

      {/* Need More Help */}
      <Paper sx={{ p: 3, mt: 4, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="h6" gutterBottom>Need Personalized Legal Help?</Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Connect with a verified lawyer for professional advice on your specific situation
        </Typography>
        <Button variant="contained" color="secondary" component={Link} to="/lawyers">
          Find a Lawyer
        </Button>
      </Paper>
    </Container>
  );
};

export default FAQDetail;
