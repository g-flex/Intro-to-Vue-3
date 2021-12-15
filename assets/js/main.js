let btcForm = $('#explore-btc-form');
let solForm = $('#explore-solana-form');
btcForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    submitQuery(btcForm, 'getBtcAddress');
});
solForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    submitQuery(solForm, 'getSolAccountTxs');
});