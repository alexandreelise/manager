import template from './index.html';
import controller from './controller';

export default {
  name: 'pciProjectNewVoucher',
  template,
  controller,
  bindings: {
    checkVoucherValidity: '<',
    eligibility: '<',
    model: '<',
    cart: '<',
    globalLoading: '<',
    trackProjectCreationError: '<',
    steps: '<',
    defaultPaymentMethod: '<',
    trackClick: '<',
    viewOptions: '<',
    isDiscoveryProject: '<',
  },
};
