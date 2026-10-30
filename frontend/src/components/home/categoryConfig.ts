import catalog from '../../data/licenseCategories2026.json';
export interface CategoryConfig {
  code: string; name: string; fullName: string; questionsPerExam: number;
  timeMinutes: number; passingScore: string; totalQuestions: number; description: string;
}
export const LICENSE_CATEGORIES = catalog;
export const CATEGORY_CONFIGS: Record<string, CategoryConfig> = Object.fromEntries(
  catalog.filter(c => c.examVerified).map(c => [c.code, {
    ...c, questionsPerExam: c.questionsPerExam!, timeMinutes: c.timeMinutes!,
  }]),
);
export const DEFAULT_CATEGORY = 'B';
export const DEFAULT_CONFIG = CATEGORY_CONFIGS.B!;
export function getCategoryConfig(code: string): CategoryConfig {
  return CATEGORY_CONFIGS[code] ?? DEFAULT_CONFIG;
}
