import React from 'react'
import { useDispatch } from 'react-redux'
import { Menu } from 'components/ui'
import { HiCheckCircle } from 'react-icons/hi'
import useThemeClass from 'utils/hooks/useThemeClass'
import { setCurrentStep } from '../store/stateSlice'
import { setStepStatus } from '../store/dataSlice'
import { BiCaretRight } from "react-icons/bi";

const steps = [
    { label: 'Personal Information', value: 0},
    { label: 'KYCForm', value: 1 },
    { label: 'Address Details', value: 2 },
    { label: 'Qualification Details', value: 3 },
    { label:'Certification Details',value: 4},
    { label:'Experience Details',value:5},
    {label:'Skills',value:6},
    {label:'Bank Details',value:7},
    {label:'Uploaded Documents',value:8 },
    {label: 'Insurance Details', value:9},
    {label:'Background Check Details',value:10}
    
]

const FormStep = ({ currentStep, currentStepStatus, stepStatus }) => {
    const { textTheme } = useThemeClass()
    const dispatch = useDispatch()

    const onStepChange = (step) => {
        const selectedStepStatus = stepStatus[step].status

        dispatch(setStepStatus('complete'))
        dispatch(setCurrentStep(step))
        // if (
        //     // selectedStepStatus === 'complete' ||
        //     selectedStepStatus === 'current'
        // ) {
        //     dispatch(setCurrentStep(step))
        //     return
        // }

        // if (step !== currentStep && step < currentStep) {
        //     if (currentStepStatus === 'pending') {
        //         dispatch(setStepStatus('complete'))
        //     }
        //     dispatch(setCurrentStep(step))
        // }
    }

    return (
        <Menu variant="transparent" className="px-2">
            {steps.map((step) => (
                <Menu.MenuItem
                    key={step.value}
                    eventKey={step.value.toString()}
                    className={`mb-2`}
                    onClick={() => onStepChange(step.value)}
                    isActive={currentStep === step.value}
                >
                    <span className="text-2xl ltr:mr-2 rtl:ml-2">
                        {/* {stepStatus[step.value].status === 'complete' && (
                            <HiCheckCircle className={textTheme} />
                        )}
                        {stepStatus[step.value].status === 'current' && (
                            <HiCheckCircle className="text-gray-400" />
                        )} */}
                        {/* {stepStatus[step.value].status === 'pending' &&
                            currentStep === step.value && (
                                <HiCheckCircle className="text-gray-400" />
                            )} */}
                        {/* {stepStatus[step.value].status === 'pending' &&
                            currentStep !== step.value && (
                                <HiLockClosed className="text-gray-400" />
                            )} */}
                        {/* {stepStatus[step.value].status === 'invalid' && (
                            <HiCheckCircle className="text-gray-400" />
                        )} */}
                        <BiCaretRight/>
                    </span>
                    <span>{step.label}</span>
                </Menu.MenuItem>
            ))}
        </Menu>
    )
}

export default FormStep
