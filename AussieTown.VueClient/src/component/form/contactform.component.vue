<template>
    <form @submit.prevent="onContact">
        <div class="tile is-parent">
            <label class="label tile is-child is-3">To</label>
            <label class="tile tag is-success">{{model.receiverName}}</label>
        </div>
        <div class="tile is-parent" v-if="model.listingId">
            <label class="label tile is-child is-3">About</label>
            <label class="tile">{{model.listingHeader}}</label>
        </div>
        <div class="tile is-parent">
            <label class="label tile is-child is-3">Message</label>
            <textarea name="message" v-model="model.message" v-validate="'required|max:3000'"
                        :class="{'textarea tile is-child': true, 'is-danger': errors.has('message') }" rows="5" placeholder=""></textarea>
        </div>
        <div class="has-text-centered">
            <button type="submit" class="tile is-6 button mtl_button-no-round is-medium" :class="{'is-loading': isSending}">Send</button>
        </div>
    </form>
</template>

<script lang="ts">
import ContactForm from "./contactform.component.ts";
export default ContactForm;
</script>