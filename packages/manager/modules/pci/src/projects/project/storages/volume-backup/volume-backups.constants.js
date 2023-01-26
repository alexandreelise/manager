export const VOLUME_BACKUP_ROOT_STATE =
  'pci.projects.project.storages.volume-backup';

export const VOLUME_BACKUP_ROUTES = {
  ROOT: { STATE: VOLUME_BACKUP_ROOT_STATE, URL: '/volume-backup' },
  ADD: {
    STATE: `${VOLUME_BACKUP_ROOT_STATE}.add`,
    URL: '/create',
  },
  ONBOARDING: {
    STATE: `${VOLUME_BACKUP_ROOT_STATE}.onboarding`,
    URL: '/onboarding',
  },
  DASHBOARD: {
    STATE: `${VOLUME_BACKUP_ROOT_STATE}.dashboard`,
    URL: '/dashboard',
  },
};

export const VOLUME_BACKUP_STATUS = {
  CREATING: 'creating',
  DELETING: 'deleting',
  ERROR: 'error',
  OK: 'ok',
  RESTORING: 'restoring',
};

export const VOLUME_BACKUP_POLLER_NAMESPACES = {
  CHANGING: 'pci.projects.project.storages.volume-backup',
};

export const VOLUME_BACKUP_DEFAULT_REGION = 'RBX';

export const VOLUME_BACKUP_TRACKING = {
  PREFIX: 'volume-backup',
};

export const GUIDES = [
  {
    id: 'overview',
    links: {
      DEFAULT: 'https://docs.ovh.com/en-gb/public-cloud/volume-backup/',
      ES: 'https://docs.ovh.com/es/public-cloud/volume-backup/',
      FR: 'https://docs.ovh.com/fr/public-cloud/volume-backup/',
      GB: 'https://docs.ovh.com/en-gb/public-cloud/volume-backup/',
      IT: 'https://docs.ovh.com/it/public-cloud/volume-backup/',
      NL: 'https://docs.ovh.com/nl/public-cloud/volume-backup/',
      PL: 'https://docs.ovh.com/pl/public-cloud/volume-backup/',
      PT: 'https://docs.ovh.com/pt/public-cloud/volume-backup/',
      US: 'https://docs.ovh.com/en-us/public-cloud/volume-backup/',
    },
  },
];

export default {
  VOLUME_BACKUP_ROUTES,
  VOLUME_BACKUP_STATUS,
  VOLUME_BACKUP_POLLER_NAMESPACES,
  VOLUME_BACKUP_DEFAULT_REGION,
  VOLUME_BACKUP_TRACKING,
  GUIDES,
};
