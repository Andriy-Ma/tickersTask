import { io } from 'socket.io-client';
 
export const loadTickersSuccess = ticker => ({
    type: 'LOAD_SUCCESS',
    payload: ticker,
});

export const loadTickersFailed = error => ({
    type: 'LOAD_FAILED',
    error: error,
});


export const tickerLoad = () => dispatch => {
    const URL = "http://localhost:4000";
    const socket = io( URL, { autoConnect: true });

    socket.emit('start');
    socket.on('ticker', function(response) {
        const res = Array.isArray(response) ? response : [response];
        dispatch(loadTickersSuccess(res));
        });
};