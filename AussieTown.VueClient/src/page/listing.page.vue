<template>
        <form @submit.prevent="onInsertorUpdate" class="container is-fluid" :class="{editing:isEditing}" style="top:55px;">
            <div class="field">
                <label class="label">Host</label>
                <div class="control">
                    <participant participantType="Host" :participants="model.tourOperators" 
                                 @userAdded="onUserAdded" @userRemoved="onUserRemoved"></participant>
                </div>
            </div>
            <div class="field">
                <label class="label" for="password">Where</label>
                <div class="control has-icon has-icon-right">
                    <locationsearch v-if="isEditing" :initialData="model.locationDetail" @onSelected="onLocationSelected($event)"></locationsearch>
                    <label v-if="!isEditing">{{ model.locationDetail.name }}</label>
                    <span class="icon">
                        <i class="glyphicon glyphicon-lock"></i>
                    </span>
                    <span v-show="errors.has('location')" class="help is-danger">{{ errors.first('location') }}</span>
                </div>
            </div>
            <div class="field">
                <label class="label" for="cost">Cost</label>
                <p class="control has-icon has-icon-right">
                    <input name="cost" v-if="isEditing" v-model="model.cost" v-validate:cost.initial="'required|numeric'" v-mask="'###'"
                           :class="{'input': true, 'is-danger': errors.has('cost') }" type="text" placeholder="Cost per person">
                    <span class="icon user">
                        <i class="glyphicon glyphicon-lock"></i>
                    </span>
                    <span v-show="errors.has('cost')" class="help is-danger">{{ errors.first('cost') }}</span>
                    <label v-if="!isEditing">{{ model.cost }}</label>
                </p>
            </div>
            <div class="field">
                <label class="label">Schedule</label>
                <div v-show="isOffer" class="control">
                    <ul>
                        <li v-for="schedule in model.schedules">
                            <button class="button" @click.prevent="onEditSchedule(schedule)">Schedule {{schedule.id}}</button>
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
            <div class="field">
                <label class="label" for="header">Header</label>
                <div class="control has-icon has-icon-right">
                    <input name="description" v-if="isEditing" v-model="model.header" v-validate:header.initial="'required'"
                           :class="{'input': true, 'is-danger': errors.has('header') }" type="text" placeholder="">
                    <span class="icon user">
                        <i class="glyphicon glyphicon-lock"></i>
                    </span>
                    <span v-show="errors.has('header')" class="help is-danger">{{ errors.first('header') }}</span>
                    <label v-if="!isEditing">{{ model.header }}</label>
                </div>
            </div>
            <div class="field">
                <label class="label" for="description">Description</label>
                <div class="control has-icon has-icon-right">
                    <input name="description" v-if="isEditing" v-model="model.description" v-validate:description.initial="'required'"
                           :class="{'input': true, 'is-danger': errors.has('description') }" type="text" placeholder="">
                    <span class="icon user">
                        <i class="glyphicon glyphicon-lock"></i>
                    </span>
                    <span v-show="errors.has('description')" class="help is-danger">{{ errors.first('description') }}</span>
                    <label v-if="!isEditing">{{ model.description }}</label>
                </div>
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
            <!--<button type="submit" class="button mtl_button">Submit</button>-->
            <div class="columns is-gapless is-flex is-sticky-bottom">
                <button class="button mtl_button is-sticky-bottom" v-if="!isEditing" @click.prevent="isEditing = true">Edit</button>
                <button type="submit" class="column is-half button mtl_button-round-left" v-if="isEditing" @click="isEditing = false">Submit</button>
                <button class="column is-half button mtl_button-round-right" v-if="isEditing" @click="isEditing = false">Cancel</button>
            </div>
            <schedulemodal :show="showScheduleModal" :schedule="editingSchedule" @onSave="onSaveSchedule" @onClose="showScheduleModal= !showScheduleModal"></schedulemodal>
        </form>
</template>

<script lang="ts">
    import ListingPage from './listing.page.ts'
    export default ListingPage
</script>