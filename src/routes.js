/*
|-------------------------------------------------------------------------------
| routes.js
|-------------------------------------------------------------------------------
| Contains all of the routes for the application
*/

/*
    Imports Vue and VueRouter to extend with the routes.
*/
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'

/*
    Extends Vue to use Vue Router
*/
Vue.use(VueRouter)

const router = new VueRouter({
    routes: [

        /**
         * Auth routes
         */
        {
            path: '/login',
            name: 'login',
            component: Vue.component('Login', require('./pages/Login.vue'))
        },

        /**
         * Container routes
         */
        {
            path: '/containers',
            component: Vue.component('ContainerPage', require('./pages/Container.vue')),
            children: [
                {
                    path: '',
                    name: 'containerOverview',
                    component: Vue.component('Overview', require('./components/container/ContainerList.vue'))
                },
                {
                    path: 'new',
                    name: 'containerNew',
                    component: Vue.component('NewContainer', require('./components/container/NewContainer.vue'))
                },
            ]
        },


        /**
         * Backup schedule routes
         */
        {
            path: '/backup-schedules',
            component: Vue.component('BackupSchedulePage', require('./pages/BackupSchedule.vue')),
            children: [
                {
                    path: '',
                    name: 'scheduleOverview',
                    component: Vue.component('Overview', require('./components/backup-schedule/BackupScheduleList.vue'))
                },
                // {
                //     path: 'workouts',
                //     name: 'athleteWorkouts',
                //     component: Vue.component('Workouts', require('./components/athlete/workouts/WorkoutList.vue'))
                // },
                // {
                //     path: 'workouts/new',
                //     name: 'athleteNewWorkout',
                //     component: Vue.component('NewWorkout', require('./components/athlete/workouts/NewWorkout.vue'))
                // },
                // {
                //     path: 'workouts/:index',
                //     name: 'athleteSingleWorkout',
                //     component: Vue.component('Workout', require('./components/athlete/workouts/Workout.vue'))
                // },
                // {
                //     path: 'workoutplans',
                //     name: 'athleteWorkoutPlans',
                //     component: Vue.component('WorkoutPlans', require('./components/athlete/workoutplans/Calendar.vue'))
                // },
            ]
        },


        /**
         * Host routes
         */
        {
            path: '/hosts',
            component: Vue.component('HostPage', require('./pages/Host.vue')),
            children: [
                {
                    path: '',
                    name: 'hostOverview',
                    component: Vue.component('HostOverview', require('./components/host/HostList.vue'))
                },
                {
                    path: 'new',
                    name: 'hostNew',
                    component: Vue.component('NewHost', require('./components/host/NewHost.vue')),
                },

            ]
        },


        /*


        /**
         * Error routes
         */
        {
            path: '/403',
            component: Vue.component('forbidden', require('./pages/errors/403.vue'))
        },
        {
            path: '/404',
            component: Vue.component('notFound', require('./pages/errors/404.vue'))
        },
        {
            path: '/401',
            component: Vue.component('unauthenticated', require('./pages/errors/401.vue'))
        }
    ],

    linkExactActiveClass: 'is-active'
});

//Coach rule
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresCoach)) {
        checkStore().then(() => {
            if (!store.getters.isCoach && !store.getters.isAdmin) {
                next({
                    path: '/403'
                })
            } else {
                next()
            }
        })
    } else {
        next() // make sure to always call next()!
    }
})


//Admin rule
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAdmin)) {
        checkStore().then(() => {
            if (!store.getters.isAdmin) {
                next({
                    path: '/403'
                })
            } else {
                next()
            }
        })
    } else {
        next() // make sure to always call next()!
    }
})

// cecks if vuex store already initiated
async function checkStore() {
    if ((store.state.user.currentUser.first_name == '') && store.state.user.isAuthenticated) {
        await store.dispatch('initShared');
    } else if ((store.state.user.currentUser.first_name == '') && !store.state.user.isAuthenticated) {
        router.push('/login');
    }
}

export default router;