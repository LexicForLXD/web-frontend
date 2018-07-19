jest.mock('vue', () => ({set: jest.fn()}));
import Vue from 'vue'
import mutations from '../mutations'



describe('container mutations', () => {
    test('set new container', () => {
        Vue.set.mockReset();
        const container = {
            id: 1,
            name: "hallo"
        };
        const state = {
            containers: {},
            containersList: [],
        };
        mutations.CONTAINER_ADD_NEW(state, {container});
        expect(state.containersList).toEqual([1]);
    });

    test('delete container valid', () => {
        Vue.set.mockReset();
       
        let state = {
            containers: {
                container_1: {
                    id: 1,
                    name: "hallo"
                }
            },
            containersList: [1],
            deletedContainer: {},
        };
        mutations.CONTAINER_DELETE(state, 1);
        expect(state.containersList).toEqual([]);
        expect(state.deletedContainer).toEqual({
            id: 1,
            name: "hallo"
        });
    })

});