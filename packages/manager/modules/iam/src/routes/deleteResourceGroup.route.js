import { deleteEntity as component } from '@iam/components';
import { resourceGroupParamResolve as resourceGroup } from '@iam/resolves';

export default {
  component,
  name: 'deleteResourceGroup',
  resolves: [resourceGroup],
  url: `/delete/${resourceGroup.toTypeString()}`,
};
