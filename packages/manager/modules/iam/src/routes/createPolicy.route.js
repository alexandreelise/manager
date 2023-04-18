import { createPolicy as component } from '@iam/components';
import { createPolicyBreadcrumbResolve as breadcrumb } from '@iam/resolves';

export default {
  breadcrumb,
  component,
  name: 'createPolicy',
  url: '/policy/create',
};
