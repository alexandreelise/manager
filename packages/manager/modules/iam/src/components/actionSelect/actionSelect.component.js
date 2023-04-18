import controller from './actionSelect.controller';
import template from './actionSelect.template.html';
import './actionSelect.styles.scss';

export default {
  name: 'iamActionSelect',
  bindings: {
    error: '&?',
    load: '&?',
    name: '@?',
    ngModel: '<',
    required: '@?',
    resourceTypes: '<',
    size: '@?',
  },
  require: {
    requiredNgModel: '^ngModel',
  },
  controller,
  template,
};
