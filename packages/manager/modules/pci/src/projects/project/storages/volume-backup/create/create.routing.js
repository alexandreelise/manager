import {
  VOLUME_BACKUP_ROUTES,
  VOLUME_BACKUP_TRACKING,
} from '../volume-backup.constants';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state(VOLUME_BACKUP_ROUTES.CREATE.STATE, {
    url: VOLUME_BACKUP_ROUTES.CREATE.URL,
    component: 'ovhManagerPciProjectsProjectStoragesVolumeBackupCreate',
    atInternet: {
      rename: `${VOLUME_BACKUP_TRACKING.PREFIX}`,
    },
    resolve: {
      breadcrumb: /* @ngInject */ ($translate) =>
        $translate.instant(
          'pci_projects_project_storages_volume_backup_create_breadcrumb',
        ),

      messageContainer: () => VOLUME_BACKUP_ROUTES.CREATE.STATE,

      volumeBackupModel: () => ({
        selected: {
          volume: null,
          volumeOption: null,
        },
        volumeRelatedInstance: null,
        name: '',
      }),

      volumes: /* @ngInject */ (projectId, VolumeBackupService) => {
        return VolumeBackupService.getVolumes(projectId);
      },

      attachVolumeToInstanceLink: /* @ngInject */ (projectId, $state) => {
        return $state.href(
          VOLUME_BACKUP_ROUTES.LIST.ROUTES.ATTACH_VOLUME.STATE,
          {
            projectId,
          },
        );
      },

      goToDetachVolume: /* @ngInject */ ($state, projectId) => (volume) => {
        return $state.go(
          VOLUME_BACKUP_ROUTES.CREATE.ROUTES.DETACH_VOLUME.STATE,
          {
            projectId,
            volume,
          },
        );
      },
    },
  });
};