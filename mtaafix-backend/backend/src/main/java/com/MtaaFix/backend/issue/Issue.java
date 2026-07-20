package com.mtaafix.backend.issue;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import com.mtaafix.backend.user.User;

@Entity
@Table(name = "issues")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Issue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 1000)
    private String description;

    private String location;

    @Column(nullable = true)
    private Double latitude;

    @Column(nullable = true)
    private Double longitude;

   @Enumerated(EnumType.STRING)
private IssueStatus status;

    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "user_id")   
    private User user;
      
    

}