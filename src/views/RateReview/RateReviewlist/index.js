import React from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import RateReviewlistTable from 'views/RateReview/RateReviewlist/components/RateReviewlistTable'
import RateReviewTableTools from 'views/RateReview/RateReviewlist/components/RateReviewTableTools'

injectReducer('listsRateReviewList', reducer)

const RateReviewlist = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Rate And Review</h3>
                <RateReviewTableTools />
            </div>
            <RateReviewlistTable/>         
        </AdaptableCard>
    )
}
export default RateReviewlist