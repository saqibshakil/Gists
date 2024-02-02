import { IAppState } from "../reducers"

export const gridNotEmpty = () => (state: IAppState) => {
    return state.gist.gists.length > 0
}

export const onDetailPage = () => (state: IAppState) => {
    return !!state.gist.gistDetail
}

