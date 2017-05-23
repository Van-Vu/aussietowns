<template>
    <transition name="modal">
        <section class="modal" :class="{ 'is-active': show }" >
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <slot name="header">
                        default header
                    </slot>
                </header>

                <section class="modal-card-body">
                    <slot name="body">
                        default body
                    </slot>
                </section>

                <footer class="modal-card-foot">
                    <slot name="footer">
                    </slot>
                </footer>
                <button class="modal-close" @click="close"></button>
                </div>
        </section>
    </transition>
</template>

<script lang="ts">
import ModalShellComponent from "./modalshell.component.ts";
export default ModalShellComponent;
</script>