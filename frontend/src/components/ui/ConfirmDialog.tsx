import React, { useState } from 'react';
import { Modal } from './Modal';
import { AppButton } from './AppButton';
import styles from './ConfirmDialog.module.css';

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason?: string) => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'primary' | 'danger' | 'success';
  loading?: boolean;
  requireReason?: boolean;
  reasonPlaceholder?: string;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Xác nhận',
  cancelText = 'Hủy bỏ',
  variant = 'primary',
  loading = false,
  requireReason = false,
  reasonPlaceholder = 'Nhập lý do chi tiết...',
}) => {
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  const handleConfirm = () => {
    if (requireReason && !reason.trim()) {
      setError('Vui lòng nhập lý do để tiếp tục');
      return;
    }
    setError('');
    onConfirm(reason.trim());
  };

  const handleClose = () => {
    setReason('');
    setError('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={title}
      footer={
        <>
          <AppButton variant="outline" onClick={handleClose} disabled={loading}>
            {cancelText}
          </AppButton>
          <AppButton
            variant={variant === 'danger' ? 'danger' : variant === 'success' ? 'success' : 'primary'}
            onClick={handleConfirm}
            loading={loading}
          >
            {confirmText}
          </AppButton>
        </>
      }
    >
      <div className={styles.dialogBody}>
        <p className={styles.message}>{message}</p>
        {requireReason && (
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>
              Lý do <span style={{ color: 'var(--color-danger)' }}>*</span>
            </label>
            <textarea
              className={styles.textarea}
              placeholder={reasonPlaceholder}
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                if (e.target.value.trim()) setError('');
              }}
              rows={3}
            />
            {error && <span style={{ color: 'var(--color-danger)', fontSize: '0.75rem' }}>{error}</span>}
          </div>
        )}
      </div>
    </Modal>
  );
};
