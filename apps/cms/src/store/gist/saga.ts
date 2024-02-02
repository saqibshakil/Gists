import { all, call, put, select, take, takeEvery, takeLatest } from 'redux-saga/effects'

import { saveGistDetail, saveGists, setLoadingForGistDetail, setLoadingForGists } from './actions'
import { getGistById, getGistByUser, getGistForksById } from './api'
import { BACK_TO_GRID, GET_GISTS_BY_USERNAME, GOTO_GIST_DETAIL, GOTO_NEXT_PAGE, GOTO_PREV_PAGE, START_GIST } from './constants'
import { gridNotEmpty, onDetailPage } from './selector'
import { IStartAction, UIActions } from './types'

export function* gistSaga() {
  yield takeLatest(START_GIST, start)
}

function* start(start: IStartAction) {
/// MorePages nad page number needs to be moved to state as they are used to enable/disable the button
  let page = 1, morePages = true, currentUser = ""

  while (true) {
    let watches: string[] = []
    const dataExist = yield select(gridNotEmpty())

    if (dataExist) {
      if (page !== 1)
        watches.push(GOTO_PREV_PAGE)

      if (morePages)
        watches.push(GOTO_NEXT_PAGE)

      watches.push(GOTO_GIST_DETAIL)
    }

    watches.push(GET_GISTS_BY_USERNAME)

    const action: UIActions = yield take(watches)

    switch (action.type) {
      case GET_GISTS_BY_USERNAME: {
        const { userName } = action
        yield put(setLoadingForGists(true))
        const gists = yield call(getGistByUser, userName, 1)
        if (gists.length === 0) {
          yield put(setLoadingForGists(false))
          alert("No gists found for the user")
          break
        }

        yield put(saveGists(gists))
        page = 1
        morePages = true
        currentUser = userName
        break
      }

      case GOTO_NEXT_PAGE: {
        yield put(setLoadingForGists(true))
        const gists = yield call(getGistByUser, currentUser, ++page)
        if (gists.length === 0) {
          yield put(setLoadingForGists(false))
          alert("No more gist")
          --page
          morePages = false
          break
        }
        yield put(saveGists(gists))
        morePages = true
        break

      }

      case GOTO_PREV_PAGE: {
        yield put(setLoadingForGists(true))
        const gists = yield call(getGistByUser, currentUser, --page)
        if (gists.length > 0) {
          yield put(setLoadingForGists(false))
          ++page
          alert("Unlikely error")
          break
        }
        yield put(saveGists(gists))
        morePages = true
        break

      }

      case GOTO_GIST_DETAIL: {
        const { gistId } = action
        yield put(setLoadingForGistDetail(true))
        const gist = yield call(getGistById, gistId)
        if (gist === undefined) {
          alert("Unable to find gist")
          break
        }

        const forks = yield call(getGistForksById, gistId)

        yield put(saveGistDetail({ ...gist, forks }))
        yield take([BACK_TO_GRID])
        yield put(saveGistDetail(undefined))

        break
      }


    }
  }
}
