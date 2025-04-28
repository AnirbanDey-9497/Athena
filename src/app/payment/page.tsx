'use client'

import { completeSubscription } from '@/actions/user'
import React, { useEffect, useState } from 'react'

type Props = {
  searchParams: { session_id?: string; cancel?: boolean }
}

const PaymentPage = ({ searchParams }: Props) => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const processPayment = async () => {
      const session_id = searchParams.session_id
      const cancel = searchParams.cancel

      if (cancel) {
        setStatus('error')
        setError('Payment was cancelled')
        return
      }

      if (session_id) {
        try {
          console.log('Processing payment with session_id:', session_id)
          const result = await completeSubscription(session_id)
          console.log('Subscription completion result:', result)
          
          if (result.status === 200) {
            setStatus('success')
            window.location.href = '/auth/callback'
          } else {
            setStatus('error')
            setError(`Payment processing failed with status: ${result.status}`)
          }
        } catch (error) {
          console.error('Error processing payment:', error)
          setStatus('error')
          setError('An error occurred while processing your payment')
        }
      }
    }

    processPayment()
  }, [searchParams])

  if (status === 'loading') {
    return (
      <div className="flex flex-col justify-center items-center h-screen w-full">
        <h4 className="text-5xl font-bold">Processing...</h4>
        <p className="text-xl text-center">Please wait while we process your payment</p>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="flex flex-col justify-center items-center h-screen w-full">
        <h4 className="text-5xl font-bold">Error</h4>
        <p className="text-xl text-center">{error}</p>
        <p className="text-sm text-gray-500 mt-4">Please try again or contact support if this persists.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <h4 className="text-5xl font-bold">Success!</h4>
      <p className="text-xl text-center">Redirecting you to your account...</p>
    </div>
  )
}

export default PaymentPage
