import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Button,
  Text,
  Flex,
  chakra,
  Tooltip,
  useBreakpointValue
} from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const MotionTr = motion(chakra.tr)
const MotionBox = motion(chakra.div)

const backgroundImageUrl = 'https://static.hosteltur.com/app/public/uploads/img/articles/2020/07/27/L_111907_descarga.jpg'

export function ReservationsList() {
  const navigate = useNavigate()
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const limit = 10

  const fontSizeResponsive = useBreakpointValue({ base: 'sm', md: 'md' })

  useEffect(() => {
    fetchReservations()
  }, [page])

  const fetchReservations = async () => {
    setLoading(true)
    try {
      const response = await axios.get('http://localhost:3626/v1/reservations/', {
        params: { limit, skip: page * limit }
      })
      if (response.data.success) {
        setReservations(response.data.reservations)
      } else {
        setReservations([])
      }
    } catch {
      setReservations([])
    }
    setLoading(false)
  }

  const handlePrev = () => {
    if (page > 0) setPage(page - 1)
  }

  const handleNext = () => {
    if (reservations.length === limit) setPage(page + 1)
  }

  const handleGoBack = () => {
    navigate('/admin') 
  }

  return (
    <Box
      w="100vw"
      h="100vh"
      backgroundImage={`url(${backgroundImageUrl})`}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      px={{ base: '1rem', md: '2rem' }}
      py={{ base: '1rem', md: '2rem' }}
    >
      <MotionBox
        maxW={{ base: '90vw', md: '70em' }}
        w="full"
        p={{ base: '2em', md: '3em' }}
        mx="auto"
        borderRadius="xl"
        boxShadow="2xl"
        minH="75vh"
        bg="rgba(255, 255, 255, 0.15)"
        backdropFilter="blur(12px)"
        WebkitBackdropFilter="blur(12px)"
        border="1px solid rgba(255, 255, 255, 0.3)"
        color="white"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        overflow="hidden"
        marginTop="auto"
        marginBottom="auto"
      >
        <Flex justifyContent="flex-start" mb="1.5em">
          <Button colorScheme="blue" onClick={handleGoBack}>
            ← Volver a Opciones Admin
          </Button>
        </Flex>

        <Text
          fontSize={{ base: '2xl', md: '3xl' }}
          fontWeight="extrabold"
          mb="1.5em"
          textAlign="center"
          letterSpacing="wide"
          textShadow="0 1px 6px rgba(0,0,0,0.7)"
        >
          Lista de Reservaciones
        </Text>

        {loading ? (
          <Flex justifyContent="center" py="6em" w="100%">
            <Spinner size="xl" thickness="4px" speed="0.9s" color="white" />
          </Flex>
        ) : reservations.length === 0 ? (
          <Text
            fontStyle="italic"
            textAlign="center"
            color="whiteAlpha.700"
            fontSize={{ base: 'md', md: 'lg' }}
            userSelect="none"
            w="100%"
          >
            No se encontraron reservaciones
          </Text>
        ) : (
          <>
            <Box
              overflowX="auto"
              maxH="60vh"
              overflowY="auto"
              w="100%"
              boxShadow="lg"
              borderRadius="md"
              bg="rgba(255, 255, 255, 0.2)"
              mb="2em"
            >
              <Table variant="simple" size="sm" fontSize={fontSizeResponsive} color="white">
                <Thead bg="rgba(0,0,0,0.4)">
                  <Tr>
                    {['ID', 'Usuario', 'Hotel', 'Habitación', 'Fecha inicio', 'Fecha fin', 'Estado'].map((head) => (
                      <Th
                        key={head}
                        color="white"
                        textTransform="uppercase"
                        letterSpacing="wider"
                        fontSize="xs"
                        py="3"
                        userSelect="none"
                      >
                        {head}
                      </Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  <AnimatePresence>
                    {reservations.map((r) => (
                      <MotionTr
                        key={r._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        _hover={{ bg: 'rgba(255, 255, 255, 0.1)', cursor: 'pointer' }}
                      >
                        <Td fontWeight="semibold" maxW="90px" isTruncated color="white">
                          <Tooltip label={r._id} fontSize="sm" openDelay={300}>
                            {r._id.slice(-6).toUpperCase()}
                          </Tooltip>
                        </Td>
                        <Td maxW="150px" isTruncated color="white">
                          {r.user?.name || 'N/A'}
                        </Td>
                        <Td maxW="150px" isTruncated color="white">
                          {r.hotel?.name || 'N/A'}
                        </Td>
                        <Td maxW="100px" isTruncated color="white">
                          {r.room?.number || 'N/A'}
                        </Td>
                        <Td color="white">{new Date(r.startDate).toLocaleDateString()}</Td>
                        <Td color="white">{new Date(r.endDate).toLocaleDateString()}</Td>
                        <Td
                          fontWeight="bold"
                          color={
                            r.status?.toLowerCase() === 'confirmed'
                              ? 'green.300'
                              : r.status?.toLowerCase() === 'pending'
                              ? 'orange.300'
                              : 'red.300'
                          }
                          textTransform="capitalize"
                        >
                          {r.status || 'N/A'}
                        </Td>
                      </MotionTr>
                    ))}
                  </AnimatePresence>
                </Tbody>
              </Table>
            </Box>

            <Flex justifyContent="center" gap="1.5em">
              <Button
                onClick={handlePrev}
                isDisabled={page === 0}
                colorScheme="blue"
                size="md"
                borderRadius="full"
                boxShadow="md"
                _hover={{ transform: 'scale(1.05)' }}
                _disabled={{ opacity: 0.5, cursor: 'not-allowed' }}
                transition="all 0.3s ease"
              >
                ← Anterior
              </Button>

              <Text
                alignSelf="center"
                fontWeight="semibold"
                fontSize={{ base: 'md', md: 'lg' }}
                userSelect="none"
                color="white"
              >
                Página {page + 1}
              </Text>

              <Button
                onClick={handleNext}
                isDisabled={reservations.length < limit}
                colorScheme="blue"
                size="md"
                borderRadius="full"
                boxShadow="md"
                _hover={{ transform: 'scale(1.05)' }}
                _disabled={{ opacity: 0.5, cursor: 'not-allowed' }}
                transition="all 0.3s ease"
              >
                Siguiente →
              </Button>
            </Flex>
          </>
        )}
      </MotionBox>
    </Box>
  )
}
