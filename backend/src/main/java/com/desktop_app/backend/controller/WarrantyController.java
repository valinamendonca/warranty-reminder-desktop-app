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

    // Endpoint to save warranty information
    @PostMapping("/warranty")
    public ResponseEntity<String> saveWarranty(@RequestBody WarrantyRequest request) {
        try {
            Files.createDirectories(csvFile.getParent());

            boolean fileExists = Files.exists(csvFile);
            try (BufferedWriter writer = Files.newBufferedWriter(csvFile, StandardOpenOption.CREATE, StandardOpenOption.APPEND)) {
                if (!fileExists) {
                    writer.write("Item Name,Expiry Date,Description");
                    writer.newLine();
                }
                writer.write(String.format("\"%s\",\"%s\",\"%s\"",
                        request.getItemName(),
                        request.getExpiryDate(),
                        request.getDescription().replace("\"", "'")));
                writer.newLine();
            }

            return ResponseEntity.ok("Saved successfully!");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    // Endpoint to get all valid warranties
    @GetMapping("/warranty/valid")
    public ResponseEntity<List<WarrantyResponse>> getValidWarranties() {
        List<WarrantyResponse> validWarranties = new ArrayList<>();

        try {
            if (!Files.exists(csvFile)) {
                return ResponseEntity.ok(validWarranties); // return empty list
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
                    if (parts.length < 3) continue;

                    String itemName = parts[0];
                    String expiryDateStr = parts[1].replaceAll("^\"|\"$", "");;
                    String description = parts[2];

                    try {
                        LocalDate expiryDate = LocalDate.parse(expiryDateStr, DateTimeFormatter.ISO_LOCAL_DATE);
                        if (!expiryDate.isBefore(today)) {
                            validWarranties.add(new WarrantyResponse(itemName, expiryDateStr, description));
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

    // Optional helper to handle quoted CSV values safely
    private String[] parseCSVLine(String line) {
        return line.split(",(?=([^\"]*\"[^\"]*\")*[^\"]*$)", -1); // splits by comma outside quotes
    }
}
