import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../page'
import type { FlexProps } from '@chakra-ui/react'

jest.mock('next/link', () => ({
    __esModule: true,
    default: ({
        href,
        children,
        ...props
    }: {
        href?: string | { pathname?: string }
        children?: React.ReactNode
    }) => {
        const resolved =
            typeof href === 'string'
                ? href
                : (href && (href as { pathname?: string }).pathname) || ''
        return (
            <a href={resolved} {...props}>
                {children}
            </a>
        )
    }
}))

jest.mock('@chakra-ui/react', () => ({
    __esModule: true,
    VStack: ({ children }: FlexProps & { children?: React.ReactNode }) => (
        <div data-testid="vstack">{children}</div>
    ),
    Spinner: () => <div data-testid="spinner" />
}))

jest.mock('@capacitor/core', () => ({
    Capacitor: {
        isNativePlatform: jest.fn(() => false)
    }
}))

jest.mock('../../context/AuthProvider.tsx', () => ({
    __esModule: true,
    useAuth: jest.fn(() => ({ session: null }))
}))

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(() => ({ replace: jest.fn() }))
}))

jest.mock('@/components/auth/TitleLogo', () => ({
    __esModule: true,
    default: () => <div data-testid="title-logo" />
}))

jest.mock('@/components/landing/LandingNav', () => ({
    __esModule: true,
    default: () => <nav data-testid="landing-nav" />
}))

jest.mock('@/components/landing/HeroSection', () => ({
    __esModule: true,
    default: () => <section data-testid="hero-section" />
}))

jest.mock('@/components/landing/FeatureSection', () => ({
    __esModule: true,
    default: ({ id }: { id: string }) => (
        <section data-testid={`feature-${id}`} />
    )
}))

jest.mock('@/components/landing/CtaSection', () => ({
    __esModule: true,
    default: () => <section data-testid="cta-section" />
}))

describe('Landing Page', () => {
    afterEach(() => {
        jest.restoreAllMocks()
        jest.clearAllMocks()
    })

    it('renders all landing sections when not on native platform', () => {
        render(<Page />)

        expect(screen.getByTestId('landing-nav')).toBeInTheDocument()
        expect(screen.getByTestId('hero-section')).toBeInTheDocument()
        expect(screen.getByTestId('feature-scan')).toBeInTheDocument()
        expect(screen.getByTestId('feature-search')).toBeInTheDocument()
        expect(screen.getByTestId('feature-trade')).toBeInTheDocument()
        expect(screen.getByTestId('cta-section')).toBeInTheDocument()
    })

    it('shows spinner on native platform while redirecting to sign-in', () => {
        const { Capacitor } = require('@capacitor/core')
        ;(Capacitor.isNativePlatform as jest.Mock).mockReturnValue(true)

        render(<Page />)

        expect(screen.getByTestId('spinner')).toBeInTheDocument()
        expect(screen.queryByTestId('landing-nav')).not.toBeInTheDocument()
    })

    it('redirects to /home when a session is active', () => {
        const replace = jest.fn()
        const { useAuth } = require('../../context/AuthProvider')
        const { useRouter } = require('next/navigation')
        ;(useAuth as jest.Mock).mockReturnValue({
            session: { user: { id: '123' } }
        })
        ;(useRouter as jest.Mock).mockReturnValue({ replace })

        render(<Page />)

        expect(replace).toHaveBeenCalledWith('/home')
    })

    it('redirects to /sign-in on native platform', () => {
        const replace = jest.fn()
        const { Capacitor } = require('@capacitor/core')
        const { useAuth } = require('../../context/AuthProvider')
        const { useRouter } = require('next/navigation')
        ;(Capacitor.isNativePlatform as jest.Mock).mockReturnValue(true)
        ;(useAuth as jest.Mock).mockReturnValue({ session: null })
        ;(useRouter as jest.Mock).mockReturnValue({ replace })

        render(<Page />)

        expect(replace).toHaveBeenCalledWith('/sign-in')
    })
})
