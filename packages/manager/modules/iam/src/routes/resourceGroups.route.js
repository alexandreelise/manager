import { resourceGroups as component } from '@iam/components';
import { cursorsParamResolve as cursors } from '@iam/resolves';

export default {
  component,
  name: 'resourceGroups',
  params: [cursors],
  resolves: [cursors],
  url: `/resourceGroups?${cursors}`,
};
