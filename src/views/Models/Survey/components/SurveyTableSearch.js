import React, { useRef, useState, useEffect } from 'react';
import { Input } from 'components/ui';
import { HiOutlineSearch } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash/debounce';
import cloneDeep from 'lodash/cloneDeep';
import { setTableData, getSurveyListByParam, setCustomerList } from '../store/dataSlice';
import { OrgData } from 'constants/api.constant';

const SurveyorTableSearch = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [originalData, setOriginalData] = useState([]);
//   const searchInput = useRef();
  const data = useSelector((state) => state.crmCustomers.data.SurveyList.getData);

  useEffect(() => {
    setOriginalData(data);
  }, [data]);

  const onEdit = async (e) => {
    setOriginalData(data);
    const val = e.target.value;
    setSearchTerm(val);

    try {
      if (val.length > 0) {
        console.log(val)
        
        const filteredResults = data.filter(item =>
          item.survey_id.includes(val)
        );
        setOriginalData(data);
        console.log(originalData)
        fetchData(filteredResults);
      } 
    else {
      console.log(val.length) 
        // fetchData(originalData);
        console.log(originalData) 
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = (data) => {
    dispatch(setCustomerList(data));
    // dispatch(getSurveyListByParam(data));
  };

    return (
        <Input
            // ref={searchInput}
            className="max-w-md md:w-52 mb-4"
            size="sm"
            placeholder="Search"
            prefix={<HiOutlineSearch className="text-lg" />}
            onChange={onEdit}
        />
    )
}
export default SurveyorTableSearch
