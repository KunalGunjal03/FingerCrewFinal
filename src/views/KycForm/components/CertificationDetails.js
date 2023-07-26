import React from 'react'
import {
    Input,
    Button,
    Checkbox,
    Select,
    FormItem,
    FormContainer,
    toast,
    Dialog,
    Notification,
    Table
} from 'components/ui'
import { Field, Form, Formik, getIn } from 'formik'
import NumberFormat from 'react-number-format'
import {
    occupationOptions,
    annualIncomeOptions,
    sourceOfWealthOptions,
    noTinReasonOption,
} from '../constants'
import { countryList } from 'constants/countries.constant'
//import * as Yup from 'yup'
import {FiCheckCircle} from 'react-icons/fi'
import {  useDispatch ,useSelector} from 'react-redux'
import { useEffect, useState } from 'react'
//import { apiGetAccountFormData } from 'services/AccountServices'
import { getForm } from '../store/dataSlice'
import { useLocation, useParams } from 'react-router-dom'
//import {getEducation} from '../store/dataSlice'
import { getCertification } from '../store/dataSlice'
import { COMMANPATH } from 'constants/api.constant'
import * as Yup from 'yup'
import { text } from 'd3-fetch'
import { useNavigate } from 'react-router-dom'
import useThemeClass from 'utils/hooks/useThemeClass'
import { verifyCertificationDetails } from '../store/dataSlice'
import { MdDownload } from 'react-icons/md'
import { HiEye } from "react-icons/hi2";
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
const { Tr, Th, Td, THead, TBody, Sorter } = Table
const excludedOccupation = ['unemployed', 'student', 'retired']


const CertificationDetails
    = ({
    data = {
        certificate_name:'',
        certification_year:''
    },
    onNextChange,
    currentStepStatus,
}) => {
      
  //sakshi
//     const location = useLocation()
//     const {token,tokenKey} = useSelector((state) => state.auth.user)
//      useEffect(() => {
//          const path = location.pathname.substring(
//          location.pathname.lastIndexOf('/') + 1
//      )
//      const requestParam = {surveyor_master_id : path , 
//         token : token , 
//         tokenKey : tokenKey
//     }
        
 
//      fetchData(requestParam);
//  }, []);
//  const dispatch = useDispatch()
//  const fetchData = (requestParam) => {
//      try {
//         const Param = {
//             surveyor_master_id : requestParam.surveyor_master_id , 
//             token : token , 
//             tokenKey : tokenKey
//         }
//          
//        dispatch(getCertification( requestParam));
//       
//      } catch (error) {
//        console.error(error);
//        return error;
//      }
//    };
      
    const location = useLocation()
    const {token,tokenKey} = useSelector((state) => state.auth.user)
    const[SurveyorId,setSurveyorID] = useState([''])
    const [imageUrl, setImageUrl] = useState('');
    const [dialog1IsOpen,setIsOpen1] = useState(false)
    const [selectedImg, setSelectedImg] = useState({})
    const [viewOpen, setViewOpen] = useState(false)
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
 const fetchData = async (requestParam) => {
    try {
    console.log(requestParam)
    const SurveyorID = {surveyor_master_id:requestParam.surveyor_master_id}
    setSurveyorID(SurveyorID)
      const response = await dispatch(getCertification(requestParam));
      const imageFileName = COMMANPATH ;
      console.log(response.payload.getData)
      const data = response.payload.getData
      console.log(data)
      const imageFilePath = data.cerificate_path;
      const imagefile = data.certification_fileName;
      const imagefileextension = data.certification_extention;
        
       const finalfilepath= imageFileName + imageFilePath + imagefile + imagefileextension;
       setImageUrl(finalfilepath)
     console.log(finalfilepath)
    //   if (imageFilePath) {
    //     fetchImageFromServer(imageFilePath);
    //   }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };



    
   const formData = useSelector(
    (state) => state.accountDetailForm.data.formData.getData
)
console.log(formData)
const [dialogIsOpen, setIsOpen] = useState(false)
// const [setSubmitting] = useState(true)
const openNotification = (type,msg) => {
    toast.push(
        <Notification
            title={msg}
            type={type}
            
        />,{
            placement: 'top-end'
        })
            
       
    
}
const onViewOpen = (img) => {
    setSelectedImg(img)
    setViewOpen(true)
}
const onDialogImgClose = () => {
    setViewOpen(false)
    setTimeout(() => {
        setSelectedImg({})
    }, 300)
}
const openDialog = () => {
    setIsOpen(true)
}
const OpenRejectionDialog = (e)=>{
    setIsOpen1(true)
}
const onDialog1Close = (e) => {
    setIsOpen(true)
     setIsOpen1(false)
     // setRejectionRemarkVisible(true)
 }

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
             const  response = await dispatch(verifyCertificationDetails( verified));
              
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
// const onDiscard=(setSubmitting)=>{
//      onNextChange?.(values, 'personalInformation', setSubmitting)
// }

const onNext = async(values, setSubmitting) => {
    console.log('Verify button click')
    try{
        // const verified = {surveyor_master_id : formData.surveyor_master_id,is_verified : "1",rejection_remarks:""}
        // const response = await VerifyCertificationDetails(verified)
    //     // console.log(response)
        openDialog()
    //    setTimeout(() => {
    //        onNextChange?.('CertificationDetails', setSubmitting)
    //     }, 3000)
        //onNextChange?.(values, 'personalInformation', setSubmitting)
    }
    catch(error)
    {
        console.log(error)
    }
    
}
const [selectedCertificate, setSelectedCertificate] = useState(null);

const ActionColumn = ({ row }) => {
    // const dispatch = useDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onView = () => {
        console.log(row)

        setViewOpen(true)
        const imageFileName = COMMANPATH ;
        console.log(row)
              const imageFilePath = row.cerificate_path;
              const imagefile = row.certification_fileName;
              const imagefileextension =row.certification_extention;
                
               const finalfilepath= imageFileName + imageFilePath + imagefile + imagefileextension;
               console.log(finalfilepath)
               setSelectedCertificate(finalfilepath)
               
            //    setselectedRow(row)
            //    console.log(selectedRow)
        // navigate(`/SurveyView/${row.survey_id}`)
    }
    const onDownload = () =>{
        const imageFileName = COMMANPATH ;
        console.log(row)
              const imageFilePath = row.cerificate_path;
              const imagefile = row.certification_fileName;
              const imagefileextension =row.certification_extention;
                
               const finalfilepath= imageFileName + imageFilePath + imagefile + imagefileextension;
        fetch(finalfilepath)
			.then(response => {
				response.blob().then(blob => {
					let url = window.URL.createObjectURL(blob);
					let a = document.createElement('a');
					a.href = url;
					a.download = 'Certificate';
					a.click();
				});
				//window.location.href = response.url;
		});
    }
    // const onDelete = () => {
    //     dispatch(toggleDeleteConfirmation(true))
    //     dispatch(setSelectedProduct(row.id))
    // }

    return (
        <div className="flex justify-left text-lg">
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onView}
            >
                <HiEye/>
            </span>
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onDownload}
            >
                <MdDownload />
            </span>
        </div>
    )
}
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
        header: 'Certificate',
        accessorKey: 'certificate_name',
    },
    {
        header: 'Year',
        accessorKey: 'certification_year',
    },
    {
        header: 'Action',
        id: 'action',
         cell: (props) => <ActionColumn row={props.row.original} />,
    },
   
]
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
// const handleView = (item) => {
//     const imageFileName = COMMANPATH ;
//     const imageFilePath = item.cerificate_path;
//       const imagefile = item.certification_fileName;
//       const imagefileextension =item.certification_extention;
        
//        const finalfilepath= imageFileName + imageFilePath + imagefile + imagefileextension;
//        setSelectedCertificate(finalfilepath)
//     //setSelectedCertificate(item);
//     console.log(item)
// };
const validationSchema = Yup.object().shape({
    remark: Yup.string().required('Please enter your rejection remark')
    .matches(/^[aA-zZ0-9\s]+$/,'Special character not alowed!'),
})
const onDialogClose = (e) => {
    console.log(e)
 //    OpenRejectionDialog()
    
     setIsOpen(false)
     // setRejectionRemarkVisible(true)
 }
const onDialogReject = async(status,values)=>{
    try
    {
     console.log(status)
     console.log(values)
    const verified = {surveyor_master_id : SurveyorId.surveyor_master_id,is_verified : "0",rejection_remarks: values.remark}
     console.log(verified)
    const  response = await dispatch(verifyCertificationDetails( verified));
     
 //     // const response =  VerifyPersonalDetails(verified)
     console.log(response.payload)
     const resp = response.payload
 //     // if(response)
 //     // {
         openNotification('danger',resp.remarks)
         setIsOpen(false)
         setIsOpen1(false)
         setTimeout(() => {
             onNextChange?.('addressInformation')
          }, 500)
         
    }
    catch(error)
    {
     console.error(error)
     return error
    }
    
    
     
     
     
 }
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-2">Certification Details</h3>
                {/* <p>Basic information for an account opening</p> */}
            </div>
            <Formik
                initialValues={data}
                //enableReinitialize={true}
                // validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)
                    setTimeout(() => {
                        onNext(values, setSubmitting)
                    }, 1000)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => {
                    return (
                        <>
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
                            </div>
                                
                            
                            
                            ) : (
                            <p>No data available.</p>
                            
                            )} 
                             {Array.isArray(data) && data.length !== 0 && (
                            <div className="flex justify-end gap-2">
                                <Button
                                // loading={isSubmitting}
                                variant="solid"
                                type="submit"
                                icon={<FiCheckCircle />}
                                disabled ={(data[0].Registrationstatus === "4" || data[0].Registrationstatus === "7")  ? false : true }
                                >
                                Validate
                                </Button>
                            </div>
                            )}
               
                            </FormContainer>
                        </Form>
                        </>
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
                            <p> Are you want to validate certification details!!</p>
                    </div>
                    <div className="text-right mt-6">
                        <Button
                            className="ltr:mr-2 rtl:ml-2"
                            // variant="plain"
                            onClick={OpenRejectionDialog}
                        >
                            No
                        </Button>
                        <Button variant="solid" onClick={onDialogOk}>
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
                    <h5 className="mb-4">Certification Details Verification</h5>
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
            <Dialog
                isOpen={viewOpen}
                onClose={onDialogImgClose}
                onRequestClose={onDialogImgClose}
            >
                <h5 className="mb-4">{'Certificate'}</h5>
                <img
                    className="w-full"
                    src={selectedCertificate}
                    alt={'Not Found'}
                />
            </Dialog>
        </>
    )
}

export default CertificationDetails