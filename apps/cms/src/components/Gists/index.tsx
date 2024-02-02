import React, { memo, useCallback, useEffect, useState } from 'react'
import { Box, FormControl, IconButton, Input, InputAdornment, InputLabel } from '@material-ui/core'
import { bindActionCreators, Dispatch } from 'redux'
import { getGistByUser, start } from '../../store/gist/actions'
import store from '../../store/store'
import context from '../../store/context'
import { connect } from '../../store/connect'
import SearchIcon from '@material-ui/icons/Search'
import Gists from './Gists'
import { IAppState } from '../../store/reducers'
import { onDetailPage } from '../../store/gist/selector'
import { withProvider } from '../../utilities/withProvider'
import GistDetail from './GistDetail'


interface IStateProps {
  onDetailPage: boolean
}

interface IDispatchProps {
  start: typeof start
  search: typeof getGistByUser
}

function Gist({ start, search, onDetailPage }: IStateProps & IDispatchProps) {

  useEffect(() => {
    start()
  }, [])

  const [username, setUserName] = useState("")
  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => setUserName(event.target.value), [])
  const doSearch = useCallback(() => search(username), [username])
  return onDetailPage ? <GistDetail /> : <Box flexGrow={1} flexDirection="column" display="flex" flex={1} minHeight="0" border="1">
    <FormControl fullWidth >
      <InputLabel htmlFor="standard-adornment-password">Username</InputLabel>
      <Input
        id="standard-adornment-password"
        value={username}
        onChange={handleChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label=""
              onClick={doSearch}
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
    <Gists />
  </Box>


}

function mapStateToProps(state: IAppState): IStateProps {

  return {
    onDetailPage: onDetailPage()(state)
  }
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchProps {
  return bindActionCreators(
    {
      start,
      search: getGistByUser
    },
    dispatch
  )
}

export default memo(withProvider(store, context)(connect(mapStateToProps, mapDispatchToProps)(Gist)))
