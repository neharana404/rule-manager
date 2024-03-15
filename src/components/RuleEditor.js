import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography } from '@material-ui/core';
import { addRule, getRules } from '../axios';
import OperatorSelect from './OperatorSelect'
import AddRule from './AddRule'
import JsonEditor from './JsonEditor'

const RuleEditor = () => {
    
    const [data, setData] = useState(null);
    const [rules, setRules] = React.useState([]);
    const [conditions, setConditions] = React.useState([]);
    const [ruleName, setRuleName] = useState('');
    const [property, setProperty] = useState('');
    const [value, setValue] = useState('');
    const [operator, setOperator] = useState('equals');
    const [error, setError] = useState({
        property: '',
        value: '',
    });
    const [showCondition, setShowCondition] = useState(false);
    const [triggerEffect, setTriggerEffect] = useState(false);

    useEffect(() => {
    const fetchData = async () => {
      const result = await getRules()
      setData(result.reverse());
    };

    fetchData();
    }, [rules, triggerEffect]); 


    const handleRuleChange = (event) => {
        setRuleName(event.target.value);
    };

    const handlePropertyChange = (event) => {
        setProperty(event.target.value);
    };

    const handleValueChange = (event) => {
        setValue(event.target.value);
    };

    const handleOperatorChange = (event) => {
        setOperator(event.target.value);
    };

    const handleAddCondition = async () => {
        let hasError = false;

        if (!property.trim()) {
            setError((err) => ({ ...err, property: 'Rule name cannot be empty' }));
            hasError = true;
        }

        if (!value.trim()) {
            setError((err) => ({ ...err, value: 'Value cannot be empty' }));
            hasError = true;
        }

        if (hasError) return;
        const conditionData = {
            property: property,
            operator: operator,
            value: value,
        };
        setConditions([...conditions, conditionData]);
        setProperty('');
        setOperator('equals');
        setValue('');
        setError({ property: '', value: '' });
    };

    const handleSubmit = async () => {
        if (conditions.length > 0) {
            try {
                const rulesData = {
                    name: ruleName,
                    conditions: conditions
                };
                const message = await addRule(rulesData);
                alert(message['message'])
                setConditions([])
                setRuleName('')
                setRules([...rules, rulesData])
            } catch (error) {
            }
        } else {
            alert('Add a condition!')
        }
    }

    const handleShowCondition = () => {
        setShowCondition(true);
    };

    const handleCancel = () =>{
        setShowCondition(false);
        setProperty('');
        setConditions([])
        setRuleName('')
        setOperator('equals');
        setValue('');
    }

    return (
        <div>
            <AddRule onAddRule={handleShowCondition} />
            {showCondition && (
            <div>
                <TextField error={!!error.property} label="Rule Name" onChange={handleRuleChange} value={ruleName} />
                <div>
                    <TextField error={!!error.property} label="Property Name" onChange={handlePropertyChange} value={property}/>
                    <OperatorSelect operator={operator} handleOperatorChange={handleOperatorChange} />
                    <TextField error={!!error.value} label="Value" value={value} onChange={handleValueChange} />
                </div>
                {conditions.length > 0 && (
                    <Typography style={{ marginTop: '1rem', whiteSpace: 'pre-wrap' }}>
                    {JSON.stringify(conditions, null, 2)}
                    </Typography>
                )}
                <div>
                <Button onClick={handleAddCondition}>Add Condition</Button>
                </div>
                <div>
                    <Button color="primary" variant="contained" onClick={handleSubmit}>Save Rule</Button>
                    <Button color="secondary" variant="contained" onClick={handleCancel}>Cancel</Button>
                </div>
            </div>
            )}
            {data && data.map((item, index) => (
                <JsonEditor key={index} item={item} onInputChange={() => setTriggerEffect(true)} />
            ))}
        </div>
    );
};

export default RuleEditor;
