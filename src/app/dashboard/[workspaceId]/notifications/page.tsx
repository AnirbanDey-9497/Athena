'use client'
import { getNotifications } from '@/actions/user'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useQueryData } from '@/hooks/useQueryData'
import { User } from 'lucide-react'
import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

interface NotificationData {
  id: string
  userId: string | null
  content: string
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

  return (
    <div className="flex flex-col gap-4">
      {notificationData.data.notification.map((notification) => (
        <div
          key={notification.id}
          className="border-2 flex gap-x-3 items-center rounded-lg p-3"
        >
          <Avatar>
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <p>{notification.content}</p>
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
        <Skeleton className="h-4 w-full" />
      </div>
    ))}
  </div>
)

export default Notifications
