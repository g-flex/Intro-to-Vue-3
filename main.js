const app = Vue.createApp({
    data() {
        return {
            title: 'Vue explorer',
            isBtc: 'SOL',
            description: ()=> { return 'Simple js ' + (this.isBtc === true ? 'btc' : this.isBtc) + ' explorer made with vue.js' },
            imgSrc: './assets/images/socks_blue.jpg',
            supportedCryptos: [
                { name: 'bitcoin', symbol: 'BTC' },
                { name: 'solana', symbol: 'SOL' }
            ]
        };
    },
    methods: {
        submitForm: (e) => {
            e.preventDefault();
            this.submitQuery(e.currentTarget, 'getBtcAddress');
        },
        submitQuery: (container, fn) => {
            document.activeElement.blur();
            container.querySelector('pre code').textContent = '';
            Loader.init().showTargeted(container);
            API.init()[fn](container.querySelector('input').value, r=>{
                container.querySelector('pre code').innerHTML = parseObjectForPrinting(r);
                Loader.init().hideTargeted(container);
            });
        }
    }
});
