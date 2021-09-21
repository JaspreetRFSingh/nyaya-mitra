package com.nyayamitra.service;

import com.nyayamitra.model.Case;
import com.nyayamitra.model.User;
import com.nyayamitra.repository.CaseRepository;
import com.nyayamitra.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class CaseService {
    
    @Autowired
    private CaseRepository caseRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public Case createCase(Map<String, Object> request, String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        Case caseObj = new Case();
        caseObj.setUserId(user.getId());
        caseObj.setCaseTitle((String) request.get("caseTitle"));
        caseObj.setCaseDescription((String) request.get("caseDescription"));
        caseObj.setType(Case.CaseType.valueOf(
            ((String) request.getOrDefault("type", "CIVIL")).toUpperCase()));
        caseObj.setCategory(Case.CaseCategory.valueOf(
            ((String) request.getOrDefault("category", "OTHER")).toUpperCase()));
        caseObj.setCourtName((String) request.get("courtName"));
        caseObj.setCourtType((String) request.get("courtType"));
        caseObj.setState((String) request.get("state"));
        caseObj.setDistrict((String) request.get("district"));
        caseObj.setOpposingParty((String) request.get("opposingParty"));
        caseObj.setStatus(Case.CaseStatus.PENDING);
        caseObj.setFilingDate(new Date());
        caseObj.setCreatedAt(new Date());
        caseObj.setUpdatedAt(new Date());
        caseObj.setHearingHistory(new ArrayList<>());
        caseObj.setDocuments(new ArrayList<>());
        
        // Optional fields
        if (request.get("caseNumber") != null) {
            caseObj.setCaseNumber((String) request.get("caseNumber"));
        }
        if (request.get("lawyerId") != null) {
            caseObj.setLawyerId((String) request.get("lawyerId"));
            User lawyer = userRepository.findById((String) request.get("lawyerId"))
                .orElse(null);
            if (lawyer != null) {
                caseObj.setLawyerName(lawyer.getFirstName() + " " + lawyer.getLastName());
            }
        }
        if (request.get("nextHearingDate") != null) {
            caseObj.setNextHearingDate(parseDate((String) request.get("nextHearingDate")));
        }
        if (request.get("nextHearingPurpose") != null) {
            caseObj.setNextHearingPurpose((String) request.get("nextHearingPurpose"));
        }
        if (request.get("firNumber") != null) {
            caseObj.setFirNumber((String) request.get("firNumber"));
        }
        if (request.get("policeStation") != null) {
            caseObj.setPoliceStation((String) request.get("policeStation"));
        }
        if (request.get("claimAmount") != null) {
            caseObj.setClaimAmount(Double.parseDouble(request.get("claimAmount").toString()));
        }
        
        return caseRepository.save(caseObj);
    }
    
    public List<Case> getCasesForUser(String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (user.getRole() == User.UserRole.LAWYER) {
            return caseRepository.findByLawyerId(user.getId());
        } else {
            return caseRepository.findByUserId(user.getId());
        }
    }
    
    public Case getCaseById(String id, String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        Case caseObj = caseRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Case not found"));
        
        if (!caseObj.getUserId().equals(user.getId()) && 
            !Objects.equals(caseObj.getLawyerId(), user.getId())) {
            throw new RuntimeException("Unauthorized access");
        }
        
        return caseObj;
    }
    
    public Case updateCase(String id, Map<String, Object> request, String email) {
        Case caseObj = getCaseById(id, email);
        
        if (request.get("caseTitle") != null) {
            caseObj.setCaseTitle((String) request.get("caseTitle"));
        }
        if (request.get("caseDescription") != null) {
            caseObj.setCaseDescription((String) request.get("caseDescription"));
        }
        if (request.get("status") != null) {
            caseObj.setStatus(Case.CaseStatus.valueOf(
                ((String) request.get("status")).toUpperCase()));
        }
        if (request.get("nextHearingDate") != null) {
            caseObj.setNextHearingDate(parseDate((String) request.get("nextHearingDate")));
        }
        if (request.get("nextHearingPurpose") != null) {
            caseObj.setNextHearingPurpose((String) request.get("nextHearingPurpose"));
        }
        if (request.get("judgment") != null) {
            caseObj.setJudgment((String) request.get("judgment"));
        }
        
        caseObj.setUpdatedAt(new Date());
        return caseRepository.save(caseObj);
    }
    
    public Case addHearing(String id, Map<String, Object> request, String email) {
        Case caseObj = getCaseById(id, email);
        
        Case.Hearing hearing = new Case.Hearing();
        hearing.setDate(parseDate((String) request.get("date")));
        hearing.setPurpose((String) request.get("purpose"));
        hearing.setOrder((String) request.get("order"));
        hearing.setJudge((String) request.get("judge"));
        
        if (caseObj.getHearingHistory() == null) {
            caseObj.setHearingHistory(new ArrayList<>());
        }
        caseObj.getHearingHistory().add(hearing);
        
        if (request.get("nextDate") != null) {
            caseObj.setNextHearingDate(parseDate((String) request.get("nextDate")));
        }
        
        caseObj.setUpdatedAt(new Date());
        return caseRepository.save(caseObj);
    }
    
    public List<Case> getUpcomingHearings(String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        Calendar calendar = Calendar.getInstance();
        Date today = calendar.getTime();
        calendar.add(Calendar.MONTH, 1);
        Date nextMonth = calendar.getTime();
        
        if (user.getRole() == User.UserRole.LAWYER) {
            return caseRepository.findByLawyerId(user.getId()).stream()
                .filter(c -> c.getNextHearingDate() != null &&
                    c.getNextHearingDate().after(today) &&
                    c.getNextHearingDate().before(nextMonth))
                .collect(java.util.stream.Collectors.toList());
        } else {
            return caseRepository.findByUserId(user.getId()).stream()
                .filter(c -> c.getNextHearingDate() != null &&
                    c.getNextHearingDate().after(today) &&
                    c.getNextHearingDate().before(nextMonth))
                .collect(java.util.stream.Collectors.toList());
        }
    }
    
    private Date parseDate(String dateStr) {
        try {
            return new java.text.SimpleDateFormat("yyyy-MM-dd").parse(dateStr);
        } catch (Exception e) {
            return new Date();
        }
    }
}
