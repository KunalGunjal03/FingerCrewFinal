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
import { useEffect, useState } from 'react'
import { getForm } from '../store/dataSlice'
import { useLocation } from 'react-router-dom'
import {FiCheckCircle} from 'react-icons/fi'
import Collapse from 'react-collapse'
import { FaChevronUp,FaChevronDown } from 'react-icons/fa'
const RoofStructure = (
    {
        data={
            
        },
        onNextChange,
        currentStepStatus
    }
)=>{
    const [expanded, setExpanded] = useState(false);
    const onNext = (values, setSubmitting) => {
        onNextChange?.(values, 'RoofStructure', setSubmitting)
    
        
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
    const accordianData = [
        {
            title:"Number of roofs",
            // desc:"tafkdvadbaaasdam,dadslkadadakdla aca sa,casaqpas"
        },
        {
            title:"Image of Generator",
            // desc:"*******************************************"
        }
    ]
    const AccordianItem = ({open,toggle,title}) =>{  
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
                                            value = {0} 
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
            </div>
               
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                    <div className="group relative rounded border p-2 flex ">
                        <img
                                    className="rounded max-h-auto max-w-auto"
                                    src={"http://fingercrewapi.alphonsol.com//FingerCrew/2023/June/29.06.2023/Installer/KYC/9595959595/Screenshot (9).png"}
                                    alt={"label"}
                        />
                    </div>
                    <div className="group relative rounded border p-2 flex ">
                        <img
                                    className="rounded max-h-auto max-w-auto"
                                    src={"http://fingercrewapi.alphonsol.com//FingerCrew/2023/June/29.06.2023/Installer/KYC/9595959595/Screenshot (9).png"}
                                    alt={"label"}
                        />
                    </div>
                    <div className="group relative rounded border p-2 flex ">
                        <img
                                    className="rounded max-h-auto max-w-auto"
                                    src={"http://fingercrewapi.alphonsol.com//FingerCrew/2023/June/29.06.2023/Installer/KYC/9595959595/Screenshot (9).png"}
                                    alt={"label"}
                        />
                    </div>
                    <div className="group relative rounded border p-2 flex ">
                        <img
                                    className="rounded max-h-auto max-w-auto"
                                    src={"http://fingercrewapi.alphonsol.com//FingerCrew/2023/June/29.06.2023/Installer/KYC/9595959595/Screenshot (9).png"}
                                    alt={"label"}
                        />
                    </div>
                </div>
            </FormContainer>
            </Form>
            </Formik>  
                              
                </Collapse>
            </div>
        )
    }
    return (
        <div>
        <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-1 gap-4">
        <div className='col-span-2'>
        <h3 className="mb-2">Roof Structure Details</h3>
        </div>
        <div className="flex justify-end gap-2">
       <Button
           variant="solid"
           type="submit"
           onClick={() =>handleOpen()}
           >
           {openAll && open ? 'Close All' : 'Open All'}
           </Button>

       </div>
   </div>
   {accordianData.map((data,index)=>{
       return <AccordianItem 
       key={index}
       open={open === index  || openAll } 
       title={data.title}
       toggle={()=>toggle(index)}/>
   })}
   
</div>
    )
}

export default RoofStructure