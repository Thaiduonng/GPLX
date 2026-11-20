import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { TrafficSignEditForm } from './TrafficSignEditForm';
import { trafficSignService } from '../../services/trafficSignService';
import type { TrafficSign } from '../../types/trafficSign';

vi.mock('../../services/trafficSignService', () => ({
  trafficSignService: { search: vi.fn(), getByCode: vi.fn(), update: vi.fn() },
}));

const update = vi.mocked(trafficSignService.update);

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
  rasterAsset: null,
};

describe('TrafficSignEditForm', () => {
  beforeEach(() => {
    update.mockReset();
  });

  it('requires name', async () => {
    render(<TrafficSignEditForm sign={stop} onSaved={vi.fn()} onCancel={vi.fn()} />);
    fireEvent.change(screen.getByLabelText('Tên biển báo'), { target: { value: '   ' } });
    fireEvent.click(screen.getByRole('button', { name: 'Lưu' }));
    expect(await screen.findByText('Vui lòng nhập tên biển báo')).toBeInTheDocument();
    expect(update).not.toHaveBeenCalled();
  });

  it('disables submit while saving', async () => {
    let resolve: (value: TrafficSign) => void = () => undefined;
    update.mockReturnValue(new Promise<TrafficSign>((r) => (resolve = r)));
    render(<TrafficSignEditForm sign={stop} onSaved={vi.fn()} onCancel={vi.fn()} />);
    const submit = screen.getByRole('button', { name: 'Lưu' });
    fireEvent.click(submit);
    expect(submit).toBeDisabled();
    fireEvent.click(submit);
    expect(update).toHaveBeenCalledTimes(1);
    resolve(stop);
    expect(await screen.findByText('Đã cập nhật biển báo')).toBeInTheDocument();
  });

  it('saves and reports success', async () => {
    const onSaved = vi.fn();
    update.mockResolvedValue({ ...stop, legalStatus: 'VERIFIED' });
    render(<TrafficSignEditForm sign={stop} onSaved={onSaved} onCancel={vi.fn()} />);
    fireEvent.change(screen.getByLabelText('Trạng thái pháp lý'), { target: { value: 'VERIFIED' } });
    fireEvent.click(screen.getByRole('button', { name: 'Lưu' }));
    expect(await screen.findByText('Đã cập nhật biển báo')).toBeInTheDocument();
    expect(update).toHaveBeenCalledWith('R.122', {
      name: 'Dừng lại',
      meaning: 'Để báo các xe dừng lại.',
      legalStatus: 'VERIFIED',
      replacedByCode: null,
      svgAsset: null,
    });
    expect(onSaved).toHaveBeenCalledWith(expect.objectContaining({ legalStatus: 'VERIFIED' }));
  });

  it('shows server error message', async () => {
    update.mockRejectedValue(new Error('network'));
    render(<TrafficSignEditForm sign={stop} onSaved={vi.fn()} onCancel={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: 'Lưu' }));
    expect(await screen.findByText('Không lưu được biển báo. Vui lòng thử lại.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Lưu' })).not.toBeDisabled();
  });
});
