import * as types from "../../mutation-types";
import { forEach, pull } from "lodash";
import { keyForContainer } from "./index";
import Vue from "vue";

export default {
  [types.CONTAINER_DELETE](
    { containers, containersList, deletedContainer },
    id
  ) {
    const key = keyForContainer(id);
    Object.assign(deletedContainer, containers[key]);
    Vue.set(deletedContainer, key, containers[key]);
    Vue.delete(containers, key);
    pull(containersList, id);
  },

  [types.CONTAINER_DELETE_FAILURE](state, error) {
    const key = keyForContainer(state.deletedContainer.id);
    state.containersList.push(state.deletedContainer.id);
    Vue.set(state.containers, key, state.deletedContainer);
    state.deletedContainer = {};
    setErrors(state.containerErrors, error);
  },

  [types.CONTAINER_DELETE_SUCCESS](state) {
    state.deletedContainer = {};
    clearErrors(state.containerErrors);
  },

  [types.CONTAINER_SET_ALL](
    { containers, containersList, containerErrors },
    { containersData }
  ) {
    forEach(containersData, function(value) {
      const key = keyForContainer(value.id);
      if (!containers[key]) {
        containersList.push(value.id);
      }
      Vue.set(containers, key, value);
      clearErrors(containerErrors);
    });
  },

  [types.CONTAINER_SET_ALL_FAILURE]({ containerErrors }, error) {
    setErrors(containerErrors, error);
  },

  [types.CONTAINER_UPDATE_SUCCESS](state, container) {
    const key = keyForContainer(container.id);

    state.containers[key] = container;
    clearErrors(state.containerErrors);
  },

  [types.CONTAINER_UPDATE_FAILURE]({ containerErrors }, error) {
    setErrors(containerErrors, error);
  },

  [types.CONTAINER_REFRESH_SUCCESS](state, container) {
    const key = keyForContainer(container.id);

    state.containers[key] = container;
    clearErrors(state.containerErrors);
  },

  [types.CONTAINER_REFRESH_FAILURE]({ containerErrors }, error) {
    setErrors(containerErrors, error);
  },

  [types.CONTAINER_ADD_NEW]({ containers, containersList }, { container }) {
    const key = keyForContainer(container.id);
    if (!containers[key]) {
      Vue.set(containers, key, container);
      containersList.push(container.id);
    }
  },

  [types.CONTAINER_ADD_NEW_SUCCESS]({ containerErrors }) {
    clearErrors(containerErrors);
  },

  [types.CONTAINER_ADD_NEW_FAILURE]({ containerErrors }, error) {
    setErrors(containerErrors, error);
  }
};

function setErrors(containerErrors, error) {
  if (error.response) {
    if (error.response.data) {
      if (error.response.data.error) {
        if (error.response.data.error.message) {
          if (error.response.data.error.message.name) {
            containerErrors.name = error.response.data.error.message.name;
          } else {
            containerErrors.name = [];
          }
          if (error.response.data.error.message.ipv4) {
            containerErrors.ipv4 = error.response.data.error.message.ipv4;
          } else {
            containerErrors.ipv4 = [];
          }
          if (error.response.data.error.message.ipv6) {
            containerErrors.ipv6 = error.response.data.error.message.ipv6;
          } else {
            containerErrors.ipv6 = [];
          }
          if (error.response.data.error.message.domainName) {
            containerErrors.domainName =
              error.response.data.error.message.domainName;
          } else {
            containerErrors.domainName = [];
          }
          if (error.response.data.error.message.architecture) {
            containerErrors.architecture =
              error.response.data.error.message.architecture;
          } else {
            containerErrors.architecture = [];
          }
          if (error.response.data.error.message.config) {
            containerErrors.config = error.response.data.error.message.config;
          } else {
            containerErrors.config = [];
          }
          if (error.response.data.error.message.devices) {
            containerErrors.devices = error.response.data.error.message.devices;
          } else {
            containerErrors.devices = [];
          }
          if (error.response.data.error.message.sourceType) {
            containerErrors.sourceType =
              error.response.data.error.message.sourceType;
          } else {
            containerErrors.sourceType = [];
          }
          if (error.response.data.error.message.fingerprint) {
            containerErrors.fingerprint =
              error.response.data.error.message.fingerprint;
          } else {
            containerErrors.fingerprint = [];
          }
          if (error.response.data.error.message.alias) {
            containerErrors.alias = error.response.data.error.message.alias;
          } else {
            containerErrors.alias = [];
          }
          if (error.response.data.error.message.image) {
            containerErrors.alias.push(error.response.data.error.message.image);
            containerErrors.fingerprint.push(
              error.response.data.error.message.image
            );
          }
        }
      }
    }
  }
}

function clearErrors(containerErrors) {
  containerErrors.name = [];
  containerErrors.ipv4 = [];
  containerErrors.ipv6 = [];
  containerErrors.domainName = [];
  containerErrors.architecture = [];
  containerErrors.config = [];
  containerErrors.devices = [];
  containerErrors.sourceType = [];
  containerErrors.fingerprint = [];
  containerErrors.alias = [];
  containerErrors.image = [];
}
