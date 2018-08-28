<template>
  <section class="container create">
    <h1 class="title">Title</h1>
    <div class="create__process">
      <process-bar :stages="stages" :current="current" />
    </div>
    <div class="create__content">
      <div class="create__form" v-if="current=='create'">
        <div class="slds-grid slds-gutters slds-wrap">
          <div class="slds-col slds-medium-size_1-of-2 slds-small-size_1-of-1">
            <question-form @create="onCreate" />
          </div>
          <div class="slds-col slds-show_medium slds-medium-size_1-of-2 slds-small-size_1-of-1 create__image">
            <img src="http://via.placeholder.com/240x320">
          </div>
        </div>
      </div>
      <div class="create__form" v-if="current=='waiting'">
        <div class="create__waiting">
          <div class="slds-spinner slds-spinner_large">
            <div class="slds-spinner__dot-a"></div>
            <div class="slds-spinner__dot-b"></div>
          </div>
        </div>
        <p class="create__waiting-text">Ожидается подтверждение транзакции. <br>Пожалуйста, подождите</p>
      </div>
      <div class="create__form" v-if="current=='finish'">
        <vote-result :result="result" />
      </div>
    </div>
  </section>
</template>

<script>
import ProcessBar from "~/components/ProcessBar.vue";
import QuestionForm from "~/components/QuestionForm.vue";
import VoteResult from "~/components/VoteResult.vue";

export default {
  components: {
    ProcessBar,
    QuestionForm,
    VoteResult
  },
  data() {
    return {
      current: this.$store.state.currentStage || "create",
      stages: this.$store.state.stages || {
        create: {
          title: "Create vote",
          complete: false
        },
        waiting: {
          title: "Votes waiting",
          complete: false
        },
        finish: {
          title: "Finish",
          complete: false
        }
      },
      vote: this.$store.state.vote || {},
      result: this.$store.state.result || {}
    };
  },
  methods: {
    onCreate(data) {
      this.vote = {
        question: data.question,
        answers: data.answers,
        address: [
          "1DkyBEKt5S2GDtv7aQw6rQepAvnsRyHoYM",
          "357JcFvqiUvpmwYDBerqt2KYAXWQGFXuVw",
          "15qB19Tb8HsEAuj9atKXA5FTYud4rNWupz",
          "bc1qu8ppk0fwwqwsvr70pzv5yw5j0f3zm4uvf9xrfr",
          "bc1qdpkq28wrkesa8tszjgma7d55nshwp69pmazn2m"
        ]
      };
      this.$store.commit("createVote", this.vote);
      this.startTransaction();
    },
    changeStage(stage) {
      this.stages[this.current].complete = true;
      this.current = stage;
      this.$store.commit("setStages", this.stages);
      this.$store.commit("setCurrentStage", this.current);
    },
    startTransaction() {
      /**
       * Fake transaction
       */
      this.changeStage("waiting");
      setTimeout(() => {
        this.changeStage("finish");
        this.showResults();
      }, 5000);
    },
    showResults() {
      /**
       * Fake results
       */
      let vote = this.$store.state.vote,
        result;
      let fakeVotes = () => {
        return parseInt(Math.random() * 60);
      };
      result = vote.answers.map(answer => {
        return {
          answer: answer,
          votes: fakeVotes()
        };
      });
      this.result = {
        question: this.vote.question,
        answers: result,
        total: this.calcVotes(result)
      };
      this.$store.commit("setResult", this.result);
    },
    calcVotes(result) {
      let total = 0;
      result.forEach(item => {
        total += parseInt(item.votes);
      });
      return total;
    }
  }
};
</script>

<style lang="scss">
.create {
  &__process {
    max-width: 50%;
    margin: 4em auto;
    @media (max-width: 768px) {
      max-width: 100%;
    }
  }
  &__content {
    margin: 4em 0;
  }
  &__image {
    text-align: center;
  }
  &__waiting {
    position: relative;
    height: 5rem;
    &-text {
      margin-top: 1rem;
      text-align: center;
    }
  }
}
</style>
