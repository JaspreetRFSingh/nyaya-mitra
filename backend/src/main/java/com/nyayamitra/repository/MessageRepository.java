package com.nyayamitra.repository;

import com.nyayamitra.model.Message;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MessageRepository extends MongoRepository<Message, String> {
    
    List<Message> findByConsultationId(String consultationId);
    
    List<Message> findBySenderId(String senderId);
    
    List<Message> findByReceiverId(String receiverId);
    
    List<Message> findBySenderIdAndReceiverId(String senderId, String receiverId);
    
    List<Message> findByConsultationIdOrderByCreatedAtAsc(String consultationId);
    
    long countByReceiverIdAndIsRead(String receiverId, boolean isRead);
}
