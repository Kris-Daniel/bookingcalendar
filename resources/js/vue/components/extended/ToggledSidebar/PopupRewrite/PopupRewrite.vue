<template>
    <div class="popup popup-rewrite" :class="{active: popupRewrite.show}">
        <div class="popup_overlay" @click="closePopup()"></div>
        <div class="popup_content">
            <div class="mb80 size18 lineh dark">
                For this days: 
                <span v-for="(weekDay, index) in popupRewrite.rewriteWeekNames" :key="weekDay" class="cyan italic">
                    {{weekDay}}<span v-if="index != popupRewrite.rewriteWeekNames.length - 1">,</span>
                </span>
                <br>
                You have a special schedule defined on {{popupRewrite.rewriteDaysCount}} date. Would you like to override it?
            </div>
            <div class="f0">
                <div class="a-6 text-left">
                    <div class="btn btn--min popup_btn" @click="applyWithoutOverride()">Don't override</div>
                </div>
                <div class="a-6 text-right">
                    <div class="btn btn--min btn--red popup_btn" @click="applyWithOverride()">Override</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import FindParentMixin from "VueMixins/FindParentMixin";
import ToggledSidebarMixin from "VueMixins/ToggledSidebarMixin";
export default {
    name: "PopupRewrite",
    mixins: [FindParentMixin, ToggledSidebarMixin],
    data() {
        return {
            store: ""
        }
    },
    computed: {
        popupRewrite() {
            return this.exists(this.store, () => {
                return this.store.popupRewrite;
            });
        },
    },
    created() {

    },
    methods: {
        applyWithOverride() {
            let rewriteArr = this.popupRewrite.specialDaysForRewrite;
            for(let i = 0; i < rewriteArr.length; i++) {
                for(let j = 0; j < rewriteArr.length; j++) {
                    this.removeScheduleFromSpecialDay(rewriteArr[i][j]);
                }
            }
            this.applyToDays(true);
        },
        applyWithoutOverride() {
            this.applyToDays(true);
        },
        closePopup() {
            this.store.applyValid = false;
            this.popupRewrite.show = false;
        }
    }
}
</script>
