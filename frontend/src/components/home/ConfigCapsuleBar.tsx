import React from 'react';
import { LicenseCategorySelector } from './LicenseCategorySelector';
import { StatisticsBar } from './StatisticsBar';
import { getCategoryConfig, type CategoryConfig } from './categoryConfig';
import styles from './ConfigCapsuleBar.module.css';

interface ConfigCapsuleBarProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const ConfigCapsuleBar: React.FC<ConfigCapsuleBarProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const currentConfig: CategoryConfig = getCategoryConfig(selectedCategory);

  return (
    <section className={styles.capsuleWrapper} aria-label="Cấu hình sát hạch theo hạng lái xe">
      <div className={styles.capsuleBar}>
        <div className={styles.leftSelectorArea}>
          <LicenseCategorySelector
            selectedCategory={selectedCategory}
            onSelectCategory={onSelectCategory}
          />
        </div>

        <div className={styles.verticalSeparator} />

        <div className={styles.rightStatsArea}>
          <StatisticsBar config={currentConfig} />
        </div>
      </div>
    </section>
  );
};
