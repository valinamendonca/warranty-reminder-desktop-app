package com.desktop_app.backend.controller;

import com.desktop_app.backend.dto.WarrantyRequest;

import java.io.BufferedWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.ArrayList;
import java.io.BufferedReader;
import java.util.UUID;

import com.desktop_app.backend.dto.WarrantyResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;


@RestController
@RequestMapping("/api")
public class WarrantyController {

    private static final Logger log = LoggerFactory.getLogger(WarrantyController.class);
    private final Path csvFile = Paths.get("../data/warranties.csv").toAbsolutePath().normalize();

    // Save warranty with type
    @PostMapping("/warranty")
    public ResponseEntity<String> saveWarranty(@RequestBody WarrantyRequest request) {
        try {
            Files.createDirectories(csvFile.getParent());

            boolean fileExists = Files.exists(csvFile);
            String newId = UUID.randomUUID().toString();

            try (BufferedWriter writer = Files.newBufferedWriter(csvFile, StandardOpenOption.CREATE, StandardOpenOption.APPEND)) {
                if (!fileExists) {
                    writer.write("ID,Item Name,Expiry Date,Description,Category,Reminder");
                    writer.newLine();
                }
                writer.write(String.format("%s,%s,%s,%s,%s,%s",
                newId,
                request.getItemName(),
                request.getExpiryDate(),
                request.getDescription().replace("\"", "'"),
                request.getCategory() == null ? "others" : request.getCategory().replace("\"", ""),
                request.isReminder()
                ));

                writer.newLine();
            }

            return ResponseEntity.ok("Saved successfully!");
        } catch (IOException e) {
            log.info("Error saving warranty: {}", e.getMessage());
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    // Get valid warranties
    @GetMapping("/warranty/valid")
    public ResponseEntity<List<WarrantyResponse>> getValidWarranties() {
        List<WarrantyResponse> validWarranties = new ArrayList<>();

        try {
            if (!Files.exists(csvFile)) {
                return ResponseEntity.ok(validWarranties);
            }

            LocalDate today = LocalDate.now();

            try (BufferedReader reader = Files.newBufferedReader(csvFile)) {
                String line;
                boolean skipHeader = true;

                while ((line = reader.readLine()) != null) {
                    if (skipHeader) {
                        skipHeader = false;
                        continue;
                    }

                    String[] parts = parseCSVLine(line);
                    if (parts.length < 6) continue;

                    String id = parts[0].replaceAll("^\"|\"$", ""); // remove leading/trailing quotes
                    String itemName = parts[1];
                    String expiryDateStr = parts[2].replaceAll("^\"|\"$", "");
                    String description = parts[3];
                    String category = parts[4].replaceAll("^\"|\"$", "");
                    boolean reminder = Boolean.parseBoolean(parts[5].trim());

                    try {
                        LocalDate expiryDate = LocalDate.parse(expiryDateStr);
                        if (!expiryDate.isBefore(today)) {
                            validWarranties.add(new WarrantyResponse(id, itemName, expiryDateStr, description, category, reminder));
                        }
                    } catch (DateTimeParseException e) {
                        System.err.println("Invalid date: " + expiryDateStr + " in line: " + line);
                    }
                }
            }
            log.info("Retrieved valid warranties: {}", validWarranties.size());
            return ResponseEntity.ok(validWarranties);
        } catch (IOException | DateTimeParseException e) {
            return ResponseEntity.status(500).build();
        }
    }

    private String[] parseCSVLine(String line) {
        return line.split(",(?=([^\"]*\"[^\"]*\")*[^\"]*$)", -1);
    }

    @DeleteMapping("/warranty")
    public ResponseEntity<String> deleteWarranty(@RequestParam String id) {
        log.info("Deleting warranty with ID: {}", id);
        try {
            if (!Files.exists(csvFile)) {
                return ResponseEntity.notFound().build();
            }

            List<String> lines = Files.readAllLines(csvFile);
            if (lines.isEmpty()) {
                return ResponseEntity.status(500).body("CSV file is empty.");
            }

            List<String> updated = new ArrayList<>();
            updated.add(lines.get(0)); // Add header

            boolean deleted = false;

            for (int i = 1; i < lines.size(); i++) {
                String[] parts = parseCSVLine(lines.get(i));

                // Clean quotes and compare
                String lineId = parts[0].replaceAll("^\"|\"$", ""); // remove leading/trailing quotes
                if (!lineId.equals(id)) {
                    updated.add(lines.get(i));
                } else {
                    deleted = true;
                }
            }

            if (!deleted) {
                return ResponseEntity.status(404).body("Warranty with ID not found.");
            }

            // Overwrite the CSV file
            Files.write(csvFile, updated, StandardOpenOption.TRUNCATE_EXISTING, StandardOpenOption.WRITE);
            log.info("Deleted warranty with ID: {}", id);
            return ResponseEntity.ok("Deleted successfully.");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }


    @PutMapping("/warranty")
    public ResponseEntity<String> updateWarranty(@RequestBody WarrantyRequest updatedRequest) {
        log.info("Updating warranty with ID in update: {}", updatedRequest.getId());
        deleteWarranty(updatedRequest.getId());
        return saveWarranty(updatedRequest); // Reuse POST logic
    }

}
