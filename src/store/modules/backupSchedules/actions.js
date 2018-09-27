import backupScheduleApi from "../../../api/backup/backupSchedule";
import * as types from "../../mutation-types";

export default {
  setBackupSchedules({ commit }) {
    commit(types.LOADING_BEGIN);
    backupScheduleApi
      .fetch()
      .then(res => {
        commit(types.BACKUPSCHEDULE_SET_ALL, { backupSchedulesData: res.data });
        commit(types.LOADING_FINISH);
      })
      .catch(error => {
        commit(types.LOADING_FAIL);
        commit(types.BACKUPSCHEDULE_SET_ALL_FAILURE, error);
      });
  },

  initBackupSchedules({ commit }) {
    return new Promise((resolve, reject) => {
      backupScheduleApi
        .fetch()
        .then(res => {
          commit(types.BACKUPSCHEDULE_SET_ALL, {
            backupSchedulesData: res.data
          });
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
          commit(types.BACKUPSCHEDULE_SET_ALL_FAILURE, error);
        });
    });
  },

  deleteBackupSchedule({ commit }, id) {
    commit(types.BACKUPSCHEDULE_DELETE, id);
    commit(types.LOADING_BEGIN);
    backupScheduleApi
      .delete(id)
      .then(() => {
        commit(types.LOADING_FINISH);
        commit(types.BACKUPSCHEDULE_DELETE_SUCCESS);
      })
      .catch(error => {
        commit(types.LOADING_FAIL);
        commit(types.BACKUPSCHEDULE_DELETE_FAILURE, error);
      });
  },

  createBackupSchedule({ commit }, data) {
    commit(types.LOADING_BEGIN);
    return new Promise((resolve, reject) => {
      backupScheduleApi
        .create(data)
        .then(res => {
          commit(types.BACKUPSCHEDULE_ADD_NEW, res.data);
          commit(types.LOADING_FINISH);
          commit(types.BACKUPSCHEDULE_ADD_NEW_SUCCESS);
          resolve();
        })
        .catch(error => {
          commit(types.BACKUPSCHEDULE_ADD_NEW_FAILURE, error);
          commit(types.LOADING_FAIL);
          reject(error);
        });
    });
  },

  updateBackupSchedule({ commit }, data) {
    commit(types.LOADING_BEGIN);
    backupScheduleApi
      .update(data.backupSchedule_id, data.backupSchedule)
      .then(res => {
        commit(types.BACKUPSCHEDULE_UPDATE_SUCCESS, res.data);
        commit(types.LOADING_FINISH);
      })
      .catch(error => {
        commit(types.LOADING_FAIL);
        commit(types.BACKUPSCHEDULE_UPDATE_FAILURE, error);
      });
  }
};
