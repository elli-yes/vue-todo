const state = () => ({
  todoList: [],
  error: null,
  loading: false,
});
const getters = {};

const mutations = {
  setLoading(state) {
    state.loading = !state.loading;
  },
  setError(state, error) {
    state.error = error;
  },
  setTodoList(state, todoList) {
    state.todoList = todoList;
  },
};
function sortCompleted(list) {
  return list.sort((a, b) => {
    if (a.completed && b.completed) {
      return 0;
    }
    if (!a.completed && b.completed) {
      return -1;
    }
    if (a.completed && !b.completed) {
      return 1;
    }
  });
}
const actions = {
  async fetchTodoList({ commit }) {
    commit("setLoading");
    try {
      const data = await (
        await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
      ).json();
      commit("setTodoList", sortCompleted(data));
    } catch (error) {
      commit("setError", error);
    } finally {
      commit("setLoading");
    }
  },

  async addTodoItem({ commit, state }, title) {
    try {
      const res = await (
        await fetch("https://jsonplaceholder.typicode.com/todos", {
          method: "POST",
          body: JSON.stringify({
            title,
            userId: 1,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
      ).json();
      commit("setTodoList", [res, ...state.todoList]);
    } catch (error) {
      commit("setError", error);
    }
  },

  async deleteTodoItem({ commit, state }, id) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "DELETE",
        }
      );
      commit(
        "setTodoList",
        state.todoList.filter((item) => item.id != id)
      );
    } catch (error) {
      commit("setError", error);
    }
  },

  async editTodoItem({ commit, state }, { id, completed }) {
    try {
      const response = await (
        await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
          method: "PATCH",
          body: JSON.stringify({
            completed: completed,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
      ).json();
      commit(
        "setTodoList",
        sortCompleted(
          state.todoList.map((el) => {
            if (el.id == id) {
              return response;
            } else {
              return el;
            }
          })
        )
      );
    } catch (error) {
      commit("setError", error);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
