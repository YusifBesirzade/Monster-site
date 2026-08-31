import React, { useContext, useState } from 'react'
import { AUTH } from '../Context/AuthContext'
import { DATA } from '../Context/DataContext'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { translate } from '../utils/translations'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

function Login() {
    const { login } = useContext(AUTH)
    const { language } = useContext(DATA)
    const navigate = useNavigate()
    const location = useLocation()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        setError('')
        setLoading(true)

        const { error } = await login(email, password)

        setLoading(false)

        if (error) {
            setError(error.message)
            return
        }

        navigate(location.state?.from || '/')
    }

    return (
        <>
            <div className='min-h-screen bg-[#1B1C1D] flex items-center justify-center p-5'>
                <div className='w-full max-w-110 bg-[#161617] border border-[#313132] p-8'>
                    <h1 className='text-3xl text-white font-semibold text-center mb-8'>
                        {translate("authLogin", language)}
                    </h1>

                    <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                        <div>
                            <label className='block text-[#A4A4A5] text-sm mb-2'>
                                {translate("authEmail", language)}
                            </label>

                            <input
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='w-full bg-[#202021] border border-[#49494A] text-white p-3 outline-none focus:border-[#00FF00]'
                                required
                            />
                        </div>

                        <div>
                            <label className='block text-[#A4A4A5] text-sm mb-2'>
                                {translate("authPassword", language)}
                            </label>

                            <div className='relative'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='w-full bg-[#202021] border border-[#49494A] text-white p-3 pr-10 outline-none focus:border-[#00FF00]'
                                    required
                                />

                                <button
                                    type='button'
                                    onClick={() => setShowPassword(!showPassword)}
                                    className='absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-[#A4A4A5] hover:text-white cursor-pointer'
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className='text-red-500 text-sm'>
                                {error}
                            </div>
                        )}

                        <button
                            type='submit'
                            disabled={loading}
                            className='w-full border border-[#00FF00] text-white py-3 hover:bg-[#00FF00] hover:text-black cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            {loading
                                ? translate("authLoggingIn", language)
                                : translate("authLogin", language)}
                        </button>
                    </form>

                    <div className='text-center mt-6 text-[#A4A4A5] text-sm'>
                        {translate("authNoAccount", language)}
                        {' '}
                        <Link
                            to='/register'
                            className='text-[#00FF00] hover:underline'
                        >
                            {translate("authRegister", language)}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login