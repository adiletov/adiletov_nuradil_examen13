import React from 'react';
import PropTypes from "prop-types";
import {TextField} from "@material-ui/core";
import FileInput from "./FileInput";
import Rating from "@material-ui/lab/Rating";

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

    if (props.type === 'file') {
        inputComponent = <FileInput
            value={props.value}
            onChange={props.onChange}
            propertyName={props.propertyName}
        />
    }
    if (props.propertyName === 'serviceQuality' || props.propertyName === 'qualityToFood' || props.propertyName === 'interior') {
        inputComponent =
            <Rating
                name={props.propertyName}
                value={props.value}
                onChange={props.onChange}
            />
    }




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