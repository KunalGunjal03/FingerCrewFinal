import React, { useEffect } from 'react'
// import { Loading, DoubleSidedImage } from 'components/shared'
// import { toast, Notification } from 'components/ui'
import { useDispatch, useSelector } from 'react-redux'
import reducer from './store'
import { injectReducer } from 'store/index'
import { useLocation, useNavigate } from 'react-router-dom'
import {  getServeyById } from './store/dataSlice'
import SurveyForm from '../SurveyForm'

// import isEmpty from 'lodash/isEmpty'

injectReducer('salesProductEdit', reducer)

const SurveyView = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    // const productData = useSelector(
    //     (state) => state.salesProductEdit.data.productData
    // )
    // const loading = useSelector((state) => state.salesProductEdit.data.loading)
    
    const fetchData = (data) => {
        try{
            dispatch(getServeyById(data))
        }
        catch(error)
        {
            console.error(error)
        }
        
    }

    // const handleFormSubmit = async (values, setSubmitting) => {
    //     setSubmitting(true)
    //     const success = await updateProduct(values)
    //     setSubmitting(false)
    //     if (success) {
    //         popNotification('updated')
    //     }
    // }

    const handleDiscard = () => {
        navigate('/Survey')
    }

    // const handleDelete = async (setDialogOpen) => {
    //     setDialogOpen(false)
    //     const success = await deleteProduct({ id: productData.id })
    //     if (success) {
    //         popNotification('deleted')
    //     }
    // }

    // const popNotification = (keyword) => {
    //     toast.push(
    //         <Notification
    //             title={`Successfuly ${keyword}`}
    //             type="success"
    //             duration={2500}
    //         >
    //             Product successfuly {keyword}
    //         </Notification>,
    //         {
    //             placement: 'top-center',
    //         }
    //     )
    //     navigate('/app/sales/product-list')
    // }
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
            {/* <Loading loading={loading}> */}
                {/* {!isEmpty(productData) && ( */}
                    <>
                        <SurveyForm
                            // type="edit"
                            // initialData={productData}
                            // onFormSubmit={handleFormSubmit}
                            onDiscard={handleDiscard}
                            // onDelete={handleDelete}
                        />
                    </>
                {/* )} */}
            {/* </Loading> */}
            {/* {!loading && isEmpty(productData) && (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="No product found!"
                    />
                    <h3 className="mt-8">No product found!</h3>
                </div>
            )} */}
        </>
    )
}

export default SurveyView
