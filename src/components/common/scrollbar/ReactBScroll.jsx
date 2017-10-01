/**
 * Created by Administrator on 2017/10/2.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import deepEqual from 'deep-equal';


const excludePropNames = ['defer', 'bScroll', 'onRefresh', 'options']

// Events available on iScroll instance
// {`react component event name`: `iScroll event name`}
const availableEventNames = {}
const bScrollEventNames = ['beforeScrollStart', 'scrollCancel', 'scrollStart', 'scroll', 'scrollEnd', 'flick', 'zoomStart', 'zoomEnd']

for (let i = 0, len = bScrollEventNames.length; i < len; i++) {
    const bScrollEventName = bScrollEventNames[i]
    const reactEventName = `on${bScrollEventName[0].toUpperCase()}${bScrollEventName.slice(1)}`
    availableEventNames[reactEventName] = bScrollEventName
    excludePropNames.push(reactEventName)
}

class ReactBScroll extends React.Component {
    static displayName = 'ReactBScroll'

    static defaultProps = {
        defer: true,
        options: {},
        style: {
            position: 'relative',
            height: '100%',
            width: '100%',
            overflow: 'hidden'
        }
    }

    constructor(props) {
        super(props)

        this._isMounted = false
        this._initializeTimeout = null
        this._queuedCallbacks = []
        this._bScrollBindedEvents = {}
    }

    componentDidMount() {
        this._isMounted = true
        this._initializeIScroll()
    }

    componentWillUnmount() {
        this._isMounted = false
        this._teardownIScroll()
    }

    // There is no state, we can compare only props.
    shouldComponentUpdate(nextProps, nextContext) {
        return !deepEqual(this.props, nextProps) || !deepEqual(this.context, nextContext)
    }

    // Check if iScroll options has changed and recreate instance with new one
    componentDidUpdate(prevProps) {
        // If options are same, iScroll behaviour will not change. Just refresh events and trigger refresh
        if (deepEqual(prevProps.options, this.props.options)) {
            this._updateIScrollEvents(prevProps, this.props)
            this.refresh()

            // If options changed, we will destroy iScroll instance and create new one with same scroll position
            // TODO test if this will work with indicators
        } else {
            this.withIScroll(true, iScrollInstance => {
                // Save current state
                const { x, y, scale } = iScrollInstance

                // Destroy current and Create new instance of iScroll
                this._teardownIScroll()
                this._initializeIScroll()

                this.withIScroll(true, newIScrollInstance => {
                    // Restore previous state
                    if (scale && newIScrollInstance.zoom) {
                        newIScrollInstance.zoom(scale, 0, 0, 0)
                    }

                    newIScrollInstance.scrollTo(x, y)
                })
            })
        }
    }

    getIScroll() {
        return this._iScrollInstance
    }

    getIScrollInstance() {
        //console.warn("Function 'getIScrollInstance' is deprecated. Instead use 'getIScroll'")
        return this._iScrollInstance
    }

    withIScroll(waitForInit, callback) {
        if (!callback && typeof waitForInit == 'function') {
            callback = waitForInit
        }

        if (this.getIScroll()) {
            callback(this.getIScroll())
        } else if (waitForInit === true) {
            this._queuedCallbacks.push(callback)
        }
    }

    refresh() {
        this.withIScroll(iScrollInstance => iScrollInstance.refresh())
    }

    _runInitializeIScroll() {
        const { bScroll, options } = this.props

        // Create iScroll instance with given options
        const iScrollInstance = new bScroll(ReactDOM.findDOMNode(this), options)
        this._iScrollInstance = iScrollInstance

        // TODO there should be new event 'onInitialize'
        this._triggerRefreshEvent()

        // Patch iScroll instance .refresh() function to trigger our onRefresh event
        iScrollInstance.originalRefresh = iScrollInstance.refresh

        iScrollInstance.refresh = () => {
            iScrollInstance.originalRefresh.apply(iScrollInstance)
            this._triggerRefreshEvent()
        }

        // Bind iScroll events
        this._bindIScrollEvents()

        this._callQueuedCallbacks()
    }

    _initializeIScroll() {
        if (this._isMounted === false) {
            return
        }

        const { defer } = this.props

        if (defer === false) {
            this._runInitializeIScroll()
        } else {
            const timeout = defer === true ? 0 : defer
            this._initializeTimeout = setTimeout(() => this._runInitializeIScroll(), timeout)
        }
    }

    _callQueuedCallbacks() {
        const callbacks = this._queuedCallbacks, len = callbacks.length

        this._queuedCallbacks = []

        for (let i = 0; i < len; i++) {
            callbacks[i](this.getIScroll())
        }
    }

    _teardownIScroll() {
        this._clearInitializeTimeout()

        if (this._iScrollInstance) {
            this._iScrollInstance.destroy()
            this._iScrollInstance = undefined
        }

        this._bScrollBindedEvents = {}
        this._queuedCallbacks = []
    }

    _clearInitializeTimeout() {
        if (this._initializeTimeout !== null) {
            clearTimeout(this._initializeTimeout)
            this._initializeTimeout = null
        }
    }

    _bindIScrollEvents() {
        // Bind events on iScroll instance
        this._bScrollBindedEvents = {}
        this._updateIScrollEvents({}, this.props)
    }

    // Iterate through available events and update one by one
    _updateIScrollEvents(prevProps, nextProps) {
        for (const reactEventName in availableEventNames) {
            this._updateIScrollEvent(availableEventNames[reactEventName], prevProps[reactEventName], nextProps[reactEventName])
        }
    }

    // Unbind and/or Bind event if it was changed during update
    _updateIScrollEvent(iScrollEventName, prevPropEvent, currentPropEvent) {
        if (prevPropEvent !== currentPropEvent) {
            const currentEvents = this._bScrollBindedEvents

            this.withIScroll(true, function(iScrollInstance) {
                if (typeof prevPropEvent === 'function') {
                    iScrollInstance.off(iScrollEventName, currentEvents[iScrollEventName])
                    currentEvents[iScrollEventName] = undefined
                }

                if (typeof currentPropEvent === 'function') {
                    const wrappedCallback = function(...args) {
                        currentPropEvent(iScrollInstance, ...args)
                    }

                    iScrollInstance.on(iScrollEventName, wrappedCallback)
                    currentEvents[iScrollEventName] = wrappedCallback
                }
            })
        }
    }

    _triggerRefreshEvent() {
        const { onRefresh } = this.props

        if (typeof onRefresh === 'function') {
            this.withIScroll(iScrollInstance => onRefresh(iScrollInstance))
        }
    }

    render() {
        // Keep only non ReactIScroll properties
        const props = {}

        for (const prop in this.props) {
            if (!~excludePropNames.indexOf(prop)) {
                props[prop] = this.props[prop]
            }
        }

        return <div {...props} />
    }
}

export default ReactBScroll