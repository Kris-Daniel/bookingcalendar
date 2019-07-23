import LabelCheck from './LabelCheck';
import LabelInput from './LabelInput';
import ErrorModule from './ErrorModule';

export default class FormsLoader{
    constructor() {
        $(document).ready(() => {
            this.setForms();
        });
    }

    setForms() {
        $('.lgn-form').each(function (index, item) {
            new Form(item);
        });
    }
}

class Form {
    constructor(form) {
        this.$form = $(form);
        this.inSubmit = false;
        this.inputLabels = {};
        this.equalLabels = {};
        this.checkLabels = [];
        this.redirectFlag = false;
        this.notRedirectFlag = false;
        this.ErrorModule = new ErrorModule(this.$form.find('.lgn-errors'));
        this.url = this.$form.attr('action');

        this.setInputs();
        this.setChecks();
        this.setSubmit();
    }

    setInputs() {
        this.$form.find('label.lgn-label').each((index, item) => {
            let $label = $(item);
            let $input = $label.find('input');
            let attr = $input.attr('name');

            let LabelItem;
            let equal;
            if (attr) {
                LabelItem = new LabelInput(item, this.ErrorModule);
                this.inputLabels[attr] = LabelItem;

                equal = $label.data('equal');
                if (equal) {
                    if (this.equalLabels[equal])
                        this.equalLabels[equal].push(LabelItem)
                    else
                        this.equalLabels[equal] = [LabelItem];
                }
            }
        });
    }

    setChecks() {
        this.$form.find('label.lgn-check').each((index, item) => {
            let $label = $(item);
            if ($label.data('req'))
                this.checkLabels.push(new LabelCheck($label));
        })
    }

    setSubmit() {
        this.$form.submit((e) => {
            e.preventDefault();
            if(this.inSubmit) return false;
            this.inSubmit = true;
            this.$form.addClass('disable');
            this.$form.find('.lgn-loader').addClass('active')

            if (this.redirectFlag) {
                window.location.replace(this.redirect);
                return false;
            }
            if (this.notRedirectFlag) return false;
            this.ErrorModule.reset();

            let isValid = true;
            for (let i in this.inputLabels) {
                if (this.inputLabels[i].req)
                    isValid = this.inputLabels[i].validate() ? isValid : false;

            }

            for (let i in this.equalLabels) {
                let arr = this.equalLabels[i];
                if (arr.length >= 2) {
                    let verifiable = arr[0].$input.val();
                    for (let j = 1; j < arr.length; j++) {
                        if (arr[j].$input.val() != verifiable) {
                            arr.forEach(element => {
                                element.setClass('wrong');
                            });
                            isValid = false;
                            if (!isValid) this.ErrorModule.addError('passes_not_match');
                            break;
                        }
                    }
                }
            }

            this.checkLabels.forEach(function (item, index) {
                isValid = item.validate() ? isValid : false;
            });

            if (isValid) {
                let data = this.$form.serialize();
                $.ajax({
                    url: this.url,
                    type: 'post',
                    data,
                    error: (error) => {
                        setTimeout(() => {
                            this.$form.removeClass('disable');
                            this.$form.find('.lgn-loader').removeClass('active')
                            this.ErrorModule
                                .reset()
                                .addError('some_wrong')
                                .render();
                            this.inSubmit = false;
                        }, 1000);
                    }
                }).done((data, statusText, xhr) => {
                    this.$form.removeClass('disable');
                    this.$form.find('.lgn-loader').removeClass('active')

                    data = JSON.parse(data);
                    this.ErrorModule.reset();
                    if (data.status == 'redirect') {
                        if (data.redirect) {
                            let redirect = window.location.origin + data.redirect;
                            this.redirect = redirect;
                            window.location.replace(redirect);
                        }
                    }
                    else if (data.status == 'notRedirect') {
                        this.notRedirectFlag = true;
                        let $view = this.$form.closest('.lgn-view');
                        if ($view.length > 0) {
                            $view.find('.lgn-form-box').empty();
                            $view.find('.lgn-not-redirect').show();
                        }
                    }
                    else if (data.status == 'errors') {
                        if (data.errors.length) {
                            data.errors.forEach((err) => {
                                this.ErrorModule.addError(err);
                            });
                        } else
                            this.ErrorModule.addError('some_wrong');
                    }
                    else
                        this.ErrorModule.addError('some_wrong');

                    this.ErrorModule.render();
                    // console.log(data);
                    // console.log(statusText);
                    // console.log(xhr);
                    // console.log('Ajax Done');

                    setTimeout(() => {
                        this.inSubmit = false;
                    }, 2000);
                });
            }
            else {
                setTimeout(() => {
                    this.$form.removeClass('disable');
                    this.$form.find('.lgn-loader').removeClass('active')
                    this.ErrorModule.render();

                    setTimeout(() => {
                        this.inSubmit = false;
                    }, 2000);
                }, 400);
            }
        })
    }

    ajax() {

    }
}