<template>
    <transition name="modal">
        <section class="modal tile is-vertical" :class="cssClass" >
            <header class="modal-card-head">
                <a class="modal-close" @click="close"></a>
                <slot name="header"></slot>
            </header>
            <section class="modal-card-body">
                <slot name="body"></slot>
            </section>
        </section>
    </transition>
</template>

<script lang="ts">
import ModalShellComponent from "./modalshell.component.ts";
export default ModalShellComponent;
</script>