import React, {useState, useContext} from 'react'
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { CTX } from './Store';
import MyButton from './button';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(5),
        padding: theme.spacing(3, 2),
        // height: theme.spacing(16),
    },
    flex: {
        display: 'flex',
        alignItems: 'center'
    },
    topicWindow: {
        width: '30%',
        height: '300px',
        borderRight: '1px solid black',

    },
    chatWindow: {
        width: '70%',
        height: '300px',
        padding: '20px'
    },
    chatBox: {
        width: '85%',
    },
    button: {
        width: '15%',
    },
}));

export const Dashboard = () => {
    const classes = useStyles();

    //CTX store
    const {allChats, sendChatAction, user}= useContext(CTX);
    // console.log({allChats});
    const topics = Object.keys(allChats);

    //local store
    const [activeTopic, changeActiveTopic]= useState(topics[0]);

    const [textValue, changeTextValue] = useState('');
    return (
        <div>
            {/* <MyButton title="My Button" /> */}
            <Paper className={classes.root}>
                <Typography variant="h4" component="h4">
                    Chat App <MyButton title="my button"></MyButton>
                </Typography>
                <Typography variant="h5" component="h5">
                    {activeTopic}
                </Typography>
                <div className={classes.flex}>
                    <div className={classes.topicWindow}>
                        <List>
                            {
                                topics.map(topic => (
                                    <ListItem onClick={e => changeActiveTopic(e.target.innerText)} key={topic} button>
                                        <ListItemText primary={topic} />
                                    </ListItem>
                                ))
                            }
                        </List>
                    </div>
                    <div className={classes.chatWindow}>
                        {
                            allChats[activeTopic].map((chat, i) => (
                                <div className={classes.flex} key={i}>
                                    <Chip label={chat.from} className={classes.Chip} />
                                    <Typography variant='body1' gutterBottom>{chat.msg}</Typography>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={classes.flex}>
                    <TextField
                        label="Send a chat"
                        className={classes.chatBox}
                        value={textValue}
                        onChange={(e)=>changeTextValue(e.target.value)}
                    />
                    <Button 
                    variant="contained"
                     color="primary"
                     className={classes.button}
                     onClick={()=> {
                         sendChatAction({ from: user ,msg: textValue, topic: activeTopic})
                         changeTextValue('');
                        }}
                     >
                        Send
                    </Button>
                </div>
            </Paper>

        </div>
    )
}
