interface RoadSignVisualProps {
  svgType: string;
  size?: number;
}

export const RoadSignVisual = ({ svgType, size = 96 }: RoadSignVisualProps) => {
  switch (svgType) {
    // === BIỂN BÁO CẤM (Tròn viền đỏ) ===
    case 'P101': // Đường cấm (Tròn nền trắng viền đỏ)
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="#ffffff" stroke="#dc2626" strokeWidth="12" />
        </svg>
      );

    case 'P102': // Cấm đi ngược chiều (Tròn nền đỏ gạch ngang trắng)
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="48" fill="#dc2626" />
          <rect x="18" y="42" width="64" height="16" rx="3" fill="#ffffff" />
        </svg>
      );

    case 'P103a': // Cấm ô tô
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="#ffffff" stroke="#dc2626" strokeWidth="12" />
          {/* Ô tô con màu đen nhìn thẳng */}
          <path d="M 28 58 L 33 42 C 34 38, 38 35, 42 35 L 58 35 C 62 35, 66 38, 67 42 L 72 58 Z" fill="#0f172a" />
          <rect x="24" y="56" width="52" height="16" rx="4" fill="#0f172a" />
          <circle cx="33" cy="72" r="5" fill="#0f172a" />
          <circle cx="67" cy="72" r="5" fill="#0f172a" />
          {/* Kính xe */}
          <path d="M 36 43 L 40 38 L 60 38 L 64 43 Z" fill="#ffffff" />
          <circle cx="32" cy="62" r="3" fill="#facc15" />
          <circle cx="68" cy="62" r="3" fill="#facc15" />
        </svg>
      );

    case 'P104': // Cấm mô tô
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="#ffffff" stroke="#dc2626" strokeWidth="12" />
          <circle cx="32" cy="64" r="10" fill="none" stroke="#0f172a" strokeWidth="4" />
          <circle cx="68" cy="64" r="10" fill="none" stroke="#0f172a" strokeWidth="4" />
          <path d="M 32 64 L 46 50 L 58 50 L 68 64 M 46 50 L 52 38 L 62 38" fill="none" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case 'P106a': // Cấm ô tô tải
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="#ffffff" stroke="#dc2626" strokeWidth="12" />
          <rect x="22" y="42" width="34" height="22" fill="#0f172a" />
          <path d="M 56 46 L 70 46 C 73 46, 76 49, 76 53 L 76 64 L 56 64 Z" fill="#0f172a" />
          <circle cx="34" cy="68" r="6" fill="#0f172a" />
          <circle cx="66" cy="68" r="6" fill="#0f172a" />
          <rect x="60" y="49" width="10" height="7" fill="#ffffff" />
        </svg>
      );

    case 'P123a': // Cấm rẽ trái (Mũi tên ngoặt trái bị gạch chéo đỏ)
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="#ffffff" stroke="#dc2626" strokeWidth="12" />
          <path d="M 60 70 L 60 48 C 60 40, 52 35, 42 35 L 34 35 M 38 28 L 28 35 L 38 42" fill="none" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="24" y1="24" x2="76" y2="76" stroke="#dc2626" strokeWidth="10" />
        </svg>
      );

    case 'P124a': // Cấm quay đầu xe
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="#ffffff" stroke="#dc2626" strokeWidth="12" />
          <path d="M 60 70 L 60 45 C 60 32, 40 32, 40 45 L 40 68 M 32 60 L 40 70 L 48 60" fill="none" stroke="#0f172a" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="24" y1="24" x2="76" y2="76" stroke="#dc2626" strokeWidth="10" />
        </svg>
      );

    case 'P125': // Cấm vượt (Ô tô đỏ vượt ô tô đen)
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="#ffffff" stroke="#dc2626" strokeWidth="12" />
          {/* Ô tô đỏ bên trái */}
          <rect x="25" y="45" width="22" height="15" rx="3" fill="#dc2626" />
          {/* Ô tô đen bên phải */}
          <rect x="53" y="45" width="22" height="15" rx="3" fill="#0f172a" />
        </svg>
      );

    case 'P127': // Tốc độ tối đa 50 km/h
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="#ffffff" stroke="#dc2626" strokeWidth="12" />
          <text x="50" y="60" textAnchor="middle" fontSize="34" fontWeight="900" fill="#0f172a" fontFamily="sans-serif">50</text>
        </svg>
      );

    case 'P130': // Cấm dừng và đỗ xe (Nền xanh dấu X đỏ)
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="48" fill="#1d4ed8" stroke="#dc2626" strokeWidth="10" />
          <line x1="22" y1="22" x2="78" y2="78" stroke="#dc2626" strokeWidth="10" />
          <line x1="78" y1="22" x2="22" y2="78" stroke="#dc2626" strokeWidth="10" />
        </svg>
      );

    case 'P131a': // Cấm đỗ xe (Nền xanh 1 vạch gạch chéo đỏ)
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="48" fill="#1d4ed8" stroke="#dc2626" strokeWidth="10" />
          <line x1="78" y1="22" x2="22" y2="78" stroke="#dc2626" strokeWidth="10" />
        </svg>
      );

    // === BIỂN CẢNH BÁO NGUY HIỂM (Tam giác vàng viền đỏ) ===
    case 'W201a': // Ngoặt nguy hiểm sang trái
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <polygon points="50,10 92,85 8,85" fill="#facc15" stroke="#dc2626" strokeWidth="9" strokeLinejoin="round" />
          <path d="M 60 72 L 60 55 C 60 45, 45 42, 38 48 M 45 42 L 36 49 L 42 58" fill="none" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'W205a': // Ngã tư giao nhau cùng mức
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <polygon points="50,10 92,85 8,85" fill="#facc15" stroke="#dc2626" strokeWidth="9" strokeLinejoin="round" />
          <line x1="50" y1="42" x2="50" y2="74" stroke="#0f172a" strokeWidth="8" strokeLinecap="square" />
          <line x1="34" y1="58" x2="66" y2="58" stroke="#0f172a" strokeWidth="8" strokeLinecap="square" />
        </svg>
      );

    case 'W207a': // Giao nhau với đường không ưu tiên (Mũi tên to có vạch ngang nhỏ)
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <polygon points="50,10 92,85 8,85" fill="#facc15" stroke="#dc2626" strokeWidth="9" strokeLinejoin="round" />
          {/* Mũi tên to ưu tiên */}
          <path d="M 44 75 L 44 55 L 38 55 L 50 40 L 62 55 L 56 55 L 56 75 Z" fill="#0f172a" />
          {/* Vạch ngang đường không ưu tiên */}
          <rect x="32" y="60" width="36" height="5" fill="#0f172a" />
        </svg>
      );

    case 'W208': // Giao nhau với đường ưu tiên (Tam giác ngược viền đỏ nền vàng)
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <polygon points="50,90 92,15 8,15" fill="#facc15" stroke="#dc2626" strokeWidth="9" strokeLinejoin="round" />
        </svg>
      );

    case 'W209': // Đèn tín hiệu giao thông
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <polygon points="50,10 92,85 8,85" fill="#facc15" stroke="#dc2626" strokeWidth="9" strokeLinejoin="round" />
          <rect x="42" y="44" width="16" height="34" rx="4" fill="#0f172a" />
          <circle cx="50" cy="50" r="3.5" fill="#ef4444" />
          <circle cx="50" cy="61" r="3.5" fill="#facc15" />
          <circle cx="50" cy="72" r="3.5" fill="#22c55e" />
        </svg>
      );

    case 'W210': // Giao nhau với đường sắt có rào chắn
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <polygon points="50,10 92,85 8,85" fill="#facc15" stroke="#dc2626" strokeWidth="9" strokeLinejoin="round" />
          {/* Hàng rào chắn */}
          <line x1="32" y1="52" x2="68" y2="52" stroke="#0f172a" strokeWidth="4" />
          <line x1="32" y1="68" x2="68" y2="68" stroke="#0f172a" strokeWidth="4" />
          <line x1="38" y1="48" x2="38" y2="72" stroke="#0f172a" strokeWidth="4" />
          <line x1="50" y1="48" x2="50" y2="72" stroke="#0f172a" strokeWidth="4" />
          <line x1="62" y1="48" x2="62" y2="72" stroke="#0f172a" strokeWidth="4" />
        </svg>
      );

    case 'W211a': // Đường sắt không rào chắn (Đầu tàu hỏa)
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <polygon points="50,10 92,85 8,85" fill="#facc15" stroke="#dc2626" strokeWidth="9" strokeLinejoin="round" />
          <rect x="36" y="48" width="28" height="24" rx="3" fill="#0f172a" />
          <circle cx="42" cy="74" r="3" fill="#0f172a" />
          <circle cx="58" cy="74" r="3" fill="#0f172a" />
          <circle cx="50" cy="56" r="4" fill="#facc15" />
        </svg>
      );

    case 'W225': // Trẻ em qua đường
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <polygon points="50,10 92,85 8,85" fill="#facc15" stroke="#dc2626" strokeWidth="9" strokeLinejoin="round" />
          {/* Người lớn dắt trẻ em */}
          <circle cx="42" cy="46" r="3.5" fill="#0f172a" />
          <path d="M 38 72 L 42 55 L 48 55 L 50 72" fill="none" stroke="#0f172a" strokeWidth="3" />
          <circle cx="58" cy="54" r="2.5" fill="#0f172a" />
          <path d="M 54 72 L 58 60 L 62 72" fill="none" stroke="#0f172a" strokeWidth="2.5" />
        </svg>
      );

    case 'W227': // Công trường đang thi công (Người xúc đất)
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <polygon points="50,10 92,85 8,85" fill="#facc15" stroke="#dc2626" strokeWidth="9" strokeLinejoin="round" />
          <circle cx="45" cy="48" r="3.5" fill="#0f172a" />
          <path d="M 36 74 L 43 57 L 55 57 L 62 74" fill="none" stroke="#0f172a" strokeWidth="3" />
          <line x1="50" y1="57" x2="68" y2="70" stroke="#0f172a" strokeWidth="3" />
          <polygon points="68,68 74,70 70,74" fill="#0f172a" />
        </svg>
      );

    // === BIỂN HIỆU LỆNH (Tròn nền xanh dương) ===
    case 'R301a': // Các xe chỉ được đi thẳng
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="48" fill="#1d4ed8" />
          <path d="M 44 68 L 44 42 L 34 42 L 50 24 L 66 42 L 56 42 L 56 68 Z" fill="#ffffff" />
        </svg>
      );

    case 'R301b': // Các xe chỉ được rẽ phải
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="48" fill="#1d4ed8" />
          <path d="M 36 65 L 36 48 C 36 40, 44 34, 54 34 L 60 34 L 60 24 L 78 40 L 60 56 L 60 46 L 50 46 C 47 46, 44 48, 44 52 L 44 65 Z" fill="#ffffff" />
        </svg>
      );

    case 'R302a': // Đi vòng chướng ngại vật sang phải
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="48" fill="#1d4ed8" />
          <path d="M 38 28 L 56 46 L 56 36 L 70 54 L 52 54 L 52 44 L 38 30 Z" fill="#ffffff" transform="rotate(25 50 50)" />
        </svg>
      );

    case 'R303': // Nơi giao nhau chạy theo vòng xuyến (3 mũi tên xoay tròn)
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="48" fill="#1d4ed8" />
          <path d="M 50 25 A 25 25 0 0 1 75 50" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
          <polygon points="75,50 78,40 68,44" fill="#ffffff" />
          <path d="M 75 50 A 25 25 0 0 1 50 75" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
          <polygon points="50,75 56,78 52,68" fill="#ffffff" />
          <path d="M 50 75 A 25 25 0 0 1 25 50" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
          <polygon points="25,50 22,60 32,56" fill="#ffffff" />
        </svg>
      );

    case 'R306': // Tốc độ tối thiểu 60 km/h
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="48" fill="#1d4ed8" />
          <text x="50" y="62" textAnchor="middle" fontSize="34" fontWeight="900" fill="#ffffff" fontFamily="sans-serif">60</text>
        </svg>
      );

    // === BIỂN CHỈ DẪN (Chữ nhật / Vuông xanh) ===
    case 'I401': // Bắt đầu đường ưu tiên (Hình thoi vàng viền trắng đen)
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <rect x="50" y="5" width="60" height="60" transform="rotate(45 50 5)" fill="#facc15" stroke="#0f172a" strokeWidth="4" />
        </svg>
      );

    case 'I402': // Hết đường ưu tiên (Hình thoi vàng gạch chéo đen)
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <rect x="50" y="5" width="60" height="60" transform="rotate(45 50 5)" fill="#facc15" stroke="#0f172a" strokeWidth="4" />
          <line x1="20" y1="50" x2="80" y2="50" stroke="#0f172a" strokeWidth="6" />
        </svg>
      );

    case 'I407a': // Đường một chiều
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <rect x="10" y="10" width="80" height="80" rx="8" fill="#1d4ed8" />
          <path d="M 44 70 L 44 42 L 34 42 L 50 22 L 66 42 L 56 42 L 56 70 Z" fill="#ffffff" />
        </svg>
      );

    case 'I409': // Khu vực quay xe
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <rect x="10" y="10" width="80" height="80" rx="8" fill="#1d4ed8" />
          <path d="M 64 68 L 64 42 C 64 30, 36 30, 36 42 L 36 65 M 26 55 L 36 68 L 46 55" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'I423a': // Người đi bộ sang ngang
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <rect x="10" y="10" width="80" height="80" rx="8" fill="#1d4ed8" />
          <polygon points="50,18 84,78 16,78" fill="#ffffff" />
          {/* Người đi trên vạch kẻ */}
          <line x1="28" y1="74" x2="72" y2="74" stroke="#0f172a" strokeWidth="3" />
          <circle cx="48" cy="42" r="3.5" fill="#0f172a" />
          <path d="M 40 68 L 46 52 L 54 52 L 58 68" fill="none" stroke="#0f172a" strokeWidth="3" />
        </svg>
      );

    case 'I428': // Trạm cấp cứu (Chữ thập đỏ)
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <rect x="10" y="10" width="80" height="80" rx="8" fill="#1d4ed8" />
          <rect x="20" y="20" width="60" height="60" rx="4" fill="#ffffff" />
          <rect x="44" y="30" width="12" height="40" fill="#dc2626" />
          <rect x="30" y="44" width="40" height="12" fill="#dc2626" />
        </svg>
      );

    // === BIỂN PHỤ (Chữ nhật trắng) ===
    case 'S501': // Phạm vi tác dụng
      return (
        <svg width={size} height={size} viewBox="0 0 120 70">
          <rect x="5" y="5" width="110" height="60" rx="4" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />
          <path d="M 22 25 L 14 35 L 22 45 M 14 35 L 106 35 M 98 25 L 106 35 L 98 45" stroke="#0f172a" strokeWidth="3" fill="none" strokeLinecap="round" />
          <text x="60" y="30" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0f172a">500 m</text>
        </svg>
      );

    case 'S502': // Khoảng cách
      return (
        <svg width={size} height={size} viewBox="0 0 120 70">
          <rect x="5" y="5" width="110" height="60" rx="4" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />
          <text x="60" y="42" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0f172a">200 m</text>
        </svg>
      );

    case 'S503a': // Hướng rẽ trái
      return (
        <svg width={size} height={size} viewBox="0 0 120 70">
          <rect x="5" y="5" width="110" height="60" rx="4" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />
          <path d="M 85 48 L 85 30 L 40 30 M 50 20 L 35 30 L 50 40" fill="none" stroke="#0f172a" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    default:
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="4" />
          <text x="50" y="58" textAnchor="middle" fontSize="16" fill="#64748b">Biển báo</text>
        </svg>
      );
  }
};
