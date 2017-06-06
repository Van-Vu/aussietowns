<template>
    <div>
        <form @submit.prevent="validateBeforeSubmit" v-if="!formSubmitted">
            <div class="field">
                <label class="label">Guests</label>
                <p class="control has-icon has-icon-right">
                    <participant participantType="Guest" :participants="model.tourGuests"
                                 @userAdded="onUserAdded" @userRemoved="onUserRemoved"></participant>
                </p>
            </div>
            <div class="field">
                <label class="label" for="password">Where</label>d
                <div class="control has-icon has-icon-right">
                    <locationsearch :initialData="model.locationDetail" @onSelected="onLocationSelected($event)"></locationsearch>
                    <span class="icon">
                        <i class="glyphicon glyphicon-lock"></i>
                    </span>
                    <span v-show="errors.has('location')" class="help is-danger">{{ errors.first('location') }}</span>
                </div>
            </div>
            <div class="field">
                <label class="label" for="password">When</label>d
                <div class="control has-icon has-icon-right">
                    <template v-for="schedule in model">
                        <datepicker v-model="schedule.startDate"></datepicker>
                        <datepicker v-model="schedule.endDate"></datepicker>
                    </template>
                </div>
            </div>
            <div class="field">
                <label class="label" for="cost">Cost</label>
                <p class="control has-icon has-icon-right">
                    <input name="cost" v-model="model.cost" v-validate:cost.initial="'required|numeric'"
                           :class="{'input': true, 'is-danger': errors.has('cost') }" type="text" placeholder="Cost per person">
                    <span class="icon user">
                        <i class="glyphicon glyphicon-lock"></i>
                    </span>
                    <span v-show="errors.has('cost')" class="help is-danger">{{ errors.first('cost') }}</span>
                </p>
            </div>
            <div class="field">
                <label class="label" for="description">Description</label>
                <p class="control has-icon has-icon-right">
                    <input name="description" v-model="model.description" v-validate:description.initial="'required'"
                           :class="{'input': true, 'is-danger': errors.has('description') }" type="text" placeholder="">
                    <span class="icon user">
                        <i class="glyphicon glyphicon-lock"></i>
                    </span>
                    <span v-show="errors.has('description')" class="help is-danger">{{ errors.first('description') }}</span>
                </p>
            </div>
            <div class="field">
                <label class="label" for="participants">Minimum participants</label>
                <select id="participants" class="select" v-model="model.minParticipant">
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
            </div>
            <button type="submit" class="button">Submit</button>
        </form>
        <div v-else>
            <h1 class="submitted">Form submitted successfully!</h1>
        </div>
    </div>
</template>

<script lang="ts">
    import ListingRequestForm from './listingrequest.component.ts'
    export default ListingRequestForm
</script>