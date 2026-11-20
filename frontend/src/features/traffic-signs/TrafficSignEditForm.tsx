import { useRef, useState, type FormEvent } from 'react';
import { Alert, AppButton, AppInput, AppSelect, AppTextarea } from '../../components/ui';
import { trafficSignService } from '../../services/trafficSignService';
import { LEGAL_STATUS_LABELS, type LegalStatus, type TrafficSign } from '../../types/trafficSign';
import styles from './TrafficSignEditForm.module.css';

interface TrafficSignEditFormProps {
  sign: TrafficSign;
  onSaved: (sign: TrafficSign) => void;
  onCancel: () => void;
}

const STATUS_OPTIONS = (Object.keys(LEGAL_STATUS_LABELS) as LegalStatus[]).map((value) => ({
  value,
  label: LEGAL_STATUS_LABELS[value],
}));

function emptyToNull(value: string): string | null {
  const trimmed = value.trim();
  return trimmed === '' ? null : trimmed;
}

export function TrafficSignEditForm({ sign, onSaved, onCancel }: TrafficSignEditFormProps) {
  const [name, setName] = useState(sign.name);
  const [meaning, setMeaning] = useState(sign.meaning ?? '');
  const [legalStatus, setLegalStatus] = useState<LegalStatus>(sign.legalStatus);
  const [replacedByCode, setReplacedByCode] = useState(sign.replacedByCode ?? '');
  const [svgAsset, setSvgAsset] = useState(sign.svgAsset ?? '');
  const [nameError, setNameError] = useState<string | undefined>();
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState<{ type: 'success' | 'danger'; message: string } | null>(null);
  const inFlight = useRef(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (inFlight.current) return;
    if (name.trim() === '') {
      setNameError('Vui lòng nhập tên biển báo');
      return;
    }
    setNameError(undefined);
    setResult(null);
    inFlight.current = true;
    setSaving(true);
    try {
      const saved = await trafficSignService.update(sign.code, {
        name: name.trim(),
        meaning: emptyToNull(meaning),
        legalStatus,
        replacedByCode: emptyToNull(replacedByCode),
        svgAsset: emptyToNull(svgAsset),
      });
      setResult({ type: 'success', message: 'Đã cập nhật biển báo' });
      onSaved(saved);
    } catch {
      setResult({ type: 'danger', message: 'Không lưu được biển báo. Vui lòng thử lại.' });
    } finally {
      inFlight.current = false;
      setSaving(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {result && <Alert type={result.type} message={result.message} />}
      <AppInput id="sign-edit-name" label="Tên biển báo" value={name} error={nameError} onChange={(e) => setName(e.target.value)} />
      <AppTextarea id="sign-edit-meaning" label="Ý nghĩa và sử dụng" rows={6} value={meaning} onChange={(e) => setMeaning(e.target.value)} />
      <AppSelect
        id="sign-edit-status"
        label="Trạng thái pháp lý"
        options={STATUS_OPTIONS}
        value={legalStatus}
        onChange={(e) => setLegalStatus(e.target.value as LegalStatus)}
      />
      <div className={styles.row}>
        <AppInput
          id="sign-edit-replaced"
          label="Mã thay thế (theo QCVN mới)"
          placeholder="Ví dụ: P.102"
          value={replacedByCode}
          onChange={(e) => setReplacedByCode(e.target.value)}
        />
        <AppInput
          id="sign-edit-svg"
          label="Đường dẫn hình SVG"
          placeholder="/signs/svg/P.102.svg"
          value={svgAsset}
          onChange={(e) => setSvgAsset(e.target.value)}
        />
      </div>
      <div className={styles.actions}>
        <AppButton type="button" variant="ghost" onClick={onCancel} disabled={saving}>
          Hủy
        </AppButton>
        <AppButton type="submit" loading={saving}>
          Lưu
        </AppButton>
      </div>
    </form>
  );
}
