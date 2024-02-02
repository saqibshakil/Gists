import { RD_LOADING_GISTS, RD_LOADING_GIST_DETAIL, RD_UPDATE_GISTS, RD_UPDATE_GIST_DETAIL } from "./constants";
import { RDActions, IGistState } from "./types";

const defaultState: IGistState = {
    gists: [],
    gridLoading: false,
    detailLoading: false
}

export default function reducer(state: IGistState = defaultState, action: RDActions): IGistState {
    switch (action.type) {
        case RD_LOADING_GISTS: {
            const { loading } = action
            return {
                ...state,
                gridLoading: loading
            }
        }

        case RD_LOADING_GIST_DETAIL: {
            const { loading } = action
            return {
                ...state,
                detailLoading: loading
            }
        }

        case RD_UPDATE_GISTS: {
            const { gists } = action
            return {
                ...state,
                gists,
                gridLoading: false

            }
        }

        case RD_UPDATE_GIST_DETAIL: {
            const { gist } = action
            return {
                ...state,
                gistDetail: gist,
                detailLoading: false
            }
        }

        default:
            return state
    }
}