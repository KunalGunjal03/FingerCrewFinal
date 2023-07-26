
import React, { useState, useRef, forwardRef,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button, Select, FormItem, FormContainer, Drawer } from 'components/ui';
import { Field, Form, Formik } from 'formik';
import { DatePicker } from 'components/ui';
import { getreqSurveyor,getStates,getCities } from '../store/dataSlice';
import { FcFilledFilter } from 'react-icons/fc';
import { useFormikContext } from 'formik';


const FilterForm = forwardRef(({ onSubmitComplete}, ref) => {
    const dispatch = useDispatch();
    const { token, tokenKey } = useSelector((state) => state.auth.user);
    const [seletCity, setSelectCity] = useState('')
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedState, setSelectedState] = useState('');
  const handleSubmit = (values) => {
    // console.log(selected)
    // console.log(values);
    // //    
    //  console.log(seletCity)
    onSubmitComplete?.();
    const payload = {
      token,
      tokenKey,
      searchtype: selected,
      surveyor_name: values.surveyorName,
      fromDate: values.fromDate,
      toDate: values.toDate,
      city_id: selectedCity?.value,
    };
    console.log(payload)    
    dispatch(getreqSurveyor(payload));
  };  
  const [selected, setSelected] = useState('createddt');
  const [DateFilterVisible, setDateFilterVisible] = useState(false);
  const [SurveyorIdFilterVisible, setSurveyorIdFilterVisible] = useState(false);
  const[RegionFilterVisible ,setRegionFilterVisible]=useState(false);
 


const SearchByDate = () => {
    const { setFieldValue } = useFormikContext();
  
    const handleFromDateChange = (date) => {
        const formattedDate = date.toLocaleDateString('en-GB');
        const parts = formattedDate.split('/');
        const formatDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
        setFieldValue('fromDate', formatDate);
      };
      
      const handleToDateChange = (date) => {
        const formattedDate = date.toLocaleDateString('en-GB');
        const parts = formattedDate.split('/');
        const formatDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
        setFieldValue('toDate', formatDate);
      };
  
    return (
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-3 mt-8 ">
          <div className="lg:col-span-1 mt-2">
            <h6>From date</h6>
          </div>
          <div className="lg:col-span-2">
            <DatePicker
              placeholder="From date"
              placement="bottomEnd"
              name="fromDate"
              onChange={handleFromDateChange}
              component={Input}
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
              name="toDate"
              onChange={handleToDateChange}
              component={Input}
            />
          </div>
        </div>
      </div>
    );
  };
  
  

  const SearchBySurveyorName = () => {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 mt-8">
        <div className="lg:col-span-1 mt-2 ">
          <h6>Surveyor Name.</h6>
        </div>
        <div className="lg:col-span-2 ">
          <Field type="text" autoComplete="off" name="surveyorName" placeholder="Surveyor Name" component={Input} />
        </div>
      </div>
    );
  };

const SearchByRegion = () => {
  const dispatch = useDispatch();
  const states = useSelector((state) => state.listsSurveyorList?.data?.states?.getData || []);
  const cities = useSelector((state) => state.listsSurveyorList?.data?.cities?.getData || []);



  useEffect(() => {
    dispatch(getStates());
  }, [dispatch]);

  useEffect(() => {
    // console.log(selectedState)
    if (selectedState) {
       const requestParam ={
        state_id:selectedState.value
       }
      dispatch(getCities(requestParam)); 
    }
  }, [dispatch, selectedState]);
  


  const handleStateChange = (state) => {
    // console.log(state)
    setSelectedState(state);
    setSelectedCity(''); 
  };

  const handleCityChange = (city) => {
    console.log(city)
    setSelectedCity(city);
    setSelectCity(city)
  };



  const formattedStates = states.map((state) => ({
    value: state.state_id,
    label: state.state_name,
  }));
// console.log(cities)
  const formattedCities = cities.map((city) => ({
    value: city.city_id,
    label: city.city_name,
  }));
// console.log(formattedCities)


  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 mt-8">
        <div className="lg:col-span-1 mt-2">
          <h6>State Name</h6>
        </div>
        <div className="lg:col-span-2">
          <Select
            options={formattedStates}
            value={selectedState}
            onChange={(state) => handleStateChange(state)}
            placeholder="Select State"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 mt-8">
        <div className="lg:col-span-1 mt-2">
          <h6>City Name</h6>
        </div>
        <div className="lg:col-span-2">
          <Select
            options={formattedCities}
            value={selectedCity}
            onChange={(city) => handleCityChange(city)}
            placeholder="Select City"
          />
        </div>
      </div>
    </div>
  );
};

      
      
  const options = [
    { value: 'selectsearchby', label: 'Select' },
    { value: 'createddt', label: 'Date' },
    { value: 'surveyor_name', label: 'Surveyor Name' },
    { value: 'region',label:'region'},
  ];

  useState(() => {
    setSelected('createddt');
    setDateFilterVisible(true);
    setSurveyorIdFilterVisible(false);
    setRegionFilterVisible(false);
  }, []);

  const onStatusFilterChange = (e) => {
    setSelected(e.value);
    setDateFilterVisible(e.value === 'createddt');
    setSurveyorIdFilterVisible(e.value === 'surveyor_name');
    setRegionFilterVisible(e.value === 'region');
  };

  return (
    <Formik
      innerRef={ref}
      initialValues={{
        searchtype: "selectsearchby",
        fromDate: "",
        toDate: "",
                
                //  searchtype:'surveyor_name',
                surveyor_name:"",
                selectedCity: "",

                //  searchtype  :"createddt"
      }}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({ values, touched, errors }) => (
        <Form>
          <FormContainer>
            <FormItem invalid={errors.name && touched.name} errorMessage={errors.name}>
              <div className="grid grid-cols-1 lg:grid-cols-3 ">
                <div className="lg:col-span-1 mt-2">
                  <h6>Search By</h6>
                </div>
                <div className="lg:col-span-2">
                  <Select size="md" className="" options={options} onChange={onStatusFilterChange} value={selected} />
                </div>
              </div>
              {DateFilterVisible && <SearchByDate />}
              {SurveyorIdFilterVisible && <SearchBySurveyorName />}
              {RegionFilterVisible && <SearchByRegion/>}
            </FormItem>
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
});

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
  );
};


const SurveyorFilter = () => {
  const formikRef = useRef();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = () => {
    setIsOpen(true);
  };

  const onDrawerClose = () => {
    setIsOpen(false);
  };

  const formSubmit = () => {
    formikRef.current?.submitForm();
  };

  // Handle the "Search" button click
  const handleSearchClick = () => {
    formikRef.current?.submitForm();
    setIsOpen(false); // Close the drawer after submitting the form
  };

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
        placement="right"
        footer={
          <DrawerFooter onCancel={onDrawerClose} onSaveClick={handleSearchClick} />
        }
      >
        <FilterForm ref={formikRef} onSubmitComplete={onDrawerClose} />
      </Drawer>
    </>
  );
};




export default SurveyorFilter;



//validation code 
// import React, { useState, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Input, Button, Select, DatePicker, Drawer } from 'components/ui';
// import { Field, Form, Formik } from 'formik';
// import { getreqSurveyor } from '../store/dataSlice';
// import { FcFilledFilter } from 'react-icons/fc';
// import * as Yup from 'yup';

// const SurveyorFilter = () => {
//   const dispatch = useDispatch();
//   const { token, tokenKey } = useSelector((state) => state.auth.user);
//   const [isOpen, setIsOpen] = useState(false);

//   const formikRef = useRef();

//   const handleSubmit = (values) => {
//     const payload = {
//       token,
//       tokenKey,
//       searchtype: values.searchType,
//       surveyor_name: values.surveyorName,
//       fromDate: values.fromDate,
//       toDate: values.toDate,
//     };

//     dispatch(getreqSurveyor(payload));
//   };

//   const openDrawer = () => {
//     setIsOpen(true);
//   };

//   const closeDrawer = () => {
//     setIsOpen(false);
//   };

//   const validationSchema = Yup.object().shape({
//     searchType: Yup.string().required('Please select a search type'),
//     surveyorName: Yup.string().when('searchType', {
//       is: 'surveyor_name',
//       then: Yup.string().required('Please enter a surveyor name'),
//     }),
//     fromDate: Yup.string().required('Please select From Date'),
//     toDate: Yup.string().required('Please select To Date'),
//   });

//   const options = [
//     { value: 'selectsearchby', label: 'Select' },
//     { value: 'createddt', label: 'Date' },
//     { value: 'surveyor_name', label: 'Surveyor Name' },
//   ];

//   const SearchBySurveyorName = () => {
//     const { setFieldValue, errors, touched } = useFormikContext();

//     return (
//       <div className="grid grid-cols-1 lg:grid-cols-3 mt-8">
//         <div className="lg:col-span-1 mt-2">
//           <h6>Surveyor Name</h6>
//         </div>
//         <div className="lg:col-span-2">
//           <Field
//             type="text"
//             autoComplete="off"
//             name="surveyorName"
//             placeholder="Surveyor Name"
//             component={Input}
//           />
//           {errors.surveyorName && touched.surveyorName && (
//             <div className="text-red-500">{errors.surveyorName}</div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <>
//       <Button
//         size="sm"
//         className="block md:inline-block ltr:md:ml-2 rtl:md:mr-2 md:mb-0 mb-4"
//         icon={<FcFilledFilter />}
//         onClick={openDrawer}
//       >
//         Filter
//       </Button>
//       <Drawer
//         title="Filter"
//         isOpen={isOpen}
//         onClose={closeDrawer}
//         onRequestClose={closeDrawer}
//         placement="right"
//       >
//         <Formik
//           innerRef={formikRef}
//           initialValues={{
//             searchType: 'selectsearchby',
//             fromDate: '',
//             toDate: '',
//             surveyorName: '',
//           }}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           {({ values, touched, errors }) => (
//             <Form>
//               <div className="grid grid-cols-1 lg:grid-cols-3">
//                 <div className="lg:col-span-1 mt-2">
//                   <h6>Search By</h6>
//                 </div>
//                 <div className="lg:col-span-2">
//                   <Field as={Select} name="searchType" className="form-control" size="md" options={options} />
//                   {errors.searchType && touched.searchType && (
//                     <div className="text-red-500">{errors.searchType}</div>
//                   )}
//                 </div>
//               </div>
//               {values.searchType === 'createddt' && (
//                 <>
//                   <div className="grid grid-cols-1 lg:grid-cols-3 mt-8">
//                     <div className="lg:col-span-1 mt-2">
//                       <h6>From date</h6>
//                     </div>
//                     <div className="lg:col-span-2">
//                       <DatePicker
//                         placeholder="From date"
//                         placement="bottomEnd"
//                         name="fromDate"
//                         component={Input}
//                       />
//                       {errors.fromDate && touched.fromDate && (
//                         <div className="text-red-500">{errors.fromDate}</div>
//                       )}
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-1 lg:grid-cols-3 mt-8">
//                     <div className="lg:col-span-1 mt-2">
//                       <h6>To date</h6>
//                     </div>
//                     <div className="lg:col-span-2">
//                       <DatePicker
//                         placeholder="To date"
//                         placement="bottomEnd"
//                         name="toDate"
//                         component={Input}
//                       />
//                       {errors.toDate && touched.toDate && (
//                         <div className="text-red-500">{errors.toDate}</div>
//                       )}
//                     </div>
//                   </div>
//                 </>
//               )}
//               {values.searchType === 'surveyor_name' && <SearchBySurveyorName />}
//               <div className="text-right w-full mt-8">
//                 <Button size="sm" className="mr-2" onClick={closeDrawer}>
//                   Cancel
//                 </Button>
//                 <Button size="sm" variant="solid" type="submit">
//                   Search
//                 </Button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </Drawer>
//     </>
//   );
// };

// export default SurveyorFilter;
