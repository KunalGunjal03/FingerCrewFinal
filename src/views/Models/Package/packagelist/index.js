import React from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import PackageTable from 'views/Models/Package/packagelist/components/PackageTable'
import PackageTableTool from 'views/Models/Package/packagelist/components/PackageTableTools'

injectReducer('listsSurveyorList', reducer)

const Packagelist = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Package List</h3>
                <PackageTableTool />
            </div>
            <PackageTable/>           
        </AdaptableCard>
    )
}
export default Packagelist
