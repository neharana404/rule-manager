import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const OperatorSelect = ({ operator, handleOperatorChange }) => {
    return (
        <FormControl>
            <InputLabel id="operator-select-label">Operator</InputLabel>
            <Select
                labelId="operator-select-label"
                id="operator-select"
                value={operator}
                label="Operator"
                onChange={handleOperatorChange}
            >
                <MenuItem value="equals">Equals</MenuItem>
                <MenuItem value="not_equals">Not Equals</MenuItem>
                <MenuItem value="greater_than">Greater Than</MenuItem>
                <MenuItem value="less_than">Less Than</MenuItem>
            </Select>
        </FormControl>
    );
};

export default OperatorSelect;
