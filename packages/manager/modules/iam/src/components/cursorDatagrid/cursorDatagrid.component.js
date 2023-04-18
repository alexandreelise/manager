import { cursorsParamResolve as cursorsParam } from '@iam/resolves';
import controller from './cursorDatagrid.controller';

export default {
  resolves: [cursorsParam],
  controller,
};
