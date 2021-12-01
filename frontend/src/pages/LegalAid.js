import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Grid, Card, CardContent, Typography, Button, Box,
  Chip, Divider, Accordion, AccordionSummary, AccordionDetails,
  List, ListItem, ListItemIcon, ListItemText, Paper, Alert,
} from '@mui/material';
import {
  ExpandMore, CheckCircle, Gavel, People, AccountBalance,
  Phone, Language, Info,
} from '@mui/icons-material';

const eligibilityCriteria = [
  'Annual income less than ₹3 lakh (varies by state)',
  'Women (regardless of income)',
  'Children below 18 years',
  'Scheduled Caste / Scheduled Tribe members',
  'Victims of trafficking and beggars',
  'Persons with disabilities',
  'Victims of mass disasters, ethnic violence, caste atrocities',
  'Persons in custody or under trial',
  'Industrial workmen',
  'Victims of undue hardship',
];

const schemes = [
  {
    name: 'NALSA',
    fullName: 'National Legal Services Authority',
    level: 'National',
    description: 'Apex body constituted under Legal Services Authorities Act, 1987. Provides free legal aid to weaker sections.',
    services: ['Free legal representation', 'Lok Adalats', 'Legal awareness camps', 'Legal clinics'],
    contact: 'www.nalsa.gov.in | Helpline: 15100',
    icon: <AccountBalance />,
    color: 'primary',
  },
  {
    name: 'SLSA',
    fullName: 'State Legal Services Authority',
    level: 'State Level',
    description: 'Constituted in every state to implement legal aid programs within the state.',
    services: ['State-level legal aid', 'Coordination with district authorities', 'Legal aid clinics'],
    contact: 'Contact your State High Court for SLSA details',
    icon: <Gavel />,
    color: 'secondary',
  },
  {
    name: 'DLSA',
    fullName: 'District Legal Services Authority',
    level: 'District Level',
    description: 'Present in every district, headed by the District Judge. Most accessible legal aid body.',
    services: ['Free legal representation in district courts', 'Lok Adalats', 'Mediation', 'Legal awareness'],
    contact: 'Contact your District Court complex',
    icon: <People />,
    color: 'success',
  },
];

const howToApply = [
  { step: '1', title: 'Check Eligibility', desc: 'Verify you meet the income or category criteria for legal aid' },
  { step: '2', title: 'Visit DLSA Office', desc: 'Go to the District Legal Services Authority office in your District Court complex' },
  { step: '3', title: 'Submit Application', desc: 'Fill out Form I (Application for Legal Aid) with required documents' },
  { step: '4', title: 'Required Documents', desc: 'Income certificate, identity proof, case details, court notices (if any)' },
  { step: '5', title: 'Lawyer Assigned', desc: 'A panel lawyer will be assigned to your case free of charge' },
  { step: '6', title: 'Online Application', desc: 'Apply online at nalsa.gov.in or call the toll-free helpline 15100' },
];

const lokAdalat = [
  'Lok Adalats are alternative dispute resolution forums',
  'Awards passed by Lok Adalat are deemed decrees and are final and binding',
  'No appeal lies against Lok Adalat award in any court',
  'No court fees are charged, and if already paid, it is refunded',
  'Pre-litigation and court-pending cases can be settled',
  'Cases include motor accident claims, matrimonial disputes, labour disputes, etc.',
];

const LegalAid = () => (
  <Container maxWidth="lg" sx={{ py: 4 }}>
    <Typography variant="h4" fontWeight="bold" gutterBottom>Legal Aid in India</Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
      Every citizen has a right to justice. Free legal aid ensures that lack of money is never a barrier to accessing justice.
    </Typography>

    <Alert severity="info" icon={<Info />} sx={{ mb: 4 }}>
      <strong>Article 39-A of the Indian Constitution</strong> mandates that the State shall ensure that the operation of
      the legal system promotes justice on a basis of equal opportunity, and in particular, provide free legal aid.
    </Alert>

    {/* Schemes */}
    <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
      Legal Aid Schemes
    </Typography>
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {schemes.map(s => (
        <Grid item xs={12} md={4} key={s.name}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <Box sx={{ p: 1, bgcolor: `${s.color}.light`, borderRadius: 2, color: `${s.color}.main` }}>
                  {s.icon}
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight="bold">{s.name}</Typography>
                  <Chip label={s.level} size="small" color={s.color} />
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary" paragraph>
                {s.description}
              </Typography>
              <Divider sx={{ mb: 1.5 }} />
              <Typography variant="subtitle2" gutterBottom>Services:</Typography>
              <List dense disablePadding>
                {s.services.map((svc, i) => (
                  <ListItem key={i} disablePadding>
                    <ListItemIcon sx={{ minWidth: 28 }}>
                      <CheckCircle fontSize="small" color="success" />
                    </ListItemIcon>
                    <ListItemText primary={svc} primaryTypographyProps={{ variant: 'body2' }} />
                  </ListItem>
                ))}
              </List>
              <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Language fontSize="small" color="action" />
                <Typography variant="caption" color="text.secondary">{s.contact}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>

    {/* Eligibility */}
    <Accordion defaultExpanded sx={{ mb: 2 }}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h6" fontWeight="bold">Who is Eligible for Free Legal Aid?</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={1}>
          {eligibilityCriteria.map((criteria, i) => (
            <Grid item xs={12} sm={6} key={i}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <CheckCircle color="success" fontSize="small" sx={{ mt: 0.5, flexShrink: 0 }} />
                <Typography variant="body2">{criteria}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>

    {/* How to Apply */}
    <Accordion sx={{ mb: 2 }}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h6" fontWeight="bold">How to Apply for Legal Aid</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          {howToApply.map(step => (
            <Grid item xs={12} sm={6} md={4} key={step.step}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="h4" color="primary" fontWeight="bold">{step.step}</Typography>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>{step.title}</Typography>
                <Typography variant="body2" color="text.secondary">{step.desc}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>

    {/* Lok Adalat */}
    <Accordion sx={{ mb: 4 }}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h6" fontWeight="bold">Lok Adalat (People's Court)</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List dense>
          {lokAdalat.map((item, i) => (
            <ListItem key={i} disablePadding sx={{ py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <Gavel fontSize="small" color="primary" />
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>

    {/* Contact / CTA */}
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3, bgcolor: 'primary.main', color: 'white' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Phone />
            <Typography variant="h6">NALSA Toll-Free Helpline</Typography>
          </Box>
          <Typography variant="h3" fontWeight="bold">15100</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>Available 24x7 for legal aid queries</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3, bgcolor: 'grey.100', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>Need a Lawyer?</Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            If you don't qualify for free legal aid, connect with verified lawyers on NyayaMitra
            for affordable consultations.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" component={Link} to="/lawyers">Find a Lawyer</Button>
            <Button variant="outlined" component={Link} to="/faqs">Browse FAQs</Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  </Container>
);

export default LegalAid;
