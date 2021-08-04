<template>
  <div>
    <VBtn color="orange" @click="removeToken">Log out</VBtn>
  </div>
</template>

<script>
export default {
  name: "Logout",
  methods: {
    removeToken() {
      try {
        localStorage.setItem("token", "");
        this.$router.push("/login");
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
