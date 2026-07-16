package com.mtaafix.backend.issue.dto;

import lombok.Data;

@Data
public class UpdateIssueRequest {

    private String title;

    private String description;

    private String location;

}