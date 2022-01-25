import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Show from './../Show';

const sampleShow = {
    name: 'sample name',
    summary: 'sample summary',
    seasons: [
        {
            id: 0,
            name: 'Season 1',
            episodes: []
        },
        {
            id: 1,
            name: 'Season 2',
            episodes: []
        },
    ]
}


test('renders without errors', ()=>{
    render(<Show show={sampleShow} selectedSeason={'none'}/>);
});

test('renders Loading component when prop show is null', () => {
    render(<Show show={null} selectedSeason={'none'}/>);
    const loading = screen.queryByTestId('loading-container');
    expect(loading).toBeInTheDocument();
});


test('renders same number of options seasons are passed in', ()=>{
    render(<Show show={sampleShow} selectedSeason={'none'}/>);
    const seasons = screen.queryAllByTestId('season-option');
    expect(seasons).toHaveLength(2);    
});

test('handleSelect is called when an season is selected', () => {
    const handleSelect = jest.fn();
    render(<Show show={sampleShow} selectedSeason={'none'} handleSelect={handleSelect}/>);
    const select = screen.getByLabelText(/select a season/i);
    userEvent.selectOptions(select, ['0']);
    expect(handleSelect).toBeCalled();
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
    const {rerender } = render(<Show show={sampleShow} selectedSeason={'none'} />);
    let seasons = screen.queryByTestId('episodes-container');
    expect(seasons).not.toBeInTheDocument();

    rerender(<Show show={sampleShow} selectedSeason={0} />);
    seasons = screen.queryByTestId('episodes-container');
    expect(seasons).toBeInTheDocument();
});
