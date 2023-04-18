import { alertResolve as alert, goToResolve as goTo } from '@iam/resolves';

import cursorDatagrid from '../cursorDatagrid/cursorDatagrid.component';

import controller from './policies.controller';
import template from './policies.template.html';

export default {
  name: 'iamPolicies',
  resolves: [...cursorDatagrid.resolves, alert, goTo],
  controller,
  template,
};
