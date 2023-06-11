import React from 'react'
import {
    Input,
    InputGroup,
    Button,
    DatePicker,
    //Select,
    FormItem,
    FormContainer,
    Table

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
const { Tr, Th, Td, THead, TBody, Sorter } = Table

const columns = [
    {
        header: 'Sr.No',
        accessorKey: 'experience_details_id',
        cell: (props) => {
            const row = props.row.original
            return (
                <div>
                    <span className="cursor-pointer">{row.experience_details_id}</span>
                </div>
            )
        },
    },
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
    
      dispatch(getPreviousExp( requestParam));
      
      
    } catch (error) {
      console.error(error);
      return error;
    }
  };
   
    const onNext = (values, setSubmitting) => {
        onNextChange?.(values, 'personalInformation', setSubmitting)
    }
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
                    setTimeout(() => {
                        onNext(values, setSubmitting)
                    }, 1000)
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
                                        loading={isSubmitting}
                                        size="md"
                                        className="ltr:mr-3 rtl:ml-3"
                                        // onClick={() => onDiscard?.()}
                                        // icon = {<MdOutlineNavigateNext/>}
                                        type="button"
                                    >
                                        Next
                                    </Button>
                                     <Button
                                         loading={isSubmitting}
                                         variant="solid"
                                         type="submit"
                                         icon={<FiCheckCircle />}
                                     >
                                    Verify
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
            
        </>
    )
}

export default PreviousExperienceDetails    
