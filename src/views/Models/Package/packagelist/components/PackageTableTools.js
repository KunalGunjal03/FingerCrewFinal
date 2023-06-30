import React from 'react'
import { Button } from 'components/ui'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import { Link } from 'react-router-dom'
// import UserTableSearch from './UserTableSearch'

const PackageTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
             {/* <UserTableSearch /> */}
            {/* <ProductFilter />  */}
            <Link
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                to="/data/user-list.csv"
                target="_blank"
                download
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Export
                </Button>
            </Link>
            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/addpackage"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Add Package
                </Button>
            </Link>
        </div>
    )
}

export default PackageTableTools
