// https://github.com/greyby/vue-spinner
<template>
    <div class="v-spinner">
        <div class="v-ring v-ring1" v-bind:style="spinnerBasicStyle">
            <div class="v-ring v-ring2" v-bind:style="spinnerStyle">
            </div><div class="v-ring v-ring3" v-bind:style="spinnerStyle">
            </div>
        </div>
    </div>
</template>

<script>
export default {

  name: 'RingLoader',
  props: {
    color: {
      type: String,
      default: '#5dc596'
    },
    size: {
      type: String,
      default: '60px'
    },
    margin: {
      type: String,
      default: '2px'
    },
    radius: {
      type: String,
      default: '100%'
    }
  },
  computed: {
    spinnerStyle () {
      return {
        height: this.size,
        width: this.size,
        border: parseFloat(this.size)/10 + 'px solid' + this.color,
        opacity: 0.4,
        borderRadius: this.radius
      }
    },
    spinnerBasicStyle () {
      return {
        height: this.size,
        width: this.size,
        position: 'relative'
      }
    }
  }
}
</script>