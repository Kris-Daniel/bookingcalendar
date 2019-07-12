import store from "Store/GlobalSTORE";

class FinderClass {
    constructor() { }

    getParentId(obj, name) {
        if (obj[name]) return obj[name];
        if (obj.$parent) return this.getParentId(obj.$parent, name);
        return false;
    }

    getStoreModule(name) {
        return store.state[name] ? store.state[name] : false;
    }
}

const Finder = new FinderClass();
export default Finder;