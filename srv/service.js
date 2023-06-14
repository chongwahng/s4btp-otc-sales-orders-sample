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
            /* SalesOrderID Values */
            if (req.data.SalesOrderID.Values && req.data.SalesOrderID.Values.length > 0) {
                var row = 0
                salesOrderIDValues = ''
                for (let i of req.data.SalesOrderID.Values.entries()) {
                    row += 1
                    if (row === req.data.SalesOrderID.Values.length) {
                        salesOrderIDValues = salesOrderIDValues + `SalesOrderID = '${i[1].Low}'`
                    } else {
                        salesOrderIDValues = salesOrderIDValues + `SalesOrderID = '${i[1].Low}' or `
                    }
                }
                if (whereSalesOrderID) {
                    whereSalesOrderID = whereSalesOrderID + ` or ` + salesOrderIDValues
                } else {
                    whereSalesOrderID = salesOrderIDValues
                }
            }

            /* SalesOrderID Ranges */
            if (req.data.SalesOrderID.Ranges && req.data.SalesOrderID.Ranges.length > 0) {
                var row = 0
                salesOrderIDRanges = ''
                for (let i of req.data.SalesOrderID.Ranges.entries()) {
                    row += 1
                    if (row === req.data.SalesOrderID.Ranges.length) {
                        salesOrderIDRanges = salesOrderIDRanges + `( SalesOrderID >= '${i[1].Low}' and SalesOrderID <= '${i[1].High}' )`
                    } else {
                        salesOrderIDRanges = salesOrderIDRanges + `( SalesOrderID >= '${i[1].Low}' and SalesOrderID <= '${i[1].High}' ) or `
                    }
                }
                if (whereSalesOrderID) {
                    whereSalesOrderID = whereSalesOrderID + ` or ` + salesOrderIDRanges
                } else {
                    whereSalesOrderID = salesOrderIDRanges
                }
            }

            if (whereSalesOrderID) {
                whereCondition = `( ${whereSalesOrderID} )`
            }

            /* SalesDocumentType Values */
            if (req.data.SalesDocumentType.Values && req.data.SalesDocumentType.Values.length > 0) {
                var row = 0
                salesDocumentTypeValues = ''
                for (let i of req.data.SalesDocumentType.Values.entries()) {
                    row += 1
                    if (row === req.data.SalesDocumentType.Values.length) {
                        salesDocumentTypeValues = salesDocumentTypeValues + `SalesDocumentType = '${i[1].Low}'`
                    } else {
                        salesDocumentTypeValues = salesDocumentTypeValues + `SalesDocumentType = '${i[1].Low}' or `
                    }
                }
                if (whereSalesDocumentType) {
                    whereSalesDocumentType = whereSalesDocumentType + ` or ` + salesDocumentTypeValues
                } else {
                    whereSalesDocumentType = salesDocumentTypeValues
                }
            }

            /* SalesDocumentType Ranges */
            if (req.data.SalesDocumentType.Ranges && req.data.SalesDocumentType.Ranges.length > 0) {
                var row = 0
                salesDocumentTypeRanges = ''
                for (let i of req.data.SalesDocumentType.Ranges.entries()) {
                    row += 1
                    if (row === req.data.SalesDocumentType.Ranges.length) {
                        salesDocumentTypeRanges = salesDocumentTypeRanges + `( SalesDocumentType >= '${i[1].Low}' and SalesDocumentType <= '${i[1].High}' )`
                    } else {
                        salesDocumentTypeRanges = salesDocumentTypeRanges + `( SalesDocumentType >= '${i[1].Low}' and SalesDocumentType <= '${i[1].High}' ) or `
                    }
                }
                if (whereSalesDocumentType) {
                    whereSalesDocumentType = whereSalesDocumentType + ` or ` + salesDocumentTypeRanges
                } else {
                    whereSalesDocumentType = salesDocumentTypeRanges
                }
            }

            if (whereSalesDocumentType) {
                if (whereCondition) {
                    whereCondition = whereCondition + ` and ` + `( ${whereSalesDocumentType} )`
                } else {
                    whereCondition = `( ${whereSalesDocumentType} )`
                }
            }

            /* SalesOrganization Values */
            if (req.data.SalesOrganization.Values && req.data.SalesOrganization.Values.length > 0) {
                var row = 0
                salesOrganizationValues = ''
                for (let i of req.data.SalesOrganization.Values.entries()) {
                    row += 1
                    if (row === req.data.SalesOrganization.Values.length) {
                        salesOrganizationValues = salesOrganizationValues + `SalesOrganization = '${i[1].Low}'`
                    } else {
                        salesOrganizationValues = salesOrganizationValues + `SalesOrganization = '${i[1].Low}' or `
                    }
                }
                if (whereSalesOrganization) {
                    whereSalesOrganization = whereSalesOrganization + ` or ` + salesOrganizationValues
                } else {
                    whereSalesOrganization = salesOrganizationValues
                }
            }

            /* SalesOrganization Ranges */
            if (req.data.SalesOrganization.Ranges && req.data.SalesOrganization.Ranges.length > 0) {
                var row = 0
                salesOrganizationRanges = ''
                for (let i of req.data.SalesOrganization.Ranges.entries()) {
                    row += 1
                    if (row === req.data.SalesOrganization.Ranges.length) {
                        salesOrganizationRanges = salesOrganizationRanges + `( SalesOrganization >= '${i[1].Low}' and SalesOrganization <= '${i[1].High}' )`
                    } else {
                        salesOrganizationRanges = salesOrganizationRanges + `( SalesOrganization >= '${i[1].Low}' and SalesOrganization <= '${i[1].High}' ) or `
                    }
                }
                if (whereSalesOrganization) {
                    whereSalesOrganization = whereSalesOrganization + ` or ` + salesOrganizationRanges
                } else {
                    whereSalesOrganization = salesOrganizationRanges
                }
            }

            if (whereSalesOrganization) {
                if (whereCondition) {
                    whereCondition = whereCondition + ` and ` + `( ${whereSalesOrganization} )`
                } else {
                    whereCondition = `( ${whereSalesOrganization} )`
                }
            }

            console.log(whereCondition)

            const query =
                SELECT("*")
                    .from("YCNG_A_ForecastSchRefreshItems.YCNG_A_ForecastSchRefreshItems")
                    .where(whereCondition)

            const result = await onPremSrv.run(query)
            
            return result
        } catch (error) {
            console.log(`Error during data retrieval:${error.message}`)
        }
    })
}