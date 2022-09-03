import React from 'react';

import { makeStyles } from '@mui/styles';
import { Box, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const useStyles = makeStyles(() => ({
    tickerBlock: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 50,
    },
    tickerItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        border: '1px solid #dadce0',
        borderRadius: 15,
        fontWeight: 600,
        padding: '5px 10px',
        boxSizing: 'border-box',
        width: 200,
        '&:hover': {
            cursor: 'pointer',
            transform: 'scale(1.1)'
        }
    },
    arrowGreen:{
        padding: 5, 
        marginRight: 10, 
        backgroundColor: '#e6f4ea', 
        borderRadius: 8
    },
    arrowRed:{
        padding: 5, 
        marginRight: 10, 
        backgroundColor: '#fce8e6', 
        borderRadius: 8
    },
}));

function TopOfList({currentTickers, addTicker}) {

    const classes = useStyles();

    return(
        <Box className={classes.tickerBlock}>
         { currentTickers.map((item, index) => { 
            return(
                <Box key={index} onClick={() => addTicker(item.ticker)}> 
                   <Box className={classes.tickerItem}>
                        <Box style={{display: 'flex', alignItems: 'center'}}>
                            {
                            item.color === 'green' ?
                                <Box className={classes.arrowGreen}>
                                    <ArrowUpwardIcon style={{color: '#137333'}}/>
                                </Box>
                            :
                                <Box className={classes.arrowRed}>
                                    <ArrowDownwardIcon style={{color: '#a50e0e'}}/>
                                </Box>
                            }
                            <Box>
                                <Typography style={{fontWeight: 600}}> {item.ticker} </Typography>
                                <Typography>{item.price}</Typography>
                            </Box>
                       </Box>
                       <Box style={item.color === 'green' ? {color: '#137333'} : {color: '#a50e0e'}}>
                            <Typography variant="h3" style={{fontSize: 18}}>{ item.color === 'green' ? `+${item.dividend}%` : `-${item.dividend}%`}</Typography>
                            <Typography >{ item.color === 'green' ? `+${ item.yield }` : `-${ item.yield }`}</Typography>
                       </Box>

                   </Box>
                </Box>
            )
           })      
        }
        </Box>
    )
}

export default TopOfList;