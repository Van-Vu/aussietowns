<template>
    <form>
        <div class="field">
            <label for="email">Email Address</label>
            <p class="control has-icon has-icon-right">
                <input name="email" v-model="email" v-validate:email.initial="'required'"
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
                <input name="password" v-model="password" v-validate:password.initial="'required'"
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
                <input name="firstname" v-model="firstname" v-validate:firstname="'required'"
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
                <input name="lastname" v-model="lastname" v-validate:lastname="'required'"
                       :class="{'input': true, 'is-danger': errors.has('lastname') }" type="text">
                <span class="icon user">
                    <i class="glyphicon glyphicon-lock"></i>
                </span>
                <span v-show="errors.has('lastname')" class="help is-danger">{{ errors.first('lastname') }}</span>
            </p>
        </div>
        <div class="form-group">
            <label for="location">Origin location</label>
            <div class="control">
                <autocomplete :minChars="3"
                              :list="list"
                              :placeHolderText="placeHolderText"
                              v-on:search="onLocationSearch($event)"
                              v-on:select="onSelect($event)"></autocomplete>
            </div>
        </div>
        <div class="field">
            <label for="phoneNumber">Phone Number</label>
            <p class="control has-icon has-icon-right">
                <input name="phone" v-model="phone" class="input" type="text">
                <span class="icon user">
                    <i class="glyphicon glyphicon-lock"></i>
                </span>
            </p>
        </div>
        <div class="field">
            <label for="gender">Gender</label>
            <select name="gender" class="select" v-model="gender">
                <option value="" selected="selected">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>
        </div>
        <div class="field">
            <label for="birthday">Birthday</label>
            <datepicker v-model="birthday"></datepicker>
        </div>
        <div class="field">
            <label for="description">Description</label>
            <textarea class="textarea" name="description"
                      placeholder="Short description about yourself"
                      v-model="description" cols="40" rows="5"></textarea>
        </div>
        <div class="field">
            <label for="address">Address</label>
            <input type="text" class="input" name="address"
                   placeholder="Your current address"
                   v-model="address">
        </div>
        <div class="field">
            <label for="emergencyContact">Emergency contact</label>
            <input type="text" class="input" name="emergencyContact"
                   placeholder="Your emergency contact"
                   v-model="emergencyContact">
        </div>
        <div class="field">
            <label for="photo">Photo</label>
        </div>
        <div class="field">
            <label for="video">Video</label>
            <h2>webcam:</h2>
            <!-- Define <video> object to hold webcam image -->
            <!--<video [src]="videosrc" style="width: 480px; height: 480px;"></video>-->

            <p>See app/webcam/webcam.html for HTML, see app/webcam/webcam.css for CSS. </p>
            <p>Automatic streaming is enabled. </p>

            <canvas></canvas>
            <label role="button" @click="capture">Capture</label>
        </div>
        <button class="btn btn-success" @click="onUpdate">Update</button>
    </form>
</template>

<script lang="ts">
import UserDetailComponent from "./userdetail.component.ts";
export default UserDetailComponent;
</script>