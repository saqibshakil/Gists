import { Connect } from 'react-redux'

import context from './context'
import { applyConnectDefaults } from '../utilities/applyConnectDefaults'

export const connect: Connect = applyConnectDefaults({ context: context as any })
