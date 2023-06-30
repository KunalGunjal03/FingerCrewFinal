import React, { useState } from 'react'
import { Card, Avatar, Button, Notification, toast } from 'components/ui'
import {
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaPinterestP,
} from 'react-icons/fa'
import { HiPencilAlt, HiOutlineTrash } from 'react-icons/hi'
import { ConfirmDialog ,AdaptableCard} from 'components/shared'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Subscription from './Subscription'



const CustomerInfoField = ({ title, value }) => {
    return (
        <div>
            <span>{title}</span>
            <p className="text-gray-700 dark:text-gray-200 font-semibold">
                {value}
            </p>
        </div>
    )
}

const InstallerData = ({ data = {} }) =>{

    return(
        <Card>
            <div className="flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto">
                <div className="flex xl:flex-col items-center gap-4 mt-4">
                    <h5 className='flex xl:flex-col items-left '>Installer Information</h5>
                    <Avatar size={90} shape="circle" src={0} />
                    <h4 className="font-bold">{"Installer name"}</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-y-7 gap-x-4 mt-8">
                    <CustomerInfoField title="Email" value={data.email} />
                    <CustomerInfoField
                        title="Phone"
                        value={0}
                    />
                    <CustomerInfoField
                        title="Location"
                        value={0}
                    />
                    <CustomerInfoField
                        title="Date of birth"
                        value={0}
                    />
                    <CustomerInfoField
                        title="Title"
                        value={0}
                    />
                    <div className="mb-7">
                        <span>Social</span>
                        <div className="flex mt-4">
                            <Button
                                className="mr-2"
                                shape="circle"
                                size="sm"
                                icon={
                                    <FaFacebookF className="text-[#1773ea]" />
                                }
                            />
                            <Button
                                className="mr-2"
                                shape="circle"
                                size="sm"
                                icon={<FaTwitter className="text-[#1da1f3]" />}
                            />
                            <Button
                                className="mr-2"
                                shape="circle"
                                size="sm"
                                icon={
                                    <FaLinkedinIn className="text-[#0077b5]" />
                                }
                            />
                            <Button
                                className="mr-2"
                                shape="circle"
                                size="sm"
                                icon={
                                    <FaPinterestP className="text-[#df0018]" />
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}

const InstallerInfo = ({ data = {} }) => {
    return (
        <div className="grid lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-4 h-full">
            <div className='2xl:col-span-2 lg:col-span-2 xl:col-span-2 mt-4'>
            <InstallerData data = {data} />
            </div>
            <div className="w-full mt-4 2xl:col-span-3 lg:col-span-3 xl:col-span-3">
                <AdaptableCard>
                    <Subscription />
                </AdaptableCard>
            </div>
        </div>
    )
}

export default InstallerInfo
