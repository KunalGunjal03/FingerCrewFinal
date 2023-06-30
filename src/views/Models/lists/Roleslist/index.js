import React from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import RoleTable from 'views/Models/lists/Roleslist/components/RoleTable'
import UserTableTools from 'views/Models/lists/Roleslist/components/UserTableTools'

injectReducer('listsSurveyorList', reducer)

const Roleslist = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Role List</h3>
                <UserTableTools />
            </div>
            <RoleTable/>
           
        </AdaptableCard>
    )
}

export default Roleslist
