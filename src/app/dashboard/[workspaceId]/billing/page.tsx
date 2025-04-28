'use client'

import React from 'react'
import { getPaymentInfo } from '@/actions/user'
import { useQueryData } from '@/hooks/useQueryData'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, Plus, CreditCard } from 'lucide-react'
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'
import type { StaticImageData } from 'next/image'
import { useSubscription } from '@/hooks/useSubscription'

interface PaymentMethod {
    id: string;
    type: 'visa' | 'mastercard' | 'amex' | 'applepay' | 'venmo';
    last4: string;
    isDefault: boolean;
    expiryMonth: number;
    expiryYear: number;
}

interface Transaction {
    id: string;
    date: Date;
    amount: number;
    transactionId: string;
    paymentMethod: PaymentMethod;
    status: 'succeeded' | 'pending' | 'failed';
}

interface PaymentInfo {
    status: number;
    data: {
        subscription: {
            plan: 'FREE' | 'PRO';
            paymentMethods?: PaymentMethod[];
            transactions?: Transaction[];
        };
    };
}

const BillingPage = () => {
    const { data: paymentInfo, isPending } = useQueryData(['payment-info'], getPaymentInfo)
    const typedPaymentInfo = paymentInfo as PaymentInfo | undefined
    const { onSubscribe, isProcessing } = useSubscription()

    const getPaymentMethodIcon = (type: string): string => {
        switch (type) {
            case 'visa':
                return '/payment-icons/visa.svg'
            case 'mastercard':
                return '/payment-icons/mastercard.svg'
            case 'amex':
                return '/payment-icons/amex.svg'
            case 'applepay':
                return '/payment-icons/apple-pay.svg'
            case 'venmo':
                return '/payment-icons/venmo.svg'
            default:
                return '/payment-icons/generic-card.svg'
        }
    }

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(date))
    }

    const formatAmount = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount)
    }

    if (isPending) {
        return <div className="space-y-8 max-w-5xl"><LoadingSkeleton /></div>
    }

    const plan = typedPaymentInfo?.data?.subscription?.plan || 'FREE'
    const paymentMethods = typedPaymentInfo?.data?.subscription?.paymentMethods || []
    const transactions = typedPaymentInfo?.data?.subscription?.transactions || []

    return (
        <div className="space-y-8 max-w-5xl">
            {/* Current Plan Section */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Current Plan</h2>
                <Card className="p-6 bg-[#111111] border-neutral-800">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-3xl font-bold">${plan === 'PRO' ? '99' : '0'}/Month</h3>
                            <p className="text-sm text-neutral-400 mt-1">{plan} Plan Subscription</p>
                        </div>
                        {plan === 'PRO' ? (
                            <Button 
                                variant="outline" 
                                className="border-red-800 hover:bg-red-900/20 text-red-500 hover:text-red-400"
                                onClick={() => {
                                    // TODO: Implement cancel subscription
                                    console.log('Cancel subscription')
                                }}
                            >
                                Cancel Subscription
                            </Button>
                        ) : (
                            <Button 
                                variant="outline" 
                                className="border-emerald-800 hover:bg-emerald-900/20 text-emerald-500 hover:text-emerald-400"
                                onClick={onSubscribe}
                                disabled={isProcessing}
                            >
                                {isProcessing ? 'Processing...' : 'Upgrade to PRO'}
                            </Button>
                        )}
                    </div>
                </Card>
            </section>

            {/* Payment Method Section */}
            <section className="space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Payment Method</h2>
                    <Button variant="ghost" size="sm" className="text-neutral-400 hover:text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        Add New
                    </Button>
                </div>
                <Card className="p-6 bg-[#111111] border-neutral-800">
                    <div className="space-y-4">
                        {paymentMethods.length > 0 ? (
                            paymentMethods.map((method: PaymentMethod) => (
                                <div key={method.id} className="flex items-center justify-between p-3 bg-neutral-900 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <Image
                                            src={getPaymentMethodIcon(method.type)}
                                            alt={method.type}
                                            width={48}
                                            height={32}
                                            className="h-8 w-12 object-contain"
                                        />
                                        <span className="text-sm">•••• •••• •••• {method.last4}</span>
                                    </div>
                                    {method.isDefault && (
                                        <span className="text-xs text-neutral-500">Default</span>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-neutral-500 py-4">
                                No payment methods added
                            </div>
                        )}
                    </div>
                </Card>
            </section>

            {/* Payment History Section */}
            <section className="space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Payment History</h2>
                    <Button variant="ghost" size="sm" className="text-neutral-400 hover:text-white">
                        Download PDF
                        <Download className="h-4 w-4 ml-2" />
                    </Button>
                </div>
                <Card className="p-6 bg-[#111111] border-neutral-800">
                    {transactions.length > 0 ? (
                        <div className="space-y-4">
                            <div className="grid grid-cols-4 text-sm text-neutral-500 pb-2">
                                <span>Date</span>
                                <span>Transaction ID</span>
                                <span>Payment Method</span>
                                <span className="text-right">Amount</span>
                            </div>
                            {transactions.map((transaction: Transaction) => (
                                <div key={transaction.id} className="grid grid-cols-4 text-sm py-3 border-t border-neutral-800">
                                    <span>{formatDate(transaction.date)}</span>
                                    <span className="text-neutral-400">{transaction.transactionId}</span>
                                    <span className="flex items-center gap-2">
                                        <Image
                                            src={getPaymentMethodIcon(transaction.paymentMethod.type)}
                                            alt={transaction.paymentMethod.type}
                                            width={24}
                                            height={16}
                                            className="h-4 w-6 object-contain"
                                        />
                                        ••••{transaction.paymentMethod.last4}
                                    </span>
                                    <span className="text-right">{formatAmount(transaction.amount)}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-neutral-500 py-4">
                            No transaction history available
                        </div>
                    )}
                </Card>
            </section>
        </div>
    )
}

const LoadingSkeleton = () => (
    <>
        <div className="space-y-4">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-32 w-full" />
        </div>
        <div className="space-y-4">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-48 w-full" />
        </div>
        <div className="space-y-4">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-64 w-full" />
        </div>
    </>
)

export default BillingPage
