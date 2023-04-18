import { deleteEntity as component } from '@iam/components';
import { identityParamResolve as identity } from '@iam/resolves';

export default {
  component,
  name: 'deleteIdentity',
  resolves: [identity],
  url: `/delete/${identity.toTypeString()}`,
};
