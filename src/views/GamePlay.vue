<template>
  <div id="game-play">
    <div id="game-state" v-if="ansCounter < 10">
      <p>{{ categoryName }}</p>
      <GamePlayItem
        :question="currentQuestion"
        :answers="currentAnswers"
        @ans="checkAnswer"
      />
      <p v-html="answerFeedback"></p>
      <button v-if="answerFeedback.length > 1" @click="getNext">
        Next question
      </button>
    </div>

    <div id="game-over" v-else>
      <p v-html="noCorrect * 10 + '/' + ansCounter * 10"></p>
      <li v-for="ans of answered" :key="ans">
        <div v-for="a of ans" :key="a">
          <div
            class="response"
            v-html="
              a.question +
                '<br/> Correct answer: ' +
                a.correct_answer +
                '<br> Your answer: ' +
                a.answerText +
                '<br/>'
            "
          ></div>
        </div>
      </li>
      <router-link to="/" tag="button">New quiz</router-link>
    </div>
  </div>
</template>

<script>
import GamePlayItem from "../components/GamePlayItem.vue";
import axios from "axios";
import _ from "lodash";

export default {
  name: "GamePlay",
  components: {
    GamePlayItem
  },
  data: () => {
    return {
      questions: [],
      categoryID: 0,
      loading: true,
      categoryName: "",
      currentQuestion: {},
      currentAnswers: {},
      answerFeedback: "",
      answered: [],
      noCorrect: 0,
      ansCounter: 0
    };
  },
  methods: {
    //puts the answers into an array while keeping correctness
    mapAnswers: function(question) {
      let temp = question.incorrect_answers.map(i => this.answer(i, false));
      temp.push(this.answer(question.correct_answer, true));
      // let newArray = shuffle(temp);
      let newArray = _.shuffle(temp);
      return newArray;
    },

    //For keeping the correctness of an answer
    answer: function(answerText, correctness) {
      return { answerText, correctness };
    },
    checkAnswer: function(answer) {
      answer.correctness
        ? ((this.answerFeedback = "Correct"),
          (this.currentQuestion = Object.assign(answer, this.currentQuestion)),
          this.answered.push([this.currentQuestion]),
          ++this.noCorrect)
        : ((this.answerFeedback = "Wrong"),
          (this.currentQuestion = Object.assign(answer, this.currentQuestion)),
          this.answered.push([this.currentQuestion]));
    },
    //Gets the next question
    getNext: function() {
      this.ansCounter++;

      this.currentQuestion = this.questions.shift();
      this.categoryName = this.currentQuestion.category;
      this.currentAnswers = this.mapAnswers(this.currentQuestion);
      this.answerFeedback = "";
    }
  },
  created() {
    //Gets the category id from
    if (this.$route.query.catId) {
      this.categoryID = this.$route.query.catId;
    }
  },
  mounted() {
    axios
      .get(`https://opentdb.com/api.php?amount=10&category=${this.categoryID}`)
      .then(res => {
        //Get questions from API and put them into questions array
        this.questions = res.data.results;
        //Sets up the first question
        this.currentQuestion = this.questions.shift();
        //Sets the category name of the question
        this.categoryName = this.currentQuestion.category;
        //Gets the correct and incorrect answers shuffles them and puts them into currentAnswers
        this.currentAnswers = this.mapAnswers(this.currentQuestion);
      })
      .catch(err => console.log(err));

    this.loading = false;
  }
};
</script>

<style scoped>
.response {
  padding: 5px;
}
</style>
