package com.nyayamitra.model;

import org.springframework.data.annotation.Id;
import java.util.Date;
import java.util.Map;

@org.springframework.data.mongodb.core.mapping.Document(collection = "documents")
public class Document {

    @Id
    private String id;

    private String userId;

    private String userName;

    private String title;

    private DocumentType type;

    private DocumentCategory category;

    private String subType;

    private Map<String, Object> formData;

    private String content;

    private String filePath;

    private DocumentStatus status;

    private Double courtFee;

    private Double stampDuty;

    private String courtName;

    private String state;

    private Date createdAt;

    private Date updatedAt;

    private Date downloadedAt;

    private Integer version;

    private String templateId;

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

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public DocumentType getType() {
        return type;
    }

    public void setType(DocumentType type) {
        this.type = type;
    }

    public DocumentCategory getCategory() {
        return category;
    }

    public void setCategory(DocumentCategory category) {
        this.category = category;
    }

    public String getSubType() {
        return subType;
    }

    public void setSubType(String subType) {
        this.subType = subType;
    }

    public Map<String, Object> getFormData() {
        return formData;
    }

    public void setFormData(Map<String, Object> formData) {
        this.formData = formData;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public DocumentStatus getStatus() {
        return status;
    }

    public void setStatus(DocumentStatus status) {
        this.status = status;
    }

    public Double getCourtFee() {
        return courtFee;
    }

    public void setCourtFee(Double courtFee) {
        this.courtFee = courtFee;
    }

    public Double getStampDuty() {
        return stampDuty;
    }

    public void setStampDuty(Double stampDuty) {
        this.stampDuty = stampDuty;
    }

    public String getCourtName() {
        return courtName;
    }

    public void setCourtName(String courtName) {
        this.courtName = courtName;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
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

    public Date getDownloadedAt() {
        return downloadedAt;
    }

    public void setDownloadedAt(Date downloadedAt) {
        this.downloadedAt = downloadedAt;
    }

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    public String getTemplateId() {
        return templateId;
    }

    public void setTemplateId(String templateId) {
        this.templateId = templateId;
    }

    public enum DocumentType {
        AFFIDAVIT,
        LEGAL_NOTICE,
        PETITION,
        AGREEMENT,
        APPLICATION,
        COMPLAINT,
        DEED,
        CONTRACT,
        OTHER
    }

    public enum DocumentCategory {
        CIVIL,
        CRIMINAL,
        FAMILY,
        CONSUMER,
        PROPERTY,
        LABOUR,
        CORPORATE,
        RTI,
        MOTOR_ACCIDENT,
        BANKING,
        CYBER,
        TAX
    }

    public enum DocumentStatus {
        DRAFT,
        GENERATED,
        DOWNLOADED,
        FILED,
        ARCHIVED
    }
}
