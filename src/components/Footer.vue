<template>
  <footer>
    <Logo />
    <a href="https://velog.io/@young_pallete" target="_blank" />
    ⓒ{{ getThisYear }} {{ name }}
  </footer>
</template>

<script>
import Logo from "@/components/Logo";
export default {
  components: {
    Logo,
  },
  computed: {
    getThisYear() {
      return new Date().getFullYear();
    },
    name() {
      return this.$store.state.about.name;
    },
  },
};
</script>

<style lang="scss" scoped>
footer {
  padding: 70px 0;
  text-align: center;
  opacity: 0.3;
  .logo {
    display: block;
    margin-bottom: 4px;
  }
}
</style>