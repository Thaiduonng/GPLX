import { StatusBadge } from '../../components/ui';
import {
  LEGAL_STATUS_LABELS,
  TRAFFIC_SIGN_GROUP_LABELS,
  formatStandardVersion,
  type TrafficSign,
} from '../../types/trafficSign';
import { SignImage } from './SignImage';
import styles from './TrafficSignCard.module.css';

interface TrafficSignCardProps {
  sign: TrafficSign;
  onSelect: (sign: TrafficSign) => void;
}

export function legalStatusVariant(status: TrafficSign['legalStatus']): 'success' | 'warning' | 'info' {
  if (status === 'VERIFIED') return 'success';
  if (status === 'NEEDS_VERIFICATION') return 'warning';
  return 'info';
}

export function TrafficSignCard({ sign, onSelect }: TrafficSignCardProps) {
  return (
    <button type="button" className={styles.card} onClick={() => onSelect(sign)} aria-label={`Xem biển ${sign.code} ${sign.name}`}>
      <div className={styles.imageWrap}>
        <SignImage sign={sign} size={88} />
      </div>
      <div className={styles.body}>
        <span className={styles.code}>{sign.code}</span>
        <span className={styles.name}>{sign.name}</span>
        <span className={styles.group}>{TRAFFIC_SIGN_GROUP_LABELS[sign.group]}</span>
        <div className={styles.meta}>
          <StatusBadge type="custom" variant={legalStatusVariant(sign.legalStatus)} label={LEGAL_STATUS_LABELS[sign.legalStatus]} />
          <span className={styles.version}>{formatStandardVersion(sign.standardVersion)}</span>
        </div>
      </div>
    </button>
  );
}
