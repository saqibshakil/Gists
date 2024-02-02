import { Store } from 'redux'

import rootReducer, { IAppState } from './reducers'
import rootSaga from './rootSaga'
import { setup } from '../utilities/store'

function* dummySaga(){

}
/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const store: Store<IAppState> = setup('cms', rootReducer, rootSaga, dummySaga) as any

export default store
