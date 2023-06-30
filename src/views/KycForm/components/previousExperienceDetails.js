import React from 'react'
import {
    Input,
    InputGroup,
    Button,
    DatePicker,
    //Select,
    FormItem,
    FormContainer,
    Table,
    toast,
    Notification,
    Dialog

} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import NumberFormat from 'react-number-format'
// import { countryList } from 'constants/countries.constant'
// import { statusOptions } from '../constants'
import { components } from 'react-select'
//import {useSelector} from 'react'
// import * as Yup from 'yup'
import {  useDispatch ,useSelector} from 'react-redux'
import { useEffect, useState } from 'react'
//import { apiGetAccountFormData } from 'services/AccountServices'
import { getPreviousExp } from '../store/dataSlice'
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { useLocation } from 'react-router-dom'

import {FiCheckCircle} from 'react-icons/fi'
import { VerifyPreviousExp } from 'services/VerificationServices'
import { text } from 'd3-fetch'
import { verifyExperienceDetails } from '../store/dataSlice'
import * as Yup from 'yup'
const { Tr, Th, Td, THead, TBody, Sorter } = Table

const columns = [
    // {
    //     header: 'Sr.No',
    //     accessorKey: 'experience_details_id',
    //     cell: (props) => {
    //         const row = props.row.original
    //         return (
    //             <div>
    //                 <span className="cursor-pointer">{row.experience_details_id}</span>
    //             </div>
    //         )
    //     },
    // },
    {
        header: 'Company name',
        accessorKey: 'company_name',
    },
    {
        header: 'Role',
        accessorKey: 'job_role',
    },
    {
        header: 'From',
        accessorKey: 'yearFrom',
        
    },
    {
        header: 'To',
        accessorKey: 'yearTo',
    
    },
]

const PreviousExperienceDetails = ({
    data = {
        experience_details_id:'',
        company_name:'',
        job_role:'',
        yearFrom:'',
        yearTo:''
    },
    onNextChange,
    currentStepStatus,
}) => {
    
    const location = useLocation()
    const {token,tokenKey} = useSelector((state) => state.auth.user)
    const[SurveyorId,setSurveyorID] = useState([''])
     useEffect(() => {
         const path = location.pathname.substring(
         location.pathname.lastIndexOf('/') + 1
     )
     const requestParam = {surveyor_master_id : path , 
        token : token , 
        tokenKey : tokenKey
    }
        
 
     fetchData(requestParam);
 }, []);
 const dispatch = useDispatch()
 const fetchData = (requestParam) => {
    try {
        const SurveyorID = {surveyor_master_id:requestParam.surveyor_master_id}
        setSurveyorID(SurveyorID)
      dispatch(getPreviousExp( requestParam));
      
      
    } catch (error) {
      console.error(error);
      return error;
    }
  };
   
    // const onNext = (values, setSubmitting) => {
    //     onNextChange?.(values, 'personalInformation', setSubmitting)
    // }
    console.log(data)
    const [sorting, setSorting] = React.useState([])
    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })
    const [dialogIsOpen, setIsOpen] = useState(false)
const [dialog1IsOpen,setIsOpen1] = useState(false)
const openNotification = (type,msg) => {
    toast.push(
        <Notification
            title={msg}
            type={type}
            
        />,{
            placement: 'top-end'
        })
            
       
    
}
const openDialog = (e) => {
    setIsOpen(true)

}
const OpenRejectionDialog = (e)=>{
    setIsOpen1(true)
}
const onDialogClose = (e) => {
   console.log(e)
//    OpenRejectionDialog()
   
    setIsOpen(false)
    // setRejectionRemarkVisible(true)
}
const onDialog1Close = (e) => {
    setIsOpen(true)
     setIsOpen1(false)
     // setRejectionRemarkVisible(true)
 }
// let isVerified = false;
const onDialogOk = async(status,values)=>{

  var verified = {}
//   setIsOpen(true)
//   setIsOpen1(true)
    
    try
    {
        // if(status === "Reject")
        // {
            verified = {surveyor_master_id : SurveyorId.surveyor_master_id,is_verified : "1",rejection_remarks: ''}
            console.log(verified)
           const  response = await dispatch(verifyExperienceDetails( verified));
            
        //     // const response =  VerifyPersonalDetails(verified)
            console.log(response.payload)
            const resp = response.payload
        //     // if(response)
        //     // {
                openNotification('success',resp.remarks)
                setIsOpen(false)
                setIsOpen1(false)
                setTimeout(() => {
                    onNextChange?.('personalInformation')
                 }, 500)
               
 
        // }
        // else if(status === "Accept")
        // {
        //     verified = {surveyor_master_id : formData.surveyor_master_id,is_verified : "1",rejection_remarks: ''}
        //     console.log(verified)
        //     dispatch(verifyPersonalDetails( verified));
            
        //     // const response =  VerifyPersonalDetails(verified)
        //     // console.log(response)
        //     // if(response)
        //     // {
        //         openNotification('success')
        //         setIsOpen(false)
        //         setIsOpen1(false)
        //         setTimeout(() => {
        //             onNextChange?.('personalInformation')
        //          }, 500)
        //         setIsvalid(true)
        // }
        //           // }
    }
    catch(error)
    {
        console.error(error)
        return error;
    }
      // onNextChange?.(values, 'personalInformation', setSubmitting)
}

const onDialogReject = async(status,values)=>{
   try
   {
    console.log(status)
    console.log(values)
   const verified = {surveyor_master_id : SurveyorId.surveyor_master_id,is_verified : "0",rejection_remarks: values.remark}
    console.log(verified)
   const  response = await dispatch(verifyExperienceDetails( verified));
    
//     // const response =  VerifyPersonalDetails(verified)
    console.log(response.payload)
    const resp = response.payload
//     // if(response)
//     // {
        openNotification('danger',resp.remarks)
        setIsOpen(false)
        setIsOpen1(false)
        setTimeout(() => {
            onNextChange?.('personalInformation')
         }, 500)
        
   }
   catch(error)
   {
    console.error(error)
    return error
   }
   
   
    
    
    
}
const onNext = async(values, setSubmitting) => {
    try{
    
      
        openDialog()
      
        
    }
    catch(error)
    {
        console.log(error)
    }
    
}
    const validationSchema = Yup.object().shape({
        remark: Yup.string().required('Please enter your rejection remark')
        .matches(/^[aA-zZ0-9\s]+$/,'Special character not alowed!'),
    })
    const formData = useSelector(
        (state) => state.accountDetailForm.data.formData.getData
    )
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-2">Previous Experience Details</h3>
                {/* <p>Basic information for an account opening</p> */}
            </div>
            <Formik
                initialValues={data}
                //enableReinitialize={true}
                // validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)
                    // setTimeout(() => {
                        onNext(values, setSubmitting)
                    // }, 1000)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => {
                    
                    return (
                        
                        <Form>
                            <FormContainer>
                            {Array.isArray(data) && data.length!== 0 ? (
                                    <div>
                                        <Table>
                                        <THead>
                                                {table.getHeaderGroups().map((headerGroup) => (
                                                    <Tr key={headerGroup.id}>
                                                        {headerGroup.headers.map((header) => {
                                                            return (
                                                                <Th
                                                                    key={header.id}
                                                                    colSpan={header.colSpan}
                                                                >
                                                                    {header.isPlaceholder ? null : (
                                                                        <div
                                                                            {...{
                                                                                className:
                                                                                    header.column.getCanSort()
                                                                                        ? 'cursor-pointer select-none'
                                                                                        : '',
                                                                                onClick:
                                                                                    header.column.getToggleSortingHandler(),
                                                                            }}
                                                                        >
                                                                            {flexRender(
                                                                                header.column.columnDef
                                                                                    .header,
                                                                                header.getContext()
                                                                            )}
                                                                            {
                                                                                <Sorter
                                                                                    sort={header.column.getIsSorted()}
                                                                                />
                                                                            }
                                                                        </div>
                                                                    )}
                                                                </Th>
                                                            )
                                                        })}
                                                    </Tr>
                                                ))}
                                            </THead>
                                            <TBody>
                                                {table
                                                    .getRowModel()
                                                    .rows.slice(0, 10)
                                                    .map((row) => {
                                                        return (
                                                            <Tr key={row.id}>
                                                                {row.getVisibleCells().map((cell) => {
                                                                    return (
                                                                        <Td key={cell.id}>
                                                                            {flexRender(
                                                                                cell.column.columnDef.cell,
                                                                                cell.getContext()
                                                                            )}
                                                                        </Td>
                                                                    )
                                                                })}
                                                            </Tr>
                                                        )
                                                    })}
                                            </TBody>
                                        </Table>
                                        <div className="flex justify-end gap-2 mt-4">
                                        
                                     <Button
                                        //  loading={isSubmitting}
                                         variant="solid"
                                         type="submit"
                                         icon={<FiCheckCircle />}
                                     >
                                    Validate
                                     </Button>
                                </div>
                                    </div>
                                ) : (
                                    <p>No data available.</p>
                                )} 
                               
                            </FormContainer>
                        </Form>
                    )
                }}
            </Formik>
            <Dialog
                isOpen={dialogIsOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
                
            >
                <div className="flex flex-col h-full justify-between">
                    <h5 className="mb-4">Confirm Verification</h5>
                    <div className="max-h-96 overflow-y-auto">
                            <p> Are you want to validate previous experience details!!</p>
                    </div>
                    <div className="text-right mt-6">
                        <Button
                            className="ltr:mr-2 rtl:ml-2"
                            // variant="plain"
                            onClick={OpenRejectionDialog}
                        >
                            No
                        </Button>
                        <Button variant="solid" onClick = {onDialogOk} >
                            Yes
                        </Button>
                    </div>
                </div>

            </Dialog>
            <Dialog
                isOpen={dialog1IsOpen}
                onClose={onDialog1Close}
                onRequestClose={onDialog1Close}
            >
                <div className="flex flex-col h-full justify-between">
                    <h5 className="mb-4">Experience Details Verification</h5>
                    <div className="max-h-96 overflow-y-auto px-2 ">
                            {/* <p> Enter Rejection remarks</p> */}
                        <Formik
                        initialValues={{
                            remark: ''
                            
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            onDialogReject('Reject',values)
                        }}
                        >
                        {({ touched, errors }) => (
                            <Form>
                                <FormContainer>
                                    <FormItem
                                     label="Rejection remark"
                                     invalid={errors.remark && touched.remark}
                                     errorMessage={errors.remark}
                                    >
                                         <Field
                                            name = "remark"
                                            component = {Input}
                                            type = "text"
                                            placeholder = "Enter rejection remarks here"
                                        />
                                    </FormItem>
                                    <div className="text-right mt-2">
                                    <Button
                                        className="ltr:mr-2 rtl:ml-2"
                                        // variant="plain"
                                        onClick={onDialog1Close}
                                    >
                                        Cancel
                                    </Button>
                                    <Button variant="solid" type="submit" onClick={onDialogReject} color = "red-600">
                                    Confirm
                                    </Button>
                                </div>
                                </FormContainer>
                            </Form>
                        )}
                        </Formik>
                           
                    </div>
                    
                </div>
            </Dialog> 
            
        </>
    )
}

export default PreviousExperienceDetails    
