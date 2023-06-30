import React from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import AssignRoleTable from 'views/Models/lists/AssignRoleslist/components/AssignRoleTable'
import UserTableTools from 'views/Models/lists/AssignRoleslist/components/AssignTableTools'

injectReducer('listsSurveyorList', reducer)

const AssignRoleslist = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Assign Role List</h3>
                <UserTableTools />
            </div>
            <AssignRoleTable/>           
        </AdaptableCard>
    )
}
export default AssignRoleslist
