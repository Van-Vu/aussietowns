<template>
    <form @submit.prevent="onResetPassword">
        <div class="field">
            <p class="control has-icon has-icon-right">
                <input name="oldPassword" v-model="model.oldPassword" v-validate="'required'"
                       :class="{'input': true, 'is-danger': errors.has('oldPassword') }" type="password" placeholder="Your old password">
                <span class="icon user">
                    <i class="glyphicon glyphicon-lock"></i>
                </span>
                <span v-show="errors.has('oldPassword')" class="help is-danger">{{ errors.first('oldPassword') }}</span>
            </p>
        </div>
        <div class="field">
            <p class="control has-icon has-icon-right">
                <input name="newPassword" v-model="model.newPassword" v-validate="'required'"
                       :class="{'input': true, 'is-danger': errors.has('newPassword') }" type="password" placeholder="New password">
                <span class="icon user">
                    <i class="glyphicon glyphicon-lock"></i>
                </span>
                <span v-show="errors.has('newPassword')" class="help is-danger">{{ errors.first('newPassword') }}</span>
            </p>
        </div>
        <div class="field">
            <p class="control has-icon has-icon-right">
                <input name="confirmNewPassword" v-model="model.confirmNewPassword" v-validate:lastname="'required'"
                       :class="{'input': true, 'is-danger': errors.has('lastname') }" type="password" placeholder="Confirm new password">
                <span class="icon user">
                    <i class="glyphicon glyphicon-lock"></i>
                </span>
                <span v-show="errors.has('confirmNewPassword')" class="help is-danger">{{ errors.first('confirmNewPassword') }}</span>
            </p>
        </div>
        <button type="submit" class="button">Submit</button>
    </form>
</template>

<script lang="ts">
import ChangePasswordForm from "./changepassword.component.ts";
export default ChangePasswordForm;
</script>