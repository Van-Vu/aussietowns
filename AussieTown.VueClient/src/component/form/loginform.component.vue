<template>
    <div>
        <div v-show="!isForgotPassword" class="tile  is-vertical">
            <div class="columns is-parent">
                <fb-signin-button class="column is-6 fb-signin-button box" :params="fbSignInParams"
                                  @success="onFbSignInSuccess"
                                  @error="onFbSignInError">
                    <span>FACEBOOK</span>
                </fb-signin-button>
                <g-signin-button class="column is-6 g-signin-button box" :params="googleSignInParams"
                                 @success="onGgSignInSuccess"
                                 @error="onGgSignInError">
                    <span>GOOGLE</span>
                </g-signin-button>
            </div>
            <div style="margin: 30px 0;text-align:center;">
                <span style="width: 30px;height: 30px;padding: 10px;border-radius: 50%;background-color: #eaebed;">OR</span>
                <hr style="margin-top: -10px;">
            </div>

            <form @submit.prevent="validateBeforeSubmit" v-if="!formSubmitted">
                <div class="field">
                    <p class="control has-icon has-icon-right">
                        <input name="email" v-model="model.email" v-validate="'required|email'"
                               :class="{'input': true, 'is-danger': errors.has('email') }" type="text" placeholder="Enter your email">
                        <span class="icon">
                            <i class="icon icon-envelope-o"></i>
                        </span>
                        <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
                    </p>
                </div>
                <div class="field">
                    <p class="control has-icon has-icon-right">
                        <input name="password" v-model="model.password" v-validate="'required'"
                               :class="{'input': true, 'is-danger': errors.has('password') }" type="password" placeholder="●●●●●●●">
                        <span class="icon user">
                            <i class="icon icon-lock"></i>
                        </span>
                        <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
                    </p>
                </div>
                <div class="field" v-if="!isLogin">
                    <p class="control has-icon has-icon-right">
                        <input name="confirmPassword" v-model="confirmPassword" v-validate="'required|confirmed:newPassword'"
                               :class="{'input': true, 'is-danger': errors.has('confirmPassword') }" type="password" placeholder="Confirm new password">
                        <span class="icon user">
                            <i class="icon icon-lock"></i>
                        </span>
                        <span v-show="errors.has('confirmPassword')" class="help is-danger">{{ errors.first('confirmPassword') }}</span>
                    </p>
                </div>
                <div class="field has-text-centered">
                    <button type="submit" class="button is-full button mtl_button-no-round mtl-btn-large">{{ isLogin ? 'Submit' : 'Register' }}</button>
                </div>
                <!--<div class="field">
                    <input class="is-pulled-left checkbox" type="checkbox" id="rememberme" value="1" v-model="model.rememberme">
                    <label for="rememberme">Remember me</label>
                    <a class="is-pulled-right" @click="isForgotPassword = true">Forgot password</a>
                </div>-->
                <hr />

                <div v-if="isLogin">
                    Not a member yet? <a @click.prevent="isLogin = false">Sign up</a>
                </div>
                <div v-if="!isLogin">
                    Already have an account? <a @click.prevent="isLogin = true">Log in</a>
                </div>
            </form>

            <div v-else>
                <h1 class="submitted">Form submitted successfully!</h1>
            </div>
        </div>
        <div v-show="isForgotPassword">
            <span>Enter your email & we'll send you a password reset link.</span>
            <div class="field">
                <p class="control has-icon has-icon-right">
                    <input name="email" v-model="model.email" v-validate="'required|email'"
                           :class="{'input': true, 'is-danger': errors.has('email') }" type="text" placeholder="Enter your email">
                    <span class="icon">
                        <i class="icon icon-envelope-o"></i>
                    </span>
                    <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
                </p>
            </div>
            <div class="field has-text-centered">
                <button type="submit" class="button is-full mtl_button-no-round mtl-btn-large" @click.prevent="onResetPassword">Submit</button>
            </div>
            <hr />
            <div class="field">
                <a class="absolute-center-x" @click="isForgotPassword = false">Back to signin</a>
            </div>
            
        </div>
    </div>
</template>

<script lang="ts">
    import LoginForm from './loginform.component.ts'
    export default LoginForm
</script>