import { useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'

export const useSubscription = () => {
  const [isProcessing, setIsProcessing] = useState(false)
  const onSubscribe = async () => {
    setIsProcessing(true)
    try {
      const response = await axios.get('/api/payment')
      if (response.data.status === 200) {
        window.location.href = response.data.session_url
      } else {
        toast.error('Failed to create payment session')
        setIsProcessing(false)
      }
    } catch (error) {
      console.error('Payment error:', error)
      toast.error('Failed to process payment. Please try again.')
      setIsProcessing(false)
    }
  }
  return { onSubscribe, isProcessing }
}
