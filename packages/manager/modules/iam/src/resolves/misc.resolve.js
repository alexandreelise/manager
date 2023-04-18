import FeatureAvailabilityResult from '@ovh-ux/ng-ovh-feature-flipping/src/feature-availability-result.class';

import { ALERT_ID, ENTITY, FEATURE } from '@iam/constants';
import {
  policyParamResolve,
  identityParamResolve,
  resourceGroupParamResolve,
} from './params.resolve';

// ---------------------------------------------------------------------------------------------------- //

/**
 * Display a Alerter message
 * @returns {{
 *   success: (key: string, values?: { [x: string]: any }) => void
 *   error: (key, values?: { [x: string]: any }) => void
 * }}
 */
const alertResolve = /* @ngInject */ ($translate, Alerter) => ({
  success: (key, values) =>
    Alerter.success($translate.instant(key, values), ALERT_ID),
  error: (key, values) =>
    Alerter.error($translate.instant(key, values), ALERT_ID),
});

alertResolve.key = 'alert';

// ---------------------------------------------------------------------------------------------------- //

/**
 * A polymorphic DTO
 * The type of the entity it carries can be identified by its "type" property
 * To add a new type :
 *   1. Add a new entity type to the ENTITY constant
 *   2. Add the corresponding resolve to the "resolves" array
 *   3. Inject the corresponding resolve into the arguments
 *   4. Make the function return the resolved data with the "data" property
 *      and the entity type with the "type" property
 * @returns {{
 *   data: Object,
 *   type: string
 * }|null}
 */
const entityResolve = /* @ngInject */ (policy, identity, resourceGroup) => {
  if (identity && policy) {
    return {
      data: { policy, identity },
      type: ENTITY.IDENTITY,
    };
  }
  if (policy) {
    return {
      data: policy,
      type: ENTITY.POLICY,
    };
  }
  if (resourceGroup) {
    return {
      data: resourceGroup,
      type: ENTITY.RESOURCE_GROUP,
    };
  }
  return null;
};

entityResolve.key = 'entity';
entityResolve.resolves = [
  identityParamResolve,
  policyParamResolve,
  resourceGroupParamResolve,
];

// ---------------------------------------------------------------------------------------------------- //

/**
 * FeatureAvailability instance based on the FEATURE constant
 * @returns {FeatureAvailabilityResult}
 */
const featuresResolve = /* @ngInject */ (ovhFeatureFlipping) =>
  ovhFeatureFlipping
    .checkFeatureAvailability(Object.values(FEATURE))
    .catch(() => new FeatureAvailabilityResult());

featuresResolve.key = 'features';

// ---------------------------------------------------------------------------------------------------- //

/**
 * Go to a specific IAM state
 * @param {string} name The state.go name
 * @param {string|boolean} params The state.go params. If true is passed as params,
 *                                then all the current params are passed
 * @param {boolean} reload The state.go reload option
 * @param {string | { key: string, values: { [x: string]: any }}} success The success message to display
 * @param {string | { key: string, values: { [x: string]: any }}} error The error message to display
 */
const goToResolve = /* @ngInject */ ($state, alert) => ({
  name,
  params,
  reload,
  success,
  error,
}) => {
  const stateParams = params === true ? $state.current.params : params;
  const options = {
    ...(typeof reload !== 'undefined' && { reload }),
  };
  return $state.go(name, stateParams, options).then((result) => {
    if (success) {
      alert.success(success.key || success, success.values);
    } else if (error) {
      alert.error(error.key || error, error.values);
    }
    return result;
  });
};

goToResolve.key = 'goTo';
goToResolve.resolves = [alertResolve];

// ---------------------------------------------------------------------------------------------------- //

/**
 * Go back to the previous state
 * @param {string} params The state.go params
 * @param {boolean} reload The state.go reload option
 * @param {string | { key: string, values: { [x: string]: any }}} success The success message to display
 * @param {string | { key: string, values: { [x: string]: any }}} error The error message to display
 */
const goBackResolve = /* @ngInject */ (goTo) => ({
  params,
  reload,
  success,
  error,
} = {}) => goTo({ params, reload, success, error, name: '^' });

goBackResolve.key = 'goBack';
goBackResolve.resolves = [goToResolve];

// ---------------------------------------------------------------------------------------------------- //

/**
 * Builds the url to go to the user management page
 * @returns {string}
 */
const usersManagementLinkResolve = /* @ngInject */ (coreURLBuilder) =>
  coreURLBuilder.buildURL('dedicated', '#/useraccount/users');

usersManagementLinkResolve.key = 'usersManagementLink';

// ---------------------------------------------------------------------------------------------------- //

/**
 * Reload the current state
 * @param {string} params The state.go params
 * @param {string | { key: string, values: { [x: string]: any }}} success The success message to display
 * @param {string | { key: string, values: { [x: string]: any }}} error The error message to display
 */
const reloadResolve = /* @ngInject */ (goTo) => ({
  params,
  success,
  error,
} = {}) => goTo({ params, reload: true, success, error, name: '.' });

reloadResolve.key = 'reload';
reloadResolve.resolves = [goToResolve];

// ---------------------------------------------------------------------------------------------------- //

/**
 * Whether the entity requires a statement
 * @returns {boolean}
 */
const statementResolve = /* @ngInject */ (entity) =>
  [ENTITY.POLICY].includes(entity.type);

statementResolve.key = 'statement';
statementResolve.resolves = [entityResolve];

// ---------------------------------------------------------------------------------------------------- //

export {
  alertResolve,
  entityResolve,
  featuresResolve,
  goBackResolve,
  goToResolve,
  reloadResolve,
  statementResolve,
  usersManagementLinkResolve,
};
