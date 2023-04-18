import angular from 'angular';

import Apiv2ServiceProvider from './apiv2.provider';
import GuideService from './guide.service';
import IdentityService from './identity.service';
import PolicyService from './policy.service';
import ReferenceService from './reference.service';
import ResourceGroupService from './resourceGroup.service';
import ResourceService from './resource.service';

const moduleName = 'ovhManagerIAMServices';

angular
  .module(moduleName, [])
  .provider('Apiv2Service', Apiv2ServiceProvider)
  .service('GuideService', GuideService)
  .service('IdentityService', IdentityService)
  .service('PolicyService', PolicyService)
  .service('ReferenceService', ReferenceService)
  .service('ResourceGroupService', ResourceGroupService)
  .service('ResourceService', ResourceService)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
