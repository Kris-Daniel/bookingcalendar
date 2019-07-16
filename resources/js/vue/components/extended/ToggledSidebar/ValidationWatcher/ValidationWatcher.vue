<template>
    <div class="validation-wathcer"></div>
</template>

<script>
import Vue from 'vue';
import FindParentMixin from "Mixins/FindParentMixin";

export default {
    name: "ValidationWatcher",
    mixins: [FindParentMixin],
    data() {
        return {
            store: ""
        }
    },
    computed: {
        applyValid() {
            return this.exists(this.store, () => {
                return this.store.applyValid;
            })
        }
    },
    watch: {
        applyValid() {
            if(this.applyValid) {
                this.store.afterValidationCallback();
                this.store.afterValidationCallback = false;
                this.store.applyValid = false;
                console.log("applyToDays works");
            }
        }
    },
}
</script>