import containerApi from "../../../api/containers/container";
import * as types from "../../mutation-types";

export default {
  setContainers({ commit }) {
    commit(types.LOADING_BEGIN);
    containerApi
      .fetch()
      .then(res => {
        commit(types.CONTAINER_SET_ALL, { containersData: res.data });
        commit(types.LOADING_FINISH);
      })
      .catch(error => {
        commit(types.CONTAINER_SET_ALL_FAILURE, error);
        commit(types.LOADING_FAIL);
      });
  },

  initContainers({ commit }) {
    return new Promise((resolve, reject) => {
      containerApi
        .fetch()
        .then(res => {
          commit(types.CONTAINER_SET_ALL, { containersData: res.data });
          resolve();
        })
        .catch(error => {
          if (error.response) {
            if (error.response.status === 404) {
              if (error.response.data.error.code === 404) {
                resolve(error.response.data.error.message);
              }
            }
          }
          reject(error);
        });
    });
  },

  deleteContainer({ commit }, id) {
    commit(types.CONTAINER_DELETE, id);
    commit(types.LOADING_BEGIN);
    return new Promise((resolve, reject) => {
      containerApi
        .delete(id)
        .then(() => {
          commit(types.CONTAINER_DELETE_SUCCESS);
          commit(types.LOADING_FINISH);
          resolve();
        })
        .catch(error => {
          commit(types.CONTAINER_DELETE_FAILURE, error);
          commit(types.LOADING_FAIL);
          reject(error);
        });
    });
  },
  createContainer({ commit }, data) {
    commit(types.LOADING_BEGIN);
    return new Promise((resolve, reject) => {
      containerApi
        .create(data.hostId, data.container, data.type)
        .then(res => {
          commit(types.CONTAINER_ADD_NEW, { container: res.data });
          commit(types.LOADING_FINISH);
          commit(types.CONTAINER_ADD_NEW_SUCCESS);
          resolve();
        })
        .catch(error => {
          commit(types.CONTAINER_ADD_NEW_FAILURE, error);
          commit(types.LOADING_FAIL);
          reject(error);
        });
    });
  },

  updateContainer({ commit }, data) {
    commit(types.LOADING_BEGIN);
    containerApi
      .update(data.containerId, data.container)
      .then(res => {
        commit(types.CONTAINER_UPDATE_SUCCESS, res.data);
        commit(types.LOADING_FINISH);
      })
      .catch(error => {
        commit(types.LOADING_FAIL);
        commit(types.CONTAINER_UPDATE_FAILURE, error);
      });
  },

  refreshContainer({ commit }, containerId) {
    commit(types.LOADING_BEGIN);
    containerApi
      .refreshSingle(containerId)
      .then(res => {
        containerApi
          .show(containerId)
          .then(res => {
            commit(types.CONTAINER_REFRESH_SUCCESS, res.data);
            commit(types.LOADING_FINISH);
          })
          .catch(error => {
            commit(types.LOADING_FAIL);
            commit(types.CONTAINER_REFRESH_FAILURE, error);
          });
      })
      .catch(error => {
        commit(types.LOADING_FAIL);
        commit(types.CONTAINER_REFRESH_FAILURE, error);
      });
  }
};
