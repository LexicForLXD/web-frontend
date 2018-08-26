<template>
    <v-footer app>
        <div>
            Source can be found on <a href="https://github.com/lexicforlxc">Github</a>
        </div>
        <v-spacer/>
        <div>
            ©{{ new Date().getFullYear() }} Developed by
            <a href="https://github.com/janritter">Jan Ritter</a> and
            <a href="https://github.com/ChibangLW">Léon Lenzen</a>
        </div>
    </v-footer>
</template>

<script>
export default {
  name: "site-footer"
};
</script>

<style>
</style>
