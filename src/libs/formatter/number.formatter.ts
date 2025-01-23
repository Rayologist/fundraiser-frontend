export const currencyFormatter = new Intl.NumberFormat('zh-TW', {
  style: 'currency',
  maximumFractionDigits: 0,
  currency: 'TWD',
});

export const percentFormatter = new Intl.NumberFormat('zh-TW', {
  style: 'percent',
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export const decimalFormatter = new Intl.NumberFormat('zh-TW', {
  style: 'decimal', // default is 'decimal'
  maximumFractionDigits: 0,
});
