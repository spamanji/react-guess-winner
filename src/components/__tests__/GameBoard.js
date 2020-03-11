import React from 'react';
import { render } from '@testing-library/react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GameBoard from '../GameBoard';

Enzyme.configure({ adapter: new Adapter() });

describe('Player card component', () => {

    let mockPlayerCards;

    beforeEach(() => {
        mockPlayerCards = [{
            full_name: 'Test player1',
            imageUrl: 'http://testPlayer1.img',
            score: 21
        },
        {
            full_name: 'Test player2',
            imageUrl: 'http://testPlayer2.img',
            score: 22
        },
        {
            full_name: 'Test player3',
            imageUrl: 'http://testPlayer3.img',
            score: 23
        }
        ]
    })

    test('given player profile props - renders player card - shallow', () => {
        const wrapper = shallow(<GameBoard playerCards={mockPlayerCards} />);

        expect(wrapper.find('PlayerCard').exists()).toBe(true);
        // shallow shouldnt render/load child componts
        expect(wrapper.find('h4').exists()).toBe(false);
    })

    test('given player profile props - renders player card - mount', () => {

        const wrapper = mount(<GameBoard playerCards={mockPlayerCards} />);

        expect(wrapper.find('img').exists()).toBe(true);
        expect(wrapper.find('h4').exists()).toBe(true);
    })
})