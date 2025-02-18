import { prisma } from '../../../../prisma/prisma.js'
export class PostgresGetUserBalanceRepository {
    async execute(userId) {
        const {
            _sum: { amount: totalExpenses },
        } = await prisma.transaction.aggregate({
            where: {
                user_id: userId,
                type: 'EXPENSE',
            },
            _sum: {
                amount: true,
            },
        })

        const {
            _sum: { amount: totalEarnings },
        } = await prisma.transaction.aggregate({
            where: {
                user_id: userId,
                type: 'EARNING',
            },
            _sum: {
                amount: true,
            },
        })

        const {
            _sum: { amount: totalInvestments },
        } = await prisma.transaction.aggregate({
            where: {
                user_id: userId,
                type: 'INVESTMENTS',
            },
            _sum: {
                amount: true,
            },
        })

        const _totalEarnings = totalEarnings || 0
        const _totalExpenses = totalExpenses || 0
        const _totalInvestments = totalInvestments || 0

        const balance = _totalEarnings - _totalExpenses - _totalInvestments

        return {
            earnings: _totalEarnings,
            expenses: _totalExpenses,
            investments: _totalInvestments,
            balance,
        }
    }
}

// "SELECT SUM(CASE WHEN type = 'EARNING' THEN amount ELSE 0 END) AS earnings, SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END) AS expenses, SUM(CASE WHEN type = 'INVESTMENTS' THEN amount ELSE 0 END) AS investments, (SUM(CASE WHEN type = 'EARNING' THEN amount ELSE 0 END) - SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END) - SUM(CASE WHEN type = 'INVESTMENTS' THEN amount ELSE 0 END)) as balance FROM transactions WHERE user_id = $1;",
