import angular from 'angular';

import * as breadcrumbs from './breadcrumbs.resolve';
import * as guides from './guides.resolve';
import * as misc from './misc.resolve';
import * as params from './params.resolve';

import types from './types';

/**
 * Cast the passed object to an array
 * @param {any} object
 * @returns {Array}
 */
const castArray = (object) => (Array.isArray(object) ? object : [object]);

/**
 * Build a Set where all the keys represent the key property of each resolve function
 * and the values are the one-way angular binding symbole (e.g. '<')
 * @param {Function|Function[]} resolves
 * @returns {Object<string, '<'>}
 */
const asBindings = (resolves) =>
  castArray(resolves).reduce((map, res) => ({ ...map, [res]: '<' }), {});

/**
 * Build a Set where all the keys represent the key property of each resolve function
 * and the values are the resolve function itself
 * @param {Function|Function[]} resolves
 * @returns {Object<string, function>}
 */
const asResolve = (resolves) =>
  castArray(resolves).reduce(
    (map, res) => ({
      ...map,
      ...asResolve(res.resolves ?? []),
      [res]: res,
    }),
    {},
  );


/**
 * Build a Set where all the keys represent the key property of each resolve function
 * and the values are the resolve's declaration object
 * @see https://ui-router.github.io/ng1/docs/latest/interfaces/params.paramdeclaration.html
 * @param {Function|Function[]} resolves
 * @returns {Object<string, ParamDeclaration>}
 */
const asParams = (resolves) =>
  castArray(resolves).reduce(
    (map, { key, declaration, resolves: paramResolves }) => ({
      ...map,
      ...asParams(paramResolves ?? []),
      [key]: declaration,
    }),
    {},
  );

/**
 * Register each param type onto the given $urlMatcherFactoryProvider
 * @see https://ui-router.github.io/ng1/docs/latest/interfaces/params.paramdeclaration.html#type
 * @see https://ui-router.github.io/ng1/docs/latest/interfaces/params.paramtypedefinition.html
 * @param {UrlMatcherFactoryProvider} $urlMatcherFactoryProvider
 */
const registerTypes = /* @ngInject */ ($urlMatcherFactoryProvider) =>
  Object.values(types).forEach(({ type, ...definition }) =>
    $urlMatcherFactoryProvider.type(type, definition),
  );

/**
 * Overwrite the toString method of each resolve
 * It can be written like this
 *
 * { [myResolve]: value }
 * `/path/to/resource?${myResolve}`
 *
 * Augment each resolve with a toTypeString method
 * It can be written like this in a url
 *
 * Input  `/path/to/${myResolve.toTypeString()}/delete`
 * Output `/path/to/{myResolve:type}/delete` // if type is declared
 * Output `/path/to/:myResolve/delete` // if no type is declared
 */
[breadcrumbs, guides, misc, params].forEach((resolves) => {
  Object.values(resolves).forEach((resolve) => {
    const { key, declaration: { type } = {} } = resolve;
    Object.assign(resolve, {
      toString: () => key,
      toTypeString: () => (type ? `{${key}:${type}}` : `:${key}`),
    });
  });
});

const moduleName = 'ovhManagerIAMResolves';

angular
  .module(moduleName, [])
  .config(registerTypes)
  .run(/* @ngTranslationsInject:json ./translations */);

export * from './breadcrumbs.resolve';
export * from './guides.resolve';
export * from './misc.resolve';
export * from './params.resolve';
export * from './types';
export { asBindings, asResolve, asParams };
export default moduleName;
