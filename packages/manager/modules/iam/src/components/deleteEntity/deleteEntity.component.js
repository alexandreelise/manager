import {
  entityResolve as entity,
  goBackResolve as goBack,
} from '@iam/resolves';

import controller from './deleteEntity.controller';
import template from './deleteEntity.template.html';

export default {
  name: 'iamDeleteEntity',
  resolves: [entity, goBack],
  controller,
  template,
  transclude: true,
};
