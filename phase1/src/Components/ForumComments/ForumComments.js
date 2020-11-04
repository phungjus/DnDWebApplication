import React from 'react';
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import "./ForumComments.css";

export default function ForumComments(props) {
    return(
        
        <Grid 
        item 
        xs={12}
        direction="column"
        justify="center"
        alignItems="stretch"
        >
            <Card variant="outlined">
                <CardContent style={{backgroundColor: '#464444'}}>
                    <Typography component="h4" align="left">by: {props.username}</Typography>
                    <Typography component="p" align="left">{props.commentContent}</Typography>
                </CardContent>  
            </Card>
        </Grid>
    )
}