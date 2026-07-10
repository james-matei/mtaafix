package com.mtaafix.backend.issue;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class IssueService {

    private final IssueRepository issueRepository;

    public Issue createIssue(Issue issue) {

        issue.setStatus("OPEN");
        issue.setCreatedAt(LocalDateTime.now());

        return issueRepository.save(issue);
    }

    public List<Issue> getAllIssues() {
        return issueRepository.findAll();
    }
}