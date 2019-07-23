export default class LabelCheck {
    constructor(label) {
        this.$label = $(label);
        this.$input = this.$label.find('input');
        let req = this.$label.data('req');
        this.req = req ? true : false;

        this.setOnChange();
    }

    setOnChange() {
        this.$input.change(() => {
            if (this.$label.hasClass('wrong'))
                this.$label.removeClass('wrong')
        })
    }

    validate() {
        if (!this.$input.is(':checked') &&  this.req) {
            this.$label.addClass('wrong');
            return false;
        }
        return true;
    }
}