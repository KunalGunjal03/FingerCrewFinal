import React from 'react'
import { Card, Avatar } from 'components/ui'
import { IconText } from 'components/shared'
import { HiMail, HiPhone, HiExternalLink } from 'react-icons/hi'
import { Link } from 'react-router-dom'

const SurveyorProfile = () => {
    return (
        <Card>
            <h5 className="mb-4">Client Information</h5>
            <Link
                className="group flex items-center justify-between"
                to="/SurveyorInfo"
            >
            <div className="flex items-center">
                    <Avatar shape="circle" src={0} />
                    <div className="ltr:ml-2 rtl:mr-2">
                        <div className="font-semibold group-hover:text-gray-900 group-hover:dark:text-gray-100">
                            {"Kunal"}
                        </div>
                        
                    </div>
                </div>
                <HiExternalLink className="text-xl hidden group-hover:block" />
            </Link>
                <hr className="my-5" />
            <IconText
                className="mb-4"
                icon={<HiMail className="text-xl opacity-70" />}
            >
                <span className="font-semibold">{0}</span>
            </IconText>
            <IconText icon={<HiPhone className="text-xl opacity-70" />}>
                <span className="font-semibold">{0}</span>
            </IconText>
            <hr className="my-5" />
            <h6 className="mb-4">Address</h6>
            <address className="not-italic">
                <div className="mb-1">{0}</div>
                <div className="mb-1">{0}</div>
                <div className="mb-1">{0}</div>
                <div>{0}</div>
            </address>
            <hr className="my-5" />
            <h6 className="mb-4">Skills</h6>
            <address className="not-italic">
                <div className="mb-1">{0}</div>
                <div className="mb-1">{0}</div>
                <div className="mb-1">{0}</div>
                <div>{0}</div>
            </address>
           
        </Card>
    )
}

export default SurveyorProfile