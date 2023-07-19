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
// import Surveyorinfo from 'views/Models/Survey/components/SurveyForm/SurveyorInfo'



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

const SurveyorData = ({ data = {} }) =>{

    return(
        <Card>
            <div className="flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto">
                <div className="flex xl:flex-col items-center gap-4 mt-4">
                    <h5 className='flex xl:flex-col items-left '>Surveyor Information</h5>
                    <Avatar size={90} shape="circle" src={0} />
                    <h4 className="font-bold">{"Surveyor name"}</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-y-7 gap-x-4 mt-8">
                  
                    
                </div>
            </div>
        </Card>
    )
}

const SurveyorInfo = ({ data = {} }) => {
    return (
        <div className="grid lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-4 h-full">
            <div className='2xl:col-span-2 lg:col-span-2 xl:col-span-2 mt-4'>
            <SurveyorData data = {data} />
            </div>
            <div className="w-full mt-4 2xl:col-span-3 lg:col-span-3 xl:col-span-3">
                <AdaptableCard>
                    {/* <Subscription /> */}
                </AdaptableCard>
            </div>
        </div>
    )
}

export default SurveyorInfo
