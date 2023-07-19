import { AdaptableCard } from "components/shared"
import reducer from './store'
import RejectionTable from "./components/RejectionTable"
import { injectReducer } from 'store/index'
injectReducer('crmRejectionlist', reducer)
const RejectionList = ()=>{ 
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
    <div className="lg:flex items-center justify-between mb-4">
        <h3 className="mb-4 lg:mb-0">Rejection list</h3>
        
    </div>
    <RejectionTable/>
   
</AdaptableCard>
    )
    
}

export default RejectionList