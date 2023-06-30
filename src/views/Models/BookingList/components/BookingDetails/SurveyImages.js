import React, { useState } from 'react'
import {
    AdaptableCard,
    ConfirmDialog,
    DoubleSidedImage,
} from 'components/shared'
import { FormItem, Dialog, Upload } from 'components/ui'
import { HiEye, HiTrash } from 'react-icons/hi'
import { Field } from 'formik'
import cloneDeep from 'lodash/cloneDeep'

// const ImageList = (props) => {
//     const { imgList } = props
//     const [selectedImg, setSelectedImg] = useState({})
//     const [viewOpen, setViewOpen] = useState(false)

//     const onViewOpen = (img) => {
//         setSelectedImg(img)
//         setViewOpen(true)
//     }

//     const onDialogClose = () => {
//         setViewOpen(false)
//         setTimeout(() => {
//             setSelectedImg({})
//         }, 300)
//     }
//     return (
//         <>
//          {imgList.map((img) => (
//                 <div
//                     className="group relative rounded border p-2 flex"
//                     key={0}
//                 >
//                     <img
//                         className="rounded max-h-[140px] max-w-full"
//                         src={0}
//                         alt={0}
//                     />
//                     <div className="absolute inset-2 bg-gray-900/[.7] group-hover:flex hidden text-xl items-center justify-center">
//                         <span
//                             onClick={() => onViewOpen(img)}
//                             className="text-gray-100 hover:text-gray-300 cursor-pointer p-1.5"
//                         >
//                             <HiEye />
//                         </span>
//                     </div>
//                 </div>
//             ))}
//               <Dialog
//                 isOpen={viewOpen}
//                 onClose={onDialogClose}
//                 onRequestClose={onDialogClose}
//             >
//                 <h5 className="mb-4">{0}</h5>
//                 <img
//                     className="w-full"
//                     src={0}
//                     alt={0}
//                 />
//             </Dialog>
//         </>
//     )
// }
const SurveyImages = (props) => {
    const { values } = props
    return ( 
            <div>
                Survey Images
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