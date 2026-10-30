export interface RoadSign {
  id: string;
  code: string;
  name: string;
  category: 'CAM' | 'NGUY_HIEM' | 'HIEU_LENH' | 'CHI_DAN' | 'PHU';
  categoryName: string;
  description: string;
  shape: 'circle' | 'triangle' | 'rectangle';
  svgType: string;
}

export const ROAD_SIGN_CATEGORIES = [
  { id: 'ALL', name: 'Tất cả biển báo' },
  { id: 'CAM', name: 'Biển báo cấm (P)' },
  { id: 'NGUY_HIEM', name: 'Biển cảnh báo nguy hiểm (W)' },
  { id: 'HIEU_LENH', name: 'Biển hiệu lệnh (R)' },
  { id: 'CHI_DAN', name: 'Biển chỉ dẫn (I)' },
  { id: 'PHU', name: 'Biển phụ (S)' },
];

export const ROAD_SIGNS_DATA: RoadSign[] = [
  // --- 1. BIỂN BÁO CẤM (P) ---
  {
    id: 'P.101',
    code: 'P.101',
    name: 'Đường cấm',
    category: 'CAM',
    categoryName: 'Biển báo cấm',
    description: 'Báo đường cấm tất cả các loại phương tiện (cơ giới và thô sơ) đi lại cả hai hướng, trừ các xe được ưu tiên theo quy định.',
    shape: 'circle',
    svgType: 'P101'
  },
  {
    id: 'P.102',
    code: 'P.102',
    name: 'Cấm đi ngược chiều',
    category: 'CAM',
    categoryName: 'Biển báo cấm',
    description: 'Báo đường cấm tất cả các loại xe (cơ giới và thô sơ) đi vào theo chiều đặt biển, trừ các xe được ưu tiên theo quy định.',
    shape: 'circle',
    svgType: 'P102'
  },
  {
    id: 'P.103a',
    code: 'P.103a',
    name: 'Cấm xe ô tô',
    category: 'CAM',
    categoryName: 'Biển báo cấm',
    description: 'Báo đường cấm tất cả các loại xe cơ giới kể cả môtô 3 bánh có thùng đi qua, trừ môtô hai bánh, xe gắn máy và các xe được ưu tiên.',
    shape: 'circle',
    svgType: 'P103a'
  },
  {
    id: 'P.104',
    code: 'P.104',
    name: 'Cấm xe mô tô',
    category: 'CAM',
    categoryName: 'Biển báo cấm',
    description: 'Báo đường cấm tất cả các loại môtô đi qua, trừ các xe môtô được ưu tiên theo quy định. Biển không có giá trị cấm xe gắn máy.',
    shape: 'circle',
    svgType: 'P104'
  },
  {
    id: 'P.106a',
    code: 'P.106a',
    name: 'Cấm xe ô tô tải',
    category: 'CAM',
    categoryName: 'Biển báo cấm',
    description: 'Báo đường cấm tất cả các loại xe ôtô tải có khối lượng chuyên chở cho phép từ 1.5 tấn trở lên trừ các xe ưu tiên.',
    shape: 'circle',
    svgType: 'P106a'
  },
  {
    id: 'P.123a',
    code: 'P.123a',
    name: 'Cấm rẽ trái',
    category: 'CAM',
    categoryName: 'Biển báo cấm',
    description: 'Báo cấm rẽ trái (theo hướng mũi tên chỉ) ở những vị trí đường giao nhau. Biển cấm rẽ trái KHÔNG cấm quay đầu xe (theo QCVN 41:2019/BGTVT).',
    shape: 'circle',
    svgType: 'P123a'
  },
  {
    id: 'P.124a',
    code: 'P.124a',
    name: 'Cấm quay đầu xe',
    category: 'CAM',
    categoryName: 'Biển báo cấm',
    description: 'Báo cấm các loại xe (cơ giới và thô sơ) quay đầu (theo kiểu chữ U), trừ các xe được ưu tiên theo quy định.',
    shape: 'circle',
    svgType: 'P124a'
  },
  {
    id: 'P.125',
    code: 'P.125',
    name: 'Cấm vượt',
    category: 'CAM',
    categoryName: 'Biển báo cấm',
    description: 'Báo cấm các loại xe cơ giới vượt nhau, kể cả xe được ưu tiên theo quy định. Được phép vượt môtô 2 bánh, xe gắn máy.',
    shape: 'circle',
    svgType: 'P125'
  },
  {
    id: 'P.127',
    code: 'P.127',
    name: 'Tốc độ tối đa cho phép (50 km/h)',
    category: 'CAM',
    categoryName: 'Biển báo cấm',
    description: 'Báo tốc độ tối đa cho phép các xe cơ giới chạy. Các phương tiện không được vượt quá chỉ số ghi trên biển.',
    shape: 'circle',
    svgType: 'P127'
  },
  {
    id: 'P.130',
    code: 'P.130',
    name: 'Cấm dừng xe và đỗ xe',
    category: 'CAM',
    categoryName: 'Biển báo cấm',
    description: 'Báo nơi cấm dừng xe và đỗ xe. Biển có hiệu lực cấm các loại xe cơ giới dừng và đỗ ở phía đường đặt biển.',
    shape: 'circle',
    svgType: 'P130'
  },
  {
    id: 'P.131a',
    code: 'P.131a',
    name: 'Cấm đỗ xe',
    category: 'CAM',
    categoryName: 'Biển báo cấm',
    description: 'Báo nơi cấm đỗ xe của các loại xe cơ giới, nhưng ĐƯỢC PHÉP dừng xe để đón trả khách hoặc bốc dỡ hàng hóa trong thời gian ngắn.',
    shape: 'circle',
    svgType: 'P131a'
  },

  // --- 2. BIỂN CẢNH BÁO NGUY HIỂM (W) ---
  {
    id: 'W.201a',
    code: 'W.201a',
    name: 'Chỗ ngoặt nguy hiểm vòng bên trái',
    category: 'NGUY_HIEM',
    categoryName: 'Biển nguy hiểm',
    description: 'Báo trước sắp đến một chỗ ngoặt nguy hiểm vòng sang phía bên trái. Người lái xe phải giảm tốc độ và quan sát.',
    shape: 'triangle',
    svgType: 'W201a'
  },
  {
    id: 'W.205a',
    code: 'W.205a',
    name: 'Đường giao nhau cùng mức',
    category: 'NGUY_HIEM',
    categoryName: 'Biển nguy hiểm',
    description: 'Báo trước sắp đến nơi giao nhau cùng mức của các tuyến đường cùng cấp (ngã tư). Xe bên phải không vướng có quyền đi trước.',
    shape: 'triangle',
    svgType: 'W205a'
  },
  {
    id: 'W.207a',
    code: 'W.207a',
    name: 'Giao nhau với đường không ưu tiên',
    category: 'NGUY_HIEM',
    categoryName: 'Biển nguy hiểm',
    description: 'Đặt trên đường ưu tiên để báo trước sắp đến nơi giao nhau với đường không ưu tiên. Xe đi trên đường này được quyền ưu tiên qua nơi giao nhau.',
    shape: 'triangle',
    svgType: 'W207a'
  },
  {
    id: 'W.208',
    code: 'W.208',
    name: 'Giao nhau với đường ưu tiên',
    category: 'NGUY_HIEM',
    categoryName: 'Biển nguy hiểm',
    description: 'Đặt trên đường không ưu tiên, báo trước sắp đến nơi giao nhau với đường ưu tiên. Phải nhường đường cho các xe trên đường ưu tiên.',
    shape: 'triangle',
    svgType: 'W208'
  },
  {
    id: 'W.209',
    code: 'W.209',
    name: 'Giao nhau có tín hiệu đèn',
    category: 'NGUY_HIEM',
    categoryName: 'Biển nguy hiểm',
    description: 'Báo trước nơi giao nhau có đèn tín hiệu điều khiển giao thông. Đặt ở nơi đèn tín hiệu bị che khuất hoặc trên đường có tốc độ cao.',
    shape: 'triangle',
    svgType: 'W209'
  },
  {
    id: 'W.210',
    code: 'W.210',
    name: 'Giao nhau với đường sắt có rào chắn',
    category: 'NGUY_HIEM',
    categoryName: 'Biển nguy hiểm',
    description: 'Báo trước sắp đến nơi giao nhau giữa đường bộ và đường sắt có rào chắn kín hoặc rào chắn nửa kín và có nhân viên gác.',
    shape: 'triangle',
    svgType: 'W210'
  },
  {
    id: 'W.211a',
    code: 'W.211a',
    name: 'Giao nhau với đường sắt không có rào chắn',
    category: 'NGUY_HIEM',
    categoryName: 'Biển nguy hiểm',
    description: 'Báo trước sắp đến nơi giao nhau giữa đường bộ và đường sắt không có rào chắn và không có người gác.',
    shape: 'triangle',
    svgType: 'W211a'
  },
  {
    id: 'W.225',
    code: 'W.225',
    name: 'Trẻ em qua đường',
    category: 'NGUY_HIEM',
    categoryName: 'Biển nguy hiểm',
    description: 'Báo trước gần đến đoạn đường thường có trẻ em đi ngang qua hoặc tụ tập trên đường như trường học, sân chơi thiếu nhi.',
    shape: 'triangle',
    svgType: 'W225'
  },
  {
    id: 'W.227',
    code: 'W.227',
    name: 'Công trường đang thi công',
    category: 'NGUY_HIEM',
    categoryName: 'Biển nguy hiểm',
    description: 'Báo trước gần đến đoạn đường đang tiến hành sửa chữa, cải tạo hoặc có công trình xây dựng. Người lái xe phải giảm tốc độ.',
    shape: 'triangle',
    svgType: 'W227'
  },

  // --- 3. BIỂN HIỆU LỆNH (R) ---
  {
    id: 'R.301a',
    code: 'R.301a',
    name: 'Các xe chỉ được đi thẳng',
    category: 'HIEU_LENH',
    categoryName: 'Biển hiệu lệnh',
    description: 'Các xe chỉ được đi thẳng (trừ xe được quyền ưu tiên theo quy định). Biển đặt trước nơi đường giao nhau.',
    shape: 'circle',
    svgType: 'R301a'
  },
  {
    id: 'R.301b',
    code: 'R.301b',
    name: 'Các xe chỉ được rẽ phải',
    category: 'HIEU_LENH',
    categoryName: 'Biển hiệu lệnh',
    description: 'Các xe chỉ được phép rẽ phải ở nơi đường giao nhau tiếp sau biển.',
    shape: 'circle',
    svgType: 'R301b'
  },
  {
    id: 'R.302a',
    code: 'R.302a',
    name: 'Hướng phải đi vòng chướng ngại vật (bên phải)',
    category: 'HIEU_LENH',
    categoryName: 'Biển hiệu lệnh',
    description: 'Báo các loại xe đi vòng sang phía bên phải để tránh chướng ngại vật hoặc đảo an toàn trên đường.',
    shape: 'circle',
    svgType: 'R302a'
  },
  {
    id: 'R.303',
    code: 'R.303',
    name: 'Nơi giao nhau chạy theo vòng xuyến',
    category: 'HIEU_LENH',
    categoryName: 'Biển hiệu lệnh',
    description: 'Báo hiệu nơi giao nhau có bố trí đảo an toàn ở giữa và các xe phải chạy vòng quanh đảo an toàn theo chiều mũi tên. Khi vào vòng xuyến phải nhường đường cho xe từ bên trái.',
    shape: 'circle',
    svgType: 'R303'
  },
  {
    id: 'R.306',
    code: 'R.306',
    name: 'Tốc độ tối thiểu cho phép (60 km/h)',
    category: 'HIEU_LENH',
    categoryName: 'Biển hiệu lệnh',
    description: 'Báo tốc độ tối thiểu cho phép các xe cơ giới chạy. Các phương tiện cơ giới không được phép chạy với tốc độ nhỏ hơn trị số ghi trên biển.',
    shape: 'circle',
    svgType: 'R306'
  },

  // --- 4. BIỂN CHỈ DẪN (I) ---
  {
    id: 'I.401',
    code: 'I.401',
    name: 'Bắt đầu đường ưu tiên',
    category: 'CHI_DAN',
    categoryName: 'Biển chỉ dẫn',
    description: 'Biển hình thoi viền đen nền vàng, chỉ dẫn cho người lái xe biết mình đang đi trên tuyến đường được ưu tiên qua các nơi giao nhau.',
    shape: 'rectangle',
    svgType: 'I401'
  },
  {
    id: 'I.402',
    code: 'I.402',
    name: 'Hết đoạn đường ưu tiên',
    category: 'CHI_DAN',
    categoryName: 'Biển chỉ dẫn',
    description: 'Biển hình thoi gạch chéo đen, báo hiệu hết đoạn đường được quyền ưu tiên.',
    shape: 'rectangle',
    svgType: 'I402'
  },
  {
    id: 'I.407a',
    code: 'I.407a',
    name: 'Đường một chiều',
    category: 'CHI_DAN',
    categoryName: 'Biển chỉ dẫn',
    description: 'Chỉ dẫn những đoạn đường chỉ cho phép các phương tiện đi theo một chiều xác định theo hướng mũi tên.',
    shape: 'rectangle',
    svgType: 'I407a'
  },
  {
    id: 'I.409',
    code: 'I.409',
    name: 'Khu vực quay xe',
    category: 'CHI_DAN',
    categoryName: 'Biển chỉ dẫn',
    description: 'Chỉ dẫn vị trí hoặc khu vực được phép quay đầu xe kiểu chữ U. Biển không cấm rẽ trái.',
    shape: 'rectangle',
    svgType: 'I409'
  },
  {
    id: 'I.423a',
    code: 'I.423a',
    name: 'Vị trí người đi bộ sang ngang',
    category: 'CHI_DAN',
    categoryName: 'Biển chỉ dẫn',
    description: 'Chỉ dẫn cho người lái xe và người đi bộ biết vị trí dành cho người đi bộ sang đường.',
    shape: 'rectangle',
    svgType: 'I423a'
  },
  {
    id: 'I.428',
    code: 'I.428',
    name: 'Trạm cấp cứu',
    category: 'CHI_DAN',
    categoryName: 'Biển chỉ dẫn',
    description: 'Chỉ dẫn nơi có trạm cấp cứu y tế hoặc bệnh viện gần đường.',
    shape: 'rectangle',
    svgType: 'I428'
  },

  // --- 5. BIỂN PHỤ (S) ---
  {
    id: 'S.501',
    code: 'S.501',
    name: 'Phạm vi tác dụng của biển',
    category: 'PHU',
    categoryName: 'Biển phụ',
    description: 'Đặt dưới các biển cấm hoặc biển hiệu lệnh để thông báo cự ly hoặc chiều dài đoạn đường có hiệu lực áp dụng (ví dụ: 500m).',
    shape: 'rectangle',
    svgType: 'S501'
  },
  {
    id: 'S.502',
    code: 'S.502',
    name: 'Khoảng cách đến đối tượng báo hiệu',
    category: 'PHU',
    categoryName: 'Biển phụ',
    description: 'Thông báo khoảng cách từ vị trí đặt biển đến nơi bắt đầu áp dụng hiệu lực hoặc đến đối tượng cần cảnh báo.',
    shape: 'rectangle',
    svgType: 'S502'
  },
  {
    id: 'S.503a',
    code: 'S.503a',
    name: 'Hướng tác dụng của biển (Rẽ trái)',
    category: 'PHU',
    categoryName: 'Biển phụ',
    description: 'Đặt bên dưới biển chính để chỉ hướng tác dụng của biển theo hướng rẽ trái.',
    shape: 'rectangle',
    svgType: 'S503a'
  }
];
