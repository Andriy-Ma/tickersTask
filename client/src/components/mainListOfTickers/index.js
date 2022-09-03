import React, {useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from '@mui/styles';
import { Box, Typography, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import {tickerLoad} from '../../redux/action';
import TopOfList from './topOfList';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const useStyles = makeStyles(() => ({
    mainListWrap: {
        display: 'flex',
        flexDirection: 'column'
    },
    mainListBlock: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 20
    },
    mainListItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        border: '1px solid #dadce0',
        borderRadius: 8,
        '& p': {
            width: 110,
            padding: 10,
            textAlign: 'center'
        }
    },
    deleteIcon: {
        padding: 10, 
        marginLeft: 20, 
        backgroundColor: '#fff', 
        borderRadius: 8,
        border: '1px solid #dadce0',
        '&:hover': {
            color: 'red',
            cursor: 'pointer',
            transform: 'scale(1.1)'
        }
    },
    hideArrow:{
        position: 'absolute', 
        fontSize: 28, 
        padding: 5, 
        top: -18, 
        left: '50%', 
        transform: 'translate(-50%)', 
        backgroundColor: '#fff', 
        border: '1px solid #dadce0', 
        borderRadius: '50%',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    itemGreen: {
        backgroundColor: '#e6f4ea', 
        color: '#137333', 
        borderRadius: 8 , 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-around'
    },
    itemRed: { 
        backgroundColor: '#fce8e6', 
        color: '#a50e0e', 
        borderRadius: 8 , 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-around'
    }

}));


function Mainlist() {

    const classes = useStyles();
    const dispatch = useDispatch();
    const currentTickers = useSelector(({tickers}) => tickers);
    const [hideTop, setHideTop] = useState(false);
    const [deleteArray, setDeleteArray] = useState([]);
    let actualiArrayTickers = [...currentTickers];

    window.onload = function() {
        dispatch(tickerLoad())
    };

    const giveArrayAfterDeleted = () => {

        deleteArray.length >= 1 && 
            deleteArray.forEach(elem => {
                actualiArrayTickers = actualiArrayTickers.filter(item => item.ticker !== elem);
            });
        
        return actualiArrayTickers;
    };

    const giveArrayAfterAdded = (elem) => {
        setDeleteArray(deleteArray.filter(item => item !==elem))
    };

    return(  
        <Box className={classes.mainListWrap}>
            {
                !hideTop && 
                <TopOfList 
                    currentTickers={currentTickers} 
                    addTicker={giveArrayAfterAdded}
                />
            }
            <Box style={{position: 'relative', marginTop: 40}}>
                <Divider/>
                {
                    !hideTop ? 
                            <ExpandLessIcon className={classes.hideArrow} onClick={() => setHideTop(!hideTop)}/> 
                        : 
                            <ExpandMoreIcon className={classes.hideArrow} onClick={() => setHideTop(!hideTop)}/>
                }
            </Box>
            <Box className={classes.mainListBlock}>
                { giveArrayAfterDeleted().map((item, index) => {                
                    return(
                        <Box style={{display: 'flex' , alignItems: 'center', marginTop: 20}} key={index} >
                                <Box className={classes.mainListItem}>
                                    <Typography>{ item.ticker }</Typography>
                                    <Typography>{ `${item.price} $`}</Typography>
                                    <Typography style={item.color === 'green' ? {color: '#137333'} : {color: '#a50e0e'}}>{ item.change }</Typography>
                                    {
                                        item.color === 'green' ?
                                            <Typography className={classes.itemGreen}>
                                                <ArrowUpwardIcon/>
                                                { `${item.change_percent} %`}
                                            </Typography>
                                        :
                                            <Typography className={classes.itemRed}>
                                                <ArrowDownwardIcon/>
                                                { `${item.change_percent} %`}
                                            </Typography>
                                    }
                                    <Typography>{ (new Date ( Date.parse(item.last_trade_time))).toLocaleTimeString('uk-UA',{day:'numeric', month:'long', hour:'2-digit', minute:'2-digit', second: '2-digit'}) }</Typography>
                                </Box>
                            <DeleteIcon className={classes.deleteIcon} onClick={() => setDeleteArray([...deleteArray, item.ticker])}/>
                        </Box>
                    )
                })            
                }
            </Box>
        </Box>

    )
}


export default Mainlist;