import React, { useState, useEffect } from "react";
import { Select, Container, Stack, FormLabel, Grid, InputLabel, MenuItem } from '@mui/material';
import axios from 'axios';
import { SOURCES_URL, TICKERS_URL, getPrices } from './Constants';
import StockTable from "./StockTable";

function StockMonitor() {

  const [sources, setStockSources] = useState([]);
  const [tickers, setStockTickers] = useState([]);
  const [tableRows, setTableRows] = useState([])
  const [sourceId, setSourceId] = useState(1);
  const [tickerId, setTickerId] = useState(1);

  useEffect(() => {
    loadStockSources().catch(() => {
      console.log('error in source load...')
    })

    loadStockTickers().catch(() => {
      console.log('error in ticker load...')
    })

  }, []);

  useEffect(() => {
    loadPriceTableRows().catch(()=> {
      console.log('error in error in table rows load...')
    })

  }, [sourceId, tickerId]);


  const loadPriceTableRows = async () => {
    const response = await axios.get(getPrices(sourceId,tickerId))
    console.log(response.data)
    setTableRows(response.data)
  }

  const loadStockSources = async () => {
    const response = await axios.get(SOURCES_URL)
    console.log(response.data);
    setStockSources(response.data);
  }

  const loadStockTickers = async () => {
    const response = await axios.get(TICKERS_URL)
    console.log(response.data);
    setStockTickers(response.data);
  }


  const handleSourceChange = (event) => {
    setSourceId(event.target.value)
  }

  const handleTickerChange = (event) => {
    setTickerId(event.target.value)
  }

  return (
    <Container maxWidth="md" >
      <Stack spacing={0} marginTop={2}>
        <Grid container spacing={0}>
          <Grid item xs={6}>
            <InputLabel>Price Source:</InputLabel>
          </Grid>
          <Grid item xs={2}>
            <Select
              labelId="demo-simple-select-label"
              id="select-source"
              value={sourceId}
              variant="outlined"
              sx={{ width: 430 }}
              onChange={handleSourceChange}
            >
              {sources.map(({ name, sourceId }, index) => (
                <MenuItem key={index} value={sourceId}>{name}</MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>

        <Grid container spacing={0}>
          <Grid item xs={6}>
            <FormLabel>Ticker:</FormLabel>
          </Grid>
          <Grid item xs={6}>
            <Select
              labelId="demo-simple-select-label"
              id="select-ticker"
              value={tickerId}
              variant="outlined"
              sx={{ width: 430 }}
              onChange={handleTickerChange}
            >
              {tickers.map(({ name, tickerId }, index) => (
                <MenuItem key={index} value={tickerId}>{name}</MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>

        <Grid container spacing={0}  marginTop={2}>
          <Grid item xs={12}>
               <StockTable data={tableRows}/>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );

}

export default StockMonitor;

