import { findYardSignByCode } from './svg/yardSigns';
import type { TrafficSign } from '../../types/trafficSign';
import styles from './TrafficSignCard.module.css';

interface SignImageProps {
  sign: TrafficSign;
  size?: number;
}

/** Ưu tiên: SVG chuẩn của sân sa hình → svgAsset → ảnh raster trích từ tài liệu → ô "Chưa có hình". */
export function SignImage({ sign, size = 96 }: SignImageProps) {
  const yardSign = findYardSignByCode(sign.code);
  if (yardSign) {
    return <yardSign.Component size={size} />;
  }
  const src = sign.svgAsset ?? sign.rasterAsset;
  if (src) {
    return <img src={src} alt={`Biển ${sign.code} - ${sign.name}`} className={styles.image} style={{ maxHeight: size }} loading="lazy" />;
  }
  return (
    <div className={styles.noImage} style={{ height: size }}>
      Chưa có hình
    </div>
  );
}
