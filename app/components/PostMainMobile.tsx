"use client"

import { useState, useEffect, useRef } from "react"
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShareAlt } from "react-icons/ai"
import { ImMusic } from "react-icons/im"
import Link from "next/link"
import PostMainLikes from "./PostMainLikes"
import useCreateBucketUrl from "../hooks/useCreateBucketUrl"
import { PostMainCompTypes } from "../types"

export default function PostMainMobile({ post }: PostMainCompTypes) {
    const [isLiked, setIsLiked] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const postMainElement = document.getElementById(`PostMainMobile-${post.id}`)
        if (!postMainElement) return

        const observer = new IntersectionObserver((entries) => {
            entries[0].isIntersecting ? video.play() : video.pause()
        }, { threshold: [0.6] })

        observer.observe(postMainElement)

        return () => observer.disconnect()
    }, [post.id])

    const handleVideoClick = () => {
        if (!videoRef.current) return
        
        if (isPlaying) {
            videoRef.current.pause()
        } else {
            videoRef.current.play()
        }
        setIsPlaying(!isPlaying)
    }

    return (
        <div id={`PostMainMobile-${post.id}`} className="mobile-video-container">
            {/* Background overlay */}
            <div className="tiktok-mobile-overlay" />
            
            {/* Video */}
            <video
                ref={videoRef}
                id={`video-${post.id}`}
                loop
                muted
                playsInline
                onClick={handleVideoClick}
                className="mobile-video"
                src={useCreateBucketUrl(post?.video_url)}
            />

            {/* Top Navigation */}
            <div className="tiktok-mobile-top">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                        <button className="text-white text-lg font-semibold opacity-60">
                            Siguiendo
                        </button>
                        <button className="text-white text-lg font-semibold">
                            Para ti
                        </button>
                    </div>
                    <img 
                        className="w-8 h-8 opacity-80" 
                        src="/images/tiktok-logo-white.png"
                        alt="TikTok"
                    />
                </div>
            </div>

            {/* Right Side Actions */}
            <div className="tiktok-mobile-actions">
                {/* Profile Picture */}
                <div className="relative">
                    <Link href={`/profile/${post.profile.user_id}`}>
                        <img 
                            className="w-12 h-12 rounded-full border-2 border-white cursor-pointer" 
                            src={useCreateBucketUrl(post?.profile?.image)} 
                            alt="Profile"
                        />
                    </Link>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-red-500 rounded-full w-6 h-6 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">+</span>
                    </div>
                </div>

                {/* Like Button */}
                <div className="flex flex-col items-center">
                    <button 
                        onClick={() => setIsLiked(!isLiked)}
                        className="mobile-action-btn p-3"
                    >
                        {isLiked ? (
                            <AiFillHeart size={32} className="text-red-500" />
                        ) : (
                            <AiOutlineHeart size={32} className="text-white" />
                        )}
                    </button>
                    <span className="text-white text-xs mt-1 font-semibold mobile-text-shadow">127.5K</span>
                </div>

                {/* Comment Button */}
                <div className="flex flex-col items-center">
                    <button className="mobile-action-btn p-3">
                        <AiOutlineMessage size={32} className="text-white" />
                    </button>
                    <span className="text-white text-xs mt-1 font-semibold mobile-text-shadow">2,847</span>
                </div>

                {/* Share Button */}
                <div className="flex flex-col items-center">
                    <button className="mobile-action-btn p-3">
                        <AiOutlineShareAlt size={32} className="text-white" />
                    </button>
                    <span className="text-white text-xs mt-1 font-semibold mobile-text-shadow">Share</span>
                </div>

                {/* Music Record */}
                <div className="w-12 h-12 mobile-action-btn flex items-center justify-center animate-spin-slow">
                    <ImMusic size={20} className="text-white" />
                </div>
            </div>

            {/* Bottom Info */}
            <div className="tiktok-mobile-info">
                <div className="text-white">
                    <div className="flex items-center mb-3">
                        <Link href={`/profile/${post.profile.user_id}`}>
                            <span className="font-bold text-lg mobile-text-shadow">@{post.profile.name}</span>
                        </Link>
                        <button className="ml-3 border border-white px-4 py-1 rounded text-sm font-semibold bg-black bg-opacity-20 backdrop-blur-sm">
                            Seguir
                        </button>
                    </div>
                    <p className="text-sm mb-3 max-w-[280px] leading-relaxed mobile-text-shadow">
                        {post.text}
                    </p>
                    <div className="flex items-center text-sm mobile-text-shadow">
                        <ImMusic size={16} className="mr-2" />
                        <span>♪ Sonido original - {post.profile.name}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
