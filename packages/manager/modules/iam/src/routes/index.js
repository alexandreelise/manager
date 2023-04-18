import angular from 'angular';
import { snakeCase } from 'lodash-es';

import constants, { ROOTSCOPE_NS } from '@iam/constants';
import components from '@iam/components';
import resolves, {
  asParams,
  asResolve,
  noBreadcrumbResolve as noBreadcrumb,
} from '@iam/resolves';

import rootRoute from './root.route';

/**
 * Get the full state name (e.g. with the dots) of a route
 * @param  {...string} parts
 * @returns {string}
 */
const getStateName = (...parts) => parts.filter(Boolean).join('.');

/**
 * Set where all the keys represent the last state name part (e.g. after the last dot) of the route
 * in snake upper case and all the values are the full state name (e.g. with the dots) of the route
 * based on where the routes are placed in the route tree
 *
 * for instance:
 *
 * ROUTES = {
 *   IAM: 'iam',
 *   POLICY: 'iam.policy',
 *   POLICIES: 'iam.policy.policies,
 *   ...
 * }
 *
 * @type {Object<string, string>}
 */
const ROUTES = (() => {
  const recursiveROUTES = (routes, parentName) =>
    routes.reduce((routeConstants, { route: { name }, children = [] }) => {
      const stateName = getStateName(parentName, name);
      return {
        ...routeConstants,
        ...recursiveROUTES(children, stateName),
        [snakeCase(name.split('.').pop()).toUpperCase()]: stateName,
      };
    }, {});
  return recursiveROUTES(rootRoute);
})();

/**
 * Declare all the routes onto the given StateProvider instance using its state method
 * @param {Injector} $injector
 * @param {StateProvider} $stateProvider
 */
const declareRoutes = /* @ngInject */ ($injector, $stateProvider) => {
  const recursiveDeclareRoutes = (routes, parentName) => {
    routes.forEach(({ route, children = [] }) => {
      const {
        breadcrumb,
        component,
        name,
        params,
        resolves: routeResolves,
        ...stateParams
      } = route;
      const stateName = getStateName(parentName, name);

      $stateProvider.state(stateName, {
        ...stateParams,
        ...(component && { component: component.name }),
        ...(params && { params: asParams(params) }),
        resolve: asResolve([
          ...(component?.resolves || []),
          ...(resolves || []),
          breadcrumb ?? noBreadcrumb,
        ]),
      });

      recursiveDeclareRoutes(children, stateName);
    });
  };
  recursiveDeclareRoutes(rootRoute);
};

/**
 * Assign the ROUTES constants to the $rootScope
 * @param {RootScope} $rootScope
 */
const assignROUTES = /* @ngInject */ ($rootScope) =>
  Object.assign($rootScope, {
    [ROOTSCOPE_NS]: { ...$rootScope[ROOTSCOPE_NS], ROUTES },
  });

const moduleName = 'ovhManagerIAMRoutes';

angular
  .module(moduleName, [components, constants, resolves])
  .constant('IAMRoutes', ROUTES)
  .config(declareRoutes)
  .run(assignROUTES)
  .run(/* @ngTranslationsInject:json ./translations */);

export { ROUTES };
export default moduleName;
