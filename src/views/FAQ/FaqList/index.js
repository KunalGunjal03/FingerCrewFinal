import React from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import FaqlistTable from 'views/FAQ/FaqList/components/FaqlistTable'
import FaqTableTools from 'views/FAQ/FaqList/components/FaqTableTools'

injectReducer('listsSurveyorList', reducer)

const Faqlist = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">FAQ</h3>
                <FaqTableTools />
            </div>
            <FaqlistTable/>         
        </AdaptableCard>
    )
}
export default Faqlist