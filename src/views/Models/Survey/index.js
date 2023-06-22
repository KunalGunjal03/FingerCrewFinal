import React from 'react'
import { AdaptableCard } from 'components/shared'
import SurveyTableTools from './components/SurveyTableTools'
import SurveyStatistic from './components/SurveyStatistic'
import { injectReducer } from 'store/index'
import reducer from './store'
import SurveyTable from './components/SurveyTable'
injectReducer('crmCustomers', reducer)

const Survey = () => {
    return (
        <>
            <SurveyStatistic />
            <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <SurveyTableTools />
            </div>
                <SurveyTable />
            </AdaptableCard>
        </>

        
    )
}

export default Survey
    