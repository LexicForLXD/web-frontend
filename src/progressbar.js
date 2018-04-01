import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'

const options = {
    color: '#3bb321',
    failedColor: '#c5000b',
    thickness: '5px',
    transition: {
        speed: '0.2s',
        opacity: '0.6s',
        termination: 300
    },
    autoRevert: true,
    location: 'top',
    inverse: false,
}

Vue.use(VueProgressBar, options)