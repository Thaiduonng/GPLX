-- =============================================================================
-- Migration: V11__seed_exam_structure_and_import_helpers.sql
-- Description: Cập nhật chi tiết cơ cấu phân bổ câu hỏi từng chương theo hạng GPLX
-- =============================================================================

UPDATE exam_configurations 
SET structure_json = '{"rules":8,"culture":1,"technique":1,"signs":7,"scenarios":7,"paralysis":1}'
WHERE category_code = 'A1';

UPDATE exam_configurations 
SET structure_json = '{"rules":8,"culture":1,"technique":1,"signs":7,"scenarios":7,"paralysis":1}'
WHERE category_code = 'A2';

UPDATE exam_configurations 
SET structure_json = '{"rules":9,"culture":1,"technique":2,"signs":9,"scenarios":8,"paralysis":1}'
WHERE category_code = 'B1';

UPDATE exam_configurations 
SET structure_json = '{"rules":10,"transport":1,"culture":1,"technique":2,"repair":1,"signs":10,"scenarios":9,"paralysis":1}'
WHERE category_code IN ('B', 'B2');

UPDATE exam_configurations 
SET structure_json = '{"rules":12,"transport":1,"culture":1,"technique":2,"repair":2,"signs":11,"scenarios":11,"paralysis":1}'
WHERE category_code = 'C';
