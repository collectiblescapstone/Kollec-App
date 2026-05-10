'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { Box, Flex, Text, Heading, Button } from '@chakra-ui/react'
import { motion, useInView } from 'framer-motion'

// Decorative card outlines scattered in the background
const BACKGROUND_CARDS = [
    { rotate: -22, x: -240, y: -110, opacity: 0.07 },
    { rotate: 14, x: 220, y: -90, opacity: 0.07 },
    { rotate: -8, x: -210, y: 110, opacity: 0.055 },
    { rotate: 28, x: 180, y: 130, opacity: 0.055 },
    { rotate: -16, x: 60, y: -160, opacity: 0.04 },
    { rotate: 6, x: -60, y: 180, opacity: 0.04 }
]

export default function CtaSection() {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, amount: 0.3 })

    return (
        <Box
            as="section"
            id="cta"
            position="relative"
            minH="80vh"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            overflow="hidden"
            style={{
                background: 'linear-gradient(160deg, #003B49 0%, #001B23 100%)'
            }}
        >
            {/* Top rule */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '1px',
                    background:
                        'linear-gradient(90deg, transparent, rgba(242,199,92,0.2), transparent)'
                }}
            />

            {/* Background card outlines */}
            {BACKGROUND_CARDS.map((card, i) => (
                <div
                    key={i}
                    style={{
                        position: 'absolute',
                        width: '160px',
                        height: '224px',
                        borderRadius: '14px',
                        border: `2px solid rgba(242,199,92,${card.opacity})`,
                        left: '50%',
                        top: '50%',
                        transform: `translate(calc(-50% + ${card.x}px), calc(-50% + ${card.y}px)) rotateZ(${card.rotate}deg)`,
                        pointerEvents: 'none'
                    }}
                />
            ))}

            {/* CTA content */}
            <div
                ref={ref}
                style={{
                    textAlign: 'center',
                    padding: '0 1.5rem',
                    maxWidth: '600px',
                    zIndex: 1
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                    <div
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            backgroundColor: 'rgba(242,199,92,0.1)',
                            border: '1px solid rgba(242,199,92,0.25)',
                            borderRadius: '100px',
                            padding: '6px 18px',
                            marginBottom: '26px'
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
                            Free to Join
                        </span>
                    </div>

                    <Heading
                        as="h2"
                        fontSize={{ base: '2.4rem', md: '3.4rem' }}
                        fontWeight="800"
                        color="white"
                        lineHeight="1.1"
                        letterSpacing="-0.025em"
                        mb={5}
                    >
                        Ready to{' '}
                        <Box as="span" color="brand.marigold">
                            Kollec
                        </Box>
                        ?
                    </Heading>

                    <Text
                        fontSize={{ base: 'md', md: 'lg' }}
                        color="rgba(255,255,255,0.6)"
                        lineHeight="1.75"
                        mb={10}
                    >
                        Join collectors who are already scanning, searching, and
                        trading smarter. No subscription, no hidden fees.
                    </Text>

                    <Flex
                        gap={4}
                        justify="center"
                        direction={{ base: 'column', sm: 'row' }}
                        align="center"
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
                                    padding: '0 2.5rem',
                                    fontSize: '1rem',
                                    borderRadius: '8px',
                                    height: '52px',
                                    boxShadow:
                                        '0 4px 28px rgba(242,199,92,0.28)'
                                }}
                            >
                                Create Account
                            </Button>
                        </Link>
                        <Link
                            href="/sign-in"
                            style={{ textDecoration: 'none' }}
                        >
                            <Button
                                size="lg"
                                variant="outline"
                                color="white"
                                _hover={{ bg: 'rgba(255,255,255,0.08)' }}
                                style={{
                                    borderColor: 'rgba(255,255,255,0.22)',
                                    padding: '0 2.5rem',
                                    fontSize: '1rem',
                                    borderRadius: '8px',
                                    height: '52px'
                                }}
                            >
                                Sign In
                            </Button>
                        </Link>
                    </Flex>
                </motion.div>
            </div>

            {/* Footer */}
            <Box
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                py={6}
                px={8}
            >
                <Flex
                    maxW="1200px"
                    mx="auto"
                    justify="space-between"
                    align="center"
                    direction={{ base: 'column', md: 'row' }}
                    gap={2}
                >
                    <Text fontSize="sm" color="rgba(255,255,255,0.3)">
                        © 2026 Kollec
                    </Text>
                    <a
                        href="https://github.com/collectiblescapstone/Kollec-App"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none' }}
                    >
                        <Text fontSize="sm" color="rgba(255,255,255,0.35)">
                            GitHub
                        </Text>
                    </a>
                </Flex>
            </Box>
        </Box>
    )
}
