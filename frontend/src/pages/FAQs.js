import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Grid, Card, CardActionArea, CardContent, Typography,
  TextField, Box, Chip, CircularProgress, Alert, Accordion,
  AccordionSummary, AccordionDetails, InputAdornment, Button, Divider,
  Badge,
} from '@mui/material';
import { Search, ExpandMore, QuestionAnswer, ThumbUp, ThumbDown, ArrowForward } from '@mui/icons-material';
import api from '../services/api';

// ─── Static FAQ data (shown when backend has no data) ─────────────────────
const STATIC_FAQS = {
  FAMILY_LAW: [
    { q: 'What are the grounds for divorce in India?', a: 'Under Hindu Marriage Act, 1955: cruelty, desertion (2+ years), adultery, conversion, mental disorder, mutual consent (Section 13-B after 1 year separation + 6 month cooling off). Christians use Indian Divorce Act 1869; Muslims have Talaq/Khula.', refs: ['Hindu Marriage Act, 1955 - Section 13, 13-B'] },
    { q: 'How is child custody decided in India?', a: "Courts apply 'best interest of the child' principle. Children below 5 usually go to the mother. Children 9+ can express preference. Courts consider stability, parental capability, child's wishes. Governed by Hindu Minority & Guardianship Act 1956 and Guardians & Wards Act 1890.", refs: ['Hindu Minority and Guardianship Act, 1956', 'Guardians and Wards Act, 1890'] },
    { q: 'How much maintenance can a wife claim?', a: 'Under Section 125 CrPC (all religions): no fixed amount. Courts consider husband\'s income, wife\'s needs, children\'s needs, and standard of living. Wife can also claim under Hindu Marriage Act Section 24/25. Can be interim (during proceedings) or permanent.', refs: ['Section 125 CrPC', 'Hindu Marriage Act 1955 - Section 24, 25'] },
    { q: "Who inherits property when someone dies without a Will?", a: 'For Hindus (Hindu Succession Act 1956): Class I heirs (spouse, children, mother) first. After 2005 amendment, daughters have equal rights. For Muslims: fixed Quranic shares. Christians/Parsis: Indian Succession Act 1925. Making a registered Will avoids disputes.', refs: ['Hindu Succession Act, 1956', 'Indian Succession Act, 1925'] },
  ],
  CRIMINAL_LAW: [
    { q: 'What are my rights when arrested?', a: 'Right to know grounds of arrest (Article 22), consult a lawyer, be produced before Magistrate within 24 hours, inform a family member, remain silent (cannot be forced to confess), bail in bailable offences, and free legal aid. Police must prepare arrest memo.', refs: ['Article 20, 21, 22 Constitution', 'D.K. Basu v. State of WB (1997 SC)', 'Section 50, 57 CrPC'] },
    { q: 'How do I file an FIR and what if police refuse?', a: 'File at any police station (Zero FIR). It is FREE. Get a copy of FIR. If police refuse: send complaint by Registered Post to SP, or file before Magistrate under Section 156(3) CrPC. Supreme Court (Lalita Kumari, 2013) mandates FIR for all cognizable offences.', refs: ['Section 154, 156 CrPC', 'Lalita Kumari v. Govt of UP (2013 SC)'] },
    { q: 'What is Section 498A IPC (cruelty to wife)?', a: 'Punishes husband and relatives for cruelty to wife, dowry demands, and acts driving wife to suicide. Cognizable, non-bailable, non-compoundable. Punishment: 3 years + fine. Arnesh Kumar (SC 2014) guidelines prevent automatic arrests.', refs: ['Section 498A IPC', 'Arnesh Kumar v. State of Bihar (SC 2014)'] },
    { q: 'What is the difference between murder (302 IPC) and culpable homicide (304 IPC)?', a: 'Murder (Section 302): Intentional killing with full knowledge, highest punishment (death/life). Culpable Homicide (Section 304): Killing without full murder intention/knowledge, lesser punishment (10 years to life). Key difference is degree of intent and knowledge.', refs: ['Section 299, 300, 302, 304 IPC'] },
  ],
  PROPERTY_LAW: [
    { q: 'What documents should I check before buying property?', a: 'Sale Deed / Mother Deed (30-year chain), Encumbrance Certificate (NIL or cleared), Property Tax receipts, Khata Certificate, Building Plan Approvals with OC, RERA registration number, Agricultural land NA conversion certificate, and NOCs from society/utility boards.', refs: ['Transfer of Property Act, 1882', 'RERA Act, 2016'] },
    { q: 'What is RERA and how does it protect homebuyers?', a: 'RERA Act 2016: Mandatory registration for projects >500sqm or 8+ units. Sale on carpet area only. Delayed delivery → builder pays SBI MCLR+2% interest. 5-year structural defect liability. Max 10% advance before RERA registration. File complaints on state RERA portal.', refs: ['Real Estate (Regulation and Development) Act, 2016'] },
    { q: 'What is stamp duty and who pays it?', a: 'Stamp duty (2-8% of property value, varies by state) and registration charges (1-2%) are paid by the buyer. Must be paid before or at registration. Unregistered sale deeds are inadmissible in court. Women buyers get concessions in many states.', refs: ['Indian Stamp Act, 1899', 'Registration Act, 1908'] },
    { q: 'What is the difference between Sale Deed and Agreement to Sell?', a: 'Agreement to Sell: Promise of future sale, does NOT transfer ownership. Sale Deed: MUST be registered, transfers ownership immediately. Title passes ONLY on registration. Never rely only on Agreement to Sell — seller can sell to someone else or mortgage property.', refs: ['Section 53A, 54 Transfer of Property Act, 1882'] },
  ],
  CONSUMER_LAW: [
    { q: 'How do I file a consumer complaint?', a: 'District Consumer Commission (up to ₹1 crore), State Commission (₹1-10 crore), NCDRC (above ₹10 crore). File online at edaakhil.nic.in. No fee up to ₹5 lakh. Limitation: 2 years. Helpline: 1800-11-4000.', refs: ['Consumer Protection Act, 2019'] },
    { q: 'Can I get a refund for defective products bought online?', a: 'Yes. E-Commerce Rules 2020: platforms must show return/refund policy, honour it. Send complaint by email first. If unresolved in 30 days: file on consumerhelpline.gov.in, then edaakhil.nic.in. Platform AND seller can both be made party to complaint.', refs: ['Consumer Protection (E-Commerce) Rules, 2020'] },
    { q: 'What can I do if a hospital or doctor is negligent?', a: 'Doctors/hospitals are covered under Consumer Protection Act. File consumer complaint for negligence. Also file complaint with State Medical Council for license action. Criminal action possible if gross negligence. Limitation: 2 years from when negligence was discovered.', refs: ['Consumer Protection Act, 2019', 'Indian Medical Council Act'] },
  ],
  LABOUR_LAW: [
    { q: 'What is EPF and how does it work?', a: 'Both employer and employee contribute 12% of basic+DA. Employer\'s 8.33% goes to EPS (pension), 3.67% to EPF. Interest ~8.1% p.a. Withdraw fully at retirement/58 years or 2 months unemployment. Partial withdrawal for marriage, education, medical. UAN links all accounts. Helpline: 1800-118-005.', refs: ['EPF & Miscellaneous Provisions Act, 1952'] },
    { q: 'Am I entitled to gratuity?', a: 'After 5 years continuous service (except death/disability cases — no minimum). Formula: Last (Basic+DA) × 15/26 × years. Max ₹20 lakh (tax free). Pay within 30 days of claim. If refused: approach Asst Labour Commissioner, 10% interest for delay.', refs: ['Payment of Gratuity Act, 1972'] },
    { q: 'Can my employer terminate me without notice or reason?', a: 'No. Notice period per appointment letter mandatory. Retrenchment in 100+ worker firms needs government approval (Chapter VB ID Act). Retrenchment compensation: 15 days/year. Wrongful termination: approach Labour Court for reinstatement + back wages.', refs: ['Industrial Disputes Act, 1947 - Section 25F, 25G'] },
  ],
  RTI: [
    { q: 'What is RTI and how do I file it?', a: 'Any citizen can seek information from any public authority. File to PIO with ₹10 fee (BPL: free). Online: rtionline.gov.in (Central) or state portals. Response in 30 days (48 hours for life/liberty). First appeal: within 30 days to FAA. Second appeal: within 90 days to Information Commissioner. PIO penalized ₹250/day for delays.', refs: ['Right to Information Act, 2005 - Section 6, 7, 19'] },
    { q: 'What information can be denied under RTI?', a: 'Exempt: Cabinet papers (until decision), security/intelligence matters, third-party commercial secrets, personal info with no public interest, info held in fiduciary capacity, parliamentary privileges. Partially exempt info must be disclosed with exempt parts redacted.', refs: ['Section 8, 9 RTI Act, 2005'] },
  ],
  BAIL: [
    { q: 'What is anticipatory bail?', a: 'Section 438 CrPC: Pre-arrest bail for non-bailable offences when you reasonably apprehend arrest. Apply to Sessions Court or High Court. Conditions usually: available for interrogation, not leave India, surrender passport. Siddharam Satlingappa (SC 2011): bail is the norm, jail is exception.', refs: ['Section 438 CrPC', 'Siddharam Satlingappa (SC 2011)'] },
    { q: 'What is the difference between bailable and non-bailable offences?', a: 'Bailable: Bail is a right — police must grant it (Section 436). Examples: hurt, mischief. Non-bailable: Bail at court discretion — police cannot grant it (Section 437, 439). Examples: murder, rape, kidnapping. For life imprisonment cases: bail very difficult.', refs: ['Section 436, 437, 439 CrPC', 'First Schedule CrPC'] },
  ],
  CHEQUE_BOUNCE: [
    { q: 'What is the process if a cheque bounces?', a: 'Section 138 NI Act: (1) Get Cheque Return Memo from bank. (2) Send legal notice by Registered Post within 30 days. (3) Drawer has 15 days to pay. (4) If unpaid: file criminal complaint within 30 more days. Forum: Metropolitan/Judicial Magistrate. Punishment: 2 years OR twice cheque amount. Also file civil suit simultaneously.', refs: ['Section 138, 141, 142 Negotiable Instruments Act, 1881'] },
  ],
  CYBER_LAW: [
    { q: 'What to do if I am a victim of online fraud?', a: 'IMMEDIATELY: Call 1930 (cybercrime helpline) to freeze transaction. Call bank to block account. Change passwords. Then file at cybercrime.gov.in. Also file FIR at local police or cybercrime station. Note all transaction IDs, fraudster phone numbers, screenshots. Higher recovery chance within first 24-48 hours.', refs: ['IT Act, 2000 - Section 66, 66C, 66D', 'Section 420 IPC'] },
    { q: 'Is cyberstalking a crime in India?', a: 'Yes. Section 354D IPC (cyberstalking): following a woman online, repeatedly contacting despite disinterest, monitoring online activity. Punishment: 1-3 years + fine. Section 67 IT Act: publishing obscene material. Report to cybercrime.gov.in and local police. Block and screenshot all evidence.', refs: ['Section 354D IPC', 'Section 67, 67A IT Act, 2000'] },
  ],
  MOTOR_VEHICLES: [
    { q: 'What should I do after a road accident?', a: 'Do NOT flee (hit-and-run: criminal offence). Call 108 (ambulance) and 112 (police). Take photos of scene, damages, other vehicle. Note vehicle number, driver, insurance. Get FIR copy and MLC (Medico-Legal Certificate) from hospital. File MACT claim within 6 months for compensation.', refs: ['Motor Vehicles Act, 2019 - Section 161, 166'] },
    { q: 'How do I claim compensation for road accident injury?', a: 'File claim petition before MACT (Motor Accident Claims Tribunal) in any district within 6 months of accident (courts have discretion for delay). Attach: FIR, MLC, hospital bills, income proof. Third-party insurance is mandatory — compensation from at-fault vehicle\'s insurer. Hit-and-run: Solatium Fund (₹50,000 death, ₹25,000 injury).', refs: ['Section 140, 163-A, 166 MV Act, 2019'] },
  ],
  DOMESTIC_VIOLENCE: [
    { q: 'What is the Protection of Women from Domestic Violence Act?', a: 'DV Act 2005 covers physical, sexual, verbal, emotional, and economic abuse. Also covers live-in relationships. Relief: Protection Order (no contact), Residence Order (right to stay home), Monetary Relief, Custody Order. Contact Protection Officer (FREE) in your district or call 181. Emergency: Call 112.', refs: ['Protection of Women from Domestic Violence Act, 2005'] },
  ],
  COURT_PROCEDURE: [
    { q: 'What are the limitation periods for filing cases?', a: 'Money recovery: 3 years. Property: 12 years. Consumer complaint: 2 years. Cheque bounce: strict 30+15+30 days. MACT: 6 months. Service matter: 3 years. Criminal (>3 years punishment): no limitation. Courts can condone delay for "sufficient cause" — always file condonation application if late.', refs: ['Limitation Act, 1963', 'Section 468 CrPC'] },
    { q: 'What is Lok Adalat and how is it beneficial?', a: 'ADR forum under Legal Services Authorities Act 1987. Cases settled by mutual agreement. Award is FINAL — no appeal. No court fees; fees already paid are REFUNDED. Suitable for: motor accidents (most common), cheque bounce, matrimonial (non-divorce), labour, utility bills. Contact DLSA to participate.', refs: ['Legal Services Authorities Act, 1987 - Section 19-22'] },
    { q: 'How does mediation work in India?', a: 'Neutral mediator facilitates negotiation — does NOT decide. Confidential, voluntary, and quicker than litigation. Now governed by Mediation Act 2023. Commercial courts mandate pre-litigation mediation. Suitable for family, commercial, property, employment disputes. Settlement recorded by court becomes binding decree.', refs: ['Mediation Act, 2023', 'Section 89 CPC'] },
  ],
  TENANCY: [
    { q: 'Can a landlord evict a tenant forcibly?', a: 'NO. Only court order allows eviction. Cutting electricity/water to force out tenant is illegal. Forcible entry = criminal trespass (Section 451 IPC). Landlord must follow proper legal process: serve notice, then file eviction suit in Rent Court. You can call police for illegal eviction attempt.', refs: ['Transfer of Property Act 1882 - Section 106', 'State Rent Control Acts'] },
  ],
};

const CATEGORY_META = {
  FAMILY_LAW:       { label: 'Family Law', color: '#7b1fa2', icon: '👨‍👩‍👧' },
  CRIMINAL_LAW:     { label: 'Criminal Law', color: '#d32f2f', icon: '⚖️' },
  PROPERTY_LAW:     { label: 'Property Law', color: '#1976d2', icon: '🏠' },
  CONSUMER_LAW:     { label: 'Consumer Law', color: '#f57c00', icon: '🛒' },
  LABOUR_LAW:       { label: 'Labour Law', color: '#388e3c', icon: '💼' },
  RTI:              { label: 'RTI', color: '#0288d1', icon: '📋' },
  BAIL:             { label: 'Bail & Arrest', color: '#455a64', icon: '🔓' },
  CHEQUE_BOUNCE:    { label: 'Cheque Bounce', color: '#e65100', icon: '🏦' },
  CYBER_LAW:        { label: 'Cyber Law', color: '#4527a0', icon: '💻' },
  MOTOR_VEHICLES:   { label: 'Motor Vehicles', color: '#00796b', icon: '🚗' },
  DOMESTIC_VIOLENCE:{ label: 'Domestic Violence', color: '#c62828', icon: '🛡️' },
  COURT_PROCEDURE:  { label: 'Court Procedure', color: '#5d4037', icon: '🏛️' },
  TENANCY:          { label: 'Tenancy', color: '#37474f', icon: '🏘️' },
};

const FAQs = () => {
  const [backendFaqs, setBackendFaqs] = useState([]);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [voted, setVoted] = useState({});

  useEffect(() => {
    api.get('/faqs')
      .then(r => setBackendFaqs(r.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleVote = async (id, helpful) => {
    if (voted[id]) return;
    try {
      await api.post(`/faqs/${id}/${helpful ? 'helpful' : 'not-helpful'}`);
      setVoted(v => ({ ...v, [id]: helpful ? 'up' : 'down' }));
    } catch {}
  };

  // Build display: backend data if available, else static
  const buildDisplay = () => {
    if (backendFaqs.length > 0) {
      const grouped = {};
      backendFaqs.forEach(f => {
        const cat = f.category || 'OTHER';
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push(f);
      });
      return grouped;
    }
    // Static fallback — format same shape
    const result = {};
    Object.entries(STATIC_FAQS).forEach(([cat, items]) => {
      result[cat] = items.map((item, i) => ({
        id: `static-${cat}-${i}`,
        question: item.q,
        answer: item.a,
        legalReferences: item.refs,
        category: cat,
        helpfulCount: 0,
        notHelpfulCount: 0,
      }));
    });
    return result;
  };

  const displayData = buildDisplay();

  const searchResults = search.length > 1
    ? Object.values(displayData).flat().filter(f =>
        f.question.toLowerCase().includes(search.toLowerCase()) ||
        f.answer.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const visibleCategories = activeCategory ? [activeCategory] : Object.keys(displayData);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>Legal FAQs</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Answers to common legal questions for Indian citizens, researched and verified by our legal team.
      </Typography>

      {/* Search */}
      <TextField
        fullWidth
        placeholder="Search any legal question..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        sx={{ mb: 4 }}
        InputProps={{
          startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
          endAdornment: search && (
            <Button size="small" onClick={() => setSearch('')}>Clear</Button>
          ),
        }}
      />

      {/* Search Results */}
      {search.length > 1 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>{searchResults.length} results for "{search}"</Typography>
          {searchResults.length === 0 ? (
            <Alert severity="info">No results found. Try different keywords.</Alert>
          ) : searchResults.map(faq => (
            <FAQAccordion key={faq.id} faq={faq} onVote={handleVote} voted={voted} />
          ))}
        </Box>
      )}

      {/* Category Cards */}
      {!search && (
        <>
          <Typography variant="h6" gutterBottom>Browse by Category</Typography>
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {Object.entries(CATEGORY_META).map(([key, meta]) => {
              if (!displayData[key]) return null;
              const count = displayData[key]?.length || 0;
              return (
                <Grid item xs={6} sm={4} md={3} key={key}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      border: '2px solid',
                      borderColor: activeCategory === key ? meta.color : 'transparent',
                      '&:hover': { borderColor: meta.color, boxShadow: 4 },
                      transition: 'all 0.2s',
                    }}
                    onClick={() => setActiveCategory(activeCategory === key ? null : key)}
                  >
                    <CardContent sx={{ textAlign: 'center', py: 2 }}>
                      <Typography fontSize={32}>{meta.icon}</Typography>
                      <Typography variant="subtitle2" fontWeight="bold" sx={{ mt: 0.5 }}>
                        {meta.label}
                      </Typography>
                      <Chip label={`${count} FAQs`} size="small" sx={{ mt: 0.5, bgcolor: meta.color + '20', color: meta.color }} />
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          {activeCategory && (
            <Button variant="outlined" onClick={() => setActiveCategory(null)} sx={{ mb: 3 }}>
              ← Show All Categories
            </Button>
          )}

          {/* FAQ Accordions */}
          {loading ? (
            <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>
          ) : visibleCategories.map(cat => {
            const meta = CATEGORY_META[cat] || { label: cat.replace(/_/g, ' '), icon: '📋', color: '#666' };
            const items = displayData[cat] || [];
            if (items.length === 0) return null;
            return (
              <Box key={cat} sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <Typography fontSize={24}>{meta.icon}</Typography>
                  <Typography variant="h5" fontWeight="bold" sx={{ color: meta.color }}>
                    {meta.label}
                  </Typography>
                  <Chip label={`${items.length} questions`} size="small" />
                </Box>
                {items.map(faq => (
                  <FAQAccordion key={faq.id} faq={faq} onVote={handleVote} voted={voted} />
                ))}
                <Divider sx={{ mt: 3 }} />
              </Box>
            );
          })}
        </>
      )}

      {/* Bottom CTA */}
      <Box sx={{ mt: 4, p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>Didn't find your answer?</Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Get personalized legal advice from a verified lawyer
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="contained" color="secondary" component={Link} to="/book-lawyer" endIcon={<ArrowForward />}>
            Book a Lawyer
          </Button>
          <Button variant="outlined" color="inherit" component={Link} to="/legal-aid">
            Free Legal Aid
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

const FAQAccordion = ({ faq, onVote, voted }) => (
  <Accordion sx={{ mb: 1, '&:before': { display: 'none' }, boxShadow: 1 }}>
    <AccordionSummary expandIcon={<ExpandMore />}>
      <Box sx={{ width: '100%', pr: 1 }}>
        <Typography fontWeight="medium">{faq.question}</Typography>
        {faq.tags?.length > 0 && (
          <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5, flexWrap: 'wrap' }}>
            {faq.tags.slice(0, 3).map(t => <Chip key={t} label={t} size="small" sx={{ fontSize: '0.65rem' }} />)}
          </Box>
        )}
      </Box>
    </AccordionSummary>
    <AccordionDetails>
      {faq.shortAnswer && (
        <Box sx={{ p: 1.5, mb: 2, bgcolor: 'primary.50', borderRadius: 1, borderLeft: '3px solid', borderColor: 'primary.main' }}>
          <Typography variant="body2" fontWeight="medium">{faq.shortAnswer}</Typography>
        </Box>
      )}
      <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>{faq.answer}</Typography>
      {faq.legalReferences?.length > 0 && (
        <Box sx={{ mt: 2 }}>
          {faq.legalReferences.map((ref, i) => (
            <Typography key={i} variant="caption" color="primary" display="block">§ {ref}</Typography>
          ))}
        </Box>
      )}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
        <Typography variant="caption" color="text.secondary">Was this helpful?</Typography>
        <Button
          size="small"
          startIcon={<ThumbUp fontSize="small" />}
          color={voted[faq.id] === 'up' ? 'primary' : 'inherit'}
          onClick={() => onVote(faq.id, true)}
          disabled={!!voted[faq.id]}
        >
          {faq.helpfulCount || 0}
        </Button>
        <Button
          size="small"
          startIcon={<ThumbDown fontSize="small" />}
          color={voted[faq.id] === 'down' ? 'error' : 'inherit'}
          onClick={() => onVote(faq.id, false)}
          disabled={!!voted[faq.id]}
        >
          {faq.notHelpfulCount || 0}
        </Button>
        {faq.id && !faq.id.startsWith('static') && (
          <Button size="small" component={Link} to={`/faqs/${faq.id}`} endIcon={<ArrowForward />} sx={{ ml: 'auto' }}>
            Full Details
          </Button>
        )}
      </Box>
    </AccordionDetails>
  </Accordion>
);

export default FAQs;
