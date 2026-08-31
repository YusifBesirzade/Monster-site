import React, { useContext, useState } from 'react'
import { AUTH } from '../Context/AuthContext'
import { DATA } from '../Context/DataContext'
import { Link, useNavigate } from 'react-router-dom'
import { translate } from '../utils/translations'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

function Register() {
    const { register } = useContext(AUTH)
    const { language } = useContext(DATA)
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [gender, setGender] = useState('')
    const [phone, setPhone] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        setError('')
        setSuccess('')

        if (password !== confirmPassword) {
            setError(translate("authPasswordMismatch", language))
            return
        }

        setLoading(true)

        const { error } = await register(username, email, password, firstName, lastName, gender, phone)

        setLoading(false)

        if (error) {
            setError(error.message)
            return
        }

        setSuccess(translate("authRegisterSuccess", language))

        setTimeout(() => {
            navigate('/login')
        }, 1500)
    }

    return (
        <>
            <div className='min-h-screen bg-[#1B1C1D] flex items-center justify-center p-5'>
                <div className='w-full max-w-110 bg-[#161617] border border-[#313132] p-8'>
                    <h1 className='text-3xl text-white font-semibold text-center mb-8'>
                        {translate("authRegister", language)}
                    </h1>

                    <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                        <div>
                            <label className='block text-[#A4A4A5] text-sm mb-2'>
                                {translate("authFirstName", language)}
                            </label>

                            <input
                                type='text'
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className='w-full bg-[#202021] border border-[#49494A] text-white p-3 outline-none focus:border-[#00FF00]'
                                required
                            />
                        </div>

                        <div>
                            <label className='block text-[#A4A4A5] text-sm mb-2'>
                                {translate("authLastName", language)}
                            </label>

                            <input
                                type='text'
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className='w-full bg-[#202021] border border-[#49494A] text-white p-3 outline-none focus:border-[#00FF00]'
                                required
                            />
                        </div>

                        <div>
                            <label className='block text-[#A4A4A5] text-sm mb-2'>
                                {translate("authUsername", language)}
                            </label>

                            <input
                                type='text'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className='w-full bg-[#202021] border border-[#49494A] text-white p-3 outline-none focus:border-[#00FF00]'
                                required
                            />
                        </div>

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
                                {translate("authGender", language)}
                            </label>

                            <select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className='w-full bg-[#202021] border border-[#49494A] text-white p-3 outline-none focus:border-[#00FF00]'
                                required
                            >
                                <option value=''>
                                    {translate("authSelectGender", language)}
                                </option>
                                <option value='male'>
                                    {translate("authMale", language)}
                                </option>
                                <option value='female'>
                                    {translate("authFemale", language)}
                                </option>
                            </select>
                        </div>

                        <div>
                            <label className='block text-[#A4A4A5] text-sm mb-2'>
                                {translate("authPhone", language)}
                            </label>

                            <input
                                type='tel'
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
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
                                    className='w-full bg-[#202021] border border-[#49494A] text-white p-3 outline-none focus:border-[#00FF00]'
                                    minLength={6}
                                    required
                                />

                                <button
                                    type='button'
                                    onClick={() => setShowPassword(!showPassword)}
                                    className='absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center
                                    text-[#A4A4A5] hover:text-white cursor-pointer'
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className='block text-[#A4A4A5] text-sm mb-2'>
                                {translate("authConfirmPassword", language)}
                            </label>

                            <div className='relative'>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className='w-full bg-[#202021] border border-[#49494A] text-white p-3 outline-none focus:border-[#00FF00]'
                                    minLength={6}
                                    required
                                />

                                <button
                                    type='button'
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className='absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center
                                    text-[#A4A4A5] hover:text-white cursor-pointer'
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className='text-red-500 text-sm'>
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className='text-[#00FF00] text-sm'>
                                {success}
                            </div>
                        )}

                        <button
                            type='submit'
                            disabled={loading}
                            className='w-full border border-[#00FF00] text-white py-3 hover:bg-[#00FF00] hover:text-black cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            {loading
                                ? translate("authRegistering", language)
                                : translate("authRegister", language)}
                        </button>
                    </form>

                    <div className='text-center mt-6 text-[#A4A4A5] text-sm'>
                        {translate("authHaveAccount", language)}
                        {' '}
                        <Link
                            to='/login'
                            className='text-[#00FF00] hover:underline'
                        >
                            {translate("authLogin", language)}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register