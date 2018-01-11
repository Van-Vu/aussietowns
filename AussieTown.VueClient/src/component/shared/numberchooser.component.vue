<template>
    <div class="tile number-chooser">
        <i class="icon icon-minus-circle" @click="decrease"></i>
        <div class="number">{{display}}</div>
        <i class="icon icon-plus-circle" @click="increase"></i>
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
    position: relative;

    .number, .icon {
        position:absolute;
        top: 50%;
        transform: translateY(-50%);
    }

    .number {
        font-size: 2rem;
        margin-left: 2rem;
    }

    .icon {
        font-size: 1.5rem;

        &:hover {
            cursor: pointer;
            color: #E74C3C;
        }
    }

    .icon-plus-circle {
        margin-left: 3.5rem;
    }
}
</style>