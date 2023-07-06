import React from 'react'
import { useDispatch } from 'react-redux'
import { Menu } from 'components/ui'
import { HiCheckCircle } from 'react-icons/hi'
import useThemeClass from 'utils/hooks/useThemeClass'
import { setCurrentStep } from '../store/stateSlice'
import { setStepStatus } from '../store/dataSlice'
import { BiCaretRight } from "react-icons/bi";

const steps = [
    { label: 'Survey Details', value: 0},
     { label: 'Electric Details', value: 1 },
     { label: 'Roof Structure Details', value: 2 },
     { label: 'Existing PV Details', value: 3 },
    
]

const FormStep = ({ currentStep, currentStepStatus, stepStatus }) => {
    const { textTheme } = useThemeClass()
    const dispatch = useDispatch()

    const onStepChange = (step) => {
        console.log(step)
        const selectedStepStatus = stepStatus[step].status

        dispatch(setStepStatus('complete'))
        dispatch(setCurrentStep(step))

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
                        <BiCaretRight/>
                    </span>
                    <span>{step.label}</span>
                </Menu.MenuItem>
            ))}
        </Menu>
    )
}

export default FormStep
