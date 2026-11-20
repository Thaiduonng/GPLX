import type { JSX } from 'react';
import {
  InfoFrame,
  MandatoryFrame,
  SIGN_BLACK,
  SIGN_RED,
  SIGN_WHITE,
  SignSvg,
  StopOctagon,
  TextPlate,
  WarningFrame,
} from './primitives';

/**
 * Các biển xuất hiện trên sân sa hình theo QCVN 15:2026/BCA mục 2.1.15.
 * Mã biển lấy theo tài liệu QCVN 41 bản 2019 trong danh mục (NEEDS_VERIFICATION, chờ đối chiếu QCVN 41:2024).
 */
export type YardSignKey =
  | 'STOP'
  | 'PEDESTRIAN_CROSSING'
  | 'STEEP_DESCENT'
  | 'STEEP_ASCENT'
  | 'MANDATORY_DIRECTION'
  | 'INTERSECTION'
  | 'TRAFFIC_SIGNALS'
  | 'PARKING'
  | 'RAILWAY_NO_BARRIER'
  | 'RAILWAY_CROSS_PERPENDICULAR'
  | 'GEAR_UP_START'
  | 'GEAR_DOWN_START'
  | 'GEAR_DOWN_END';

export interface YardSignProps {
  size?: number;
}

export interface YardSignDef {
  key: YardSignKey;
  code: string | null;
  name: string;
  Component: (props: YardSignProps) => JSX.Element;
}

function define(key: YardSignKey, code: string | null, name: string, body: JSX.Element): YardSignDef {
  const Component = ({ size }: YardSignProps) => (
    <SignSvg label={name} size={size}>
      {body}
    </SignSvg>
  );
  Component.displayName = `YardSign(${key})`;
  return { key, code, name, Component };
}

const pedestrian = (
  <WarningFrame>
    <circle cx={52} cy={36} r={5} fill={SIGN_BLACK} />
    <path d="M51 42 L46 60 L40 74 M47 58 L56 74 M50 46 L60 54 M50 46 L41 52" stroke={SIGN_BLACK} strokeWidth={5} strokeLinecap="round" fill="none" />
    <path d="M28 79 H72" stroke={SIGN_BLACK} strokeWidth={3} strokeDasharray="6 4" />
  </WarningFrame>
);

const slope = (descending: boolean) => (
  <WarningFrame>
    <polygon points={descending ? '24,48 78,78 24,78' : '24,78 78,48 78,78'} fill={SIGN_BLACK} />
    <text x={descending ? 62 : 38} y={58} textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight={700} fontSize={12} fill={SIGN_BLACK}>
      10%
    </text>
  </WarningFrame>
);

const intersection = (
  <WarningFrame>
    <path d="M50 34 V80 M30 60 H70" stroke={SIGN_BLACK} strokeWidth={8} />
  </WarningFrame>
);

const signals = (
  <WarningFrame>
    <rect x={41} y={34} width={18} height={44} rx={4} fill={SIGN_BLACK} />
    <circle cx={50} cy={43} r={5} fill={SIGN_RED} />
    <circle cx={50} cy={56} r={5} fill="#f5b400" />
    <circle cx={50} cy={69} r={5} fill="#1fa34a" />
  </WarningFrame>
);

const train = (
  <WarningFrame>
    <rect x={30} y={56} width={36} height={14} fill={SIGN_BLACK} />
    <rect x={54} y={44} width={14} height={14} fill={SIGN_BLACK} />
    <rect x={34} y={48} width={6} height={9} fill={SIGN_BLACK} />
    <circle cx={38} cy={73} r={4} fill={SIGN_BLACK} />
    <circle cx={50} cy={73} r={4} fill={SIGN_BLACK} />
    <circle cx={62} cy={73} r={4} fill={SIGN_BLACK} />
  </WarningFrame>
);

const crossbuck = (
  <g transform="rotate(-35 50 50)">
    <rect data-part="board" x={6} y={42} width={88} height={16} fill={SIGN_WHITE} stroke={SIGN_RED} strokeWidth={4} />
    <rect data-part="board" x={6} y={42} width={88} height={16} fill={SIGN_WHITE} stroke={SIGN_RED} strokeWidth={4} transform="rotate(70 50 50)" />
  </g>
);

const mandatoryStraight = (
  <MandatoryFrame>
    <path d="M50 22 L68 44 H56 V78 H44 V44 H32 Z" fill={SIGN_WHITE} />
  </MandatoryFrame>
);

const parking = (
  <InfoFrame>
    <text x={50} y={72} textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight={700} fontSize={62} fill={SIGN_WHITE}>
      P
    </text>
  </InfoFrame>
);

export const YARD_SIGNS: Record<YardSignKey, YardSignDef> = {
  STOP: define('STOP', 'R.122', 'Dừng lại', <StopOctagon />),
  PEDESTRIAN_CROSSING: define('PEDESTRIAN_CROSSING', 'W.224', 'Đường người đi bộ cắt ngang', pedestrian),
  STEEP_DESCENT: define('STEEP_DESCENT', 'W.219', 'Dốc xuống nguy hiểm', slope(true)),
  STEEP_ASCENT: define('STEEP_ASCENT', 'W.220', 'Dốc lên nguy hiểm', slope(false)),
  MANDATORY_DIRECTION: define('MANDATORY_DIRECTION', 'R.301a', 'Hướng đi phải theo', mandatoryStraight),
  INTERSECTION: define('INTERSECTION', 'W.205a', 'Đường giao nhau', intersection),
  TRAFFIC_SIGNALS: define('TRAFFIC_SIGNALS', 'W.209', 'Giao nhau có tín hiệu đèn', signals),
  PARKING: define('PARKING', 'I.408', 'Nơi đỗ xe', parking),
  RAILWAY_NO_BARRIER: define('RAILWAY_NO_BARRIER', 'W.211', 'Giao nhau với đường sắt không có rào chắn', train),
  RAILWAY_CROSS_PERPENDICULAR: define(
    'RAILWAY_CROSS_PERPENDICULAR',
    'W.242a',
    'Nơi đường sắt giao vuông góc với đường bộ',
    crossbuck,
  ),
  GEAR_UP_START: define('GEAR_UP_START', null, 'Bắt đầu tăng số, tăng tốc độ', <TextPlate lines={['BẮT ĐẦU', 'TĂNG SỐ,', 'TĂNG TỐC ĐỘ']} />),
  GEAR_DOWN_START: define('GEAR_DOWN_START', null, 'Bắt đầu giảm số, giảm tốc độ', <TextPlate lines={['BẮT ĐẦU', 'GIẢM SỐ,', 'GIẢM TỐC ĐỘ']} />),
  GEAR_DOWN_END: define('GEAR_DOWN_END', null, 'Kết thúc giảm số, giảm tốc độ', <TextPlate lines={['KẾT THÚC', 'GIẢM SỐ,', 'GIẢM TỐC ĐỘ']} />),
};

/** Tra biển SVG theo mã danh mục (dùng cho trang tra cứu). */
export function findYardSignByCode(code: string): YardSignDef | undefined {
  return Object.values(YARD_SIGNS).find((def) => def.code === code);
}
