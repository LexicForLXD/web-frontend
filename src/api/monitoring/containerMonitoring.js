import client from "../client";

export default {
  /**
   * List all log files from a container
   *
   * @param {int} containerId
   */
  listLogs(containerId) {
    return client.withAuth().get("/monitoring/logs/containers/" + containerId);
  },

  /**
   * Get the content of a single logfile
   *
   * @param {int} containerId
   * @param {string} logName
   */
  getLogFile(containerId, logName) {
    return client
      .withAuth()
      .get("/monitoring/logs/containers/" + containerId + "/" + logName);
  }
};
