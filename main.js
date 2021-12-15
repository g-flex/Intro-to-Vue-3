const app = Vue.createApp({
    data() {
        return {
            title: 'Vue explorer',
            isBtc: true,
            description: ()=> { return 'Simple js ' + (this.isBtc ? 'btc' : 'sol') + ' explorer made with vue.js' },
            imgSrc: './assets/images/socks_blue.jpg'
        };
    }
});
