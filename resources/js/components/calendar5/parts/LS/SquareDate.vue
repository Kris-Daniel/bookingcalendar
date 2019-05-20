<template>
    <div class="square-date f1">
            <div class="square-date_day">
                <div class="square-date_month">{{data.monthName.slice(0, 3)}}</div>
                {{data.name}}
            </div>
        <div class="square-date_year">{{data.year}}</div>
    </div>
</template>

<script>
export default {
    name: 'SquareDate',
    props: ['data']
}
</script>

<style lang="css" scoped>
</style>
