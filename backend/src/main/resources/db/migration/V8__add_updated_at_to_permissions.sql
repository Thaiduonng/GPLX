-- =============================================================================
-- Migration V8: Add updated_at column to permissions and vehicle_maintenances
-- to align with BaseEntity
-- DBMS: MySQL 8.4 LTS
-- =============================================================================

ALTER TABLE permissions
ADD COLUMN updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

ALTER TABLE vehicle_maintenances
ADD COLUMN updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
