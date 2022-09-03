const initialState = {
    tickers: [],
    error: false
};

const rootReducer = (state = initialState , action) => {
    switch (action.type) {
        case 'LOAD_SUCCESS':
            let oldArrayPrices = state.tickers.map(item => item.price)
            let NewArrayPrices = action.payload.map(item => item.price)
            let greenOrRed = [];

            for (let i = 0 ; i < NewArrayPrices.length ; i++){
                oldArrayPrices[i] > NewArrayPrices[i] ? greenOrRed.push('red') : greenOrRed.push('green')
            }
            action.payload = action.payload.map((item,i) => {
                return (
                    {
                        ...item,
                        color: greenOrRed[i]
                    }
                )
                }
            );
            return {
                ...state,
                tickers: action.payload
            }
        case 'LOAD_FAILED':
            return {
                ...state,
                error: action.error
            };

        default:
            return state;
    }
};

export default rootReducer;