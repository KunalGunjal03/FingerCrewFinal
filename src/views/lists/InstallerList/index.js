import React from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
//import ProductTable from './components/ProductTable'
//import SurveyorTable from './components/SurveyorTable'
import InstallerTable from './components/InstallerTable'


injectReducer('listsInstallerList', reducer)

const InstallerList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Installer registration list</h3>
                
            </div>
            <InstallerTable/>
           
        </AdaptableCard>
    )
}

export default InstallerList
