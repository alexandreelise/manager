import {
  onboardingGuidesResolve as onboardingGuides,
  usersManagementLinkResolve as usersManagementLink,
} from '@iam/resolves';
import template from './onboarding.template.html';

export default {
  name: 'iamOnboarding',
  resolves: [onboardingGuides, usersManagementLink],
  template,
};
