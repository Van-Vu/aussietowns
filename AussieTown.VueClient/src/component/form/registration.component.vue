<template>
    <form @submit.prevent="onRegister">
        <div class="field">
            <label for="email">Email Address</label>
            <p class="control has-icon has-icon-right">
                <input name="email" v-model="model.email" v-validate:email.initial="'required'"
                       :class="{'input': true, 'is-danger': errors.has('email') }" type="text" placeholder="">
                <span class="icon user">
                    <i class="glyphicon glyphicon-lock"></i>
                </span>
                <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
            </p>
        </div>
        <div class="field">
            <label class="label" for="password">Password</label>
            <p class="control has-icon has-icon-right">
                <input name="password" v-model="model.password" v-validate:password.initial="'required'"
                       :class="{'input': true, 'is-danger': errors.has('password') }" type="text" placeholder="●●●●●●●">
                <span class="icon user">
                    <i class="glyphicon glyphicon-lock"></i>
                </span>
                <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
            </p>
        </div>
        <div class="field">
            <label for="firstName">First Name</label>
            <p class="control has-icon has-icon-right">
                <input name="firstname" v-model="model.firstname" v-validate:firstname="'required'"
                       :class="{'input': true, 'is-danger': errors.has('firstname') }" type="text">
                <span class="icon user">
                    <i class="glyphicon glyphicon-lock"></i>
                </span>
                <span v-show="errors.has('firstname')" class="help is-danger">{{ errors.first('firstname') }}</span>
            </p>
        </div>
        <div class="field">
            <label for="lastName">Last Name</label>
            <p class="control has-icon has-icon-right">
                <input name="lastname" v-model="model.lastname" v-validate:lastname="'required'"
                       :class="{'input': true, 'is-danger': errors.has('lastname') }" type="text">
                <span class="icon user">
                    <i class="glyphicon glyphicon-lock"></i>
                </span>
                <span v-show="errors.has('lastname')" class="help is-danger">{{ errors.first('lastname') }}</span>
            </p>
        </div>
        <div class="form-group">
            <label for="location">Hometown</label>
            <div class="control">
                <p> Bodom Location search here</p>
            </div>
        </div>
        <div class="field">
            <label for="phoneNumber">Phone Number</label>
            <p class="control has-icon has-icon-right">
                <input name="phone" v-model="model.phone" class="input" type="text">
                <span class="icon user">
                    <i class="glyphicon glyphicon-lock"></i>
                </span>
            </p>
        </div>
        <button type="submit" class="button">Register</button>
    </form>
</template>

<script lang="ts">
import RegistrationComponent from "./registration.component.ts";
export default RegistrationComponent;
</script>