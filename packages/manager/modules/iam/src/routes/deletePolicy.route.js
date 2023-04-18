import { deleteEntity as component } from '@iam/components';
import { policyParamResolve as policy } from '@iam/resolves';

export default {
  component,
  name: 'deletePolicy',
  resolves: [policy],
  url: `/delete/${policy.toTypeString()}`,
};
