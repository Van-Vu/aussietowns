<template>
        <div class="page-content listing-page tile" :class="{editing:isEditing}">
            <div class="tile is-parent listing-content is-8 is-vertical">
                    <div class="tile is-parent">
                        <div v-if="isEditing" class="tile is-2" for="header">Header</div>
                        <div class="tile is-vertical control has-icon has-icon-right">
                            <input name="header" v-if="isEditing" v-model="model.header" v-validate="'required|max: 100'"
                                   :class="{'input': true, 'is-danger': errors.has('header') }" type="text" placeholder="">
                            <i v-if="isEditing" class="icon icon-lock"></i>
                            <div v-show="errors.has('header')" class="help is-danger">{{ errors.first('header') }}</div>
                            <h1 v-if="!isEditing" class="listing-headertext">{{ model.header }}</h1>
                        </div>
                    </div>
                    <div v-if="isOffer && model.id" class="field" style="text-align:center;">
                        <label v-if="isEditing" class="label" for="header">Images</label>
                        <imageupload id="imageupload" :isEditing="isEditing" :uploadType="0" :images="model.imageList" @uploadImageCompleted="onUploadImageCompleted"></imageupload>
                    </div>

                    <div v-show="isOffer" class="tile is-parent">
                        <div class="tile is-2">Host</div>
                        <div class="tile">
                            <participant participantType="Host" :participants="model.tourOperators" :isEditing="isEditing"
                                         @userAdded="onUserAdded" @userRemoved="onUserRemoved"></participant>
                        </div>
                    </div>
                    <hr/>
                    <div class="tile is-parent">
                        <div class="tile is-2">Where</div>
                        <div class="tile is-vertical control has-icon has-icon-right">
                            <locationsearch v-model="model.locationDetail" v-if="isEditing" :initialData="model.locationDetail" @onSelected="onLocationSelected($event)"></locationsearch>
                            <label v-if="!isEditing">{{ model.locationDetail ? model.locationDetail.name : ''}}</label>
                            <i v-if="isEditing" class="icon icon-lock"></i>
                            <span v-show="errors.has('location')" class="help is-danger">{{ errors.first('location') }}</span>
                        </div>
                    </div>
                    <hr />
                    <div class="tile is-parent">
                        <div class="tile is-2">Description</div>
                        <div class="tile is-vertical control has-icon has-icon-right">
                            <textarea name="description" v-if="isEditing" v-model="model.description" v-validate="'required|max:3000'"
                                   :class="{'textarea': true, 'is-danger': errors.has('description') }" cols="40" rows="10" placeholder=""></textarea>
                            <!--<i v-if="isEditing" class="icon icon-lock"></i>-->
                            <span v-show="errors.has('description')" class="help is-danger">{{ errors.first('description') }}</span>
                            <label v-if="!isEditing" v-html="model.descriptionText"></label>
                        </div>
                    </div>
                    <hr v-show="isOffer"/>
                    <div v-show="isOffer" class="tile is-parent">
                        <div class="tile is-2">Requirement</div>
                        <div class="tile is-vertical control has-icon has-icon-right">
                            <textarea name="requirement" v-if="isEditing" class="textarea" v-model="model.requirement" cols="40" rows="5"  v-validate="'max:3000'"></textarea>
                            <label v-if="!isEditing" v-html="model.requirementText"></label>
                        </div>
                    </div>
                    <hr v-show="isOffer"/>
                    <div class="tile is-parent">
                        <div class="tile is-2" for="participants">Minimum participants</div>
                        <div class="tile">
                            <numberchooser v-if="isEditing" v-model="model.minParticipant"></numberchooser>
                            <label v-if="!isEditing">{{ model.minParticipant }}</label>
                            <span v-show="errors.has('minParticipant')" class="help is-danger">{{ errors.first('minParticipant') }}</span>
                        </div>
                    </div>
                    <hr />
                    <div v-if="model.tourGuests && model.tourGuests.length > 0" class="field">
                        <label class="label">Participants</label>
                        <div class="control">
                            <participant participantType="Participant" :participants="model.tourGuests" :isEditing="isEditing"
                                         :allowRemove="false" @userAdded="onUserAdded" @userRemoved="onUserRemoved"></participant>
                        </div>
                    </div>
                <div class="tile is-gapless is-flex is-sticky-bottom is-center">
                    <button class="tile is-6 is-full-mobile button mtl_button-no-round" v-if="!canEdit" @click="onEnquire">Contact host</button>
                    <button class="tile is-6 is-half-mobile button mtl_button-no-round" v-if="!isEditing && canEdit" @click="onEdit">Edit</button>
                    <button class="tile is-6 is-half-mobile button mtl_button-no-round" v-if="!isEditing && canEdit" @click="onManageBooking">Manage Booking</button>
                    <button class="tile is-6 is-half-mobile is-child button mtl_button-no-round" v-if="isEditing" @click="onInsertorUpdate">Submit</button>
                    <button class="tile is-6 is-half-mobile is-child button mtl_button-no-round" v-if="isEditing" @click="onCancelEdit">Cancel</button>
                </div>
            </div>
            <div class="tile is-vertical is-parent" :class="{'is-sticky-box': isStickyBoxRequired}">
                <div class="box cost">
                    <label v-if="isEditing" class="label" for="cost">Cost</label>
                    <div class="price" v-if="!isEditing">${{ model.cost }} AUD</div>
                    <div class="control has-icon has-icon-right" v-if="isEditing">
                        $<input name="cost" v-model="model.cost" v-validate="'required|numeric'" v-mask="'###'" style="width:180px;"
                               :class="{'input': true, 'is-danger': errors.has('cost') }" type="text" placeholder="Cost per person">
                        <i v-if="isEditing" class="icon icon-lock"></i>
                        <span v-show="errors.has('cost')" class="help is-danger">{{ errors.first('cost') }}</span>
                    </div>
                </div>

                <div class="box">
                    <div class="box-header-strip"></div>
                    <label class="label">Schedule</label>
                    <div v-show="isOffer">
                        <ul class="tile is-vertical">
                            <li v-for="schedule in model.schedules" class="tile is-vertical">
                                <div class="tile is-parent is-gapless">
                                    <label class="tile is-5">Date</label>
                                    <label class="tile">{{ schedule.repeatedText }}</label>
                                </div>
                                <div class="tile is-parent is-gapless">
                                    <label class="tile is-5">Start time</label>
                                    <label class="tile">{{ schedule.startTime }}</label>
                                </div>
                                <div class="tile is-parent is-gapless">
                                    <label class="tile is-5">Duration</label>
                                    <label class="tile">{{ schedule.durationText }}</label>
                                </div>
                                <div class="tile is-parent is-gapless">
                                    <button v-if="!isEditing" id="checkAvailability" class="button mtl_button-no-round mtl-btn-large relative-center-x" @click.prevent="checkAvailability(schedule)">Check Availability</button>
                                    <button v-if="isEditing" class="button mtl_button-no-round relative-center-x" @click.prevent="onEditSchedule(schedule)">Edit Schedule</button>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <ul v-show="!isOffer" class="control">
                        <li v-for="schedule in model.schedules">
                            <datepicker :range="true" v-model="schedule.dateRange"></datepicker>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
</template>

<script lang="ts">
    import ListingPage from './listing.page.ts'
    export default ListingPage
</script>