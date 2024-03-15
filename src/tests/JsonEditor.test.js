import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import JsonEditor from './components/JsonEditor'; 
import { editRule, deleteRule } from '../axios';

jest.mock('../axios', () => ({
    editRule: jest.fn(),
    deleteRule: jest.fn(),
}));

describe('JsonEditor Component', () => {
    const item = { rule_id: 1, content: 'Test Content' };
    const index = 0;
    let onInputChangeMock;

    beforeEach(() => {
        onInputChangeMock = jest.fn();
        editRule.mockResolvedValue({ message: 'Edit successful' });
        deleteRule.mockResolvedValue({ message: 'Delete successful' });
        render(<JsonEditor index={index} item={item} onInputChange={onInputChangeMock} />);
    });

    it('should display the provided item as JSON in the textarea', () => {
        const textarea = screen.getByRole('textbox');
        expect(textarea.value).toBe(JSON.stringify(item, null, 2));
    });

    it('should call onInputChange when the save button is clicked with valid JSON', async () => {
        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);

        await expect(editRule).toHaveBeenCalledWith(item);
        expect(onInputChangeMock).toHaveBeenCalledTimes(1);
    });

    it('should display an error when invalid JSON is entered', () => {
        const textarea = screen.getByRole('textbox');
        fireEvent.change(textarea, { target: { value: 'Invalid JSON' } });

        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);

        const error = screen.getByText('Invalid JSON');
        expect(error).toBeInTheDocument();
    });

    it('should call onInputChange when the delete button is clicked', async () => {
        const deleteButton = screen.getByText('Delete');
        fireEvent.click(deleteButton);

        await expect(deleteRule).toHaveBeenCalledWith(item['rule_id']);
        expect(onInputChangeMock).toHaveBeenCalledTimes(1);
    });
});
