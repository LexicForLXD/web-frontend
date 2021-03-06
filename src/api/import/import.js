import client from "../client";

export default {
  /**
   * Import images from host.
   * @param hostId
   * @returns {AxiosPromise<any>}
   */
  images(hostId) {
    return client.withAuth().post("/sync/hosts/" + hostId + "/images");
  },

  /**
   * Import profiles from host.
   * @param hostId
   * @returns {AxiosPromise<any>}
   */
  profiles(hostId) {
    return client.withAuth().post("/sync/hosts/" + hostId + "/profiles");
  },

  /**
   * Import containers from host.
   * @param hostId
   * @returns {AxiosPromise<any>}
   */
  containers(hostId) {
    return client.withAuth().post("/sync/hosts/" + hostId + "/containers");
  },

  /**
   * Import storage pools from host.
   * @param hostId
   * @returns {AxiosPromise<any>}
   */
  storagePools(hostId) {
    return client.withAuth().post("/sync/hosts/" + hostId + "/storage-pools");
  },

  /**
   * Import images and containers at the same time.
   * @param hostId
   * @returns {AxiosPromise<any>}
   */
  all(hostId) {
    return client.withAuth().post("/sync/hosts/" + hostId);
  }
};
