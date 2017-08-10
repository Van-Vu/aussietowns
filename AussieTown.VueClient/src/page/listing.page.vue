<template>
        <div class="page-content container tile" :class="{editing:isEditing}">
            <div class="listing-main-content tile is-8 is-vertical box">
                    <div class="box-header-strip"></div>
                    <div class="columns">
                        <div v-if="isEditing" class="column is-2" for="header">Header</div>
                        <div class="column is-10 control has-icon has-icon-right">
                            <input name="header" v-if="isEditing" v-model="model.header" v-validate="'required'"
                                   :class="{'input': true, 'is-danger': errors.has('header') }" type="text" placeholder="">
                            <span v-if="isEditing" class="icon">
                                <i class="glyphicon glyphicon-lock"></i>
                            </span>
                            <span v-show="errors.has('header')" class="help is-danger">{{ errors.first('header') }}</span>
                            <label v-if="!isEditing">{{ model.header }}</label>
                        </div>
                    </div>
                    <div v-if="isOffer" class="field">
                        <label v-if="isEditing" class="label" for="header">Images</label>
                        <imageupload id="imageupload" :isEditing="isEditing" :uploadType="0" :images="model.imageList" @uploadImageCompleted="onUploadImageCompleted"></imageupload>
                    </div>

                    <div v-show="isOffer" class="columns">
                        <div class="column is-2">Host</div>
                        <div class="column is-10">
                            <participant participantType="Host" :participants="model.tourOperators" :isEditing="isEditing"
                                         @userAdded="onUserAdded" @userRemoved="onUserRemoved"></participant>
                        </div>
                    </div>
                    <hr/>
                    <div class="columns">
                        <div class="column is-2">Where</div>
                        <div class="column is-10 control has-icon has-icon-right">
                            <locationsearch v-if="isEditing" :initialData="model.locationDetail" @onSelected="onLocationSelected($event)"></locationsearch>
                            <label v-if="!isEditing">{{ model.locationDetail ? model.locationDetail.name : ''}}</label>
                            <span v-if="isEditing" class="icon">
                                <i class="glyphicon glyphicon-lock"></i>
                            </span>
                            <span v-show="errors.has('location')" class="help is-danger">{{ errors.first('location') }}</span>
                        </div>
                    </div>
                    <hr />
                    <div class="columns">
                        <div class="column is-2">Description</div>
                        <div class="column is-10 control has-icon has-icon-right">
                            <textarea name="description" v-if="isEditing" v-model="model.description" v-validate="'required'"
                                   :class="{'textarea': true, 'is-danger': errors.has('description') }" cols="40" rows="10" placeholder=""></textarea>
                            <span v-if="isEditing" class="icon user">
                                <i class="glyphicon glyphicon-lock"></i>
                            </span>
                            <span v-show="errors.has('description')" class="help is-danger">{{ errors.first('description') }}</span>
                            <label v-if="!isEditing">{{ model.description }}</label>
                        </div>
                    </div>
                    <hr v-show="isOffer"/>
                    <div v-show="isOffer" class="columns">
                        <div class="column is-2">What to expect</div>
                        <div class="column is-10 control has-icon has-icon-right">
                            <textarea name="expectation" v-if="isEditing" class="textarea" v-model="model.expectation" cols="40" rows="5"></textarea>
                            <label v-if="!isEditing">{{ model.expectation }}</label>
                        </div>
                    </div>
                    <hr />
                    <div v-show="isOffer" class="columns">
                        <div class="column is-2">Requirement</div>
                        <div class="column is-10 control has-icon has-icon-right">
                            <textarea name="requirement" v-if="isEditing" class="textarea" v-model="model.requirement" cols="40" rows="5"></textarea>
                            <label v-if="!isEditing">{{ model.requirement }}</label>
                        </div>
                    </div>
                    <hr v-show="isOffer"/>
                    <div class="columns">
                        <div class="column is-2" for="participants">Minimum participants</div>
                        <div class="column is-10">
                            <numberchooser v-if="isEditing" v-model="model.minParticipant"></numberchooser>
                            <label v-if="!isEditing">{{ model.minParticipant }}</label>
                        </div>
                    </div>
                    <hr />
                    <div v-if="model.tourGuests.length > 0" class="field">
                        <label class="label">Participants</label>
                        <div class="control">
                            <participant participantType="Participant" :participants="model.tourGuests" :isEditing="isEditing"
                                         @userAdded="onUserAdded" @userRemoved="onUserRemoved"></participant>
                        </div>
                    </div>
                    <div class="container is-gapless is-flex is-sticky-bottom">
                        <button class="column is-full button mtl_button-no-round" v-if="!isEditing" @click="onEdit">Edit</button>
                        <button class="column is-half button mtl_button-round-left" v-if="isEditing" @click="onInsertorUpdate">Submit</button>
                        <button class="column is-half button mtl_button-round-right" v-if="isEditing" @click="onCancelEdit">Cancel</button>
                    </div>
            </div>
            <div v-show="isOffer" class="tile is-vertical is-parent " :class="{'is-sticky-box': isStickyBoxRequired}">
                <div class="box cost">
                    <label v-if="isEditing" class="label" for="cost">Cost</label>
                    <div class="price" v-if="!isEditing">{{ model.cost }}</div>
                    <div class="control has-icon has-icon-right">
                        <input name="cost" v-if="isEditing" v-model="model.cost" v-validate="'required|numeric'" v-mask="'###'"
                               :class="{'input': true, 'is-danger': errors.has('cost') }" type="text" placeholder="Cost per person">
                        <span v-if="isEditing" class="icon user">
                            <i class="glyphicon glyphicon-lock"></i>
                        </span>
                        <span v-show="errors.has('cost')" class="help is-danger">{{ errors.first('cost') }}</span>
                    </div>
                </div>

                <div class="field box">
                    <div class="box-header-strip"></div>
                    <label class="label">Schedule</label>
                    <div v-show="isOffer" class="control">
                        <ul v-show="!showAvailability">
                            <li v-for="schedule in model.schedules">
                                <div class="columns is-gapless">
                                    <label class="column is-5">Start</label>
                                    <label class="column">{{ schedule.startTime }}</label>
                                </div>
                                <div class="columns is-gapless">
                                    <label class="column is-5">Duration</label>
                                    <label class="column">{{ schedule.duration }}</label>
                                </div>
                                <div class="columns is-gapless">
                                    <label class="column is-5">Repeated</label>
                                    <!--Bodom hack: doesn't work when jump directly to URL-->
                                    <label class="column">{{ schedule.summaryText ? schedule.summaryText() : schedule.repeatedType == 1 ? 'Daily' : schedule.repeatedType == 2 ? 'Weekly' : 'Monthly'}}</label>
                                </div>
                                <div class="columns is-gapless">
                                    <button v-if="!isEditing" id="checkAvailability" class="button mtl_button-no-round mtl-btn-large relative-center-x" @click.prevent="checkAvailability(schedule)">Check Availability</button>
                                    <button v-if="isEditing" class="button  mtl_button relative-center-x" @click.prevent="onEditSchedule(schedule)">Edit Schedule</button>
                                </div>
                            </li>
                        </ul>
                        <ul v-show="showAvailability">
                            <li>
                                <availabilityCheck :bookingDate="bookingDate" @bookingDateChanged="onBookingDateChanged"
                                                   :participants="bookingNumber" @participantChanged="onParticipantChanged"
                                                   :disableDays="disableDays">
                                </availabilityCheck>
                            </li>
                        </ul>
                    </div>
                    <!--<div v-show="!isOffer" class="control">
                        <template v-for="schedule in model.schedules">
                            <datepicker v-model="schedule.startDate"></datepicker>
                            <datepicker v-model="schedule.endDate"></datepicker>
                        </template>
                    </div>-->
                </div>

                <div class="field box is-hidden-mobile is-child">
                    <label class="label">Other </label>
                    <p>test 1</p>
                    <p>test 1</p>
                    <p>test 1</p>
                    <p>test 1</p>
                    <p>test 1</p>
                    <p>test 1</p>
                </div>
            </div>
            <schedulemodal :show="showScheduleModal" :schedule="editingSchedule" @onSave="onSaveSchedule" @onClose="showScheduleModal= !showScheduleModal"></schedulemodal>
        </div>
</template>

<script lang="ts">
    import ListingPage from './listing.page.ts'
    export default ListingPage
</script>