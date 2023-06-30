import React, { useState } from 'react'
import { Steps } from 'components/ui'

const SurveyProgress = () => {
    const [step, setStep] = useState(1)

    const onStepChange = (index) => {
        setStep(index)
    }

    return (
        <div>
            <Steps current={step} onChange={(index) => onStepChange(index)}>
                <Steps.Item title="" />
                <Steps.Item title="" />
                <Steps.Item title="" />
                <Steps.Item title="Verified" />
            </Steps>
        </div>
    )
}

export default SurveyProgress