import React, { createContext, useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export const AUTH = createContext(null)

function AuthContext({ children }) {
    const [session, setSession] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const {
            data: { subscription }
        } = supabase.auth.onAuthStateChange((event, session) => {
            setSession(session)
            setLoading(false)
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    async function register(username, email, password, firstName, lastName, gender, phone) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    username,
                    firstName,
                    lastName,
                    gender,
                    phone
                }
            }
        })

        return { data, error }
    }

    async function login(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        return { data, error }
    }

    async function logout() {
        const { error } = await supabase.auth.signOut()

        return { error }
    }

    async function updateProfile(firstName, lastName, username, phone) {
        const { data, error } = await supabase.auth.updateUser({
            data: {
                firstName,
                lastName,
                username,
                phone
            }
        })

        return { data, error }
    }

    const user = session?.user || null

    return (
        <AUTH.Provider value={{ session, user, loading, register, login, logout, updateProfile }}
        >
            {children}
        </AUTH.Provider>
    )
}

export default AuthContext