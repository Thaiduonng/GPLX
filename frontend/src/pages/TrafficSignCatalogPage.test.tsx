import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TrafficSignCatalogPage from './TrafficSignCatalogPage';
import { trafficSignService } from '../services/trafficSignService';
import type { TrafficSign } from '../types/trafficSign';
import type { PageResult } from '../types/api';

vi.mock('../services/trafficSignService', () => ({
  trafficSignService: { search: vi.fn(), getByCode: vi.fn(), update: vi.fn() },
}));

const authState = vi.hoisted(() => ({ roles: ['ROLE_STUDENT'] as string[] }));
vi.mock('../features/auth/AuthContext', () => ({
  useAuth: () => ({ user: { roles: authState.roles }, isAuthenticated: true }),
}));

const search = vi.mocked(trafficSignService.search);

const stop: TrafficSign = {
  code: 'R.122',
  name: 'Dừng lại',
  group: 'HIEU_LENH',
  meaning: 'Để báo các xe dừng lại.',
  shape: null,
  standardVersion: 'QCVN41:2019',
  legalStatus: 'NEEDS_VERIFICATION',
  legacyCode: null,
  replacedByCode: null,
  svgAsset: null,
  rasterAsset: '/signs/raster/D-1.png',
};

function page(content: TrafficSign[]): PageResult<TrafficSign> {
  return { content, totalElements: content.length, totalPages: content.length ? 1 : 0, number: 0 };
}

function renderPage() {
  return render(
    <MemoryRouter>
      <TrafficSignCatalogPage />
    </MemoryRouter>,
  );
}

describe('TrafficSignCatalogPage', () => {
  beforeEach(() => {
    search.mockReset();
    authState.roles = ['ROLE_STUDENT'];
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows loading then signs', async () => {
    search.mockResolvedValue(page([stop]));
    renderPage();
    expect(screen.getByText('Đang tải danh mục biển báo...')).toBeInTheDocument();
    expect(await screen.findByText('R.122')).toBeInTheDocument();
    expect(screen.getByText('Dừng lại', { selector: 'span' })).toBeInTheDocument();
  });

  it('shows empty state when no sign matches', async () => {
    search.mockResolvedValue(page([]));
    renderPage();
    expect(await screen.findByText('Không tìm thấy biển báo phù hợp')).toBeInTheDocument();
  });

  it('shows error with retry', async () => {
    search.mockRejectedValueOnce(new Error('network')).mockResolvedValueOnce(page([stop]));
    renderPage();
    const retry = await screen.findByRole('button', { name: 'Thử lại' });
    fireEvent.click(retry);
    expect(await screen.findByText('R.122')).toBeInTheDocument();
  });

  it('debounces search input', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    search.mockResolvedValue(page([stop]));
    renderPage();
    await screen.findByText('R.122');
    search.mockClear();

    const input = screen.getByLabelText('Tìm biển báo');
    for (const value of ['d', 'du', 'dung', 'dung lai']) {
      fireEvent.change(input, { target: { value } });
    }
    expect(search).not.toHaveBeenCalled();

    await act(async () => {
      vi.advanceTimersByTime(300);
    });
    await waitFor(() => expect(search).toHaveBeenCalledTimes(1));
    expect(search).toHaveBeenCalledWith(expect.objectContaining({ q: 'dung lai', page: 0 }));
  });

  it('marks unverified signs', async () => {
    search.mockResolvedValue(page([stop]));
    renderPage();
    await screen.findByText('R.122');
    expect(screen.getByText('Chờ xác minh')).toBeInTheDocument();
    expect(screen.getByText('QCVN 41:2019')).toBeInTheDocument();
  });

  it('shows edit button only for admin or manager', async () => {
    search.mockResolvedValue(page([stop]));
    renderPage();
    fireEvent.click(await screen.findByRole('button', { name: 'Xem biển R.122 Dừng lại' }));
    expect(screen.queryByRole('button', { name: 'Chỉnh sửa' })).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: /đóng/i }));

    authState.roles = ['ROLE_MANAGER'];
    fireEvent.click(screen.getByRole('button', { name: 'Xem biển R.122 Dừng lại' }));
    fireEvent.click(screen.getByRole('button', { name: 'Chỉnh sửa' }));
    expect(screen.getByLabelText('Tên biển báo')).toHaveValue('Dừng lại');
  });
});
