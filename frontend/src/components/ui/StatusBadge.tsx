import React from 'react';
import styles from './StatusBadge.module.css';
import {
  getApplicationStatusMeta,
  getPaymentStatusMeta,
  getExamStatusMeta,
  getVehicleStatusMeta,
} from '../../utils/formatters';

export interface StatusBadgeProps {
  status?: string;
  type?: 'application' | 'payment' | 'exam' | 'vehicle' | 'custom';
  label?: string;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  type = 'custom',
  label,
  variant,
  className = '',
}) => {
  let displayLabel = label || status || '—';
  let badgeVariant = variant || 'default';

  if (type === 'application' && status) {
    const meta = getApplicationStatusMeta(status);
    displayLabel = label || meta.label;
    badgeVariant = variant || meta.variant;
  } else if (type === 'payment' && status) {
    const meta = getPaymentStatusMeta(status);
    displayLabel = label || meta.label;
    badgeVariant = variant || meta.variant;
  } else if (type === 'exam' && status) {
    const meta = getExamStatusMeta(status);
    displayLabel = label || meta.label;
    badgeVariant = variant || meta.variant;
  } else if (type === 'vehicle' && status) {
    const meta = getVehicleStatusMeta(status);
    displayLabel = label || meta.label;
    badgeVariant = variant || meta.variant;
  }

  return (
    <span className={`${styles.badge} ${styles[badgeVariant]} ${className}`}>
      <span className={styles.dot} />
      {displayLabel}
    </span>
  );
};
