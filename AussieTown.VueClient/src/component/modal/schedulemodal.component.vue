<template>
    <modalshell :show="show" @onClose="close">
        <div slot="body">
            <schedule :model="schedule" @onSave="onSaveSchedule"></schedule>
        </div>
    </modalshell>
</template>

<script lang="ts">
import ScheduleModalComponent from "./schedulemodal.component.ts";
export default ScheduleModalComponent;
</script>