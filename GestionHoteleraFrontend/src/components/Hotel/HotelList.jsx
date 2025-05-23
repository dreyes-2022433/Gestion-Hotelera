import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Box, Heading, SimpleGrid, Spinner, Center, Text, Tag, Stack,
  Badge, Button, Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalCloseButton, ModalBody, useDisclosure, Grid, GridItem,
  Image, Divider, Alert, AlertIcon,Flex
} from '@chakra-ui/react'

export const HotelList = () => {
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedHotel, setSelectedHotel] = useState(null)
  const [rooms, setRooms] = useState([])
  const [roomsLoading, setRoomsLoading] = useState(false)
  const [roomsError, setRoomsError] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await axios.get("http://localhost:3626/v1/hotel/getHotels")
        setHotels(res.data.hotels)
      } catch (error) {
        console.error("Error al cargar los hoteles:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchHotels()
  }, [])

  const handleViewDetails = async (hotel) => {
  setSelectedHotel(hotel)
  setRoomsLoading(true)
  setRoomsError(null)
  try {
    const res = await axios.get(`http://localhost:3626/api/rooms/${hotel._id}`)
    const roomsData = res.data.data || []    
    if (!Array.isArray(roomsData)) {
      throw new Error("Formato de datos inválido: se esperaba un array de habitaciones")
    } 
    setRooms(roomsData)
    } catch (error) {
      console.error("Error al cargar las habitaciones:", error)
      setRoomsError(error.message)
      setRooms([])
    } finally {
      setRoomsLoading(false)
      onOpen()
    }
  }

  return (
    <Box maxW="100%" p={8}>
      <Heading mb={6} size="lg" textAlign="center" color="teal.600">
        Lista de Hoteles
      </Heading>

      {loading ? (
        <Center>
          <Spinner size="xl" color="teal.500" />
        </Center>
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
  {hotels.map((hotel) => (
    <Box
      key={hotel._id}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
      boxShadow="md"
      _hover={{ boxShadow: 'lg', transform: 'scale(1.02)' }}
      transition="all 0.2s ease-in-out"
    >
      <Flex>
        {/* Imagen: 45% */}
        <Box flex="0 0 45%" display="flex" alignItems="center" justifyContent="center">
          <Image
            borderRadius="lg"
            boxSize="100%"
            maxH="180px"
            objectFit="cover"
            src={hotel.imageUrl}
            alt={hotel.name}
          />
        </Box>
        {/* Contenido: 55% */}
        <Box flex="1" pl={4}>
          <Stack spacing={3}>
            <Heading size="md" color="teal.700">
              {hotel.name}
            </Heading>
            <Text fontSize="sm" color="gray.500">
              {hotel.direction}
            </Text>
            <Badge colorScheme="purple" width="fit-content">
              {hotel.category}
            </Badge>
            <Text noOfLines={3}>{hotel.description}</Text>
            <Box>
              <Text fontSize="sm" fontWeight="bold" mb={1}>
                Servicios:
              </Text>
              <Box display="flex" flexWrap="wrap" gap="6px">
                {Array.isArray(hotel.amenities)
                  ? hotel.amenities.split(',').map((item, idx) => (
                      <Tag key={idx} size="sm" colorScheme="blue">
                        {item.trim()}
                      </Tag>
                    ))
                  : (
                      <Tag size="sm" colorScheme="blue">
                        {hotel.amenities}
                      </Tag>
                    )}
              </Box>
            </Box>
            <Box>
              <Tag colorScheme={hotel.status ? 'green' : 'red'}>
                {hotel.status ? 'Activo' : 'Inactivo'}
              </Tag>
            </Box>
            <Button 
              colorScheme="teal" 
              size="sm" 
              onClick={() => handleViewDetails(hotel)}
            >
              Ver Detalles
            </Button>
          </Stack>
        </Box>
      </Flex>
    </Box>
  ))}
</SimpleGrid>
      )}

      {/* Modal de detalles del hotel */}
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detalles del Hotel: {selectedHotel?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedHotel && (
              <Grid templateColumns="repeat(12, 1fr)" gap={6}>
                {/* Sección de detalles del hotel */}
                <GridItem colSpan={[12, 12, 5]}>
                  {/* Codigo de Detalles jeje */}
                </GridItem>

                {/* Sección de habitaciones */}
                <GridItem colSpan={[12, 12, 7]}>
                  <Box borderLeft={["none", "none", "1px solid #E2E8F0"]} pl={[0, 0, 6]}>
                    <Heading size="md" mb={4}>Habitaciones</Heading>
                    
                    {roomsError && (
                      <Alert status="error" mb={4}>
                        <AlertIcon />
                        {roomsError}
                      </Alert>
                    )}

                    {roomsLoading ? (
                      <Center>
                        <Spinner size="xl" color="teal.500" />
                      </Center>
                    ) : rooms.length === 0 ? (
                      <Text>No hay habitaciones registradas para este hotel</Text>
                    ) : (
                      <SimpleGrid columns={[1, 2]} spacing={4}>
                        {rooms.map((room) => (
                          <Box
                            key={room._id || room.number}
                            borderWidth="1px"
                            borderRadius="lg"
                            overflow="hidden"
                            p={4}
                            boxShadow="sm"
                            _hover={{
                              boxShadow: 'md',
                              transform: 'translateY(-2px)',
                              transition: 'all 0.2s'
                            }}
                          >
                            <Stack spacing={3}>
                              <Box display="flex" justifyContent="space-between">
                                <Heading size="sm">Habitación #{room.number}</Heading>
                                <Tag colorScheme={room.reserved ? 'red' : 'green'} size="sm">
                                  {room.reserved ? 'Reservada' : 'Disponible'}
                                </Tag>
                              </Box>

                              <Text fontSize="sm" color="gray.600">
                                {room.description || 'Sin descripción disponible'}
                              </Text>

                              <Divider />

                              <SimpleGrid columns={2} spacing={2}>
                                <Box>
                                  <Text fontSize="xs" color="gray.500">Capacidad</Text>
                                  <Text fontWeight="medium">{room.capacity} personas</Text>
                                </Box>
                                <Box>
                                  <Text fontSize="xs" color="gray.500">Categoría</Text>
                                  <Box display="flex" alignItems="center">
                                    <Text fontWeight="medium">{room.stars}</Text>
                                    <Text ml={1}>★</Text>
                                  </Box>
                                </Box>
                                <Box>
                                  <Text fontSize="xs" color="gray.500">Precio/noche</Text>
                                  <Text fontWeight="medium">Q{room.price}</Text>
                                </Box>
                                <Box>
                                  <Text fontSize="xs" color="gray.500">Tipo</Text>
                                  <Text fontWeight="medium">
                                    {room.capacity > 2 ? 'Familiar' : 'Individual/Doble'}
                                  </Text>
                                </Box>
                              </SimpleGrid>
                            </Stack>
                          </Box>
                        ))}
                      </SimpleGrid>
                    )}
                  </Box>
                </GridItem>
              </Grid>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}