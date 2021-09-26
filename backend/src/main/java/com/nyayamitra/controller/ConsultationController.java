package com.nyayamitra.controller;

import com.nyayamitra.model.Consultation;
import com.nyayamitra.service.ConsultationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/consultations")
@CrossOrigin(origins = "http://localhost:3000")
public class ConsultationController {
    
    @Autowired
    private ConsultationService consultationService;
    
    @PostMapping
    public ResponseEntity<?> bookConsultation(@RequestBody Map<String, Object> request, Principal principal) {
        return ResponseEntity.ok(consultationService.bookConsultation(request, principal.getName()));
    }
    
    @GetMapping
    public ResponseEntity<List<Consultation>> getMyConsultations(Principal principal) {
        return ResponseEntity.ok(consultationService.getConsultationsForUser(principal.getName()));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Consultation> getConsultationById(@PathVariable String id, Principal principal) {
        return ResponseEntity.ok(consultationService.getConsultationById(id, principal.getName()));
    }
    
    @PostMapping("/{id}/confirm")
    public ResponseEntity<?> confirmConsultation(@PathVariable String id, Principal principal) {
        return ResponseEntity.ok(consultationService.confirmConsultation(id, principal.getName()));
    }
    
    @PostMapping("/{id}/cancel")
    public ResponseEntity<?> cancelConsultation(@PathVariable String id, 
                                                 @RequestBody Map<String, String> request,
                                                 Principal principal) {
        return ResponseEntity.ok(consultationService.cancelConsultation(id, request.get("reason"), principal.getName()));
    }
    
    @PostMapping("/{id}/reschedule")
    public ResponseEntity<?> rescheduleConsultation(@PathVariable String id,
                                                     @RequestBody Map<String, Object> request,
                                                     Principal principal) {
        return ResponseEntity.ok(consultationService.rescheduleConsultation(id, request, principal.getName()));
    }
    
    @GetMapping("/lawyer/available")
    public ResponseEntity<List<?>> getAvailableLawyers(@RequestParam(required = false) String specialization) {
        return ResponseEntity.ok(consultationService.getAvailableLawyers(specialization));
    }
    
    @GetMapping("/lawyer/{lawyerId}/slots")
    public ResponseEntity<List<String>> getAvailableSlots(@PathVariable String lawyerId,
                                                           @RequestParam String date) {
        return ResponseEntity.ok(consultationService.getAvailableSlotsForLawyer(lawyerId, date));
    }
}
