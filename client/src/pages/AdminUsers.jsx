import { useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableOne from '../components/Tables/TableOne';
import TableThree from '../components/Tables/TableThree';
import TableTwo from '../components/Tables/TableTwo';

const AdminUsers = () => {
  const { getAllUsers, users, usersError, usersIsLoading, getVerifiedUsers, verifiedUsers, verifiedLoading, verifiedError, getUnverifiedUsers, unverifiedUsers, unverifiedLoading, unverifiedError, getPendingUsers, pendingUsers, pendingLoading, pendingError, getFakeUsers, fakeUsers, fakeLoading, fakeError} = useContext(UserContext);

  useEffect(() => {
    getVerifiedUsers();
    getUnverifiedUsers();
    getPendingUsers();
    getFakeUsers();
    getAllUsers();
  }, [getAllUsers, getVerifiedUsers, getUnverifiedUsers, getPendingUsers, getFakeUsers])

  return (
    <>
      <Breadcrumb pageName="Users" />

      <div className="flex flex-col gap-10">
        {usersIsLoading ?
        <div className="flex justify-center items-center min-h-screen">
        <div className="border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
      </div> :
        usersError ? "error" :
        <TableOne users={users} theName={"users"}/>
      }
        
      </div>

      <div className="flex flex-col gap-10">
        {verifiedLoading ?
        <div className="flex justify-center items-center min-h-screen">
        <div className="border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
      </div> :
        verifiedError ? "error" :
        <TableOne users={verifiedUsers} theName={"verified users"}/>
      }
        
      </div>

      <div className="flex flex-col gap-10">
        {unverifiedLoading ?
        <div className="flex justify-center items-center min-h-screen">
        <div className="border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
      </div> :
        unverifiedError ? "error" :
        <TableOne users={unverifiedUsers} theName={"unverified users"}/>
      }
        
      </div>

      <div className="flex flex-col gap-10">
        {pendingLoading ?
        <div className="flex justify-center items-center min-h-screen">
        <div className="border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
      </div> :
        pendingError ? "error" :
        <TableOne users={pendingUsers} theName={"pending users"}/>
      }
        
      </div>

      <div className="flex flex-col gap-10">
        {fakeLoading ?
        <div className="flex justify-center items-center min-h-screen">
        <div className="border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
      </div> :
        fakeError ? "error" :
        <TableOne users={fakeUsers} theName={"fake users"}/>
      }
        
      </div>
    </>
  );
};

export default AdminUsers;
{/* <TableTwo />
        <TableThree /> */}


        //dldss 361