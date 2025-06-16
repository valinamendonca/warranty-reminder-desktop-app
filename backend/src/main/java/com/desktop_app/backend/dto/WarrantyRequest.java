package com.desktop_app.backend.dto;

import lombok.Data;

@Data
public class WarrantyRequest {
    private String itemName;
    private String expiryDate;
    private String description;
}
