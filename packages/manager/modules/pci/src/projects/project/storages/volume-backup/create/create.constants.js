export const VOLUME_OPTION_SNAPSHOT = 'SNAPSHOT';

export const VOLUME_OPTION_BACKUP = 'BACKUP';

export const VOLUMES_OPTIONS = [
  { id: 'volume_snapshot', type: VOLUME_OPTION_SNAPSHOT },
  { id: 'volume_backup', type: VOLUME_OPTION_BACKUP },
];

export const VOLUME_BACKUP_NAME_PREFIX = 'volume-backup';

export default {
  VOLUME_OPTION_SNAPSHOT,
  VOLUME_OPTION_BACKUP,
  VOLUMES_OPTIONS,
  VOLUME_BACKUP_NAME_PREFIX,
};
