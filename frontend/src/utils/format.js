export function formatBaht(cents) {
  return (cents / 100).toLocaleString('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export const roastLabel = {
  light: 'คั่วอ่อน',
  medium: 'คั่วกลาง',
  dark: 'คั่วเข้ม',
};

export const processLabel = {
  washed: 'ล้าง (Washed)',
  natural: 'ตากแห้ง (Natural)',
  honey: 'ฮันนี่ (Honey)',
};

export function formatRoastDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('th-TH', { day: '2-digit', month: 'short', year: '2-digit' });
}
