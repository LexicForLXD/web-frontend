<template>
    <div>

        <h1>Waiting for initialization.</h1>


        <img
                src="assets/images/logo.png"
                alt="Logo">

        <h3>Loading screen</h3>


        <h2>{{error}}</h2>
    </div>
</template>

<script>
    export default {
        props: [
            'error'
        ]
    }
</script>

<style>

</style>
