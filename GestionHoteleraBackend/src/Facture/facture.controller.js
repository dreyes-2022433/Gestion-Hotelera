import Facture from './facture.model.js'

export const generateFacture = async ({
    user,
    hotel,
    description,
    serviceId,
    serviceType,
    event,
    room,
    totaladditionalServices,
    totalAmount,
    totalValue,
    paymentStatus
}) => {
    try {
        if (event) {
            console.log('event')
            const newFacture = new Facture({
                user,
                hotel,
                description,
                additionalServices: [{
                    serviceId,
                    serviceType
                }],
                event,
                totaladditionalServices,
                totalAmount,
                totalValue,
                paymentStatus
            })

            await newFacture.save()

            return newFacture
        }
        if (room) {
            const newFacture = new Facture({
                user,
                hotel,
                description,
                additionalServices: [{
                    serviceId,
                    serviceType
                }],
                room,
                totaladditionalServices,
                totalAmount,
                totalValue,
                paymentStatus
            })

            await newFacture.save()

            return newFacture
        }
    } catch (err) {
        console.error(err)
        throw err
    }
}
export const getFactureById = async (req, res) => {
    const { id } = req.params

    try {
        const facture = await Facture.findById(id).populate('user hotel event')

        if (!facture) {
            return res.status(404).send({
                success: false,
                message: 'Facture not found'
            })
        }

        return res.send({
            success: true,
            message: 'Facture found',
            facture
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({
            success: false,
            message: 'Error fetching facture',
            err
        })
    }
}

export const getAllFactures = async (req, res) => {
    try {
        const factures = await Facture.find().populate('user hotel event')

        return res.send({
            success: true,
            message: 'All factures fetched successfully',
            factures
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({
            success: false,
            message: 'Error fetching factures',
            err
        })
    }
}

export const updateFacture = async (req, res) => {
    const { id } = req.params
    const { user, hotel, event, totalAmount, paymentStatus } = req.body

    try {
        const facture = await Facture.findByIdAndUpdate(
            id,
            { user, hotel, event, totalAmount, paymentStatus },
            { new: true }
        ).populate('user hotel event')

        if (!facture) {
            return res.status(404).send({
                success: false,
                message: 'Facture not found'
            })
        }

        return res.send({
            success: true,
            message: 'Facture updated successfully',
            facture
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({
            success: false,
            message: 'Error updating facture',
            err
        })
    }
}

export const deleteFacture = async (req, res) => {
    const { id } = req.params

    try {
        const facture = await Facture.findByIdAndDelete(id)

        if (!facture) {
            return res.status(404).send({
                success: false,
                message: 'Facture not found'
            })
        }

        return res.send({
            success: true,
            message: 'Facture deleted successfully'
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({
            success: false,
            message: 'Error deleting facture',
            err
        })
    }
}

