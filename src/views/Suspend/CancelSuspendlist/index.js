import React from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import CancelSuspendlistTable from 'views/Suspend/CancelSuspendlist/components/CancelSuspendlistTable'
import SuspendTableTools from 'views/Suspend/Suspendlist/components/SuspendTableTools'

injectReducer('listsSurveyorList', reducer)

const CancelBlacklist = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Cancel Suspend List</h3>
                <SuspendTableTools />
            </div>
            <CancelSuspendlistTable/>         
        </AdaptableCard>
    )
}
export default CancelBlacklist