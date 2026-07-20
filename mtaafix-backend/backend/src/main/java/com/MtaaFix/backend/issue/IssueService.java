package com.mtaafix.backend.issue;

import com.mtaafix.backend.issue.dto.IssueRequest;
import com.mtaafix.backend.issue.dto.IssueResponse;
import com.mtaafix.backend.issue.dto.UpdateIssueRequest;
import com.mtaafix.backend.issue.dto.UpdateStatusRequest;
import com.mtaafix.backend.user.User;
import com.mtaafix.backend.user.UserRepository;
import com.mtaafix.backend.exception.ResourceNotFoundException;
import com.mtaafix.backend.exception.UnauthorizedActionException;

import lombok.RequiredArgsConstructor;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class IssueService {

    private final IssueRepository issueRepository;
    private final UserRepository userRepository;

    public IssueResponse createIssue(IssueRequest request) {

        Issue issue = new Issue();

issue.setTitle(request.getTitle());
issue.setDescription(request.getDescription());
issue.setLocation(request.getLocation());

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        System.out.println("Logged in user: " + email);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        issue.setUser(user);
        issue.setStatus(IssueStatus.OPEN);
        issue.setCreatedAt(LocalDateTime.now());
        issue.setLocation(request.getLocation());
        issue.setLatitude(request.getLatitude());
        issue.setLongitude(request.getLongitude());

        Issue savedIssue = issueRepository.save(issue);

        return mapToResponse(savedIssue);
    }

    public List<IssueResponse> getAllIssues() {

        return issueRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private IssueResponse mapToResponse(Issue issue) {

        return new IssueResponse(
                issue.getId(),
                issue.getTitle(),
                issue.getDescription(),
                issue.getLocation(),
                issue.getStatus(),
                issue.getCreatedAt(),
                issue.getUser() 
                !=null ? issue.getUser().getName()
                 : "Unknown",
                issue.getLatitude(),
                issue.getLongitude()
        );
    }

    public List<IssueResponse> getMyIssues() {

    Authentication authentication =
            SecurityContextHolder.getContext().getAuthentication();

    String email = authentication.getName();

    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));

    return issueRepository.findByUser(user)
            .stream()
            .map(this::mapToResponse)
            .toList();
}
public IssueResponse getIssueById(Long id) {

    Issue issue = issueRepository.findById(id)
            .orElseThrow(() ->
                    new ResourceNotFoundException("Issue not found"));

    return mapToResponse(issue);
}
public IssueResponse updateIssue(Long id, UpdateIssueRequest request) {

    Authentication authentication =
            SecurityContextHolder.getContext().getAuthentication();

    String email = authentication.getName();

    User currentUser = userRepository.findByEmail(email)
            .orElseThrow(() ->
                    new ResourceNotFoundException("User not found"));

    Issue issue = issueRepository.findById(id)
            .orElseThrow(() ->
                    new ResourceNotFoundException("Issue not found"));

    // Ensure only the owner can edit
    if (!issue.getUser().getId().equals(currentUser.getId())) {
       throw new UnauthorizedActionException(
        "You are not allowed to edit this issue.");
    }

    issue.setTitle(request.getTitle());
    issue.setDescription(request.getDescription());
    issue.setLocation(request.getLocation());

    Issue updatedIssue = issueRepository.save(issue);

    return mapToResponse(updatedIssue);
}
public void deleteIssue(Long id) {

    Authentication authentication =
            SecurityContextHolder.getContext().getAuthentication();

    String email = authentication.getName();

    User currentUser = userRepository.findByEmail(email)
            .orElseThrow(() ->
                    new ResourceNotFoundException("User not found"));

    Issue issue = issueRepository.findById(id)
            .orElseThrow(() ->
                    new ResourceNotFoundException("Issue not found"));

    if (!issue.getUser().getId().equals(currentUser.getId())) {
        throw new UnauthorizedActionException(
                "You are not allowed to delete this issue.");
    }

    issueRepository.delete(issue);
}
@PreAuthorize("hasRole('ADMIN')")
public IssueResponse updateStatus(Long id,
                                  UpdateStatusRequest request) {

    Issue issue = issueRepository.findById(id)
            .orElseThrow(() ->
                    new ResourceNotFoundException("Issue not found"));

    issue.setStatus(request.getStatus());

    Issue saved = issueRepository.save(issue);

    return mapToResponse(saved);
}

}