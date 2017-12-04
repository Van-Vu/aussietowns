<template>
    <div class="tile number-chooser">
        <div @click="decrease"><i class="icon icon-minus-circle plus"></i></div>
        <div class="number">{{display}}</div>
        <div @click="increase"><i class="icon icon-plus-circle minus"></i></div>
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
            if (this.display > 0){
                this.display -= 1;
                this.$emit('input',this.display);
            }
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
        margin-left: 22px;
        margin-right: 20px;
        font-size: 1.75rem;
    }
    
    div {
        display:inline-block;
    }
}
.plus, .minus {
    font-size: 27px;
    margin-top: 8px;

    &:hover {
        cursor: pointer;
        color: #E74C3C;
    }
}

</style>