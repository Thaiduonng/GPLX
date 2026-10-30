export type LicenseClass = 'B' | 'C1' | 'C' | 'D1' | 'D2' | 'D';
export type LessonId = 'departure' | 'pedestrian' | 'hill';
export type CameraMode = 'chase' | 'cabin' | 'overhead';
export type Mode = 'practice' | 'exam';
export type Action = 'accelerate' | 'decelerate' | 'left' | 'right' | 'brake' | 'reverse' | 'forward' | 'handbrake' | 'signalLeft' | 'signalRight' | 'camera' | 'shiftUp' | 'shiftDown' | 'engine' | 'seatbelt' | 'hazard';
export type KeyMap = Record<Action, string>;
export interface VehicleSpec { code: LicenseClass; label: string; kind: 'car' | 'truck' | 'bus'; length: number; width: number; height: number; wheelbase: number; mass: number; driveForce: number; maxSteer: number; color: number }
export interface VehicleState { x: number; s: number; heading: number; speed: number; steering: number; throttle: number; rpm: number; gear: number; handbrake: boolean; engineOn: boolean; seatbelt: boolean; signal: 'left' | 'right' | 'off'; hazard: boolean; stallTime: number; wheelAngle: number }
export interface DriveInput { accelerate: boolean; decelerate: boolean; brake: boolean; left: boolean; right: boolean }
export interface Layout { version: 1; id: string; name: string; laneWidth: number; length: number; startLine: number; pedestrianLine: number; hillStart: number; hillStop: number; hillCrest: number; hillEnd: number; hillHeight: number; finish: number; obstacles: { x: number; s: number; radius: number }[] }
export interface Rule { label: string; points: number; suspend: boolean; status: 'VERIFIED' | 'NEEDS_VERIFICATION' | 'INTERNAL_RULE'; source: string; repeatSeconds?: number }
export interface ClassRuleProfile { speedLimit: number; fullSequence: string[]; mvpSequence: LessonId[]; timeLimitSeconds: number; parking: string[] }
export interface RuleSet { signalCancelDistance: number; hazardStopSeconds: number; hazardLightSeconds: number; profiles: Record<LicenseClass,ClassRuleProfile>; version: string; status: 'VERIFIED' | 'NEEDS_VERIFICATION'; validFrom: string; validUntil: string; initialScore: number; passScore: number; stopTolerance: number; maxRpm: number; startWarnSeconds: number; startSuspendSeconds: number; hillRestartSeconds: number; rollbackLimit: number; rules: Record<string, Rule>; sources: { title: string; url: string; section: string }[] }
export interface Violation { id: string; ruleId: string; lesson: LessonId; time: number; points: number; message: string; suspend: boolean; source: string }
export interface LessonProgress { id: LessonId; enteredAt: number; completedAt: number | null; stoppedAt: number | null; stopS: number | null; stopValid: boolean; startCrossed: boolean }
export interface SessionState { elapsed: number; score: number; status: 'ready' | 'running' | 'paused' | 'completed' | 'suspended' | 'aborted'; current: number; lessons: LessonProgress[]; violations: Violation[]; ruleHits: Record<string, number>; overspeedTime: number; touching: boolean; collision: boolean; lastEngineOn: boolean; hazardAt: number | null; hazardDone: boolean; hazardSeed: number }
export interface ReplayFrame { t: number; vehicle: VehicleState; score: number; lesson: number }
export interface SavedRun { schema: 1; id: string; ownerId: number; createdAt: string; vehicleClass: LicenseClass; mode: Mode; practiceLesson: LessonId | null; ruleVersion: string; rulesSnapshot: RuleSet; layout: Layout; result: SessionState; frames: ReplayFrame[] }
export interface HudSnapshot { vehicle: VehicleState; session: SessionState; running: boolean; camera: CameraMode; replay: boolean; replayTime: number; replayDuration: number }
