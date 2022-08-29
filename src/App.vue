<template>
  <div>
    <div class="bg-teal-600 h-8"></div>
    <AppContainer>
      <MainPage />
    </AppContainer>
  </div>
</template>

<script>
import MainPage from "./pages/MainPage.vue";
import AppContainer from "./components/AppContainer.vue";
export default {
  components: {
    MainPage,
    AppContainer,
  },
};
</script>
