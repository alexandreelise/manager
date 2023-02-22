import angular from 'angular';
import '@ovh-ux/ng-translate-async-loader';
import '@uirouter/angularjs';
import 'angular-translate';
import '@ovh-ux/ui-kit';

import routing from './list.routing';
import component from './list.component';

import deleteVolumeBackup from './delete';
import attachVolumeToInstance from './attach-volume';

const moduleName = 'ovhManagerPciProjectStoragesVolumeBackupList';

angular
  .module(moduleName, [
    'ui.router',
    'oui',
    'ngTranslateAsyncLoader',
    'pascalprecht.translate',
    deleteVolumeBackup,
    attachVolumeToInstance,
  ])
  .config(routing)
  .component('ovhManagerPciProjectsProjectStoragesVolumeBackupList', component)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;