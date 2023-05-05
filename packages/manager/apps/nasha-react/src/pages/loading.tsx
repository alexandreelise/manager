import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Loading() {
  const { t } = useTranslation('nasha-react/');
  return (
    <p>
      <i>{t('nasha_loading')}</i>
    </p>
  );
}
