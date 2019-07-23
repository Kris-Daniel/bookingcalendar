import * as $ from 'jquery';

export default class LoaderLibs{
    constructor() {
        this.setGlobalNpmLibs()
            .setGlobalLocalLibs();
    }

    setGlobalNpmLibs() {
        window.$ = $;
        
        return this;
    }

    setGlobalLocalLibs() {

        return this;
    }
}