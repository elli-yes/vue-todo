<template>
  <div class="space-y-4">
    <h1 class="text-2xl font-bold p-1">Todos</h1>
    <div class="space-y-4">
      <h1 class="text-xl font-bold">New todo</h1>
      <form class="flex justify-between" @submit.prevent="submit()">
        <input
          :class="{ 'disabled bg-gray-300': loading }"
          class="px-2 py-4 border border-solid border-black-100 outline-1 outline-teal-600 w-1/2 h-8"
          v-model="title"
          placeholder="New todo"
        />
        <button class="w-1/5 bg-teal-600 font-bold text-white">Add</button>
      </form>

      <hr />
    </div>
    <h1 class="text-xl font-bold">Your todo</h1>

    <AppLoader v-if="todoList.loading" class="w-16 mx-auto" />
    <div v-else-if="todoList.error" class="flex justify-center">
      <div class="border-solid border-2 border-red-400 rounded-md px-1 py-1">
        <h1 class="text-xl text-red-400 font-bold text-center">Error</h1>
        <h1 class="text-md text-red-400">{{ todoList.error }}</h1>
      </div>
    </div>
    <div v-else-if="todoList.todoList.length === 0" class="mx-auto">
      <h1 class="text-2xl font-bold p-1">No todos</h1>
    </div>
    <div
      v-else
      v-for="todoItem in todoList.todoList"
      :key="todoItem.id"
      class="space-y-4"
    >
      <AppTodoItem :item="todoItem" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AppInput from "../components/AppInput.vue";
import AppLoader from "../components/AppLoader.vue";
import AppTodoItem from "../components/AppTodoItem.vue";
export default {
  data() {
    return {
      title: "",
      loading: false,
    };
  },
  computed: {
    ...mapState({ todoList: (state) => state.todoList }),
  },
  components: { AppTodoItem, AppInput, AppLoader },
  methods: {
    ...mapActions({
      fetchTodoList: "todoList/fetchTodoList",
      addTodoItem: "todoList/addTodoItem",
    }),
    async submit() {
      try {
        this.loading = true;
        await this.addTodoItem(this.title);
        this.title = "";
        this.loading = false;
      } catch (error) {
        this.title = "";
        this.loading = false;
      }
    },
  },
  mounted() {
    this.fetchTodoList();
  },
};
</script>

<style scoped>
/* * {
  border: 1px solid black;
} */
</style>
