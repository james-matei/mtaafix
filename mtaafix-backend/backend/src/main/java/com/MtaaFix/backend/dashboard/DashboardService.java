package com.mtaafix.backend.dashboard;

import com.mtaafix.backend.issue.IssueRepository;
import com.mtaafix.backend.issue.IssueStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final IssueRepository issueRepository;

    public DashboardStatsResponse getStats() {

        return new DashboardStatsResponse(

                issueRepository.count(),

                issueRepository.countByStatus(IssueStatus.OPEN),

                issueRepository.countByStatus(IssueStatus.IN_PROGRESS),

                issueRepository.countByStatus(IssueStatus.RESOLVED),

                issueRepository.countByStatus(IssueStatus.REJECTED)

        );

    }

}