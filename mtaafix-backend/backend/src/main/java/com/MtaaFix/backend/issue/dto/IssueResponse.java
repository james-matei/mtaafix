package com.mtaafix.backend.issue.dto;

import com.mtaafix.backend.issue.IssueStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class IssueResponse {

    private Long id;

    private String title;

    private String description;

    private String location;

    private IssueStatus status;

    private LocalDateTime createdAt;

    private String reportedBy;

}