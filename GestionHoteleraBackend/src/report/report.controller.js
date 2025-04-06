import Report from './report.model.js'

export const registerReport = async (req, res) => {
  try {
    let data = req.body
    let report = new Report(data)
    await report.save()
    return res.send({
      message: `Registered successfully, the added Report is: ${report.title}`
    })
  } catch (err) {
    console.error(err)
    return res.status(500).send({
      message: 'General Error with registering Report',
      err
    })
  }
}

export const getAllReports = async (req, res) => {
  const { limit, skip } = req.query
  try {
    const reports = await Report.find()
      .skip(skip)
      .limit(limit)
      .populate('generatedBy', 'name email')
    if (reports.length === 0) {
      return res.send({
        success: false,
        message: 'Reports not found'
      })
    }
    return res.send({
      success: true,
      message: 'Reports found',
      total: reports.length,
      reports
    })
  } catch (err) {
    console.error(err)
    return res.status(500).send({
      success: false,
      message: 'General Error',
      err
    })
  }
}

export const getOneReport = async (req, res) => {
  try {
    const { id } = req.params
    const report = await Report.findById(id).populate('generatedBy', 'name email')
    if (!report) return res.status(404).send({
      success: false,
      message: 'Report not found'
    })
    return res.send({
      success: true,
      message: 'Report found',
      report
    })
  } catch (err) {
    console.error(err)
    return res.status(500).send({
      success: false,
      message: 'General error',
      err
    })
  }
}

export const updateReport = async (req, res) => {
  const { id } = req.params
  const { ...data } = req.body
  try {
    const updatedReport = await Report.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    )
    if (!updatedReport) {
      return res.status(404).send({
        success: false,
        message: 'Report not found, not updated'
      })
    }
    return res.send({
      success: true,
      message: 'Report updated successfully',
      updatedReport
    })
  } catch (err) {
    console.error(err)
    return res.status(500).send({
      success: false,
      message: 'General Error when updating Report',
      err
    })
  }
}

export const deleteReport = async (req, res) => {
  try {
    const { id } = req.params
    const report = await Report.findById(id)
    if (!report) return res.status(404).send({
      success: false,
      message: 'Report not found'
    })
    await report.save()
    await Report.findByIdAndDelete(id)
    return res.send({
      success: true,
      message: 'Report deleted successfully'
    })
  } catch (err) {
    console.error(err)
    return res.status(500).send({
      success: false,
      message: 'General Error',
      err
    })
  }
}
