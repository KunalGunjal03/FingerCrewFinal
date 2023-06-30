import React from "react";
import { AdaptableCard } from 'components/shared'
import SampleList from "./components/SampleList";
const SampleListData = () => {
    
    return (
        <>
         <h3 className="mb-4">Survey List </h3>
            
            <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
            </div>
            Dashboard
                {/* <SampleList /> */}
            </AdaptableCard>
        </>

        
    )
}
export default SampleListData