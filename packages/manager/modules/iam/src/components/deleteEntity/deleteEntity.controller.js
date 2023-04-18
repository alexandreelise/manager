import { DELETE_STATEMENT, ENTITY } from '@iam/constants';
import { encodeUrn, entityResolve as entity } from '@iam/resolves';

export default class DeleteEntityController {
  /* @ngInject */
  constructor($q, PolicyService, ResourceGroupService) {
    this.$q = $q;
    this.PolicyService = PolicyService;
    this.ResourceGroupService = ResourceGroupService;

    /**
     * Whether the controller is currently deleting the entity
     * @type {boolean}
     */
    this.isDeleting = false;

    /**
     * The statement field's ng-model, needed to activate the form validation
     * @type {string}
     */
    this.model = '';

    /**
     * The pattern the user must type in the statement field to delete the entity
     * @type {RegExp}
     */
    this.pattern = new RegExp(`^${DELETE_STATEMENT}$`);
  }

  /**
   * Whether the controller can delete the entity
   * @returns {boolean}
   */
  get canDelete() {
    return !this.isDeleting && this.form?.$valid;
  }

  /**
   * The displayed name depends on the type of the entity
   * @returns {string}
   */
  get name() {
    const { data, type } = this[entity];
    if (type === ENTITY.IDENTITY) {
      return [...data.identity.components].pop();
    }
    return data.name;
  }

  /**
   * A contextualized Set where each key map to a translation
   * @returns {Object}
   */
  get translations() {
    const { type } = this[entity];
    return {
      error: `iam_delete_entity_${type}_error`,
      field: `iam_delete_entity_${type}_field`,
      heading: `iam_delete_entity_${type}_heading`,
      name: `iam_delete_entity_${type}_name`,
      success: `iam_delete_entity_${type}_success`,
      warn: `iam_delete_entity_${type}_warn`,
    };
  }

  /**
   * Close the current modal
   * @returns {Promise}
   */
  close() {
    return this.goBack({ params: true });
  }

  /**
   * Delete the entity
   * @returns {Promise}
   */
  delete() {
    const { type } = this[entity];
    let promise;

    if (type === ENTITY.IDENTITY) {
      promise = this.deletePolicyIdentity();
    } else if (type === ENTITY.POLICY) {
      promise = this.deletePolicy();
    } else if (type === ENTITY.RESOURCE_GROUP) {
      promise = this.deleteResourceGroup();
    } else if (this.entity.type === ENTITY.RESOURCE_TYPE) {
      promise = this.$q.when(true);
    } else {
      promise = this.$q.reject({ data: { message: 'Unknown entity type' } });
    }

    promise
      .then(() =>
        this.goBack({ success: this.translations.success, reload: true }),
      )
      .catch((error) => {
        const { message } = error.data ?? {};
        return this.goBack({
          error: { key: this.translations.error, values: { message } },
        });
      });

    this.isDeleting = true;

    return promise;
  }

  /**
   * Delete the entity using the PolicyService
   * @returns {Promise}
   */
  deletePolicy() {
    return this.PolicyService.deletePolicy(this[entity].data.id);
  }

  /**
   * Delete the identity using the PolicyService
   * @returns {Promise}
   */
  deletePolicyIdentity() {
    const { identity, policy } = this[entity].data;
    const encodedIdentity = encodeUrn(identity);
    return this.PolicyService.editIdentities(
      policy.id,
      policy.identities.filter((item) => item !== encodedIdentity),
    );
  }

  /**
   * Delete the entity using the ResourceGroupService
   * @returns {Promise}
   */
  deleteResourceGroup() {
    return this.ResourceGroupService.deleteResourceGroup(this[entity].data.id);
  }
}
