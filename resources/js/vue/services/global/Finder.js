class FinderClass {
    constructor() { }

    getParent(obj, prop) {
        if (obj[prop]) return obj[prop];
        if (obj.$parent) return this.getParent(obj.$parent, prop);
        return false;
    }
}

const Finder = new FinderClass();
export default Finder;