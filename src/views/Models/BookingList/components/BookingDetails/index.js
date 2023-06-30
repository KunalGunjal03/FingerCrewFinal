import React from 'react'
import { Tabs,Button } from 'components/ui'
import { StickyFooter } from 'components/shared'
import { FiCheckCircle } from 'react-icons/fi'
import BookingTableDetails from './BookingTableDetails'
import SurveyImages from './SurveyImages'
import InstallerInfo from './InstallerInfo'
import SurveyLocation from './SurveyLocation'
import KycForms from './../../../../KycForms'
import SurveyorInfo from './SurveyorInfo'
import SurveyPayment from './SurveyPayment'
const { TabNav, TabList, TabContent } = Tabs

const BookingDetails = () => {
    return (
        
        <div>
            <Tabs defaultValue="tab1">
                <TabList>
                    <TabNav value="tab1">Booking</TabNav>
                    <TabNav value="tab2">Survey Images</TabNav>
                    <TabNav value="tab3">Survey Location</TabNav>
                    <TabNav value="tab4">Installer </TabNav>
                    <TabNav value="tab5">Surveyor</TabNav>
                    <TabNav value="tab6">Payment</TabNav>
                    <TabNav value="tab7">Wallet</TabNav>
                </TabList>
                <div className="">
                <div className="">
                    <TabContent value="tab1">
                        <BookingTableDetails/>
                    </TabContent>
                    <TabContent value="tab2">
                       <SurveyImages/>
                    </TabContent>
                    <TabContent value="tab3">
                    <SurveyLocation/>
                    </TabContent>
                    <TabContent value="tab4">
                    <InstallerInfo/>
                    </TabContent>
                    <TabContent value="tab5">
                    <SurveyorInfo/>
                    </TabContent>
                    <TabContent value="tab6">
                    <SurveyPayment/>
                    </TabContent>
                    <TabContent value="tab7">
                    
                    </TabContent>
                    
                </div>
                
                </div>
            </Tabs>
        </div>
    
    )
}

export default BookingDetails