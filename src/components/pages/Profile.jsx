import React, { useContext, useEffect, useState } from 'react'
import { AUTH } from '../Context/AuthContext'
import { DATA } from '../Context/DataContext'
import { Link, useNavigate } from 'react-router-dom'
import { translate } from '../utils/translations'
import { FaBoxOpen, FaEdit, FaHeart, FaShoppingCart, FaSignOutAlt, FaUser } from 'react-icons/fa'

function Profile() {
    const { user, logout, updateProfile } = useContext(AUTH)
    const { language } = useContext(DATA)
    const navigate = useNavigate()

    const [isEditing, setIsEditing] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [phone, setPhone] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        if (user) {
            setFirstName(user.user_metadata?.firstName || '')
            setLastName(user.user_metadata?.lastName || '')
            setUsername(user.user_metadata?.username || '')
            setPhone(user.user_metadata?.phone || '')
        }
    }, [user])

    async function handleEdit() {
        setError('')
        setSuccess('')

        setFirstName(user.user_metadata?.firstName || '')
        setLastName(user.user_metadata?.lastName || '')
        setUsername(user.user_metadata?.username || '')
        setPhone(user.user_metadata?.phone || '')

        setIsEditing(true)
    }

    async function handleCancel() {
        setError('')
        setSuccess('')

        setFirstName(user.user_metadata?.firstName || '')
        setLastName(user.user_metadata?.lastName || '')
        setUsername(user.user_metadata?.username || '')
        setPhone(user.user_metadata?.phone || '')

        setIsEditing(false)
    }

    async function handleSave(e) {
        e.preventDefault()

        setError('')
        setSuccess('')
        setSaving(true)

        const { error } = await updateProfile(
            firstName,
            lastName,
            username,
            phone
        )

        setSaving(false)

        if (error) {
            setError(error.message)
            return
        }

        setIsEditing(false)
        setSuccess(translate("profile.updateSuccess", language))
    }

    async function handleLogout() {
        await logout()
        navigate('/login')
    }

    if (!user) {
        return (
            <div className='min-h-[70vh] bg-[#080808] flex items-center justify-center px-4'>
                <div className='text-center'>
                    <h2 className='text-white text-2xl font-bold mb-4'>
                        {translate("authLogin", language)}
                    </h2>

                    <Link
                        to='/login'
                        className='inline-block bg-[#00FF00] text-black px-6 py-3 font-bold hover:bg-[#00E000] transition-colors'
                    >
                        {translate("authLogin", language)}
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className='w-full bg-[#080808] min-h-screen px-3 py-6 sm:px-5 md:px-8 lg:px-12'>
                <div className='max-w-310 mx-auto'>

                    <div className='mb-6'>
                        <h1 className='text-white text-3xl sm:text-4xl font-bold'>
                            {translate("authProfile", language)}
                        </h1>

                        <div className='w-16 h-1 bg-[#00FF00] mt-3'></div>
                    </div>

                    <div className='grid grid-cols-1 lg:grid-cols-4 gap-5'>

                        <div className='lg:col-span-1 bg-[#161617] border border-[#313233]'>
                            <div className='flex flex-col'>

                                <div className='p-5 border-b border-[#313233]'>
                                    <div className='flex items-center gap-4'>
                                        <div className='w-16 h-16 shrink-0 rounded-full bg-[#242425] flex items-center justify-center'>
                                            <FaUser className='text-white text-2xl' />
                                        </div>

                                        <div className='min-w-0'>
                                            <div className='text-white font-semibold truncate'>
                                                {user.user_metadata?.username || user.email}
                                            </div>

                                            <div className='text-[#A4A4A5] text-xs truncate mt-1'>
                                                {user.email}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    to='/profile'
                                    className='flex items-center gap-3 px-5 py-4 text-white bg-[#202021] border-b border-[#313233]'
                                >
                                    <FaUser />
                                    <span className='text-sm'>
                                        {translate("authProfile", language)}
                                    </span>
                                </Link>

                                <Link
                                    to='/wishlist'
                                    className='flex items-center gap-3 px-5 py-4 text-white border-b border-[#313233] hover:text-[#00FF00] transition-colors'
                                >
                                    <FaHeart />
                                    <span className='text-sm'>
                                        {translate("authWishlist", language)}
                                    </span>
                                </Link>

                                <Link
                                    to='/cart'
                                    className='flex items-center gap-3 px-5 py-4 text-white border-b border-[#313233] hover:text-[#00FF00] transition-colors'
                                >
                                    <FaShoppingCart />
                                    <span className='text-sm'>
                                        {translate("header.cart", language)}
                                    </span>
                                </Link>

                                <Link
                                    to='/orders'
                                    className='flex items-center gap-3 px-5 py-4 text-white border-b border-[#313233] hover:text-[#00FF00] transition-colors'
                                >
                                    <FaBoxOpen />
                                    <span className='text-sm'>
                                        {translate("profile.orders", language)}
                                    </span>
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className='flex items-center gap-3 px-5 py-4 text-[#FBB407] hover:text-red-500 transition-colors cursor-pointer text-left'
                                >
                                    <FaSignOutAlt />
                                    <span className='text-sm'>
                                        {translate("authLogout", language)}
                                    </span>
                                </button>

                            </div>
                        </div>

                        <div className='lg:col-span-3 bg-[#161617] border border-[#313233]'>

                            <div className='px-5 py-5 sm:px-7 border-b border-[#313233] flex items-center justify-between gap-4'>
                                <h2 className='text-white text-xl font-semibold'>
                                    {translate("profile.accountInformation", language)}
                                </h2>

                                {!isEditing && (
                                    <button
                                        type='button'
                                        onClick={handleEdit}
                                        className='flex items-center gap-2 border border-[#00FF00] text-white px-4 py-2 text-sm hover:bg-[#00FF00] hover:text-black transition-colors cursor-pointer'
                                    >
                                        <FaEdit />
                                        {translate("profile.editProfile", language)}
                                    </button>
                                )}
                            </div>

                            <div className='p-5 sm:p-7'>

                                {isEditing ? (
                                    <form onSubmit={handleSave}>

                                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>

                                            <div>
                                                <label className='block text-[#A4A4A5] text-xs mb-2 uppercase'>
                                                    {translate("authFirstName", language)}
                                                </label>

                                                <input
                                                    type='text'
                                                    value={firstName}
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                    className='w-full bg-[#202021] border border-[#313233] text-white px-4 py-3 text-sm outline-none focus:border-[#00FF00]'
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className='block text-[#A4A4A5] text-xs mb-2 uppercase'>
                                                    {translate("authLastName", language)}
                                                </label>

                                                <input
                                                    type='text'
                                                    value={lastName}
                                                    onChange={(e) => setLastName(e.target.value)}
                                                    className='w-full bg-[#202021] border border-[#313233] text-white px-4 py-3 text-sm outline-none focus:border-[#00FF00]'
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className='block text-[#A4A4A5] text-xs mb-2 uppercase'>
                                                    {translate("profile.username", language)}
                                                </label>

                                                <input
                                                    type='text'
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    className='w-full bg-[#202021] border border-[#313233] text-white px-4 py-3 text-sm outline-none focus:border-[#00FF00]'
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className='block text-[#A4A4A5] text-xs mb-2 uppercase'>
                                                    Email
                                                </label>

                                                <div className='bg-[#202021] border border-[#313233] px-4 py-3 text-white text-sm break-all'>
                                                    {user.email}
                                                </div>
                                            </div>

                                            <div>
                                                <label className='block text-[#A4A4A5] text-xs mb-2 uppercase'>
                                                    {translate("authGender", language)}
                                                </label>

                                                <div className='bg-[#202021] border border-[#313233] px-4 py-3 text-white text-sm'>
                                                    {user.user_metadata?.gender === 'male'
                                                        ? translate("authMale", language)
                                                        : user.user_metadata?.gender === 'female'
                                                            ? translate("authFemale", language)
                                                            : '-'}
                                                </div>
                                            </div>

                                            <div>
                                                <label className='block text-[#A4A4A5] text-xs mb-2 uppercase'>
                                                    {translate("authPhone", language)}
                                                </label>

                                                <input
                                                    type='tel'
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    className='w-full bg-[#202021] border border-[#313233] text-white px-4 py-3 text-sm outline-none focus:border-[#00FF00]'
                                                    required
                                                />
                                            </div>

                                        </div>

                                        {error && (
                                            <div className='text-red-500 text-sm mt-5'>
                                                {error}
                                            </div>
                                        )}

                                        <div className='flex items-center gap-3 mt-6'>

                                            <button
                                                type='submit'
                                                disabled={saving}
                                                className='border border-[#00FF00] text-white px-5 py-3 text-sm hover:bg-[#00FF00] hover:text-black transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
                                            >
                                                {saving
                                                    ? translate("profile.saving", language)
                                                    : translate("profile.saveChanges", language)}
                                            </button>

                                            <button
                                                type='button'
                                                onClick={handleCancel}
                                                disabled={saving}
                                                className='border border-[#49494A] text-white px-5 py-3 text-sm hover:bg-[#49494A] transition-colors cursor-pointer disabled:opacity-50'
                                            >
                                                {translate("profile.cancel", language)}
                                            </button>

                                        </div>

                                    </form>
                                ) : (
                                    <>
                                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>

                                            <div>
                                                <label className='block text-[#A4A4A5] text-xs mb-2 uppercase'>
                                                    {translate("authFirstName", language)}
                                                </label>

                                                <div className='bg-[#202021] border border-[#313233] px-4 py-3 text-white text-sm'>
                                                    {user.user_metadata?.firstName || '-'}
                                                </div>
                                            </div>

                                            <div>
                                                <label className='block text-[#A4A4A5] text-xs mb-2 uppercase'>
                                                    {translate("authLastName", language)}
                                                </label>

                                                <div className='bg-[#202021] border border-[#313233] px-4 py-3 text-white text-sm'>
                                                    {user.user_metadata?.lastName || '-'}
                                                </div>
                                            </div>

                                            <div>
                                                <label className='block text-[#A4A4A5] text-xs mb-2 uppercase'>
                                                    {translate("profile.username", language)}
                                                </label>

                                                <div className='bg-[#202021] border border-[#313233] px-4 py-3 text-white text-sm'>
                                                    {user.user_metadata?.username || '-'}
                                                </div>
                                            </div>

                                            <div>
                                                <label className='block text-[#A4A4A5] text-xs mb-2 uppercase'>
                                                    Email
                                                </label>

                                                <div className='bg-[#202021] border border-[#313233] px-4 py-3 text-white text-sm break-all'>
                                                    {user.email}
                                                </div>
                                            </div>

                                            <div>
                                                <label className='block text-[#A4A4A5] text-xs mb-2 uppercase'>
                                                    {translate("authGender", language)}
                                                </label>

                                                <div className='bg-[#202021] border border-[#313233] px-4 py-3 text-white text-sm'>
                                                    {user.user_metadata?.gender === 'male'
                                                        ? translate("authMale", language)
                                                        : user.user_metadata?.gender === 'female'
                                                            ? translate("authFemale", language)
                                                            : '-'}
                                                </div>
                                            </div>

                                            <div>
                                                <label className='block text-[#A4A4A5] text-xs mb-2 uppercase'>
                                                    {translate("authPhone", language)}
                                                </label>

                                                <div className='bg-[#202021] border border-[#313233] px-4 py-3 text-white text-sm'>
                                                    {user.user_metadata?.phone || '-'}
                                                </div>
                                            </div>

                                            <div>
                                                <label className='block text-[#A4A4A5] text-xs mb-2 uppercase'>
                                                    {translate("profile.accountStatus", language)}
                                                </label>

                                                <div className='bg-[#202021] border border-[#313233] px-4 py-3 text-[#00FF00] text-sm'>
                                                    {translate("profile.active", language)}
                                                </div>
                                            </div>

                                            <div>
                                                <label className='block text-[#A4A4A5] text-xs mb-2 uppercase'>
                                                    {translate("profile.accountType", language)}
                                                </label>

                                                <div className='bg-[#202021] border border-[#313233] px-4 py-3 text-white text-sm'>
                                                    {translate("profile.customer", language)}
                                                </div>
                                            </div>

                                        </div>

                                        {success && (
                                            <div className='text-[#00FF00] text-sm mt-5'>
                                                {success}
                                            </div>
                                        )}
                                    </>
                                )}

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile