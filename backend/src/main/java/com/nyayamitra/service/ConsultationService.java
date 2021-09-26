package com.nyayamitra.service;

import com.nyayamitra.model.Consultation;
import com.nyayamitra.model.User;
import com.nyayamitra.repository.ConsultationRepository;
import com.nyayamitra.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ConsultationService {
    
    @Autowired
    private ConsultationRepository consultationRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public Consultation bookConsultation(Map<String, Object> request, String clientEmail) {
        User client = userRepository.findByEmail(clientEmail)
            .orElseThrow(() -> new RuntimeException("Client not found"));
        
        User lawyer = userRepository.findById((String) request.get("lawyerId"))
            .orElseThrow(() -> new RuntimeException("Lawyer not found"));
        
        Consultation consultation = new Consultation();
        consultation.setClientId(client.getId());
        consultation.setClientName(client.getFirstName() + " " + client.getLastName());
        consultation.setLawyerId(lawyer.getId());
        consultation.setLawyerName(lawyer.getFirstName() + " " + lawyer.getLastName());
        consultation.setTitle((String) request.get("title"));
        consultation.setDescription((String) request.get("description"));
        consultation.setCaseType((String) request.get("caseType"));
        consultation.setScheduledDate(parseDate((String) request.get("scheduledDate")));
        consultation.setDuration((Integer) request.getOrDefault("duration", 30));
        consultation.setStatus(Consultation.ConsultationStatus.PENDING);
        consultation.setType(Consultation.ConsultationType.valueOf(
            ((String) request.getOrDefault("type", "VIDEO")).toUpperCase()));
        consultation.setAmount(lawyer.getConsultationFee());
        consultation.setPaymentStatus(Consultation.PaymentStatus.PENDING);
        consultation.setCreatedAt(new Date());
        consultation.setUpdatedAt(new Date());
        
        return consultationRepository.save(consultation);
    }
    
    public List<Consultation> getConsultationsForUser(String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (user.getRole() == User.UserRole.LAWYER) {
            return consultationRepository.findByLawyerId(user.getId());
        } else {
            return consultationRepository.findByClientId(user.getId());
        }
    }
    
    public Consultation getConsultationById(String id, String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        Consultation consultation = consultationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Consultation not found"));
        
        if (!consultation.getClientId().equals(user.getId()) && 
            !consultation.getLawyerId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access");
        }
        
        return consultation;
    }
    
    public Consultation confirmConsultation(String id, String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        Consultation consultation = consultationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Consultation not found"));
        
        if (!consultation.getLawyerId().equals(user.getId())) {
            throw new RuntimeException("Only lawyer can confirm consultation");
        }
        
        consultation.setStatus(Consultation.ConsultationStatus.CONFIRMED);
        consultation.setMeetingLink("https://meet.nyayamitra.in/" + UUID.randomUUID());
        consultation.setUpdatedAt(new Date());
        
        return consultationRepository.save(consultation);
    }
    
    public Consultation cancelConsultation(String id, String reason, String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        Consultation consultation = consultationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Consultation not found"));
        
        if (!consultation.getClientId().equals(user.getId()) && 
            !consultation.getLawyerId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access");
        }
        
        consultation.setStatus(Consultation.ConsultationStatus.CANCELLED);
        consultation.setCancellationReason(reason);
        consultation.setUpdatedAt(new Date());
        
        return consultationRepository.save(consultation);
    }
    
    public Consultation rescheduleConsultation(String id, Map<String, Object> request, String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        Consultation consultation = consultationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Consultation not found"));
        
        if (!consultation.getClientId().equals(user.getId()) && 
            !consultation.getLawyerId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access");
        }
        
        consultation.setScheduledDate(parseDate((String) request.get("scheduledDate")));
        consultation.setStatus(Consultation.ConsultationStatus.RESCHEDULED);
        consultation.setUpdatedAt(new Date());
        
        return consultationRepository.save(consultation);
    }
    
    public List<User> getAvailableLawyers(String specialization) {
        List<User> lawyers = userRepository.findByRoleAndIsEnabled(
            User.UserRole.LAWYER, true);
        
        if (specialization != null && !specialization.isEmpty()) {
            lawyers = lawyers.stream()
                .filter(l -> l.getSpecializations() != null && 
                    l.getSpecializations().stream()
                        .anyMatch(s -> s.toLowerCase().contains(specialization.toLowerCase())))
                .collect(Collectors.toList());
        }
        
        return lawyers.stream()
            .filter(User::isAvailableForConsultation)
            .collect(Collectors.toList());
    }
    
    public List<String> getAvailableSlotsForLawyer(String lawyerId, String date) {
        // Simple implementation - return slots from 9 AM to 6 PM
        List<String> slots = new ArrayList<>();
        LocalTime start = LocalTime.of(9, 0);
        LocalTime end = LocalTime.of(18, 0);
        
        while (start.isBefore(end)) {
            slots.add(start.format(DateTimeFormatter.ofPattern("HH:mm")));
            start = start.plusMinutes(30);
        }
        
        // In production, filter out already booked slots
        return slots;
    }
    
    private Date parseDate(String dateStr) {
        try {
            LocalDate localDate = LocalDate.parse(dateStr);
            return java.sql.Date.valueOf(localDate);
        } catch (Exception e) {
            return new Date();
        }
    }
}
