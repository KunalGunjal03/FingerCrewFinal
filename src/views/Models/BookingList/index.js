import BookingTable from "./components/BookingTable"
import reducer from './store'
import { AdaptableCard } from "components/shared"
import { injectReducer } from 'store/index'


injectReducer('crmBookinglist', reducer)
const BookingList = () =>{
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Survey booking list</h3>
                
            </div>
            <BookingTable />
           
        </AdaptableCard>
    )
}

export default BookingList