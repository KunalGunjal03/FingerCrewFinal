import React from 'react'
import { AdaptableCard, RichTextEditor } from 'components/shared'
import {Card} from 'components/ui'
import { Input, FormItem } from 'components/ui'
import { Field } from 'formik'

import SurveyTableDetails from './SurveyTableDetails'
const BasicInformationFields = (props) => {
    const { touched, errors } = props

    return (
        <AdaptableCard className="mb-4" divider>
            <h5>Survey Information</h5>
            <p className="mb-7"></p>
            <SurveyTableDetails/>
        </AdaptableCard>
    )
}

export default BasicInformationFields
