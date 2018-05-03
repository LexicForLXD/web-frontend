/*
|-------------------------------------------------------------------------------
| routes.js
|-------------------------------------------------------------------------------
| Contains all of the routes for the application
*/

/*
    Imports Vue and VueRouter to extend with the routes.
*/
import Vue from "vue";
import VueRouter from "vue-router";
// import store from "./store";

/*
    Extends Vue to use Vue Router
*/
Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        /**
         * Auth routes
         */
        {
            path: "/login",
            name: "login",
            component: Vue.component("Login", require("./pages/Login.vue"))
        },

        /**
         * Container routes
         */
        {
            path: "/containers",
            component: Vue.component(
                "ContainerPage",
                require("./pages/Container.vue")
            ),
            children: [
                {
                    path: "",
                    name: "containerOverview",
                    component: Vue.component(
                        "OverviewContainer",
                        require("./components/container/ContainerList.vue")
                    )
                },
                {
                    path: "new",
                    name: "containerNew",
                    component: Vue.component(
                        "NewContainer",
                        require("./components/container/NewContainer.vue")
                    )
                },
                {
                    path: ":index",
                    name: "containerSingle",
                    component: Vue.component(
                        "SingleContainer",
                        require("./components/container/SingleContainer.vue")
                    ),
                    children: [
                        {
                            path: "nagios/new",
                            name: "containerNewNagios",
                            component: Vue.component(
                                "NagiosContainerNew",
                                require("./components/container/nagios/NagiosNew.vue")
                            )
                        },
                        {
                            path: "nagios/:checkId",
                            name: "containerSingleNagios",
                            component: Vue.component(
                                "NagiosContainerView",
                                require("./components/container/nagios/NagiosView.vue")
                            )
                        },
                        {
                            path: "nagios/:checkId/update",
                            name: "containerSingleNagiosUpdate",
                            component: Vue.component(
                                "NagiosContainerUpdate",
                                require("./components/container/nagios/NagiosUpdate.vue")
                            )
                        }
                    ]
                },

            ]
        },

        /**
         * Backup schedule routes
         */
        {
            path: "/backup-schedules",
            component: Vue.component(
                "BackupSchedulePage",
                require("./pages/BackupSchedule.vue")
            ),
            children: [
                {
                    path: "",
                    name: "scheduleOverview",
                    component: Vue.component(
                        "OverviewSchedule",
                        require("./components/backup-schedule/BackupScheduleList.vue")
                    )
                },
                {
                    path: "new",
                    name: "scheduleNew",
                    component: Vue.component(
                        "NewSchedule",
                        require("./components/backup-schedule/NewBackupSchedule.vue")
                    )
                },
                {
                    path: ":index",
                    name: "scheduleSingle",
                    component: Vue.component(
                        "SingleSchedule",
                        require("./components/backup-schedule/SingleBackupSchedule.vue")
                    )
                }
            ]
        },

        /**
         * Profile routes
         */
        {
            path: "/profiles",
            component: Vue.component("ProfilePage", require("./pages/Profile.vue")),
            children: [
                {
                    path: "",
                    name: "profileOverview",
                    component: Vue.component(
                        "OverviewProfile",
                        require("./components/profile/ProfileList.vue")
                    )
                },
                {
                    path: "new",
                    name: "profileNew",
                    component: Vue.component(
                        "NewProfile",
                        require("./components/profile/NewProfile.vue")
                    )
                },
                {
                    path: ":index",
                    name: "profileSingle",
                    component: Vue.component(
                        "SingleProfile",
                        require("./components/profile/SingleProfile.vue")
                    )
                }
            ]
        },

        /**
         * Image routes
         */
        {
            path: "/images",
            component: Vue.component("ImagePage", require("./pages/Image.vue")),
            children: [
                {
                    path: "",
                    name: "imageOverview",
                    component: Vue.component(
                        "OverviewImage",
                        require("./components/image/ImageList.vue")
                    )
                },
                {
                    path: "new",
                    name: "imageNew",
                    component: Vue.component(
                        "NewImage",
                        require("./components/image/NewImage.vue")
                    )
                },
                {
                    path: ":index",
                    name: "imageSingle",
                    component: Vue.component(
                        "SingleImage",
                        require("./components/image/SingleImage.vue")
                    )
                }
            ]
        },

        /**
         * Backup destination routes
         */
        {
            path: "/backup-dests",
            component: Vue.component(
                "BackupDestinationPage",
                require("./pages/BackupDestination.vue")
            ),
            children: [
                {
                    path: "",
                    name: "destinationOverview",
                    component: Vue.component(
                        "OverviewDestination",
                        require("./components/backup-destination/BackupDestinationList.vue")
                    )
                },
                {
                    path: "new",
                    name: "destinationNew",
                    component: Vue.component(
                        "NewDestination",
                        require("./components/backup-destination/NewBackupDestination.vue")
                    )
                },
                {
                    path: ":index",
                    name: "destinationSingle",
                    component: Vue.component(
                        "SingleDestination",
                        require("./components/backup-destination/SingleBackupDestination.vue")
                    )
                }
            ]
        },

        /**
         * Backup routes
         */
        {
            path: "/backups",
            component: Vue.component("BackupPage", require("./pages/Backup.vue")),
            children: [
                {
                    path: "",
                    name: "backupOverview",
                    component: Vue.component(
                        "OverviewBackup",
                        require("./components/backup/BackupList.vue")
                    )
                },
                {
                    path: "new",
                    name: "backupNew",
                    component: Vue.component(
                        "NewBackup",
                        require("./components/backup/NewBackup.vue")
                    )
                },
                {
                    path: ":index",
                    name: "backupSingle",
                    component: Vue.component(
                        "SingleBackup",
                        require("./components/backup/SingleBackup.vue")
                    )
                }
            ]
        },

        /**
         * Host routes
         */
        {
            path: "/hosts",
            component: Vue.component("HostPage", require("./pages/Host.vue")),
            children: [
                {
                    path: "",
                    name: "hostOverview",
                    component: Vue.component(
                        "HostOverview",
                        require("./components/host/HostList.vue")
                    )
                },
                {
                    path: "new",
                    name: "hostNew",
                    component: Vue.component(
                        "NewHost",
                        require("./components/host/NewHost.vue")
                    )
                },
                {
                    path: ":index",
                    name: "hostSingle",
                    component: Vue.component(
                        "SingleHost",
                        require("./components/host/SingleHost.vue")
                    )
                },
                {
                    path: ":index/authenticate",
                    name: "hostAuth",
                    component: Vue.component(
                        "AuthHost",
                        require("./components/host/AuthHost.vue")
                    )
                }
            ]
        },

        /**
         * User routes
         */
        {
            path: "/users",
            component: Vue.component("UserPage", require("./pages/User.vue")),
            children: [
                {
                    path: "",
                    name: "userOverview",
                    component: Vue.component(
                        "UserOverview",
                        require("./components/user/UserList.vue")
                    )
                },
                {
                    path: "new",
                    name: "userNew",
                    component: Vue.component(
                        "NewUser",
                        require("./components/user/NewUser.vue")
                    )
                },
                {
                    path: "current",
                    name: "userCurrent",
                    component: Vue.component(
                        "SingleUser",
                        require("./components/user/SingleUser.vue")
                    )
                },
                {
                    path: ":index",
                    name: "userSingle",
                    component: Vue.component(
                        "SingleUser",
                        require("./components/user/SingleUser.vue")
                    )
                }
            ]
        },

        /**
         * Error routes
         */
        {
            path: "/403",
            component: Vue.component("forbidden", require("./pages/errors/403.vue"))
        },
        {
            path: "/404",
            component: Vue.component("notFound", require("./pages/errors/404.vue"))
        },
        {
            path: "/401",
            component: Vue.component(
                "unauthenticated",
                require("./pages/errors/401.vue")
            )
        }
    ],

    linkExactActiveClass: "is-active"
});

// //Coach rule
// router.beforeEach((to, from, next) => {
//     if (to.matched.some(record => record.meta.requiresCoach)) {
//         checkStore().then(() => {
//             if (!store.getters.isCoach && !store.getters.isAdmin) {
//                 next({
//                     path: "/403"
//                 });
//             } else {
//                 next();
//             }
//         });
//     } else {
//         next(); // make sure to always call next()!
//     }
// });
//
// //Admin rule
// router.beforeEach((to, from, next) => {
//     if (to.matched.some(record => record.meta.requiresAdmin)) {
//         checkStore().then(() => {
//             if (!store.getters.isAdmin) {
//                 next({
//                     path: "/403"
//                 });
//             } else {
//                 next();
//             }
//         });
//     } else {
//         next(); // make sure to always call next()!
//     }
// });
//
// // cecks if vuex store already initiated
// async function checkStore() {
//     if (
//         store.state.user.currentUser.first_name == "" &&
//         store.state.user.isAuthenticated
//     ) {
//         await store.dispatch("initShared");
//     } else if (
//         store.state.user.currentUser.first_name == "" &&
//         !store.state.user.isAuthenticated
//     ) {
//         router.push("/login");
//     }
// }

export default router;
