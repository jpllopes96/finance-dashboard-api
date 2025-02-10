import { PostgresHelper } from '../../../db/postgres/helper.js'

export class PostgresUpdateTransactionRepository {
    async execute(transactionId, updateParams) {
        const updateFields = []
        const updateValues = []

        Object.keys(updateParams).forEach((key) => {
            updateFields.push(`${key} = $${updateValues.length + 1}`)
            updateValues.push(updateParams[key])
        })

        updateValues.push(transactionId)

        const updateQuery = `
                    UPDATE transactions
                    SET ${updateFields.join(', ')}
                    WHERE id = $${updateValues.length}
                    RETURNING *
                `

        const updatedTransaction = await PostgresHelper.query(
            updateQuery,
            updateValues,
        )

        return updatedTransaction[0]
    }
}
