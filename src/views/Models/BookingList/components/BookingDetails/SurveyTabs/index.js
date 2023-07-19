import React, { useEffect, useMemo, lazy, Suspense } from 'react'
import { Container, AdaptableCard } from 'components/shared'
import FormStep from './components/FormStep'
import { useDispatch, useSelector } from 'react-redux'
import { getForm, setStepStatus, setFormData } from './store/dataSlice'
import { setCurrentStep } from './store/stateSlice'
import reducer from './store'
import { injectReducer } from 'store/index'
import { Card } from 'components/ui'
import { useLocation } from 'react-router-dom'
import { getSurveyDetails } from './store/dataSlice'
injectReducer('surveyDetailForm', reducer)

const SurveyBasicDetails = lazy(() =>
    import('./components/SurveyBasicDetails')
)
const ElectricDetails = lazy(()=> import('./components/ElectriceDetails') )
const RoofStructure = lazy(()=> import('./components/RoofStructure'))
const ExistingPVDetails = lazy(()=> import('./components/ExistingPvDetails'))
const SurveyTabs = () =>{
    
    const dispatch = useDispatch()
    const {token,tokenKey} = useSelector((state) => state.auth.user)
    const location = useLocation()
    const stepStatus = useSelector(
        (state) => state.surveyDetailForm.data.stepStatus
    )
    
    const currentStep = useSelector(
        (state) => state.surveyDetailForm.state.currentStep
    )
    const data = useSelector((state) => state.surveyDetailForm?.data?.BookingDetails?.getData)
    console.log(data)
    const formData = useSelector(
        (state) => state.surveyDetailForm.data.formData.getData
    )
    useEffect(() => {
        const path = location.pathname.substring(
        location.pathname.lastIndexOf('/') + 1
    )
    const requestParam = {survey_no : path , 
       token : token , 
       tokenKey : tokenKey
   }
       console.log(requestParam)
    fetchData(requestParam);
}, []);
const fetchData = (requestParam) => {
    try {
      dispatch(getSurveyDetails( requestParam));
      //console.log(surveyor_master_id)
      
    } catch (error) {
      console.error(error);
      return error;
    }
};
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
    return(
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
                            <SurveyBasicDetails
                                data={data}
                                    onNextChange={handleNextChange}
                                    currentStepStatus={currentStepStatus}
                            />
                        )}
                        {currentStep === 1 && (
                            <ElectricDetails
                                data={0}
                                    onNextChange={handleNextChange}
                                    currentStepStatus={currentStepStatus}
                            />
                        )}
                        {currentStep === 2 && (
                            <RoofStructure
                                data={0}
                                    onNextChange={handleNextChange}
                                    currentStepStatus={currentStepStatus}
                            />
                        )}
                        {currentStep === 3 && (
                            <ExistingPVDetails
                                data={0}
                                    onNextChange={handleNextChange}
                                    currentStepStatus={currentStepStatus}
                            />
                        )}
                       
                        
                
                         
                    
                    </Suspense>
                    </Card>
                </div>
                
            </div>
        </AdaptableCard>
    </Container>
    )
}

export default SurveyTabs