package com.nyayamitra.repository;

import com.nyayamitra.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    
    Optional<User> findByEmail(String email);
    
    boolean existsByEmail(String email);
    
    boolean existsByPhone(String phone);
    
    List<User> findByRole(User.UserRole role);
    
    List<User> findByRoleAndIsEnabled(User.UserRole role, boolean isEnabled);
    
    List<User> findBySpecializationsContaining(String specialization);
    
    List<User> findByState(String state);
    
    List<User> findByCity(String city);
    
    List<User> findByIsAvailableForConsultationTrue();
    
    List<User> findByRoleAndSpecializationsContaining(
        User.UserRole role, String specialization);
}
