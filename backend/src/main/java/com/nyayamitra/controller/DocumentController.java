package com.nyayamitra.controller;

import com.nyayamitra.model.Document;
import com.nyayamitra.model.DocumentTemplate;
import com.nyayamitra.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin(origins = "http://localhost:3000")
public class DocumentController {
    
    @Autowired
    private DocumentService documentService;
    
    @GetMapping("/templates")
    public ResponseEntity<List<DocumentTemplate>> getTemplates() {
        return ResponseEntity.ok(documentService.getAllTemplates());
    }
    
    @GetMapping("/templates/{id}")
    public ResponseEntity<DocumentTemplate> getTemplateById(@PathVariable String id) {
        return ResponseEntity.ok(documentService.getTemplateById(id));
    }
    
    @GetMapping("/templates/type/{type}")
    public ResponseEntity<List<DocumentTemplate>> getTemplatesByType(@PathVariable String type) {
        return ResponseEntity.ok(documentService.getTemplatesByType(
            Document.DocumentType.valueOf(type.toUpperCase())));
    }
    
    @PostMapping("/generate")
    public ResponseEntity<?> generateDocument(@RequestBody Map<String, Object> request, 
                                               Principal principal) {
        return ResponseEntity.ok(documentService.generateDocument(request, principal.getName()));
    }
    
    @GetMapping
    public ResponseEntity<List<Document>> getMyDocuments(Principal principal) {
        return ResponseEntity.ok(documentService.getDocumentsForUser(principal.getName()));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Document> getDocumentById(@PathVariable String id, Principal principal) {
        return ResponseEntity.ok(documentService.getDocumentById(id, principal.getName()));
    }
    
    @GetMapping("/{id}/download")
    public ResponseEntity<byte[]> downloadDocument(@PathVariable String id, Principal principal) {
        byte[] pdfContent = documentService.generatePDF(id, principal.getName());
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "document.pdf");
        
        return ResponseEntity.ok().headers(headers).body(pdfContent);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDocument(@PathVariable String id, Principal principal) {
        documentService.deleteDocument(id, principal.getName());
        return ResponseEntity.ok().build();
    }
}
