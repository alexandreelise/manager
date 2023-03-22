export const PRICING_MODES = {
  DEFAULT: 'default',
  DEGRESSIVITY: 'degressivity',
  MONTHLY: 'monthly',
  UPFRONT: 'upfront',
};

export const AGREEMENTS = {
  EU: {
    termsOfService:
      'https://storage.gra.cloud.ovh.net/v1/AUTH_325716a587c64897acbef9a4a4726e38/contracts/2f391d2-contrat_genServices-FR-14.1.pdf',
    privacyPolicy: 'https://www.ovhcloud.com/fr/personal-data-protection/',
  },
  CA: {
    termsOfService:
      'https://storage.gra.cloud.ovh.net/v1/AUTH_325716a587c64897acbef9a4a4726e38/contracts/2f391d2-contrat_genServices-FR-14.1.pdf',
    privacyPolicy: 'https://www.ovhcloud.com/fr/personal-data-protection/',
  },
  US: {
    termsOfService: 'https://us.ovhcloud.com/legal/terms-of-service',
    privacyPolicy: 'https://us.ovhcloud.com/legal/privacy-policy',
  },
};

export const RANGES = {
  BESTVALUE: 'bv',
  COMFORT: 'Comfort',
  ESSENTIAL: 'Essential',
  ELITE: 'Elite',
  STARTER: 'Starter',
  VALUE: 'Value',
};

export default { PRICING_MODES, RANGES, AGREEMENTS };
