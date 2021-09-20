package com.nyayamitra.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;
import java.util.List;

@Document(collection = "cases")
public class Case {

    @Id
    private String id;

    private String userId;

    private String caseNumber;

    private String caseTitle;

    private String caseDescription;

    private CaseType type;

    private CaseCategory category;

    private String courtName;

    private String courtType;

    private String state;

    private String district;

    private String opposingParty;

    private String lawyerId;

    private String lawyerName;

    private CaseStatus status;

    private Date filingDate;

    private Date nextHearingDate;

    private String nextHearingPurpose;

    private List<Hearing> hearingHistory;

    private List<String> documents;

    private String policeStation;

    private String firNumber;

    private Date incidentDate;

    private Double claimAmount;

    private String judgment;

    private Date judgmentDate;

    private Date createdAt;

    private Date updatedAt;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getCaseNumber() {
        return caseNumber;
    }

    public void setCaseNumber(String caseNumber) {
        this.caseNumber = caseNumber;
    }

    public String getCaseTitle() {
        return caseTitle;
    }

    public void setCaseTitle(String caseTitle) {
        this.caseTitle = caseTitle;
    }

    public String getCaseDescription() {
        return caseDescription;
    }

    public void setCaseDescription(String caseDescription) {
        this.caseDescription = caseDescription;
    }

    public CaseType getType() {
        return type;
    }

    public void setType(CaseType type) {
        this.type = type;
    }

    public CaseCategory getCategory() {
        return category;
    }

    public void setCategory(CaseCategory category) {
        this.category = category;
    }

    public String getCourtName() {
        return courtName;
    }

    public void setCourtName(String courtName) {
        this.courtName = courtName;
    }

    public String getCourtType() {
        return courtType;
    }

    public void setCourtType(String courtType) {
        this.courtType = courtType;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getOpposingParty() {
        return opposingParty;
    }

    public void setOpposingParty(String opposingParty) {
        this.opposingParty = opposingParty;
    }

    public String getLawyerId() {
        return lawyerId;
    }

    public void setLawyerId(String lawyerId) {
        this.lawyerId = lawyerId;
    }

    public String getLawyerName() {
        return lawyerName;
    }

    public void setLawyerName(String lawyerName) {
        this.lawyerName = lawyerName;
    }

    public CaseStatus getStatus() {
        return status;
    }

    public void setStatus(CaseStatus status) {
        this.status = status;
    }

    public Date getFilingDate() {
        return filingDate;
    }

    public void setFilingDate(Date filingDate) {
        this.filingDate = filingDate;
    }

    public Date getNextHearingDate() {
        return nextHearingDate;
    }

    public void setNextHearingDate(Date nextHearingDate) {
        this.nextHearingDate = nextHearingDate;
    }

    public String getNextHearingPurpose() {
        return nextHearingPurpose;
    }

    public void setNextHearingPurpose(String nextHearingPurpose) {
        this.nextHearingPurpose = nextHearingPurpose;
    }

    public List<Hearing> getHearingHistory() {
        return hearingHistory;
    }

    public void setHearingHistory(List<Hearing> hearingHistory) {
        this.hearingHistory = hearingHistory;
    }

    public List<String> getDocuments() {
        return documents;
    }

    public void setDocuments(List<String> documents) {
        this.documents = documents;
    }

    public String getPoliceStation() {
        return policeStation;
    }

    public void setPoliceStation(String policeStation) {
        this.policeStation = policeStation;
    }

    public String getFirNumber() {
        return firNumber;
    }

    public void setFirNumber(String firNumber) {
        this.firNumber = firNumber;
    }

    public Date getIncidentDate() {
        return incidentDate;
    }

    public void setIncidentDate(Date incidentDate) {
        this.incidentDate = incidentDate;
    }

    public Double getClaimAmount() {
        return claimAmount;
    }

    public void setClaimAmount(Double claimAmount) {
        this.claimAmount = claimAmount;
    }

    public String getJudgment() {
        return judgment;
    }

    public void setJudgment(String judgment) {
        this.judgment = judgment;
    }

    public Date getJudgmentDate() {
        return judgmentDate;
    }

    public void setJudgmentDate(Date judgmentDate) {
        this.judgmentDate = judgmentDate;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public enum CaseType {
        CIVIL,
        CRIMINAL,
        FAMILY,
        CONSUMER,
        WRIT,
        APPEAL,
        SPECIAL_LEAVE_PETITION,
        PIL,
        ARBITRATION,
        TRIBUNAL
    }

    public enum CaseCategory {
        PROPERTY_DISPUTE,
        CHEQUE_BOUNCE,
        DIVORCE,
        MAINTENANCE,
        CUSTODY,
        MURDER,
        THEFT,
        FRAUD,
        ASSAULT,
        DRUG_OFFENSE,
        CYBER_CRIME,
        CONSUMER_COMPLAINT,
        SERVICE_MATTER,
        RECOVERY,
        INJUNCTION,
        SPECIFIC_PERFORMANCE,
        PARTITION,
        EVICTION,
        MOTOR_ACCIDENT,
        LABOUR_DISPUTE,
        TAX,
        BANKING,
        INSOLVENCY,
        OTHER
    }

    public enum CaseStatus {
        PENDING,
        ADMITTED,
        IN_PROGRESS,
        JUDGMENT_RESERVED,
        DECIDED,
        APPEALED,
        SETTLED,
        WITHDRAWN,
        DISMISSED,
        ALLOWED,
        TRANSFERRED
    }

    public static class Hearing {
        private Date date;
        private String purpose;
        private String order;
        private String judge;
        private String nextDate;

        public Date getDate() {
            return date;
        }

        public void setDate(Date date) {
            this.date = date;
        }

        public String getPurpose() {
            return purpose;
        }

        public void setPurpose(String purpose) {
            this.purpose = purpose;
        }

        public String getOrder() {
            return order;
        }

        public void setOrder(String order) {
            this.order = order;
        }

        public String getJudge() {
            return judge;
        }

        public void setJudge(String judge) {
            this.judge = judge;
        }

        public String getNextDate() {
            return nextDate;
        }

        public void setNextDate(String nextDate) {
            this.nextDate = nextDate;
        }
    }
}
