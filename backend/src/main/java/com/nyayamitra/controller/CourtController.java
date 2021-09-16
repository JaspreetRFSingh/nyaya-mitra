package com.nyayamitra.controller;

import com.nyayamitra.model.Court;
import com.nyayamitra.service.CourtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/courts")
@CrossOrigin(origins = "http://localhost:3000")
public class CourtController {
    
    @Autowired
    private CourtService courtService;
    
    @GetMapping
    public ResponseEntity<List<Court>> getAllCourts() {
        return ResponseEntity.ok(courtService.getAllCourts());
    }
    
    @GetMapping("/types")
    public ResponseEntity<List<Court.CourtType>> getCourtTypes() {
        return ResponseEntity.ok(List.of(Court.CourtType.values()));
    }
    
    @GetMapping("/type/{type}")
    public ResponseEntity<List<Court>> getCourtsByType(@PathVariable String type) {
        return ResponseEntity.ok(courtService.getCourtsByType(
            Court.CourtType.valueOf(type.toUpperCase())));
    }
    
    @GetMapping("/state/{state}")
    public ResponseEntity<List<Court>> getCourtsByState(@PathVariable String state) {
        return ResponseEntity.ok(courtService.getCourtsByState(state));
    }
    
    @GetMapping("/district/{district}")
    public ResponseEntity<List<Court>> getCourtsByDistrict(@PathVariable String district) {
        return ResponseEntity.ok(courtService.getCourtsByDistrict(district));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Court> getCourtById(@PathVariable String id) {
        return ResponseEntity.ok(courtService.getCourtById(id));
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Court>> searchCourts(@RequestParam String query) {
        return ResponseEntity.ok(courtService.searchCourts(query));
    }
}
