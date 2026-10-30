import type { RuleSet } from '../types.ts';
export function validateRules(value: unknown): RuleSet {
 if(!value || typeof value!=='object') throw new Error('Bộ luật không hợp lệ.');
 const r=value as RuleSet;
 if(!r.version || !['VERIFIED','NEEDS_VERIFICATION'].includes(r.status) || !Array.isArray(r.sources) || !r.rules || !/^\d{4}-\d{2}-\d{2}$/.test(r.validFrom) || !/^\d{4}-\d{2}-\d{2}$/.test(r.validUntil)) throw new Error('Thiếu phiên bản hoặc nguồn pháp lý.');
 for(const key of ['initialScore','passScore','stopTolerance','maxRpm','startWarnSeconds','startSuspendSeconds','hillRestartSeconds','rollbackLimit','signalCancelDistance','hazardStopSeconds','hazardLightSeconds'] as const) if(!Number.isFinite(r[key]) || r[key]<0) throw new Error('Thông số luật không hợp lệ.');
 if(r.passScore>r.initialScore || r.startWarnSeconds>=r.startSuspendSeconds || r.validFrom>r.validUntil || r.sources.length<1) throw new Error('Ngưỡng điểm hoặc thời hạn không hợp lệ.');
 for(const key of ['belt','signal_missing','signal_late','start_delay','start_timeout','pedestrian_stop','hill_early','hill_missed','hill_timeout','rollback','collision','curb','stall','rpm','overspeed','hazard_stop','hazard_lights','hazard_clear','line','route']) if(!r.rules[key]) throw new Error('Thiếu quy tắc bắt buộc: '+key);
 for(const rule of Object.values(r.rules)) if(!Number.isFinite(rule.points) || rule.points<0 || rule.points>r.initialScore || typeof rule.suspend!=='boolean' || !['VERIFIED','NEEDS_VERIFICATION','INTERNAL_RULE'].includes(rule.status) || !rule.source) throw new Error('Quy tắc chấm điểm không hợp lệ.');
 for(const code of ['B','C1','C','D1','D2','D'] as const) { const p=r.profiles?.[code]; if(!p||!Number.isFinite(p.speedLimit)||p.speedLimit<=0||!Number.isFinite(p.timeLimitSeconds)||p.timeLimitSeconds<=0||!Array.isArray(p.fullSequence)||!Array.isArray(p.parking)||!Array.isArray(p.mvpSequence)||p.mvpSequence.length!==3||new Set(p.mvpSequence).size!==3||p.mvpSequence.some(id=>!['departure','pedestrian','hill'].includes(id))) throw new Error('Cấu hình hạng xe không hợp lệ: '+code); }
 if(!Number.isFinite(r.rules.overspeed!.repeatSeconds)||r.rules.overspeed!.repeatSeconds!<=0) throw new Error('Thiếu chu kỳ trừ điểm tốc độ.');
 return r;
}
export const rulesApplicable = (rules: RuleSet, date = new Date().toISOString().slice(0,10)) => rules.status==='VERIFIED' && date>=rules.validFrom && date<=rules.validUntil;
