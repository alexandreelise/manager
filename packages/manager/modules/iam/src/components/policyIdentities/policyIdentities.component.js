import {
  alertResolve as alert,
  goBackResolve as goBack,
  goToResolve as goTo,
  onboardingGuidesResolve as onboardingGuides,
  policyParamResolve as policy,
  reloadResolve as reload,
} from '@iam/resolves';

import controller from './policyIdentities.controller';
import template from './policyIdentities.template.html';

export default {
  name: 'iamPolicyIdentities',
  resolves: [alert, goBack, goTo, onboardingGuides, policy, reload],
  controller,
  template,
};
