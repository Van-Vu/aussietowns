<template>
    <form @submit.prevent="onResetPassword">
        <div class="field">
            <p class="control has-icon has-icon-right">
                <input name="newPassword" v-model="model.newPassword" v-validate="'required'"
                       :class="{'input': true, 'is-danger': errors.has('newPassword') }" type="password" placeholder="Your new password"> 
                <span class="icon user">
                    <i class="glyphicon glyphicon-lock"></i>
                </span>
                <span v-show="errors.has('newPassword')" class="help is-danger">{{ errors.first('newPassword') }}</span>
            </p>
        </div>
        <div class="field">
            <label for="lastName">Confirm new password</label>
            <p class="control has-icon has-icon-right">
                <input name="confirmPassword" v-model="confirmPassword" v-validate="'required|confirmed:newPassword'"
                       :class="{'input': true, 'is-danger': errors.has('confirmPassword') }" type="password" placeholder="Confirm new password">
                <span class="icon user">
                    <i class="glyphicon glyphicon-lock"></i>
                </span>
                <span v-show="errors.has('confirmPassword')" class="help is-danger">{{ errors.first('confirmPassword') }}</span>
            </p>
        </div>
        <button type="submit" class="button">Submit</button>
    </form>
</template>

<script lang="ts">
import ForgetPasswordForm from "./forgetpassword.component.ts";
export default ForgetPasswordForm;
</script>