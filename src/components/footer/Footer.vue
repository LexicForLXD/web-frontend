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
  name: 'footer'

}
</script>

<style>

.footer {
  grid-area: footer;
  background: yellow;
}
</style>
