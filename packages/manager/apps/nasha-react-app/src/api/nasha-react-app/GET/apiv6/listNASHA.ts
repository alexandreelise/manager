import apiClient from '@ovh-ux/manager-core-api';
import { queryClient } from '@ovh-ux/manager-react-core-application';

export const QUERY_KEY = ['/dedicated/nasha'];

async function fetchData() {
  const response = await apiClient.v6.get(QUERY_KEY[0]);
  return response.data;
}

export const getNashaReactAppIds = async (): Promise<string[]> => {
  return queryClient.fetchQuery(QUERY_KEY, fetchData);
};

export default {
  QUERY_KEY,
  getNashaReactAppIds,
};
