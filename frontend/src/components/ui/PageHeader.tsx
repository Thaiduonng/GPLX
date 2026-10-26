import React from 'react';
import styles from './PageHeader.module.css';

export interface Breadcrumb {
  label: string;
  href?: string;
}

export interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  actions?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  breadcrumbs,
  actions,
  className = '',
}) => {
  return (
    <div className={`${styles.header} ${className}`}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
          {breadcrumbs.map((bc, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <span>/</span>}
              {bc.href ? (
                <a href={bc.href} className={styles.breadcrumbItem}>
                  {bc.label}
                </a>
              ) : (
                <span className={`${styles.breadcrumbItem} ${styles.active}`}>
                  {bc.label}
                </span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}

      <div className={styles.topRow}>
        <div className={styles.titleArea}>
          <h1 className={styles.title}>{title}</h1>
          {description && <p className={styles.description}>{description}</p>}
        </div>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    </div>
  );
};
