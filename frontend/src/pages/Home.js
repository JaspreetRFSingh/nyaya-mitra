import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Paper,
} from '@mui/material';
import {
  Gavel,
  Description,
  QuestionAnswer,
  VideoCall,
  Security,
  Support,
} from '@mui/icons-material';

const Home = () => {
  const features = [
    {
      icon: <Gavel sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Expert Lawyers',
      description: 'Connect with verified lawyers across India specializing in various fields of law.',
    },
    {
      icon: <Description sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Document Generation',
      description: 'Generate legal documents like affidavits, notices, and petitions instantly.',
    },
    {
      icon: <VideoCall sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Online Consultations',
      description: 'Book video or phone consultations with lawyers from the comfort of your home.',
    },
    {
      icon: <QuestionAnswer sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Legal FAQs',
      description: 'Get instant answers to common legal questions through our comprehensive FAQ database.',
    },
    {
      icon: <Security sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Case Tracking',
      description: 'Track your case status, hearing dates, and judgments all in one place.',
    },
    {
      icon: <Support sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Legal Aid',
      description: 'Information about free legal aid services available under NALSA.',
    },
  ];

  const documentTypes = [
    'Affidavits',
    'Legal Notices',
    'RTI Applications',
    'Consumer Complaints',
    'Rent Agreements',
    'Divorce Petitions',
    'Bail Applications',
    'Property Documents',
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" gutterBottom fontWeight="bold">
            ⚖️ NyayaMitra
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
            Your Legal Friend - Making Justice Accessible to All
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}>
            Get expert legal advice, generate legal documents, book consultations with verified lawyers,
            and track your cases - all in one platform designed for the Indian legal system.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              component={Link}
              to="/register"
            >
              Get Started Free
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              component={Link}
              to="/lawyers"
            >
              Find a Lawyer
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              component={Link}
              to="/faqs"
            >
              Browse FAQs
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ mb: 6 }}>
          Our Services
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: '100%', textAlign: 'center' }}>
                <CardContent>
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Document Types Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" gutterBottom sx={{ mb: 2 }}>
            Generate Legal Documents
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
            Create legally valid documents in minutes with our easy-to-use templates
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {documentTypes.map((doc, index) => (
              <Grid item key={index}>
                <Paper sx={{ px: 2, py: 1, bgcolor: 'white' }}>
                  <Typography variant="body1">{doc}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={Link}
              to="/documents/generate"
            >
              Create Document Now
            </Button>
          </Box>
        </Container>
      </Box>

      {/* How It Works */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ mb: 6 }}>
          How It Works
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Box textAlign="center">
              <Typography variant="h3" color="primary" fontWeight="bold">
                1
              </Typography>
              <Typography variant="h6" gutterBottom>
                Register
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Create your free account in minutes
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box textAlign="center">
              <Typography variant="h3" color="primary" fontWeight="bold">
                2
              </Typography>
              <Typography variant="h6" gutterBottom>
                Choose Service
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Select consultation, document, or case tracking
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box textAlign="center">
              <Typography variant="h3" color="primary" fontWeight="bold">
                3
              </Typography>
              <Typography variant="h6" gutterBottom>
                Get Service
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Receive expert legal help instantly
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box textAlign="center">
              <Typography variant="h3" color="primary" fontWeight="bold">
                4
              </Typography>
              <Typography variant="h6" gutterBottom>
                Track Progress
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Monitor your case and documents anytime
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'primary.dark', color: 'white', py: 6 }}>
        <Container maxWidth="lg" textAlign="center">
          <Typography variant="h4" gutterBottom>
            Ready to Get Legal Help?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Join thousands of Indians who trust NyayaMitra for their legal needs
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            component={Link}
            to="/register"
          >
            Create Free Account
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
