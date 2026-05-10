'use client'

import Link from 'next/link'
import { Box, Flex, Text, Button, HStack } from '@chakra-ui/react'
import { Logo } from '@/components/logo/Logo'

export default function LandingNav() {
    const scrollTo = (id: string) => {
        document
            .getElementById(id)
            ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    return (
        <Box
            as="nav"
            position="fixed"
            top={0}
            left={0}
            right={0}
            zIndex={50}
            style={{
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                backgroundColor: 'rgba(0,27,35,0.88)',
                borderBottom: '1px solid rgba(242,199,92,0.18)'
            }}
        >
            <Flex
                maxW="1200px"
                mx="auto"
                px={{ base: '1rem', md: '2rem' }}
                py={3}
                align="center"
                justify="space-between"
            >
                <HStack gap={2}>
                    <Box w="30px" h="30px">
                        <Logo
                            style={{
                                color: '#F2C75C',
                                width: '100%',
                                height: '100%'
                            }}
                        />
                    </Box>
                    <Text
                        fontWeight="700"
                        fontSize="lg"
                        color="brand.marigold"
                        letterSpacing="0.06em"
                    >
                        Kollec
                    </Text>
                </HStack>

                <HStack gap={{ base: 1, md: 2 }}>
                    <Button
                        variant="ghost"
                        size="sm"
                        color="white"
                        _hover={{ bg: 'rgba(255,255,255,0.08)' }}
                        onClick={() => scrollTo('features')}
                    >
                        Features
                    </Button>
                    <Link href="/sign-in" style={{ textDecoration: 'none' }}>
                        <Button
                            variant="ghost"
                            size="sm"
                            color="white"
                            _hover={{ bg: 'rgba(255,255,255,0.08)' }}
                        >
                            Sign In
                        </Button>
                    </Link>
                    <Link href="/sign-up" style={{ textDecoration: 'none' }}>
                        <Button
                            size="sm"
                            bg="#F2C75C"
                            color="#003B49"
                            fontWeight="700"
                            _hover={{ bg: '#f5d472' }}
                        >
                            Sign Up
                        </Button>
                    </Link>
                </HStack>
            </Flex>
        </Box>
    )
}
