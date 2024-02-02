/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers } from 'redux'
import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers';
import { call } from 'redux-saga-test-plan/matchers';
import { dynamic, throwError } from 'redux-saga-test-plan/providers';

import { IAppState } from '../reducers'
import gist from './reducer'
import { gistSaga } from './saga';
import { start } from './actions';

/**
  Saga needs to be tested first and foremost as it contains all the business flows
 */
describe('gist', () => {
  it('Fetch Grid', async done => {
    const { storeState } = await expectSaga(gistSaga)
      .withReducer(
        combineReducers({
          gist
        })
      )
      // .provide([[matchers.call.fn(getClients), data]])
      .dispatch(start())
      .silentRun()
    const state: IAppState = storeState

    // expect(state.client.items).toBeTruthy()
    // expect(state.client.items?.length).toBe(2)
    // const items = state.client.items || []
    // expect(items[0].id).toBe(1)
    done()
  })
})
