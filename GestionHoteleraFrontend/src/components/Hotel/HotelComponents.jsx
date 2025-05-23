import React from 'react'
import {
  Box,
  Input,
  Button,
  Stack,
  Text,
  Spinner,
  Heading,
  Flex,
  SimpleGrid,
  Divider,
  useColorModeValue,
  chakra,
  Textarea,
  Image
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useHotel } from '../../shared/hooks/useHotel'
import { HotelImage } from './HotelImage'
import { useNavigate } from 'react-router-dom' 

const MotionBox = motion(chakra.div)

export function HotelComponent() {
  const { hotels, form, loading, handleChange, addHotel, removeHotel } = useHotel()
  const bgCard = useColorModeValue('white', 'gray.700')
  const borderCard = useColorModeValue('gray.200', 'gray.600')
  const scrollBg = useColorModeValue('gray.50', 'gray.900')

  const navigate = useNavigate() 

  const handleBackToAdmin = () => {
    navigate('/admin') 
  }

  return (
    <Box
      maxW="70em"
      mx="auto"
      p={{ base: '1.5em', md: '2em' }}
      borderRadius="1em"
      bg={useColorModeValue('gray.50', 'gray.800')}
      boxShadow="lg"
      minH="80vh"
      display="flex"
      flexDirection="column"
    >
      <Flex mb="1.5em">
        <Button
          onClick={handleBackToAdmin}
          colorScheme="teal"
          size="md"
          borderRadius="2em"
          fontWeight="semibold"
        >
          ← Volver a opciones admin
        </Button>
      </Flex>

      <Heading
        textAlign="center"
        mb="1.5em"
        fontSize={{ base: '2em', md: '3em' }}
        fontWeight="extrabold"
        color="blue.500"
        letterSpacing="0.1em"
      >
        Registro de Hoteles
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing="1em" mb="2.5em">
        <Input placeholder="Nombre" name="name" value={form.name} onChange={handleChange} />
        <Input placeholder="Dirección" name="direction" value={form.direction} onChange={handleChange} />
        <Input placeholder="Categoría" name="category" value={form.category} onChange={handleChange} />
        <Input placeholder="Teléfono" name="phone" value={form.phone} onChange={handleChange} />
        <Input placeholder="Email" name="email" value={form.email} onChange={handleChange} />
        <Input placeholder="Servicios (amenities)" name="amenities" value={form.amenities} onChange={handleChange} />
        <Textarea placeholder="Descripción" name="description" value={form.description} onChange={handleChange} resize="vertical" />
        <Image
  borderRadius='full'
  boxSize='150px'
  src={form.imageUrl}
  alt='Dan Abramov'
/>
      </SimpleGrid>

      <Flex justifyContent="center" mb="2em">
        <Button
          onClick={addHotel}
          isLoading={loading}
          colorScheme="blue"
          size="lg"
          borderRadius="2em"
          px="2.2em"
          py="1em"
          fontWeight="bold"
          fontSize="1.1em"
          _hover={{ transform: 'scale(1.05)', boxShadow: 'xl' }}
        >
          Agregar Hotel
        </Button>
      </Flex>

      <Divider mb="1.5em" borderColor="blue.300" />

      <Heading
        size="lg"
        mb="1.5em"
        color="blue.600"
        fontWeight="semibold"
        textAlign="center"
        fontSize={{ base: '1.6em', md: '2em' }}
      >
        Lista de Hoteles
      </Heading>

      {loading ? (
        <Flex justifyContent="center" py="3em">
          <Spinner size="xl" thickness="4px" speed="0.8s" color="blue.400" />
        </Flex>
      ) : hotels.length === 0 ? (
        <Text color="gray.500" fontStyle="italic" textAlign="center" fontSize="1.2em">
          No hay hoteles registrados
        </Text>
      ) : (
        <Box
          flex="1"
          overflowY="auto"
          maxH="60vh"
          pr="0.5em"
          bg={scrollBg}
          borderRadius="0.8em"
          boxShadow="inner"
          px="1.5em"
          py="2em"
        >
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing="1.5em" minChildWidth="14em">
            {hotels
            .filter(hotel => hotel && hotel._id)
            .map(({ _id, name, direction, category, phone, email }) => (
              <MotionBox
                key={_id}
                bg={bgCard}
                border={`0.1em solid ${borderCard}`}
                borderRadius="1em"
                p="1.5em"
                boxShadow="md"
                whileHover={{
                  scale: 1.03,
                  boxShadow: '0 12px 25px rgba(0, 64, 128, 0.35)',
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <Text fontWeight="bold" fontSize="1.4em" mb="0.5em" color="blue.700" noOfLines={1}>
                  {name}
                </Text>
                <Text fontSize="1em" color="gray.600" noOfLines={1}>
                  Dirección: {direction}
                </Text>
                <Text fontSize="1em" color="gray.600" noOfLines={1}>
                  Categoría: {category}
                </Text>
                <Text fontSize="1em" color="gray.500" noOfLines={1}>
                  Tel: {phone}
                </Text>
                <Text fontSize="1em" color="gray.500" noOfLines={1}>
                  Email: {email}
                </Text>
                <HotelImage hotelId={_id} />
                <Button
                  mt="1em"
                  colorScheme="red"
                  size="sm"
                  onClick={() => removeHotel(_id)}
                  fontWeight="bold"
                  borderRadius="md"
                >
                  Eliminar
                </Button>
              </MotionBox>
            ))}
          </SimpleGrid>
        </Box>
      )}
    </Box>
  )
}
