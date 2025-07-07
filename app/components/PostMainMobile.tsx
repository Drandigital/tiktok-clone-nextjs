"use client"

import { useState, useEffect, useRef } from "react"
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShareAlt } from "react-icons/ai"
import { ImMusic } from "react-icons/im"
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi"
import Link from "next/link"
import PostMainLikes from "./PostMainLikes"
import useCreateBucketUrl from "../hooks/useCreateBucketUrl"
import { PostMainCompTypes } from "../types"

export default function PostMainMobile({ post }: PostMainCompTypes) {
    const [isLiked, setIsLiked] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const postMainElement = document.getElementById(`PostMainMobile-${post.id}`)
        if (!postMainElement) return

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                video.play()
                setIsPlaying(true)
            } else {
                video.pause()
                setIsPlaying(false)
            }
        }, { threshold: [0.6] })

        observer.observe(postMainElement)

        return () => observer.disconnect()
    }, [post.id])

    const handleVideoClick = () => {
        if (!videoRef.current) return
        
        if (isPlaying) {
            videoRef.current.pause()
            setIsPlaying(false)
        } else {
            videoRef.current.play()
            setIsPlaying(true)
        }
    }

    const handleMuteClick = () => {
        if (!videoRef.current) return
        
        videoRef.current.muted = !videoRef.current.muted
        setIsMuted(videoRef.current.muted)
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
                <div className="mobile-profile-container">
                    <Link href={`/profile/${post.profile.user_id}`}>
                        <img 
                            className="w-12 h-12 rounded-full border-2 border-white cursor-pointer" 
                            src={useCreateBucketUrl(post?.profile?.image)} 
                            alt="Profile"
                        />
                    </Link>
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-[#83c92e] rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                        <span className="text-white text-xs font-bold">+</span>
                    </div>
                </div>

                {/* Like Button */}
                <div className="flex flex-col items-center">
                    <button 
                        onClick={() => setIsLiked(!isLiked)}
                        className="mobile-action-btn"
                    >
                        {isLiked ? (
                            <AiFillHeart size={24} className="text-red-500" />
                        ) : (
                            <AiOutlineHeart size={24} className="text-white" />
                        )}
                    </button>
                    <span className="text-white mobile-stats mobile-text-shadow">127.5K</span>
                </div>

                {/* Comment Button */}
                <div className="flex flex-col items-center">
                    <button className="mobile-action-btn">
                        <AiOutlineMessage size={24} className="text-white" />
                    </button>
                    <span className="text-white mobile-stats mobile-text-shadow">2,847</span>
                </div>

                {/* Share Button */}
                <div className="flex flex-col items-center">
                    <button className="mobile-action-btn">
                        <AiOutlineShareAlt size={24} className="text-white" />
                    </button>
                    <span className="text-white mobile-stats mobile-text-shadow">Share</span>
                </div>

                {/* Sound Control Button */}
                <div className="flex flex-col items-center">
                    <button 
                        onClick={handleMuteClick}
                        className="mobile-action-btn"
                    >
                        {isMuted ? (
                            <HiVolumeOff size={24} className="text-white" />
                        ) : (
                            <HiVolumeUp size={24} className="text-white" />
                        )}
                    </button>
                    <span className="text-white mobile-stats mobile-text-shadow">
                        {isMuted ? "Off" : "On"}
                    </span>
                </div>

                {/* Music Record */}
                <div className="mobile-action-btn animate-spin-slow">
                    <ImMusic size={16} className="text-white" />
                </div>
            </div>

            {/* Bottom Info */}
            <div className="tiktok-mobile-info">
                <div className="text-white">
                    <div className="flex items-center mb-2">
                        <Link href={`/profile/${post.profile.user_id}`}>
                            <span className="mobile-username mobile-text-shadow">@{post.profile.name}</span>
                        </Link>
                        <button className="mobile-follow-btn">
                            Seguir
                        </button>
                    </div>
                    <p className="mobile-description mobile-text-shadow">
                        {post.text}
                    </p>
                    <div className="mobile-music-info mobile-text-shadow">
                        <ImMusic size={14} />
                        <span>♪ Sonido original - {post.profile.name}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
