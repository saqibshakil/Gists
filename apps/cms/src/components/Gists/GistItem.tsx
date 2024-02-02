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
    gist: IGist
}

interface IDispatchProps {
    gotoDetail: typeof gotoDetail
}

function Gist({ gotoDetail, gist: { description, files, id } }: IOwnProps & IDispatchProps) {

    const fileNames = Object.keys(files)
    const detail = useCallback(() => gotoDetail(id), [])
    return <Card variant="outlined">
        <CardContent>
            <Typography color="textSecondary" gutterBottom>
                {fileNames[0]}
            </Typography>
            <Typography variant="h5" component="h2">
                {description}
            </Typography>
            <Typography color="textSecondary">
                {
                    fileNames.map(file => <Chip label={files[file].language || file.split('.')[1]} />)
                }
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small" onClick={detail}>Detail</Button>
        </CardActions>
    </Card>


}



function mapDispatchToProps(dispatch: Dispatch): IDispatchProps {
    return bindActionCreators(
        {
            gotoDetail
        },
        dispatch
    )
}

export default connect(undefined, mapDispatchToProps)(Gist)
