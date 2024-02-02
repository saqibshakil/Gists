import { OptionsObject, SnackbarKey, SnackbarMessage } from 'notistack'

import { TransType } from '../../translations/useTranslation'

import { BACK_TO_GRID, GET_GISTS_BY_USERNAME, GOTO_GIST_DETAIL, GOTO_NEXT_PAGE, GOTO_PREV_PAGE, RD_LOADING_GISTS, RD_LOADING_GIST_DETAIL, RD_UPDATE_GISTS, RD_UPDATE_GIST_DETAIL, START_GIST } from './constants'
import { IBackToGrid, IGetListOfGists, IGist, IGistDetail, IGistDetailLoading, IGistsLoading, IGotoDetail, IGotoNextPage, IGotoPrevPage, IStartAction, IUpdateDetail, IUpdateGists, RDActions, UIActions } from './types'


export const start = (): IStartAction => {
  return {
    type: START_GIST
  }
}

export const saveGists = (gists: IGist[]): IUpdateGists => {
  return {
    type: RD_UPDATE_GISTS,
    gists
  }
}

export const saveGistDetail = (gist?: IGistDetail): IUpdateDetail => {
  return {
    type: RD_UPDATE_GIST_DETAIL,
    gist
  }
}

export const setLoadingForGistDetail = (loading: boolean): IGistDetailLoading => {
  return {
    type: RD_LOADING_GIST_DETAIL,
    loading
  }
}

export const setLoadingForGists = (loading: boolean): IGistsLoading => {
  return {
    type: RD_LOADING_GISTS,
    loading
  }
}

export const getGistByUser = (userName: string): IGetListOfGists => {
  return {
    type: GET_GISTS_BY_USERNAME,
    userName
  }
}

export const backToGrid = (): IBackToGrid => {
  return {
    type: BACK_TO_GRID
  }
}

export const gotoDetail = (gistId: string): IGotoDetail => {
  return {
    type: GOTO_GIST_DETAIL,
    gistId
  }
}

export const gotoNextPage = (): IGotoNextPage => {
  return {
    type: GOTO_NEXT_PAGE
  }
}

export const gotoPrevPage = (): IGotoPrevPage => {
  return {
    type: GOTO_PREV_PAGE
  }
}


