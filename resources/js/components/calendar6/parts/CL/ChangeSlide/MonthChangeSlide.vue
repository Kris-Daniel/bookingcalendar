<template>
    <div class="change-slide center">
        <div class="mb10">Month</div>
        <div @click="changeSlide('prev')" class="change-slide_prev dinl-top">Prev</div>
        <div class="dinl-top ph20"></div>
        <div @click="changeSlide('next')" class="change-slide_next dinl-top">Next</div>
    </div>
</template>
<script>
export default {
    name: 'MonthChangeSlide',
    methods: {
        changeSlide(side) {
            this.$emit('myclick', side);
        }
    }
}
</script>