import angular from 'angular';
import angularTranslate from 'angular-translate';
import uiRouter from '@uirouter/angularjs';

import ngOvhFeatureFlipping from '@ovh-ux/ng-ovh-feature-flipping';
import ngOvhUtils from '@ovh-ux/ng-ovh-utils';
import { OnboardingLayoutHelper } from '@ovh-ux/manager-ng-layout-helpers';
import uiKit from '@ovh-ux/ui-kit';

import components from '@iam/components';
import constants from '@iam/constants';
import resolves from '@iam/resolves';
import routes from '@iam/routes';
import services from '@iam/services';

import '@ovh-ux/ui-kit/dist/css/oui.css';
import 'ovh-ui-kit-bs/dist/css/oui-bs3.css';

const configApiv2 = /* @ngInject */ (Apiv2ServiceProvider) => {
  Apiv2ServiceProvider.setBaseUrl('iam');
};

const moduleName = 'ovhManagerIAM';

angular
  .module(moduleName, [
    angularTranslate,
    uiRouter,
    ngOvhFeatureFlipping,
    ngOvhUtils,
    OnboardingLayoutHelper,
    uiKit,
    components,
    constants,
    resolves,
    routes,
    services,
  ])
  .config(configApiv2);

export default moduleName;
