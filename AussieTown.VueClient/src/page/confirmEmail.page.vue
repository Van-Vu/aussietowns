<template>
    <div class="confirmEmail">
        <form v-if="!isConfirmed" class="column is-half is-offset-one-quarter" @submit.prevent="onChangePassword">
            <div>Hi {{model.email}}, please enter your name then you're done </div>
            <hr />
            <div class="columns">
                <div class="column is-3">First Name</div>
                <div class="column is-9 control has-icon has-icon-right">
                    <input name="firstname" v-model="model.firstName" v-validate="'required|alpha_spaces|max:30'"
                           :class="{'input': true, 'is-danger': errors.has('firstname') }" type="text">
                    <i class="icon icon-lock"></i>
                    <span v-show="errors.has('firstname')" class="help is-danger">{{ errors.first('firstname') }}</span>
                </div>
            </div>
            <hr />
            <div class="columns">
                <div class="column is-3">Last Name</div>
                <div class="column is-9 control has-icon has-icon-right">
                    <input name="lastname" v-model="model.lastName" v-validate="'required|alpha_spaces|max:30'"
                           :class="{'input': true, 'is-danger': errors.has('lastname') }" type="text">
                    <i class="icon icon-lock"></i>
                    <span v-show="errors.has('lastname')" class="help is-danger">{{ errors.first('lastname') }}</span>
                </div>
            </div>

            <button type="submit" class="button is-2 mtl_button-no-round">Submit</button>
        </form>
        <div class="success" v-else>
            Thanks for confirming your email. Now you can start your journey
            <router-link :to="{ name: 'home' }">here</router-link>
        </div>
    </div>
    
</template>

<script lang="ts">
import ConfirmEmailPage from "./confirmemail.page.ts";
export default ConfirmEmailPage;
</script>