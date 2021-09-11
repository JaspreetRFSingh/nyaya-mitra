package com.nyayamitra.service;

import com.nyayamitra.model.FAQ;
import com.nyayamitra.repository.FAQRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FAQService {
    
    @Autowired
    private FAQRepository faqRepository;
    
    public List<FAQ> getAllVerifiedFAQs() {
        return faqRepository.findByIsVerifiedTrue();
    }
    
    public List<FAQ> getFAQsByCategory(FAQ.LegalCategory category) {
        return faqRepository.findByCategoryAndIsVerified(category, true);
    }
    
    public List<FAQ> searchFAQs(String query) {
        List<FAQ> byQuestion = faqRepository.findByQuestionContainingIgnoreCase(query);
        List<FAQ> byAnswer = faqRepository.findByAnswerContainingIgnoreCase(query);
        
        return byQuestion.stream()
            .filter(f -> !byAnswer.contains(f))
            .collect(Collectors.toList());
    }
    
    public List<FAQ> getPopularFAQs() {
        return faqRepository.findTop10ByViewCountOrderByViewCountDesc();
    }
    
    public FAQ getFAQById(String id) {
        return faqRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("FAQ not found"));
    }
    
    public void incrementViewCount(String id) {
        FAQ faq = getFAQById(id);
        faq.setViewCount(faq.getViewCount() + 1);
        faqRepository.save(faq);
    }
    
    public void markHelpful(String id) {
        FAQ faq = getFAQById(id);
        faq.setHelpfulCount(faq.getHelpfulCount() + 1);
        faqRepository.save(faq);
    }
    
    public void markNotHelpful(String id) {
        FAQ faq = getFAQById(id);
        faq.setNotHelpfulCount(faq.getNotHelpfulCount() + 1);
        faqRepository.save(faq);
    }
}
