<template>
    <div class="multiple-days-choser">
        <div class="multiple-days-choser_close" @click="closeView()">
            <AngleRight></AngleRight>
        </div>
        <div class="title rel mb30">Apply To Multiple</div>MultipleDaysChoser
    </div>
</template>

<script>
import ToggledSidebarSTORE from "../helpers/ToggledSidebarSTORE";
import AngleRight from "../../../../../svg/angle-right";

export default {
    name: "MultipleDaysChoser",
    components: {
        AngleRight
    },
    props: ["storeLink"],
    methods: {
        closeView() {
            this.storeLink.active = false;
        }
    }
};
</script>