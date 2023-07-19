import React from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import SuspendlistTable from 'views/Suspend/Suspendlist/components/SuspendlistTable'
import SuspendTableTools from 'views/Suspend/Suspendlist/components/SuspendTableTools'

injectReducer('listsSurveyorList', reducer)

const Suspendlist = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Suspend List</h3>
                <SuspendTableTools />
            </div>
            <SuspendlistTable/>         
        </AdaptableCard>
    )
}
export default Suspendlist