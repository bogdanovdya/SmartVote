<template>
  <div class="profile">
    <div class="slds-panel slds-size_medium slds-panel_docked slds-panel_docked-left slds-is-open profile__bar">
      <div class="slds-panel__body">
        <div class="slds-grid slds-grid_align-center">
          <span class="slds-avatar slds-avatar_circle profile__avatar">
            <img src="http://via.placeholder.com/350x350" alt="avatar">
          </span>
        </div>
        <div class="slds-m-top_large">
          <dl class="slds-m-bottom_medium">
            <dt>Address:</dt>
            <dd class="slds-truncate">{{this.$store.state.account.address}}</dd>
          </dl>
          <dl class="slds-m-bottom_medium profile__stat">
            <dt>Votes created:</dt>
            <dd>1</dd>
          </dl>
          <dl class="slds-m-bottom_medium profile__stat">
            <dt>Votes answered:</dt>
            <dd>1</dd>
          </dl>
        </div>
      </div>
    </div>
    <div class="slds-tabs_default profile__content">
      <ul class="slds-tabs_default__nav">
        <li class="slds-tabs_default__item" v-bind:class="{ 'slds-is-active': currentTab == 0 }" title="My votes">
          <a class="slds-tabs_default__link" href="javascript:void(0);" @click="setCurrentTab(0)">{{isMe?'My votes':'votes'}}</a>
        </li>
        <li class="slds-tabs_default__item" v-bind:class="{ 'slds-is-active': currentTab == 1 }" title="My activity">
          <a class="slds-tabs_default__link" href="javascript:void(0);" @click="setCurrentTab(1)">{{isMe?'My activity':'activity'}}</a>
        </li>
      </ul>
      <div class="slds-tabs_default__content" v-bind:class="{ 'slds-show': currentTab == 0, 'slds-hide': currentTab != 0}">
        <votes :data="votes" />
      </div>
      <div class="slds-tabs_default__content" v-bind:class="{ 'slds-show': currentTab == 1, 'slds-hide': currentTab != 1}">
        <votes :data="activity" @changeAnswer="onChangeAnswer" />
      </div>
    </div>
  </div>
</template>

<script>
import Votes from "~/components/Votes.vue";

export default {
  components: {
    Votes
  },
  data() {
    return {
      isMe: true,
      votesData: {},
      currentTab: 0,
      activity: {},
      votes: {}
    }
  },
  mounted() {
    const url = this.isMe? 'my-vote.json' : 'vote.json';
    this.getVotes(url);
  },
  methods: {
    setCurrentTab(id) {
      this.currentTab = id
    },
    async getVotes(url) {
      this.activity = await this.$axios.$get("vote.json");
      this.votes = await this.$axios.$get(url);
    },
    onChangeAnswer(ids) {
      // TODO
    }
  }
}
</script>


<style lang="scss">
.profile {
  display: flex;
  height: 100%;
  &__bar {
    position: fixed;
    z-index: 3;
  }
  &__content {
    padding: 3rem;
    margin-left: 20rem;
  }
  &__avatar {
    width: 12rem;
    height: 12rem;
    margin-top: 4rem;
  }
  &__stat {
    display: flex;
    justify-content: space-between;
  }
}
</style>
