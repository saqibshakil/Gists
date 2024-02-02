import React, { memo, useCallback, useEffect, useState } from 'react'
import { Badge, Box, Button, Card, CardActions, CardContent, Chip, FormControl, IconButton, Input, InputAdornment, InputLabel, Typography } from '@material-ui/core'
import { withProvider } from '@mops-4.0/redux-setup'
import { bindActionCreators, Dispatch } from 'redux'
import { getGistByUser, gotoDetail, start } from '../../store/gist/actions'
import store from '../../store/store'
import context from '../../store/context'
import { connect } from '../../store/connect'
import SearchIcon from '@material-ui/icons/Search'
import { IGist } from '../../store/gist/types'
import { IAppState } from '../../store/reducers'
import { IStateProps } from '@mops-4.0/ui/lib/esm/src/components/Value/ValueEditor'

interface IOwnProps {
    fork: any
}

function ForkItem({ fork }: IOwnProps) {

    const fileNames = Object.keys(fork.files)
    return <Card variant="outlined">
        <CardContent>
            <Typography color="textSecondary" gutterBottom>
                <Chip avatar={fork.owner.avatar_url} label={fork.owner.login} />
            </Typography>
            <Typography variant="body" >
                <a href={fork.html_url}>Link to fork</a>
            </Typography>
            <Typography color="textSecondary">
                {
                    /// files names needs to be refetched by triggering an action
                    fileNames.map(file => <Chip label={fork.files[file].language || file.split('.')[1]} />)
                }
            </Typography>
        </CardContent>
    </Card>


}




export default (ForkItem)
