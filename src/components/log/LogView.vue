<template>
    <div>
        <div v-if="log !== ''">
            {{ log }}
        </div>
        <div v-else>
            Select a log file on the left
        </div>
        <div v-if="error !== ''">
            {{ error.response.data }}
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            'log',
            'error',
        ],

    };
</script>

<style>

</style>
