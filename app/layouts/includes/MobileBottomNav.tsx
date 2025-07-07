import Link from "next/link"
import { usePathname } from "next/navigation"
import { AiOutlineHome, AiOutlineSearch, AiOutlinePlus, AiOutlineHeart, AiOutlineUser } from "react-icons/ai"
import { useUser } from "@/app/context/user"
import { useGeneralStore } from "@/app/stores/general"

export default function MobileBottomNav() {
    const pathname = usePathname()
    const userContext = useUser()
    const { setIsLoginOpen } = useGeneralStore()

    const handleUpload = () => {
        if (!userContext?.user?.id) {
            setIsLoginOpen(true)
            return
        }
        // Navigate to upload
        window.location.href = '/upload'
    }

    const navItems = [
        { icon: AiOutlineHome, label: 'Inicio', href: '/', isActive: pathname === '/' },
        { icon: AiOutlineSearch, label: 'Descubrir', href: '/discover', isActive: pathname === '/discover' },
        { icon: AiOutlinePlus, label: 'Crear', href: '#', isActive: false, isSpecial: true },
        { icon: AiOutlineHeart, label: 'Bandeja', href: '/inbox', isActive: pathname === '/inbox' },
        { icon: AiOutlineUser, label: 'Perfil', href: userContext?.user?.id ? `/profile/${userContext.user.id}` : '#', isActive: pathname.includes('/profile') },
    ]

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-50 md:hidden">
            <div className="flex items-center justify-around py-2">
                {navItems.map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                        {item.isSpecial ? (
                            <button
                                onClick={handleUpload}
                                className="bg-gradient-to-r from-[#ff0050] to-[#ff4081] p-2 rounded-lg"
                            >
                                <item.icon size={24} className="text-white" />
                            </button>
                        ) : (
                            <Link href={item.href} className="flex flex-col items-center py-1">
                                <item.icon 
                                    size={24} 
                                    className={item.isActive ? 'text-white' : 'text-gray-500'} 
                                />
                                <span className={`text-xs mt-1 ${item.isActive ? 'text-white' : 'text-gray-500'}`}>
                                    {item.label}
                                </span>
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
