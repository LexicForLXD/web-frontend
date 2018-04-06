jest.mock('vue', () => ({set: jest.fn()}));
import Vue from 'vue'
import mutations from '../mutations'



describe('backup destination mutations', () => {
    test('set new destination', () => {
        Vue.set.mockReset();
        const backupDestination = {
            id: 1,
            name: "hallo"
        };
        const state = {
            backupDestinations: {},
            backupDestinationsList: [],
        };
        mutations.BACKUPDEST_ADD_NEW(state, {backupDestination});
        expect(state.backupDestinationsList).toEqual([1]);
    })
});