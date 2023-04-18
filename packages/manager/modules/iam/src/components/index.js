import angular from 'angular';

import resolvesModuleName, { asBindings } from '@iam/resolves';

import actionSelect from './actionSelect/actionSelect.component';
import createPolicy from './createPolicy/createPolicy.component';
import deleteEntity from './deleteEntity/deleteEntity.component';
import iam from './iam/iam.component';
import onboarding from './onboarding/onboarding.component';
import policies from './policies/policies.component';
import policy from './policy/policy.component';
import policyIdentities from './policyIdentities/policyIdentities.component';
import resourceGroups from './resourceGroups/resourceGroups.component';
import resourceSelect from './resourceSelect/resourceSelect.component';

import highlightText from './highlightText/highlightText.directive';

[
  actionSelect,
  createPolicy,
  deleteEntity,
  iam,
  onboarding,
  policies,
  policy,
  policyIdentities,
  resourceGroups,
  resourceSelect,
]
  .filter((component) => Boolean(component.resolves?.length))
  .forEach((component) =>
    Object.assign(component, {
      bindings: {
        ...asBindings(component.resolves),
        ...component.bindings,
      },
    }),
  );

const moduleName = 'ovhManagerIAMComponents';

angular
  .module(moduleName, [resolvesModuleName])
  .component(actionSelect.name, actionSelect)
  .component(createPolicy.name, createPolicy)
  .component(deleteEntity.name, deleteEntity)
  .component(iam.name, iam)
  .component(onboarding.name, onboarding)
  .component(policyIdentities.name, policyIdentities)
  .component(policies.name, policies)
  .component(policy.name, policy)
  .component(resourceGroups.name, resourceGroups)
  .component(resourceSelect.name, resourceSelect)
  .directive(highlightText.name, highlightText)
  .run(/*
    @ngTranslationsInject:json
      ./actionSelect/translations
      ./createPolicy/translations
      ./cursorDatagrid/translations
      ./deleteEntity/translations
      ./iam/translations
      ./onboarding/translations
      ./policyIdentities/translations
      ./policies/translations
      ./policy/translations
      ./resourceGroups/translations
      ./resourceSelect/translations
  */);

export {
  createPolicy,
  deleteEntity,
  iam,
  onboarding,
  policyIdentities,
  policies,
  policy,
  resourceGroups,
};
export default moduleName;
