package com.nyayamitra.config;

import com.nyayamitra.model.Court;
import com.nyayamitra.model.FAQ;
import com.nyayamitra.repository.CourtRepository;
import com.nyayamitra.repository.FAQRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private FAQRepository faqRepository;

    @Autowired
    private CourtRepository courtRepository;

    @Override
    public void run(String... args) {
        if (faqRepository.count() == 0) {
            seedFAQs();
        }
        if (courtRepository.count() == 0) {
            seedCourts();
        }
    }

    // ─── FAQ builder helper ───────────────────────────────────────────────────

    private FAQ faq(String question, String shortAnswer, String answer,
                    FAQ.LegalCategory category, List<String> tags, List<String> refs) {
        FAQ f = new FAQ();
        f.setQuestion(question);
        f.setShortAnswer(shortAnswer);
        f.setAnswer(answer);
        f.setCategory(category);
        f.setTags(tags);
        f.setLegalReferences(refs);
        f.setIsVerified(true);
        f.setVerifiedBy("NyayaMitra Legal Team");
        f.setViewCount(0);
        f.setHelpfulCount(0);
        f.setNotHelpfulCount(0);
        f.setCreatedAt(new Date());
        f.setUpdatedAt(new Date());
        return f;
    }

    // ─── FAQ data ─────────────────────────────────────────────────────────────

    private void seedFAQs() {
        List<FAQ> faqs = Arrays.asList(

            // FAMILY LAW
            faq("What are the grounds for divorce in India?",
                "Hindu marriages can be dissolved on grounds like cruelty, desertion, adultery, conversion, mental disorder, or mutual consent (Section 13-B).",
                "Under the Hindu Marriage Act, 1955, grounds for divorce include:\n\n1. Cruelty (physical or mental)\n2. Desertion for 2+ years\n3. Conversion to another religion\n4. Mental disorder / unsound mind\n5. Leprosy or venereal disease\n6. Renouncement of the world\n7. Not heard alive for 7 years\n8. Mutual Consent (Section 13-B) — requires 1 year of separation + 6-month cooling period\n\nFor Muslims: Talaq, Khula, Mubarat\nFor Christians: Indian Divorce Act, 1869\nAll religions can use Special Marriage Act, 1954.",
                FAQ.LegalCategory.FAMILY_LAW,
                Arrays.asList("divorce", "family law", "Hindu Marriage Act"),
                Arrays.asList("Hindu Marriage Act, 1955 - Section 13", "Special Marriage Act, 1954 - Section 27")),

            faq("How is child custody decided in India?",
                "Courts decide custody based on 'best interest of the child', considering age, wishes, parental capability. Children below 5 usually stay with the mother.",
                "Child custody is governed by:\n\n• Hindu Minority and Guardianship Act, 1956\n• Guardians and Wards Act, 1890 (all religions)\n• Muslim Personal Law for Muslims\n\nTypes of custody:\n1. Physical Custody — child lives with one parent\n2. Joint Custody — shared between both parents\n3. Legal Custody — decision-making authority\n\nKey principles:\n• Child below 5 years: usually with mother\n• Children 9+ years: court considers child's preference\n• Child's welfare always overrides parental rights\n• Visitation rights granted to non-custodial parent",
                FAQ.LegalCategory.CUSTODY,
                Arrays.asList("custody", "child", "divorce", "guardian"),
                Arrays.asList("Hindu Minority and Guardianship Act, 1956", "Guardians and Wards Act, 1890")),

            faq("What is maintenance/alimony and who can claim it?",
                "Maintenance is financial support from a spouse or family. A wife, children, and aged parents can all claim maintenance under Section 125 CrPC.",
                "Maintenance provisions in India:\n\n1. Section 125 CrPC (applicable to all religions):\n   • Wife unable to maintain herself\n   • Children (legitimate/illegitimate) below 18\n   • Aged/infirm parents unable to maintain themselves\n\n2. Hindu Marriage Act — Section 24 & 25:\n   • Either spouse can claim during and after divorce\n\n3. Muslim Women (Protection of Rights on Divorce) Act, 1986:\n   • Mehr/dower amount + maintenance during iddat period\n\nFactors considered:\n• Income and assets of spouse\n• Reasonable needs and living standard\n• Whether wife is earning\n• Conduct of both parties",
                FAQ.LegalCategory.MAINTENANCE,
                Arrays.asList("maintenance", "alimony", "Section 125", "wife"),
                Arrays.asList("Section 125 CrPC", "Hindu Marriage Act, 1955 - Section 24, 25")),

            faq("What is the process for mutual consent divorce?",
                "Mutual consent divorce requires 1 year of separation. Both parties file jointly. After 6-month cooling period, court grants divorce. Total time: 6-18 months.",
                "Process for Mutual Consent Divorce (Section 13-B HMA):\n\nPrerequisites:\n• Both parties consent\n• Minimum 1 year of separation\n\nSteps:\n1. File First Motion petition jointly in Family Court\n2. Include agreements on maintenance, custody, property\n3. Court records statements of both parties\n4. 6-month cooling off period (courts may waive in special cases)\n5. File Second Motion\n6. Court grants divorce decree\n\nTypical timeline: 6-18 months\n\nDocuments needed:\n• Marriage certificate, ID proofs, address proofs\n• Settlement agreement on maintenance, custody, property",
                FAQ.LegalCategory.DIVORCE,
                Arrays.asList("mutual consent divorce", "Section 13-B"),
                Arrays.asList("Hindu Marriage Act, 1955 - Section 13-B")),

            faq("Who inherits property when someone dies without a Will?",
                "Property goes to legal heirs per personal law. For Hindus: Class I heirs (spouse, children, mother) have highest priority. For Muslims: fixed Quranic shares.",
                "Intestate Succession (no Will):\n\nHindus — Hindu Succession Act, 1956:\n• Class I heirs: Son, Daughter, Widow, Mother, Son's son, Son's daughter, Son's widow\n• Class II heirs: Father, siblings (only if no Class I heirs)\n• Daughters have equal rights as sons (2005 amendment)\n\nMuslims:\n• Shares fixed by Quran\n• Husband: 1/4 (with children) or 1/2 (without)\n• Wife: 1/8 (with children) or 1/4 (without)\n\nChristians/Parsis: Indian Succession Act, 1925\n\nTip: Make a registered Will to avoid disputes!",
                FAQ.LegalCategory.INHERITANCE,
                Arrays.asList("inheritance", "succession", "Will", "property", "death"),
                Arrays.asList("Hindu Succession Act, 1956", "Indian Succession Act, 1925")),

            faq("What is the Domestic Violence Act and how can a woman get protection?",
                "The DV Act, 2005 covers physical, sexual, emotional, and economic abuse. Women can get Protection Orders, Residence Orders, and Monetary Relief from a Magistrate court or via Protection Officer (FREE).",
                "Protection of Women from Domestic Violence Act, 2005:\n\nAbuse covered:\n• Physical, sexual, verbal, emotional, economic\n• Also covers live-in relationships\n\nRelief available:\n1. Protection Order — stops abuser from contacting you\n2. Residence Order — right to stay in shared home\n3. Monetary Relief — maintenance and expenses\n4. Custody Order — interim custody of children\n5. Compensation Order\n\nHow to get help:\n1. Contact District Protection Officer (FREE service)\n2. Call 181 (Women Helpline) or 1091 (Police)\n3. File complaint at nearest Magistrate court\n4. Can simultaneously file Section 498A IPC criminal case\n\nEmergency: Call 112 for immediate police protection.",
                FAQ.LegalCategory.DOMESTIC_VIOLENCE,
                Arrays.asList("domestic violence", "women", "protection order", "DV Act"),
                Arrays.asList("Protection of Women from Domestic Violence Act, 2005", "Section 498A IPC")),

            // CRIMINAL LAW
            faq("What are my rights when arrested by police in India?",
                "You have the right to know reasons for arrest, consult a lawyer, be produced before a Magistrate within 24 hours, inform a family member, and remain silent. You cannot be forced to confess.",
                "Your Rights on Arrest (Constitution + D.K. Basu Guidelines):\n\n1. Right to know grounds of arrest (Article 22)\n2. Right to consult and be defended by a lawyer of your choice\n3. Right to be produced before nearest Magistrate within 24 hours\n4. Right to inform a relative or friend about arrest\n5. Right to REMAIN SILENT — cannot be forced to confess\n6. Right against self-incrimination (Article 20)\n7. Right to bail in bailable offences\n8. Right to free legal aid if you cannot afford a lawyer\n9. Women: Cannot be arrested after sunset without female officer\n10. Police must prepare arrest memo; give you a copy\n\nIf rights are violated: File complaint with SP, District Magistrate, or file Habeas Corpus petition in High Court.",
                FAQ.LegalCategory.CRIMINAL_LAW,
                Arrays.asList("arrest", "rights", "police", "custody", "24 hours"),
                Arrays.asList("Article 20, 21, 22 Constitution", "D.K. Basu v. State of West Bengal (1997 SC)", "Section 50, 57 CrPC")),

            faq("How do I file an FIR and what if police refuse?",
                "You can file FIR at any police station (Zero FIR). It is free. If police refuse, send written complaint to SP by Registered Post, or file complaint before Magistrate under Section 156(3) CrPC.",
                "Filing an FIR:\n\n• Any person knowing about a cognizable offence can file\n• File at ANY police station — Zero FIR allows any station to register, then transfer\n• Cost: FREE — police cannot demand money\n• Get a FREE copy of FIR — your legal right\n\nIf Police Refuse:\n1. Send written complaint by Registered Post to Superintendent of Police (SP)\n2. File complaint before Judicial Magistrate (Section 156(3) CrPC) — Magistrate can direct FIR\n3. File Writ of Mandamus in High Court\n\nSupreme Court mandate (Lalita Kumari, 2013): Police MUST register FIR for cognizable offences. No preliminary enquiry before registration.",
                FAQ.LegalCategory.CRIMINAL_LAW,
                Arrays.asList("FIR", "police", "Zero FIR", "cognizable", "Section 156"),
                Arrays.asList("Section 154, 155, 156 CrPC", "Lalita Kumari v. Govt of UP (SC 2013)")),

            faq("What is anticipatory bail (Section 438 CrPC)?",
                "Anticipatory bail is pre-arrest bail granted when a person fears arrest in a non-bailable offence. Apply to Sessions Court or High Court before arrest.",
                "Anticipatory Bail — Section 438 CrPC:\n\nWhat it is: Bail obtained BEFORE arrest, for non-bailable offences\n\nWho can apply: Any person who reasonably believes they may be arrested\n\nWhere to apply: Sessions Court (first), then High Court if rejected\n\nUsual conditions imposed:\n• Be available for interrogation\n• Not leave India without permission\n• Surrender passport\n• Not tamper with evidence or witnesses\n\nKey cases:\n• Siddharam Satlingappa (SC 2011): Bail should be norm, jail exception\n• Arnesh Kumar (SC 2014): Police cannot arrest mechanically in matrimonial cases\n\nAnticipatory bail continues until trial court direction — no fixed expiry.",
                FAQ.LegalCategory.BAIL,
                Arrays.asList("anticipatory bail", "Section 438", "bail", "arrest"),
                Arrays.asList("Section 438 CrPC", "Siddharam Satlingappa v. State of Maharashtra (SC 2011)")),

            faq("What is Section 498A IPC (cruelty to wife)?",
                "Section 498A IPC punishes cruelty to wife by husband and in-laws. It is cognizable, non-bailable, and non-compoundable. Punishment: up to 3 years + fine. Supreme Court has issued guidelines to prevent misuse.",
                "Section 498A IPC — Cruelty by Husband/Relatives:\n\nCovers:\n• Physical and mental cruelty to wife\n• Harassment for dowry demands\n• Acts driving woman to suicide or causing grievous injury\n\nPunishment: Up to 3 years imprisonment + fine\nNature: Cognizable, Non-bailable, Non-compoundable\n\nSupreme Court guidelines (Arnesh Kumar 2014):\n• Police CANNOT arrest all named persons automatically\n• Must follow checklist before arresting\n• Magistrate must apply mind before extending remand\n\nIf falsely accused:\n• Immediately apply for anticipatory bail\n• Collect evidence of normal family relations\n• File complaint against false case under Section 182/211 IPC after acquittal",
                FAQ.LegalCategory.CRIMINAL_LAW,
                Arrays.asList("Section 498A", "cruelty", "dowry", "IPC"),
                Arrays.asList("Section 498A IPC", "Arnesh Kumar v. State of Bihar (SC 2014)")),

            // PROPERTY LAW
            faq("What documents should I check before buying property?",
                "Check Sale Deed, Encumbrance Certificate, Property Tax receipts, Khata, Building plan approvals, RERA registration, and verify title chain going back 30 years.",
                "Essential Due Diligence Before Buying Property:\n\n1. Title Documents:\n   • Sale Deed / Mother Deed (30-year chain)\n   • Gift Deed, Will, Partition Deed if applicable\n\n2. Encumbrance Certificate (EC) from Sub-Registrar:\n   • Shows all mortgages/transactions — must be NIL or cleared\n\n3. Property Tax receipts — must be paid and current\n\n4. Khata Certificate & Extract (especially Bangalore, Hyderabad)\n\n5. Building Plan Approvals:\n   • Municipal/BDA approved plan\n   • Occupancy Certificate (OC) for completed buildings\n\n6. RERA Registration (mandatory for projects >500 sq m or 8+ units)\n\n7. Agricultural land: Check NA (Non-Agricultural) conversion certificate\n\n8. NOCs from society, electricity board, water board\n\nAlways hire a property lawyer for due diligence!",
                FAQ.LegalCategory.PROPERTY_LAW,
                Arrays.asList("property", "purchase", "encumbrance", "title", "sale deed", "RERA"),
                Arrays.asList("Transfer of Property Act, 1882", "Registration Act, 1908", "RERA Act, 2016")),

            faq("What is RERA and what are my rights as a homebuyer?",
                "RERA (2016) protects homebuyers. Builders must register projects, sell on carpet area, deliver on time, and fix defects for 5 years. File complaints on state RERA portal.",
                "Real Estate (Regulation and Development) Act, 2016:\n\nKey protections:\n1. Mandatory project registration — check RERA number before booking\n2. Sale only on CARPET area (not super built-up area)\n3. Delayed delivery: Builder pays interest (SBI MCLR+2%) for each day of delay\n4. Structural defect liability for 5 years after possession\n5. Builder cannot take >10% advance without RERA registration\n6. No changes to approved plan without buyer consent\n\nIf builder defaults:\n1. File complaint on state RERA portal (e.g., maharera.mahaonline.gov.in)\n2. RERA must adjudicate within 60 days\n3. Appeal to RERA Appellate Tribunal → High Court\n\nOptions:\n• Seek refund + interest for undue delay\n• Seek possession with compensation\n• Seek penalty up to 10% of project cost",
                FAQ.LegalCategory.PROPERTY_LAW,
                Arrays.asList("RERA", "homebuyer", "builder", "real estate", "delay"),
                Arrays.asList("Real Estate (Regulation and Development) Act, 2016")),

            faq("What is stamp duty and who pays it for property?",
                "Stamp duty (2-8% of property value, varies by state) is paid by the buyer. Registration charges (1-2%) also paid by buyer. Unregistered sale deeds are inadmissible in court.",
                "Stamp Duty & Property Registration:\n\nStamp Duty Rates (approx.):\n• Maharashtra: 5-6%\n• Delhi: 4-6% (women: 4%)\n• Karnataka: 5.6%\n• UP: 7%\n• Tamil Nadu: 7%\n• Women buyers get 0.5-2% concession in many states\n\nRegistration Charges: 1% of value (capped in most states)\n\nRegistration Process:\n1. Pay stamp duty via e-stamping online\n2. Book slot at Sub-Registrar office\n3. Buyer + seller + 2 witnesses with Aadhaar/PAN\n4. Biometric verification → document registered\n\nCircle Rate: Minimum value for stamp duty; even if sale price is lower, duty is on circle rate.\n\nUnregistered Sale Deed: NOT admissible as evidence in court — always register!",
                FAQ.LegalCategory.PROPERTY_LAW,
                Arrays.asList("stamp duty", "registration", "property"),
                Arrays.asList("Indian Stamp Act, 1899", "Registration Act, 1908")),

            // CONSUMER LAW
            faq("How do I file a consumer complaint in India?",
                "File at District Consumer Commission (up to Rs 1 crore). File online at edaakhil.nic.in. No court fees up to Rs 5 lakh. Limitation: 2 years. Response in 90-150 days typically.",
                "Consumer Protection Act, 2019:\n\nWho is a consumer:\n• Buys goods/services for personal use (not commercial resale)\n\nForum selection (by claim amount including compensation):\n• District Consumer Commission: up to Rs 1 crore\n• State Commission: Rs 1-10 crore\n• National Commission (NCDRC): above Rs 10 crore\n\nLimitation: 2 years from cause of action\n\nOnline filing: edaakhil.nic.in — no lawyer needed\n\nDocuments needed:\n• Purchase receipt/invoice\n• Warranty card\n• Communications with company\n• Proof of defect\n\nRelief available:\n• Refund / Replacement\n• Compensation for losses and mental agony\n• Punitive damages in serious cases\n\nConsumer Helpline: 1800-11-4000 (FREE)",
                FAQ.LegalCategory.CONSUMER_LAW,
                Arrays.asList("consumer complaint", "consumer court", "defective", "e-Daakhil"),
                Arrays.asList("Consumer Protection Act, 2019", "Section 34, 47, 58 CPA 2019")),

            faq("Can I get a refund for a defective product bought online?",
                "Yes. E-commerce platforms must honour return/refund policies. For defective products you can claim refund under Consumer Protection Act 2019. Call 1800-11-4000 or file on edaakhil.nic.in.",
                "Consumer Rights for Online Purchases:\n\nUnder Consumer Protection (E-Commerce) Rules, 2020:\n• Platforms must display seller details and return/refund policy clearly\n• Product must match the description shown online\n• Platforms must process refunds within the stated period\n\nSteps if defective product received:\n1. Contact seller/platform in writing (email) within return window\n2. If no resolution in 15-30 days, file on:\n   • National Consumer Helpline: 1800-11-4000\n   • consumerhelpline.gov.in\n   • edaakhil.nic.in (consumer court)\n\nKey rules:\n• Marketplace AND platform can both be made a party\n• False reviews and fake ratings = unfair trade practice\n• Auto-renewal without notice = unfair trade practice",
                FAQ.LegalCategory.CONSUMER_LAW,
                Arrays.asList("online shopping", "refund", "e-commerce", "defective"),
                Arrays.asList("Consumer Protection Act, 2019", "E-Commerce Rules, 2020")),

            // LABOUR LAW
            faq("What is EPF (Employee Provident Fund) and how does it work?",
                "EPF requires both employer and employee to contribute 12% of basic salary each. The corpus with ~8.1% interest is payable at retirement, resignation after 2 months unemployment, or specific needs like marriage/home.",
                "Employee Provident Fund — EPF & MP Act, 1952:\n\nApplicability: Establishments with 20+ employees\n\nContribution:\n• Employee: 12% of (Basic + DA)\n• Employer: 12% (8.33% → EPS pension, 3.67% → EPF)\n\nInterest: ~8.1% p.a. (tax-free on maturity if >5 years service)\n\nWithdrawal:\n• Full: Retirement at 58 or 2 months of unemployment\n• Partial: Marriage, education, medical treatment, home purchase\n\nUAN (Universal Account Number):\n• Links all PF accounts — never changes across jobs\n• Use for online transfer, withdrawal, balance check\n\nIf employer not depositing PF:\n• File complaint on epfindia.gov.in\n• Employer penalized heavily for non-deposit\n\nHelpline: 1800-118-005",
                FAQ.LegalCategory.LABOUR_LAW,
                Arrays.asList("PF", "EPF", "provident fund", "employee", "retirement"),
                Arrays.asList("Employees' Provident Funds and Misc. Provisions Act, 1952")),

            faq("Am I entitled to gratuity and when can I claim it?",
                "Gratuity is payable after 5 years of continuous service (except death/disability). Formula: Last salary × 15/26 × years. Maximum Rs 20 lakh. Tax-free.",
                "Gratuity — Payment of Gratuity Act, 1972:\n\nEligibility: Minimum 5 years continuous service\nException: Death or total disablement → payable even before 5 years\n\nCoverage: Factories, shops/establishments with 10+ employees\n\nFormula:\n• (Last drawn Basic + DA) × 15/26 × completed years\n• Example: Rs 50,000 salary × 15/26 × 10 years = Rs 2,88,461\n\nMaximum: Rs 20 lakh (tax-free)\nDeadline to pay: Within 30 days of claim\n\nIf employer refuses:\n• File with Controlling Authority (Asst Labour Commissioner)\n• 10% interest p.a. for delayed payment\n\nNote: Gratuity can only be forfeited for dismissal due to violence or moral turpitude.",
                FAQ.LegalCategory.LABOUR_LAW,
                Arrays.asList("gratuity", "service", "employer", "5 years"),
                Arrays.asList("Payment of Gratuity Act, 1972")),

            faq("Can my employer terminate me without notice?",
                "No. Employees are entitled to notice period per appointment letter. Establishments with 100+ workers need government permission to retrench. Wrongful termination can be challenged in Labour Court.",
                "Termination Rights:\n\n• Notice period as per appointment letter (typically 30-90 days)\n• If no notice given: 'Notice pay in lieu'\n• Probationers: shorter notice, easier termination\n\nIndustrial Disputes Act, 1947:\n• 100+ workers: Need prior government approval to retrench (Chapter VB)\n• Mandatory 3 months notice for retrenchment\n• Retrenchment compensation: 15 days wages per year of service\n\nGrounds to challenge wrongful termination:\n• No due process / no hearing given (natural justice)\n• Termination for union activity\n• Discriminatory termination\n\nRemedies:\n• Labour Commissioner complaint\n• Labour Court / Industrial Tribunal\n• Relief: Reinstatement + back wages, or compensation",
                FAQ.LegalCategory.LABOUR_LAW,
                Arrays.asList("termination", "retrenchment", "notice period", "Industrial Disputes Act"),
                Arrays.asList("Industrial Disputes Act, 1947 - Section 25F, 25G")),

            // RTI
            faq("What is RTI and how do I file an RTI application?",
                "RTI Act 2005 lets any citizen seek information from government bodies. File at Rs 10 fee to the PIO. Response in 30 days (48 hours for life/liberty). First appeal free. File online at rtionline.gov.in.",
                "Right to Information Act, 2005:\n\nWho can file: Any citizen of India\nWhere: With Public Information Officer (PIO) of concerned department\nOnline: rtionline.gov.in (Central Govt) or respective state RTI portals\n\nFee:\n• Rs 10 application fee (FREE for BPL cardholders)\n• Rs 2/page for photocopies\n\nResponse time:\n• General: 30 days\n• Life / liberty matters: 48 hours\n\nIf no reply:\n1. First Appeal to First Appellate Authority within 30 days\n2. Second Appeal to Central/State Information Commissioner within 90 days\n3. PIO penalized Rs 250/day (up to Rs 25,000) for delay\n\nExemptions: Cabinet papers, security matters, personal info, trade secrets\n\nTip: Be specific — ask for documents, not opinions.",
                FAQ.LegalCategory.RTI,
                Arrays.asList("RTI", "government", "information", "PIO", "transparency"),
                Arrays.asList("Right to Information Act, 2005 - Section 6, 7, 19")),

            // BANKING / CHEQUE BOUNCE
            faq("What happens if a cheque bounces and what legal action can I take?",
                "Cheque bounce under Section 138 NI Act is criminal. Send legal notice within 30 days of bounce memo. If drawer doesn't pay within 15 days of notice, file criminal complaint within the next 30 days.",
                "Cheque Bounce — Section 138 NI Act:\n\nTimeline (strict):\n1. Get 'Cheque Return Memo' from bank\n2. Send legal notice by Registered Post within 30 days of memo\n3. Drawer has 15 days to make payment after receiving notice\n4. If not paid: File criminal complaint within 30 days of notice expiry\n\nWhere to file: Metropolitan/Judicial Magistrate (1st class)\n\nPunishment: Up to 2 years imprisonment OR fine up to twice cheque amount\n\nNote: This is also a compoundable offence — parties can settle at any stage.\n\nAlso file: Civil suit for money recovery (separately, for getting the actual money)\n\nDO NOT miss the timeline — courts are very strict about the 30+15+30 days.",
                FAQ.LegalCategory.CHEQUE_BOUNCE,
                Arrays.asList("cheque bounce", "Section 138", "NI Act", "legal notice"),
                Arrays.asList("Section 138, 141, 142 Negotiable Instruments Act, 1881")),

            faq("What to do if bank recovery agents harass you?",
                "RBI guidelines ban harassment by recovery agents. File complaint with bank, RBI Ombudsman, police (Section 506 IPC for threats). Banks cannot seize assets without 60-day SARFAESI notice.",
                "Protection Against Recovery Agent Harassment:\n\nRBI Rules:\n• Agents cannot contact before 8 AM or after 7 PM\n• Cannot use intimidation, violence, or abusive language\n• Must identify themselves and their bank\n• Cannot seize asset without due process\n\nSteps if harassed:\n1. Record the conversation/incident\n2. Write complaint to bank's Nodal Officer\n3. Escalate to Banking Ombudsman: cms.rbi.org.in (FREE)\n4. File FIR under Section 506 IPC (criminal intimidation)\n5. File consumer complaint for deficiency of service\n\nFor secured loans:\n• Bank must give 60-day notice under SARFAESI Act before possession\n• You can challenge seizure before DRT (Debt Recovery Tribunal)\n\nRBI Helpline: 14448",
                FAQ.LegalCategory.BANKING_LAW,
                Arrays.asList("loan recovery", "bank harassment", "RBI", "recovery agent"),
                Arrays.asList("RBI Guidelines on Recovery Agents", "SARFAESI Act, 2002")),

            // CYBER LAW
            faq("What to do if I am a victim of online fraud in India?",
                "Call 1930 immediately to freeze the transaction. File on cybercrime.gov.in and at local police. Inform your bank right away. Speed is critical — money can be recovered if reported within hours.",
                "Online Fraud — Immediate Steps:\n\nWithin hours (CRITICAL):\n1. Call 1930 (National Cybercrime Helpline) — can freeze fraudulent transfers\n2. Call your bank — block cards, freeze account\n3. Change all passwords\n\nComplaint filing:\n4. File online at cybercrime.gov.in\n5. Visit Cybercrime Police Station or local station\n6. Mention transaction IDs, fraudster details, screenshots\n\nRelevant laws:\n• Online financial fraud: Section 66D IT Act + Section 420 IPC\n• Identity theft: Section 66C IT Act\n• Phishing: Section 66D IT Act\n• Cyberstalking: Section 354D IPC\n\nNote: NPCI can freeze destination accounts if reported quickly — higher recovery chance within 24-48 hours.",
                FAQ.LegalCategory.CYBER_LAW,
                Arrays.asList("cyber fraud", "online fraud", "1930", "cybercrime"),
                Arrays.asList("IT Act, 2000 - Section 66, 66C, 66D", "Section 420 IPC")),

            // COURT PROCEDURE
            faq("What are the limitation periods for filing cases in court?",
                "Limitation periods: Money recovery 3 years, property 12 years, consumer complaints 2 years, cheque bounce has strict 30+15+30 day timeline, motor accidents 6 months for MACT.",
                "Key Limitation Periods — Limitation Act, 1963:\n\nCivil Suits:\n• Money recovery: 3 years from when due\n• Property recovery: 12 years\n• Specific performance: 3 years\n• Injunction: 3 years\n\nCriminal (Section 468 CrPC):\n• Punishment up to 1 year → 1 year limitation\n• 1-3 years punishment → 3 years limitation\n• 3+ years punishment → no limitation\n\nSpecial:\n• Consumer complaint: 2 years\n• Section 138 NI Act (cheque bounce): Strict 30+15+30 days\n• MACT (motor accident): 6 months from accident\n• Labour Court: 3 years generally\n\nCondonation of Delay:\n• Courts can condone delay if 'sufficient cause' is shown\n• File condonation application with main petition + reasons for delay",
                FAQ.LegalCategory.LIMITATION,
                Arrays.asList("limitation", "time limit", "filing deadline"),
                Arrays.asList("Limitation Act, 1963", "Section 468 CrPC")),

            faq("What is Lok Adalat and what types of cases can be settled there?",
                "Lok Adalat is an ADR forum where cases are settled by mutual agreement. Awards are final with no appeal. No court fees. Motor accidents, cheque bounce, matrimonial (non-divorce), labour, and utility service disputes are covered.",
                "Lok Adalat — People's Court:\n\nLegal basis: Legal Services Authorities Act, 1987\n\nTypes:\n1. Regular Lok Adalats — monthly at district/taluka level\n2. National Lok Adalat — pan-India on fixed dates\n3. Permanent Lok Adalat — for public utility services\n\nSuitable cases:\n• Motor accident claims (most common)\n• Cheque bounce (Section 138) cases\n• Matrimonial disputes (except divorce)\n• Labour and service disputes\n• Electricity/telephone billing disputes\n• Pending bank recovery cases\n\nBenefits:\n• FREE — no court fees\n• Fees already paid → refunded\n• Award is FINAL — no appeal possible\n• Quick resolution (often same day)\n\nContact your District Legal Services Authority (DLSA) to participate.",
                FAQ.LegalCategory.COURT_PROCEDURE,
                Arrays.asList("Lok Adalat", "settlement", "ADR", "DLSA"),
                Arrays.asList("Legal Services Authorities Act, 1987 - Section 19-22")),

            // MOTOR VEHICLES
            faq("What should I do immediately after a road accident?",
                "Do NOT flee — hit and run is a serious crime. Call 108 (ambulance) and 112 (police). Take photos, get FIR and MLC copies. File MACT claim within 6 months for compensation.",
                "Road Accident Protocol:\n\nImmediate steps:\n1. Call 108 (ambulance) and 112 (police)\n2. Do NOT leave the scene — hit and run: 6 months to 1 year imprisonment (Section 161 MV Act)\n3. Move vehicle only after photos if blocking traffic\n4. Note other vehicle number, driver details, insurance\n5. Take photos of scene, damages, injuries\n\nLegal steps:\n6. Get FIR copy from police station\n7. Get Medico-Legal Certificate (MLC) from hospital\n8. Inform your insurance company within 24-48 hours\n9. File MACT claim within 6 months\n\nFor hit-and-run victims:\n• Solatium Fund: Rs 50,000 for death, Rs 25,000 for grievous injury\n• Contact Claims Inquiry Officer in your district\n\nGood Samaritan law: You are protected legally if you help accident victims. You cannot be detained.",
                FAQ.LegalCategory.MOTOR_VEHICLES,
                Arrays.asList("road accident", "MACT", "compensation", "FIR", "insurance"),
                Arrays.asList("Motor Vehicles Act, 2019 - Section 140, 161, 163-A, 166")),

            // TENANCY
            faq("What are my rights as a tenant? Can a landlord evict me forcibly?",
                "Landlords CANNOT evict tenants forcibly. Only a court order allows eviction. Cutting electricity/water to force out a tenant is illegal. Call police for illegal eviction attempt.",
                "Tenant Rights in India:\n\nKey protections:\n1. Cannot be evicted without court order\n2. Cannot be evicted by cutting electricity/water — this is illegal\n3. Right to 30-60 days written notice for lawful eviction\n4. Right to receipt for every rent payment\n5. Right to peaceful enjoyment of rented premises\n\nLawful grounds for eviction:\n• Non-payment of rent\n• Subletting without permission\n• Property needed for landlord's personal use\n• Creating nuisance / causing damage\n\nState Rent Control Acts provide strong protection in older buildings:\n• Delhi: Delhi Rent Control Act, 1958\n• Maharashtra: Maharashtra Rent Control Act, 1999\n\nIf landlord illegally evicts you:\n1. Call police (Section 451 IPC — criminal trespass)\n2. Approach Rent Controller in district\n3. File civil suit for injunction\n\nImportant: Always register rent agreement if period exceeds 11 months.",
                FAQ.LegalCategory.TENANCY,
                Arrays.asList("tenant", "landlord", "eviction", "rent"),
                Arrays.asList("Transfer of Property Act, 1882 - Section 106", "State Rent Control Acts", "Model Tenancy Act, 2021"))
        );

        faqRepository.saveAll(faqs);
        System.out.println("✅ Seeded " + faqs.size() + " FAQs successfully");
    }

    // ─── Court data ───────────────────────────────────────────────────────────

    private void seedCourts() {
        List<Court> courts = Arrays.asList(
            buildCourt("Supreme Court of India", Court.CourtType.SUPREME_COURT, Court.CourtLevel.APEX,
                "Tilak Marg, New Delhi", "New Delhi", "New Delhi", "Delhi", "110001",
                true, true, "+91-11-23388922", "supremecourt@nic.in"),
            buildCourt("Delhi High Court", Court.CourtType.HIGH_COURT, Court.CourtLevel.STATE,
                "Sher Shah Road, New Delhi", "New Delhi", "New Delhi", "Delhi", "110003",
                true, true, "+91-11-23381610", null),
            buildCourt("Bombay High Court", Court.CourtType.HIGH_COURT, Court.CourtLevel.STATE,
                "Fort Area, Mumbai", "Mumbai", "Mumbai City", "Maharashtra", "400032",
                true, true, "+91-22-22671414", null),
            buildCourt("Madras High Court", Court.CourtType.HIGH_COURT, Court.CourtLevel.STATE,
                "High Court Road, Chennai", "Chennai", "Chennai", "Tamil Nadu", "600104",
                true, false, "+91-44-25305000", null),
            buildCourt("Calcutta High Court", Court.CourtType.HIGH_COURT, Court.CourtLevel.STATE,
                "1, Esplanade Row West, Kolkata", "Kolkata", "Kolkata", "West Bengal", "700001",
                false, false, "+91-33-22371155", null),
            buildCourt("Karnataka High Court", Court.CourtType.HIGH_COURT, Court.CourtLevel.STATE,
                "High Court Building, Bengaluru", "Bengaluru", "Bengaluru Urban", "Karnataka", "560001",
                true, true, "+91-80-22867700", null),
            buildCourt("Allahabad High Court", Court.CourtType.HIGH_COURT, Court.CourtLevel.STATE,
                "High Court Premises, Prayagraj", "Prayagraj", "Prayagraj", "Uttar Pradesh", "211001",
                false, false, "+91-532-2644720", null),
            buildCourt("Saket District Court, New Delhi", Court.CourtType.DISTRICT_COURT, Court.CourtLevel.DISTRICT,
                "Sector 6, Pocket 3, Saket, New Delhi", "New Delhi", "South Delhi", "Delhi", "110017",
                true, false, null, null),
            buildCourt("Tis Hazari District Court, New Delhi", Court.CourtType.DISTRICT_COURT, Court.CourtLevel.DISTRICT,
                "Tis Hazari, New Delhi", "New Delhi", "North Delhi", "Delhi", "110054",
                true, false, null, null),
            buildCourt("Karkardooma District Court", Court.CourtType.DISTRICT_COURT, Court.CourtLevel.DISTRICT,
                "Karkardooma, Delhi", "New Delhi", "East Delhi", "Delhi", "110032",
                true, false, null, null),
            buildCourt("Dwarka District Court", Court.CourtType.DISTRICT_COURT, Court.CourtLevel.DISTRICT,
                "Sector 10, Dwarka, New Delhi", "New Delhi", "South-West Delhi", "Delhi", "110075",
                true, false, null, null),
            buildCourt("City Civil Court Mumbai", Court.CourtType.DISTRICT_COURT, Court.CourtLevel.DISTRICT,
                "Fort Area, Mumbai", "Mumbai", "Mumbai City", "Maharashtra", "400032",
                false, false, "+91-22-22626461", null),
            buildCourt("Pune District Court", Court.CourtType.DISTRICT_COURT, Court.CourtLevel.DISTRICT,
                "Shivajinagar, Pune", "Pune", "Pune", "Maharashtra", "411005",
                false, false, "+91-20-25532025", null),
            buildCourt("Bangalore City Civil Court", Court.CourtType.DISTRICT_COURT, Court.CourtLevel.DISTRICT,
                "City Civil Court Complex, Bengaluru", "Bengaluru", "Bengaluru Urban", "Karnataka", "560009",
                true, false, null, null),
            buildCourt("National Consumer Disputes Redressal Commission", Court.CourtType.CONSUMER_FORUM, Court.CourtLevel.APEX,
                "Upbhokta Nyaya Bhawan, F Block, GPO Complex, INA, New Delhi", "New Delhi", "New Delhi", "Delhi", "110023",
                true, false, "+91-11-24608801", "ncdrc-dla@nic.in")
        );
        courtRepository.saveAll(courts);
        System.out.println("✅ Seeded " + courts.size() + " courts successfully");
    }

    private Court buildCourt(String name, Court.CourtType type, Court.CourtLevel level,
                              String address, String city, String district, String state,
                              String pincode, boolean eFiling, boolean videoConf,
                              String phone, String email) {
        Court c = new Court();
        c.setName(name);
        c.setType(type);
        c.setLevel(level);
        c.setAddress(address);
        c.setCity(city);
        c.setDistrict(district);
        c.setState(state);
        c.setPincode(pincode);
        c.setHasVideoConferencing(videoConf);
        c.setPhone(phone);
        c.setEmail(email);
        return c;
    }
}
