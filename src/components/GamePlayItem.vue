<template>
  <div class="game-play-item">
    <p v-html="question.question"></p>
    <li
      v-for="answer in answers"
      :key="answer.answerText"
      @click="metode(answer)"
    >
      <div class="answer" v-html="answer.answerText"></div>
    </li>
  </div>
</template>

<script>
export default {
  props: {
    question: {
      type: Object,
      required: true
    },
    answers: []
  },
  data: function() {
    return {};
  },
  methods: {
    metode(answer, index) {
      this.$emit("ans", answer, index);
    }
  }
};
</script>

<style scoped>
.answer {
  padding: 5px;
}
</style>
