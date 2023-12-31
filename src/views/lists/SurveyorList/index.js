import React from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
//import ProductTable from './components/ProductTable'
import SurveyorTable from 'views/lists/SurveyorList/components/SurveyorTable'


injectReducer('listsSurveyorList', reducer)

const SurveyorList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Surveyor Registration request list</h3>
                
            </div>
            <SurveyorTable />
           
        </AdaptableCard>
    )
}

export default SurveyorList
