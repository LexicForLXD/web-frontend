import userApi from "../../../api/users/user";
import authApi from "../../../api/auth/auth";
import * as types from "../../mutation-types";

export default {
  initUser({ commit }) {
    return Promise.all([
      new Promise((resolve, reject) => {
        authApi
          .getUser()
          .then(res => {
            commit(types.USER_SET_CURRENT, res.data);
            resolve();
          })
          .catch(() => {
            commit(types.USER_SET_CURRENT_FAILED);
            reject("Could get current user");
          });
      }),
      new Promise((resolve, reject) => {
        userApi
          .fetch()
          .then(res => {
            commit(types.USER_SET_ALL, { usersData: res.data });
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
            commit(types.USER_SET_ALL_FAILURE, error);
          });
      })
    ]);
  },

  getUsers({ commit }) {
    commit(types.LOADING_BEGIN);
    userApi
      .fetch()
      .then(res => {
        commit(types.USER_SET_ALL, { usersData: res.data });
        commit(types.LOADING_FINISH);
      })
      .catch(error => {
        commit(types.LOADING_FAIL);
        commit(types.USER_SET_ALL_FAILURE, error);
      });
  },

  deleteUser({ commit }, id) {
    commit(types.USER_DELETE, id);
    commit(types.LOADING_BEGIN);
    userApi
      .delete(id)
      .then(() => {
        commit(types.USER_DELETE_SUCCESS);
        commit(types.LOADING_FINISH);
      })
      .catch(error => {
        commit(types.USER_DELETE_FAILURE, error);
        commit(types.LOADING_FAIL);
      });
  },
  createUser({ commit }, data) {
    commit(types.LOADING_BEGIN);
    return new Promise((resolve, reject) => {
      userApi
        .create(data)
        .then(res => {
          commit(types.USER_ADD_NEW, { user: res.data });
          commit(types.LOADING_FINISH);
          resolve(res);
        })
        .catch(error => {
          commit(types.USER_ADD_NEW_FAILURE, error);
          commit(types.LOADING_FAIL);
          reject(error);
        });
    });
  },
  updateUser({ commit }, data) {
    commit(types.LOADING_BEGIN);
    userApi
      .update(data.userId, data.user)
      .then(res => {
        commit(types.USER_UPDATE_SUCCESS, { user: res.data });
        commit(types.LOADING_FINISH);
      })
      .catch(error => {
        commit(types.LOADING_FAIL);
        commit(types.USER_UPDATE_FAILURE, error);
      });
  }
};
