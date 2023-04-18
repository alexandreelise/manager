import Apiv2Service from './apiv2.service';

export default class Apiv2ServiceProvider {
  /* @ngInject */
  constructor() {
    /**
     * The base URL of the v2 API
     * @type {string}
     */
    this.baseUrl = '';
  }

  /**
   * Internal Angular $get method
   * @returns {Apiv2Service}
   * @throws
   * @ngInject
   */
  $get($http) {
    if (!this.baseUrl) {
      throw new Error('Apiv2ServiceProvider baseUrl must be set first');
    }

    return new Apiv2Service($http, this.baseUrl);
  }

  /**
   * Set the base URL of the v2 API
   * @param {string} baseUrl
   * @returns {Apiv2ServiceProvider}
   */
  setBaseUrl(baseUrl) {
    this.baseUrl = baseUrl;
    return this;
  }
}
