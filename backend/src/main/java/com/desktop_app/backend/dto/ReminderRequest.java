// src/main/java/com/example/demo/dto/ReminderRequest.java
package com.desktop_app.backend.dto;

public class ReminderRequest {
    private String itemName;
    private String reminderDate;
    private String description;

    // Getters and setters
    public String getItemName() { return itemName; }
    public void setItemName(String itemName) { this.itemName = itemName; }

    public String getReminderDate() { return reminderDate; }
    public void setReminderDate(String reminderDate) { this.reminderDate = reminderDate; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
