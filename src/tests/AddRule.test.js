import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddRule from '../components/AddRule';

describe('AddRule Component', () => {
    it('should render a button to add a rule', () => {
        render(<AddRule onAddRule={() => { }} />);
        expect(screen.getByRole('button', { name: /add rule/i })).toBeInTheDocument();
    });

    it('should call onAddRule when button is clicked', () => {
        const onAddRuleMock = jest.fn();
        render(<AddRule onAddRule={onAddRuleMock} />);

        const button = screen.getByRole('button', { name: /add rule/i });
        fireEvent.click(button);

        expect(onAddRuleMock).toHaveBeenCalled();
    });
});
