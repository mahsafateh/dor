import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux';
import Setup from '../app/setup';
import { store } from '../store';

describe('Setup screen', () => {
  it('enables Next when a valid count is selected', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Setup />
      </Provider>
    );
    fireEvent.press(getByText('8'));
    expect(getByText('Next')).toBeEnabled();
  });
});


