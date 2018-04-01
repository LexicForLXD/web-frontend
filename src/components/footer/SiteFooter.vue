<template>
  <div>

    ©{{ new Date().getFullYear() }} Developed by
    <a href="https://github.com/janritter">Jan Ritter</a>,
    <a href="https://github.com/ChibangLW">Léon Lenzen</a>
     and Ludwig Münch

  </div>
</template>

<script>
export default {
  name: 'site-footer'

}
</script>

<style>

.site-footer {
  grid-area: footer;
  background: #FBB731;
}
</style>
