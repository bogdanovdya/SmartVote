<template>
  <div class="slds-path">
    <div class="slds-grid slds-path__track">
      <div class="slds-grid slds-path__scroller-container">
        <div class="slds-path__scroller">
          <div class="slds-path__scroller_inner">
            <ul class="slds-path__nav">
              <li class="slds-path__item" v-bind:class="{ 'slds-is-complete': stage.complete, 'slds-is-current': key==current && !stage.complete, 'slds-is-incomplete': key!=current && !stage.complete, 'slds-is-active':key==current}" v-for="(stage, key) in stages" :key="key">
                <a aria-selected="false" class="slds-path__link" href="javascript:void(0);">
                  <span class="slds-path__stage">
                    <svg class="slds-icon slds-icon_x-small" aria-hidden="true">
                      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/icons/symbols.svg#check" />
                    </svg>
                  </span>
                  <span class="slds-path__title">{{stage.title}}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stages: {
      type: Object
    },
    current: {
      type: String
    }
  }
}
</script>

