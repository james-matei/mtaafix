package com.mtaafix.backend.issue;

import com.mtaafix.backend.issue.dto.IssueRequest;
import com.mtaafix.backend.issue.dto.IssueResponse;
import com.mtaafix.backend.issue.dto.UpdateIssueRequest;
import com.mtaafix.backend.issue.dto.UpdateStatusRequest;

import lombok.RequiredArgsConstructor;

import org.springframework.security.access.prepost.PreAuthorize;
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
@PutMapping("/{id}")
public IssueResponse updateIssue(

        @PathVariable Long id,
        @RequestBody UpdateIssueRequest request) {

    return issueService.updateIssue(id, request);

}
@DeleteMapping("/{id}")
public void deleteIssue(@PathVariable Long id) {

    issueService.deleteIssue(id);

}
@PatchMapping("/{id}/status")
@PreAuthorize("hasRole('ADMIN')")
public IssueResponse updateStatus(

        @PathVariable Long id,

        @RequestBody UpdateStatusRequest request) {

    return issueService.updateStatus(id, request);

}

}