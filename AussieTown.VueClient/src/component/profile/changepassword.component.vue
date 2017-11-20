<template>
    <form class="tile is-parent is-vertical changepassword" @submit.prevent="onChangePassword">
        <div class="tile is-5 is-child">
            <p class="tile is-full control has-icon has-icon-right">
                <input name="oldPassword" v-model="model.oldPassword" v-validate="'required'"
                       :class="{'input': true, 'is-danger': errors.has('oldPassword') }" type="password" placeholder="Your old password">
                <span class="icon user">
                    <i class="icon icon-lock"></i>
                </span>
                <span v-show="errors.has('oldPassword')" class="help is-danger">{{ errors.first('oldPassword') }}</span>
            </p>
        </div>
        <div class="tile is-5 is-child">
            <p class="tile is-full control has-icon has-icon-right">
                <input name="newPassword" v-model="model.newPassword" v-validate="'required'"
                       :class="{'input': true, 'is-danger': errors.has('newPassword') }" type="password" placeholder="New password">
                <span class="icon user">
                    <i class="icon icon-lock"></i>
                </span>
                <span v-show="errors.has('newPassword')" class="help is-danger">{{ errors.first('newPassword') }}</span>
            </p>
        </div>
        <div class="tile is-5 is-child">
            <p class="tile is-full control has-icon has-icon-right">
                <input name="confirmPassword" v-model="confirmPassword" v-validate="'required|confirmed:newPassword'"
                       :class="{'input': true, 'is-danger': errors.has('confirmPassword') }" type="password" placeholder="Confirm new password">
                <span class="icon user">
                    <i class="icon icon-lock"></i>
                </span>
                <span v-show="errors.has('confirmPassword')" class="help is-danger">{{ errors.first('confirmPassword') }}</span>
            </p>
        </div>
        <button type="submit" class="button is-2 mtl_button-no-round">Submit</button>
    </form>
</template>

<script lang="ts">
import ChangePasswordComponent from "./changepassword.component.ts";
export default ChangePasswordComponent;
</script>