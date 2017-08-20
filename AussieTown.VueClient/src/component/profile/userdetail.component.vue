<template>
    <div class="container" :class="{editing:isEditing}">
        <div class="box-header-strip"></div>
        <div class="field">
            <label class="label" for="email">Email Address</label>
            <p class="control has-icon has-icon-right">
                <input name="email" v-if="isEditing" v-model="model.email" v-validate="'required|email'"
                       :class="{'input': true, 'is-danger': errors.has('email') }" type="text" placeholder="">
                <span v-if="isEditing" class="icon user">
                    <i class="glyphicon glyphicon-lock"></i>
                </span>
                <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
                <label v-if="!isEditing">{{ model.email }}</label>
            </p>
        </div>
        <div class="field">
            <label class="label" for="firstName">First Name</label>
            <p class="control has-icon has-icon-right">
                <input name="firstname" v-if="isEditing" v-model="model.firstName" v-validate="'required'"
                       :class="{'input': true, 'is-danger': errors.has('firstname') }" type="text">
                <span v-if="isEditing" class="icon user">
                    <i class="glyphicon glyphicon-lock"></i>
                </span>
                <span v-show="errors.has('firstname')" class="help is-danger">{{ errors.first('firstname') }}</span>
                <label v-if="!isEditing">{{ model.firstName }}</label>
            </p>
        </div>
        <div class="field">
            <label class="label" for="lastName">Last Name</label>
            <p class="control has-icon has-icon-right">
                <input name="lastname" v-if="isEditing" v-model="model.lastName" v-validate="'required'"
                       :class="{'input': true, 'is-danger': errors.has('lastname') }" type="text">
                <span v-if="isEditing" class="icon user">
                    <i class="glyphicon glyphicon-lock"></i>
                </span>
                <span v-show="errors.has('lastname')" class="help is-danger">{{ errors.first('lastname') }}</span>
                <label v-if="!isEditing">{{ model.lastName }}</label>
            </p>
        </div>
        <div class="field">
            <label class="label" for="location">Origin location</label>
            <div class="control">
                <locationsearch v-if="isEditing" :initialData="model.locationDetail" @onSelected="onLocationSelected($event)"></locationsearch>
                <span v-show="errors.has('location')" class="help is-danger">{{ errors.first('location') }}</span>
                <label v-if="!isEditing">{{ model.locationDetail ? model.locationDetail.name : ''}}</label>
            </div>
        </div>
        <div class="field">
            <label class="label" for="phoneNumber">Phone Number</label>
            <p class="control has-icon has-icon-right">
                <input name="phone" v-if="isEditing" v-model="model.phone" class="input" type="text">
                <span v-if="isEditing" class="icon user">
                    <i class="glyphicon glyphicon-lock"></i>
                </span>
                <label v-if="!isEditing">{{ model.phone }}</label>
            </p>
        </div>
        <div class="field">
            <label class="label" for="gender">Gender</label>
            <select name="gender" class="select" v-if="isEditing" v-model="model.gender">
                <option value="" selected="selected">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>
            <label v-if="!isEditing">{{ model.gender }}</label>
        </div>
        <div class="field">
            <label class="label" for="birthday">Birthday</label>
            <datepicker v-if="isEditing" v-model="model.birthday"></datepicker>
            <label v-if="!isEditing">{{ model.birthday }}</label>
        </div>
        <div class="field">
            <label class="label" for="description">Description</label>
            <textarea class="textarea" v-if="isEditing" name="description"
                      placeholder="Short description about yourself"
                      v-model="model.description" cols="40" rows="5"></textarea>
            <label v-if="!isEditing">{{ model.description }}</label>
        </div>
        <div class="field">
            <label class="label" for="address">Address</label>
            <input type="text" v-if="isEditing" class="input" name="address"
                   placeholder="Your current address"
                   v-model="model.address">
            <label v-if="!isEditing">{{ model.address }}</label>
        </div>
        <div class="field">
            <label class="label" for="emergencyContact">Emergency contact</label>
            <input type="text" v-if="isEditing" class="input" name="emergencyContact"
                   placeholder="Your emergency contact"
                   v-model="model.emergencyContact">
            <label v-if="!isEditing">{{ model.emergencyContact }}</label>
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
        <div class="container is-gapless is-flex is-sticky-bottom">
            <button class="column is-full button mtl_button-no-round" v-if="!isEditing && canEdit" @click="onEdit">Edit</button>
            <button class="column is-half button mtl_button-no-round" v-if="isEditing" @click="onInsertorUpdate">Submit</button>
            <button class="column is-half button mtl_button-no-round" v-if="isEditing" @click="onCancelEdit">Cancel</button>
        </div>
        <!--<div class="columns container is-flex is-hidden-mobile">
            <button class="column hero-buttons mtl_button" v-if="!isEditing" @click.prevent="onEdit">Edit</button>
            <button class="column hero-buttons mtl_button" v-if="isEditing" @click="onInsertorUpdate">Submit</button>
            <button class="column hero-buttons mtl_button" v-if="isEditing" @click="onCancelEdit">Cancel</button>
        </div>-->
    </div>
</template>

<script lang="ts">
import UserDetailComponent from "./userdetail.component.ts";
export default UserDetailComponent;
</script>