import { FEATURE, UNAVAILABLE_STATE_NAME } from '@iam/constants';
import { iam as component } from '@iam/components';
import {
  featuresResolve as features,
  defaultBreadcrumbResolve as breadcrumb,
} from '@iam/resolves';

export default {
  breadcrumb,
  component,
  name: 'iam',
  redirectTo: (transition) => {
    const injector = transition.injector();
    const IAMRoutes = injector.get('IAMRoutes');
    return transition
      .injector()
      .getAsync(`${features}`)
      .then((featureAvailabilityResult) =>
        featureAvailabilityResult.isFeatureAvailable(FEATURE.MAIN)
          ? IAMRoutes.POLICY
          : { state: UNAVAILABLE_STATE_NAME },
      );
  },
  resolves: [features],
  url: '/iam',
};
