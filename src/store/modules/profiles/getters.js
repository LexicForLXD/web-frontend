import {map} from "lodash";
import {keyForProfile} from "./index";

export default {
    getProfiles({profiles, profilesList}) {
        return map(profilesList, id => profiles[keyForProfile(id)])
    },

    getProfileErrors({profileErrors}) {
        return profileErrors;
    }

}