import { describe, expect, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { SearchControls } from './SearchControls';
import { MemoryRouter } from 'react-router';

if (typeof window.ResizeObserver === 'undefined') {
    class ResizeObserver {
        observe() { }
        unobserve() { }
        disconnect() { }
    }
    window.ResizeObserver = ResizeObserver;
}

const renderWithRouter = (initialEntries: string[] = ['/']) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <SearchControls />
        </MemoryRouter>
    );
};

describe('SearchControls', () => {
    test('should render SearchControls with default values', () => {
        const { container } = renderWithRouter();

        expect(container).toMatchSnapshot();
    });

    test('should set input value when search param name is set', () => {
        renderWithRouter(['/?name=Batman']);

        const input = screen.getByPlaceholderText(
            'Search heroes, villains, powers, teams...'
        );

        expect(input.getAttribute('value')).toBe('Batman');
    });

    test('should change params when input is changed and enter is pressed', () => {
        renderWithRouter(['/?name=Batman']);
        const input = screen.getByPlaceholderText(
            'Search heroes, villains, powers, teams...'
        );
        expect(input.getAttribute('value')).toBe('Batman');

        fireEvent.change(input, { target: { value: 'Superman' } });
        fireEvent.keyDown(input, { key: 'Enter' });

        expect(input.getAttribute('value')).toBe('Superman');
    });

    // VERSION DEL CURSO:
    // test('should change params strength when slider is changed', () => {
    //     renderWithRouter(['/?name=Batman&active-accordion=advance-filters']);
    //     const slider = screen.getByRole('slider');
    //     expect(slider.getAttribute('aria-valuenow')).toBe('0');

    //     fireEvent.keyDown(slider, { key: 'ArrowRight' });

    //     expect(slider.getAttribute('aria-valuenow')).toBe('1');
    // });
    // VERSION DE CHATGPT (GPT-5.6 Sol):
    test('should change params strength when slider is changed', () => {
        renderWithRouter([
            '/?name=Batman&active-accordion=advance-filters'
        ]);

        const slider = screen.getByRole('slider', {
            hidden: true,
        });

        expect(slider.getAttribute('aria-valuenow')).toBe('0');

        fireEvent.keyDown(slider, { key: 'ArrowRight' });

        expect(slider.getAttribute('aria-valuenow')).toBe('1');
    });

    // VERSION DEL CURSO:
    // test('should accordion be open when active-accordion param is set', () => {
    //     renderWithRouter(['/?name=Batman&active-accordion=advance-filters']);

    //     const accordion = screen.getByTestId('accordion');
    //     const accordionItem = accordion.querySelector('div');

    //     expect(accordionItem?.getAttribute('data-state')).toBe('open');
    // });
    // VERSION DE CHATGPT (GPT-5.6 Sol):
    test('should accordion be open when active-accordion param is set', () => {
        renderWithRouter([
            '/?name=Batman&active-accordion=advance-filters'
        ]);

        const accordionItem =
            screen.getByTestId('advanced-filters-item');

        expect(
            accordionItem.hasAttribute('data-open')
        ).toBe(true);
    });

    // VERSION DEL CURSO:
    // test('should accordion be closed when active-accordion param is not set', () => {
    //     renderWithRouter(['/?name=Batman']);

    //     const accordion = screen.getByTestId('accordion');
    //     const accordionItem = accordion.querySelector('div');

    //     expect(accordionItem?.getAttribute('data-state')).toBe('closed');
    // });
    // VERSION DE CHATGPT (GPT-5.6 Sol):
    test('should accordion be closed when active-accordion param is not set', () => {
        renderWithRouter(['/?name=Batman']);

        const accordionItem =
            screen.getByTestId('advanced-filters-item');

        expect(
            accordionItem.hasAttribute('data-open')
        ).toBe(false);
    });
});