import React from 'react'
import { Button } from 'components/ui'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'

const SuspendTableTools = () => {
    const data= useSelector((state) => state.listsSurveyorList.data.surveyorList.getData)
    const handleExport =  () => {
    console.log(data)
    exportToCSV(data);
  };

  const exportToCSV = (data) => {
    const csvContent = convertToCSV(data);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.setAttribute('download', 'CancelSuspend-list.csv');

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
       <Button  block size="sm" onClick={handleExport}>
       <HiDownload className="block lg:inline-block md:mx-2 md:mb-0 mb-4 mr-1" />
           Export
       </Button>

            {/* <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/addBlacklist"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Add Blacklist
                </Button>
            </Link> */}
        </div>
    )
}

export default SuspendTableTools
