import React, { useState, useRef, useEffect } from 'react';
import { Icons } from '../ui';
import { CATEGORY_CONFIGS, getCategoryConfig, type CategoryConfig } from './categoryConfig';
import styles from './LicenseCategorySelector.module.css';

interface LicenseCategorySelectorProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const LicenseCategorySelector: React.FC<LicenseCategorySelectorProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentConfig: CategoryConfig = getCategoryConfig(selectedCategory);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div className={styles.selectorWrapper} ref={containerRef}>
      <button
        type="button"
        className={styles.selectorBtn}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div className={styles.categoryIconBadge}>
          <Icons.Car size={18} />
        </div>
        <div className={styles.selectorText}>
          <span className={styles.selectorLabel}>Hạng thi</span>
          <span className={styles.categoryName}>{currentConfig.name}</span>
        </div>
        <span className={`${styles.chevronIcon} ${isOpen ? styles.chevronOpen : ''}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu} role="listbox">
          {Object.values(CATEGORY_CONFIGS).map((item) => {
            const isSelected = item.code === selectedCategory;
            return (
              <button
                key={item.code}
                type="button"
                role="option"
                aria-selected={isSelected}
                className={`${styles.dropdownOption} ${isSelected ? styles.optionSelected : ''}`}
                onClick={() => {
                  onSelectCategory(item.code);
                  setIsOpen(false);
                }}
              >
                <div className={styles.optionHeader}>
                  <span className={styles.optionCode}>{item.name}</span>
                  {isSelected && (
                    <span className={styles.optionCheck}>
                      <Icons.Check size={14} />
                    </span>
                  )}
                </div>
                <span className={styles.optionFullName}>{item.fullName}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
