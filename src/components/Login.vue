<template>
  <form>
    <VTextField placeholder="username" id="username" />
    <br />
    <VTextField placeholder="password" id="password" type="password" />
    <br />
    <VBtn color="primary" @click="setToken">Sign in</VBtn>
  </form>
</template>

<script>
export default {
  name: "Login",
  methods: {
    setToken() {
      try {
        const tokenFromSomeRequest = "faketoken-123";
        localStorage.setItem("token", tokenFromSomeRequest);
        this.$router.push("/");
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
