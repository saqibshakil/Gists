import React, { memo, useCallback, useEffect, useState } from 'react'
import { Box, Button, CircularProgress, Fab, FormControl, IconButton, Input, InputAdornment, InputLabel } from '@material-ui/core'
import { withProvider } from '@mops-4.0/redux-setup'
import { bindActionCreators, Dispatch } from 'redux'
import { getGistByUser, gotoNextPage, gotoPrevPage, start } from '../../store/gist/actions'
import store from '../../store/store'
import context from '../../store/context'
import { connect } from '../../store/connect'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import { IGist } from '../../store/gist/types'
import { IAppState } from '../../store/reducers'
import GistItem from './GistItem'

interface IStateProps {
    gists: IGist[]
    loading: boolean
}

interface IDispatchProps {
    gotoNextPage: typeof gotoNextPage
    gotoPrevPage: typeof gotoPrevPage
}

function Gists({ gists, loading, gotoNextPage, gotoPrevPage }: IStateProps & IDispatchProps) {

    return loading ? <CircularProgress /> :
        <Box>
            <Box flexGrow={1} flexDirection="column" display="flex" flex={1} flexWrap={true} minHeight="0" border="1">
                {

                    gists.map((gist) => <GistItem key={gist.id} gist={gist} />)

                }
            </Box>
            {gists.length > 0 && <Box>
                <Fab onClick={gotoPrevPage}><ChevronLeft /></Fab>
                <Fab onClick={gotoNextPage}><ChevronRight /></Fab>
            </Box>}
        </Box>


}

function mapStateToProps(state: IAppState): IStateProps {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

    return {
        gists: state.gist.gists,
        loading: state.gist.gridLoading
    }
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchProps {
    return bindActionCreators(
        {
            gotoNextPage,
            gotoPrevPage
        },
        dispatch
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Gists)
