import apiClient from '@ovh-ux/manager-core-api';
import { QueryFunctionContext } from '@tanstack/react-query';

export default async function fetchNashaServiceInfos({
  queryKey,
}: QueryFunctionContext<[string, { serviceName: string }]>) {
  const { serviceName } = queryKey[1];
  const response = await apiClient.v6.get(
    `/dedicated/nasha/${serviceName}/serviceInfos`,
  );
  return response.data;
}
