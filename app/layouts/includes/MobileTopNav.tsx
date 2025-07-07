import Link from "next/link"
import { BiSearch } from "react-icons/bi"
import { AiOutlinePlus } from "react-icons/ai"
import { useUser } from "@/app/context/user"
import { useGeneralStore } from "@/app/stores/general"

export default function MobileTopNav() {
    const userContext = useUser()
    const { setIsLoginOpen } = useGeneralStore()

    const handleUpload = () => {
        if (!userContext?.user?.id) {
            setIsLoginOpen(true)
            return
        }
        window.location.href = '/upload'
    }

    return (
        <div className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm md:hidden">
            <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center space-x-4">
                    <span className="text-white text-lg font-semibold">Siguiendo</span>
                    <span className="text-white text-lg font-semibold">Para ti</span>
                </div>
                
                <div className="flex items-center space-x-4">
                    <button className="text-white">
                        <BiSearch size={24} />
                    </button>
                    <button onClick={handleUpload} className="text-white">
                        <AiOutlinePlus size={24} />
                    </button>
                </div>
            </div>
        </div>
    )
}
