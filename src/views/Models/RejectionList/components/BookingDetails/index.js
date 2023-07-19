import React, { useState, useEffect, Suspense, lazy } from 'react'
import { Tabs } from 'components/ui'
import { AdaptableCard, Container } from 'components/shared'
import { useNavigate, useLocation } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import { apiGetAccountSettingData } from 'services/AccountServices'
import { useSelector,useDispatch } from 'react-redux'
import { getBookingDetails } from '../../store/dataSlice'

const BookingTableDetails  = lazy(() => import ('./BookingTableDetails'))
const Survey = lazy(() => import ('./SurveyImages'))
const Installer = lazy(() => import('./InstallerInfo'))
const newItemLabel = 'Survey Details';
const newItemPath = 'surveydetails';

const { TabNav, TabList } = Tabs

const settingsMenu = {
    bookingDetails: { label: 'Booking Details', path: 'bookinginfo' },
    // surveydetails: { label: 'Survey Details', path: 'surveydetails' },
    // installerinfo: {label: 'Installer',path: 'installerinfo' },
}

const BookingDetails = () => {
    const [currentTab, setCurrentTab] = useState('bookingDetails')
    if(currentTab !== "surveydetails")
    {
        settingsMenu[newItemPath] = { label: '', path: '' };
    }
     const [formData, setFormData] = useState([])
    const data = useSelector((state) => state.crmBookinglist?.data?.BookingDetails?.getData)

    const navigate = useNavigate()
    const {token,tokenKey} = useSelector((state) => state.auth.user)
    const location = useLocation()
    console.log(data)
    var InstallerData 
    if(data)
    {
     InstallerData = { installer_master_id : data[0].installer_master_id, installer_name: data[0].installer_name, installer_company: data[0].installer_company,installer_contact: data[0].installer_contact,
        installer_email: data[0].installer_email,kyc_path: data[0].kyc_path
    }
     
    }
    const path = location.pathname.substring(
        location.pathname.lastIndexOf('/') + 1
    )

    const onTabChange = (val,data) => {
        console.log(data)
        setFormData(data)
        settingsMenu[newItemPath] = { label: newItemLabel, path: newItemPath };
        setCurrentTab(val)
        navigate(`/BookingDetails/${val}`)
    }   
    useEffect(() => {
        const path = location.pathname.substring(
        location.pathname.lastIndexOf('/') + 1
    )
    const requestParam = {booking_mast_id : path , 
       token : token , 
       tokenKey : tokenKey
   }
       
    fetchData(requestParam);
}, []);
const dispatch = useDispatch()
const fetchData = (requestParam) => {
    try {
      dispatch(getBookingDetails( requestParam));
      //console.log(surveyor_master_id)
      
    } catch (error) {
      console.error(error);
      return error;
    }
};

    // useEffect(() => {
    //     setCurrentTab(path)
        
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])   
    console.log(formData)
    return (
        <Container>
            <AdaptableCard>
                <Tabs value={currentTab} onChange={(val) => onTabChange(val)}>
                    <TabList>
                        {Object.keys(settingsMenu).map((key) => (
                            <TabNav key={key} value={key} disabled = {false}>
                                {settingsMenu[key].label}
                            </TabNav>
                        ))}
                    </TabList>
                </Tabs>
                <div className="py-2">
                    <Suspense fallback={<></>}>
                        {currentTab === 'bookingDetails' && (
                            
                            <BookingTableDetails data={data} onNextChange={onTabChange} />
                        )}
                        {currentTab === 'surveydetails' && (
                            <Survey  data = {formData[0]}/>
                        )}
                        {/* {currentTab === 'installerinfo' && (
                            <Installer data = {InstallerData}/>
                        )} */}
                    </Suspense>
                </div>
            </AdaptableCard>
        </Container>
    )
}

export default BookingDetails
