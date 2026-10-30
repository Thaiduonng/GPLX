import { departure } from './departure.ts';
import { pedestrian } from './pedestrian.ts';
import { hill } from './hill.ts';
import type { LessonId } from '../types.ts';
import type { LessonModule } from './types.ts';
export const lessonModules: Record<LessonId,LessonModule> = {departure,pedestrian,hill};
