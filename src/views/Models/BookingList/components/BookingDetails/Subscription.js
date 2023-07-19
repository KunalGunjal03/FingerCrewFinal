import React, { useState, useCallback } from 'react'
import { Card, Avatar, Button, Tag } from 'components/ui'
import { HiFire } from 'react-icons/hi'
import NumberFormat from 'react-number-format'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'

const Subscription = ({
    data={
        package_name:'',
        valid_from:'',
        valid_to:''
    },
}) => {
    const [subscribed, setSubscribed] = useState(true)

    // const data = useSelector(
    //     (state) => state.crmCustomerDetails.data.subscriptionData
    // )

    const unsubscribe = useCallback(() => {
        setSubscribed(false)
    }, [])

    const subscribe = useCallback(() => {
        setSubscribed(true)
    }, [])
    console.log(data)
    return (
        <div className="mb-8">
            {/* {data.map((sub) => ( */}
                <Card  className="mb-4" bordered>
                <h6 className="mb-4 ">Subscription</h6>
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            
                            <div>
                                <Avatar
                                    className="bg-emerald-500"
                                    shape="circle"
                                    icon={<HiFire />}
                                ></Avatar>
                            </div>
                            <div>
                                <div className="flex items-center">
                                    <h6>{data && data.package_name }</h6>
                                    <Tag className="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100 rounded-md border-0 mx-2">
                                        <span className="capitalize">
                                            {"Active"}
                                        </span>
                                    </Tag>
                                </div>
                                <div>
                                    <span>Valid from</span>
                                    <span> {data && data.valid_from} To {data && data.valid_to} </span>
                                    {/* <span>
                                        Next payment on{' '}
                                        {dayjs
                                            .unix()
                                            .format('MM/DD/YYYY')}
                                    </span> */}
                                    
                                        {/* <NumberFormat
                                            className="font-semibold text-gray-900 dark:text-gray-100"
                                            displayType="text"
                                            value={(
                                                Math.round(sub.amount * 100) /
                                                100
                                            ).toFixed(2)}
                                            prefix={'$'}
                                            thousandSeparator={true}
                                        /> */}
                                    
                                </div>
                            </div>
                        </div>
                       
                    </div>
                </Card>
            {/* ))} */}
        </div>
    )
}

export default Subscription
