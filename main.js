const app = Vue.createApp({
    data() {
        return {
            title: 'Vue explorer',
            isBtc: 'SOL',
            description: ()=> { return 'Simple js ' + (this.isBtc === true ? 'btc' : this.isBtc) + ' explorer made with vue.js' },
            imgSrc: './assets/images/socks_blue.jpg',
            supportedCryptos: [
                { name: 'bitcoin', symbol: 'BTC', placeholder: 'bc1000aaa000aaa000aaa000', fn: 'getBtcAddress' },
                { name: 'solana', symbol: 'SOL', placeholder: '9LC426VbNywjPjXb6JjxSNzSAZgM', fn: 'getSolAccountTxs' }
            ]
        };
    },
    methods: {
        submitForm: (e, fn) => {
            e.preventDefault();
            this.submitQuery(e.currentTarget, fn);
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
    },
    //to have them in listeners inline
    computed: {
        console: () => console,
        window: () => window
    }
});
