import React from 'react';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './styles.css'

export default function Grouptile(props) {

    return (
        <Card className="tile">
            <CardActionArea component={Link} to={props.link}>
                <CardMedia
                    image={props.image}
                    title={props.Groupname}
                />
                <CardContent className="Groupdescription">
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.Groupname}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.Groupdescription}
                    </Typography>
                </CardContent>
            </CardActionArea>
            {/* <CardActions>
                <Button size="small" color="primary">
                Share
                </Button>
                <Button size="small" color="primary">
                Learn More
                </Button>
            </CardActions> */}
        </Card>
    );
}