'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Capacitor } from '@capacitor/core'
import { VStack, Spinner } from '@chakra-ui/react'
import { useAuth } from '@/context/AuthProvider'
import TitleLogo from '@/components/auth/TitleLogo'
import LandingNav from '@/components/landing/LandingNav'
import HeroSection from '@/components/landing/HeroSection'
import FeatureSection from '@/components/landing/FeatureSection'
import CtaSection from '@/components/landing/CtaSection'

const FEATURES = [
    {
        id: 'scan',
        tagline: 'Point. Scan. Done.',
        title: 'Instant Card Recognition',
        description:
            'Hold your camera up to any Pokémon card and Kollec identifies it instantly. No typing, no scrolling through endless lists — just point and collect.',
        techNote:
            'On-device AI runs the entire recognition pipeline on your phone. No internet required, results in under a second.',
        imageSide: 'right' as const,
        bgColor: '#001B23'
    },
    {
        id: 'search',
        tagline: 'Describe it. Find it.',
        title: 'Search by Description',
        description:
            'Remember a card but not its name? Just type "blue dragon" or "fire fox with lightning" and Kollec understands what you mean and finds the right card.',
        techNote:
            'A language-understanding model runs locally on your device and searches your entire collection in under 100ms.',
        imageSide: 'left' as const,
        bgColor: '#002030'
    },
    {
        id: 'trade',
        tagline: 'Find your trade. Meet your match.',
        title: 'Automatic Trade Recommendations',
        description:
            'Kollec finds nearby collectors who have what you want — and want what you have. No posting, no scrolling. Just real trades with real people near you.',
        techNote:
            'Location-aware matching with a configurable distance filter. Every suggestion is a mutual match worth making.',
        imageSide: 'right' as const,
        bgColor: '#001B23'
    }
]

export default function Landing() {
    const { session } = useAuth()
    const { replace } = useRouter()

    useEffect(() => {
        if (session) {
            replace('/home')
        } else if (Capacitor.isNativePlatform()) {
            replace('/sign-in')
        }
    }, [session, replace])

    if (Capacitor.isNativePlatform()) {
        return (
            <VStack
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <TitleLogo />
                <Spinner size="xl" />
            </VStack>
        )
    }

    return (
        <>
            <style>{`
                html, body { background-color: #001B23; margin: 0; padding: 0; }
            `}</style>
            <main style={{ backgroundColor: '#001B23', overflowX: 'hidden' }}>
                <LandingNav />
                <HeroSection />
                <div id="features">
                    {FEATURES.map((feature, i) => (
                        <FeatureSection
                            key={feature.id}
                            {...feature}
                            index={i}
                        />
                    ))}
                </div>
                <CtaSection />
            </main>
        </>
    )
}
