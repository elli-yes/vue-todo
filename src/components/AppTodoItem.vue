<template>
  <div
    class="flex justify-between py-2 px-1 border-solid border border-teal-400 rounded-sm"
    :class="{ 'bg-gray-300': isLoading }"
  >
    <div class="flex space-x-2">
      <!-- <AppCheckbox type="checkbox" :checked="item.completed" class="" /> -->
      <input
        type="checkbox"
        :checked="item.completed"
        @change="editItem(item.id, $event.target.checked)"
      />
      <h4 :class="{ 'line-through': item.completed }">
        {{ item.title }}
      </h4>
    </div>
    <button @click="deleteItem(item.id)" class="bg-red-300 rounded-md">
      <AppLoader v-if="isLoading" class="w-6" fill="black" />
      <svg v-else class="h-6 w-6 mx-auto" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
        />
      </svg>
    </button>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import AppCheckbox from "./AppCheckbox.vue";
import AppLoader from "./AppLoader.vue";
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    ...mapActions({
      deleteTodoItem: "todoList/deleteTodoItem",
      editTodoItem: "todoList/editTodoItem",
    }),
    async deleteItem(id) {
      this.isLoading = true;
      await this.deleteTodoItem(id);
      this.isLoading = false;
    },
    async editItem(id, completed) {
      await this.editTodoItem({ id, completed });
    },
  },
  components: { AppLoader },
};
</script>
