import {keyForHost} from "./index";
import {map, find} from 'lodash';

export default {
    getHosts: ({hosts, hostsList}) => {
        return map(hostsList, id => hosts[keyForHost(id)])
    },

    getHostErrors: ({hostErrors}) => {
        return hostErrors;
    },

    getHostById: ({hosts}) => (hostId) => {
        return find(hosts, ['id', hostId]);
    },

    getHostIndexById: ({hostsList}) => (hostId) => {
        return hostsList.findIndex(host => host === hostId);
    },

    getHostLoading: ({hostLoading}) => {
        return hostLoading;
    },

}