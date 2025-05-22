import { useEffect, useState } from 'react'
import axios from 'axios'
import { 
  Box, Heading, SimpleGrid, Spinner, Center, Text, Tag, Stack, 
  Badge, Button, Modal, ModalOverlay, ModalContent, 
  ModalHeader, ModalCloseButton, ModalBody, useDisclosure 
} from '@chakra-ui/react'

export const HotelList = () => {
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedHotel, setSelectedHotel] = useState(null)
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

  const handleViewDetails = (hotel) => {
    setSelectedHotel(hotel)
    onOpen()
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
                
                {/* Botón Ver Detalles */}
                <Button 
                  colorScheme="teal" 
                  size="sm" 
                  onClick={() => handleViewDetails(hotel)}
                >
                  Ver Detalles
                </Button>
              </Stack>
            </Box>
          ))}
        </SimpleGrid>
      )}

      {/* Modal para mostrar detalles */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detalles del Hotel</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedHotel && (
              <Stack spacing={4}>
                <Heading size="md">{selectedHotel.name}</Heading>
                
                <Box>
                  <Text fontWeight="bold">Dirección:</Text>
                  <Text>{selectedHotel.direction}</Text>
                </Box>
                
                <Box>
                  <Text fontWeight="bold">Categoría:</Text>
                  <Badge colorScheme="purple">{selectedHotel.category}</Badge>
                </Box>
                
                <Box>
                  <Text fontWeight="bold">Descripción:</Text>
                  <Text>{selectedHotel.description}</Text>
                </Box>
                
                <Box>
                  <Text fontWeight="bold">Servicios:</Text>
                  <Box display="flex" flexWrap="wrap" gap="6px" mt={2}>
                    {Array.isArray(selectedHotel.amenities)
                      ? selectedHotel.amenities.split(',').map((item, idx) => (
                          <Tag key={idx} size="sm" colorScheme="blue">
                            {item.trim()}
                          </Tag>
                        ))
                      : (
                          <Tag size="sm" colorScheme="blue">
                            {selectedHotel.amenities}
                          </Tag>
                        )}
                  </Box>
                </Box>
                
                <Box>
                  <Text fontWeight="bold">Estado:</Text>
                  <Tag colorScheme={selectedHotel.status ? 'green' : 'red'}>
                    {selectedHotel.status ? 'Activo' : 'Inactivo'}
                  </Tag>
                </Box>
              </Stack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}