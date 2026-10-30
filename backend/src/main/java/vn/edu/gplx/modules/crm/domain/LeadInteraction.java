package vn.edu.gplx.modules.crm.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import vn.edu.gplx.modules.identity.domain.User;

import java.time.Instant;
import java.time.LocalDateTime;

@Entity
@Table(name = "lead_interactions")
public class LeadInteraction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lead_id", nullable = false)
    private AdmissionLead lead;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "staff_id", nullable = false)
    private User staff;

    @Enumerated(EnumType.STRING)
    @Column(name = "interaction_type", nullable = false, length = 30)
    private InteractionType interactionType = InteractionType.CALL;

    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(name = "result", length = 50)
    private String result;

    @Column(name = "next_action", length = 150)
    private String nextAction;

    @Column(name = "next_action_at")
    private LocalDateTime nextActionAt;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    public LeadInteraction() {
    }

    public LeadInteraction(AdmissionLead lead, User staff, InteractionType interactionType,
                           String content, String result, String nextAction, LocalDateTime nextActionAt) {
        this.lead = lead;
        this.staff = staff;
        this.interactionType = interactionType != null ? interactionType : InteractionType.CALL;
        this.content = content;
        this.result = result;
        this.nextAction = nextAction;
        this.nextActionAt = nextActionAt;
        this.createdAt = Instant.now();
    }

    public Long getId() {
        return id;
    }

    public AdmissionLead getLead() {
        return lead;
    }

    public void setLead(AdmissionLead lead) {
        this.lead = lead;
    }

    public User getStaff() {
        return staff;
    }

    public void setStaff(User staff) {
        this.staff = staff;
    }

    public InteractionType getInteractionType() {
        return interactionType;
    }

    public void setInteractionType(InteractionType interactionType) {
        this.interactionType = interactionType;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public String getNextAction() {
        return nextAction;
    }

    public void setNextAction(String nextAction) {
        this.nextAction = nextAction;
    }

    public LocalDateTime getNextActionAt() {
        return nextActionAt;
    }

    public void setNextActionAt(LocalDateTime nextActionAt) {
        this.nextActionAt = nextActionAt;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}
