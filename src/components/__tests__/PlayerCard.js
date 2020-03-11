import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PlayerCard from '../PlayerCard';
import GameContext from '../../helpers/gameContext';

Enzyme.configure({ adapter: new Adapter() });

describe('Player card component', () => {

    let mockProfile;
    let mockContext;
    let mockProcessResult = jest.fn();

    beforeEach(() => {
        mockProfile = {
            full_name: 'Test player',
            imageUrl: 'http://testPlayer.img',
            score: 21
        }

        mockContext = {
            processResult: mockProcessResult,
            activateGame: true,
            showScore: false
        }
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    test('given player profile props - renders player card - shallow', () => {
        const wrapper = shallow(<PlayerCard profile={mockProfile} />);

        expect(wrapper.find('img').exists()).toBe(true);
        expect(wrapper.find('h4').text()).toEqual(mockProfile.full_name);
    })

    test('given player profile props - renders player card - mount', () => {

        const wrapper = mount(<PlayerCard profile={mockProfile} />);

        expect(wrapper.find('img').exists()).toBe(true);
        expect(wrapper.find('h4').text()).toEqual(mockProfile.full_name);
    })

    test('given player profile props - renders player card - render - RTL', () => {

        const { queryByRole, container } = render(<PlayerCard profile={mockProfile} />);

        expect(queryByRole('img')).toBeTruthy();
        expect(queryByRole('img')).not.toBeNull();
        expect(container.querySelector('h4')).toHaveTextContent(mockProfile.full_name);
    })

    test('showScore from context set to true - should show score element with h5 tag', () => {

        mockContext = {
            processResult: mockProcessResult,
            activateGame: true,
            showScore: true
        }

        const wrapper = mount(
            <GameContext.Provider value={mockContext}>
                <PlayerCard profile={mockProfile} />
            </GameContext.Provider>
        );

        expect(wrapper.find('img').exists()).toBe(true);
        expect(wrapper.find('h5').exists()).toBe(true);
    })

    test('clicking on player card - calls \'processResult\' function', () => {

        const wrapper = mount(<GameContext.Provider value={mockContext}>
            <PlayerCard profile={mockProfile} />
        </GameContext.Provider>
        );

        wrapper.find('img').simulate('click', { preventDefault() { } });
        expect(mockProcessResult).toHaveBeenCalledTimes(1);

    })

    test('not clicking on player card - should not call \'processResult\' function', () => {

        const wrapper = mount(<GameContext.Provider value={mockContext}>
            <PlayerCard profile={mockProfile} />
        </GameContext.Provider>
        );

        expect(wrapper.find('img').exists()).toBe(true);
        expect(mockProcessResult).toHaveBeenCalledTimes(0);
    });

    test('not clicking on player card - should not call \'processResult\' function - RTL', () => {

        const { getByRole } = render(<GameContext.Provider value={mockContext}>
            <PlayerCard profile={mockProfile} />
        </GameContext.Provider>
        );

        fireEvent.click(getByRole('img'));
        //expect(wrapper.find('img').exists()).toBe(true);
        expect(mockProcessResult).toHaveBeenCalledTimes(1);
    });

})