package com.mtaafix.backend.dashboard;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardStatsResponse {

    private long totalIssues;

    private long openIssues;

    private long inProgressIssues;

    private long resolvedIssues;

    private long rejectedIssues;

}