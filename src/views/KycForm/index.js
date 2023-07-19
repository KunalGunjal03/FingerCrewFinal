import React, { useEffect, useMemo, lazy,useState, Suspense } from 'react'
import { Container, AdaptableCard } from 'components/shared'
import FormStep from './components/FormStep'
import { useDispatch, useSelector } from 'react-redux'
import { getForm, setStepStatus, setFormData } from './store/dataSlice'
import { setCurrentStep } from './store/stateSlice'
import reducer from './store'
import { injectReducer } from 'store/index'
import { Card,Button,Dialog,toast,Notification } from 'components/ui'
import {StickyFooter} from 'components/shared'
import { FiCheckCircle } from 'react-icons/fi'
import { getVerificationDetails } from './store/dataSlice'
import { useLocation ,useNavigate} from 'react-router-dom'
import { MdArrowBackIosNew } from 'react-icons/md'
// import { Breadcrumbs } from '@material-tailwind/react'
injectReducer('accountDetailForm', reducer)

const PersonalInformation = lazy(() =>
    import('./components/PersonalInformation')
)
const KYCForm = lazy(() => import('./components/KYCForm'))
const AddressDetails = lazy(() => import('./components/AddressDetails'))
const EducationalQualificationDetails = lazy(() =>
    import('./components/EducationalQualificationDetails')
)
const CertificationDetails = lazy(() =>
    import('./components/CertificationDetails')
)
const PreviousExperienceDetails = lazy(() =>
    import('./components/previousExperienceDetails')
)

const Skills = lazy(() => import ('./components/Skills'))
const UploadDocuments = lazy(() => import ('./components/UploadDocuments'))
const BankDetails = lazy(() =>
     import('./components/BankDetails')
 )
 const BackgroundCheckDetails = lazy (()=> import('./components/BackgroundCheckDetails') )
 const InsuranceDetails = lazy(()=> import ('./components/InsuranceDetails'))

const DetailForm = () => {
    const [SurveyorID, setSurveyorID] = useState(false)
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const stepStatus = useSelector(
        (state) => state.accountDetailForm.data.stepStatus
    )
    const [dialogIsOpen, setIsOpen] = useState(false)
    const openNotification = (type,msg) => {
        toast.push(
            <Notification
                title={msg}
                type={type}

            />,{
                placement: 'top-end'
            })



    }
    const currentStep = useSelector(
        (state) => state.accountDetailForm.state.currentStep
    )

    const formData = useSelector(
        (state) => state.accountDetailForm.data.formData.getData
    )
    
    const response = useSelector(
        (state) => state.accountDetailForm.data
    )
    console.log(response)
    useEffect(() => {
        // dispatch(getForm())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleNextChange = (values, name) => {
        const nextStep = currentStep + 1
        dispatch(setFormData({ [name]: values }))
        dispatch(
            setStepStatus({
                [currentStep]: { status: 'verify' },
                [nextStep]: { status: 'verified' },
            })
        )

        dispatch(setCurrentStep(nextStep))
    }

    const handleBackChange = () => {
        const previousStep = currentStep - 1
        dispatch(setCurrentStep(previousStep))
    }

    const currentStepStatus = useMemo(
        () => stepStatus[currentStep].status,
        [stepStatus, currentStep]
    )
    const openDialog = (e) => {

        setIsOpen(true)

    }
    const onDialogClose = (e) => {
        console.log(e)
     //    OpenRejectionDialog()

         setIsOpen(false)
         // setRejectionRemarkVisible(true)
     }
     const OpenRejectionDialog = (e)=>{
        setIsOpen(false)
    }
    useEffect(() => {
        const path = location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1
        )


        const rquestParam = { surveyor_master_id : path }
        setSurveyorID(rquestParam)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])
    const onDialogOk = async(status,values)=>{

        var verified = {}
      //   setIsOpen(true)
      //   setIsOpen1(true)
        //   console.log('OK')
          try
          {
              // if(status === "Reject")
              // {
                //   verified = {surveyor_master_id : formData.surveyor_master_id}
                //   console.log(verified)
                console.log(SurveyorID)
                 const  response = await dispatch(getVerificationDetails ( SurveyorID));

            //   //     // const response =  VerifyPersonalDetails(verified)

                  const resp = response.payload
                  console.log(resp)
            //   //     // if(response)
            //   //     // {
            //           openNotification('success',resp.remarks)
            //           setIsOpen(false)
            //           setIsOpen1(false)
            //           setTimeout(() => {
            //               onNextChange?.('personalInformation')
            //            }, 500)


              // }
              // else if(status === "Accept")
              // {
              //     verified = {surveyor_master_id : formData.surveyor_master_id,is_verified : "1",rejection_remarks: ''}
              //     console.log(verified)
              //     dispatch(verifyPersonalDetails( verified));

              //     // const response =  VerifyPersonalDetails(verified)
              //     // console.log(response)
                  if(resp)
                  {
                    if(resp.status === "Failed")
                    {
                      openNotification('warning',resp.remarks)
                      setIsOpen(false)
                    }
                    else if(resp.status === "Success")
                    {
                        openNotification('success',resp.remarks)
                        setIsOpen(false)
                        setTimeout(() => {
                            navigate('/registrationlist')
                           }, 500)
                    }



                   

                    }
              //           // }
          }
          catch(error)
          {
              console.error(error)
              return error;
          }
            // onNextChange?.(values, 'personalInformation', setSubmitting)
      }
      const onBackClick = ()=>{
        
        try{
            navigate('/registrationlist')
        }
        catch(error)
        {
            console.error(error)
        }
    }
console.log(stepStatus)
    return (
        <div className="grid grid-cols-6 gap-2">
            {/* <Breadcrumbs>
        <a href="#"     >
            <span>Dashboard</span>
        </a>
        
            <span>Registration list</span>
        
        <span>Surveyor Verification</span>
        </Breadcrumbs> */}
        <div className="col-end-7 col-span-2 flex justify-end">
        
        <Button
                                        // loading={isSubmitting}
                                        // variant="solid"
                                        type="submit"
                                        size="md"
                                        icon = {<MdArrowBackIosNew/>}
                                        variant="twoTone"
                                        onClick = {onBackClick}
                                    >
                                    Back
                                    </Button>
        </div>
        <div className="col-start-1 col-end-7">
        <Container className="h-full">
            <AdaptableCard className="h-full" bodyClass="h-full">
                <div className="grid lg:grid-cols-5 xl:grid-cols-3 2xl:grid-cols-5 gap-4 h-full">
                    {currentStep !== 11 && (
                        <div className="2xl:col-span-1 xl:col-span-1 lg:col-span-4">
                            <FormStep
                                currentStep={currentStep}
                                currentStepStatus={currentStepStatus}
                                stepStatus={stepStatus}
                            />
                        </div>
                    )}

                    <div
                        className={
                            currentStep !== 11
                                ? '2xl:col-span-4 lg:col-span-3 xl:col-span-2 ml-5'
                                : 'lg:col-span-5'
                        }
                    >
                        <Card className = 'ml-5'>
                        <Suspense fallback={<></>}>
                            {currentStep === 0 && (
                                <PersonalInformation
                                    data={formData}
                                    onNextChange={handleNextChange}
                                    currentStepStatus={currentStepStatus}
                                />
                            )}
                            {currentStep === 1 && (
                                <KYCForm
                                    data={formData}
                                    onNextChange={handleNextChange}
                                    onBackChange={handleBackChange}
                                    currentStepStatus={currentStepStatus}
                                />
                            )}
                            {currentStep === 2 && (
                                <AddressDetails
                                    data={formData}
                                    onNextChange={handleNextChange}
                                    onBackChange={handleBackChange}
                                    currentStepStatus={currentStepStatus}
                                />
                            )}
                            {currentStep === 3 && (
                                <EducationalQualificationDetails
                                    data={formData}
                                    onNextChange={handleNextChange}
                                    onBackChange={handleBackChange}
                                    currentStepStatus={currentStepStatus}
                                />
                            )}
                            {currentStep === 4 && (
                                <CertificationDetails
                                    data={formData}
                                    onNextChange={handleNextChange}
                                    onBackChange={handleBackChange}
                                    currentStepStatus={currentStepStatus}
                                />
                            )}
                             {currentStep === 5 && (
                                <PreviousExperienceDetails
                                    data={formData}
                                    onNextChange={handleNextChange}
                                    onBackChange={handleBackChange}
                                    currentStepStatus={currentStepStatus}
                                />
                            )}
                            {currentStep === 6 && (
                                <Skills
                                    data={formData}
                                    onNextChange={handleNextChange}
                                    onBackChange={handleBackChange}
                                    currentStepStatus={currentStepStatus}
                                />
                            )}
                             {currentStep === 7 && (
                                <BankDetails
                                    data={formData}
                                    onNextChange={handleNextChange}
                                    onBackChange={handleBackChange}
                                    currentStepStatus={currentStepStatus}
                                />
                            )}

                             {currentStep === 8 && (
                                <UploadDocuments
                                    data={formData}
                                    onNextChange={handleNextChange}
                                    onBackChange={handleBackChange}
                                    currentStepStatus={currentStepStatus}
                                />
                            )}
                              {currentStep === 9 && (
                                <InsuranceDetails
                                    data={formData}
                                    onNextChange={handleNextChange}
                                    onBackChange={handleBackChange}
                                    currentStepStatus={currentStepStatus}
                                />
                            )}
                              {currentStep === 10 && (
                                <BackgroundCheckDetails
                                    data={formData}
                                    onNextChange={handleNextChange}
                                    onBackChange={handleBackChange}
                                    currentStepStatus={currentStepStatus}
                                />
                            )}

                        </Suspense>
                        </Card>
                    </div>

                </div>

            </AdaptableCard>
            {currentStep === 10 && (
                 <StickyFooter
                                className="-mx-8 px-8 flex items-center justify-between py-4 mb-4"
                                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            >
                                <div>

                                </div>
                                <div className="md:flex items-center">

                                    <Button
                                        size="md"
                                        variant="solid"
                                        // loading={isSubmitting}
                                         icon={<FiCheckCircle />}
                                        onClick={() => openDialog()}
                                        type="submit"
                                    >
                                        Final Verification
                                    </Button>
                                </div>
                            </StickyFooter>
            )}
            <Dialog
                isOpen={dialogIsOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}

            >
                <div className="flex flex-col h-full justify-between">
                    <h5 className="mb-4">Confirm Verification</h5>
                    <div className="max-h-96 overflow-y-auto">
                            <p> Are you want to verify all details!!</p>
                    </div>
                    <div className="text-right mt-6">
                        <Button
                            className="ltr:mr-2 rtl:ml-2"
                            // variant="plain"
                            onClick={OpenRejectionDialog}
                        >
                            No
                        </Button>
                        <Button variant="solid"
                         onClick = {onDialogOk}
                          >
                            Yes
                        </Button>
                    </div>
                </div>

            </Dialog>
        </Container>
        </div>
        </div>
    )
}

export default DetailForm
