import React from 'react';
import Enzyme, { shallow, mount, render as enzymeRender } from 'enzyme';
import { fireEvent, render as rtlRender } from '@testing-library/react';
import ResultAlert from '../ResultAlert';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Result Alert Component', () => {
    let mockAlertProps;
    let mockedRestartGame;
    let mockedShowMeMore;

    beforeEach(() => {
        mockAlertProps = {
            showAlert: true,
            contentMessage: 'Test content',
            confirmButtonText: 'Play again'
        }
        mockedShowMeMore = jest.fn();
        mockedRestartGame = jest.fn();
    })

    test('given alert props - returns rendered component - shallow', () => {
        const wrapper = shallow(<ResultAlert alertProps={mockAlertProps} />);

        expect(wrapper.exists()).toBe(true);
        expect(wrapper.find('button').text()).toEqual(mockAlertProps.confirmButtonText);
        expect(wrapper.find('h3').text()).toEqual(mockAlertProps.contentMessage);

    })

    test('given alert props - returns rendered component - enzyme render', () => {
        const wrapper = enzymeRender(<ResultAlert alertProps={mockAlertProps} />);

        expect(wrapper.find('button').text()).toEqual(mockAlertProps.confirmButtonText);
        expect(wrapper.find('h3').text()).toEqual(mockAlertProps.contentMessage);
    })

    test('given alert props - returns rendered component - react testing library render', () => {
        const { getByRole } = rtlRender(<ResultAlert alertProps={mockAlertProps} />);

        expect(getByRole('heading')).toHaveTextContent(mockAlertProps.contentMessage);
        expect(getByRole('button')).toHaveTextContent(mockAlertProps.confirmButtonText);
    })

    test('snapshot test - RTL', () => {
        const { asFragment } = rtlRender(<ResultAlert alertProps={mockAlertProps} />)
        expect(asFragment()).toMatchSnapshot();
    })

    test('given alert props - returns rendered component - mount', () => {
        const wrapper = mount(<ResultAlert alertProps={mockAlertProps} />);

        expect(wrapper.exists()).toBe(true);
        expect(wrapper.find('button').text()).toEqual(mockAlertProps.confirmButtonText);
        expect(wrapper.find('h3').text()).toEqual(mockAlertProps.contentMessage);
    })

    test('click on Play again - a call to \'restartGame\' prop function should be made', () => {
        // arrange
        const wrapper = mount(<ResultAlert alertProps={mockAlertProps} restartGame={mockedRestartGame} />)
        // act
        wrapper.find('button').simulate('click', { preventDefault() { } });
        // assert
        expect(mockedRestartGame).toHaveBeenCalledTimes(1);
    })

    test('click on Play again - a call to \'restartGame\' prop function should be made - RTL ', () => {
        // arrange
        const { getByRole } = rtlRender(<ResultAlert alertProps={mockAlertProps} restartGame={mockedRestartGame} />)
        // act
        fireEvent.click(getByRole('button'));
        // assert
        expect(mockedRestartGame).toHaveBeenCalledTimes(1);
    })


    test('click on Play something else - call to \'showMeMore\' prop function should be made', () => {
        // arrange
        mockAlertProps = {
            showAlert: true,
            contentMessage: 'Test content',
            confirmButtonText: 'Play something else'
        }
        const wrapper = mount(<ResultAlert alertProps={mockAlertProps}
            restartGame={mockedRestartGame} showMeMore={mockedShowMeMore} />)
        // act
        wrapper.find('button').simulate('click', { preventDefault() { } });
        // assert
        expect(mockedShowMeMore).toHaveBeenCalledTimes(1);
    })

    test('click on Play something else - call to \'showMeMore\' prop function should be made - RTL', () => {
        // arrange
        mockAlertProps = {
            showAlert: true,
            contentMessage: 'Test content',
            confirmButtonText: 'Play something else'
        }

        const { getByRole } = rtlRender(<ResultAlert alertProps={mockAlertProps}
            restartGame={mockedRestartGame} showMeMore={mockedShowMeMore} />)
        // act
        fireEvent.click(getByRole('button'));
        // assert
        expect(mockedShowMeMore).toHaveBeenCalledTimes(1);
        expect(mockedRestartGame).toHaveBeenCalledTimes(0);
    })


})