package com.mtaafix.backend.issue;

import com.mtaafix.backend.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IssueRepository extends JpaRepository<Issue, Long> {

    List<Issue> findByUser(User user);

}