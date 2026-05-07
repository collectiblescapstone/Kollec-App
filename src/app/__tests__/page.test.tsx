import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent, act } from '@testing-library/react'
import Page from '../page'
import type {
    ButtonProps,
    FlexProps,
    HeadingProps,
    TextProps
} from '@chakra-ui/react'

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

jest.mock('@chakra-ui/react', () => {
    return {
        __esModule: true,

        Flex: ({ children }: FlexProps & { children?: React.ReactNode }) => (
            <div>{children}</div>
        ),
        Heading: ({
            children
        }: HeadingProps & { children?: React.ReactNode }) => (
            <h1>{children}</h1>
        ),
        Text: ({ children }: TextProps & { children?: React.ReactNode }) => (
            <p>{children}</p>
        ),
        Button: ({
            children,
            onClick
        }: ButtonProps & {
            children?: React.ReactNode
            onClick?: () => void
        }) => <button onClick={onClick}>{children}</button>,

        // Add missing HStack and VStack mocks used by the page
        HStack: ({ children }: FlexProps & { children?: React.ReactNode }) => (
            <div data-testid="hstack">{children}</div>
        ),
        VStack: ({ children }: FlexProps & { children?: React.ReactNode }) => (
            <div data-testid="vstack">{children}</div>
        ),

        Tabs: {
            Root: ({ children }: { children?: React.ReactNode }) => (
                <div data-testid="tabs-root">{children}</div>
            ),
            List: ({ children }: { children?: React.ReactNode }) => (
                <div data-testid="tabs-list">{children}</div>
            ),
            Trigger: ({ children }: { children?: React.ReactNode }) => (
                <button type="button">{children}</button>
            ),
            Indicator: ({ children }: { children?: React.ReactNode }) => (
                <div data-testid="tabs-indicator">{children}</div>
            ),
            Content: ({ children }: { children?: React.ReactNode }) => (
                <div>{children}</div>
            )
        }
    }
})

jest.mock('@capacitor/core', () => ({
    Capacitor: {
        isNativePlatform: jest.fn(() => false)
    }
}))

jest.mock('../../context/AuthProvider.tsx', () => ({
    __esModule: true,
    useAuth: jest.fn(() => ({
        session: null
    }))
}))

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        replace: jest.fn()
    })
}))

jest.mock('@/components/logo/Logo', () => ({
    Logo: () => <svg data-testid="logo" />
}))

describe('Landing Page', () => {
    afterEach(() => {
        jest.useRealTimers()
        jest.restoreAllMocks()
        jest.clearAllMocks()
    })

    it('renders static landing content', () => {
        render(<Page />)

        // Check for current content
        expect(
            screen.getByText(
                /Kollec is a secure and centralized Pokémon card collection platform built for collectors by collectors!/i
            )
        ).toBeInTheDocument()

        expect(screen.getByTestId('logo')).toBeInTheDocument()

        expect(screen.getByText('Kollec')).toBeInTheDocument()

        expect(
            screen.getByRole('button', { name: /About/i })
        ).toBeInTheDocument()

        expect(
            screen.getByRole('button', { name: /Features/i })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: /Sign Up/i })
        ).toBeInTheDocument()

        expect(
            screen.getByRole('button', { name: /Login/i })
        ).toBeInTheDocument()

        const signupAnchor = screen.getByLabelText('Go to Sign Up page')
        const loginAnchor = screen.getByLabelText('Go to Login page')

        expect(signupAnchor).toHaveAttribute('href', '/sign-up')
        expect(loginAnchor).toHaveAttribute('href', '/sign-in')
    })

    it('handles anchor clicks by scrolling to and focusing the target element', () => {
        render(<Page />)

        const mockEl = {
            scrollIntoView: jest.fn(),
            focus: jest.fn()
        } as unknown as HTMLElement

        const spy = jest
            .spyOn(document, 'getElementById')
            .mockImplementation((id: string) => {
                return id === 'about' ? mockEl : null
            })

        fireEvent.click(screen.getByLabelText('Scroll to About section'))

        expect(spy).toHaveBeenCalledWith('about')

        expect(mockEl.scrollIntoView).toHaveBeenCalledWith({
            behavior: 'smooth',
            block: 'start'
        })

        expect(mockEl.focus).toHaveBeenCalledWith({ preventScroll: true })
    })
})
