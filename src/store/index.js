import { createStore } from "vuex";
import todoList from "./modules/todoList";
export default createStore({
  modules: {
    todoList,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
});
