'use client'

// React
import React, { useEffect } from 'react'
import { LuHandshake, LuScanEye, LuSearch } from 'react-icons/lu'

// Next.js
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Chakra UI
import {
    Button,
    Heading,
    Text,
    Tabs,
    HStack,
    VStack,
    Spinner
} from '@chakra-ui/react'

// Child Components
import { Logo } from '@/components/logo/Logo'
import { useAuth } from '@/context/AuthProvider'
import { Capacitor } from '@capacitor/core'
import TitleLogo from '@/components/auth/TitleLogo'

const Landing: React.FC = () => {
    const { session } = useAuth()
    const { replace } = useRouter()

    const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const href = e.currentTarget.getAttribute('href') || ''
        if (href.startsWith('#')) {
            e.preventDefault()
            const id = href.slice(1)
            const el = document.getElementById(id)
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                ;(el as HTMLElement).focus({ preventScroll: true })
            }
        }
    }

    useEffect(() => {
        if (session) {
            replace('/home')
        } else if (Capacitor.isNativePlatform()) {
            replace('/sign-in')
        }
    }, [session, replace])

    return Capacitor.isNativePlatform() ? (
        <VStack
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <TitleLogo />
            <Spinner size="xl" />
        </VStack>
    ) : (
        <>
            <style>
                {`
          html, body, #__next, main {
            height: 100%;
            margin: 0;
            padding: 0;
            background-color: #f2f2f2;
            scroll-behavior: smooth; /* enable smooth anchor scrolling */
          }

          .kollec-body {
            background-color: #f2f2f2;
            min-height: 100vh;
          }

          .container {
            width: 95%;
            max-width: 1024px;
            margin: 20px auto;
            padding: 10px;
            background: linear-gradient(0deg, rgba(242, 199, 92, 0.7) 0%, #F2C75C 100%);
            border: 3px solid #003b49;
            border-radius: 15px;
            box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
            position: relative;
          }


          .main-content {
            display: flex;
            flex-direction: column; 
            gap: 15px;
          }

          .content {
            width: 100%; 
            background: url('/Assets/img/LandingPage/stars.webp');
            border-radius: 10px;
            padding: 20px;
            border: 3px inset #003b49;
            box-sizing: border-box;
          }

          .navigation {
            width: 100%; 
            background-color: #f2f2f2;
            border-radius: 10px;
            padding: 10px 20px;
            border: 2px inset #003b49;
            box-sizing: border-box;
            height: 8rem;
          }

          .nav-actions {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 8px;
            flex-wrap: wrap;
            width: 80%;
            min-width: 80%;
          }

          /* keep nav title and actions aligned */
          .navigation h2 {
            font-size: 1.9em;
            margin-top: 0;
            color: #003b49;
          }

          /* Ensure anchor wrappers and buttons align consistently */
          .nav-actions a {
            display: inline-flex;
            align-items: center;
            text-decoration: none;
            height: 36px; 
          }

          .nav-actions button {
            margin: 0; /* remove any button-specific top margins */
            padding: 6px 12px;
            height: 36px; /* fixed height for consistent alignment */
            display: inline-flex;
            align-items: center;
            justify-content: center;
            line-height: 1;
          }

          /* Make sure anchor wrappers also size to the button so everything lines up */
          .nav-actions a { height: 36px; display: inline-flex; align-items: center; }

          .navigation ul {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 25px; /* Space between links */
          }

          .navigation li {
            margin-bottom: 9px;
            margin-left: 22px;
          }

          .card {
            background-color: #f2f2f2;
            padding: 15px;
            margin-top: 15px;
            border-radius: 10px;
            border: 3px inset #003b49;
            position: relative;
            outline: none;
          }

          /* ensure anchored sections are visible under any sticky header */
          .card { scroll-margin-top: 90px; }

          .card:focus {
            box-shadow: 0 0 0 3px rgba(0,59,73,0.15);
          }

          .card h1, .card h2 {
            font-size: 1.9em;
            margin-bottom: 21px;
            color: #003b49;
          }

          .card p {
            font-size: 1.0em;
            line-height: 1.3em;
            margin-bottom: 21px;
            color: #000000;
          }

          .card li {
            list-style-image: url('/Assets/img/LandingPage/pikachu.webp');
            font-size: 1.3em;
            color: #003b49;
          }
          
          .card li p {
            font-size: 0.8em;
            color: #000000;
            margin-left: 8px; /* space between bullet and text */
          }

          .footer {
            margin-top: 25px;
            text-align: center;
            font-size: 1.0em;
            color: #003b49;
          }
        `}
            </style>

            <div className="kollec-body">
                <div className="container">
                    {/* Main content */}
                    <div className="main-content">
                        {/* Navigation Section */}
                        <nav
                            className="navigation"
                            aria-label="Kollec main navigation"
                        >
                            <HStack
                                height="100%"
                                width="100%"
                                align="center"
                                pt={1}
                                pb={1}
                            >
                                <VStack height="100%">
                                    <Logo
                                        data-testid="logo"
                                        style={{
                                            color: '#F2C75C',
                                            width: '100%',
                                            height: '100%'
                                        }}
                                    />

                                    <Text
                                        fontSize="md"
                                        fontWeight="bold"
                                        color="brand.turtoise"
                                    >
                                        Kollec
                                    </Text>
                                </VStack>

                                <div className="nav-actions">
                                    <a
                                        href="#about"
                                        onClick={handleAnchorClick}
                                        style={{ textDecoration: 'none' }}
                                        aria-label="Scroll to About section"
                                    >
                                        <Button
                                            variant="ghost"
                                            color="brand.turtoise"
                                            size="lg"
                                        >
                                            About
                                        </Button>
                                    </a>
                                    <a
                                        href="#features"
                                        onClick={handleAnchorClick}
                                        style={{ textDecoration: 'none' }}
                                        aria-label="Scroll to Features section"
                                    >
                                        <Button
                                            variant="ghost"
                                            color="brand.turtoise"
                                            size="lg"
                                        >
                                            Features
                                        </Button>
                                    </a>
                                    <Link
                                        href={{
                                            pathname: '/sign-up',
                                            query: {}
                                        }}
                                        style={{ textDecoration: 'none' }}
                                        aria-label="Go to Sign Up page"
                                    >
                                        <Button
                                            variant="ghost"
                                            color="brand.turtoise"
                                            size="lg"
                                        >
                                            Sign Up
                                        </Button>
                                    </Link>
                                    <Link
                                        href={{
                                            pathname: '/sign-in',
                                            query: {}
                                        }}
                                        style={{ textDecoration: 'none' }}
                                        aria-label="Go to Login page"
                                    >
                                        <Button
                                            variant="ghost"
                                            color="brand.turtoise"
                                            size="lg"
                                        >
                                            Login
                                        </Button>
                                    </Link>
                                </div>
                            </HStack>
                        </nav>

                        {/* Content Section */}
                        <div className="content">
                            <div className="card" id="about" tabIndex={-1}>
                                <h1>What is Kollec?</h1>
                                <p>
                                    Kollec is a secure and centralized Pokémon
                                    card collection platform built for
                                    collectors by collectors!
                                </p>
                                <p>
                                    Users can easily setup an account, create a
                                    profile, and start cataloguing their
                                    collection. Kollec allows for users to
                                    quickly and easily digitize their expansive
                                    Pokémon card collection using their
                                    device&apos;s camera to identify cards in
                                    real time.
                                </p>
                                <p>
                                    Beyond organization, Kollec actively
                                    facilitates community engagement by
                                    intelligently matching users who possess
                                    viable, mutually beneficial trades.
                                </p>
                                <p>
                                    Kollec is made for the community by the
                                    community, and thus the application code is
                                    fully open source and available for anyone
                                    to view and contribute to on{' '}
                                    <a
                                        href="https://github.com/collectiblescapstone/Kollec-App"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            textDecoration: 'none',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            marginLeft: '0px',
                                            verticalAlign: 'middle'
                                        }}
                                        aria-label="Open Kollec GitHub in new tab"
                                    >
                                        <Button
                                            variant="ghost"
                                            color="brand.turtoise"
                                            fontSize="15px"
                                            size="sm"
                                            px={0}
                                            py={0}
                                            height="auto"
                                            lineHeight="1"
                                            // style={{ verticalAlign: 'middle' }}
                                        >
                                            GitHub
                                        </Button>
                                    </a>
                                    . We welcome any and all contributions to
                                    help make Kollec even better!
                                </p>
                                <p>
                                    Do not worry, despite Kollec being open
                                    source, we have implemented robust security
                                    measures to protect user data and ensure a
                                    safe trading environment. We take privacy
                                    seriously and have designed our systems to
                                    safeguard your information while still
                                    providing a seamless and enjoyable
                                    experience.
                                </p>
                            </div>

                            <div className="card" id="features" tabIndex={-1}>
                                <h2>Features</h2>
                                <Tabs.Root
                                    defaultValue="Identification"
                                    variant="line"
                                >
                                    <Tabs.List>
                                        <Tabs.Trigger value="Identification">
                                            <LuScanEye />
                                            Identification
                                        </Tabs.Trigger>
                                        <Tabs.Trigger value="Search">
                                            <LuSearch />
                                            Search
                                        </Tabs.Trigger>
                                        <Tabs.Trigger value="Trading">
                                            <LuHandshake />
                                            Trading
                                        </Tabs.Trigger>
                                        <Tabs.Indicator />
                                    </Tabs.List>
                                    <Tabs.Content value="Identification">
                                        <Heading as="h3" mb={2}>
                                            Card Identification
                                        </Heading>
                                        <Text>
                                            Using advanced machine learning
                                            techniques, Kollec can rapidly
                                            identify collectibles in real time
                                            using just your phone&apos;s camera.
                                            No more manual entry or searching
                                            through endless lists!
                                        </Text>
                                        <Heading as="h4" mb={2}>
                                            The Technology
                                        </Heading>
                                        <Text>
                                            Kollec first uses a custom trained
                                            YOLO segmentation machine learning
                                            model to locate any cards in view of
                                            your device&apos;s camera. We then
                                            use perceptual hashing to match the
                                            found cards against our database of
                                            known cards. Once a match is found,
                                            it is shown to you so you can
                                            quickly add the card to your digital
                                            collection.
                                        </Text>
                                    </Tabs.Content>
                                    <Tabs.Content value="Search">
                                        <Heading as="h3" mb={2}>
                                            Card Search
                                        </Heading>
                                        <Text>
                                            Kollec allows you to search your
                                            Pokémon collection using natural
                                            language. Whether you remember the
                                            exact name of the card or just a
                                            description of the Pokémon, our
                                            intelligent search understands the
                                            visual context of your cards to
                                            bring you the right results
                                            instantly.
                                        </Text>
                                        <Heading as="h4" mb={2}>
                                            The Technology
                                        </Heading>
                                        <Text>
                                            We utilize a CLIP (Contrastive
                                            Language-Image Pre-training) model
                                            to generate mathematical embeddings
                                            for every card image, which are
                                            stored and loaded at startup. When
                                            you enter a query, a quantized
                                            version of the model runs locally on
                                            your device to turn your text into a
                                            vector and compare it against our
                                            database. By calculating the
                                            shortest distance between these
                                            embeddings, the app identifies and
                                            displays the most relevant cards.
                                        </Text>
                                    </Tabs.Content>
                                    <Tabs.Content value="Trading">
                                        <Heading as="h3" mb={2}>
                                            Trading Algorithm
                                        </Heading>
                                        <Text>
                                            Connect with local collectors to
                                            complete your set through our
                                            intelligent TradePost matching
                                            system. By syncing your location and
                                            wishlist, Kollec automatically pairs
                                            you with nearby trainers who have
                                            the specific cards you need and are
                                            looking for the ones you have.
                                        </Text>
                                        <Heading as="h4">
                                            The Technology
                                        </Heading>
                                        <Text>
                                            TradePost utilizes a location-based
                                            algorithm that converts user
                                            addresses into precise longitude and
                                            latitude coordinates to calculate
                                            real-time distances between
                                            collectors. The system filters the
                                            database for users with active
                                            &quot;forTrade&quot; flags and
                                            cross-references them against your
                                            specific WishlistEntry table to find
                                            mutual matches. By applying a
                                            customizable distance radius the
                                            algorithm ensures you only see
                                            relevant trade opportunities within
                                            a reachable proximity for safe,
                                            in-person exchanges.
                                        </Text>
                                    </Tabs.Content>
                                </Tabs.Root>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="footer">
                    <p>&copy; 2026 Kollec</p>
                </footer>
            </div>
        </>
    )
}

export default Landing
