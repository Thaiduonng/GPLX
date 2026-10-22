package vn.edu.gplx.shared.exception;

/**
 * Thrown when an action violates a registered business rule.
 */
public class BusinessRuleViolationException extends RuntimeException {

    private final String ruleId;

    public BusinessRuleViolationException(String ruleId, String message) {
        super(message);
        this.ruleId = ruleId;
    }

    public String getRuleId() {
        return ruleId;
    }
}
