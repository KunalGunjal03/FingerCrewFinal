import React, { useState, useRef, forwardRef } from 'react'
import { HiOutlineFilter} from 'react-icons/hi'
import { useDispatch} from 'react-redux'

import {
    Input,
    Card,
    Button,
    Checkbox,
    Select,
    FormItem,
    FormContainer,
    Drawer,
} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import { DatePicker } from 'components/ui'
import { render } from '@testing-library/react'
import { useEffect } from 'react'
import { values } from 'lodash'
import {FcFilledFilter} from 'react-icons/fc'
const FilterForm = forwardRef(({ onSubmitComplete }, ref) => {
    const dispatch = useDispatch()

    // const filterData = useSelector(
    //     (state) => state.salesProductList.data.filterData
    // )

    const handleSubmit = (values) => {
        console.log(values)
        onSubmitComplete?.()
        
        // dispatch(setFilterData(values))
        // dispatch(getServeyList(initialTableData))
    }
    const [selected,setselected] = useState("date")
    const [DateFilterVisible, setDateFilterVisible] = useState(false)
    const [SurveyIdFilterVisible, setSurveyIdFilterVisible] = useState(false)
    const SearchByDate = (props) => {
        return (  
              <>
                
                    <div className="grid grid-cols-1 lg:grid-cols-3 mt-8 ">
                        <div className="lg:col-span-1 mt-2"> 
                        <h6>From date</h6>
                        </div>
                     <div className="lg:col-span-2">
                    
                   <DatePicker
                placeholder="From date"
                placement="bottomEnd"
                name="fromdate"
                
                   />
                    
                     </div>
                     <div className="lg:col-span-1 "></div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 mt-8 ">
                        <div className="lg:col-span-1 mt-2">
                        <h6>To date</h6>
                    </div>
                    <div className="lg:col-span-2">
                    
                    <DatePicker
                placeholder="To date"
                placement="bottomEnd"
                name="todate"
                   />
                    
                    </div>
                    </div>
                   
                </>
                  
          )
    }
    const SearchBySurveyNumber = (props) => {
        return (
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 mt-8">
                        <div className="lg:col-span-1 mt-2 "> 
                        <h6 >Survey No.</h6>
                        </div>
                    <div className="lg:col-span-2 "> 
                    <Field
                                    type="text"
                                    autoComplete="off"
                                    name="SurveyNo"
                                    placeholder="Survey Number"
                                    component={Input}
                                />
                    </div>
                    
                    </div>
                    
                 
        )
    }
    const options = [
        { value: 'selectsearchby', label :'Select '},
        { value: 'date', label: 'Date' },
        { value: 'SurveyId', label: 'Survey Number' },
    ]
    
    useEffect(() => {
        selected === "date" ? setDateFilterVisible(true) :setDateFilterVisible(false);
        selected === "SurveyId" ? setSurveyIdFilterVisible(true) :setSurveyIdFilterVisible(false);
    })
    const onStatusFilterChange = (e) => {
        setselected(e.value);
    }
    // const filterData = useSelector(
    //     // (state) => state.salesProductList.data.filterData
    // )
    

    return (
        <Formik
            // innerRef={ref}
            // enableReinitialize
            // initialValues={filterData}
            onSubmit={(values) => {
                handleSubmit(values)
            }}
        >
            {({ values, touched, errors }) => (
                 <Form>
                    <FormContainer>
                    <FormItem
                        invalid={errors.name && touched.name}
                        errorMessage={errors.name}
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-3 ">
                             <div className="lg:col-span-1 mt-2">
                                <h6>Search By</h6>
                             </div>
                        <div className="lg:col-span-2">
                    
                         <Select
                                size="md"
                                className=" "
                                options={options}
                                onChange={onStatusFilterChange}
                                value={selected}
                        />
                           
                         </div>
                        
                        </div>
                        {DateFilterVisible && <SearchByDate/>}
                        {SurveyIdFilterVisible && <SearchBySurveyNumber/>}
                    </FormItem>

                    </FormContainer>
                 </Form>

            )}
        </Formik>
    )
})

const DrawerFooter = ({ onSaveClick, onCancel }) => {
    return (
        <div className="text-right w-full">
            <Button size="sm" className="mr-2" onClick={onCancel}>
                Cancel
            </Button>
            <Button size="sm" variant="solid" onClick={onSaveClick}>
                Search
            </Button>
        </div>
    )
}

const SurveyFilter = () => {
    const formikRef = useRef()

    const [isOpen, setIsOpen] = useState(false)

    const openDrawer = () => {
        setIsOpen(true)
    }

    const onDrawerClose = () => {
        setIsOpen(false)
    }

    const formSubmit = () => {
        formikRef.current?.submitForm()
    }
    return (
        <>
            <Button
                size="sm"
                className="block md:inline-block ltr:md:ml-2 rtl:md:mr-2 md:mb-0 mb-4"
                icon={<FcFilledFilter />}
                onClick={() => openDrawer()}
            >
                Filter
            </Button>
            <Drawer
                title="Filter"
                isOpen={isOpen}
                onClose={onDrawerClose}
                onRequestClose={onDrawerClose}
                placement={"right"}
              
                footer={
                    <DrawerFooter
                        onCancel={onDrawerClose}
                        onSaveClick={formSubmit}
                    />
                }
            >
                <FilterForm ref={formikRef} onSubmitComplete={onDrawerClose} />
            </Drawer>
        </>
    )
}

export default SurveyFilter
