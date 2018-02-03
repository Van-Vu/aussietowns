<template>
    <div class="tile is-vertical ">
        <header class="userdetail_heroimage">
            <figure class="image" v-bind:class="{ 'is-16by9': !model.heroImageUrl }">
                <img v-if="model.heroImageUrl" :src="model.heroImageUrl" alt="HeroImage" />
            </figure>
            <input id="heroImageUpload" type="file" style="display:none;" @change="onUploadHeroImage($event.target.files); fileCount = $event.target.files.length" accept="image/*">
            <i class="icon icon-pencil icon-btn" v-if="canEdit" @click.prevent="onReplaceHeroImage"></i>
            <zoneloading :isLoading="isHeroImageUploading" :loadingText="'Uploading'"></zoneloading>
        </header>
        <section class="tile is-parent">
            <div class="tile is-3 is-vertical userdetail_profileimage">
                <figure class="image is-square">
                    <img v-if="model.images && model.images.length > 0" class="profile-image" :src="model.images[0].url" alt="profile image" />
                </figure>
                <input id="profileImageUpload" type="file" style="display:none;" @change="onUploadProfileImage($event.target.files); fileCount = $event.target.files.length" accept="image/*">
                <i class="icon icon-pencil icon-btn" v-if="canEdit" @click.prevent="onReplaceProfileImage"></i>
                <zoneloading :isLoading="isProfileImageUploading" :loadingText="'Uploading'"></zoneloading>
            </div>
            <div class="userdetail container tile is-vertical is-parent" :class="{editing:isEditing}">
                <div class="tile is-parent">
                    <div class="tile is-3">Email Address</div>
                    <div class="tile is-vertical control has-icon has-icon-right">
                        <input name="email" v-if="isEditing" v-model="model.email" v-validate="'required|email'"
                               :class="{'input': true, 'is-danger': errors.has('email') }" type="text" placeholder="">
                        <i v-if="isEditing" class="icon icon-lock"></i>
                        <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
                        <label v-if="!isEditing">{{ model.email }}</label>
                    </div>
                </div>
                <hr />
                <div class="tile is-parent">
                    <div class="tile is-3">First Name</div>
                    <div class="tile is-vertical control has-icon has-icon-right">
                        <input name="firstname" v-if="isEditing" v-model="model.firstName" v-validate="'required|alpha_spaces|max:30'"
                               :class="{'input': true, 'is-danger': errors.has('firstname') }" type="text">
                        <i v-if="isEditing" class="icon icon-lock"></i>
                        <span v-show="errors.has('firstname')" class="help is-danger">{{ errors.first('firstname') }}</span>
                        <label v-if="!isEditing">{{ model.firstName }}</label>
                    </div>
                </div>
                <hr />
                <div class="tile is-parent">
                    <div class="tile is-3">Last Name</div>
                    <div class="tile is-vertical control has-icon has-icon-right">
                        <input name="lastname" v-if="isEditing" v-model="model.lastName" v-validate="'required|alpha_spaces|max:30'"
                               :class="{'input': true, 'is-danger': errors.has('lastname') }" type="text">
                        <i v-if="isEditing" class="icon icon-lock"></i>
                        <span v-show="errors.has('lastname')" class="help is-danger">{{ errors.first('lastname') }}</span>
                        <label v-if="!isEditing">{{ model.lastName }}</label>
                    </div>
                </div>
                <hr />
                <div class="tile is-parent">
                    <div class="tile is-3">Location</div>
                    <div class="tile">
                        <locationsearch v-if="isEditing" :initialData="model.locationDetail" @onSelected="onLocationSelected($event)"></locationsearch>
                        <span v-show="errors.has('location')" class="help is-danger">{{ errors.first('location') }}</span>
                        <label v-if="!isEditing">{{ model.locationDetail ? model.locationDetail.name : ''}}</label>
                    </div>
                </div>
                <hr v-if="false"/>
                <div class="tile is-parent" v-if="false">
                    <div class="tile is-3">Phone Number</div>
                    <div class="tile is-vertical control has-icon has-icon-right">
                        <input name="phone" v-if="isEditing" v-model="model.phone" class="input" type="text" v-mask="'##########'">
                        <i v-if="isEditing" class="icon icon-lock"></i>
                        <label v-if="!isEditing">{{ model.phone }}</label>
                    </div>
                </div>
                <hr v-if="false"/>
                <div class="tile is-parent" v-if="false">
                    <div class="tile is-3">Gender</div>
                    <div class="tile">
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
                <hr v-if="false"/>
                <div class="tile is-parent" v-if="false">
                    <div class="tile is-3">Birthday</div>
                    <div class="tile">
                        <datepicker v-if="isEditing" v-model="model.birthdayText"></datepicker>
                        <label v-if="!isEditing">{{ model.birthdayText }}</label>
                    </div>
                </div>
                <hr />
                <div class="tile is-parent">
                    <div class="tile is-3">About me</div>
                    <div class="tile">
                        <textarea class="textarea" v-if="isEditing" name="description"
                                  placeholder="Tell others a bit about yourself"
                                  v-model="model.description" cols="40" rows="5"></textarea>
                        <label v-if="!isEditing" v-html="model.descriptionText"></label>
                    </div>

                </div>
                <hr v-if="false">
                <div class="tile is-parent" v-if="false">
                    <div class="tile is-3">Address</div>
                    <div class="tile">
                        <input type="text" v-if="isEditing" class="input" name="address"
                               placeholder="Your current address"
                               v-model="model.address">
                        <label v-if="!isEditing">{{ model.address }}</label>
                    </div>
                </div>
                <hr v-if="false"/>
                <div class="tile is-parent" v-if="false">
                    <div class="tile is-3">Emergency contact</div>
                    <div class="tile">
                        <input type="text" v-if="isEditing" class="input" name="emergencyContact" v-mask="'##########'"
                               placeholder="Your emergency contact"
                               v-model="model.emergencyContact">
                        <label v-if="!isEditing">{{ model.emergencyContact }}</label>
                    </div>
                </div>
                <hr />
                <div class="tile is-parent">
                    <div class="tile is-3">My hobbies</div>
                    <div class="tile">
                        <checkButton :model="hobbyList" :checked="model.hobbies" :isEditing="isEditing" @onChange="onUpdatedHobbyList"></checkButton>
                    </div>
                </div>

                <hr />
                <div class="tile is-gapless is-flex is-sticky-bottom is-center">
                    <button class="tile is-6 is-full-mobile button mtl_button-no-round" v-if="!canEdit" @click="onEnquire">Contact me</button>
                    <button class="tile is-6 is-full-mobile is-2-desktop button mtl_button-no-round" v-if="!isEditing && canEdit" @click="onEdit">Edit</button>
                    <button class="tile is-6 is-half-mobile button mtl_button-no-round" v-if="isEditing" @click="onInsertorUpdate">Submit</button>
                    <button class="tile is-6 is-half-mobile button mtl_button-no-round" v-if="isEditing" @click="onCancelEdit">Cancel</button>
                </div>
            </div>
        </section>
    </div>

</template>

<script lang="ts">
import UserDetailComponent from "./userdetail.component.ts";
export default UserDetailComponent;
</script>