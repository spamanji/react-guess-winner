import React from 'react';
import { render, cleanup, waitForElement, getByRole } from '@testing-library/react';
import App from '../App';
//import mockAxios from '../__mocks__/axios';
import gameEngine from '../__mocks__/gameEngine';

describe('App Component', () => {

  // function Player({ full_name, imageUrl, score, isWinner }) {
  //   return { full_name, imageUrl, score, isWinner }
  // }

  // const testPlayers = [
  //   Player({ full_name: 'Test Player1', imageUrl: 'http://testPlayer1.png', score: 10 }),
  //   Player({ full_name: 'Test Player2', imageUrl: 'http://testPlayer2.png', score: 20 }),
  //   Player({ full_name: 'Test Player3', imageUrl: 'http://testPlayer3.png', score: 30, isWinner: true })
  // ]

  // let getPlayers;

  beforeEach(async () => {
    // axios.get = jest.fn(() => {
    //gameEngine.getPlayers.mockResolvedValueOnce({ testPlayers });
    // })


    //getPlayers = jest.fn(() => Promise.resolve(testPlayers));
  })

  afterEach(cleanup);

  test('renders Win count element', () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/Win count/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders with initial stateValues', async () => {

    const { container, getByRole, getAllByText } = render(<App />);

    expect(getByRole('GameBoard').children.length).toBe(3);

  })

})
