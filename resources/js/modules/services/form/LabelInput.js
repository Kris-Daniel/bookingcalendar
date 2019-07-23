import ValidatorText from 'Helpers/validators/ValidatorText';

export default class LabelInput {
    constructor(label, ErrorModule) {
        this.label = label;
        this.$label = $(label);
        this.$input = this.$label.find('input');
        this.$empty = this.$label.find('.lgn-label_empty');
        this.validator = this.$label.data('type') ? this.$label.data('type') : 'text';
        this.req = this.$label.data('req') ? true : false;
        this.ErrorModule = ErrorModule;

        // this.setClick();
        this.setFocusOut();
        this.setOnInput();
        this.setClickX();
        this.setClickEye();
    }

    setClick() {
        this.$label.click(event => {
            
        });
    }

    setClickX() {
        $(this.$label.find('.lgn-input_icon-x')).click(() => {
            this.$input.val('');
            this.setClass('active empty');
        });
    }

    setClickEye() {
        $(this.$label.find('.lgn-input_icon-eye')).click(() => {
            let type = this.$input.attr('type');
            this.$input.attr('type', type == 'password' ? 'text' : 'password')
        });
    }

    setFocusOut() {
        this.$input.on('focusout', event => {
            this.validate();
        });
    }

    setOnInput() {
        this.$input.on('input', event => {
            this.setClass('active');
        });
    }

    setClass(className) {
        this.label.className = 'lgn-label ' + className;
    }

    validate() {
        let str = this.$input.val();
        if (str.length == 0 && this.req) {
            this.setClass('wrong empty');
            return false;
        }
        else if (str.length == 0 && !this.req) {
            this.setClass('');
            return false;
        }
        else {
            let valid = ValidatorText[this.validator] ? ValidatorText[this.validator](str) : ValidatorText['text'](str);
            let className = 'correct';
            if (!valid) {
                className = 'wrong';
                if (this.validator == 'pass')
                    if(!(this.ErrorModule.type == 'login'))
                        this.ErrorModule.addError('pass_wrong');
                    else
                        this.ErrorModule.addError('email_pass');
                else if (this.validator == 'email')
                        this.ErrorModule.addError('email_wrong');
            }

            this.setClass(className);
            return valid;
        }
    }
}