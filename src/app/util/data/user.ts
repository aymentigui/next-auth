/* eslint-disable */

import prisma from "../db"

export const getUserByEmail = async (email:string)=>{
    try {
        const user= await prisma.admin.findUnique({where:{email}})
        return user
    } catch (error) {
        return null
    }
}

export const getUserById = async (id:string)=>{
    try {
        const user= await prisma.admin.findUnique({where:{id}})
        return user
    } catch (error) {
        return null
    }
}