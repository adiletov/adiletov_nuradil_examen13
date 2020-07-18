import React from 'react';
import PropTypes from "prop-types";
import {TextField} from "@material-ui/core";

const FormElement = props => {
    let inputComponent = <TextField
        fullWidth
        variant="outlined"
        type={props.type}
        id={props.propertyName}
        name={props.propertyName}
        value={props.value}
        onChange={props.onChange}
        label={props.label}
        error={!!props.error}
        helperText={props.error}
        autoComplete={props.autocomplete}
        multiline={props.multiline}
        rows={props.rows}
    />;





    return inputComponent
};

FormElement.propTypes = {
    propertyName: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string,
    autocomplete: PropTypes.string,
    multiline: PropTypes.bool,
    rows: PropTypes.number
};

export default FormElement;