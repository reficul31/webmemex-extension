import React from 'react'

import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

/**
* React Dev tools. Refer [React-Dev Tools](https://github.com/facebook/react-devtools).
*/
const DevTools = createDevTools(
    <DockMonitor
        toggleVisibilityKey='ctrl-shift-L'
        changePositionKey='ctrl-alt-shift-L'
        defaultIsVisible={false}
    >
        <LogMonitor />
    </DockMonitor>
)

export default DevTools
