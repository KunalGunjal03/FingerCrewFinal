import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { getBookServeyById } from './store/dataSlice'
import BookingDetails from '../BookingDetails'
const BookingView = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const fetchData = (data) => {
        try{
            dispatch(getBookServeyById(data))
        }
        catch(error)
        {
            console.error(error)
        }
        
    }
    const handleDiscard = () => {
        navigate('/Survey')
    }
    const {token,tokenKey} = useSelector((state) => state.auth.user)
    useEffect(() => {
        const path = location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1
        )
        
       
        const rquestParam = { id: path,token : token ,tokenKey :tokenKey }

        fetchData(rquestParam)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])
    return (
        <>
        <div>
            <BookingDetails/>
        </div>
            {/* <SurveyForm
                            // type="edit"
                            // initialData={productData}
                            // onFormSubmit={handleFormSubmit}
                            onDiscard={handleDiscard}
                            // onDelete={handleDelete}
                        /> */}
        </>
    )
}

export default BookingView 