<template>
  <label class="container">
    <input type="checkbox" :checked="check" />
    <span class="checkmark"></span>
  </label>
</template>
<script>
export default {
  props: {
    checked: {
      type: Boolean,
    },
  },
  data() {
    return {
      check: this.checked,
    };
  },
  watch: {
    check() {
      this.$emit("check");
    },
  },
};
</script>
<style scoped>
input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.container {
  display: block;
  position: relative;
  padding-left: 20px;
  width: 25px;
  /* margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  user-select: none; */
}
.container:hover input ~ .checkmark {
  background-color: #ccc;
  border-radius: 4px;
}
.container input:checked ~ .checkmark {
  background-color: #0d9488;
  border-radius: 4px;
}
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}
.container input:checked ~ .checkmark:after {
  display: block;
}
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
}
.container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 6px;
  height: 12px;
  border: solid white;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}
</style>
