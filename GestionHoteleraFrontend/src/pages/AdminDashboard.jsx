import {
  Box,
  Heading,
  Button,
  Grid,
  Flex,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)
const MotionButton = motion(Button)

const cardColors = [
  { bg: 'purple.200', hoverBg: 'purple.300', color: 'purple.800' },
  { bg: 'teal.200', hoverBg: 'teal.300', color: 'teal.800' },
  { bg: 'pink.200', hoverBg: 'pink.300', color: 'pink.800' },
]

export const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) return

    try {
      const user = JSON.parse(storedUser)
      if (user.role && user.role.toLowerCase() === 'admin') {
        setIsAdmin(true)
      }
    } catch (err) {
      console.error('Usuario malformado en localStorage')
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  if (!isAdmin) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Text fontSize="xl" color="red.500">
          Acceso denegado. No sos admin.
        </Text>
      </Flex>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.15 },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 120 } },
    hover: { scale: 1.05, boxShadow: '0 8px 15px rgba(0,0,0,0.1)' },
  }

  const cards = [
    {
      label: 'Gestionar Hoteles',
      onClick: () => navigate('/hotels'),
    },
    {
      label: 'Gestionar Usuarios',
      onClick: () => navigate('/users'),
    },
    {
      label: 'Ver Reservaciones',
      onClick: () => navigate('/reservations'),
    },
  ]

  return (
    <Box
      position="relative"
      height="100vh"
      width="100vw"
      backgroundImage="url('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/fbc52262225969.5a89af053bacd.gif')"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      sx={{
        imageRendering: 'auto',
        WebkitFontSmoothing: 'antialiased',
      }}
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        height="100%"
        width="100%"
        bg="blackAlpha.600"
        zIndex={0}
      />

      <Flex
        position="relative"
        zIndex={1}
        justifyContent="center"
        alignItems="center"
        height="100%"
        p={4}
      >
        <Box
          maxW="900px"
          w="full"
          p="6"
          bg="whiteAlpha.300" 
          borderRadius="lg"
          boxShadow="2xl"
          backdropFilter="blur(10px)"
        >
          <Flex justifyContent="space-between" alignItems="center" mb="8">
            <Heading color={useColorModeValue('purple.700', 'purple.300')}>
              Opciones de Administrador
            </Heading>
            <MotionButton
              colorScheme="red"
              onClick={handleLogout}
              whileHover={{ scale: 1.1, boxShadow: 'xl' }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Cerrar sesión
            </MotionButton>
          </Flex>

          <MotionBox
            display="grid"
            gridTemplateColumns={{
              base: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            }}
            gridAutoRows="180px"
            gap={8}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {cards.map(({ label, onClick }, i) => (
              <MotionBox
                key={label}
                bg={cardColors[i].bg}
                color={cardColors[i].color}
                borderRadius="3xl"
                boxShadow="md"
                display="flex"
                justifyContent="center"
                alignItems="center"
                cursor="pointer"
                userSelect="none"
                fontSize="xl"
                fontWeight="bold"
                textAlign="center"
                p={6}
                variants={cardVariants}
                whileHover="hover"
                onClick={onClick}
                _hover={{ bg: cardColors[i].hoverBg }}
                transition="background-color 0.3s ease"
                style={{ perspective: 1000 }}
              >
                {label}
              </MotionBox>
            ))}
          </MotionBox>
        </Box>
      </Flex>
    </Box>
  )
}