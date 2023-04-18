export default class IdentityService {
  /* @ngInject */
  constructor($http) {
    this.$http = $http;
  }

  /**
   * Get the list of groups (APIv1)
   * @returns {Promise<string[]>}
   */
  getGroups() {
    return this.$http.get('/me/identity/group').then(({ data }) => data);
  }

  /**
   * Get the list of users (APIv1)
   * @returns {Promise<string[]>}
   */
  getUsers() {
    return this.$http.get('/me/identity/user').then(({ data }) => data);
  }
}
