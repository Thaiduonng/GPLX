import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { YARD_SIGNS, type YardSignDef } from './yardSigns';
import { SIGN_RED, SIGN_YELLOW } from './primitives';

const allSigns: YardSignDef[] = Object.values(YARD_SIGNS);

function pointCount(points: string | null): number {
  return (points ?? '').trim().split(/\s+/).filter(Boolean).length;
}

function signByCode(code: string): YardSignDef {
  const def = allSigns.find((s) => s.code === code);
  if (!def) throw new Error(`Không có biển ${code}`);
  return def;
}

describe('YARD_SIGNS', () => {
  it('renders every yard sign with accessible name', () => {
    expect(allSigns).toHaveLength(13);
    for (const def of allSigns) {
      const { unmount } = render(<def.Component />);
      expect(screen.getByRole('img', { name: def.name })).toBeInTheDocument();
      unmount();
    }
  });

  it('stop sign is a red octagon', () => {
    const { container } = render(<YARD_SIGNS.STOP.Component />);
    const octagon = container.querySelector('polygon');
    expect(pointCount(octagon?.getAttribute('points') ?? null)).toBe(8);
    expect(octagon?.getAttribute('fill')).toBe(SIGN_RED);
    expect(YARD_SIGNS.STOP.code).toBe('R.122');
  });

  it('warning signs use yellow triangle with red border', () => {
    for (const code of ['W.224', 'W.219', 'W.220', 'W.205a', 'W.209', 'W.211']) {
      const def = signByCode(code);
      const { container, unmount } = render(<def.Component />);
      const triangle = container.querySelector('polygon');
      expect(pointCount(triangle?.getAttribute('points') ?? null), code).toBe(3);
      expect(triangle?.getAttribute('fill'), code).toBe(SIGN_YELLOW);
      expect(triangle?.getAttribute('stroke'), code).toBe(SIGN_RED);
      unmount();
    }
  });

  it('railway perpendicular sign is a red and white crossbuck', () => {
    const { container } = render(<YARD_SIGNS.RAILWAY_CROSS_PERPENDICULAR.Component />);
    expect(YARD_SIGNS.RAILWAY_CROSS_PERPENDICULAR.code).toBe('W.242a');
    expect(container.querySelector('polygon')).toBeNull();
    const boards = container.querySelectorAll('rect[data-part="board"]');
    expect(boards).toHaveLength(2);
    expect(boards[0]?.getAttribute('stroke')).toBe(SIGN_RED);
  });

  it('codes match catalog prefixes', () => {
    for (const def of allSigns) {
      if (def.code !== null) {
        expect(def.code).toMatch(/^(P|R|W|I|S)\.\d{3}[a-z]?$/);
      }
    }
    expect(allSigns.filter((s) => s.code === null).map((s) => s.name)).toEqual([
      'Bắt đầu tăng số, tăng tốc độ',
      'Bắt đầu giảm số, giảm tốc độ',
      'Kết thúc giảm số, giảm tốc độ',
    ]);
  });
});
