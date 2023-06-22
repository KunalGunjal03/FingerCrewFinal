import React from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import UserTable from 'views/Models/lists/Userlist/components/UserTable'
import UserTableTools from 'views/Models/lists/Userlist/components/UserTableTools'

injectReducer('listsSurveyorList', reducer)

const UserList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">User List</h3>
                <UserTableTools />
            </div>
            <UserTable />
           
        </AdaptableCard>
    )
}

export default UserList
