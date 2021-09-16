package com.nyayamitra.service;

import com.nyayamitra.model.Court;
import com.nyayamitra.repository.CourtRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CourtService {
    
    @Autowired
    private CourtRepository courtRepository;
    
    public List<Court> getAllCourts() {
        return courtRepository.findAll();
    }
    
    public List<Court> getCourtsByType(Court.CourtType type) {
        return courtRepository.findByType(type);
    }
    
    public List<Court> getCourtsByState(String state) {
        return courtRepository.findByState(state);
    }
    
    public List<Court> getCourtsByDistrict(String district) {
        return courtRepository.findByDistrict(district);
    }
    
    public Court getCourtById(String id) {
        return courtRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Court not found"));
    }
    
    public List<Court> searchCourts(String query) {
        return courtRepository.findByNameContainingIgnoreCase(query);
    }
}
