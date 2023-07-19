import React from 'react'
import { Button } from 'components/ui'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'

// import UserTableSearch from './UserTableSearch'

const InstallerTableTools = () => {
    const data= useSelector((state) => state.listsInstallerList.data.InstallerList.getData)
    const handleExport =  () => {
  //   try {
      // axios.post('http://fingercrewapi.alphonsol.com/User/ViewAlluserdetails', {
      // }).then(function(response) {
      //   console.log(response);
      // }).catch(function(error) {
      //   console.log(error);
      // })
      // const response = await axios.post('http://fingercrewapi.alphonsol.com/User/ViewAlluserdetails');
      // console.log(response)
     // const data = response.data;
      //exportToCSV(data);
    console.log(data)
    exportToCSV(data);

  // catch (error) {
  //    console.error('Failed to fetch data from API:', error);
  // }
  };

  const exportToCSV = (data) => {
    const csvContent = convertToCSV(data);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.setAttribute('download', 'Installersurveycountlist.csv');

    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const convertToCSV = (data) => {
    const headers = Object.keys(data[0]).join(',') + '\n';
    const rows = data.map((row) => Object.values(row).join(',')).join('\n');
    return headers + rows;
  };
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
             {/* <UserTableSearch /> */}
            {/* <ProductFilter />  */}
            {/* <Link
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                to="/data/user-list.csv"
                target="_blank"
                download
            > */}
                <Button block size="sm" onClick={handleExport}>
                <HiDownload className="inline-block mr-1" />
                    Export
                </Button>
            {/* </Link> */}
            {/* <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/adduser"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Add User
                </Button>
            </Link> */}
        </div>
    )
}

export default InstallerTableTools
