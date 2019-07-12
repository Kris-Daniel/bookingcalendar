const ChangeSlideMixin = {
    created() {},
    methods: {
        changeSlideWithDelay(component, side) {
            if(!component.wasClicked) {
                component.wasClicked = true;
                component.$emit("changeSlide", side);
                setTimeout(() => {
                    component.wasClicked = false;
                }, 320);
            }
        }
    },
}
export default ChangeSlideMixin;