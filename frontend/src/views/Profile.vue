<template>
  <Profile :userid="userId" />
</template>

<script>
import Profile from "../components/Profile";
export default {
  components: {
    Profile
  },
  data() {
    return {
      userId: this.$route.params.id
    };
  }
};
</script>
