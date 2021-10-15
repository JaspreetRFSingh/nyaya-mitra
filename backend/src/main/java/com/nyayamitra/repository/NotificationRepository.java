package com.nyayamitra.repository;

import com.nyayamitra.model.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NotificationRepository extends MongoRepository<Notification, String> {
    
    List<Notification> findByUserId(String userId);
    
    List<Notification> findByUserIdAndIsRead(String userId, boolean isRead);
    
    List<Notification> findByUserIdOrderByCreatedAtDesc(String userId);
    
    long countByUserIdAndIsRead(String userId, boolean isRead);
    
    void deleteByUserId(String userId);
}
