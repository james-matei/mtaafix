package com.mtaafix.backend.issue;

import com.mtaafix.backend.issue.dto.IssueRequest;
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
    public IssueResponse createIssue(@RequestBody IssueRequest request) {

        return issueService.createIssue(request);

    }

    @GetMapping
    public List<IssueResponse> getAllIssues() {

        return issueService.getAllIssues();

    }
    @GetMapping("/my")
public List<IssueResponse> getMyIssues() {

    return issueService.getMyIssues();

}
@GetMapping("/{id}")
public IssueResponse getIssueById(@PathVariable Long id) {

    return issueService.getIssueById(id);

}

}