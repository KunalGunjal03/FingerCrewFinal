import React, { useEffect, useMemo, lazy, Suspense } from 'react'
import { Container, AdaptableCard } from 'components/shared'
import FormStep from './components/FormStep'
import { useDispatch, useSelector } from 'react-redux'
import { getForm, setStepStatus, setFormData } from './store/dataSlice'
import { setCurrentStep } from './store/stateSlice'
import reducer from './store'
import { injectReducer } from 'store/index'
import { Card } from 'components/ui'

injectReducer('accountDetailForm', reducer)

const PersonalInformation = lazy(() =>
    import('./components/PersonalInformation')
)
 const KYCForm = lazy(() => import('./components/KYCForm'))
// const AddressDetails = lazy(() => import('./components/AddressDetails'))
// const EducationalQualificationDetails = lazy(() =>
//     import('./components/EducationalQualificationDetails')
// )
// const CertificationDetails = lazy(() =>
//     import('./components/CertificationDetails')
// )
// const PreviousExperienceDetails = lazy(() =>
//     import('./components/previousExperienceDetails')
// )

// const Skills = lazy(() => import ('./components/Skills'))
// const UploadDocuments = lazy(() => import ('./components/UploadDocuments'))
// const BankDetails = lazy(() =>
//      import('./components/BankDetails')
//  )
//  const BackgroundCheckDetails = lazy (()=> import('./components/BackgroundCheckDetails') )
//  const InsuranceDetails = lazy(()=> import ('./components/InsuranceDetails'))

const DetailForm = () => {
    const dispatch = useDispatch()
    const stepStatus = useSelector(
        (state) => state.accountDetailForm.data.stepStatus
    )
    
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
                [currentStep]: { status: 'complete' },
                [nextStep]: { status: 'current' },
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
    //console.log(currentStep)

    return (
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
                            {/*currentStep === 2 && (
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
                            )}  */}
                    
                             
                        
                        </Suspense>
                        </Card>
                    </div>
                    
                </div>
            </AdaptableCard>
        </Container>
    )
}

export default DetailForm
