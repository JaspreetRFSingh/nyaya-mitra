package com.nyayamitra.controller;

import com.nyayamitra.model.Case;
import com.nyayamitra.service.CaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cases")
@CrossOrigin(origins = "http://localhost:3000")
public class CaseController {
    
    @Autowired
    private CaseService caseService;
    
    @PostMapping
    public ResponseEntity<?> createCase(@RequestBody Map<String, Object> request, Principal principal) {
        return ResponseEntity.ok(caseService.createCase(request, principal.getName()));
    }
    
    @GetMapping
    public ResponseEntity<List<Case>> getMyCases(Principal principal) {
        return ResponseEntity.ok(caseService.getCasesForUser(principal.getName()));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Case> getCaseById(@PathVariable String id, Principal principal) {
        return ResponseEntity.ok(caseService.getCaseById(id, principal.getName()));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCase(@PathVariable String id, 
                                         @RequestBody Map<String, Object> request,
                                         Principal principal) {
        return ResponseEntity.ok(caseService.updateCase(id, request, principal.getName()));
    }
    
    @PostMapping("/{id}/hearing")
    public ResponseEntity<?> addHearing(@PathVariable String id,
                                         @RequestBody Map<String, Object> request,
                                         Principal principal) {
        return ResponseEntity.ok(caseService.addHearing(id, request, principal.getName()));
    }
    
    @GetMapping("/upcoming-hearings")
    public ResponseEntity<List<Case>> getUpcomingHearings(Principal principal) {
        return ResponseEntity.ok(caseService.getUpcomingHearings(principal.getName()));
    }
}
