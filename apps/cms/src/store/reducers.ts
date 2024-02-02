
import { IGistState } from './gist/types'
import gist from './gist/reducer'

const rootReducer = {
  gist,
}

export type IAppState = {
  gist: IGistState
}

export default rootReducer
