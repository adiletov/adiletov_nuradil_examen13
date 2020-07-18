import React from 'react';
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";

const RatingCard = ({name ,value, bool}) => {
    return (
        <div>
            <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend">{name}</Typography>
                <Rating name={name} value={value || 0} disabled={bool}/>
                {value || 0}
            </Box>
        </div>
    );
};

export default RatingCard;