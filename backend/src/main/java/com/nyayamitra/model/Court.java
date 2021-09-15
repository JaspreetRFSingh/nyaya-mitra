package com.nyayamitra.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "courts")
public class Court {

    @Id
    private String id;

    private String name;

    private CourtType type;

    private CourtLevel level;

    private String state;

    private String district;

    private String address;

    private String city;

    private String pincode;

    private String phone;

    private String email;

    private String website;

    private Double latitude;

    private Double longitude;

    private List<String> jurisdictions;

    private List<String> caseTypes;

    private String workingHours;

    private Boolean hasEfilming;

    private Boolean hasVideoConferencing;

    private String causeListUrl;

    private String judgmentUrl;

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

    public CourtType getType() {
        return type;
    }

    public void setType(CourtType type) {
        this.type = type;
    }

    public CourtLevel getLevel() {
        return level;
    }

    public void setLevel(CourtLevel level) {
        this.level = level;
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public List<String> getJurisdictions() {
        return jurisdictions;
    }

    public void setJurisdictions(List<String> jurisdictions) {
        this.jurisdictions = jurisdictions;
    }

    public List<String> getCaseTypes() {
        return caseTypes;
    }

    public void setCaseTypes(List<String> caseTypes) {
        this.caseTypes = caseTypes;
    }

    public String getWorkingHours() {
        return workingHours;
    }

    public void setWorkingHours(String workingHours) {
        this.workingHours = workingHours;
    }

    public Boolean getHasEfilming() {
        return hasEfilming;
    }

    public void setHasEfilming(Boolean hasEfilming) {
        this.hasEfilming = hasEfilming;
    }

    public Boolean getHasVideoConferencing() {
        return hasVideoConferencing;
    }

    public void setHasVideoConferencing(Boolean hasVideoConferencing) {
        this.hasVideoConferencing = hasVideoConferencing;
    }

    public String getCauseListUrl() {
        return causeListUrl;
    }

    public void setCauseListUrl(String causeListUrl) {
        this.causeListUrl = causeListUrl;
    }

    public String getJudgmentUrl() {
        return judgmentUrl;
    }

    public void setJudgmentUrl(String judgmentUrl) {
        this.judgmentUrl = judgmentUrl;
    }

    public enum CourtType {
        SUPREME_COURT,
        HIGH_COURT,
        DISTRICT_COURT,
        SESSIONS_COURT,
        FAMILY_COURT,
        CONSUMER_FORUM,
        LABOUR_COURT,
        TRIBUNAL,
        MAGISTRATE_COURT,
        JUDICIAL_MAGISTRATE,
        METROPOLITAN_MAGISTRATE,
        CHIEF_JUDICIAL_MAGISTRATE,
        SMALL_CAUSES_COURT,
        CYBER_COURT,
        FAST_TRACK_COURT,
        LOK_ADALAT
    }

    public enum CourtLevel {
        APEX,
        STATE,
        DISTRICT,
        SUBORDINATE
    }
}
