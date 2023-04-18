import { onboardingGuidesResolve as onboardingGuides } from '@iam/resolves';

import template from './policy.template.html';

export default {
  name: 'iamPolicy',
  resolves: [onboardingGuides],
  template,
};
