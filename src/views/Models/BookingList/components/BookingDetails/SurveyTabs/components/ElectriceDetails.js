import {
    Input,
    Button,
    FormItem,
    FormContainer,
    toast,
    Notification,
    Dialog,

} from 'components/ui'
import { Field, Form, Formik, FormikConsumer } from 'formik'
import {  useDispatch,useSelector } from 'react-redux'
import { useEffect, useState ,Fragment} from 'react'
import Collapse from 'react-collapse'
import { getElectricDetails } from '../store/dataSlice'
import { HiOutlineChevronUp,HiOutlineChevronDown } from 'react-icons/hi'
import { FaChevronUp,FaChevronDown } from 'react-icons/fa'

// import {
//     Accordion,
//     AccordionHeader,
//     AccordionBody,
//   } from "@material-tailwind/react";  
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react'
import { getForm } from '../store/dataSlice'
import { useLocation } from 'react-router-dom'
import {FiCheckCircle} from 'react-icons/fi'
import { HiEye } from 'react-icons/hi'
import { COMMANPATH } from 'constants/api.constant'
const ElectricDetails = ({
    onNextChange,
    currentStepStatus
}) =>{
    const location = useLocation()
    const dispatch = useDispatch()
    const {token,tokenKey} = useSelector((state) => state.auth.user)
    const [expanded, setExpanded] = useState(false);
    const onNext = (values, setSubmitting) => {
        onNextChange?.(values, 'ElectricInformation', setSubmitting)
    
        
    }
    const [open, setOpen] = useState(false);
    const [openAll, setOpenAll] = useState(false);
    const handleOpen = () => {
        setOpenAll(!openAll)
        setOpen(!open)
    };
    const toggle = (index) =>{
        if(open === index){
            return setOpen(null)
        }
        console.log(open)
        console.log(index)
        setOpen(index)
    }
    const data = useSelector((state) => state.surveyDetailForm?.data?.ElectricDetails?.getData  )
    console.log(data)
    let uniqueData = [];
    if(data)
    {
    //  const uniqueQuestions = Array.from(new Set(data.map((item) => item.Questions)));
    const questionMap = data.reduce((acc, item) => {
        if (!acc[item.Questions]) {
          acc[item.Questions] = [item];
        } else {
          acc[item.Questions].push(item);
        }
        return acc;
      }, {});
       uniqueData = Object.values(questionMap);

    // uniqueData = uniqueQuestions.map((question) => {
    //     return data.find((item) => item.Questions === question);
    //   });
      console.log(uniqueData)
    }
    
    // const accordianData = [
    //     {
    //         title:"Main busbar rating",
    //         // desc:"tafkdvadbaaasdam,dadslkadadakdla aca sa,casaqpas"
    //     },
    //     {
    //         title:"Main breaker rating",
    //         // desc:"*******************************************"
    //     }
    // ]
    useEffect(() => {
        const path = location.pathname.substring(
        location.pathname.lastIndexOf('/') + 1
    )
    const requestParam = {survey_no : path , 
       token : token , 
       tokenKey : tokenKey
   }
       console.log(requestParam)
    fetchData(requestParam);
}, []);
const fetchData = (requestParam) => {
    try {
    dispatch(getElectricDetails( requestParam));
      //console.log(surveyor_master_id)
      
    } catch (error) {
      console.error(error);
      return error;
    }
};
    const AccordianItem = ({open,toggle,title,data}) =>{  
        console.log(data)
        return(
            <div className="w-full">
                <div className='py-[12px] ' onClick={toggle}>
                <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-1">
                <div className='col-span-2'>
                {/* <p className='text-[20px] '>{title}</p> */}
                <label className=' text-[15px] font-semibold'>{title}</label>
                </div>
                   {/* <span > <p>{openAll ||  open ? "Collapse" : "Expand"}</p> </span>     */}
                <div className='flex justify-end gap-2 mr-4'>
                {openAll ||  open ? <FaChevronUp/> : <FaChevronDown/>}
                </div>
                </div>
                    
                    
                </div>
                <Collapse isOpened={open}>
                <Formik>
            <Form>
            
            <FormContainer>
            <div className="md:grid grid-cols-3 gap-2 ml-2 mt-2  border-gray-200 py-[12px] dark:!border-white/10">

                
                    <FormItem
                    label=""           
                    >
                                           <Field
                                               type="text"
                                               name="mbrating"
                                               component={Input}
                                               value = {data[0].MQuestionvalue} 
                                               readOnly
                                           />
                   </FormItem>
            
                    
                
                
                {/* <div className='justify-start'>
                <Button
                    className = "mr-6 ml-2"
                    // loading={isSubmitting}
                    variant="solid"
                    
                    type="submit"
                    icon={<HiEye />}
                    // disable = { disable }
                >
                View
                </Button>
                </div> */}
                {data.SubquestionId ?(
                    <label>{data.SubQuestions}</label>
                ):(
                    <p></p>
                )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {Array.isArray(data) && data.length!== 0 ? (
                                    data.map((items) => (
            
                    <div className="group relative rounded border p-2 flex ">
                        <img
                                    className="rounded max-h-auto max-w-auto"
                                    src={COMMANPATH + items.ImagePath}
                                    alt={"label"}
                        />
                    </div>
           
             ))
                                 
             ) : (
                 <p>No data available.</p>
             )} 
              </div>
            </FormContainer>
             
            </Form>
            </Formik>  
                              
                </Collapse>
            </div>
        )
    }
    return(
        <div>
                 <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-1 gap-4">
                 <div className='col-span-2 mb-6'>
                 <h3 className="mb-2">Electric Details</h3>
                 </div>
                 {data && data.length > 0?(
                         <div className="flex justify-end gap-2">
                         <Button
                             variant="solid"
                             type="submit"
                             onClick={() =>handleOpen()}
                             >
                             {openAll && open ? 'Close All' : 'Open All'}
                             </Button>
         
                         </div>
                        ):(
                        <p></p>
                        )}
                
            </div>
            {data && data.length>0 ? (
                <div>
                    {uniqueData.map((group, index) => {
                return (
                    <AccordianItem
                    key={index}
                    open={open === index || openAll}
                    title={group[0].Questions} // Use the first item's question as the title
                    toggle={() => toggle(index)}
                    data={group} // Pass the entire array of entries for this question
                    />
                );
                })}
                
                </div>
                
            ):(
                <p>No data available.</p> 
            )}
            

            
        </div>
        // <>
        //     <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-1 gap-4">
        //         <div className='col-span-2'>
        //         <h3 className="mb-2">Electric Details</h3>
        //         </div>
        //         <div className="flex justify-end gap-2">
        //         <Button
        //             variant="solid"
        //             type="submit"
        //             // onClick={() => setExpanded(!expanded)}
        //             >
        //             {expanded ? 'Collapse' : 'Expand'}
        //             </Button>

        //         </div>
        //     </div>
        //     {/* <Accordian/> */}
        //     <Formik>
        //     <Form>
        //     <FormContainer>
        //     <Accordion className='w-full' allowMultiple>

        //     <AccordionItem className='border-b border-gray-200 py-[12px] dark:!border-white/10' >
        //         <h2>
        //         <AccordionButton className='flex justify-between'>
        //             {/* <span className='text-left text-medium font-bold text-navy-900 dark:text-white' flex='1' textAlign='left'> */}
        //             <h5 className="mb-2">Main busbar rating</h5>
        //             {/* </span> */}
        //             <AccordionIcon className='text-left !text-navy-900 dark:!text-white'/>
        //         </AccordionButton>
        //         </h2>
        //         <AccordionPanel className='text-left text-medium mt-2 !text-navy-900 dark:!text-white' pb={4}>
        //         <div className="md:grid grid-cols-3 gap-2 ml-2">
        //         <FormItem
        //          label=""           
        //          >
        //                                 <Field
        //                                     type="text"
        //                                     name="mbrating"
        //                                     component={Input}
        //                                     value = {0} 
        //                                     readOnly
        //                                 />
        //         </FormItem>
        //         </div>
        //         {/* <div className='justify-start'>
        //         <Button
        //             className = "mr-6 ml-2"
        //             // loading={isSubmitting}
        //             variant="solid"
                    
        //             type="submit"
        //             icon={<HiEye />}
        //             // disable = { disable }
        //         >
        //         View
        //         </Button>
        //         </div> */}
        //         <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        //         <div className="group relative rounded border p-2 flex">
        //      <img
        //                 className="rounded max-h-full max-w-full"
        //                 src={"http://fingercrewapi.alphonsol.com//FingerCrew/2023/June/15.06.2023/Surveyor/Documents/7020702110/360_F_350696716_k5DaMluvXolFKxGIM3psna1svysIbwNB.jpg"}
        //                 alt={"label"}
        //     />
        //     <div className="absolute inset-2 bg-gray-900/[.7] group-hover:flex hidden text-xl items-center justify-center">
        //                 <span
        //                     // onClick={() => onViewOpen(FinalPath)}
        //                     className="text-gray-100 hover:text-gray-300 cursor-pointer p-1.5"
        //                 >
        //                     <HiEye />
        //                 </span>
        //                 <span
        //                     // onClick={() => onDownload(FinalPath,label)}
        //                     className="text-gray-100 hover:text-gray-300 cursor-pointer p-1.5"
        //                 >
        //                     {/* <MdDownload /> */}
        //                 </span>

        //     </div>
            
        // </div>
        // </div>
               
        //     </AccordionPanel>
        //     </AccordionItem>

        //     <AccordionItem className='border-b border-gray-200 py-[12px] dark:!border-white/10' >
        //         <h2>
        //         <AccordionButton className='flex justify-between'>
        //             {/* <span className='text-left text-medium font-bold text-navy-900 dark:text-white' flex='1' textAlign='left'> */}
        //             <h5 className="mb-2">Main breaker rating</h5>
        //             {/* </span> */}
        //             <AccordionIcon className='text-left !text-navy-900 dark:!text-white'/>
        //         </AccordionButton>
        //         </h2>
        //         <AccordionPanel className='text-left text-medium mt-2 !text-navy-900 dark:!text-white' pb={4}>
        //         <div className="md:grid grid-cols-3 gap-2 ml-2">
        //         <FormItem
        //          label=""           
        //          >
        //                                 <Field
        //                                     type="text"
        //                                     name="mbrating"
        //                                     component={Input}
        //                                     value = {0} 
        //                                     readOnly
        //                                 />
        //         </FormItem>
        //         </div>
        //         </AccordionPanel>
        //     </AccordionItem>
            
        //     <AccordionItem className='border-b border-gray-200 py-[12px] dark:!border-white/10'>
        //         <h2>
        //         <AccordionButton className='flex justify-between'>
        //             {/* <span className='text-left text-medium font-bold text-navy-900 dark:text-white' flex='1' textAlign='left'> */}
        //             <h5 className="mb-2">Utility name and meter photo</h5>
        //             {/* </span> */}
        //             <AccordionIcon className='text-left !text-navy-900 dark:!text-white'/>
        //         </AccordionButton>
        //         </h2>
        //         <AccordionPanel className='text-left text-medium mt-2 !text-navy-900 dark:!text-white' pb={4}>
        //         <div className="md:grid grid-cols-3 gap-2 ml-2">
        //         <FormItem
        //          label=""           
        //          >
        //                                 <Field
        //                                     type="text"
        //                                     name="mbrating"
        //                                     component={Input}
        //                                     value = {0} 
        //                                     readOnly
        //                                 />
        //         </FormItem>
        //         </div>
        //         </AccordionPanel>
        //     </AccordionItem>
        //     <AccordionItem className='border-b border-gray-200 py-[12px] dark:!border-white/10'>
        //         <h2>
        //         <AccordionButton className='flex justify-between'>
        //             {/* <span className='text-left text-medium font-bold text-navy-900 dark:text-white' flex='1' textAlign='left'> */}
        //             <h5 className="mb-2">Dead form of picture</h5>
        //             {/* </span> */}
        //             <AccordionIcon className='text-left !text-navy-900 dark:!text-white'/>
        //         </AccordionButton>
        //         </h2>
        //         <AccordionPanel className='text-left text-medium mt-2 !text-navy-900 dark:!text-white' pb={4}>
        //         <div className="md:grid grid-cols-3 gap-2 ml-2">
        //         <FormItem
        //          label=""           
        //          >
        //                                 <Field
        //                                     type="text"
        //                                     name="mbrating"
        //                                     component={Input}
        //                                     value = {0} 
        //                                     readOnly
        //                                 />
        //         </FormItem>
        //         </div>
        //         </AccordionPanel>
        //     </AccordionItem>
        //     <AccordionItem className='border-b border-gray-200 py-[12px] dark:!border-white/10'>
        //         <h2>
        //         <AccordionButton className='flex justify-between'>
        //             {/* <span className='text-left text-medium font-bold text-navy-900 dark:text-white' flex='1' textAlign='left'> */}
        //             <h5 className="mb-2">All Load breaker close photo</h5>
        //             {/* </span> */}
        //             <AccordionIcon className='text-left !text-navy-900 dark:!text-white'/>
        //         </AccordionButton>
        //         </h2>
        //         <AccordionPanel className='text-left text-medium mt-2 !text-navy-900 dark:!text-white' pb={4}>
        //         <div className="md:grid grid-cols-3 gap-2 ml-2">
        //         <FormItem
        //          label=""           
        //          >
        //                                 <Field
        //                                     type="text"
        //                                     name="mbrating"
        //                                     component={Input}
        //                                     value = {0} 
        //                                     readOnly
        //                                 />
        //         </FormItem>
        //         </div>
        //         </AccordionPanel>
        //     </AccordionItem>
        //     </Accordion>
        //     </FormContainer>
        //     </Form>
        //     </Formik>
        // </>
    )
}

export default ElectricDetails