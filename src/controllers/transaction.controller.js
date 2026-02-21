import prisma from "../lib/prisma.js";

const transactionController = {
    async transaction(req,res) {
        const {value, description, type} = req.body;
        const userId = req.userId;

        try{
            const newTransaction = await prisma.transaction.create({
                data:{
                    description,
                    value: Number(value),
                    type,
                    userId:Number(userId)
                }
            });
            return res.status(200).json(newTransaction)
        }catch (error){
            return res.status(500).json({error:"Erro ao criar transação"})
        }
    },

    async index(req,res){
        const userId = req.userId;
        const transaction = await prisma.transaction.findMany({
            where:{userId:Number(userId)}
        });
        return res.json(transaction)
    }
};

export default transactionController;