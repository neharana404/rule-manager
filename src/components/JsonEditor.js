import React, { useState, useEffect } from 'react';
import { editRule, deleteRule } from '../axios';

function JsonEditor({ index, item, onInputChange }) {
    const [error, setError] = useState('');
    const [textAreaValue, setTextAreaValue] = useState('');

    useEffect(() => {
        setTextAreaValue(JSON.stringify(item, null, 2));
    }, [item]);

    const handleChange = (event) => {
        setTextAreaValue(event.target.value);
        try {    
            setError('')
        } catch (e) {
            setError('Invalid JSON')
        }
    };

    const handleSaveEdit = () => {
        try {
            const updatedItems = JSON.parse(textAreaValue);
            if (updatedItems['rule_id'] != item['rule_id']) {
                setError('You cannot change the rule id')
            } else {
                (async () => {
                    let message = await editRule(updatedItems)
                    alert(message['message'])
                    onInputChange()
                    setError('');
                })();
            }
        } catch (err) {
            setError('Invalid JSON');
        }
    };

    const handleDelete = () => {
        (async () => {
            let message = await deleteRule(item['rule_id'])
            alert(message['message'])
            onInputChange()
        })();
    };

    return (
        <div>
            <textarea key={index} value={textAreaValue} onChange={handleChange} style={{width: '300px', minHeight: '150px'}} />
            <button onClick={handleSaveEdit}>Save</button>
            <button onClick={handleDelete}>Delete</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default JsonEditor;
