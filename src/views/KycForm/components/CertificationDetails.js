import React from 'react'
import {
    Input,
    Button,
    Checkbox,
    Select,
    FormItem,
    FormContainer,
    toast,
    Dialog,
    Notification
} from 'components/ui'
import { Field, Form, Formik, getIn } from 'formik'
import NumberFormat from 'react-number-format'
import {
    occupationOptions,
    annualIncomeOptions,
    sourceOfWealthOptions,
    noTinReasonOption,
} from '../constants'
import { countryList } from 'constants/countries.constant'
//import * as Yup from 'yup'
import {FiCheckCircle} from 'react-icons/fi'
import {  useDispatch ,useSelector} from 'react-redux'
import { useEffect, useState } from 'react'
//import { apiGetAccountFormData } from 'services/AccountServices'
import { getForm } from '../store/dataSlice'
import { useLocation, useParams } from 'react-router-dom'
//import {getEducation} from '../store/dataSlice'
import { getCertification } from '../store/dataSlice'
import { COMMANPATH } from 'constants/api.constant'
import * as Yup from 'yup'
import { text } from 'd3-fetch'
import { verifyCertificationDetails } from '../store/dataSlice'
const excludedOccupation = ['unemployed', 'student', 'retired']


const CertificationDetails
    = ({
    data = {
        certificate_name:'',
        certification_year:''
    },
    onNextChange,
    currentStepStatus,
}) => {
      
  //sakshi
//     const location = useLocation()
//     const {token,tokenKey} = useSelector((state) => state.auth.user)
//      useEffect(() => {
//          const path = location.pathname.substring(
//          location.pathname.lastIndexOf('/') + 1
//      )
//      const requestParam = {surveyor_master_id : path , 
//         token : token , 
//         tokenKey : tokenKey
//     }
        
 
//      fetchData(requestParam);
//  }, []);
//  const dispatch = useDispatch()
//  const fetchData = (requestParam) => {
//      try {
//         const Param = {
//             surveyor_master_id : requestParam.surveyor_master_id , 
//             token : token , 
//             tokenKey : tokenKey
//         }
//          
//        dispatch(getCertification( requestParam));
//       
//      } catch (error) {
//        console.error(error);
//        return error;
//      }
//    };
      
    const location = useLocation()
    const {token,tokenKey} = useSelector((state) => state.auth.user)
    const[SurveyorId,setSurveyorID] = useState([''])
    const [imageUrl, setImageUrl] = useState('');
    const [dialog1IsOpen,setIsOpen1] = useState(false)
     useEffect(() => {
         const path = location.pathname.substring(
         location.pathname.lastIndexOf('/') + 1
     )
     const requestParam = {surveyor_master_id : path ,
        token : token ,
        tokenKey : tokenKey
    }


     fetchData(requestParam);
 }, []);
 const dispatch = useDispatch()
 const fetchData = async (requestParam) => {
    try {
    console.log(requestParam)
    const SurveyorID = {surveyor_master_id:requestParam.surveyor_master_id}
    setSurveyorID(SurveyorID)
      const response = await dispatch(getCertification(requestParam));
      const imageFileName = COMMANPATH ;
      console.log(response.payload.getData)
      const data = response.payload.getData
      console.log(data)
      const imageFilePath = data.cerificate_path;
      const imagefile = data.certification_fileName;
      const imagefileextension = data.certification_extention;
        
       const finalfilepath= imageFileName + imageFilePath + imagefile + imagefileextension;
       setImageUrl(finalfilepath)
     console.log(finalfilepath)
    //   if (imageFilePath) {
    //     fetchImageFromServer(imageFilePath);
    //   }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };



    
   const formData = useSelector(
    (state) => state.accountDetailForm.data.formData.getData
)
console.log(formData)
const [dialogIsOpen, setIsOpen] = useState(false)
// const [setSubmitting] = useState(true)
const openNotification = (type,msg) => {
    toast.push(
        <Notification
            title={msg}
            type={type}
            
        />,{
            placement: 'top-end'
        })
            
       
    
}
const openDialog = () => {
    setIsOpen(true)
}
const OpenRejectionDialog = (e)=>{
    setIsOpen1(true)
}
const onDialog1Close = (e) => {
    setIsOpen(true)
     setIsOpen1(false)
     // setRejectionRemarkVisible(true)
 }

 const onDialogOk = async(status,values)=>{

    var verified = {}
  //   setIsOpen(true)
  //   setIsOpen1(true)
      
      try
      {
          // if(status === "Reject")
          // {
              verified = {surveyor_master_id : SurveyorId.surveyor_master_id,is_verified : "1",rejection_remarks: ''}
              console.log(verified)
             const  response = await dispatch(verifyCertificationDetails( verified));
              
          //     // const response =  VerifyPersonalDetails(verified)
              console.log(response.payload)
              const resp = response.payload
          //     // if(response)
          //     // {
                  openNotification('success',resp.remarks)
                  setIsOpen(false)
                  setIsOpen1(false)
                  setTimeout(() => {
                      onNextChange?.('personalInformation')
                   }, 500)
                 
   
          // }
          // else if(status === "Accept")
          // {
          //     verified = {surveyor_master_id : formData.surveyor_master_id,is_verified : "1",rejection_remarks: ''}
          //     console.log(verified)
          //     dispatch(verifyPersonalDetails( verified));
              
          //     // const response =  VerifyPersonalDetails(verified)
          //     // console.log(response)
          //     // if(response)
          //     // {
          //         openNotification('success')
          //         setIsOpen(false)
          //         setIsOpen1(false)
          //         setTimeout(() => {
          //             onNextChange?.('personalInformation')
          //          }, 500)
          //         setIsvalid(true)
          // }
          //           // }
      }
      catch(error)
      {
          console.error(error)
          return error;
      }
        // onNextChange?.(values, 'personalInformation', setSubmitting)
  }
// const onDiscard=(setSubmitting)=>{
//      onNextChange?.(values, 'personalInformation', setSubmitting)
// }

const onNext = async(values, setSubmitting) => {
    try{
        // const verified = {surveyor_master_id : formData.surveyor_master_id,is_verified : "1",rejection_remarks:""}
        // const response = await VerifyCertificationDetails(verified)
    //     // console.log(response)
        openDialog()
    //    setTimeout(() => {
    //        onNextChange?.('CertificationDetails', setSubmitting)
    //     }, 3000)
        //onNextChange?.(values, 'personalInformation', setSubmitting)
    }
    catch(error)
    {
        console.log(error)
    }
    
}
const [selectedCertificate, setSelectedCertificate] = useState(null);

const handleView = (item) => {
    console.log(item)
    setSelectedCertificate(item);
};
const validationSchema = Yup.object().shape({
    remark: Yup.string().required('Please enter your rejection remark')
    .matches(/^[aA-zZ0-9\s]+$/,'Special character not alowed!'),
})
const onDialogClose = (e) => {
    console.log(e)
 //    OpenRejectionDialog()
    
     setIsOpen(false)
     // setRejectionRemarkVisible(true)
 }
const onDialogReject = async(status,values)=>{
    try
    {
     console.log(status)
     console.log(values)
    const verified = {surveyor_master_id : SurveyorId.surveyor_master_id,is_verified : "0",rejection_remarks: values.remark}
     console.log(verified)
    const  response = await dispatch(verifyCertificationDetails( verified));
     
 //     // const response =  VerifyPersonalDetails(verified)
     console.log(response.payload)
     const resp = response.payload
 //     // if(response)
 //     // {
         openNotification('danger',resp.remarks)
         setIsOpen(false)
         setIsOpen1(false)
         setTimeout(() => {
             onNextChange?.('addressInformation')
          }, 500)
         
    }
    catch(error)
    {
     console.error(error)
     return error
    }
    
    
     
     
     
 }
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-2">Certification Details</h3>
                {/* <p>Basic information for an account opening</p> */}
            </div>
            <Formik
                initialValues={data}
                //enableReinitialize={true}
                // validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)
                    // setTimeout(() => {
                        onNext(values, setSubmitting)
                    // }, 1000)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => {
                    return (
                        <>
                        <Form>
                            <FormContainer>
                                
                           {Array.isArray(data) && data.length!== 0 ? (
                             data.map((item, index) => (
                             <div key={index}>
                              <FormItem>
                              <label>Certificate_name</label>

                                 <Field
                                type="text"
                                name={`certificate_name_${index}`}
                                component={Input}
                                value={item.certificate_name}
                                readOnly
                                />
                            <div className="mt-4"></div>
                             <Field
                             type="text"
                             name={`certification_year_${index}`}
                             component={Input}
                             value={item.certification_year}
                              readOnly
                             />
        
        {/* <Button size="xs">Extra Small (xs) </Button> */}
        {/* <Button size="xs" onClick={handleClick}>Extra Small (xs)</Button> */}
        {/* <button type="button" onClick={() => handleView(item)}>
          View
        </button>  */}<div className="mt-4"></div>
                     <Button
                    variant="custom"
                    type = "button  " // Replace 'custom' with the variant you want to use for the button design
                    size="xs"
                    onClick={() => handleView(item)}
                    >
                    View
                  </Button>

        {
        selectedCertificate === item && (
          <div className="certificate-modal">
            <div className="certificate-content">
            <img src={selectedCertificate.finalfilepath} alt="Certificate" />
              {/* <h3>Selected Certificate</h3>
              <p>Certificate Name: {item.certificate_name}</p>
              <p>Certification Year: {item.certification_year}</p> */}
              {/* Add additional fields or styling as needed */}
            </div>
            <div
              className="certificate-overlay"
              onClick={() => setSelectedCertificate(null)}
            ></div>
           
          </div>
        )}
      </FormItem>
    
    </div>

  ))
 
 ) : (
  <p>No data available.</p>
)}
                                    {Array.isArray(data) && data.length !== 0 && (
                                    <div className="flex justify-end gap-2">
                                    <Button
                                        //  loading={isSubmitting}
                                         variant="solid"
                                         type="submit"
                                         icon={<FiCheckCircle />}
                                     >
                                    Validate
                                     </Button>
                                  </div>
                                    )}
                            </FormContainer>
                        </Form>
                        </>
                    )
                }}
            </Formik>
            <Dialog
                isOpen={dialogIsOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <div className="flex flex-col h-full justify-between">
                    <h5 className="mb-4">Confirm Verification</h5>
                    <div className="max-h-96 overflow-y-auto">
                            <p> Are you want to validate certification details!!</p>
                    </div>
                    <div className="text-right mt-6">
                        <Button
                            className="ltr:mr-2 rtl:ml-2"
                            // variant="plain"
                            onClick={OpenRejectionDialog}
                        >
                            No
                        </Button>
                        <Button variant="solid" onClick={onDialogOk}>
                            Yes
                        </Button>
                    </div>
                </div>
            </Dialog>
            <Dialog
                isOpen={dialog1IsOpen}
                onClose={onDialog1Close}
                onRequestClose={onDialog1Close}
            >
                <div className="flex flex-col h-full justify-between">
                    <h5 className="mb-4">Certification Details Verification</h5>
                    <div className="max-h-96 overflow-y-auto px-2 ">
                            {/* <p> Enter Rejection remarks</p> */}
                        <Formik
                        initialValues={{
                            remark: ''
                            
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            onDialogReject('Reject',values)
                        }}
                        >
                        {({ touched, errors }) => (
                            <Form>
                                <FormContainer>
                                    <FormItem
                                     label="Rejection remark"
                                     invalid={errors.remark && touched.remark}
                                     errorMessage={errors.remark}
                                    >
                                         <Field
                                            name = "remark"
                                            component = {Input}
                                            type = {text}
                                            placeholder = "Enter rejection remarks here"
                                        />
                                    </FormItem>
                                    <div className="text-right mt-2">
                                    <Button
                                        className="ltr:mr-2 rtl:ml-2"
                                        // variant="plain"
                                        onClick={onDialog1Close}
                                    >
                                        Cancel
                                    </Button>
                                    <Button variant="solid" type="submit" onClick={onDialogReject}>
                                    Yes
                                    </Button>
                                </div>
                                </FormContainer>
                            </Form>
                        )}
                        </Formik>
                           
                    </div>
                    
                </div>
            </Dialog>
        </>
    )
}

export default CertificationDetails