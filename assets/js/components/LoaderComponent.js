app.component('loader-component', {
    template:
        `<div class="loader-container" :class="getCurrentClass">
        <div class="loader">
            <div class="loader__part loader__part--1"></div>
            <div class="loader__part loader__part--2"></div>
            <div class="loader__part loader__part--3"></div>
        </div>
    </div>`,
    data() {
        return {  }
    },
    props: {
        showing: {
            type: Boolean,
            required: true
        }
    },
    computed: {
        getCurrentClass() {
            return this.showing ? 'showing' : 'd-n';
        }
    }
});