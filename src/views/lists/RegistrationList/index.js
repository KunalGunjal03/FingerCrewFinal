import React from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'

import SurveyorTable from './components/SurveyorTable'
import SurveyorTableTools from './components/SurveyorTableTools'


injectReducer('listsSurveyorList', reducer)

const SurveyorList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Surveyor registration request list</h3>
                <SurveyorTableTools/>
            </div>
            <SurveyorTable />
           
        </AdaptableCard>
    )
}

export default SurveyorList
