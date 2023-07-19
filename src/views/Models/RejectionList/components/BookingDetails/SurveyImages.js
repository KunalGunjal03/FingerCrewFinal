import React, { useState,lazy } from 'react'
import {
    AdaptableCard,
    ConfirmDialog,
    DoubleSidedImage,
} from 'components/shared'
import { FormItem, Dialog, Upload } from 'components/ui'
import { HiEye, HiTrash } from 'react-icons/hi'
import { Field } from 'formik'
import cloneDeep from 'lodash/cloneDeep'
const SurveyTabs = lazy(() => import('./SurveyTabs'))
const SurveyImages = ({
    data
}) => {
    console.log(data)
    return ( 
            <div>
               <SurveyTabs data = {data}/>
            </div>
        // <AdaptableCard className="mb-4" divider>
        //     <h5>Survey Images</h5>
        //     <FormItem>
        //     <Field name="">
        //     {({ field, form }) => {
                 
        //             return (
        //                 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        //                 {/* <ImageList
        //                     imgList={0}
        //                 /> */}
        //                 </div>
        //             )
        //          }
        //     }
        //         </Field>
        //     </FormItem>
        // </AdaptableCard>
    )
}
export default SurveyImages