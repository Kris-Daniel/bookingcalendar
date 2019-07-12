const TestingMixin = {
    created() {},
    methods: {
        exists(prop, func) {
            return prop ? func() : null;
        }
    },
}
export default TestingMixin;