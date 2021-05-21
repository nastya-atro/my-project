import React from 'react';
import UserImg from './../../../../assets/images/user.png'
import { ProfileType } from '../../../../types/types';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';

type PropsTypes = {
  profile: ProfileType | null
  message: string
  likesNumber: number
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 400,
      marginBottom: 10,
      backgroundColor: '#a0a0a01c',
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }),
);

const Post: React.FC<PropsTypes> = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  return (

    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar} src={!props.profile ? UserImg : props.profile.photos.small || UserImg} alt="description" />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={!props.profile ? 'Users Name' : props.profile.fullName}
        subheader={new Date().toLocaleDateString()}
      />
      <CardMedia
        className={classes.media}
        image='https://images.unsplash.com/photo-1605528017351-8635bb3d6a3a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1051&q=80'
        title="Post"
      />

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.message}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Typography variant="body2" color="textSecondary" component="p"> {props.likesNumber}</Typography>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>

    </Card>

  )
}

export default Post;

