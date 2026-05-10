'use client'

import Link from 'next/link'
import { Box, Flex, Text, Heading, Button, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { LuChevronDown } from 'react-icons/lu'
import { Logo } from '@/components/logo/Logo'

const CARD_W = 190
const CARD_H = Math.round(CARD_W * 1.4) // 5:7 trading-card ratio

const cardBase = {
    position: 'absolute' as const,
    width: `${CARD_W}px`,
    height: `${CARD_H}px`,
    borderRadius: '14px',
    border: '2px solid rgba(242,199,92,0.55)',
    overflow: 'hidden' as const,
    boxShadow: '0 24px 64px rgba(0,0,0,0.55)'
}

function CardFace({ dim = false }: { dim?: boolean }) {
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                background: dim
                    ? 'linear-gradient(145deg, #003040 0%, #001820 100%)'
                    : 'linear-gradient(145deg, #004D60 0%, #003040 60%, #001820 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
            }}
        >
            {/* Inner card frame */}
            <div
                style={{
                    width: '80%',
                    height: '62%',
                    border: `1.5px solid rgba(242,199,92,${dim ? 0.15 : 0.35})`,
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(0,0,0,0.2)'
                }}
            >
                {!dim && (
                    <div style={{ width: '38%', opacity: 0.65 }}>
                        <Logo
                            style={{
                                color: '#F2C75C',
                                width: '100%',
                                height: '100%'
                            }}
                        />
                    </div>
                )}
            </div>
            {/* Card name bar */}
            <div
                style={{
                    width: '80%',
                    height: '10px',
                    borderRadius: '4px',
                    background: `rgba(242,199,92,${dim ? 0.08 : 0.22})`
                }}
            />
            {/* Card type dots */}
            <div style={{ display: 'flex', gap: '6px' }}>
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: `rgba(242,199,92,${dim ? 0.08 : 0.3})`
                        }}
                    />
                ))}
            </div>
            {/* Foil shimmer */}
            {!dim && (
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background:
                            'linear-gradient(115deg, transparent 35%, rgba(242,199,92,0.07) 50%, transparent 65%)',
                        pointerEvents: 'none'
                    }}
                />
            )}
        </div>
    )
}

function CardStack() {
    return (
        // container sized to fit the stacked spread
        <div
            style={{
                position: 'relative',
                width: `${CARD_W + 50}px`,
                height: `${CARD_H + 40}px`
            }}
        >
            {/* Back card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
                style={{
                    ...cardBase,
                    top: 0,
                    left: 0,
                    transform: 'rotateZ(-11deg) translate(-18px, -14px)',
                    borderColor: 'rgba(242,199,92,0.2)',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.4)'
                }}
            >
                <CardFace dim />
            </motion.div>

            {/* Middle card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
                style={{
                    ...cardBase,
                    top: 0,
                    left: 0,
                    transform: 'rotateZ(-5deg) translate(-8px, -7px)',
                    borderColor: 'rgba(242,199,92,0.35)',
                    boxShadow: '0 18px 48px rgba(0,0,0,0.45)'
                }}
            >
                <CardFace dim />
            </motion.div>

            {/* Front card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
                style={{
                    ...cardBase,
                    top: 0,
                    left: 0,
                    transform: 'rotateZ(3deg)'
                }}
            >
                <CardFace />
            </motion.div>
        </div>
    )
}

export default function HeroSection() {
    const scrollTo = (id: string) => {
        document
            .getElementById(id)
            ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    return (
        <Box
            as="section"
            position="relative"
            minH="100vh"
            display="flex"
            alignItems="center"
            overflow="hidden"
            style={{
                background:
                    'radial-gradient(ellipse at 22% 55%, #004D60 0%, #003B49 42%, #001B23 100%)'
            }}
        >
            {/* Binder grid motif */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `
                        linear-gradient(rgba(242,199,92,0.025) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(242,199,92,0.025) 1px, transparent 1px)
                    `,
                    backgroundSize: '80px 112px',
                    pointerEvents: 'none'
                }}
            />

            {/* Ambient glow behind cards */}
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    right: '8%',
                    width: '480px',
                    height: '480px',
                    borderRadius: '50%',
                    background:
                        'radial-gradient(circle, rgba(242,199,92,0.09) 0%, transparent 70%)',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none'
                }}
            />

            <Flex
                maxW="1200px"
                mx="auto"
                px={{ base: '1.5rem', md: '2rem' }}
                w="100%"
                direction={{ base: 'column', md: 'row' }}
                align="center"
                justify="space-between"
                gap={{ base: 14, md: 8 }}
                pt={{ base: '6rem', md: '5rem' }}
                pb={{ base: '5rem', md: '3rem' }}
            >
                {/* Left: text */}
                <VStack
                    align={{ base: 'center', md: 'flex-start' }}
                    gap={6}
                    flex="1"
                    maxW={{ base: '100%', md: '560px' }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, ease: 'easeOut' }}
                        style={{ width: '100%' }}
                    >
                        {/* Badge */}
                        <div
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                backgroundColor: 'rgba(242,199,92,0.12)',
                                border: '1px solid rgba(242,199,92,0.3)',
                                borderRadius: '100px',
                                padding: '6px 16px',
                                marginBottom: '22px'
                            }}
                        >
                            <span
                                style={{
                                    fontSize: '12px',
                                    color: '#F2C75C',
                                    fontWeight: 600,
                                    letterSpacing: '0.09em',
                                    textTransform: 'uppercase'
                                }}
                            >
                                Pokémon Card Collecting, Reimagined
                            </span>
                        </div>

                        <Heading
                            as="h1"
                            fontSize={{
                                base: '2.8rem',
                                md: '3.8rem',
                                lg: '4.4rem'
                            }}
                            fontWeight="800"
                            lineHeight="1.08"
                            color="white"
                            letterSpacing="-0.025em"
                            mb={5}
                            textAlign={{ base: 'center', md: 'left' }}
                        >
                            Find, Organize,
                            <br />
                            Trade,{' '}
                            <Box as="span" color="brand.marigold">
                                Kollec
                            </Box>
                        </Heading>

                        <Text
                            fontSize={{ base: 'md', md: 'lg' }}
                            color="rgba(255,255,255,0.68)"
                            lineHeight="1.7"
                            maxW="460px"
                            textAlign={{ base: 'center', md: 'left' }}
                            mb={8}
                        >
                            The all-in-one platform for Pokémon card collectors.
                            Scan cards with your camera, find them by
                            description, and discover nearby traders
                            automatically. Manage your collection by set or by
                            pokemon, with advanced filters and per-card details.
                        </Text>

                        <Flex
                            gap={4}
                            direction={{ base: 'column', sm: 'row' }}
                            justify={{ base: 'center', md: 'flex-start' }}
                        >
                            <Link
                                href="/sign-up"
                                style={{ textDecoration: 'none' }}
                            >
                                <Button
                                    size="lg"
                                    bg="#F2C75C"
                                    color="#003B49"
                                    fontWeight="700"
                                    _hover={{ bg: '#f5d472' }}
                                    style={{
                                        padding: '0 2rem',
                                        fontSize: '1rem',
                                        borderRadius: '8px',
                                        height: '50px',
                                        boxShadow:
                                            '0 4px 24px rgba(242,199,92,0.3)'
                                    }}
                                >
                                    Start Collecting — Free
                                </Button>
                            </Link>
                            <Button
                                size="lg"
                                variant="outline"
                                color="white"
                                _hover={{ bg: 'rgba(255,255,255,0.08)' }}
                                style={{
                                    borderColor: 'rgba(255,255,255,0.28)',
                                    padding: '0 2rem',
                                    fontSize: '1rem',
                                    borderRadius: '8px',
                                    height: '50px'
                                }}
                                onClick={() => scrollTo('features')}
                            >
                                See How It Works
                            </Button>
                        </Flex>
                    </motion.div>
                </VStack>

                {/* Right: card stack */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '30px 40px',
                        flexShrink: 0
                    }}
                >
                    <CardStack />
                </motion.div>
            </Flex>

            {/* Scroll chevron */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.6 }}
                onClick={() => scrollTo('features')}
                style={{
                    position: 'absolute',
                    bottom: '2rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    cursor: 'pointer',
                    color: 'rgba(242,199,92,0.5)',
                    fontSize: '1.6rem'
                }}
            >
                <motion.div
                    animate={{ y: [0, 9, 0] }}
                    transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: 'easeInOut'
                    }}
                >
                    <LuChevronDown />
                </motion.div>
            </motion.div>
        </Box>
    )
}
