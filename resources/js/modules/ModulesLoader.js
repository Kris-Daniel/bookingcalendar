import LoaderLibs from './loaders/LoaderLibs';
import LoaderStore from './loaders/LoaderStore';
import LoaderServices from './loaders/LoaderServices';
import LoaderPagesJS from './loaders/LoaderPagesJS';

export default class ModulesLoader{
    constructor() {
        this.setLibs()
            .setStore()
            .setServices()
            .setPagesJS();

    }

    setLibs() {
        this.libs = new LoaderLibs();

        return this;
    }

    setStore() {
        this.store = new LoaderStore();
        
        return this;
    }

    setServices() {
        this.services = new LoaderServices();

        return this;
    }

    setPagesJS() {
        this.pagesJS = new LoaderPagesJS();

        return this;
    }
}