'use client'
import { getNotifications } from '@/actions/user'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useQueryData } from '@/hooks/useQueryData'
import { User } from 'lucide-react'
import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { format } from 'date-fns'

interface NotificationData {
  id: string
  userId: string | null
  content: string
  createdAt: Date
}

interface NotificationResponse {
  status: number
  data: {
    notification: NotificationData[]
    _count: {
      notification: number
    }
  }
}

const Notifications = () => {
  const { data: notifications } = useQueryData(
    ['user-notifications'],
    getNotifications
  )

  // Defensive check before destructuring
  if (!notifications || typeof notifications !== 'object' || !('data' in notifications) || !('status' in notifications)) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <p>No Notification</p>
      </div>
    )
  }

  const { data: notification, status } = notifications as {
    status: number
    data: {
      notification: {
        id: string
        userId: string | null
        content: string
        createdAt?: string
      }[]
    }
  }

  if (status !== 200 || !notification || !notification.notification) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <p>No Notification</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      {notification.notification.map((n) => (
        <div
          key={n.id}
          className="border-2 flex gap-x-3 items-center rounded-lg p-3"
        >
          <Avatar>
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <div>
            <p>{n.content}</p>
            <p className="text-xs text-gray-400">
              {n.createdAt && !isNaN(new Date(n.createdAt).getTime())
                ? format(new Date(n.createdAt), 'PPp')
                : 'Unknown date'}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

const LoadingSkeleton = () => (
  <div className="flex flex-col gap-4 max-w-2xl">
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex gap-x-3 items-center">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="flex flex-col flex-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-3 w-24 mt-1" />
        </div>
      </div>
    ))}
  </div>
)

export default Notifications
