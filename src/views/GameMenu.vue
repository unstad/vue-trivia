<template>
  <div id="game-play">
    <h1>Welcome to the quiz!</h1>
    <form id="configure-quiz" @submit="submit">
      <label for="category">Choose a category:</label>
      <select name="category" v-model.number="categoryID">
        <option value="0" selected>All categories</option>
        <option
          v-for="category in categories"
          :value="category.id"
          :key="category.id"
        >{{category.name}}</option>
      </select>
      <input type="submit" class="submit" value="Start quiz" />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "GameMenu",
  data() {
    return {
      categories: [],
      loading: true,
      categoryID: 0,
    }
  },
      mounted() {
        console.log("starting mounted");
          let self = this;
        axios
        .get("https://opentdb.com/api_category.php").then(res => 
            self.categories = res.data.trivia_categories)
        .catch(err => console.log(err));
        self.loading = false;
    },
  methods: {
    submit (e) {
      e.preventDefault();
      this.$router.push({
        path: "game",
        query: {
          catId: this.categoryID
        }
      });
    }}

}
</script>

<style scoped>
</style>