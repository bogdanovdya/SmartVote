<template>
  <section class="container index">
    <h1 class="title">Title</h1>
    <p class="sub-title">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
    <div class="slds-grid slds-wrap index__content">
      <div class="slds-col slds-medium-size_1-of-2 slds-small-size_1-of-1 slds-medium-order_1 slds-small-order_2">
        <p class="index__text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
      </div>
      <div class="slds-col slds-medium-size_1-of-2 slds-small-size_1-of-1 slds-medium-order_2 slds-small-order_1">
        <img src="http://via.placeholder.com/640x480" >
      </div>
    </div>
    <div class="slds-grid slds-wrap index__content">
      <div class="slds-col slds-medium-size_1-of-2 slds-small-size_1-of-1">
        <img src="http://via.placeholder.com/640x480" >
      </div>
      <div class="slds-col slds-medium-size_1-of-2 slds-small-size_1-of-1">
        <p class="index__text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum.</p>
        <div class="index__button">
          <nuxt-link to="/create">
            <button class="slds-button slds-button_brand">JUST DO IT!</button>
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
  .index {
    font-size: 16px;
      @media(max-width: 1024px) {
        font-size: 12px;
      }
      @media(max-width: 768px) {
        font-size: 8px;
      }
    &__content {
      margin: 4em 0;
    }
    &__text {
      font-size: 1.5em;
      padding: 0 1em;
      @media(max-width: 768px) {
        padding: 1em 0;
      }
    }
    &__button {
      text-align: center;
      margin-top: 1.3em;
      button {
        font-size: 1.5em;
        line-height: 3em;
        padding: 0 3em;
      }
    }
  }
</style>
<script>
  export default {
    components: {
    },
    methods: {
      async getOwner() {
        // console.log(await this.$store.dispatch('getOwner'))
      }
    },
    beforeMount(){
      this.getOwner()
    },
  }
</script>
