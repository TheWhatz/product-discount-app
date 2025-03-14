export function formatPrice(price: number | null): string {
  if (price) {
    return new Intl.NumberFormat("th-TH", {
      maximumFractionDigits: 0,
    }).format(price);
  } else {
    return "";
  }
}
