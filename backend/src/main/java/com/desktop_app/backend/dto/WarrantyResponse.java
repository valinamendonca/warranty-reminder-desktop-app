package com.desktop_app.backend.dto;

public class WarrantyResponse {
    private String itemName;
    private String expiryDate;
    private String description;

    public WarrantyResponse(String itemName, String expiryDate, String description) {
        this.itemName = itemName;
        this.expiryDate = expiryDate;
        this.description = description;
    }

    public String getItemName() {
        return itemName;
    }

    public String getExpiryDate() {
        return expiryDate;
    }

    public String getDescription() {
        return description;
    }
}
