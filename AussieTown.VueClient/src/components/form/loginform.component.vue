<template>
    <div>
        <form @submit.prevent="validateBeforeSubmit" v-if="!formSubmitted">
            <div class="field">
                <label class="label" for="email">Email</label>
                <p class="control has-icon has-icon-right">
                    <input name="email" v-model="email" v-validate:email.initial="'required|email'" 
                           :class="{'input': true, 'is-danger': errors.has('email') }" type="text" placeholder="Email">
                    <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
                </p>
            </div>
            <div class="field">
                <label class="label" for="password">Password</label>
                <p class="control has-icon has-icon-right">
                    <input name="password" v-model="password" v-validate:email.initial="'required'"
                           :class="{'input': true, 'is-danger': errors.has('password') }" type="text" placeholder="●●●●●●●">
                    <span class="icon user">
                        <i class="glyphicon glyphicon-lock"></i>
                    </span>
                    <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
                </p>
            </div>
            <button type="submit" class="button">Submit</button>
        </form>

        <div v-else>
            <h1 class="submitted">Form submitted successfully!</h1>
        </div>
    </div>
</template>

<script lang="ts">
    import LoginForm from './loginform.component.ts'
    export default LoginForm
</script>