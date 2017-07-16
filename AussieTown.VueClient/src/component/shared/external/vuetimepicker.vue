// https://github.com/phoenixwong/vue2-timepicker

<template>
    <span class="time-picker">
        <input class="display-time" :id="id" v-model="displayTime" @click.stop="toggleDropdown" type="text" readonly />
        <span class="clear-btn" v-if="!hideClearButton" v-show="!showDropdown && showClearBtn" @click.stop="clearTime">&times;</span>
        <div class="time-picker-overlay" v-if="showDropdown" @click.stop="toggleDropdown"></div>
        <div class="dropdown" v-show="showDropdown">
            <div class="select-list">
                <ul class="hours">
                    <li v-for="hr in hours" v-text="hr" :class="{active: value === hr}" @click.stop="selectTime(hr)"></li>
                </ul>
            </div>
        </div>
    </span>
</template>
<script>
const CONFIG = {
  HOUR_TOKENS: ['HH', 'H', 'hh', 'h', 'kk', 'k'],
  MINUTE_TOKENS: ['mm', 'm']
}

export default {
  name: 'VueTimepicker',

  props: {
    value: {type: String},
    hideClearButton: {type: Boolean},
    format: {type: String},
    minuteInterval: {type: Number},
    secondInterval: {type: Number},
    id: {type: String}
  },

  data () {
    return {
      hours: [],
      minutes: [],
      seconds: [],
      apms: [],
      showDropdown: false,
      muteWatch: false,
      hourType: 'HH',
      minuteType: 'mm',
      secondType: '',
      apmType: '',
      hour: '',
      minute: '',
      second: '',
      apm: '',
      fullValues: undefined
    }
  },

  computed: {
    displayTime () {
        if (this.value) return this.value

      let formatString = String((this.format || 'HH:mm'))
      if (this.hour) {
        formatString = formatString.replace(new RegExp(this.hourType, 'g'), this.hour)
      }
      if (this.minute) {
        formatString = formatString.replace(new RegExp(this.minuteType, 'g'), this.minute)
      }
      return formatString
    },
    showClearBtn () {
      if ((this.hour && this.hour !== '') || (this.minute && this.minute !== '')) {
        return true
      }
      return false
    }
  },
  methods: {
    formatValue (type, i) {
      switch (type) {
        case 'H':
        case 'm':
        case 's':
          return String(i)
        case 'HH':
        case 'mm':
        case 'ss':
          return i < 10 ? `0${i}` : String(i)
        case 'h':
        case 'k':
          return String(i + 1)
        case 'hh':
        case 'kk':
          return (i + 1) < 10 ? `0${i + 1}` : String(i + 1)
        default:
          return ''
      }
    },

    checkAcceptingType (validValues, formatString, fallbackValue) {
      if (!validValues || !formatString || !formatString.length) { return '' }
      for (let i = 0; i < validValues.length; i++) {
        if (formatString.indexOf(validValues[i]) > -1) {
          return validValues[i]
        }
      }
      return fallbackValue || ''
    },

    renderFormat (newFormat) {
      newFormat = newFormat || this.format
      if (!newFormat || !newFormat.length) {
        newFormat = 'HH:mm'
      }

      this.hourType = this.checkAcceptingType(CONFIG.HOUR_TOKENS, newFormat, 'HH')
      this.minuteType = this.checkAcceptingType(CONFIG.MINUTE_TOKENS, newFormat, 'mm')

      this.renderList('minute')
      this.renderHoursList()
      //this.renderList('minute')

      const self = this
      this.$nextTick(() => {
        self.readValues()
      })
    },

    renderHoursList () {
      const hoursCount = (this.hourType === 'h' || this.hourType === 'hh') ? 12 : 24
      this.hours = []
      for (let i = 7; i < hoursCount; i++) {
          for (let j = 0; j < this.minutes.length; j++)
              this.hours.push(`${this.formatValue(this.hourType, i)}:${this.formatValue(this.minuteType, this.minutes[j])}`)
      }
    },

    renderList (listType, interval) {
      if (listType === 'second') {
        interval = interval || this.secondInterval
      } else if (listType === 'minute') {
        interval = interval || this.minuteInterval
      } else {
        return
      }

      if (interval === 0) {
        interval = 60
      } else if (interval > 60 || interval < 1) {
        interval = 1
      } else if (!interval) {
        interval = 1
      }

      if (listType === 'minute') {
        this.minutes = []
      } else {
        this.seconds = []
      }

      for (let i = 0; i < 60; i += interval) {
        if (listType === 'minute') {
          this.minutes.push(i)
        } else {
          this.seconds.push(i)
        }
      }
    },

    readValues () {
      //if (!this.value || this.muteWatch) { return }

      //const values = this.value.split(':')
      //if (values.length != 2) { return }

      //this.hour = values[0]
      //this.minute = values[1]

      //this.fillValues()
    },

    fillValues () {
      let fullValues = {}

      const baseHour = this.hour
      const baseHourType = this.hourType

      const hourValue = baseHour || baseHour === 0 ? Number(baseHour) : ''

      fullValues[token] = baseHour

      if (this.minute || this.minute === 0) {
        const minuteValue = Number(this.minute)
        fullValues.m = String(minuteValue)
        fullValues.mm = minuteValue < 10 ? `0${minuteValue}` : String(minuteValue)
      } else {
        fullValues.m = ''
        fullValues.mm = ''
      }

      this.fullValues = fullValues
      this.updateTimeValue(fullValues)
      this.$emit('change', {data: fullValues})
    },

    updateTimeValue (fullValues) {
      this.muteWatch = true

      const self = this

      const baseTimeValue = JSON.parse(JSON.stringify(this.value || {}))
      let timeValue = {}

      Object.keys(baseTimeValue).forEach((key) => {
        timeValue[key] = fullValues[key]
      })

      this.$emit('input', timeValue)

      this.$nextTick(() => {
        self.muteWatch = false
      })
    },

    toggleDropdown () {
      this.showDropdown = !this.showDropdown
    },

    selectTime(value) {
        this.$emit('input', value)
        this.showDropdown = false
    },

    clearTime () {
      this.hour = ''
      this.minute = ''
      this.second = ''
      this.apm = ''
    }
  },

  mounted () {
    this.renderFormat()
  }
}
</script>