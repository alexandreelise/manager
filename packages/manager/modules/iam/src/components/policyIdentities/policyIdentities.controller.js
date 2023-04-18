import {
  decodeUrn,
  encodeUrn,
  alertResolve as alert,
  goBackResolve as goBack,
  goToResolve as goTo,
  onboardingGuidesResolve as onboardingGuides,
  policyParamResolve as policy,
  reloadResolve as reload,
} from '@iam/resolves';
import { ACCOUNT_TYPE, ENTITY, URN_VERSION } from '@iam/constants';

export default class PolicyIdentitiesController {
  /* @ngInject */
  constructor(
    $q,
    $translate,
    IAMRoutes,
    IdentityService,
    PolicyService,
    coreConfig,
  ) {
    this.$q = $q;
    this.$translate = $translate;
    this.IAMRoutes = IAMRoutes;
    this.IdentityService = IdentityService;
    this.PolicyService = PolicyService;
    this.coreConfig = coreConfig;
  }

  get modelIdentityUrn() {
    const { model, suggestion, coreConfig } = this;
    const { nichandle } = coreConfig.getUser();
    const region = coreConfig.getRegion();
    return encodeUrn({
      version: URN_VERSION,
      region: region.toUpperCase(),
      entity: ENTITY.IDENTITY,
      components: suggestion
        ? [suggestion.accountType, `${nichandle}/${suggestion.userName}`]
        : [ACCOUNT_TYPE.ACCOUNT, model],
    });
  }

  get translations() {
    const pfx = 'iam_policy_identities';
    const { instant: $t } = this.$translate;
    return {
      errorEdit: (message) => $t(`${pfx}_error_edit_identities`, { message }),
      errorInit: (message) => $t(`${pfx}_error_init`, { message }),
      successEdit: $t(`${pfx}_success_edit_identities`),
      successSubmit: $t(`${pfx}_success_submit`),
    };
  }

  $onInit() {
    this.loading = true;
    this.guides = this[onboardingGuides];
    this.chips = this[policy].identities
      .map(decodeUrn)
      .map((urn) => ({ title: [...urn.components].pop(), urn }));

    this.$q
      .all({
        users: this.IdentityService.getUsers(),
        groups: this.IdentityService.getGroups(),
      })
      .then(({ users, groups }) => {
        this.suggestions = [
          ...users.map((user) => ({
            accountType: ACCOUNT_TYPE.USER,
            userName: user,
          })),
          ...groups.map((group) => ({
            accountType: ACCOUNT_TYPE.GROUP,
            userName: group,
          })),
        ];
      })
      .catch((error) =>
        this[alert].error(this.translations.errorInit(error.data?.message)),
      )
      .finally(() => {
        this.loading = false;
      });
  }

  deleteIdentity(identity) {
    return this[goTo]({
      name: this.IAMRoutes.DELETE_IDENTITY,
      params: { identity },
    });
  }

  editIdentities() {
    const { id, identities } = this[policy];
    const newIdentities = [...identities, this.modelIdentityUrn];
    const params = { [policy]: id };

    return this.PolicyService.editIdentities(id, newIdentities)
      .then(() =>
        this[reload]({ success: this.translations.successEdit, params }),
      )
      .catch((error) =>
        this[reload]({
          error: this.translations.errorEdit(error.data?.message),
          params,
        }),
      );
  }

  onIdentityKeypress(event) {
    if (event.key !== 'Enter') {
      this.suggestion = null;
    }
  }

  submit() {
    this[goBack]({
      success: this.translations.successSubmit,
      reload: true,
    });
  }
}
