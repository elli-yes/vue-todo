<template>
  <div
    @showToast="showToast()"
    class="w-0 h-0 bg-teal-800 toast"
    :class="{ active: show }"
  ></div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  methods: {
    showToast() {
      console.log("kek");
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, 300);
    },
  },
};
</script>
<style scoped>
.toast {
  position: absolute;
  top: 100px;
  left: 100px;
}
.active {
  width: 100px;
  height: 100px;
}
</style>
