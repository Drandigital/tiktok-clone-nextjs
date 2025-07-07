"use client"

import { useEffect, useState } from "react"
import MainLayout from "./layouts/MainLayout"
import { usePostStore } from "@/app/stores/post"
import ClientOnly from "./components/ClientOnly"
import PostMain from "./components/PostMain"
import PostMainMobile from "./components/PostMainMobile"
import MobileBottomNav from "./layouts/includes/MobileBottomNav"
import MobileTopNav from "./layouts/includes/MobileTopNav"

export default function Home() {
  let { allPosts, setAllPosts } = usePostStore();
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => { 
    setAllPosts()
    
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [])

  if (isMobile) {
    return (
      <>
        <MobileTopNav />
        <div className="mobile-container mobile-content">
          <ClientOnly>
            {allPosts.map((post, index) => (
              <div key={index} className="mobile-post">
                <PostMainMobile post={post} />
              </div>
            ))}
          </ClientOnly>
        </div>
        <MobileBottomNav />
      </>
    )
  }

  return (
    <>
      <MainLayout>
        <div className="mt-[80px] w-[calc(100%-90px)] max-w-[690px] ml-auto desktop-only">
          <ClientOnly>
            {allPosts.map((post, index) => (
              <PostMain post={post} key={index} />
            ))}
          </ClientOnly>
        </div>
      </MainLayout>
    </>
  )
}

