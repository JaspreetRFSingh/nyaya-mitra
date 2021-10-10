package com.nyayamitra.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Document(collection = "legal_aid_applications")
public class LegalAidApplication {

    @Id
    private String id;

    private String applicantId;

    private String applicantName;

    private String caseType;

    private String caseDescription;

    private Double annualIncome;

    private String incomeProof;

    private String casteCategory;

    private Boolean isBplCardHolder;

    private String bplCardNumber;

    private String disabilityCertificate;

    private String gender;

    private Boolean isDomesticViolenceVictim;

    private Boolean isTraffickingVictim;

    private String supportingDocuments;

    private LegalAidStatus status;

    private String assignedLawyerId;

    private String assignedLawyerName;

    private String dlsaName;

    private String remarks;

    private Date applicationDate;

    private Date approvalDate;

    private Date rejectionDate;

    private String rejectionReason;

    private Date createdAt;

    private Date updatedAt;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getApplicantId() {
        return applicantId;
    }

    public void setApplicantId(String applicantId) {
        this.applicantId = applicantId;
    }

    public String getApplicantName() {
        return applicantName;
    }

    public void setApplicantName(String applicantName) {
        this.applicantName = applicantName;
    }

    public String getCaseType() {
        return caseType;
    }

    public void setCaseType(String caseType) {
        this.caseType = caseType;
    }

    public String getCaseDescription() {
        return caseDescription;
    }

    public void setCaseDescription(String caseDescription) {
        this.caseDescription = caseDescription;
    }

    public Double getAnnualIncome() {
        return annualIncome;
    }

    public void setAnnualIncome(Double annualIncome) {
        this.annualIncome = annualIncome;
    }

    public String getIncomeProof() {
        return incomeProof;
    }

    public void setIncomeProof(String incomeProof) {
        this.incomeProof = incomeProof;
    }

    public String getCasteCategory() {
        return casteCategory;
    }

    public void setCasteCategory(String casteCategory) {
        this.casteCategory = casteCategory;
    }

    public Boolean getIsBplCardHolder() {
        return isBplCardHolder;
    }

    public void setIsBplCardHolder(Boolean isBplCardHolder) {
        this.isBplCardHolder = isBplCardHolder;
    }

    public String getBplCardNumber() {
        return bplCardNumber;
    }

    public void setBplCardNumber(String bplCardNumber) {
        this.bplCardNumber = bplCardNumber;
    }

    public String getDisabilityCertificate() {
        return disabilityCertificate;
    }

    public void setDisabilityCertificate(String disabilityCertificate) {
        this.disabilityCertificate = disabilityCertificate;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Boolean getIsDomesticViolenceVictim() {
        return isDomesticViolenceVictim;
    }

    public void setIsDomesticViolenceVictim(Boolean isDomesticViolenceVictim) {
        this.isDomesticViolenceVictim = isDomesticViolenceVictim;
    }

    public Boolean getIsTraffickingVictim() {
        return isTraffickingVictim;
    }

    public void setIsTraffickingVictim(Boolean isTraffickingVictim) {
        this.isTraffickingVictim = isTraffickingVictim;
    }

    public String getSupportingDocuments() {
        return supportingDocuments;
    }

    public void setSupportingDocuments(String supportingDocuments) {
        this.supportingDocuments = supportingDocuments;
    }

    public LegalAidStatus getStatus() {
        return status;
    }

    public void setStatus(LegalAidStatus status) {
        this.status = status;
    }

    public String getAssignedLawyerId() {
        return assignedLawyerId;
    }

    public void setAssignedLawyerId(String assignedLawyerId) {
        this.assignedLawyerId = assignedLawyerId;
    }

    public String getAssignedLawyerName() {
        return assignedLawyerName;
    }

    public void setAssignedLawyerName(String assignedLawyerName) {
        this.assignedLawyerName = assignedLawyerName;
    }

    public String getDlsaName() {
        return dlsaName;
    }

    public void setDlsaName(String dlsaName) {
        this.dlsaName = dlsaName;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public Date getApplicationDate() {
        return applicationDate;
    }

    public void setApplicationDate(Date applicationDate) {
        this.applicationDate = applicationDate;
    }

    public Date getApprovalDate() {
        return approvalDate;
    }

    public void setApprovalDate(Date approvalDate) {
        this.approvalDate = approvalDate;
    }

    public Date getRejectionDate() {
        return rejectionDate;
    }

    public void setRejectionDate(Date rejectionDate) {
        this.rejectionDate = rejectionDate;
    }

    public String getRejectionReason() {
        return rejectionReason;
    }

    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
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

    public enum LegalAidStatus {
        DRAFT,
        SUBMITTED,
        UNDER_REVIEW,
        APPROVED,
        REJECTED,
        ASSIGNED,
        IN_PROGRESS,
        COMPLETED,
        CLOSED
    }
}
