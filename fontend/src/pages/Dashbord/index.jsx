import React from 'react'
import { useUser } from '@clerk/clerk-react'
import { useFinancialRecord } from '../../contexts/financial.context'
import Table from './Table';
import AddRecord from './AddRecord';


const Dashbord = () => {
  const {user} = useUser();
  
  
  return (
    <div>
      <AddRecord/>
      <br />
      <br />
      <br />
      <Table />
      <br />
      <br />
      <br />
     <div> welcome {user?.firstName}! Here are your financial:</div>
     <div> Totle Monthly: 0000฿</div>
     <div> FinancialRecordTable</div>
     
    </div>
  )
}

export default Dashbord