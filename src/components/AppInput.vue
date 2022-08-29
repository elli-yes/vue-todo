<template>
  <form @submit.prevent="submit()">
    <input
      class="border-b-2 px-2 h-12 max-h-8 border-b-teal-400 outline-none focus:bg-gray-100 focus:w-3/4 focus:max-h-12 duration-1000"
      placeholder="New todo"
      v-model="title"
    />
  </form>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      title: "",
    };
  },
  methods: {
    ...mapActions({
      addTodoItem: "todoList/addTodoItem",
    }),
    async submit() {
      try {
        await this.addTodoItem(this.title);
        title = "";
      } catch (error) {
        title = "";
      }
    },
  },
};
</script>
