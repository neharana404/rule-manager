import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OperatorSelect from '../components/OperatorSelect';

describe('OperatorSelect Component', () => {
    const mockHandleOperatorChange = jest.fn();

    it('renders correctly', () => {
        render(<OperatorSelect operator="equals" handleOperatorChange={mockHandleOperatorChange} />);
        expect(screen.getByDisplayValue('equals')).toBeInTheDocument();
    });

    it('calls handleOperatorChange on change', () => {
        render(<OperatorSelect operator="equals" handleOperatorChange={mockHandleOperatorChange} />);

        fireEvent.change(screen.getByDisplayValue('equals'), { target: { value: 'not equals' } });

        expect(mockHandleOperatorChange).toHaveBeenCalledTimes(1);
        expect(mockHandleOperatorChange).toHaveBeenCalledWith('not equals');
    });
});
