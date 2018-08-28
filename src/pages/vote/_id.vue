<template>
  <section class="container vote-id">
    <div class="slds-grid slds-grid_vertical">
      <div class="slds-split-view__list-header slds-grid vote-id__question">
        <b><span>{{vote.question}}</span></b>
        <span class="slds-assistive-text">- Descending</span>
      </div>
      <ul class="slds-scrollable_y">
        <li class="slds-split-view__list-item" v-for="(item, id) in vote.answers" :key="id">
          <a href="javascript:void(0);" :aria-selected="item.id == selected" class="slds-split-view__list-item-action slds-grow slds-has-flexi-truncate" @click="onSelect(item.id)">
            <div class="slds-grid slds-wrap">
              <span class="slds-text-body_regular slds-text-color_default">{{item.answer}}</span>
              <span class="slds-col_bump-left" title="74">{{item.votes}}</span>
            </div>
          </a>
        </li>
      </ul>
    </div>
    <div class="slds-grid slds-grid_align-center slds-m-top_large">
      <button class="slds-button slds-button_outline-brand" @click="onConfirm()">Подтвердить выбор</button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      selected: null,
      vote: {}
    };
  },
  mounted() {
    this.getVote();
  },
  methods: {
    async getVote() {
      const voteList = await this.$axios.$get("vote.json");
      this.vote = voteList[this.$route.params.id];
    },
    onSelect(id) {
      this.selected = id;
    },
    onConfirm() {
      // TODO
    }
  }
};
</script>

<style lang="scss">
.vote-id {
  margin: 4rem auto;
  &__question {
    border-top: none;
  }
}
</style>
