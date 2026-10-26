import React from 'react';
import styles from './StatCard.module.css';

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'danger';
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  variant = 'primary',
  className = '',
}) => {
  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        {icon && <div className={`${styles.iconWrapper} ${styles[variant]}`}>{icon}</div>}
      </div>
      <div className={styles.body}>
        <span className={styles.value}>{value}</span>
      </div>
      {subtitle && <div className={styles.footer}>{subtitle}</div>}
    </div>
  );
};
