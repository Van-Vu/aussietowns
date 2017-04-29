<template>
    <div>
        <form @submit.prevent="validateBeforeSubmit" v-if="!formSubmitted">
            <div class="field">
                <label class="label">Guests</label>
                <p class="control has-icon has-icon-right">
                </p>
            </div>
            <div class="field">
                <label class="label" for="password">Where</label>
                <p class="control has-icon has-icon-right">
                    <autocomplete name='location'
                                  v-model="location"
                                  v-validate:location.initial="'required'"
                                  :minChars="3"
                                  :list="list"
                                  :placeHolderText="placeHolderText"
                                  :keyword="searchStr"
                                  v-on:search="onLocationSearch($event)"
                                  v-on:select="onSelect($event)"></autocomplete>
                    <span class="icon">
                        <i class="glyphicon glyphicon-lock"></i>
                    </span>
                    <span v-show="errors.has('location')" class="help is-danger">{{ errors.first('location') }}</span>
                </p>
            </div>
            <div class="field">
                <label class="label" for="cost">Cost</label>
                <p class="control has-icon has-icon-right">
                    <input name="cost" v-model="cost" v-validate:cost.initial="'required|numeric'"
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
                    <input name="description" v-model="description" v-validate:description.initial="'required'"
                           :class="{'input': true, 'is-danger': errors.has('description') }" type="text" placeholder="">
                    <span class="icon user">
                        <i class="glyphicon glyphicon-lock"></i>
                    </span>
                    <span v-show="errors.has('description')" class="help is-danger">{{ errors.first('description') }}</span>
                </p>
            </div>
            <div class="field">
                <label class="label" for="expectation">What to expect</label>
                <p class="control has-icon has-icon-right">
                    <textarea name="expectation" class="textarea" v-model="expectation" cols="40" rows="5"></textarea>
                </p>
            </div>
            <div class="field">
                <label class="label" for="requirement">Requirement</label>
                <p class="control has-icon has-icon-right">
                    <textarea name="requirement" class="textarea" v-model="requirement" cols="40" rows="5"></textarea>
                </p>
            </div>
            <div class="field">
                <label class="label" for="participants">Minimum participants</label>
                <select id="participants" class="select" v-model="minParticipant">
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

        <!--<div class="form-group">
            <label for="location">Schedule</label>
            <div formArrayName="schedules" class="schedule">
                <div *ngFor="let schedule of this.model.controls.schedules.controls; let i=index" class="panel panel-default">
                    <div class="panel-heading">
                        <span>Schedule {{i + 1}}</span>
                        <span class="glyphicon glyphicon-remove pull-right" *ngIf="this.model.controls.schedules.controls.length > 1" (click)="removeAddress(i)"></span>
                    </div>
                    <div class="panel-body" [formGroupName]="i">
                        <schedule [scheduleIntance]="this.model.controls.schedules.controls[i]"></schedule>
                    </div>
                </div>
            </div>
        </div>-->
        <div v-else>
            <h1 class="submitted">Form submitted successfully!</h1>
        </div>
    </div>
</template>

<script lang="ts">
    import ListingRequestForm from './listingrequest.component.ts'
    export default ListingRequestForm
</script>