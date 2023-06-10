import React from 'react'
import { AdaptableCard } from 'components/shared'
 import SurveyorTable from './components/SurveyorTable'


import SurveyorStatistic from './components/SurveyorStatistic'
import { injectReducer } from 'store/index'
import reducer from './store'

injectReducer('crmCustomers', reducer)

const Surveyor = () => {
    return (
        <>
            <SurveyorStatistic />
            <AdaptableCard className="h-full" bodyClass="h-full">
                <SurveyorTable />
            </AdaptableCard>
        </>
    )
}

export default Surveyor
