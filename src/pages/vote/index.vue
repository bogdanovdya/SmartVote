<template>
  <div class="vote-list slds-m-top_x-small">
    <ul class="slds-grid slds-wrap">
      <li class="slds-p-horizontal_small slds-size_1-of-1" v-for="(vote, id) in voteList" :key="id">
        <nuxt-link :to="`/vote/${id}`" class="slds-app-launcher__tile slds-text-link_reset slds-is-draggable">
          <div class="slds-avatar__initials vote-list__id">
            {{id}}
          </div>
          <div class="slds-app-launcher__tile-body">
            <p>{{vote.question}}</p>
          </div>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  async asyncData({ app }) {
    const voteList = await app.$axios.$get('vote.json')
    return { voteList }
  }
}
</script>


<style lang="scss">
.vote-list {
  &__id {
    padding: 0 1rem;
  }
}
</style>
