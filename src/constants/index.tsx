import { Bell, FileDuoToneBlack, Home, CreditCard, Settings } from '@/components/icons'

export const MENU_ITEMS = (workplaceId: string ) : {
    title: string; 
    href: string;
    icon: React.ReactNode
} []=> [
    {title: 'Home', href: `/dashboard/${workplaceId}/home`, icon: <Home /> },
    {
        title: 'My Library', 
        href: `/dashboard/${workplaceId}`, 
        icon: <FileDuoToneBlack /> 
    },
    {
        title: 'Notifications', 
        href: `/dashboard/${workplaceId}/notifications`, 
        icon: <Bell /> 
    },
    {title: 'Billing', href: `/dashboard/${workplaceId}/billing`, icon: <CreditCard /> },
    {title: 'Settings', href: `/dashboard/${workplaceId}/home`, icon: <Settings /> },
   
]