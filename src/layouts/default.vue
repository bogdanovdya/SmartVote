<template>
  <div class="wrapper">
    <header class="slds-global-header_container">
      <div class="slds-global-header slds-grid slds-grid_align-spread">
        <div class="slds-global-header__item">
          <nuxt-link to="/" class="logo">
            <div style="font-size: 2rem;">LOGO</div>
          </nuxt-link>
        </div>
        <div class="slds-global-header__item">
          <ul class="slds-global-actions">
            <li class="slds-global-actions__item">
              <nuxt-link to="/create">
                <button class="slds-button slds-button_icon slds-button_icon slds-button_icon-container slds-button_icon-small slds-global-actions__setup slds-global-actions__item-action" aria-haspopup="true" title="Create voting">
                  <svg class="slds-button__icon slds-global-header__icon" aria-hidden="true">
                    <use xlink:href="/icons/symbols.svg#add"></use>
                  </svg>
                  <span class="slds-assistive-text">Create voting</span>
                </button>
              </nuxt-link>
            </li>
            <li class="slds-global-actions__item">
              <nuxt-link to="/vote">
                <button class="slds-button slds-button_icon slds-button_icon slds-button_icon-container slds-button_icon-small slds-global-actions__setup slds-global-actions__item-action" aria-haspopup="true" title="Voting list">
                  <svg class="slds-button__icon slds-global-header__icon" aria-hidden="true">
                    <use xlink:href="/icons/symbols.svg#metrics"></use>
                  </svg>
                  <span class="slds-assistive-text">Vote list</span>
                </button>
              </nuxt-link>
            </li>
            <li class="slds-global-actions__item">
              <div class="slds-dropdown-trigger slds-dropdown-trigger_click">
                <nuxt-link to="/profile">
                  <button class="slds-button slds-global-actions__avatar slds-global-actions__item-action" title="Avatar" aria-haspopup="true">
                    <span class="slds-avatar slds-avatar_circle slds-avatar_medium">
                      <img alt="Avatar" src="http://via.placeholder.com/32x32" title="User avatar" />
                    </span>
                  </button>
                </nuxt-link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
    <main class="main">
      <nuxt/>
    </main>
    <footer class="footer"></footer>
  </div>
</template>

<style lang="scss">
.logo,
.logo:hover,
.logo:focus,
.logo:active {
  color: #000000;
  text-decoration: none;
}
</style>

<script>
  export default {
    beforeCreate () {
      console.log('registerWeb3 Action dispatched from default.vue')
      this.$store.dispatch('registerWeb3')
    }
  }
</script>
