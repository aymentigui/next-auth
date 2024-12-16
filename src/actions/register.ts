"use server"

import { z } from "zod"
import bcrypt from "bcrypt";
import { RegisterSchema } from "@/app/util/schema/user";
import { getUserByEmail } from "@/app/util/data/user";
import prisma from "@/app/util/db";

export const register = async  (data: z.infer<typeof RegisterSchema>)=>{
    const validateFileds=RegisterSchema.safeParse(data)

    if(!validateFileds){
        return { error : "Invalide infos"}
    }

    const {email, password} = validateFileds.data!
    const hashPassword = await bcrypt.hash(password,10)

    const existinUser= await getUserByEmail(email)
    
    if(existinUser){
        return { error : "Email already exisit"}
    }

    await prisma.admin.create({
        data:{
            email,
            password:hashPassword
        }
    })

    return { succes : "Login !"}
}