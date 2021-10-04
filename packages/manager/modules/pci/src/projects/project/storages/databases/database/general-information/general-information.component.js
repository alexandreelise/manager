import controller from './general-information.controller';
import template from './general-information.html';

export default {
  bindings: {
    allowedIps: '<',
    billingLink: '<',
    database: '<',
    getCurrentPlan: '<',
    getCurrentFlavor: '<',
    users: '<',
    goToAddNode: '<',
    goToDeleteNode: '<',
    goToAllowedIPs: '<',
    goToManagerUsers: '<',
    goToDeleteDatabase: '<',
    goToEditName: '<',
    goToUpgradePlan: '<',
    goToUpgradeVersion: '<',
    goToUpgradeNode: '<',
    goToFork: '<',
    vRack: '<',
    vRackLink: '<',
    latestPlan: '<',
    latestVersion: '<',
    highestFlavor: '<',
    newDatabases: '<',
    pollDatabaseStatus: '<',
    privateNetwork: '<',
    projectId: '<',
    stopPollingDatabaseStatus: '<',
    stopPollingNodesStatus: '<',
    subnet: '<',
    trackDatabases: '<',
    trackDashboard: '<',
    nodesPerRow: '<',
    isFeatureActivated: '<',
  },
  controller,
  template,
};
