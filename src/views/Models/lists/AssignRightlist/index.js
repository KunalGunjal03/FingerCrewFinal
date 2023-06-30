import React from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import AssignRightTable from 'views/Models/lists/AssignRightlist/components/AssignRightTable'
import UserTableTools from 'views/Models/lists/AssignRoleslist/components/AssignTableTools'

injectReducer('listsRightslist', reducer)

const AssignRightlist = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Assign Right List</h3>
                <UserTableTools />
            </div>
            <AssignRightTable/>           
        </AdaptableCard>
    )
}
export default AssignRightlist
