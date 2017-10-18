<!--https://github.com/charliekassel/vuejs-datepicker-->

<template>
    <div class="date-picker" :class="{'is-inline': inline}">
        <div class="input-wrapper" @mouseenter="showCancel = true" @mouseleave="showCancel = false">
            <div class="input-date" @click="togglePanel">{{range ? display[0] + ' -- ' + display[1] : display}}</div>
            <i class="icon icon-calendar"></i>
        </div>
        <transition name="toggle">
            <div class="date-panel" v-show="panelState" :style="coordinates">
                <div class="panel-header" v-show="panelType !== 'year'">
                    <div class="arrow-left" @click="prevMonthPreview()">&lt;</div>
                    <div class="year-month-box">
                        <div class="year-box" @click="chType('year')" v-text="tmpYear"></div>
                        <div class="month-box" @click="chType('month')">{{tmpMonth + 1 | month(language)}}</div>
                    </div>
                    <div class="arrow-right" @click="nextMonthPreview()">&gt;</div>
                </div>
                <div class="panel-header" v-show="panelType === 'year'">
                    <div class="arrow-left" @click="chYearRange(0)">&lt;</div>
                    <div class="year-range">
                        <span v-text="yearList[0]"></span> - <span v-text="yearList[yearList.length - 1]"></span>
                    </div>
                    <div class="arrow-right" @click="chYearRange(1)">&gt;</div>
                </div>
                <div class="type-year" v-show="panelType === 'year'">
                    <ul class="year-list">
                        <li v-for="item in yearList"
                            v-text="item"
                            :class="{selected: isSelected('year', item), invalid: validateYear(item)}" 
                            @click="selectYear(item)"
                        >
                        </li>
                    </ul>
                </div>
                <div class="type-month" v-show="panelType === 'month'">
                    <ul class="month-list">
                        <li v-for="(item, index) in monthList"
                            :class="{selected: isSelected('month', index), invalid: validateMonth(index)}" 
                            @click="selectMonth(index)"
                        >
                            {{item | month(language)}}
                        </li>
                    </ul>
                </div>
                <div class="type-date" v-show="panelType === 'date'">
                    <ul class="weeks">
                        <li v-for="item in weekList">{{item | week(language)}}</li>
                    </ul>
                    <ul class="date-list">
                        <li v-for="(item, index) in dateList"
                            :class="{preMonth: item.previousMonth, nextMonth: item.nextMonth, disable: item.isDisabled, 
                                invalid: validateDate(item), firstItem: (index % 7) === 0}"
                            @click="selectDate(item)">
                            <div class="message" :class="{selected: isSelected('date', item)}">
                                <div class="bg"></div><span v-text="item.value"></span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import {Utils} from '../../utils';

export default {
    data () {
        let now = new Date()
        return {
            showCancel: false,
            panelState: false,
            panelType: 'date',
            coordinates: {},
            year: now.getFullYear(),
            month: now.getMonth(),
            date: now.getDate(),
            tmpYear: now.getFullYear(),
            tmpMonth: now.getMonth(),
            tmpStartYear: now.getFullYear(),
            tmpStartMonth: now.getMonth(),
            tmpStartDate: now.getDate(),
            tmpEndYear: now.getFullYear(),
            tmpEndMonth: now.getMonth(),
            tmpEndDate: now.getDate(),
            minYear: Number,
            minMonth: Number,
            minDate: Number,
            maxYear: Number,
            maxMonth: Number,
            maxDate: Number,
            yearList: Array.from({length: 12}, (value, index) => new Date().getFullYear() + index),
            monthList: [1, 2, 3 ,4 ,5, 6, 7 ,8, 9, 10, 11, 12],
            weekList: [0, 1, 2, 3, 4, 5, 6],
            rangeStart: false,
            display: {}
        }
    },
    props: {
        language: {default: 'en'},
        min: {default: '1970-01-01'},
        max: {default: '3016-01-01'},
        inline: { type: Boolean, default: false },    
        value: { type: [String, Array], default: '' },
        disabled: { type: Object, default: () => {return {to: new Date()};} },
        range: { type: Boolean, default: false }
    },
    methods: {
        togglePanel () {
            this.panelState = !this.panelState
            this.rangeStart = false
        },
        isSelected (type, item) {
            switch (type){
                case 'year':
                    if(!this.range) return item === this.tmpYear
                    return (new Date(item, 0).getTime() >= new Date(this.tmpStartYear, 0).getTime() 
                        && new Date(item, 0).getTime() <= new Date(this.tmpEndYear, 0).getTime())
                case 'month':
                    if(!this.range) return item === this.tmpMonth && this.year === this.tmpYear
                    return (new Date(this.tmpYear, item).getTime() >= new Date(this.tmpStartYear, this.tmpStartMonth).getTime() 
                        && new Date(this.tmpYear, item).getTime() <= new Date(this.tmpEndYear, this.tmpEndMonth).getTime())
                case 'date':
                    if(!this.range) return this.date === item.value && this.month === this.tmpMonth && item.currentMonth
                    let month = this.tmpMonth
                    item.previousMonth && month--
                    item.nextMonth && month++
                    return (new Date(this.tmpYear, month, item.value).getTime() >= new Date(this.tmpStartYear, this.tmpStartMonth, this.tmpStartDate).getTime() 
                        && new Date(this.tmpYear, month, item.value).getTime() <= new Date(this.tmpEndYear, this.tmpEndMonth, this.tmpEndDate).getTime())
            }
        },
        chType (type) {
            this.panelType = type
        },
        chYearRange (next) {
            if(next){
                this.yearList = this.yearList.map((i) => i + 12)
            }else{
                this.yearList = this.yearList.map((i) => i - 12)
            }
        },
        prevMonthPreview () {
            this.tmpMonth = this.tmpMonth === 0 ? 0 : this.tmpMonth - 1
        },
        nextMonthPreview () {
            this.tmpMonth = this.tmpMonth === 11 ? 11 : this.tmpMonth + 1
        },
        selectYear (year) {
            if(this.validateYear(year)) return
            this.tmpYear = year
            this.panelType = 'month'
        },
        selectMonth (month) {
            if(this.validateMonth(month)) return
            this.tmpMonth = month
            this.panelType = 'date'
        },
        selectDate (date) {
            if (date.isDisabled) return

            setTimeout(() => {
                if(this.validateDate(date)) return
                if(date.previousMonth){
                    if(this.tmpMonth === 0){
                        this.year -= 1
                        this.tmpYear -= 1
                        this.month = this.tmpMonth = 11
                    }else{
                        this.month = this.tmpMonth - 1
                        this.tmpMonth -= 1
                    }
                }else if(date.nextMonth){
                    if(this.tmpMonth === 11){
                        this.year += 1
                        this.tmpYear += 1
                        this.month = this.tmpMonth = 0
                    }else{
                        this.month = this.tmpMonth + 1
                        this.tmpMonth += 1
                    }
                }
                if(!this.range){

                    this.year = this.tmpYear
                    this.month = this.tmpMonth
                    this.date = date.value
                    //let value = `${this.tmpYear}/${('0' + (this.month + 1)).slice(-2)}/${('0' + this.date).slice(-2)}`

                    let value = Utils.formatDate(new Date(this.tmpYear,this.month + 1,this.date));
                    this.$emit('input', value)
                    this.display = value
                    if (!this.inline) this.panelState = false

                }else if(this.range && !this.rangeStart){

                    this.tmpEndYear = this.tmpStartYear = this.tmpYear
                    this.tmpEndMonth = this.tmpStartMonth = this.tmpMonth
                    this.tmpEndDate = this.tmpStartDate = date.value

                    this.rangeStart = true

                }else if(this.range && this.rangeStart){
                        
                    this.tmpEndYear = this.tmpYear
                    this.tmpEndMonth = this.tmpMonth
                    this.tmpEndDate = date.value

                    let d1 = new Date(this.tmpStartYear, this.tmpStartMonth, this.tmpStartDate).getTime(),
                        d2 = new Date(this.tmpEndYear, this.tmpEndMonth, this.tmpEndDate).getTime()
                    if(d1 > d2){
                        let tmpY, tmpM, tmpD
                        tmpY = this.tmpEndYear 
                        tmpM = this.tmpEndMonth
                        tmpD = this.tmpEndDate

                        this.tmpEndYear = this.tmpStartYear
                        this.tmpEndMonth = this.tmpStartMonth
                        this.tmpEndDate = this.tmpStartDate

                        this.tmpStartYear = tmpY
                        this.tmpStartMonth = tmpM
                        this.tmpStartDate = tmpD
                    }
                    let RangeStart = `${this.tmpStartYear}/${('0' + (this.tmpStartMonth + 1)).slice(-2)}/${('0' + this.tmpStartDate).slice(-2)}`
                    let RangeEnd = `${this.tmpEndYear}/${('0' + (this.tmpEndMonth + 1)).slice(-2)}/${('0' + this.tmpEndDate).slice(-2)}`
                    let value = [RangeStart, RangeEnd]
                    this.display = value
                    this.$emit('input', value)

                    this.rangeStart = false
                    if (!this.inline) this.panelState = false
                }
            }, 0)
        },
        validateYear (year) {
            return (year > this.maxYear || year < this.minYear) ? true : false
        },
        validateMonth (month) {
            if(new Date(this.tmpYear, month).getTime() >= new Date(this.minYear, this.minMonth - 1).getTime()
                && new Date(this.tmpYear, month).getTime() <= new Date(this.maxYear, this.maxMonth - 1).getTime()){
                return false
            }
            return true
        },
        validateDate (date) {
            let mon = this.tmpMonth
            if(date.previousMonth){
                mon -= 1
            }else if(date.nextMonth){
                mon += 1
            }
            if(new Date(this.tmpYear, mon, date.value).getTime() >= new Date(this.minYear, this.minMonth - 1, this.minDate).getTime()
                && new Date(this.tmpYear, mon, date.value).getTime() <= new Date(this.maxYear, this.maxMonth - 1, this.maxDate).getTime()){
                return false
            }
            return true
        },
        close (e) {
            if((!this.$el.contains(e.target)) && (e.target.id != 'checkAvailability')) {
                this.panelState = false
                this.rangeStart = false
            }
        },
        clear() {
            this.$emit('input', this.range ? ['', ''] : '')
        },
        /**
            * Whether a day is disabled
            * @param {Date}
            * @return {Boolean}
            */
        isDisabledDate (date) {
            let disabled = false
            if (typeof this.disabled === 'undefined') {
                return false
                }
            if (typeof this.disabled.dates !== 'undefined') {
                this.disabled.dates.forEach((d) => {
                    if (date.toDateString() === d.toDateString()) {
                        disabled = true
                        return true
                    }
                })
            }

            if (typeof this.disabled.to !== 'undefined' && this.disabled.to && date < this.disabled.to) {
                disabled = true
            }

            if (typeof this.disabled.from !== 'undefined' && this.disabled.from && date > this.disabled.from) {
                disabled = true
            }

            if (typeof this.disabled.days !== 'undefined' && this.disabled.days.indexOf(date.getDay()) !== -1) {
                disabled = true
            }
            return disabled
        }
    },
    watch: {
        min (v) {
            let minArr = v.split('-')
            this.minYear = Number(minArr[0])
            this.minMonth = Number(minArr[1])
            this.minDate = Number(minArr[2])
        },
        max (v) {
            let maxArr = v.split('-')
            this.maxYear = Number(maxArr[0])
            this.maxMonth = Number(maxArr[1])
            this.maxDate = Number(maxArr[2])
        },
        range (newVal, oldVal) {
            if(newVal === oldVal) return
            if(newVal && Object.prototype.toString.call(this.value).slice(8, -1) === 'String'){
                this.$emit('input', ['', ''])
            }
            if(!newVal && Object.prototype.toString.call(this.value).slice(8, -1) === 'Array'){
                this.$emit('input', '')
            }
        }
    },
    computed: {
        dateList () {
            let dObj = new Date(this.tmpYear, this.tmpMonth, 0)
            let currentMonthLength = new Date(this.tmpYear, this.tmpMonth + 1, 0).getDate()
            let dateList = Array.from({length: currentMonthLength}, (val, index) => {
                dObj.setDate(dObj.getDate() + 1)
                return {
                    currentMonth: true,
                    value: index + 1,
                    isDisabled: this.isDisabledDate(dObj)
                }
            })
            let startDay = new Date(this.tmpYear, this.tmpMonth, 1).getDay()
            let previousMongthLength = new Date(this.tmpYear, this.tmpMonth, 0).getDate()

            for(let i = 0, len = startDay; i < len; i++){
                dateList = [{previousMonth: true, value: previousMongthLength - i}].concat(dateList)
            }
            for(let i = dateList.length, item = 1; i < 42; i++, item++){
                dateList[dateList.length] = {nextMonth: true, value: item}
            }
            return dateList
        }
    },
    filters: {
        week: (item, lang) => {
            switch (lang) {
                case 'en':
                    return {0: 'Su', 1: 'Mo', 2: 'Tu', 3: 'We', 4: 'Th', 5: 'Fr', 6: 'Sa'}[item]
                case 'ch':
                    return {0: '日', 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六'}[item]
                case 'uk':
                    return {0: 'Пн', 1: 'Вт', 2: 'Ср', 3: 'Чт', 4: 'Пт', 5: 'Сб', 6: 'Нд'}[item]
                default:
                    return item
            }
        },
        month: (item, lang) => {
            switch (lang) {
                case 'en':
                    return {1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun',
                        7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec'}[item]
                case 'ch':
                    return {1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六',
                        7: '七', 8: '八', 9: '九', 10: '十', 11: '十一', 12: '十二'}[item]
                case 'uk':
                    return {1: 'Січень', 2: 'Лютий', 3: 'Березень', 4: 'Квітень', 5: 'Травень', 6: 'Червень',
                        7: 'Липень', 8: 'Серпень', 9: 'Вересень', 10: 'Жовтень', 11: 'Листопад', 12: 'Грудень'}[item]
                default:
                    return item
            }
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.display = this.value
            if(this.$el.parentNode.offsetWidth + this.$el.parentNode.offsetLeft - this.$el.offsetLeft <= 300){
                this.coordinates = {right: '0', top: `${window.getComputedStyle(this.$el.children[0]).offsetHeight + 4}px`}
            }else{
                this.coordinates = {left: '0', top: `${window.getComputedStyle(this.$el.children[0]).offsetHeight + 4}px`}
            }
            let minArr = this.min.split('-')
            this.minYear = Number(minArr[0])
            this.minMonth = Number(minArr[1])
            this.minDate = Number(minArr[2])

            let maxArr = this.max.split('-')
            this.maxYear = Number(maxArr[0])
            this.maxMonth = Number(maxArr[1])
            this.maxDate = Number(maxArr[2])

            if(this.range){
                if(Object.prototype.toString.call(this.value).slice(8, -1) !== 'Array'){
                    throw new Error('Binding value must be an array in range mode.')
                }
                if(this.value.length){
                    let rangeStart = this.value[0].split('-')
                    let rangeEnd = this.value[1].split('-')
                    this.tmpStartYear = Number(rangeStart[0])
                    this.tmpStartMonth = Number(rangeStart[1]) - 1
                    this.tmpStartDate = Number(rangeStart[2])

                    this.tmpEndYear = Number(rangeEnd[0])
                    this.tmpEndMonth = Number(rangeEnd[1]) - 1
                    this.tmpEndDate = Number(rangeEnd[2])
                }else{
                    this.$emit('input', ['', ''])
                }
                    
            }
            if(!this.value){
                this.$emit('input', '')
            }
                
            if (this.inline) {this.panelState = true;}
            else{
                window.addEventListener('click', this.close)
            }

        })
    },
    beforeDestroy () {
        window.removeEventListener('click', this.close)
    }
}
</script>
