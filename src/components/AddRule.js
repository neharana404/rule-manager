import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

function AddRuleButton({ onAddRule }) {
    return (
        <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={onAddRule}
            size='small'
        >
        Add New Rule
        </Button>
    );
}

export default AddRuleButton;
