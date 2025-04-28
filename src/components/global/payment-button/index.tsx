import React from 'react'
import { useSubscription } from '@/hooks/useSubscription'
import { toast } from 'sonner'

type Props = {}

const PaymentButton = (props: Props) => {
    const { onSubscribe, isProcessing } = useSubscription()
    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        console.log('PaymentButton clicked')
        try {
            await onSubscribe()
        } catch (error) {
            console.error('Payment error:', error)
            toast.error('Failed to process payment')
        }
    }
    return (
        <button 
            className="w-full mt-2 bg-white text-black hover:bg-neutral-200 h-8 text-xs rounded-md flex items-center justify-center"
            onClick={handleClick}
            disabled={isProcessing}
        >
            {isProcessing ? 'Processing...' : 'Upgrade'}
        </button>
    )
}

export default PaymentButton