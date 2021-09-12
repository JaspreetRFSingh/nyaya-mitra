package com.nyayamitra.controller;

import com.nyayamitra.model.FAQ;
import com.nyayamitra.service.FAQService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/faqs")
@CrossOrigin(origins = "http://localhost:3000")
public class FAQController {
    
    @Autowired
    private FAQService faqService;
    
    @GetMapping
    public ResponseEntity<List<FAQ>> getAllFAQs() {
        return ResponseEntity.ok(faqService.getAllVerifiedFAQs());
    }
    
    @GetMapping("/categories")
    public ResponseEntity<List<FAQ.LegalCategory>> getCategories() {
        return ResponseEntity.ok(List.of(FAQ.LegalCategory.values()));
    }
    
    @GetMapping("/category/{category}")
    public ResponseEntity<List<FAQ>> getFAQsByCategory(@PathVariable String category) {
        FAQ.LegalCategory cat = FAQ.LegalCategory.valueOf(category.toUpperCase());
        return ResponseEntity.ok(faqService.getFAQsByCategory(cat));
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<FAQ>> searchFAQs(@RequestParam String query) {
        return ResponseEntity.ok(faqService.searchFAQs(query));
    }
    
    @GetMapping("/popular")
    public ResponseEntity<List<FAQ>> getPopularFAQs() {
        return ResponseEntity.ok(faqService.getPopularFAQs());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<FAQ> getFAQById(@PathVariable String id) {
        faqService.incrementViewCount(id);
        return ResponseEntity.ok(faqService.getFAQById(id));
    }
    
    @PostMapping("/{id}/helpful")
    public ResponseEntity<?> markHelpful(@PathVariable String id) {
        faqService.markHelpful(id);
        return ResponseEntity.ok().build();
    }
    
    @PostMapping("/{id}/not-helpful")
    public ResponseEntity<?> markNotHelpful(@PathVariable String id) {
        faqService.markNotHelpful(id);
        return ResponseEntity.ok().build();
    }
}
