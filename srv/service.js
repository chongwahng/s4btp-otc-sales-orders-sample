module.exports = async function (srv) {
    const cds = require('@sap/cds')
    const onPremSrv = await cds.connect.to('YCNG_A_ForecastSchRefreshItems')

    this.on('RefreshForecastItems', async (req) => {
        let salesOrderIDValues = null
        let salesOrderIDRanges = null
        let whereSalesOrderID = null

        let salesDocumentTypeValues = null
        let salesDocumentTypeRanges = null
        let whereSalesDocumentType = null

        let salesOrganizationValues = null
        let salesOrganizationRanges = null
        let whereSalesOrganization = null

        let whereCondition = null

        try {
            if (req.data.SalesOrderID != null) {
                // ==> SalesOrderID Values
                if (Array.isArray(req.data.SalesOrderID.Values)) {
                    var row = 0
                    salesOrderIDValues = ''
                    for (let i of req.data.SalesOrderID.Values.entries()) {
                        row += 1
                        salesOrderIDValues =
                            row === req.data.SalesOrderID.Values.length ?
                                `${salesOrderIDValues} SalesOrderID = '${i[1].Low}'` :
                                `${salesOrderIDValues} SalesOrderID = '${i[1].Low}' or`
                    }
                    whereSalesOrderID = whereSalesOrderID ? `${whereSalesOrderID} or ${salesOrderIDValues}` : salesOrderIDValues
                }

                // ==> SalesOrderID Ranges
                if (Array.isArray(req.data.SalesOrderID.Ranges)) {
                    var row = 0
                    salesOrderIDRanges = ''
                    for (let i of req.data.SalesOrderID.Ranges.entries()) {
                        row += 1
                        salesOrderIDRanges =
                            row === req.data.SalesOrderID.Ranges.length ?
                                `${salesOrderIDRanges} ( SalesOrderID >= '${i[1].Low}' and SalesOrderID <= '${i[1].High}' )` :
                                `${salesOrderIDRanges} ( SalesOrderID >= '${i[1].Low}' and SalesOrderID <= '${i[1].High}' ) or`
                    }
                    whereSalesOrderID = whereSalesOrderID ? `${whereSalesOrderID} or ${salesOrderIDRanges}` : salesOrderIDRanges
                }
            }

            if (req.data.SalesDocumentType != null) {
                // ==> SalesDocumentType Values
                if (Array.isArray(req.data.SalesDocumentType.Values)) {
                    var row = 0
                    salesDocumentTypeValues = ''
                    for (let i of req.data.SalesDocumentType.Values.entries()) {
                        row += 1
                        salesDocumentTypeValues =
                            row === req.data.SalesDocumentType.Values.length ?
                                `${salesDocumentTypeValues} SalesDocumentType = '${i[1].Low}'` :
                                `${salesDocumentTypeValues} SalesDocumentType = '${i[1].Low}' or`
                    }
                    whereSalesDocumentType = whereSalesDocumentType ? `${whereSalesDocumentType} or ${salesDocumentTypeValues}` : salesDocumentTypeValues
                }

                // ==> SalesDocumentType Ranges 
                if (Array.isArray(req.data.SalesDocumentType.Ranges)) {
                    var row = 0
                    salesDocumentTypeRanges = ''
                    for (let i of req.data.SalesDocumentType.Ranges.entries()) {
                        row += 1
                        salesDocumentTypeRanges =
                            row === req.data.SalesDocumentType.Ranges.length ?
                                `${salesDocumentTypeRanges} ( SalesDocumentType >= '${i[1].Low}' and SalesDocumentType <= '${i[1].High}' )` :
                                `${salesDocumentTypeRanges} ( SalesDocumentType >= '${i[1].Low}' and SalesDocumentType <= '${i[1].High}' ) or`
                    }
                    whereSalesDocumentType = whereSalesDocumentType ? `${whereSalesDocumentType} or ${salesDocumentTypeRanges}` : salesDocumentTypeRanges
                }
            }

            if (req.data.SalesOrganization != null) {
                // ==> SalesOrganization Values 
                if (Array.isArray(req.data.SalesOrganization.Values)) {
                    var row = 0
                    salesOrganizationValues = ''
                    for (let i of req.data.SalesOrganization.Values.entries()) {
                        row += 1
                        salesOrganizationValues =
                            row === req.data.SalesOrganization.Values.length ?
                                `${salesOrganizationValues} SalesOrganization = '${i[1].Low}'` :
                                `${salesOrganizationValues} SalesOrganization = '${i[1].Low}' or`
                    }
                    whereSalesOrganization = whereSalesOrganization ? `${whereSalesOrganization} or ${salesOrganizationValues}` : salesOrganizationValues
                }
                // ==> SalesOrganization Ranges 
                if (Array.isArray(req.data.SalesOrganization.Ranges)) {
                    var row = 0
                    salesOrganizationRanges = ''
                    for (let i of req.data.SalesOrganization.Ranges.entries()) {
                        row += 1
                        salesOrganizationRanges =
                            row === req.data.SalesOrganization.Ranges.length ?
                                `${salesOrganizationRanges} ( SalesOrganization >= '${i[1].Low}' and SalesOrganization <= '${i[1].High}' )` :
                                `${salesOrganizationRanges} ( SalesOrganization >= '${i[1].Low}' and SalesOrganization <= '${i[1].High}' ) or`
                    }
                    whereSalesOrganization = whereSalesOrganization ? `${whereSalesOrganization} or ${salesOrganizationRanges}` : salesOrganizationRanges
                }
            }

            if (whereSalesOrderID) whereCondition = whereCondition ? `${whereCondition} and ( ${whereSalesOrderID} )` : `( ${whereSalesOrderID} )`
            if (whereSalesDocumentType) whereCondition = whereCondition ? `${whereCondition} and ( ${whereSalesDocumentType} )` : `( ${whereSalesDocumentType} )`
            if (whereSalesOrganization) whereCondition = whereCondition ? `${whereCondition} and ( ${whereSalesOrganization} )` : `( ${whereSalesOrganization} )`

            console.log(whereCondition)

            if (whereCondition) {
                const query =
                    SELECT("*")
                        .from("YCNG_A_ForecastSchRefreshItems.YCNG_A_ForecastSchRefreshItems")
                        .where(whereCondition)

                const result = await onPremSrv.run(query)
                return result
            }
        } catch (error) {
            console.log(`Error during data retrieval:${error.message}`)
        }
    })
}