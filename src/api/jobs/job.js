import client from "../client";

export default {
  /**
   * Delete a job.
   * @returns {AxiosPromise<any>}
   */
  deleteJob(jobId, type) {
    return client.withAuth().delete("/jobs/" + jobId + "?type=" + type);
  }
};
