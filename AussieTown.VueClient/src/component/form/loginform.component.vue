<template>
    <div>
        <fb-signin-button :params="fbSignInParams"
                          @success="onFbSignInSuccess"
                          @error="onFbSignInError">
            Continue with Facebook
        </fb-signin-button>
        <g-signin-button :params="googleSignInParams"
                         @success="onGgSignInSuccess"
                         @error="onGgSignInError">
            <svg class="social-authentication__icon" width="18" height="18" viewBox="0 0 18 18" data-reactid=".0.0.0.$=11-transition.$=11.0.3.0.0.1.0.0"><g fill="none" data-reactid=".0.0.0.$=11-transition.$=11.0.3.0.0.1.0.0.0"><path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" data-reactid=".0.0.0.$=11-transition.$=11.0.3.0.0.1.0.0.0.0"></path><path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853" data-reactid=".0.0.0.$=11-transition.$=11.0.3.0.0.1.0.0.0.1"></path><path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" data-reactid=".0.0.0.$=11-transition.$=11.0.3.0.0.1.0.0.0.2"></path><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" data-reactid=".0.0.0.$=11-transition.$=11.0.3.0.0.1.0.0.0.3"></path></g></svg>
            Continue with Google
        </g-signin-button>

        <button @click="checkFbLoginStatus"> Check FB</button>
        <button @click="checkGGLoginStatus"> Check GG</button>

        <div style="width: 100%;margin: 30px 0;color: #acb1b9;">
            <span style="width: 30px;height: 30px;padding: 10px;border-radius: 50%;background-color: #eaebed;">OR</span>
            <hr style="height: 1px;margin-top: -10px;border: 0;background-color: #d8dade;color: #d8dade;">
        </div>

        <form @submit.prevent="validateBeforeSubmit" v-if="!formSubmitted">
            <div class="field">
                <label class="label" for="email">Email</label>
                <p class="control has-icon has-icon-right">
                    <input name="email" v-model="model.email" v-validate:email.initial="'required|email'"
                           :class="{'input': true, 'is-danger': errors.has('email') }" type="text" placeholder="Email">
                    <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
                </p>
            </div>
            <div class="field">
                <label class="label" for="password">Password</label>
                <p class="control has-icon has-icon-right">
                    <input name="password" v-model="model.password" v-validate:email.initial="'required'"
                           :class="{'input': true, 'is-danger': errors.has('password') }" type="text" placeholder="●●●●●●●">
                    <span class="icon user">
                        <i class="glyphicon glyphicon-lock"></i>
                    </span>
                    <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
                </p>
            </div>
            <div v-if="isLogin">
                Don’t have an account? <button @click.prevent="isLogin = false">Sign up</button> 
            </div>
            <div v-if="!isLogin">
                Already have an account? <button @click.prevent="isLogin = true">Log in</button>
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