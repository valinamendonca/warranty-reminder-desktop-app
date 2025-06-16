// src/main/java/com/example/demo/controller/ReminderController.java
package com.desktop_app.backend.controller;

import com.desktop_app.backend.dto.ReminderRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reminder")
@CrossOrigin(origins = "http://localhost:5173") // Update if needed
public class ReminderController {

    private static final Logger log = LoggerFactory.getLogger(ReminderController.class);
    private final Path csvFile = Paths.get("../data/reminders.csv").toAbsolutePath().normalize();

    @PostMapping
    public ResponseEntity<String> saveReminder(@RequestBody ReminderRequest reminder) {

        try {
            // Ensure parent directories exist
            Files.createDirectories(csvFile.getParent());

            boolean fileExists = Files.exists(csvFile);

            try (BufferedWriter writer = Files.newBufferedWriter(
                    csvFile, StandardOpenOption.CREATE, StandardOpenOption.APPEND)) {

                // Write header if file is new
                if (!fileExists) {
                    writer.write("Item Name,Reminder Date,Description");
                    writer.newLine();
                }

                // Write CSV line, escaping quotes
                writer.write(String.format("\"%s\",\"%s\",\"%s\"",
                        reminder.getItemName(),
                        reminder.getReminderDate(),
                        reminder.getDescription().replace("\"", "'")));
                writer.newLine();
            }

            log.info("Reminder saved: {}", reminder.getItemName());
            return ResponseEntity.ok("Reminder saved successfully!");

        } catch (IOException e) {
            log.error("Error saving reminder: {}", e.getMessage());
            return ResponseEntity.status(500).body("Error saving reminder: " + e.getMessage());
        }
    }

    @GetMapping
    public List<Map<String, String>> getReminders() {
        List<Map<String, String>> reminders = new ArrayList<>();
        try {
            List<String> lines = Files.readAllLines(csvFile);
            for (int i=1; i < lines.size(); i++) { // Skip header
                String line = lines.get(i).trim();
                String[] parts = line.split(",", 3);
                if (parts.length >= 3) {
                    Map<String, String> reminder = new HashMap<>();
                    reminder.put("itemName", parts[0]);
                    reminder.put("reminderDate", parts[1]);
                    reminder.put("description", parts[2]);
                    reminders.add(reminder);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        log.info("Retrieved {} reminders", reminders.size());
        return reminders;
    }
}
