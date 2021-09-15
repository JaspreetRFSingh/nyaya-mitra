package com.nyayamitra.repository;

import com.nyayamitra.model.Court;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CourtRepository extends MongoRepository<Court, String> {
    
    List<Court> findByType(Court.CourtType type);
    
    List<Court> findByLevel(Court.CourtLevel level);
    
    List<Court> findByState(String state);
    
    List<Court> findByDistrict(String district);
    
    List<Court> findByStateAndType(String state, Court.CourtType type);
    
    List<Court> findByCity(String city);
    
    List<Court> findByNameContainingIgnoreCase(String name);
}
