import React, {createRef} from 'react';
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles(theme => ({
    input: {
        display: 'none',
    },
    avatar: {
        width: '300px',
        height: '300px',
        margin: '0 auto',
        [theme.breakpoints.down('xs')]: {
            width: '90%',
            height: 'auto',
        },
    },
}));

const FileInput = ({propertyName, onChange, value}) => {

    const classes = useStyles();

    const inputRef = createRef();

    const activateInput = () => {
        inputRef.current.click();
    };
    let avatarBlock = <Avatar variant="square" className={classes.avatar} onClick={activateInput}/>;
    if (propertyName === 'mainPicture'){
        if (value){
            avatarBlock = <Avatar variant="square" src={value} className={classes.avatar} onClick={activateInput}/>
        }
    }else if (propertyName === 'reviewImages'){
        if (value){
            avatarBlock = <Avatar variant="square" src={value} className={classes.avatar} onClick={activateInput}/>
        }
    }

    return (
        <>
            <input
                type="file"
                name={propertyName}
                className={classes.input}
                onChange={onChange}
                ref={inputRef}
            />
            <Grid container direction="row" spacing={2} alignItems="center">
                <Grid item xs>
                    {avatarBlock}
                </Grid>
            </Grid>
        </>
    );
};

export default FileInput;