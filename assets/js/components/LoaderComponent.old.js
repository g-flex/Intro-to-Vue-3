app.component('loader-component', {
    template:
        `<div class="loader-container" :change-fn="checkVisibility" :class="getCurrentClass">
        <div class="loader">
            <div class="loader__part loader__part--1"></div>
            <div class="loader__part loader__part--2"></div>
            <div class="loader__part loader__part--3"></div>
        </div>
    </div>`,
    data() {
        return {
            openLoaders: {},
            showingPhase: 1,
            callback: null
        }
    },
    props: {
        showing: {
            type: Boolean,
            required: true
        },
        name: { required: false }
    },
    computed: {
        getCurrentClass() {
            let returningClass = 'd-n';
            if(this.showingPhase === 2) {
                returningClass = '';
            } else if(this.showingPhase === 3) {
                returningClass = 'showing';
            } else if(this.showingPhase === -2) {
                returningClass = 'hiding';
            } else if(this.showingPhase === -3) {
                returningClass = 'd-n hiding';
            }
            return returningClass;
        },
        checkVisibility() {
            console.log('this.name: '+this.name)
            if(this.name !== null) {
                if(this.showing) {
                    this.show();
                } else {
                    this.hide();
                }
                this.$emit("change-name-fn");
            }
        }
    },
    methods: {
        editBodyOverflow: (isShowing) => {
            if(isShowing) {
                document.documentElement.style.overflow = 'hidden';
                document.body.scroll = "no";
            } else {
                document.documentElement.removeAttribute('style');
                document.body.scroll = "yes";
            }
        },
        show() {
            console.log('show')
            if(Object.keys(this.openLoaders).length === 0) {
                clearTimeout(this.callback);
                this.showingPhase = 2;
                this.editBodyOverflow(true);
                this.callback = setTimeout(()=>{ this.showingPhase = 3; }, 20);
            }
            this.editOpenLoaders();
        },
        hide() {
            console.log('hide')
            this.editOpenLoaders();
            if(Object.keys(this.openLoaders).length === 0) {
                clearTimeout(this.callback);
                this.showingPhase = -2;
                this.editBodyOverflow(false);
                this.callback = setTimeout(()=>{ this.showingPhase = -3; }, 300);
            }
        },
        editOpenLoaders() {
            if(this.name !== null) {
                console.log('parsing name !== null')
                if(this.showing) {
                    if(Array.isArray(this.name)) {
                        this.name.forEach(loaderName => { this.openLoaders[loaderName] = true; });
                    } else if(this.name) {
                        this.openLoaders[this.name] = true;
                    }
                } else {
                    if(Array.isArray(this.name)) {
                        this.name.forEach(loaderName => { delete this.openLoaders[loaderName]; });
                        delete this.openLoaders[this.name];
                    } else if(this.name) {
                        delete this.openLoaders[this.name];
                    } else {
                        this.openLoaders = {};
                    }
                }
            }
        }
    }
});