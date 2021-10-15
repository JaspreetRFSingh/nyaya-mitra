package com.nyayamitra.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Document(collection = "notifications")
public class Notification {

    @Id
    private String id;

    private String userId;

    private String title;

    private String message;

    private NotificationType type;

    private String referenceId;

    private String referenceType;

    private Boolean isRead;

    private Date readAt;

    private Boolean isActionRequired;

    private String actionUrl;

    private Integer priority;

    private Date createdAt;

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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public NotificationType getType() {
        return type;
    }

    public void setType(NotificationType type) {
        this.type = type;
    }

    public String getReferenceId() {
        return referenceId;
    }

    public void setReferenceId(String referenceId) {
        this.referenceId = referenceId;
    }

    public String getReferenceType() {
        return referenceType;
    }

    public void setReferenceType(String referenceType) {
        this.referenceType = referenceType;
    }

    public Boolean getIsRead() {
        return isRead;
    }

    public void setIsRead(Boolean isRead) {
        this.isRead = isRead;
    }

    public Date getReadAt() {
        return readAt;
    }

    public void setReadAt(Date readAt) {
        this.readAt = readAt;
    }

    public Boolean getIsActionRequired() {
        return isActionRequired;
    }

    public void setIsActionRequired(Boolean isActionRequired) {
        this.isActionRequired = isActionRequired;
    }

    public String getActionUrl() {
        return actionUrl;
    }

    public void setActionUrl(String actionUrl) {
        this.actionUrl = actionUrl;
    }

    public Integer getPriority() {
        return priority;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public enum NotificationType {
        CONSULTATION_BOOKING,
        CONSULTATION_REMINDER,
        CONSULTATION_CANCELLED,
        CONSULTATION_RESCHEDULED,
        DOCUMENT_READY,
        DOCUMENT_DOWNLOADED,
        CASE_UPDATE,
        HEARING_REMINDER,
        PAYMENT_SUCCESS,
        PAYMENT_FAILED,
        MESSAGE_RECEIVED,
        REVIEW_REQUEST,
        SYSTEM,
        LEGAL_AID_UPDATE,
        LAWYER_ASSIGNMENT
    }
}
