import React, { useState, useEffect } from 'react'
import {
  Box,
  Input,
  Button,
  Text,
  Spinner,
  Heading,
  Flex,
  SimpleGrid,
  Divider,
  useColorModeValue,
  chakra,
  Textarea,
  useToast,
  Select,
  VStack,
  HStack
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useReservation } from '../../shared/hooks/useReservation'

const MotionBox = motion(chakra.div)

const reservationTypes = [
  { label: 'Habitación', value: 'Room' },
  { label: 'Hotel', value: 'Hotel' }
]

export function ReservationComponent() {
  const {
    reservations,
    loading,
    error,
    fetchMyReservations,
    createReservation,
    removeReservation
  } = useReservation()

  const [form, setForm] = useState({
    type: '',
    room: '',
    hotel: '',
    startDate: '',
    endDate: '',
    description: '',
    services: [{ name: '', description: '', price: '' }]
  })

  const toast = useToast()

  useEffect(() => {
    fetchMyReservations()
  }, [])

  const bgCard = useColorModeValue('white', 'gray.700')
  const borderCard = useColorModeValue('gray.200', 'gray.600')
  const scrollBg = useColorModeValue('gray.50', 'gray.900')
  const serviceCardBg = useColorModeValue('blue.50', 'blue.900')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleServiceChange = (index, e) => {
    const { name, value } = e.target
    const updatedServices = [...form.services]
    updatedServices[index][name] = value
    setForm(prev => ({ ...prev, services: updatedServices }))
  }

  const addService = () => {
    setForm(prev => ({
      ...prev,
      services: [...prev.services, { name: '', description: '', price: '' }]
    }))
  }

  const removeService = (index) => {
    const updatedServices = form.services.filter((_, i) => i !== index)
    setForm(prev => ({ ...prev, services: updatedServices }))
  }

  const handleSubmit = async () => {
    const cleanedServices = form.services.filter(s => s.name && s.description && s.price)
    const reservationData = {
      ...form,
      services: cleanedServices,
      room: form.type === 'Room' ? form.room : '',
      hotel: form.type === 'Hotel' ? form.hotel : ''
    }
    const response = await createReservation(reservationData)
    if (response) {
      toast({
        title: 'Reserva creada',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
      fetchMyReservations()
      setForm({
        type: '',
        room: '',
        hotel: '',
        startDate: '',
        endDate: '',
        description: '',
        services: [{ name: '', description: '', price: '' }]
      })
    } else {
      toast({
        title: 'Error creando reserva',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  }

  const handleDelete = async (id) => {
    const response = await removeReservation(id)
    if (response) {
      toast({
        title: 'Reserva eliminada',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
    } else {
      toast({
        title: 'Error eliminando reserva',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  }

  return (
    <Box
      maxW="72em"
      mx="auto"
      p={{ base: '2em', md: '3em' }}
      borderRadius="1em"
      bg={useColorModeValue('gray.50', 'gray.900')}
      boxShadow="xl"
      minH="85vh"
      display="flex"
      flexDirection="column"
      gap="2em"
    >
      <Heading
        textAlign="center"
        fontSize={{ base: '2.5em', md: '3.5em' }}
        fontWeight="extrabold"
        color="blue.600"
        letterSpacing="0.15em"
        mb="1em"
        textShadow="0 2px 5px rgba(0,0,0,0.1)"
      >
        Registro de Reservas
      </Heading>

      <Box
        bg={useColorModeValue('white', 'gray.800')}
        borderRadius="xl"
        p={{ base: '1.5em', md: '2.5em' }}
        boxShadow="md"
      >
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing="1.5em" mb="1.5em">
          <Select
            placeholder="Seleccione tipo de reserva"
            name="type"
            value={form.type}
            onChange={handleChange}
            size="lg"
            borderColor="blue.400"
          >
            {reservationTypes.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>

          {form.type === 'Room' && (
            <Input
              placeholder="ID de la habitación"
              name="room"
              value={form.room}
              onChange={handleChange}
              size="lg"
              borderColor="blue.400"
            />
          )}

          {form.type === 'Hotel' && (
            <Input
              placeholder="ID del hotel"
              name="hotel"
              value={form.hotel}
              onChange={handleChange}
              size="lg"
              borderColor="blue.400"
            />
          )}

          <Input
            type="date"
            placeholder="Fecha inicio"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            size="lg"
            borderColor="blue.400"
          />
          <Input
            type="date"
            placeholder="Fecha fin"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            size="lg"
            borderColor="blue.400"
          />
          <Textarea
            placeholder="Descripción"
            name="description"
            value={form.description}
            onChange={handleChange}
            resize="vertical"
            size="lg"
            borderColor="blue.400"
          />
        </SimpleGrid>

        <VStack spacing="1em" align="stretch" mb="1.5em">
          <Text fontWeight="bold" fontSize="lg" mb="0.5em">
            Agregar Servicio
          </Text>
          {form.services.map((service, i) => (
            <SimpleGrid key={i} columns={{ base: 1, md: 3 }} spacing="1em" alignItems="center">
              <Input
                placeholder="Nombre"
                name="name"
                value={service.name}
                onChange={(e) => handleServiceChange(i, e)}
                size="md"
                borderColor="blue.300"
              />
              <Input
                placeholder="Descripción"
                name="description"
                value={service.description}
                onChange={(e) => handleServiceChange(i, e)}
                size="md"
                borderColor="blue.300"
              />
              <Input
                placeholder="Precio"
                name="price"
                type="number"
                value={service.price}
                onChange={(e) => handleServiceChange(i, e)}
                size="md"
                borderColor="blue.300"
              />
              <Button
                colorScheme="red"
                size="sm"
                onClick={() => removeService(i)}
                borderRadius="md"
                ml="0.5em"
              >
                Eliminar
              </Button>
            </SimpleGrid>
          ))}
          <Button
            colorScheme="blue"
            size="sm"
            onClick={addService}
            alignSelf="flex-start"
            width={{ base: 'full', md: 'auto' }}
          >
            + Agregar Servicio
          </Button>
        </VStack>

        <Flex justifyContent="center" mt="2em">
          <Button
            onClick={handleSubmit}
            isLoading={loading}
            colorScheme="blue"
            size="lg"
            borderRadius="2em"
            px="3em"
            py="1.2em"
            fontWeight="extrabold"
            fontSize="1.2em"
            _hover={{ transform: 'scale(1.07)', boxShadow: 'xl' }}
            boxShadow="md"
          >
            Crear Reserva
          </Button>
        </Flex>
      </Box>

      <Divider borderColor="blue.300" />

      <VStack spacing="1.5em" align="stretch">
        <Text fontWeight="bold" fontSize="xl" mb="0.5em" textAlign="center" color={useColorModeValue('blue.600', 'blue.300')}>
          Servicios Agregados
        </Text>

        {form.services.length === 0 ? (
          <Text color="gray.500" fontStyle="italic" textAlign="center">
            No hay servicios agregados aún
          </Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing="1.5em">
            {form.services.map((service, i) => (
              <Box
                key={i}
                bg={useColorModeValue('blue.50', 'blue.900')}
                p="1.2em"
                borderRadius="md"
                boxShadow="md"
                position="relative"
              >
                <Text fontWeight="bold" fontSize="md" mb="0.25em" color={useColorModeValue('blue.700', 'blue.200')}>
                  {service.name || '(Sin nombre)'}
                </Text>
                <Text fontSize="sm" mb="0.5em" color={useColorModeValue('gray.700', 'gray.300')}>
                  {service.description || '(Sin descripción)'}
                </Text>
                <Text fontSize="sm" fontWeight="semibold" color="blue.600">
                  Precio: Q{service.price || '0.00'}
                </Text>
                <Button
                  size="sm"
                  colorScheme="red"
                  position="absolute"
                  top="8px"
                  right="8px"
                  onClick={() => removeService(i)}
                  borderRadius="full"
                  aria-label={`Eliminar servicio ${service.name}`}
                >
                  ✕
                </Button>
              </Box>
            ))}
          </SimpleGrid>
        )}
      </VStack>

      <Heading
        size="lg"
        mb="1em"
        color="blue.600"
        fontWeight="semibold"
        textAlign="center"
        fontSize={{ base: '1.8em', md: '2.5em' }}
      >
        Mis Reservas
      </Heading>

      {loading ? (
        <Flex justifyContent="center" py="4em">
          <Spinner size="xl" thickness="5px" speed="0.75s" color="blue.500" />
        </Flex>
      ) : error ? (
        <Text
          color="red.600"
          fontWeight="bold"
          textAlign="center"
          fontSize="1.2em"
          px="1em"
          bg="red.100"
          borderRadius="md"
          py="1em"
          userSelect="none"
        >
          {typeof error === 'string' ? error : 'Error cargando reservas'}
        </Text>
      ) : reservations.length === 0 ? (
        <Text
          color="gray.600"
          fontStyle="italic"
          textAlign="center"
          fontSize="1.3em"
          px="1em"
          py="2em"
        >
          No hay reservas registradas
        </Text>
      ) : (
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3 }}
          spacing="2em"
          minChildWidth="18em"
          px={{ base: '0.5em', md: '2em' }}
        >
          {reservations.map(
            ({ _id, type, room, hotel, startDate, endDate, description }) => (
              <MotionBox
                key={_id}
                bg={bgCard}
                border={`1.5px solid ${borderCard}`}
                borderRadius="1.2em"
                p="1.8em"
                boxShadow="xl"
                whileHover={{
                  scale: 1.06,
                  boxShadow: '0 16px 40px rgba(0, 64, 128, 0.4)'
                }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              >
                <Text
                  fontWeight="extrabold"
                  fontSize="1.5em"
                  mb="0.5em"
                  color="blue.700"
                  noOfLines={1}
                >
                  {type}
                </Text>
                {room && (
                  <Text fontSize="md" color="gray.700" noOfLines={1} mb="0.25em">
                    Habitación: {room.number || room}
                  </Text>
                )}
                {hotel && (
                  <Text fontSize="md" color="gray.700" noOfLines={1} mb="0.25em">
                    Hotel: {hotel.name || hotel}
                  </Text>
                )}
                <Text fontSize="md" color="gray.700" noOfLines={1} mb="0.25em">
                  Inicio: {new Date(startDate).toLocaleDateString()}
                </Text>
                <Text fontSize="md" color="gray.700" noOfLines={1} mb="0.25em">
                  Fin: {new Date(endDate).toLocaleDateString()}
                </Text>
                <Text fontSize="md" color="gray.600" noOfLines={3} mb="0.75em" whiteSpace="pre-wrap">
                  {description}
                </Text>
                <Button
                  colorScheme="red"
                  size="md"
                  onClick={() => handleDelete(_id)}
                  fontWeight="semibold"
                  borderRadius="md"
                  w="full"
                  _hover={{ bg: 'red.600' }}
                >
                  Eliminar Reserva
                </Button>
              </MotionBox>
            )
          )}
        </SimpleGrid>
      )}
    </Box>
  )
}
