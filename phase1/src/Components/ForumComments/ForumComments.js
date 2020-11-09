import React from 'react';
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import "./ForumComments.css";

const useStyles = makeStyles((theme) => ({
    box: {
        left: '0',
        maxWidth: '75px',
        maxHeight: '40px',
        minWidth: '75px',
        minHeight: '40px',
    },

    comment : {
        marginBottom: '10px'
    },

    Button : {
        color: 'var(--textColour)',
        backgroundColor: 'var(--buttonColour)',
        '&:hover': { backgroundColor: 'var(--buttonColour)' },
    },

    multilineColor: {
        color: 'var(--textColour)'
    },

    cardContent: {
        backgroundColor: 'var(--backgroundColourSecondary)'
    }
}))

export default function ForumComments(props) {

    const classes = useStyles()

    return(
        
        <Grid 
        item 
        xs={12}
        direction="column"
        justify="center"
        alignItems="stretch"
        >
            <Card variant="outlined">
                <CardContent className={classes.cardContent}>
                    <Typography component="h4" align="left" className='header'>by: {props.username} at {props.dateTime}</Typography>
                    <Typography component="p" align="left" className='paragraph'>{props.commentContent}</Typography>
                    {
                        (props.curUser === props.username || props.curUser === 'admin') 
                        ?
                        <Box component="div" className={classes.box}>
                            <Button variant="contained" className={classes.Button} onClick={() => props.handleDeleteComment(props.pid, props.cid)} fullWidth>
                                Delete
                            </Button>
                        </Box>
                        :
                        <div></div>
                    }
                </CardContent>  
            </Card>
        </Grid>
    )
}