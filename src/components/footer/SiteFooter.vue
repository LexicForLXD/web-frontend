<template>
    <v-footer app>
        <div>
            Source can be found on <a href="https://github.com/lexicforlxc">Github</a>
        </div>
        <v-spacer/>
        <div>
            Frontend-version: {{frontendVersion}}
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
import pjson from "../../../package.json";

export default {
  name: "site-footer",

  computed: {
    frontendVersion: function() {
      return pjson.version;
    }
  }
};
</script>

<style>
</style>
