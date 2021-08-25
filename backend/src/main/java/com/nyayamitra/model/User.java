package com.nyayamitra.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;
import java.util.List;

@Document(collection = "users")
public class User {

    @Id
    private String id;

    @Indexed(unique = true)
    private String email;

    private String password;

    private String firstName;

    private String lastName;

    private String phone;

    private UserRole role;

    private boolean isEnabled;

    private boolean isVerified;

    private String profileImage;

    private String address;

    private String city;

    private String state;

    private String pincode;

    private Date createdAt;

    private Date updatedAt;

    private Date lastLoginAt;

    // Lawyer specific fields
    private String barCouncilNumber;

    private String barCouncilName;

    private Integer yearsOfExperience;

    private List<String> specializations;

    private String education;

    private String chamberAddress;

    private Double consultationFee;

    private Boolean isAvailableForConsultation;

    private Double rating;

    private Integer totalConsultations;

    public enum UserRole {
        CLIENT,
        LAWYER,
        ADMIN
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public UserRole getRole() { return role; }
    public void setRole(UserRole role) { this.role = role; }
    public boolean isEnabled() { return isEnabled; }
    public void setEnabled(boolean enabled) { isEnabled = enabled; }
    public boolean isVerified() { return isVerified; }
    public void setVerified(boolean verified) { isVerified = verified; }
    public String getProfileImage() { return profileImage; }
    public void setProfileImage(String profileImage) { this.profileImage = profileImage; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public String getState() { return state; }
    public void setState(String state) { this.state = state; }
    public String getPincode() { return pincode; }
    public void setPincode(String pincode) { this.pincode = pincode; }
    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }
    public Date getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Date updatedAt) { this.updatedAt = updatedAt; }
    public Date getLastLoginAt() { return lastLoginAt; }
    public void setLastLoginAt(Date lastLoginAt) { this.lastLoginAt = lastLoginAt; }
    public String getBarCouncilNumber() { return barCouncilNumber; }
    public void setBarCouncilNumber(String barCouncilNumber) { this.barCouncilNumber = barCouncilNumber; }
    public String getBarCouncilName() { return barCouncilName; }
    public void setBarCouncilName(String barCouncilName) { this.barCouncilName = barCouncilName; }
    public Integer getYearsOfExperience() { return yearsOfExperience; }
    public void setYearsOfExperience(Integer yearsOfExperience) { this.yearsOfExperience = yearsOfExperience; }
    public List<String> getSpecializations() { return specializations; }
    public void setSpecializations(List<String> specializations) { this.specializations = specializations; }
    public String getEducation() { return education; }
    public void setEducation(String education) { this.education = education; }
    public String getChamberAddress() { return chamberAddress; }
    public void setChamberAddress(String chamberAddress) { this.chamberAddress = chamberAddress; }
    public Double getConsultationFee() { return consultationFee; }
    public void setConsultationFee(Double consultationFee) { this.consultationFee = consultationFee; }
    public Boolean isAvailableForConsultation() { return isAvailableForConsultation; }
    public void setIsAvailableForConsultation(Boolean availableForConsultation) { isAvailableForConsultation = availableForConsultation; }
    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }
    public Integer getTotalConsultations() { return totalConsultations; }
    public void setTotalConsultations(Integer totalConsultations) { this.totalConsultations = totalConsultations; }
}
