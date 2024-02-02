import React, { memo, useCallback, useEffect, useState } from 'react'
import { Badge, Box, Button, Card, CardActions, CardContent, Chip, FormControl, IconButton, Input, InputAdornment, InputLabel, Typography } from '@material-ui/core'
import { withProvider } from '@mops-4.0/redux-setup'
import { bindActionCreators, Dispatch } from 'redux'
import { backToGrid, getGistByUser, gotoDetail, start } from '../../store/gist/actions'
import store from '../../store/store'
import context from '../../store/context'
import { connect } from '../../store/connect'
import SearchIcon from '@material-ui/icons/Search'
import { IGist, IGistDetail } from '../../store/gist/types'
import { IAppState } from '../../store/reducers'
import { onDetailPage } from '../../store/gist/selector'
import ForkItem from './ForkItem'

interface IStateProps {
    gist?: IGistDetail
}

interface IDispatchProps {
    backToGrid: typeof backToGrid
}

function Gist({ backToGrid, gist }: IStateProps & IDispatchProps) {
    if (!gist)
        return <></>
    
    return <Box>
        <Box>Gist forked count: {gist.forks.length}</Box>
        {gist.forks.map(fork => <ForkItem key={fork.id} fork={fork}/>)}
        <Button onClick={backToGrid}>Back</Button>
    </Box>

}

function mapStateToProps(state: IAppState): IStateProps {

    return {
        gist: state.gist.gistDetail
    }
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchProps {
    return bindActionCreators(
        {
            backToGrid
        },
        dispatch
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Gist)
