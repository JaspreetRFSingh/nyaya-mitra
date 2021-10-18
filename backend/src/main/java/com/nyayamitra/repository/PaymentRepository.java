package com.nyayamitra.repository;

import com.nyayamitra.model.Payment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PaymentRepository extends MongoRepository<Payment, String> {
    
    List<Payment> findByUserId(String userId);
    
    List<Payment> findByUserIdAndStatus(String userId, Payment.PaymentStatus status);
    
    List<Payment> findByStatus(Payment.PaymentStatus status);
    
    List<Payment> findByReferenceId(String referenceId);
    
    List<Payment> findByGatewayOrderId(String gatewayOrderId);
}
