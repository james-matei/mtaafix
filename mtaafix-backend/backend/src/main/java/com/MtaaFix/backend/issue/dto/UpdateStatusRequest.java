package com.mtaafix.backend.issue.dto;

import com.mtaafix.backend.issue.IssueStatus;
import lombok.Data;

@Data
public class UpdateStatusRequest {

    private IssueStatus status;

}