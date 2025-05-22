import { Box, Heading, Button, Stack, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) return

    try {
      const user = JSON.parse(storedUser)
      if (user.role === 'ADMIN') {
        setIsAdmin(true)
      }
    } catch (err) {
      console.error('Usuario malformado en localStorage')
    }
  }, [])

  if (!isAdmin) {
    return (
      <Box textAlign="center" mt="4em">
        <Text fontSize="xl" color="red.500">Acceso denegado. No sos admin.</Text>
      </Box>
    )
  }

  return (
    <Box maxW="600px" mx="auto" mt="4em" p="2em" boxShadow="lg" borderRadius="lg" bg="white">
      <Heading size="lg" textAlign="center" mb="1.5em" color="teal.600">
        Opciones de Administrador
      </Heading>

      <Stack spacing={4}>
        <Button colorScheme="teal" onClick={() => navigate('/hotels')}>
          Gestionar Hoteles
        </Button>
        <Button colorScheme="blue" onClick={() => navigate('/users')}>
          Gestionar Usuarios
        </Button>
        <Button colorScheme="purple" onClick={() => navigate('/reservations')}>
          Ver Reservaciones
        </Button>
      </Stack>
    </Box>
  )
}
