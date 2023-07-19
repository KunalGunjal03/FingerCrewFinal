import React from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import CancelBlacklistTable from 'views/Suspend/CancelBlacklist/components/CancelBlacklistTable'
import CancelBlacklistTableTools from 'views/Suspend/CancelBlacklist/components/CancelBlacklistTableTools'

injectReducer('listsSurveyorList', reducer)

const CancelBlacklist = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Cancel BlackList</h3>
                <CancelBlacklistTableTools />
            </div>
            <CancelBlacklistTable/>         
        </AdaptableCard>
    )
}
export default CancelBlacklist