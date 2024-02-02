import { camelKeys, snakeKeys } from 'js-convert-case'

import { IGist, IGistDetail } from './types'



const apiBase = `https://api.github.com`

const getGistByUserUri = (userName: string, page: number) => `${apiBase}/users/${userName}/gists?page=${page}`
const getGistByIdUri = (gistId: string) => `${apiBase}/gists/${gistId}`
const getGistForksByIdUri = (gistId: string) => `${apiBase}/gists/${gistId}/forks`



/**
 * Get Gist By user
 */
export const getGistByUser = async (userName: string, page: number): Promise<IGist[]> => {
  try {
    const response = await fetch(getGistByUserUri(userName, page), {
      method: 'GET'
    })

    if (response.status > 300)
      return []

    return (await response.json())
  } catch (e) {
    return []
  }
}


export const getGistById = async (gistId: string): Promise<IGistDetail | undefined> => {
  try {
    const response = await fetch(getGistByIdUri(gistId), {
      method: 'GET'
    })

    if (response.status > 300)
      return undefined

    return (await response.json())
  } catch (e) {
    return undefined
  }
}


export const getGistForksById = async (gistId: string): Promise<IGist[]> => {
  try {
    const response = await fetch(getGistForksByIdUri(gistId), {
      method: 'GET'
    })

    if (response.status > 300)
      return []

    return (await response.json())
  } catch (e) {
    return []
  }
}
