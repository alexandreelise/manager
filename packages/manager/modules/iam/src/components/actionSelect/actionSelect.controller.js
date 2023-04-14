import { cloneDeep } from 'lodash-es';
import ActionTrees from './ActionTrees.class';

export default class ActionSelectController {
  /* @ngInject */
  constructor($attrs, $scope, $timeout, $translate, ReferenceService) {
    this.$attrs = $attrs;
    this.$scope = $scope;
    this.$timeout = $timeout;
    this.$translate = $translate;
    this.ReferenceService = ReferenceService;

    /**
     * List of actions
     * @type {Object[]}
     */
    this.actions = [];

    /**
     * Group each action into categories and each category into resource types
     * So it can be displayed as collapsible components
     * @type {ActionTrees=}
     */
    this.actionTrees = undefined;

    /**
     * The custom action's model
     * @type {string}
     */
    this.customActionModel = '';

    /**
     * The custom action's success message, if any
     * @type {string}
     */
    this.customActionSuccessMessage = '';

    /**
     * The NgFormController created by the template by using name="$ctrl.form"
     * @type {NgFormController}
     */
    this.form = null;

    /**
     * Whether the controller is loading
     * @type {boolean}
     */
    this.isLoading = false;

    /**
     * Whether all the wildcard switch is active
     * @type {boolean}
     */
    this.isWildcardActive = false;

    /**
     * The main form's name
     * @type {string}
     */
    this.name = 'actions';

    /**
     * Whether the select is required
     * @type {boolean}
     */
    this.required = false;

    /**
     * The input size attribute
     * @type {string}
     */
    this.size = 'xl';

    /**
     * The snapshot of the user selection
     * @type {ActionTrees=}
     */
    this.snapshot = undefined;
  }

  /**
   * Whether the entered custom action can be added
   * @returns {boolean}
   */
  get canAddCustomAction() {
    return this.customActionModel?.length && this.form?.customAction.$valid;
  }

  /**
   * Whether the whole form is required from a user perspective
   * @returns {boolean}
   */
  get isRequired() {
    if (this.form) {
      const { [this.name]: name } = this.form;
      return name.$dirty && name.$invalid;
    }
    return false;
  }

  $onChanges(changes) {
    Object.entries(changes).forEach(([key, { currentValue: value }]) => {
      switch (key) {
        case 'required':
          this.required = value
            ? value === 'true'
            : Boolean(this.$attrs.$attr.required);
          break;

        case 'ngModel':
          // Wildcard case
          if (value?.length === 1 && value[0].action === '*') {
            this.isWildcardActive = true;
          }
          // Classic case of action list
          else if (value) {
            this.isWildcardActive = false;
            this.createActionTrees();
          }
          // The ngModel is not defined yet
          else {
            this.actionTrees = undefined;
          }
          break;

        case 'resourceTypes':
          this.resourceTypes = value;
          this.createActionTrees();
          break;

        default:
          this[key] = value;
      }
    });
  }

  $onInit() {
    this.isLoading = true;
    return this.ReferenceService.getActions()
      .then((actions) => {
        this.actions = cloneDeep(actions);
        this.createActionTrees();
        this.load({ actions });
      })
      .catch((error) => {
        this.error({ error });
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  $postLink() {
    const { customAction, [this.name]: name } = this.form;

    // Custom required validator for the whole component
    name.$validators.required = () =>
      this.required ? this.ngModel.length > 0 : false;

    // Custom exist validator to know if a custom action already exists
    customAction.$validators.exist = (action) =>
      !this.actionTrees?.isActionSelected(action);
  }

  /**
   * Add the user entered custom action to the model
   * - If the action does not exist, create a custom one and select it
   * - If the action already exist and is not selected, select it wherever it is
   */
  addCustomAction() {
    const { customActionModel: actionValue } = this;
    const { instant: $t } = this.$translate;

    const key = 'iam_action_select';
    const successKey = `${key}_custom_action_success`;
    const { action, created } = this.actionTrees.addAction(actionValue);

    this.customActionModel = '';
    this.customActionSuccessMessage = created
      ? $t(`${successKey}_created`, { action: action.value })
      : $t(`${successKey}_selected`, {
          resourceType: $t(`${key}_action_${action.resourceType}_heading`),
          action: action.value,
        });

    this.onModelChanged();
  }

  /**
   * Re-format the action trees
   * @see {ActionTrees.create}
   */
  createActionTrees() {
    this.actionTrees = ActionTrees.create({
      $scope: this.$scope,
      actions: this.actions,
      actionTrees: this.actionTrees,
      resourceTypes: this.resourceTypes,
      selectedActions: this.ngModel,
    });
  }

  /**
   * Find the given action by its "action" key
   * @param {string} actionValue
   * @returns {{ action: string }|null}
   */
  findAction(actionValue) {
    return this.actions.find(({ action }) => action === actionValue);
  }

  /**
   * Nested form tags are not allowed, this is why we use a ngForm directive instead
   * to get access to the control instance. Nevertheless, multiple submit buttons do
   * not work also, this is why we have to handle the enter key manually
   * @param {KeyboardEvent} event
   */
  onCustomActionKeyPressed(event) {
    if (event.key.toLowerCase() === 'enter' && this.canAddCustomAction) {
      this.addCustomAction();
    }
  }

  /**
   * Set the required ngModel instance's value each time the model has changed
   * The ngModel is of type { action: string, resourceType?: string }[]
   * @param {{ action: string }[]} forcedModel
   */
  onModelChanged(forcedModel) {
    // Give time to the action selected flags to react on change
    this.$timeout(() => {
      const mappedSelection = this.actionTrees?.selection.map(
        ({ value: action, resourceType }) => ({ action, resourceType }),
      );

      this.requiredNgModel.$setViewValue(forcedModel || mappedSelection || []);

      // Run a manual validation
      const { customAction, [this.name]: name } = this.form;
      [customAction, name].forEach((control) => {
        control.$setDirty();
        control.$validate();
      });
    });
  }

  /**
   * Toggle a limited set of actions
   * @param {Action[]} actions
   */
  toggleActions(actions) {
    const areAllSelected = actions.reduce(
      (selected, action) => (selected === action.selected ? selected : null),
      actions[0].selected,
    );
    actions.forEach((action) =>
      Object.assign(action, {
        selected: areAllSelected === null ? true : !areAllSelected,
      }),
    );
    this.onModelChanged();
  }

  /**
   * Categories are not callapsibles because it is very buggy
   * Toggle a category as it was a collapsible
   * @param {Category} category
   * @param {boolean} force
   */
  toggleCategory(category, force) {
    Object.assign(category, {
      expanded: typeof force === 'boolean' ? force : !category.expanded,
    });
    // This hack is a way to force the parent collapsible to recalculate its height
    const [action] = category.actions;
    Object.assign(action, { value: `${action.value} ` });
    this.$timeout(() => {
      Object.assign(action, { value: action.value.slice(0, -1) });
    });
  }

  /**
   * Toggle the wilcard switch
   * - If active, it means we want now and futures actions => "*"
   * - If not, restore the previous model snapshot
   */
  toggleWildcard() {
    // Give time to isWildcardActive to react
    this.$timeout(() => {
      if (this.isWildcardActive) {
        if (this.actionTrees) {
          this.snapshot = cloneDeep(this.actionTrees);
        }
        this.onModelChanged([{ action: '*' }]);
      } else {
        if (this.snapshot) {
          this.actionTrees = cloneDeep(this.snapshot);
        }
        this.onModelChanged();
      }
    });
  }
}
