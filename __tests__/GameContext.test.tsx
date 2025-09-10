import { act } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { incrementScore, nextPlayer, setPlayerCount, setPlayers } from '../store/slices/gameSlice';

function wrapper({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

describe('game slice', () => {
  it('sets player count and players', () => {
    act(() => store.dispatch(setPlayerCount(8)));
    expect(store.getState().game.playerCount).toBe(8);

    act(() =>
      store.dispatch(
        setPlayers([
          { id: '1', name: 'A', team: 1 },
          { id: '2', name: 'B', team: 2 },
        ])
      )
    );
    expect(store.getState().game.players.length).toBe(2);
  });

  it('increments score and cycles players', () => {
    act(() =>
      store.dispatch(
        setPlayers([
          { id: '1', name: 'A', team: 1 },
          { id: '2', name: 'B', team: 2 },
        ])
      )
    );
    act(() => store.dispatch(incrementScore(1)));
    expect(store.getState().game.scoreByTeam[1]).toBe(1);
    act(() => store.dispatch(nextPlayer()));
    expect(store.getState().game.currentPlayerIndex).toBe(1);
  });
});


