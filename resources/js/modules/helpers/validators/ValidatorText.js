import VL from 'validator';
import v8n from "v8n";

for (let i in VL) {
    v8n.extend({
        ['_' + i]: () => value => VL[i](value)
    });
}
class ValidatorTextClass {
    constructor() { }

    text(str) {
        return v8n().string().minLength(1).maxLength(255).test(str);
    }

    name(str) {
        return v8n().string().minLength(1).maxLength(50).test(str);
    }

    email(str) {
        return v8n()._isEmail().test(str);
    }

    pass(str) {
        str = str.split('');
        return v8n()
            .some.lowercase()
            .some.uppercase()
            .some.pattern(/[0-9]/)
            .some.pattern(/[-!$%^&*()_+|~=`{}\[\]:";'<>?@#,.\/]/)
            // /[@$!%*-_#?&]/
            // /[-_@$!%*#?&]/
            .minLength(8)
            .maxLength(255)
            .test(str);
    }
}

const ValidatorText = new ValidatorTextClass();
export default ValidatorText;