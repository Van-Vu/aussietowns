<template>
    <div class="tile number-chooser">
        <div class="minus" @click="decrease"></div>
        <div class="number">{{display}}</div>
        <div class="plus" @click="increase"></div>
    </div>
</template>

<script>
export default {

    name: 'NumberChooser',
    data() {
        return {
            display: Number
        }
    },
    props: {
        value: {
            type: Number,
            default: 0
        }
    },
    methods: {
        increase () {
            this.display += 1;
            this.$emit('input',this.display);
        },
        decrease () {
            this.display -= 1;
            this.$emit('input',this.display);
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.display = this.value
        })
    }
}
</script>

<style lang="scss">
.number-chooser {
    .number {
        margin-right: 0.5em;
        margin-left: 0.5em;
        padding-top: 0;
        padding-left: 1em;
        padding-right: 1em;
        min-width: 5em;
    }
}
.plus, .minus {
  width: 31px;
  height: 31px;
  border-radius: 50%;
  border: 1px solid #B4B4B4;
}
.plus:before, .minus:before {
  content: '';  
  width: 25px;
  height: 1px;
  border-top: 1px solid #B4B4B4;
  display: block;
  position: absolute;
  margin-top: 15px;
  margin-left: 3px;
}
.plus:after {
  content: '';  
  width: 1px;
  height: 25px;
  border-right: 1px solid #B4B4B4;
  display: block;
  position: absolute;
  margin-top: 3px;
  margin-left: 14px;
}
</style>