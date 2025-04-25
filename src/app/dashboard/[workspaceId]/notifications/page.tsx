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
  const { data: response } = useQueryData(['notifications'], getNotifications)
  const notificationData = response as NotificationResponse | undefined

  // Check for no notifications
  if (!notificationData || 
      notificationData.status !== 200 || 
      !notificationData.data?.notification || 
      notificationData.data.notification.length === 0) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <p className="text-neutral-500">No notifications</p>
      </div>
    )
  }

  // Sort notifications by date in descending order
  const sortedNotifications = [...notificationData.data.notification].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  return (
    <div className="flex flex-col gap-4">
      {sortedNotifications.map((notification) => (
        <div
          key={notification.id}
          className="border-2 flex gap-x-3 items-center rounded-lg p-3"
        >
          <Avatar>
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col flex-1">
            <p>{notification.content}</p>
            <p className="text-sm text-neutral-500 mt-1">
              {format(new Date(notification.createdAt), 'PPp')}
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
