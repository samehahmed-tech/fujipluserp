import { useLocalization } from './useLocalization';

export const useCurrency = () => {
  const { locale } = useLocalization();

  const formatCurrency = (value: number) => {
    // ar-EG will format it correctly for Egypt (e.g., ١٢٬٣٤٥٫٠٠ ج.م.‏)
    return new Intl.NumberFormat(locale === 'ar' ? 'ar-EG' : 'en-US', {
      style: 'currency',
      currency: 'EGP',
    }).format(value);
  };

  return { formatCurrency };
};
