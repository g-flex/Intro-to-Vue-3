class Loader {

    constructor() {
        this.callback = null;
        this.loader = document.getElementById('loader');
        this.openLoaders = {};
    }

    show(name = null) {
        if(name) { this.openLoaders[name] = true; }
        clearTimeout(this.callback);
        this.loader.classList.remove('d-n', 'hiding', 'showing');
        document.documentElement.style.overflow = 'hidden';
        document.body.scroll = "no";
        this.callback = setTimeout(()=>{ this.loader.classList.add('showing'); }, 20);
    }

    hide(name = null) {
        if(name) {
            if(Array.isArray(name)) {
                name.forEach(loaderName => { delete this.openLoaders[loaderName]; });
                delete this.openLoaders[name];
            } else {
                delete this.openLoaders[name];
            }
            if(Object.keys(this.openLoaders).length === 0) {
                this.hideFn();
            }
        } else {
            this.hideFn();
        }
    }

    hideFn() {
        clearTimeout(this.callback);
        this.loader.classList.remove('showing');
        this.loader.classList.add('hiding');
        document.documentElement.removeAttribute('style');
        document.body.scroll = "yes";
        this.callback = setTimeout(()=>{ this.loader.classList.add('d-n'); }, 300);
    }

    showTargeted(target) {
        if(target && (!target.classList.contains('loading-element') || !target.querySelector('.item-loader'))) {
            target.classList.add('loading-element');
            let newLoader = document.getElementById('loader').cloneNode(true);
            newLoader.removeAttribute('id');
            newLoader.classList.add('item-loader', 'showing');
            newLoader.style.opacity = '0';
            if(target.offsetHeight < 70) { newLoader.classList.add(target.offsetHeight < 20 ? 'xsmall' : 'small'); }
            target.appendChild(newLoader);
            newLoader.classList.remove('d-n');
            setTimeout(()=>{ if(newLoader) { newLoader.style = ''; } }, 20);
        }
    }
    hideTargeted(target) {
        if(target) {
            let loaders = target.querySelectorAll('.loader-container.item-loader');
            loaders.forEach(loader => {
                if(loader.parentElement === target) {
                    target.removeChild(loader);
                }
            });
            target.classList.remove('loading-element', 'showing');
        }
    }

    hideAll() {
        Loader.init().hide();
        this.openLoaders = {};
        let containers = document.querySelectorAll('.loading-element');
        containers.forEach(container => {
            Loader.init().hideTargeted(container);
        });
        Loader.init().hideTargeted(document.querySelector('body'));
    }

    static init() {

        if (!!Loader.instance) { return Loader.instance; }
        Loader.instance = new Loader();
        return Loader.instance;

    }

}