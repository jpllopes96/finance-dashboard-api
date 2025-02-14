import { PostgresHelper } from '../../../db/postgres/helper.js'

export class PostgresGetUserBalanceRepository {
    async execute(userId) {
        const balance = await PostgresHelper.query(
            'SELECT * FROM get_user_balance($1)',
            [userId],
        )
        return {
            userId,
            ...balance[0],
        }
    }
}

// "SELECT SUM(CASE WHEN type = 'EARNING' THEN amount ELSE 0 END) AS earnings, SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END) AS expenses, SUM(CASE WHEN type = 'INVESTMENTS' THEN amount ELSE 0 END) AS investments, (SUM(CASE WHEN type = 'EARNING' THEN amount ELSE 0 END) - SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END) - SUM(CASE WHEN type = 'INVESTMENTS' THEN amount ELSE 0 END)) as balance FROM transactions WHERE user_id = $1;",
