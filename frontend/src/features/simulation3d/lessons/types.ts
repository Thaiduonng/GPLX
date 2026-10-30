import type { Layout, LessonProgress, RuleSet, SessionState, VehicleSpec, VehicleState } from '../types.ts';
export interface Fault { id: string; key?: string; repeat?: boolean }
export interface LessonContext { vehicle: VehicleState; previous: VehicleState; spec: VehicleSpec; layout: Layout; rules: RuleSet; session: SessionState; progress: LessonProgress; faults: Fault[] }
export interface LessonModule { evaluate: (context: LessonContext) => boolean; spawnFront: (layout: Layout) => number; }
