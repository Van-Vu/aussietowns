<template>
        <div class="container is-fluid tile" :class="{editing:isEditing}">
            <div class="tile is-8 is-vertical is-parent">
                <div class="box">
                    <div class="field">
                        <label v-if="isEditing" class="label" for="header">Header</label>
                        <div class="control has-icon has-icon-right">
                            <input name="description" v-if="isEditing" v-model="model.header" v-validate:header.initial="'required'"
                                   :class="{'input': true, 'is-danger': errors.has('header') }" type="text" placeholder="">
                            <span v-if="isEditing" class="icon">
                                <i class="glyphicon glyphicon-lock"></i>
                            </span>
                            <span v-show="errors.has('header')" class="help is-danger">{{ errors.first('header') }}</span>
                            <label v-if="!isEditing">{{ model.header }}</label>
                        </div>
                    </div>
                    <div class="field">
                        <label v-if="isEditing" class="label" for="header">Images</label>
                        <imageupload id="imageupload" :isEditing="isEditing" :uploadType="0" :images="model.imageList" @uploadImageCompleted="onUploadImageCompleted"></imageupload>
                    </div>

                    <div class="field">
                        <label class="label">Host</label>
                        <div class="control">
                            <participant participantType="Host" :participants="model.tourOperators" :isEditing="isEditing"
                                         @userAdded="onUserAdded" @userRemoved="onUserRemoved"></participant>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label" for="password">Where</label>
                        <div class="control has-icon has-icon-right">
                            <locationsearch v-if="isEditing" :initialData="model.locationDetail" @onSelected="onLocationSelected($event)"></locationsearch>
                            <label v-if="!isEditing">{{ model.locationDetail.name }}</label>
                            <span v-if="isEditing" class="icon">
                                <i class="glyphicon glyphicon-lock"></i>
                            </span>
                            <span v-show="errors.has('location')" class="help is-danger">{{ errors.first('location') }}</span>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label" for="cost">Cost</label>
                        <p class="control has-icon has-icon-right">
                            <input name="cost" v-if="isEditing" v-model="model.cost" v-validate="'required|numeric'" v-mask="'###'"
                                   :class="{'input': true, 'is-danger': errors.has('cost') }" type="text" placeholder="Cost per person">
                            <span v-if="isEditing" class="icon user">
                                <i class="glyphicon glyphicon-lock"></i>
                            </span>
                            <span v-show="errors.has('cost')" class="help is-danger">{{ errors.first('cost') }}</span>
                            <label v-if="!isEditing">{{ model.cost }}</label>
                        </p>
                    </div>
                    <div class="field">
                        <label class="label" for="description">Description</label>
                        <p class="control has-icon has-icon-right">
                            <input name="description" v-if="isEditing" v-model="model.description" v-validate.initial="'required'"
                                   :class="{'input': true, 'is-danger': errors.has('description') }" type="text" placeholder="">
                            <span v-if="isEditing" class="icon user">
                                <i class="glyphicon glyphicon-lock"></i>
                            </span>
                            <span v-show="errors.has('description')" class="help is-danger">{{ errors.first('description') }}</span>
                            <label v-if="!isEditing">{{ model.description }}</label>
                        </p>
                    </div>
                    <div v-show="isOffer" class="field">
                        <label class="label" for="expectation">What to expect</label>
                        <div class="control has-icon has-icon-right">
                            <textarea name="expectation" v-if="isEditing" class="textarea" v-model="model.expectation" cols="40" rows="5"></textarea>
                            <label v-if="!isEditing">{{ model.expectation }}</label>
                        </div>
                    </div>
                    <div v-show="isOffer" class="field">
                        <label class="label" for="requirement">Requirement</label>
                        <div class="control has-icon has-icon-right">
                            <textarea name="requirement" v-if="isEditing" class="textarea" v-model="model.requirement" cols="40" rows="5"></textarea>
                            <label v-if="!isEditing">{{ model.requirement }}</label>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label" for="participants">Minimum participants</label>
                        <select id="participants" v-if="isEditing" class="select" v-model="model.minParticipant">
                            <option value="0" selected="selected">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                        <label v-if="!isEditing">{{ model.minParticipant }}</label>
                    </div>
                    <div v-if="model.tourGuests.length > 0" class="field">
                        <label class="label">Participants</label>
                        <div class="control">
                            <participant participantType="Participant" :participants="model.tourGuests" :isEditing="isEditing"
                                         @userAdded="onUserAdded" @userRemoved="onUserRemoved"></participant>
                        </div>
                    </div>
                    <div class="container is-gapless is-flex is-sticky-bottom">
                        <button class="column is-full button mtl_button" v-if="!isEditing" @click="onEdit">Edit</button>
                        <button class="column is-half button mtl_button-round-left" v-if="isEditing" @click="onInsertorUpdate">Submit</button>
                        <button class="column is-half button mtl_button-round-right" v-if="isEditing" @click="onCancelEdit">Cancel</button>
                    </div>
                    <!--<div class="columns container is-flex is-hidden-mobile">
                        <button class="column hero-buttons mtl_button" v-if="!isEditing" @click.prevent="onEdit">Edit</button>
                        <button class="column hero-buttons mtl_button" v-if="isEditing" @click="onInsertorUpdate">Submit</button>
                        <button class="column hero-buttons mtl_button" v-if="isEditing" @click="onCancelEdit">Cancel</button>
                    </div>-->
                </div>
            </div>
            <div class="tile is-vertical is-parent">
                <div class="field box">
                    <label class="label">Schedule</label>
                    <div v-show="isOffer" class="control">
                        <ul>
                            <li v-for="schedule in model.schedules">
                                <div>
                                    <label class="label">Start from</label>
                                    <label>{{ schedule.startTime }}</label>
                                </div>
                                <div>
                                    <label class="label">Duration</label>
                                    <label>{{ schedule.duration }}</label>
                                </div>
                                <div>
                                    <label class="label">Repeated</label>

                                    <!--Bodom hack: doesn't work when jump directly to URL-->
                                    <label>{{ schedule.summaryText ? schedule.summaryText() : schedule.repeatedType == 1 ? 'Daily' : schedule.repeatedType == 2 ? 'Weekly' : 'Monthly'}}</label>
                                </div>
                                <div>
                                    <button v-if="!isEditing" class="button mtl_button mtl-btn-large relative-center-x" @click.prevent="checkAvailability(schedule)">Check Availability</button>
                                    <button v-if="isEditing" class="button  mtl_button relative-center-x" @click.prevent="onEditSchedule(schedule)">Edit Schedule</button>
                                </div>
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