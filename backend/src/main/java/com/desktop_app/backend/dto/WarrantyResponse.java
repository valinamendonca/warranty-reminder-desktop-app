package com.desktop_app.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
public class WarrantyResponse {
    private String id;
    private String itemName;
    private String expiryDate;
    private String description;
    @Setter
    private String category;
    private boolean reminder;

    public WarrantyResponse(String id, String itemName, String expiryDate, String description, String category, boolean reminder) {
        this.id = id;
        this.itemName = itemName;
        this.expiryDate = expiryDate;
        this.description = description;
        this.category = category;
        this.reminder = reminder;
    }
}
