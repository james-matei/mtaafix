package com.mtaafix.backend.issue.dto;

import lombok.Data;

@Data
public class IssueRequest {

    private String title;

    private String description;

    private String location;

    private Double latitude;

    private Double longitude;

}