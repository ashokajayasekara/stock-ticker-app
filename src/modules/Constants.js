export const SOURCES_URL = 'http://localhost:8080/stocks/api/source/getAll'
export const TICKERS_URL = 'http://localhost:8080/stocks/api/ticker/getAll'
export var getPrices = (sourceId, tickerId) => `http://localhost:8080/stocks/api/prices/${sourceId}/${tickerId}`