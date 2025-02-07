import api from "@/config/axios"
import { AuthForm, ResponseMsgAPI, UserAuthSchema } from "@/types/index"
import { isAxiosError } from "axios"

export async function registerAccount(formData: AuthForm) {
    try {
        const { data } = await api.post<ResponseMsgAPI>('/auth/create-account', formData)
        return data.msg
    } catch (error) {
        console.log(error)
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function login(formData: AuthForm) {
    try {
        const { data } = await api.post<string>('/auth/login', formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function confirmAccount(token: AuthForm['token']) {
    try {
        const { data } = await api.post<string>('/auth/confirm-account', { token })
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getUserAuth() {
    try {
        const { data } = await api('/auth/user')
        const result = UserAuthSchema.safeParse(data)
        if (result.success) return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function forgotPassword(formData: AuthForm) {
    try {
        const { data } = await api.post<string>('/auth/forgot-password', formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function validateToken(token: AuthForm['token']) {
    try {
        const { data } = await api.post<string>('/auth/validate-token', { token })
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function resetPasswordByToken({ formData, token }: { formData: AuthForm, token: string }) {
    const {password} = formData
    try {
        const { data } = await api.post<ResponseMsgAPI>(`/auth/reset-password/`, {password, token} )
        return data.msg
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}