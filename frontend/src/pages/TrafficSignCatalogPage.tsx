import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  AppButton,
  AppInput,
  EmptyState,
  LoadingSpinner,
  Modal,
  PageHeader,
  StatusBadge,
} from '../components/ui';
import { trafficSignService } from '../services/trafficSignService';
import { TrafficSignCard, legalStatusVariant } from '../features/traffic-signs/TrafficSignCard';
import { SignImage } from '../features/traffic-signs/SignImage';
import { TrafficSignEditForm } from '../features/traffic-signs/TrafficSignEditForm';
import { useAuth } from '../features/auth/AuthContext';
import {
  LEGAL_STATUS_LABELS,
  TRAFFIC_SIGN_GROUP_LABELS,
  formatStandardVersion,
  type TrafficSign,
  type TrafficSignGroup,
} from '../types/trafficSign';
import type { PageResult } from '../types/api';
import styles from './TrafficSignCatalogPage.module.css';

const PAGE_SIZE = 24;
const DEBOUNCE_MS = 300;
const GROUPS = Object.keys(TRAFFIC_SIGN_GROUP_LABELS) as TrafficSignGroup[];
const EDITOR_ROLES = ['ROLE_ADMIN', 'ROLE_MANAGER'];

type LoadState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'success'; data: PageResult<TrafficSign> };

function useDebouncedValue(value: string, delay: number): string {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export default function TrafficSignCatalogPage() {
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState<TrafficSignGroup | undefined>(undefined);
  const [page, setPage] = useState(0);
  const [state, setState] = useState<LoadState>({ status: 'loading' });
  const [selected, setSelected] = useState<TrafficSign | null>(null);
  const [editing, setEditing] = useState(false);
  const { user } = useAuth();
  const canEdit = (user?.roles ?? []).some((role) => EDITOR_ROLES.includes(role));
  const debouncedQuery = useDebouncedValue(query.trim(), DEBOUNCE_MS);
  const requestId = useRef(0);

  const load = useCallback(async () => {
    const id = ++requestId.current;
    setState({ status: 'loading' });
    try {
      const data = await trafficSignService.search({
        q: debouncedQuery || undefined,
        group,
        page,
        size: PAGE_SIZE,
      });
      if (id === requestId.current) setState({ status: 'success', data });
    } catch {
      if (id === requestId.current) setState({ status: 'error' });
    }
  }, [debouncedQuery, group, page]);

  useEffect(() => {
    void load();
  }, [load]);

  const closeDetail = () => {
    setSelected(null);
    setEditing(false);
  };

  const handleSaved = (saved: TrafficSign) => {
    setSelected(saved);
    setState((prev) =>
      prev.status === 'success'
        ? {
            status: 'success',
            data: {
              ...prev.data,
              content: prev.data.content.map((s) =>
                s.code === saved.code && s.standardVersion === saved.standardVersion ? saved : s,
              ),
            },
          }
        : prev,
    );
  };

  return (
    <div className={styles.page}>
      <PageHeader
        title="Danh mục biển báo hiệu đường bộ"
        description="Tra cứu biển báo theo mã hoặc tên (gõ có dấu hay không dấu đều được), lọc theo nhóm biển."
        breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Biển báo' }]}
      />

      <Alert
        type="warning"
        className={styles.notice}
        message="Danh mục đang dùng tài liệu QCVN 41 bản 2016/2019 và chờ đối chiếu với QCVN 41:2024/BGTVT hiện hành."
      />

      <div className={styles.toolbar}>
        <AppInput
          label="Tìm biển báo"
          placeholder="Ví dụ: P.102, dừng lại, dung lai..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(0);
          }}
        />
        <div className={styles.chips} role="group" aria-label="Lọc theo nhóm biển">
          <button
            type="button"
            className={`${styles.chip} ${group === undefined ? styles.chipActive : ''}`}
            aria-pressed={group === undefined}
            onClick={() => {
              setGroup(undefined);
              setPage(0);
            }}
          >
            Tất cả
          </button>
          {GROUPS.map((g) => (
            <button
              key={g}
              type="button"
              className={`${styles.chip} ${group === g ? styles.chipActive : ''}`}
              aria-pressed={group === g}
              onClick={() => {
                setGroup(g);
                setPage(0);
              }}
            >
              {TRAFFIC_SIGN_GROUP_LABELS[g]}
            </button>
          ))}
        </div>
      </div>

      {state.status === 'loading' && <LoadingSpinner size="lg" text="Đang tải danh mục biển báo..." />}

      {state.status === 'error' && (
        <EmptyState
          title="Không tải được danh mục biển báo"
          description="Vui lòng kiểm tra kết nối mạng rồi thử lại."
          action={<AppButton onClick={() => void load()}>Thử lại</AppButton>}
        />
      )}

      {state.status === 'success' && state.data.content.length === 0 && (
        <EmptyState
          title="Không tìm thấy biển báo phù hợp"
          description="Thử tìm bằng mã biển (ví dụ W.224) hoặc bỏ bớt bộ lọc nhóm."
        />
      )}

      {state.status === 'success' && state.data.content.length > 0 && (
        <>
          <p className={styles.count}>Tìm thấy {state.data.totalElements} biển báo</p>
          <div className={styles.grid}>
            {state.data.content.map((sign) => (
              <TrafficSignCard key={`${sign.code}-${sign.standardVersion}`} sign={sign} onSelect={setSelected} />
            ))}
          </div>
          {state.data.totalPages > 1 && (
            <nav className={styles.pager} aria-label="Phân trang">
              <AppButton variant="outline" size="sm" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
                Trang trước
              </AppButton>
              <span>
                Trang {state.data.number + 1} / {state.data.totalPages}
              </span>
              <AppButton
                variant="outline"
                size="sm"
                disabled={page + 1 >= state.data.totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Trang sau
              </AppButton>
            </nav>
          )}
        </>
      )}

      <Modal
        isOpen={selected !== null}
        onClose={closeDetail}
        title={selected ? `${selected.code} — ${selected.name}` : ''}
        size="lg"
        footer={
          canEdit && selected && !editing ? (
            <AppButton variant="outline" onClick={() => setEditing(true)}>
              Chỉnh sửa
            </AppButton>
          ) : undefined
        }
      >
        {selected && editing && (
          <TrafficSignEditForm sign={selected} onSaved={handleSaved} onCancel={() => setEditing(false)} />
        )}
        {selected && !editing && (
          <div className={styles.detail}>
            <div className={styles.detailImage}>
              <SignImage sign={selected} size={160} />
            </div>
            <dl className={styles.detailList}>
              <dt>Nhóm biển</dt>
              <dd>{TRAFFIC_SIGN_GROUP_LABELS[selected.group]}</dd>
              <dt>Phiên bản quy chuẩn</dt>
              <dd>{formatStandardVersion(selected.standardVersion)}</dd>
              <dt>Trạng thái pháp lý</dt>
              <dd>
                <StatusBadge type="custom" variant={legalStatusVariant(selected.legalStatus)} label={LEGAL_STATUS_LABELS[selected.legalStatus]} />
              </dd>
              {selected.replacedByCode && (
                <>
                  <dt>Được thay thế bởi</dt>
                  <dd>{selected.replacedByCode}</dd>
                </>
              )}
              <dt>Ý nghĩa và sử dụng</dt>
              <dd className={styles.meaning}>{selected.meaning || 'Chưa có mô tả.'}</dd>
            </dl>
          </div>
        )}
      </Modal>
    </div>
  );
}
