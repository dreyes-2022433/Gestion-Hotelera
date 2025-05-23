import { useState } from "react"
import axios from "axios"
import { Button, Input,FormLabel, FormControl } from '@chakra-ui/react'

export const HotelImage = ({ hotelId }) => {
    const [image, setImage] = useState(null)
    console.log(hotelId)
    const [success, setSuccess] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("id", hotelId)
        formData.append("image", image)
        try{
        const response = await axios.post("http://localhost:3626/v1/hotel/upload", formData )
        setSuccess(true)
    }catch (error) {
        console.error('Error uploading image:', error)
        alert("Error uploading image")
    }

    }
return (
    <div>
        <form onSubmit={handleSubmit}>
            <Input htmlSize={4} width='auto' type="file" onChange={(e) => setImage(e.target.files[0])} />
            <Button colorScheme="blue" type="submit">Upload</Button>
        </form>
        {success && <div style={{color: "green"}}>Image uploaded successfully</div>}
    </div>
)


}
