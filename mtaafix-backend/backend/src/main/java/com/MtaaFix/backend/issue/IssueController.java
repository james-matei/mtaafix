package com.mtaafix.backend.issue;

import com.mtaafix.backend.issue.dto.IssueResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/issues")
@RequiredArgsConstructor
public class IssueController {

    private final IssueService issueService;

    @PostMapping
    public IssueResponse createIssue(@RequestBody Issue issue) {
        return issueService.createIssue(issue);
    }

    @GetMapping
    public List<IssueResponse> getAllIssues() {
        return issueService.getAllIssues();
    }
}