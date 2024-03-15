import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RuleEditor from '../components/RuleEditor';
import { addRule, getRules } from '../axios';

// Mocking the modules
jest.mock('../axios', () => ({
    addRule: jest.fn(),
    getRules: jest.fn(),
}));

describe('RuleEditor', () => {
    beforeEach(() => {
        getRules.mockResolvedValue([]);
    });

    it('renders without crashing', () => {
        render(<RuleEditor />);
    });

    it('calls getRules on component mount', async () => {
        render(<RuleEditor />);
        await waitFor(() => expect(getRules).toHaveBeenCalled());
    });

    it('allows the user to add a condition', () => {
        const { getByLabelText, getByText } = render(<RuleEditor />);

        fireEvent.change(getByLabelText(/Rule Name/i), { target: { value: 'Test Rule' } });
        fireEvent.change(getByLabelText(/Property Name/i), { target: { value: 'Property' } });
        fireEvent.change(getByLabelText(/Value/i), { target: { value: 'Value' } });

        fireEvent.click(getByText(/Add Condition/i));

        expect(getByText(/"property": "Property"/i)).toBeInTheDocument();
    });

    it('submits the rule when the "Save Rule" button is clicked', async () => {
        addRule.mockResolvedValue({ message: 'Rule added successfully' });

        const { getByLabelText, getByText } = render(<RuleEditor />);

        fireEvent.change(getByLabelText(/Rule Name/i), { target: { value: 'Test Rule' } });
        fireEvent.change(getByLabelText(/Property Name/i), { target: { value: 'Property' } });
        fireEvent.change(getByLabelText(/Value/i), { target: { value: 'Value' } });
        fireEvent.click(getByText(/Add Condition/i));

        fireEvent.click(getByText(/Save Rule/i));

        await waitFor(() => expect(addRule).toHaveBeenCalled());
    });
});
