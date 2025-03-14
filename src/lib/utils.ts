export function formatPrice(price: number, currency: string = "THB"): string {
  return new Intl.NumberFormat("th-TH", {
    maximumFractionDigits: 0,
  }).format(price);
}
