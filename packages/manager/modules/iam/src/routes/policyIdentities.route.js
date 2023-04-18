import { policyIdentities as component } from '@iam/components';
import {
  policyIdentitiesBreadcrumbResolve as breadcrumb,
  policyParamResolve as policy,
} from '@iam/resolves';

export default {
  breadcrumb,
  component,
  name: 'policyIdentities',
  resolves: [policy],
  url: `/identity/${policy.toTypeString()}`,
};
