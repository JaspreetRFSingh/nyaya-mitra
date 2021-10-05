package com.nyayamitra.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Document(collection = "document_templates")
public class DocumentTemplate {

    @Id
    private String id;

    private String name;

    private String description;

    private com.nyayamitra.model.Document.DocumentType type;

    private com.nyayamitra.model.Document.DocumentCategory category;

    private String subType;

    private String templateContent;

    private Map<String, FieldDefinition> fields;

    private List<String> requiredFields;

    private List<String> optionalFields;

    private String instructions;

    private List<String> legalReferences;

    private String state;

    private Double estimatedCourtFee;

    private Double estimatedStampDuty;

    private Integer estimatedPages;

    private Boolean isActive;

    private Integer usageCount;

    private Double averageRating;

    private String createdBy;

    private Date createdAt;

    private Date updatedAt;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public com.nyayamitra.model.Document.DocumentType getType() {
        return type;
    }

    public void setType(com.nyayamitra.model.Document.DocumentType type) {
        this.type = type;
    }

    public com.nyayamitra.model.Document.DocumentCategory getCategory() {
        return category;
    }

    public void setCategory(com.nyayamitra.model.Document.DocumentCategory category) {
        this.category = category;
    }

    public String getSubType() {
        return subType;
    }

    public void setSubType(String subType) {
        this.subType = subType;
    }

    public String getTemplateContent() {
        return templateContent;
    }

    public void setTemplateContent(String templateContent) {
        this.templateContent = templateContent;
    }

    public Map<String, FieldDefinition> getFields() {
        return fields;
    }

    public void setFields(Map<String, FieldDefinition> fields) {
        this.fields = fields;
    }

    public List<String> getRequiredFields() {
        return requiredFields;
    }

    public void setRequiredFields(List<String> requiredFields) {
        this.requiredFields = requiredFields;
    }

    public List<String> getOptionalFields() {
        return optionalFields;
    }

    public void setOptionalFields(List<String> optionalFields) {
        this.optionalFields = optionalFields;
    }

    public String getInstructions() {
        return instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    public List<String> getLegalReferences() {
        return legalReferences;
    }

    public void setLegalReferences(List<String> legalReferences) {
        this.legalReferences = legalReferences;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Double getEstimatedCourtFee() {
        return estimatedCourtFee;
    }

    public void setEstimatedCourtFee(Double estimatedCourtFee) {
        this.estimatedCourtFee = estimatedCourtFee;
    }

    public Double getEstimatedStampDuty() {
        return estimatedStampDuty;
    }

    public void setEstimatedStampDuty(Double estimatedStampDuty) {
        this.estimatedStampDuty = estimatedStampDuty;
    }

    public Integer getEstimatedPages() {
        return estimatedPages;
    }

    public void setEstimatedPages(Integer estimatedPages) {
        this.estimatedPages = estimatedPages;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public Integer getUsageCount() {
        return usageCount;
    }

    public void setUsageCount(Integer usageCount) {
        this.usageCount = usageCount;
    }

    public Double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(Double averageRating) {
        this.averageRating = averageRating;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
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

    public static class FieldDefinition {
        private String label;
        private String fieldType;
        private boolean required;
        private String placeholder;
        private String helpText;
        private List<String> options;
        private String validation;
        private String defaultValue;

        public String getLabel() {
            return label;
        }

        public void setLabel(String label) {
            this.label = label;
        }

        public String getFieldType() {
            return fieldType;
        }

        public void setFieldType(String fieldType) {
            this.fieldType = fieldType;
        }

        public boolean isRequired() {
            return required;
        }

        public void setRequired(boolean required) {
            this.required = required;
        }

        public String getPlaceholder() {
            return placeholder;
        }

        public void setPlaceholder(String placeholder) {
            this.placeholder = placeholder;
        }

        public String getHelpText() {
            return helpText;
        }

        public void setHelpText(String helpText) {
            this.helpText = helpText;
        }

        public List<String> getOptions() {
            return options;
        }

        public void setOptions(List<String> options) {
            this.options = options;
        }

        public String getValidation() {
            return validation;
        }

        public void setValidation(String validation) {
            this.validation = validation;
        }

        public String getDefaultValue() {
            return defaultValue;
        }

        public void setDefaultValue(String defaultValue) {
            this.defaultValue = defaultValue;
        }
    }
}
