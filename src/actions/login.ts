"use server"

import { z } from "zod"
import { defaultRedirect } from "@/app/util/routes"
import { AuthError } from "next-auth"
import { signIn } from "@/app/util/auth"
import { LoginSchema } from "@/app/util/schema/user"

export const login = async  (data: z.infer<typeof LoginSchema>)=>{
    const validateFileds=LoginSchema.safeParse(data)

    if(!validateFileds){
        return { error : "Invalide infos"}
    }

    const {email,password}= validateFileds.data!

    try {
        await signIn(
            "credentials",{    
                email,
                password,
                redirectTo: defaultRedirect
            }
        )
    } catch (error) {
        if(error instanceof AuthError){
            switch(error.type){
                case "CredentialsSignin":
                    return { error : "Invalide infos"}
                default :
                    return { error : "Something went wrong !"}
            }
        }
        throw error
    }
    
}
