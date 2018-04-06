import {keyForContainer} from "./index";
import {map, filter} from "lodash";

export default {
    getContainers: ({containers, containersList}) => {
        return map(containersList, id => containers[keyForContainer(id)])
    },

    getContainersByIds: (state) => (ids) => {
        return map(ids, id => state.containers[keyForContainer(id)])
    },

    getContainersFromHost: (state) => (hostId) => {
        return filter(state.containers, ['host.id', hostId]);
    },

    getContainerIndexById: ({containersList}) => (containerId) => {
        return containersList.findIndex(container => container === containerId)
    },

    getContainerErrors: ({containerErrors}) => {
        return containerErrors;
    }
}