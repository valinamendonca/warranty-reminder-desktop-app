// src/main/java/com/example/demo/controller/ReminderController.java
package com.desktop_app.backend.controller;

import com.desktop_app.backend.dto.ReminderRequest;
import com.desktop_app.backend.dto.WarrantyResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reminder")
@CrossOrigin(origins = "http://localhost:5173") // Update if needed
public class ReminderController {

    private static final Logger log = LoggerFactory.getLogger(ReminderController.class);
    private final Path csvFile = Paths.get("../data/warranties.csv").toAbsolutePath().normalize();

    @GetMapping
    public ResponseEntity<List<WarrantyResponse>> getRemindersForToday() {
        List<WarrantyResponse> reminders = new ArrayList<>();

        try {
            if (!Files.exists(csvFile)) {
                return ResponseEntity.ok(reminders);
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

                    String id = parts[0].replaceAll("^\"|\"$", "");
                    String itemName = parts[1];
                    String expiryDateStr = parts[2].replaceAll("^\"|\"$", "");
                    String description = parts[3];
                    String category = parts[4].replaceAll("^\"|\"$", "");
                    String reminderStr = parts[5].replaceAll("^\"|\"$", "");

                    boolean reminder = reminderStr.equalsIgnoreCase("true");

                    if (reminder) {
                        LocalDate expiryDate = LocalDate.parse(expiryDateStr);
                        if (expiryDate.equals(today)) {
                            reminders.add(new WarrantyResponse(id, itemName, expiryDateStr, description, category, true));
                        }
                    }
                }
            }

            return ResponseEntity.ok(reminders);
        } catch (IOException e) {
            return ResponseEntity.status(500).build();
        }
    }

    // Helper to correctly split a CSV line, respecting commas inside quotes
    private String[] parseCSVLine(String line) {
        return line.split(",(?=([^\"]*\"[^\"]*\")*[^\"]*$)", -1); // Regex to split outside quotes
    }

}
