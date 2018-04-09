import client from "../client";

export default {
  /**
   * Get all ContainerStatus Nagios configurations for a Container
   * @param {int} containerId
   */
  getConfigs(containerId) {
    return client
      .withAuth()
      .get("/monitoring/checks/containers/" + containerId);
  },

  /**
   * Receive a Nagios stats graph by ContainerStatus
   * @param {int} checkId
   * @param {string} timerange
   */
  showGraph(checkId, timerange) {
    return client
      .withAuth()
      .get(
        "/monitoring/checks/" +
          checkId +
          "/containers/graph?timerange=" +
          timerange,
          {},
          {
              'mime-type': 'image/png',
              'Content-Type': 'image/png'
          },
          'arraybuffer'
      );
  },

  /**
   * Delete ContainerStatus Nagios configuration
   * @param {int} checkId
   */
  delete(checkId) {
    return client
      .withAuth()
      .delete("/monitoring/checks/" + checkId + "/containers");
  },

  /**
   * Create ContainerStatus Nagios configuration
   * @param {int} containerId
   * @param {object} check
   */
  create(containerId, check) {
    return client
      .withAuth()
      .post("/monitoring/checks/containers/" + containerId, check);
  },

  /**
   * Edit ContainerStatus Nagios configuration
   * @param {int} checkId
   * @param {object} check
   */
  update(checkId, check) {
    return client
      .withAuth()
      .put("/monitoring/checks/" + checkId + "/containers", check);
  }
};
