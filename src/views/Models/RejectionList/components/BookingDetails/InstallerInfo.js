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
import { COMMANPATH } from 'constants/api.constant'



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

const InstallerData = ({
     data = {
        installer_master_id : '',
        installer_name:'',
        installer_company:'',
        installer_contact:'',
        installer_email:'',
        kyc_path:''

     }
 }) =>{
    var FinalPath ;
    if(data)
    {
     FinalPath = COMMANPATH + data.kyc_path
    }
    console.log(FinalPath)
    return(
        <Card>
            <div className="flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto mt-2">
                <div className="flex xl:flex-col items-center gap-4 mt-4">
                    <h5 className='flex xl:flex-col items-left '>Installer Information</h5>
                    <Avatar size={90} shape="circle" src={FinalPath}></Avatar>
                    <h4 className="font-bold">{data.installer_name}</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-y-7 gap-x-4 mt-8">
                <CustomerInfoField title="Email" value={data.installer_email} />
                    <CustomerInfoField
                        title="Phone"
                        value={data.installer_contact}
                    />
                </div>
            </div>
        </Card>
    )
}

const InstallerInfo = ({ 
    data = {
        installer_master_id : '',
        installer_name:'',
        installer_company:'',
        installer_contact:'',
        installer_email:''
     }
 }) => {
    console.log(data)
    return (
        <div className="">
            <div className=''>
            <InstallerData data = {data} />
            </div>
            {/* <div className="w-full mt-4 2xl:col-span-3 lg:col-span-3 xl:col-span-3">
                <AdaptableCard>
                    <Subscription />
                </AdaptableCard>
            </div> */}
        </div>
    )
}

export default InstallerInfo
