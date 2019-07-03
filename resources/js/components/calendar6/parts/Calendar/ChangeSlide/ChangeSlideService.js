class ChangeSlideServiceClass {
    
    constructor() {}

    click(component, side) {
        if(!component.wasClicked) {
            component.wasClicked = true;
            component.$emit("changeSlide", side);
            setTimeout(() => {
                component.wasClicked = false;
            }, 200);
        }
    }

}

let ChangeSlideService = new ChangeSlideServiceClass();
export default ChangeSlideService;