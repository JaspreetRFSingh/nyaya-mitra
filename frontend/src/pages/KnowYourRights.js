import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Grid, Card, CardContent, Typography, Box, Chip,
  Accordion, AccordionSummary, AccordionDetails, Button, Paper,
  List, ListItem, ListItemIcon, ListItemText, Tab, Tabs, Divider, Alert,
} from '@mui/material';
import {
  ExpandMore, Security, Gavel, Home, Work, ShoppingCart,
  DirectionsCar, Computer, FamilyRestroom, Warning, CheckCircle,
  Phone, ArrowForward,
} from '@mui/icons-material';

const CATEGORIES = [
  { id: 'arrest', label: 'Arrest & Police', icon: <Security />, color: '#d32f2f' },
  { id: 'property', label: 'Property & Tenant', icon: <Home />, color: '#1976d2' },
  { id: 'employment', label: 'Employment', icon: <Work />, color: '#388e3c' },
  { id: 'consumer', label: 'Consumer', icon: <ShoppingCart />, color: '#f57c00' },
  { id: 'family', label: 'Family & Women', icon: <FamilyRestroom />, color: '#7b1fa2' },
  { id: 'accident', label: 'Road Accidents', icon: <DirectionsCar />, color: '#0288d1' },
  { id: 'cyber', label: 'Cyber & Online', icon: <Computer />, color: '#455a64' },
];

const RIGHTS_DATA = {
  arrest: {
    title: 'Your Rights When Arrested',
    constitutional: 'Articles 20, 21, 22 of the Constitution guarantee protection against arbitrary arrest.',
    rights: [
      { title: 'Know the reason', desc: 'Police MUST tell you why you are being arrested. You cannot be arrested without stating grounds.', icon: '⚖️' },
      { title: 'Right to a Lawyer', desc: 'You have the right to consult and be defended by a lawyer of your choice. This right cannot be denied. Legal Aid is FREE if you cannot afford one — call 15100.', icon: '👨‍⚖️' },
      { title: 'Produced before Magistrate within 24 hours', desc: 'Police CANNOT keep you in custody for more than 24 hours without producing you before the nearest Magistrate. This is a fundamental right.', icon: '🕐' },
      { title: 'Inform a family member', desc: 'Police must allow you or your relative to be informed of the arrest. Ask to call your family immediately.', icon: '📞' },
      { title: 'Right to Remain Silent', desc: 'You CANNOT be forced to confess. Anything said to police before a Magistrate is not evidence. Politely say "I want to consult my lawyer before answering any questions."', icon: '🤐' },
      { title: 'No torture or third degree', desc: 'Physical torture by police is a criminal offence (Section 330 IPC). If tortured, file a complaint with SP, High Court, or NHRC.', icon: '🛡️' },
      { title: 'Bail in bailable offences', desc: 'If the offence is bailable, police MUST grant bail. They cannot refuse. If they do, immediately approach the Magistrate.', icon: '🔓' },
      { title: 'Women specific rights', desc: 'Women cannot be arrested after sunset and before sunrise without a female officer. Women must be kept in female lock-up only.', icon: '👩' },
      { title: 'Arrest memo', desc: 'Police must prepare an arrest memo in the presence of a witness. Get a copy. This memo states time of arrest and offence.', icon: '📝' },
    ],
    doNots: [
      'Do NOT sign any blank paper or statement',
      'Do NOT give bribe — this can be used against you',
      'Do NOT resist arrest physically even if unlawful (challenge it legally)',
      'Do NOT consent to search without asking to see the search warrant',
    ],
    helplines: [
      { name: 'Legal Aid', number: '15100' },
      { name: 'Police Emergency', number: '100' },
      { name: 'Human Rights Commission', number: '14433' },
    ],
  },
  property: {
    title: 'Property & Tenancy Rights',
    constitutional: 'Right to property under Article 300-A. You cannot be deprived of property without legal authority.',
    rights: [
      { title: 'As a Buyer', desc: 'Right to see all title documents. Right to verify encumbrance certificate. Right to get registered Sale Deed before paying full amount. Right to complain under RERA for builder defaults.', icon: '🏠' },
      { title: 'As a Tenant', desc: 'Right to peaceful possession. Cannot be evicted without court order. Cannot be forced out by cutting electricity/water. Right to get rent receipt for every payment.', icon: '🏘️' },
      { title: 'As a Homebuyer (RERA)', desc: 'Right to delivery on time. Right to refund + interest for delay. Right to compensation for defects. Right to get Occupancy Certificate.', icon: '🏗️' },
      { title: 'As a Seller', desc: 'Right to fair price. Right to receive full payment before handing keys. Right to retain property until registered Sale Deed is executed.', icon: '💰' },
      { title: 'Land acquisition', desc: 'Government can acquire land only with proper compensation under Land Acquisition Act 2013. You have right to fair market value + solatium (additional 100% for rural, 25% for urban).', icon: '🌾' },
      { title: 'Women\'s property rights', desc: 'After 2005 amendment: Daughters have EQUAL rights as sons in Hindu family property. Married women can claim share in ancestral property.', icon: '👩‍⚖️' },
    ],
    doNots: [
      'Do NOT pay advance without a proper agreement',
      'Do NOT accept property without verifying encumbrance',
      'Do NOT pay full amount before registered Sale Deed',
      'Do NOT allow landlord to enter without notice (except emergency)',
    ],
    helplines: [
      { name: 'RERA Complaint', number: 'Visit state RERA portal' },
      { name: 'Consumer Helpline', number: '1800-11-4000' },
    ],
  },
  employment: {
    title: 'Employment & Labour Rights',
    constitutional: 'Right to work in dignified conditions. Articles 39, 41, 42, 43 (Directive Principles) protect workers.',
    rights: [
      { title: 'Minimum Wage', desc: 'Every worker is entitled to state minimum wage. Check your state\'s Minimum Wage Schedule on the Labour Dept website. Non-payment is a criminal offence.', icon: '💵' },
      { title: 'EPF and ESI', desc: 'If your company has 20+ employees: mandatory EPF contribution. 10+ employees: mandatory ESI (health insurance). Both employer and employee contribute.', icon: '🏥' },
      { title: 'Gratuity', desc: 'After 5 years of continuous service, you are entitled to gratuity. Formula: Last salary × 15/26 × years of service. Maximum Rs 20 lakh.', icon: '🎁' },
      { title: 'Maternity Benefit', desc: 'Women employees: 26 weeks paid maternity leave (for first 2 children). Nursing breaks. Cannot be dismissed during maternity period.', icon: '👶' },
      { title: 'No Sexual Harassment', desc: 'POSH Act, 2013: Every organization with 10+ employees must have an Internal Complaints Committee (ICC). File complaint within 3 months of incident.', icon: '⚠️' },
      { title: 'Notice Period', desc: 'Entitled to notice period or notice pay as per appointment letter. Minimum 30 days notice is standard. Retrenchment in 100+ worker firms needs government approval.', icon: '📋' },
      { title: 'Overtime Pay', desc: 'Factories Act: Max 9 hours/day, 48 hours/week. Overtime: double the ordinary wages. Cannot force overtime beyond legal limits.', icon: '⏰' },
      { title: 'Contract Labour Rights', desc: 'Contract/gig workers are entitled to minimum wage, safe working conditions, and PF if working at a place with 20+ workers.', icon: '🤝' },
    ],
    doNots: [
      'Do NOT sign blank documents or forced settlement letters',
      'Do NOT accept termination without written letter with reason',
      'Do NOT let employer deduct wages without legal grounds',
    ],
    helplines: [
      { name: 'Labour Helpline', number: '1800-11-4455' },
      { name: 'EPF Helpline', number: '1800-118-005' },
      { name: 'POSH Complaint (SHe-Box)', number: 'shebox.wcd.nic.in' },
    ],
  },
  consumer: {
    title: 'Consumer Rights',
    constitutional: 'Consumer Protection Act, 2019 provides 6 fundamental consumer rights.',
    rights: [
      { title: 'Right to Safety', desc: 'Right to be protected from goods and services that are hazardous to life and property.', icon: '🛡️' },
      { title: 'Right to Information', desc: 'Right to be informed about quality, quantity, potency, purity, standard, and price of goods. Price must be printed on packaged goods (MRP).', icon: 'ℹ️' },
      { title: 'Right to Choose', desc: 'Right to access a variety of goods/services at competitive prices. No monopolistic practices.', icon: '✅' },
      { title: 'Right to be Heard', desc: 'Right to be heard and assured that consumer interests will receive due consideration. File complaints at Consumer Forum.', icon: '📢' },
      { title: 'Right to Redressal', desc: 'Right to seek redressal against unfair practices and exploitation. Consumer courts are fast and accessible. File online at edaakhil.nic.in.', icon: '⚖️' },
      { title: 'Right to Consumer Education', desc: 'Right to acquire knowledge and skills to be an informed consumer.', icon: '📚' },
      { title: 'E-Commerce Rights', desc: 'Online sellers must show accurate product images/descriptions. Platforms must have easy return/refund process. Cannot auto-renew subscriptions without notice.', icon: '🛒' },
      { title: 'Medical Consumer Rights', desc: 'Doctors and hospitals are covered under Consumer Protection Act. Medical negligence complaints can be filed at Consumer Forum. Right to written estimates, informed consent.', icon: '🏥' },
    ],
    doNots: [
      'Do NOT accept defective products without demanding replacement/refund',
      'Do NOT let companies deny warranty claims without checking the law',
      'Do NOT pay MRP above printed price — it is illegal',
    ],
    helplines: [
      { name: 'National Consumer Helpline', number: '1800-11-4000' },
      { name: 'E-commerce Complaint', number: 'consumerhelpline.gov.in' },
    ],
  },
  family: {
    title: 'Family & Women\'s Rights',
    constitutional: 'Articles 14, 15, 21 guarantee equality and right to life. Special laws protect women and children.',
    rights: [
      { title: 'Right Against Domestic Violence', desc: 'DV Act 2005 protects against physical, sexual, verbal, emotional, and economic abuse. Contact Protection Officer (FREE) in your district or call 181.', icon: '🛡️' },
      { title: 'Maintenance Rights', desc: 'Women can claim maintenance from husband under Section 125 CrPC regardless of religion. Even divorced women can claim maintenance in certain circumstances.', icon: '💰' },
      { title: 'Matrimonial Property Rights', desc: 'Wife has right to stay in matrimonial home even after divorce petition (Residence Order under DV Act). Cannot be thrown out without court order.', icon: '🏠' },
      { title: 'Dowry Protection', desc: 'Demanding dowry is a criminal offence under Dowry Prohibition Act. Section 498A IPC protects against dowry harassment. Call 100 for immediate help.', icon: '⚠️' },
      { title: 'Daughters\' Property Rights', desc: 'Hindu Succession Act (amended 2005): Daughters have EQUAL rights as sons in parental property. Even married daughters can claim share.', icon: '👩' },
      { title: 'Maternity Protection', desc: '26 weeks paid maternity leave for first 2 children. Work from home option. Creche facility in large organizations. Cannot be fired during pregnancy.', icon: '👶' },
      { title: 'Sexual Assault Victim Rights', desc: 'Right to file FIR at any police station. No two-finger test allowed. Female doctor for medical examination. Statement recorded by female officer. Free legal aid.', icon: '🚨' },
      { title: 'Children\'s Rights', desc: 'Right to free education (RTE Act) age 6-14. Right against child labour. Child marriages prohibited. Right to safe environment.', icon: '🧒' },
    ],
    doNots: [
      'Do NOT stay silent if facing domestic violence — seek help',
      'Do NOT give dowry — it is illegal even if voluntary',
    ],
    helplines: [
      { name: 'Women Helpline', number: '181' },
      { name: 'Domestic Violence Helpline', number: '1091' },
      { name: 'Child Helpline', number: '1098' },
      { name: 'NALSA (Legal Aid)', number: '15100' },
    ],
  },
  accident: {
    title: 'Road Accident Rights',
    constitutional: 'Right to claim compensation for accident caused by negligence. Motor Vehicles Act, 2019 provides strong protection.',
    rights: [
      { title: 'Right to Emergency Medical Care', desc: 'Any hospital (government or private) MUST provide emergency treatment to accident victims. Cannot be denied treatment even without payment. Good Samaritan law protects helpers.', icon: '🏥' },
      { title: 'Right to Compensation', desc: 'Accident victims can claim compensation from MACT (Motor Accident Claims Tribunal) in every district. Third-party insurance is mandatory. File within 6 months.', icon: '💰' },
      { title: 'Hit and Run Protection', desc: 'Even in hit-and-run cases: Rs 50,000 for death, Rs 25,000 for grievous injury from Solatium Fund. Contact Claims Inquiry Officer in district.', icon: '🚗' },
      { title: 'Right to FIR and MLC', desc: 'Insist on FIR registration and Medico-Legal Certificate (MLC) from hospital. These are crucial for MACT claim. Cannot be denied.', icon: '📝' },
      { title: 'Insurance Claim Rights', desc: 'Insurance company cannot deny third-party claim without proving driver was not at fault. Cannot delay settlement unreasonably.', icon: '📋' },
      { title: 'Employer liability', desc: 'If accident occurred during employment, employer (and their insurer) is also liable under Workmen\'s Compensation Act.', icon: '👔' },
    ],
    doNots: [
      'Do NOT flee accident scene — it is a serious criminal offence',
      'Do NOT accept quick settlements without consulting a lawyer',
      'Do NOT delay filing MACT claim beyond 6 months',
    ],
    helplines: [
      { name: 'Ambulance', number: '108' },
      { name: 'Police Emergency', number: '112' },
      { name: 'Road Safety Helpline', number: '1033' },
    ],
  },
  cyber: {
    title: 'Cyber & Online Rights',
    constitutional: 'Right to privacy (Puttaswamy judgment 2017, SC). IT Act, 2000 provides framework for cyber rights.',
    rights: [
      { title: 'Right to Privacy Online', desc: 'Unauthorized access to your email/account is a criminal offence. Hacking: Section 66 IT Act (up to 3 years + fine). Right to data protection.', icon: '🔒' },
      { title: 'Right Against Cyberstalking', desc: 'Cyberstalking/harassment online: Section 354D IPC + Section 66A IT Act. Block, screenshot, and report to cybercrime.gov.in and local police.', icon: '🛡️' },
      { title: 'Identity Theft Protection', desc: 'Using another person\'s identity fraudulently online: Section 66C IT Act (up to 3 years + Rs 1 lakh fine). Report immediately.', icon: '👤' },
      { title: 'Right Against Online Fraud', desc: 'Online financial fraud: Section 66D IT Act + Section 420 IPC. Call 1930 immediately. File on cybercrime.gov.in. Banks must freeze fraudulent transfers.', icon: '💳' },
      { title: 'Social Media Rights', desc: 'Morphed/fake photos/videos: Section 66E (violation of privacy), Section 67A IT Act. Police must take action. File on cybercrime.gov.in.', icon: '📱' },
      { title: 'Right to Report Fake News', desc: 'Spreading fake news causing public harm: Section 505 IPC. Report on Fact Check portal (pib.gov.in/factcheck) and cybercrime.gov.in.', icon: '📰' },
      { title: 'Data Protection', desc: 'Companies must protect your personal data. DPDP Act, 2023 gives you right to know what data is collected, right to correction, and right to erasure.', icon: '🗄️' },
    ],
    doNots: [
      'Do NOT share OTPs, passwords, or bank details with anyone',
      'Do NOT click on suspicious links in messages or emails',
      'Do NOT ignore cybercrime — report immediately for best recovery chance',
    ],
    helplines: [
      { name: 'Cybercrime Helpline', number: '1930' },
      { name: 'Report Online: cybercrime.gov.in', number: '' },
    ],
  },
};

const KnowYourRights = () => {
  const [activeCategory, setActiveCategory] = useState('arrest');
  const data = RIGHTS_DATA[activeCategory];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>Know Your Legal Rights</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Every Indian citizen has fundamental rights guaranteed by the Constitution and various laws.
        Know them. Use them. Assert them.
      </Typography>

      <Alert severity="info" sx={{ mb: 4 }}>
        <strong>Remember:</strong> Ignorance of rights leads to their violation. If your rights are violated, you have legal remedies.
        Call NALSA Legal Aid Helpline <strong>15100</strong> (FREE) for immediate assistance.
      </Alert>

      {/* Category selector */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 4 }}>
        {CATEGORIES.map(cat => (
          <Chip
            key={cat.id}
            icon={cat.icon}
            label={cat.label}
            onClick={() => setActiveCategory(cat.id)}
            color={activeCategory === cat.id ? 'primary' : 'default'}
            variant={activeCategory === cat.id ? 'filled' : 'outlined'}
            clickable
            sx={{ fontSize: '0.9rem', py: 2.5, px: 1 }}
          />
        ))}
      </Box>

      {/* Content */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>{data.title}</Typography>
          <Alert severity="success" icon={false} sx={{ mb: 3, borderLeft: '4px solid', borderColor: 'success.main' }}>
            <Typography variant="body2" color="text.secondary">{data.constitutional}</Typography>
          </Alert>

          <Typography variant="h6" gutterBottom>Your Rights</Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {data.rights.map((right, i) => (
              <Grid item xs={12} key={i}>
                <Card variant="outlined" sx={{ '&:hover': { boxShadow: 3 } }}>
                  <CardContent sx={{ py: 2 }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Typography fontSize={24}>{right.icon}</Typography>
                      <Box>
                        <Typography fontWeight="bold" gutterBottom>{right.title}</Typography>
                        <Typography variant="body2" color="text.secondary">{right.desc}</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Paper variant="outlined" sx={{ p: 2, bgcolor: 'error.50', borderColor: 'error.light' }}>
            <Typography variant="subtitle1" fontWeight="bold" color="error" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Warning fontSize="small" /> What NOT to Do
            </Typography>
            <List dense disablePadding>
              {data.doNots.map((d, i) => (
                <ListItem key={i} disablePadding sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 28, color: 'error.main' }}>✗</ListItemIcon>
                  <ListItemText primary={d} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          {/* Helplines */}
          <Card sx={{ mb: 3, bgcolor: 'primary.main', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone /> Emergency Helplines
              </Typography>
              <Divider sx={{ borderColor: 'rgba(255,255,255,0.3)', mb: 2 }} />
              {data.helplines.map((h, i) => (
                <Box key={i} sx={{ mb: 1.5 }}>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>{h.name}</Typography>
                  {h.number && (
                    <Typography variant="h6" fontWeight="bold">{h.number}</Typography>
                  )}
                </Box>
              ))}
            </CardContent>
          </Card>

          {/* Universal Helplines */}
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>Universal Helplines</Typography>
              {[
                { name: 'Police Emergency', number: '100 / 112' },
                { name: 'Women Helpline', number: '181' },
                { name: 'Child Helpline', number: '1098' },
                { name: 'Ambulance', number: '108' },
                { name: 'Legal Aid (NALSA)', number: '15100' },
                { name: 'Cybercrime', number: '1930' },
                { name: 'Consumer Helpline', number: '1800-11-4000' },
                { name: 'Anti-Corruption (CBI)', number: '1800-11-0180' },
              ].map((h, i) => (
                <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', py: 0.75, borderBottom: i < 7 ? '1px solid' : 'none', borderColor: 'divider' }}>
                  <Typography variant="body2">{h.name}</Typography>
                  <Typography variant="body2" fontWeight="bold" color="primary">{h.number}</Typography>
                </Box>
              ))}
            </CardContent>
          </Card>

          {/* CTA */}
          <Paper sx={{ p: 2, mt: 3, textAlign: 'center', bgcolor: 'grey.50' }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Need personalized legal advice?
            </Typography>
            <Button variant="contained" fullWidth endIcon={<ArrowForward />} component={Link} to="/lawyers">
              Consult a Lawyer
            </Button>
            <Button variant="outlined" fullWidth sx={{ mt: 1 }} component={Link} to="/faqs">
              Browse Legal FAQs
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default KnowYourRights;
