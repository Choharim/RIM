'use client'
import React, { PropsWithChildren, useCallback, useMemo, useState } from 'react'
import { Toast } from '../_types'
import { createSateyContext, getRandomNumber } from '@/shared/_utils'
import ToastPortal from '../ToastPortal'
import { TOAST_TIMEOUT } from '../toastBox.css'

type Value = {
  showToast: ({ variety, desc }: Pick<Toast, 'desc' | 'variety'>) => void
}

function ToastProvider({ children }: PropsWithChildren) {
  const [toasts, setToasts] = useState<Array<Toast>>([])

  const clear = (id: number) => {
    const timeout = setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
      clearTimeout(timeout)
    }, TOAST_TIMEOUT)
  }

  const addToast = useCallback(
    ({ variety, desc }: Pick<Toast, 'desc' | 'variety'>) => {
      const id = getRandomNumber()

      setToasts((prev) => [
        ...prev,
        {
          id,
          variety,
          desc,
        },
      ])

      clear(id)
    },
    []
  )

  const values = useMemo(
    () => ({
      showToast: addToast,
    }),
    [addToast]
  )

  return (
    <ToastContextProvider value={values}>
      {children}
      <ToastPortal toasts={toasts} />
    </ToastContextProvider>
  )
}

const [ToastContextProvider, useToastContext] = createSateyContext<Value>({
  displayName: 'ToastContext',
})

export { useToastContext }
export default ToastProvider
