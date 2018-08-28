<template>
  <div>
    <div class="slds-post__content slds-text-longform">
      <b><p>{{result.question}}</p></b>
    </div>
    <div class="slds-m-bottom_medium" v-for="(item, key) in result.answers" :key="key">
      <div class="slds-grid slds-grid_align-spread slds-p-bottom_x-small">
        <span>{{item.answer}}</span>
        <span>
          <strong>{{item.votes}} ({{calcPercent(item.votes)}}%)</strong>
        </span>
      </div>
      <div class="slds-progress-bar">
        <span class="slds-progress-bar__value" v-bind:style="{width: calcPercent(item.votes)+'%' }"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    result: {
      type: Object
    }
  },
  methods: {
    calcPercent(votes) {
      return Math.round(votes / this.result.total * 100);
    }
  }
};
</script>
