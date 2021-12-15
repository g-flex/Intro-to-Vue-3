class API {

    constructor() {

        this.DEBUG = false;
        this.DEBUG_PRINT_RESPONSES = true;

        this.CONTENT_TYPE = "application/x-www-form-urlencoded;charset=UTF-8";

        this.LAMBDA_ENDPOINT = 'https://ghn8kvngyb.execute-api.eu-south-1.amazonaws.com/browse/';

        this.BTC_ENDPOINTS = {
            GET_ADDRESS: this.LAMBDA_ENDPOINT+'getBtcAddress/'
        }
        this.SOL_ENDPOINTS = {
            GET_ACCOUNT_TXS: this.LAMBDA_ENDPOINT+'getSolAccountTxs/',
            GET_ACCOUNT_STAKE_REWARDS: this.LAMBDA_ENDPOINT+'getSolAccountStakeRewards/',
            GET_ACCOUNT_STAKE_ACCOUNTS: this.LAMBDA_ENDPOINT+'getSolAccountStakeAccounts/',
        }

    }
    static init() {

        if (!!API.instance) { return API.instance; }
        API.instance = new API();
        return API.instance;

    }
    handleResponseParsing(response, callbackSuccess, callbackError) {
        if(this.DEBUG){
            response.text().then(text => { console.log(text); });
            return;
        }

        try {
            response.json().then(json => {
                if(this.DEBUG_PRINT_RESPONSES) {
                    coloredLog('DEBUG PRINT RESPONSES:');
                    console.log('', json);
                }
                callbackSuccess(json);
            })
            .catch(error => {
                this.handleResponseException(error, callbackError);
            });
        } catch (e) {
            this.handleResponseException(e, callbackError);
        }
    }
    handleResponseException(error, callbackError) {
        coloredLog('Fetch error:');
        console.log("", error);
        if(callbackError) { callbackError(null); }
    }
    get(url, data, callback, callbackError = null) {

        let finalUrl = this.setParams(url, data);

        fetch(finalUrl, {
            method: 'GET',
            cache: "no-store",
            headers: { "Content-type": this.CONTENT_TYPE }
        })
        .then(response => {
            return this.handleResponseParsing(response, callback, callbackError);
        });

    }
    post(url, data, callback, callbackError = null) {

        const formBody = this.joinUrlParams(data);
        fetch(url, {
            method: 'POST',
            body: formBody,
            cache: "no-store",
            headers: { "Content-type": this.CONTENT_TYPE }
        })
        .then(response => {
            return this.handleResponseParsing(response, callback, callbackError);
        });

    }
    joinUrlParams(params) {

        if(params){
            return Object.keys(params).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key])).join('&');
        } else {
            return "";
        }

    }
    setParams(url, data) {

        if (data && data.length > 0) {
            const params = this.joinUrlParams(data);
            url += '?'+params;
        }

        return url;

    }

    getBtcAddress(address, callback) { this.get(this.BTC_ENDPOINTS.GET_ADDRESS+address, null, callback); }

    getSolAccountStakeRewards(account, callback) { this.get(this.SOL_ENDPOINTS.GET_ACCOUNT_STAKE_REWARDS+account, null, callback); }
    getSolAccountStakeAccounts(account, callback) { this.get(this.SOL_ENDPOINTS.GET_ACCOUNT_STAKE_ACCOUNTS+account, null, callback); }
    getSolAccountTxs(account, callback) { this.get(this.SOL_ENDPOINTS.GET_ACCOUNT_TXS+account, null, callback); }
}