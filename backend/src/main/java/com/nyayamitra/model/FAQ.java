package com.nyayamitra.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;
import java.util.List;

@Document(collection = "faqs")
public class FAQ {

    @Id
    private String id;

    private String question;

    private String answer;

    private String shortAnswer;

    private LegalCategory category;

    private List<String> tags;

    private List<String> relatedQuestions;

    private List<String> legalReferences;

    private Integer viewCount;

    private Integer helpfulCount;

    private Integer notHelpfulCount;

    private Boolean isVerified;

    private String verifiedBy;

    private Date verifiedAt;

    private Date createdAt;

    private Date updatedAt;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getShortAnswer() {
        return shortAnswer;
    }

    public void setShortAnswer(String shortAnswer) {
        this.shortAnswer = shortAnswer;
    }

    public LegalCategory getCategory() {
        return category;
    }

    public void setCategory(LegalCategory category) {
        this.category = category;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public List<String> getRelatedQuestions() {
        return relatedQuestions;
    }

    public void setRelatedQuestions(List<String> relatedQuestions) {
        this.relatedQuestions = relatedQuestions;
    }

    public List<String> getLegalReferences() {
        return legalReferences;
    }

    public void setLegalReferences(List<String> legalReferences) {
        this.legalReferences = legalReferences;
    }

    public Integer getViewCount() {
        return viewCount;
    }

    public void setViewCount(Integer viewCount) {
        this.viewCount = viewCount;
    }

    public Integer getHelpfulCount() {
        return helpfulCount;
    }

    public void setHelpfulCount(Integer helpfulCount) {
        this.helpfulCount = helpfulCount;
    }

    public Integer getNotHelpfulCount() {
        return notHelpfulCount;
    }

    public void setNotHelpfulCount(Integer notHelpfulCount) {
        this.notHelpfulCount = notHelpfulCount;
    }

    public Boolean getIsVerified() {
        return isVerified;
    }

    public void setIsVerified(Boolean isVerified) {
        this.isVerified = isVerified;
    }

    public String getVerifiedBy() {
        return verifiedBy;
    }

    public void setVerifiedBy(String verifiedBy) {
        this.verifiedBy = verifiedBy;
    }

    public Date getVerifiedAt() {
        return verifiedAt;
    }

    public void setVerifiedAt(Date verifiedAt) {
        this.verifiedAt = verifiedAt;
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

    public enum LegalCategory {
        FAMILY_LAW,
        CRIMINAL_LAW,
        CIVIL_LAW,
        PROPERTY_LAW,
        CONSUMER_LAW,
        LABOUR_LAW,
        CORPORATE_LAW,
        BANKING_LAW,
        MOTOR_VEHICLES,
        CYBER_LAW,
        RTI,
        LEGAL_AID,
        COURT_PROCEDURE,
        DOCUMENTATION,
        LIMITATION,
        APPEAL_REVIEW,
        BAIL,
        DIVORCE,
        MAINTENANCE,
        CUSTODY,
        INHERITANCE,
        TENANCY,
        CHEQUE_BOUNCE,
        DOMESTIC_VIOLENCE,
        OTHER
    }
}
