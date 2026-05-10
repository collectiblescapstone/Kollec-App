'use client'

import { useRef } from 'react'
import { Box, Flex, Text, Heading } from '@chakra-ui/react'
import { motion, useInView } from 'framer-motion'

const MOCKUP_IMAGES = [
    '/Images/home1.jpg',
    '/Images/home2.jpg',
    '/Images/home3.jpg'
]

function AppMockup({ index, side }: { index: number; side: 'left' | 'right' }) {
    const rotateY = side === 'left' ? '6deg' : '-6deg'

    return (
        <div
            style={{
                width: '220px',
                aspectRatio: '9/19',
                borderRadius: '30px',
                border: '2.5px solid rgba(242,199,92,0.35)',
                background: '#001820',
                boxShadow:
                    '0 32px 80px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.07)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transform: `perspective(900px) rotateY(${rotateY}) rotateX(2deg)`
            }}
        >
            {/* Status bar with dynamic island */}
            <div
                style={{
                    height: '28px',
                    flexShrink: 0,
                    background: 'rgba(0,0,0,0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <div
                    style={{
                        width: '72px',
                        height: '9px',
                        background: 'rgba(0,0,0,0.55)',
                        borderRadius: '5px'
                    }}
                />
            </div>

            {/* App screenshot — area sized to 9:16 so image fits without side cropping */}
            <div
                style={{
                    aspectRatio: '9/16',
                    width: '100%',
                    overflow: 'hidden'
                }}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={MOCKUP_IMAGES[index]}
                    alt=""
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                    }}
                />
            </div>

            {/* Bottom bar — fills remaining phone height, holds home indicator */}
            <div
                style={{
                    flex: 1,
                    background: 'rgba(0,0,0,0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <div
                    style={{
                        width: '60px',
                        height: '4px',
                        background: 'rgba(255,255,255,0.25)',
                        borderRadius: '2px'
                    }}
                />
            </div>
        </div>
    )
}

export interface FeatureSectionProps {
    id: string
    tagline: string
    title: string
    description: string
    techNote: string
    imageSide: 'left' | 'right'
    bgColor: string
    index: number
}

export default function FeatureSection({
    id,
    tagline,
    title,
    description,
    techNote,
    imageSide,
    bgColor,
    index
}: FeatureSectionProps) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, amount: 0.2 })

    const textSlide = imageSide === 'left' ? 40 : -40
    const imageSlide = imageSide === 'left' ? -40 : 40

    const textBlock = (
        <motion.div
            initial={{ opacity: 0, x: textSlide }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            style={{ maxWidth: '520px', width: '100%' }}
        >
            {/* Number + tagline */}
            <div
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '18px'
                }}
            >
                <span
                    style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        background: 'rgba(242,199,92,0.12)',
                        border: '1px solid rgba(242,199,92,0.38)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '13px',
                        fontWeight: 700,
                        color: '#F2C75C',
                        flexShrink: 0
                    }}
                >
                    {index + 1}
                </span>
                <span
                    style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase' as const,
                        color: '#F2C75C'
                    }}
                >
                    {tagline}
                </span>
            </div>

            <Heading
                as="h2"
                fontSize={{ base: '2rem', md: '2.6rem' }}
                fontWeight="800"
                color="white"
                lineHeight="1.15"
                letterSpacing="-0.02em"
                mb={5}
            >
                {title}
            </Heading>

            <Text
                fontSize={{ base: 'md', md: 'lg' }}
                color="rgba(255,255,255,0.72)"
                lineHeight="1.75"
                mb={7}
            >
                {description}
            </Text>

            {/* Tech note */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    padding: '14px 18px',
                    background: 'rgba(242,199,92,0.06)',
                    border: '1px solid rgba(242,199,92,0.16)',
                    borderRadius: '10px'
                }}
            >
                <span
                    style={{
                        fontSize: '16px',
                        flexShrink: 0,
                        marginTop: '2px'
                    }}
                >
                    ⚡
                </span>
                <Text
                    fontSize="sm"
                    color="rgba(255,255,255,0.55)"
                    lineHeight="1.6"
                >
                    {techNote}
                </Text>
            </div>
        </motion.div>
    )

    const imageBlock = (
        <motion.div
            initial={{ opacity: 0, x: imageSlide }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexShrink: 0,
                padding: '20px'
            }}
        >
            <AppMockup index={index} side={imageSide} />
        </motion.div>
    )

    return (
        <Box
            as="section"
            id={id}
            position="relative"
            minH="90vh"
            display="flex"
            alignItems="center"
            overflow="hidden"
            style={{ backgroundColor: bgColor }}
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
                        'linear-gradient(90deg, transparent, rgba(242,199,92,0.12), transparent)'
                }}
            />

            {/* Decorative background card shape */}
            <div
                style={{
                    position: 'absolute',
                    ...(imageSide === 'left'
                        ? { right: '-50px' }
                        : { left: '-50px' }),
                    top: '50%',
                    transform: 'translateY(-50%) rotateZ(18deg)',
                    width: '220px',
                    height: '308px',
                    borderRadius: '18px',
                    border: '2px solid rgba(242,199,92,0.05)',
                    pointerEvents: 'none'
                }}
            />

            <div ref={ref} style={{ width: '100%' }}>
                <Flex
                    maxW="1200px"
                    mx="auto"
                    px={{ base: '1.5rem', md: '2rem' }}
                    w="100%"
                    direction={{ base: 'column', md: 'row' }}
                    align="center"
                    justify="space-between"
                    gap={{ base: 10, md: 16 }}
                    py={{ base: '5rem', md: '4rem' }}
                >
                    {imageSide === 'left' ? (
                        <>
                            {imageBlock}
                            {textBlock}
                        </>
                    ) : (
                        <>
                            {textBlock}
                            {imageBlock}
                        </>
                    )}
                </Flex>
            </div>
        </Box>
    )
}
