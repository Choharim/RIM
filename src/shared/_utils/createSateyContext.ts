'use client'
import { type Context, type Provider, createContext, useContext } from 'react'

const INITIAL_VALUE = null

type Params<Value> = {
  errorMessage?: Error['message']
  displayName?: Context<Value>['displayName']
}
/**
 * @example
 * const [SafeContextProvider, useSafeContext] = createSateyContext<Value>()
 */
const createSateyContext = <Value>(options: Params<Value> = {}) => {
  const Context = createContext<Value | typeof INITIAL_VALUE>(INITIAL_VALUE)

  if (options.displayName) {
    Context.displayName = options.displayName
  }

  function useSafetyContext() {
    const context = useContext(Context)

    if (context === INITIAL_VALUE) {
      throw Error(
        `${
          options.errorMessage ||
          `${Context.displayName || 'provider'} is needed`
        }`
      )
    }

    return context
  }

  return [Context.Provider, useSafetyContext] as [Provider<Value>, () => Value]
}

export default createSateyContext
