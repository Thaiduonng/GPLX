import type { ReactNode } from 'react';

/**
 * Khung vẽ chung cho biển báo SVG theo quy cách QCVN 41:
 * - Biển nguy hiểm: tam giác đều, viền đỏ, nền vàng, hình vẽ đen.
 * - Biển hiệu lệnh: hình tròn nền xanh lam, hình vẽ trắng.
 * - Biển chỉ dẫn: hình vuông/chữ nhật nền xanh lam, ký hiệu trắng.
 * - Biển "Dừng lại": bát giác nền đỏ, chữ STOP trắng.
 */
export const SIGN_RED = '#d9232e';
export const SIGN_YELLOW = '#ffd200';
export const SIGN_BLUE = '#0060a8';
export const SIGN_BLACK = '#1a1a1a';
export const SIGN_WHITE = '#ffffff';

const FONT = 'Arial, Helvetica, sans-serif';

export interface SignSvgProps {
  label: string;
  size?: number;
  children: ReactNode;
}

export function SignSvg({ label, size = 96, children }: SignSvgProps) {
  return (
    <svg role="img" aria-label={label} viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <title>{label}</title>
      {children}
    </svg>
  );
}

export function WarningFrame({ children }: { children?: ReactNode }) {
  return (
    <>
      <polygon
        points="50,7 95,88 5,88"
        fill={SIGN_YELLOW}
        stroke={SIGN_RED}
        strokeWidth={8}
        strokeLinejoin="round"
      />
      {children}
    </>
  );
}

export function MandatoryFrame({ children }: { children?: ReactNode }) {
  return (
    <>
      <circle cx={50} cy={50} r={46} fill={SIGN_BLUE} stroke={SIGN_WHITE} strokeWidth={3} />
      {children}
    </>
  );
}

export function InfoFrame({ children }: { children?: ReactNode }) {
  return (
    <>
      <rect x={6} y={6} width={88} height={88} rx={8} fill={SIGN_BLUE} stroke={SIGN_WHITE} strokeWidth={3} />
      {children}
    </>
  );
}

export function StopOctagon() {
  return (
    <>
      <polygon
        points="31,4 69,4 96,31 96,69 69,96 31,96 4,69 4,31"
        fill={SIGN_RED}
        stroke={SIGN_WHITE}
        strokeWidth={4}
      />
      <text x={50} y={60} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={28} fill={SIGN_WHITE}>
        STOP
      </text>
    </>
  );
}

/** Biển phụ chữ: chữ nhật nền trắng, viền đen, chữ đen (dùng cho bài thay đổi số — INTERNAL_RULE). */
export function TextPlate({ lines }: { lines: string[] }) {
  const lineHeight = 15;
  const startY = 50 - ((lines.length - 1) * lineHeight) / 2 + 5;
  return (
    <>
      <rect x={3} y={22} width={94} height={56} rx={4} fill={SIGN_WHITE} stroke={SIGN_BLACK} strokeWidth={3} />
      {lines.map((line, i) => (
        <text
          key={line}
          x={50}
          y={startY + i * lineHeight}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
          fontSize={11}
          fill={SIGN_BLACK}
        >
          {line}
        </text>
      ))}
    </>
  );
}
