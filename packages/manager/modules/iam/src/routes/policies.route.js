import { policies as component } from '@iam/components';
import { cursorsParamResolve as cursors } from '@iam/resolves';

export default {
  component,
  name: 'policies',
  params: [cursors],
  resolves: [cursors],
  url: `?${cursors}`,
};
