<template>
    <div class="tile is-vertical ">
        <header class="userdetail_heroimage">
            <!--<imageupload id="imageupload" :isEditing="isEditing" :uploadType="1" :images="model.images" class="is-profile" @uploadImageCompleted="onUploadImageCompleted"></imageupload>-->
            <img v-if="model.heroImageUrl" :src="model.heroImageUrl" alt="HeroImage"/>
            <input id="fileUpload" type="file" style="display:none;" @change="onUploadHeroImage($event.target.files); fileCount = $event.target.files.length" accept="image/*">
            <i class="icon icon-pencil icon-btn" @click.prevent="onReplaceHeroImage"></i>
        </header>
        <section class="tile is-parent">
            <div class="tile is-3 is-vertical">
                <!--<img src="http://via.placeholder.com/240x240" />
        <button class="button mtl_button-no-round" v-if="isEditing && canEdit" @click="onEdit">Change profile picture</button>-->
                <imageupload id="imageupload" :isEditing="isEditing" :uploadType="1" :images="model.images" class="is-profile" @uploadImageCompleted="onUploadImageCompleted"></imageupload>
            </div>
            <div class="userdetail container tile is-vertical is-parent" :class="{editing:isEditing}">
                <div class="columns">
                    <div class="column is-3">Email Address</div>
                    <div class="column is-9 control has-icon has-icon-right">
                        <input name="email" v-if="isEditing" v-model="model.email" v-validate="'required|email'"
                               :class="{'input': true, 'is-danger': errors.has('email') }" type="text" placeholder="">
                        <i v-if="isEditing" class="icon icon-lock"></i>
                        <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
                        <label v-if="!isEditing">{{ model.email }}</label>
                    </div>
                </div>
                <hr />
                <div class="columns">
                    <div class="column is-3">First Name</div>
                    <div class="column is-9 control has-icon has-icon-right">
                        <input name="firstname" v-if="isEditing" v-model="model.firstName" v-validate="'required|alpha_spaces|max:30'"
                               :class="{'input': true, 'is-danger': errors.has('firstname') }" type="text">
                        <i v-if="isEditing" class="icon icon-lock"></i>
                        <span v-show="errors.has('firstname')" class="help is-danger">{{ errors.first('firstname') }}</span>
                        <label v-if="!isEditing">{{ model.firstName }}</label>
                    </div>
                </div>
                <hr />
                <div class="columns">
                    <div class="column is-3">Last Name</div>
                    <div class="column is-9 control has-icon has-icon-right">
                        <input name="lastname" v-if="isEditing" v-model="model.lastName" v-validate="'required|alpha_spaces|max:30'"
                               :class="{'input': true, 'is-danger': errors.has('lastname') }" type="text">
                        <i v-if="isEditing" class="icon icon-lock"></i>
                        <span v-show="errors.has('lastname')" class="help is-danger">{{ errors.first('lastname') }}</span>
                        <label v-if="!isEditing">{{ model.lastName }}</label>
                    </div>
                </div>
                <hr />
                <div class="columns">
                    <div class="column is-3">Origin location</div>
                    <div class="column is-9">
                        <locationsearch v-if="isEditing" :initialData="model.locationDetail" @onSelected="onLocationSelected($event)"></locationsearch>
                        <span v-show="errors.has('location')" class="help is-danger">{{ errors.first('location') }}</span>
                        <label v-if="!isEditing">{{ model.locationDetail ? model.locationDetail.name : ''}}</label>
                    </div>
                </div>
                <hr />
                <div class="columns">
                    <div class="column is-3">Phone Number</div>
                    <div class="column is-9 control has-icon has-icon-right">
                        <input name="phone" v-if="isEditing" v-model="model.phone" class="input" type="text" v-mask="'##########'">
                        <i v-if="isEditing" class="icon icon-lock"></i>
                        <label v-if="!isEditing">{{ model.phone }}</label>
                    </div>
                </div>
                <hr />
                <div class="columns">
                    <div class="column is-3">Gender</div>
                    <div class="column is-9">
                        <div class="select" v-if="isEditing">
                            <select name="gender" v-model="model.gender">
                                <option value="" selected="selected">Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <label v-if="!isEditing">{{ model.gender }}</label>
                    </div>
                </div>
                <hr />
                <div class="columns">
                    <div class="column is-3">Birthday</div>
                    <div class="column is-9">
                        <datepicker v-if="isEditing" v-model="model.birthdayText"></datepicker>
                        <label v-if="!isEditing">{{ model.birthdayText }}</label>
                    </div>
                </div>
                <hr />
                <div class="columns">
                    <div class="column is-3">Description</div>
                    <div class="column is-9">
                        <textarea class="textarea" v-if="isEditing" name="description"
                                  placeholder="Short description about yourself"
                                  v-model="model.description" cols="40" rows="5"></textarea>
                        <label v-if="!isEditing">{{ model.description }}</label>
                    </div>

                </div>
                <hr />
                <div class="columns">
                    <div class="column is-3">Address</div>
                    <div class="column is-9">
                        <input type="text" v-if="isEditing" class="input" name="address"
                               placeholder="Your current address"
                               v-model="model.address">
                        <label v-if="!isEditing">{{ model.address }}</label>
                    </div>
                </div>
                <hr />
                <div class="columns">
                    <div class="column is-3">Emergency contact</div>
                    <div class="column is-9">
                        <input type="text" v-if="isEditing" class="input" name="emergencyContact" v-mask="'##########'"
                               placeholder="Your emergency contact"
                               v-model="model.emergencyContact">
                        <label v-if="!isEditing">{{ model.emergencyContact }}</label>
                    </div>
                </div>

                <div class="columns container is-gapless is-flex is-sticky-bottom">
                    <button class="column is-full-mobile is-2-desktop button mtl_button-no-round" v-if="!isEditing && canEdit" @click="onEdit">Edit</button>
                    <button class="column is-half-mobile is-2-desktop button mtl_button-no-round" v-if="isEditing" @click="onInsertorUpdate">Submit</button>
                    <button class="column is-half-mobile is-2-desktop button mtl_button-no-round" v-if="isEditing" @click="onCancelEdit">Cancel</button>
                </div>
            </div>
        </section>
    </div>

</template>

<script lang="ts">
import UserDetailComponent from "./userdetail.component.ts";
export default UserDetailComponent;
</script>