import React from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import BlacklistTable from 'views/Suspend/blacklist/components/blacklistTable'
import BlacklistTableTools from 'views/Suspend/blacklist/components/BlacklistTableTools'

injectReducer('listsSurveyorList', reducer)

const Blacklist = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Blacklist List</h3>
                <BlacklistTableTools />
            </div>
            <BlacklistTable/>         
        </AdaptableCard>
    )
}
export default Blacklist
