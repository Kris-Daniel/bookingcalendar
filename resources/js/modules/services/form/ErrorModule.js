export default class ErrorModule {
    constructor(box) {
        this.$box = $(box);
        this.type = this.$box.data('type');
        this.errors = {};

    }

    addError(error) {
        this.errors[error] = true;
        return this;
    }

    removeError(error) {
        if (this.errors[error])
            delete this.errors[error];
    }

    reset() {
        this.errors = {};
        $(".lgn-errors_ul").removeClass("active");
        this.$box.find(`.lgn-errors_li`).removeAttr("style");
        return this;
    }

    render() {
        if(Object.keys(this.errors).length) {
            $(".lgn-errors_ul").addClass("active");
            let i;
            for (i in this.errors) {
                this.$box.find(`[data-key='${i}']`).show();
            }
            this.$box.find(`[data-key='${i}']`).css({marginBottom: 0});
        }
        return this;
    }
}