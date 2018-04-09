import {map} from "lodash";
import {keyForProfile} from "./index";

export default {
    getProfiles({profiles, profilesList}) {
        return map(profilesList, id => profiles[keyForProfile(id)])
    },

    getProfileErrors({profileErrors}) {
        return profileErrors;
    },

    getProfileIndexById: ({profilesList}) => (id) => {
        return profilesList.findIndex(item => item === id);
    },

}