import React, { forwardRef, useState } from 'react'
import { FormContainer, Button, hooks,Dialog,Notification,toast } from 'components/ui'
import { StickyFooter, ConfirmDialog } from 'components/shared'
import { Form, Formik } from 'formik'
import BasicInformationFields from './BasicInformationFields'

import SurveyImages from './SurveyImages'
import cloneDeep from 'lodash/cloneDeep'
import { HiOutlineTrash } from 'react-icons/hi'
import { AiOutlineSave } from 'react-icons/ai'
import {BiArrowBack} from 'react-icons/bi'
import * as Yup from 'yup'
import SurveyorProfile from './SurveyorProfile'
import ClientInfo from './ClientInfo'
import { FcApproval } from "react-icons/fc"
import {FiCheckCircle} from 'react-icons/fi'

import SurveyProgress from './ProgressBar'
const { useUniqueId } = hooks

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Product Name Required'),
    price: Yup.number().required('Price Required'),
    stock: Yup.number().required('SKU Required'),
    category: Yup.string().required('Category Required'),
})

const SurveyForm = forwardRef((props, ref) => {
    const { type, initialData, onFormSubmit, onDiscard, onDelete } = props

    const newId = useUniqueId('product-')
    const [dialogIsOpen, setIsOpen] = useState(false)

    const openNotification = (type) => {
        toast.push(
            <Notification
                title={type.charAt(0).toUpperCase() + type.slice(1)}
                type={type}
            >
                Survey No.-: 21321 is Verified Successfuly.
            </Notification>
        )
    }
    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = (e) => {
        console.log('onDialogClose', e)
        setIsOpen(false)
    }

    const onDialogOk = (e) => {
        openNotification('success')
        setIsOpen(false)
        onDiscard()
    }
    // const HandleVerify = () => {
    //     console.log("KUNAL")
    // }
    
    return (
        <>
            <Formik
                innerRef={ref}
                initialValues={{
                    ...initialData,
                    tags: initialData?.tags
                        ? initialData.tags.map((value) => ({
                              label: value,
                              value,
                          }))
                        : [],
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    const formData = cloneDeep(values)
                    formData.tags = formData.tags.map((tag) => tag.value)
                    if (type === 'new') {
                        formData.id = newId
                        if (formData.imgList.length > 0) {
                            formData.img = formData.imgList[0].img
                        }
                    }
                    onFormSubmit?.(formData, setSubmitting)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <div className="lg:col-span-3 ">
                                    <SurveyProgress />
                                </div>
                                <div className="lg:col-span-2">
                                <BasicInformationFields
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                    />
                                    
                                    
                                </div>
                                <div className="lg:col-span-1">
                                <SurveyImages/>
                                
                                  
                                </div>
                                <div className="lg:col-span-1">
                                <SurveyorProfile/>
                                </div>
                                <div className= "lg:col-span-1">
                                <ClientInfo/>
                                    
                                </div>
                                
                                    
                            </div>
                                
                            <StickyFooter
                                className="-mx-8 px-8 flex items-center justify-between py-4"
                                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            >
                                <div>
                                    {/* {type === 'edit' && (
                                        <DeleteProductButton
                                            onDelete={onDelete}
                                        />
                                    )} */}
                                </div>
                                <div className="md:flex items-center">
                                    <Button
                                        size="md"
                                        className="ltr:mr-3 rtl:ml-3"
                                        onClick={() => onDiscard?.()}
                                        // icon = {<BiArrowBack/>}
                                        type="button"
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        size="md"
                                        variant="solid"
                                        loading={isSubmitting}
                                         icon={<FiCheckCircle />}
                                        onClick={() => openDialog()}
                                        type="submit"
                                    >
                                        Verify
                                    </Button>
                                </div>
                            </StickyFooter>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
            <Dialog
                isOpen={dialogIsOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <div className="flex flex-col h-full justify-between">
                    <h5 className="mb-4">Confirm Verification</h5>
                    <div className="max-h-96 overflow-y-auto">
                        <p>
                            Survey No. -: 1314171
                        </p>
                        <p>
                            Surveyor Name -: kunal
                        </p>
                        <p>
                            Installer Name - : kunal
                        </p>
                    </div>
                    <div className="text-right mt-6">
                        <Button
                            className="ltr:mr-2 rtl:ml-2"
                            // variant="plain"
                            onClick={onDialogClose}
                        >
                            Cancel
                        </Button>
                        <Button variant="solid" onClick={onDialogOk}>
                            Confirm
                        </Button>
                    </div>
                </div>
            </Dialog>
        </>
    )
})

SurveyForm.defaultProps = {
    type: 'edit',
    initialData: {
        id: '',
        name: '',
        productCode: '',
        img: '',
        imgList: [],
        category: '',
        price: 0,
        stock: 0,
        status: 0,
        costPerItem: 0,
        bulkDiscountPrice: 0,
        taxRate: 6,
        tags: [],
        brand: '',
        vendor: '',
        description: '',
    },
}

export default SurveyForm
