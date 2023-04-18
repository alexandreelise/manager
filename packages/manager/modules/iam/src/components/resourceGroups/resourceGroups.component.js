import { alertResolve as alert, goToResolve as goTo } from '@iam/resolves';

import controller from './resourceGroups.controller';
import template from './resourceGroups.template.html';
import cursorDatagrid from '../cursorDatagrid/cursorDatagrid.component';

export default {
  name: 'iamResourceGroups',
  resolves: [...cursorDatagrid.resolves, alert, goTo],
  controller,
  template,
};
