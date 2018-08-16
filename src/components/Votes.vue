<template>
  <div class="votes">
    <ul class="slds-accordion">
      <li class="slds-accordion__list-item" v-for="(vote, id) in data" :key="id">
        <section class="slds-accordion__section" v-bind:class="{'slds-is-open' : checkOpened(id)}">
          <div class="slds-accordion__summary">
            <h3 class="slds-text-heading_small slds-accordion__summary-heading">
              <button class="slds-button slds-button_reset slds-accordion__summary-action votes__button" @click="onClick(id)">
                <div>
                  <h2 class="slds-truncate slds-text-heading_medium">{{vote.question}}</h2>
                  <p class="slds-text-body_regular slds-m-top_xxx-small">Votes: {{vote.total}}</p>
                </div>
              </button>
            </h3>
            <svg class="slds-accordion__summary-action-icon slds-button__icon slds-button__icon_left" aria-hidden="true">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/icons/symbols.svg#switch" />
            </svg>
          </div>
          <div class="slds-accordion__content">
            <div v-for="(item, key) in vote.answers" :key="key">
              <article class="slds-tile">
                <div class="slds-tile__detail">
                  <dl class="slds-list_horizontal slds-wrap">
                    <dt class="slds-item_label slds-text-color_weak slds-truncate votes__answer" v-bind:style="{fontWeight: item.hasOwnProperty('selected') && item.selected ? 'bold' : 'normal'}" @click="changeAnswer(vote.id, item.id)">{{item.answer}}</dt>
                    <dd class="slds-item_detail slds-truncate">
                      <div class="slds-grid slds-grid_vertical-align-center">
                        <div class="votes__count">
                          {{item.votes}}
                        </div>
                        <div class="slds-progress-bar slds-progress-bar_large">
                          <span class="slds-progress-bar__value" v-bind:style="{width: calcPercent(item.votes, vote.total)+'%', backgroundColor: item.color || '#5eb4ff' }">
                          </span>
                        </div>
                      </div>
                    </dd>
                  </dl>
                </div>
              </article>
            </div>
            <div class="slds-grid slds-grid_align-end slds-m-top_large" v-if="vote.hasOwnProperty('finished') && !vote.finished">
              <button class="slds-button slds-button_outline-brand">Завершить голосование</button>
            </div>
          </div>
        </section>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      opened: []
    }
  },
  props: {
    data: {
      type: Object
    }
  },
  methods: {
    checkOpened(id) {
      if(this.opened.indexOf(id) !== -1) {
        return true;
      }
      return false;
    },
    onClick(id) {
      const isOpened = this.opened.indexOf(id);
      if(isOpened === -1) {
        this.opened.push(id);
      } else {
        this.opened.splice(isOpened, 1);
      }
    },
    calcPercent(votes, total) {
      return Math.round(votes / total * 100);
    },
    changeAnswer(voteId, answerId) {
      this.$emit('changeAnswer', {
        voteId: voteId,
        answerId: answerId
      });
    }
  }
}
</script>

<style lang="scss">
.votes {
  &__button {
    &:focus {
      text-decoration: none !important;
    }
  }
  &__count {
    width: 2rem;
  }
  &__answer {
    cursor: pointer;
  }
}
</style>
