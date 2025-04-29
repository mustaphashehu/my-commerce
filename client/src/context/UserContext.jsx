import {createContext, useCallback, useContext, useEffect, useState} from 'react';
import {baseUrl, getRequest,deleteRequest, postRequestFormData, updateRequest, patchRequest} from '../utils/service';

import { FormContext } from './FormContext';
import { AuthContext } from './AuthContext';

export const UserContext = createContext();

export const UserContextProvider = ({children}) => {
    const {updateUserData} = useContext(FormContext)
    const {setUser} = useContext(AuthContext)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [myDetails, setMyDetails] = useState(null);
    const [myDetailsError, setMyDetailsError] = useState(null);
    const [myDetailsIsLoading, setMyDetailsIsLoading] = useState(false);
    var userID = ""
    //admin users
    const [users, setUsers] = useState([]);
    const [usersIsLoading, setUsersIsLoading] = useState(false);
    const [usersError, setUsersError] = useState(null);

    //single user
    const [singleUser, setSingleUser] = useState(null)
    const [userIsLoading, setUserIsLoading] = useState(false)
    const [userError, setUserError] = useState(null);
    //delete user
    const [deleteID, setDeleteID] = useState("")
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [deleteError, setDeleteError] = useState(null)

    //update user
    const [updateLoading, setUpdateLoading] = useState(false); // Loading state for updating
    const [updateError, setUpdateError] = useState(null);




    // States for Verified Users
    const [verifiedUsers, setVerifiedUsers] = useState([]);
    const [verifiedLoading, setVerifiedLoading] = useState(false);
    const [verifiedError, setVerifiedError] = useState(null);

    // States for Unverified Users
    const [unverifiedUsers, setUnverifiedUsers] = useState([]);
    const [unverifiedLoading, setUnverifiedLoading] = useState(false);
    const [unverifiedError, setUnverifiedError] = useState(null);

    // States for Pending Verification Users
    const [pendingUsers, setPendingUsers] = useState([]);
    const [pendingLoading, setPendingLoading] = useState(false);
    const [pendingError, setPendingError] = useState(null);

    // States for Fake Identity Users
    const [fakeUsers, setFakeUsers] = useState([]);
    const [fakeLoading, setFakeLoading] = useState(false);
    const [fakeError, setFakeError] = useState(null);


    // States for User Verification Actions
    const [verifyLoading, setVerifyLoading] = useState(false);
    const [verifyError, setVerifyError] = useState(null);

    const [unVerifyLoading, setUnVerifyLoading] = useState(false);
    const [unVerifyError, setUnVerifyError] = useState(null);

    const [markFakeLoading, setMarkFakeLoading] = useState(false);
    const [markFakeError, setMarkFakeError] = useState(null);



    const getMyDetails = useCallback(async () => {
        setMyDetailsIsLoading(true);
        setMyDetailsError(null);

        const response = await getRequest(`${baseUrl}/users/showcurrentuser`);
        setMyDetailsIsLoading(false);

        if (response.error) {
            return setMyDetailsError(response.message);
        }

        console.log(response);
        
        setMyDetails(response);
    })

     useEffect(() => {   
        getMyDetails;
    }, []);

    const getAllUsers = useCallback(async () => {
        setUsersIsLoading(true);
        setUsersError(null);

        const response = await getRequest(`${baseUrl}/users`);
        setUsersIsLoading(false);
        console.log(response);
        if (response.error) {
            return setUsersError(response.message);
        }

        
        
        setUsers(response);
    },[])


    const getOneUser = useCallback(async (id) => {
        userID = id
        
        setDeleteID(id)
        setUserIsLoading(true)
        setUserError(null)

        const response = await getRequest(`${baseUrl}/users/${id}`);

        setUserIsLoading(false)
        if (response.error) {
            return setUserError(response.message);
        }

        setIsModalOpen(true)
        setSingleUser(response)
    },[])


    const deleteUser = useCallback(async () => {
        
        setDeleteLoading(true)
        setDeleteError(null)

        const response = await deleteRequest(`${baseUrl}/users/deleteUser/${userID}`);
        setDeleteLoading(false)
        if (response.error) {
            setDeleteError(response);
        }

        setIsModalOpen(false)
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userID));
    },[])
    
    const updateUser = useCallback(async (e) => {
        e.preventDefault()
        setUpdateLoading(true);
        setUpdateError(null);
    
        const response = await updateRequest(`${baseUrl}/users/updateuser`, updateUserData);
    
        setUpdateLoading(false);
        
        if (response.error) {
            return setUpdateError(response);
        }
    
        localStorage.setItem("User", JSON.stringify(response))
        setUser(response)
        
        // setUsers((prevUsers) => 
        //     prevUsers.map((user) => 
        //         user._id === userID ? { ...user, ...updatedData } : user
        //     )
        // );
    }, [updateUserData]);


    // Fetch verified users
    const getVerifiedUsers = useCallback(async () => {
        setVerifiedLoading(true);
        setVerifiedError(null);

        const response = await getRequest(`${baseUrl}/users/verifiedusers`);

        setVerifiedLoading(false);
        if (response.error) {
            return setVerifiedError(response.message);
        }

        setVerifiedUsers(response);
    }, []);

    // Fetch unverified users
    const getUnverifiedUsers = useCallback(async () => {
        setUnverifiedLoading(true);
        setUnverifiedError(null);

        const response = await getRequest(`${baseUrl}/users/unverifiedusers`);

        setUnverifiedLoading(false);
        if (response.error) {
            return setUnverifiedError(response.message);
        }

        setUnverifiedUsers(response);
    }, []);

    // Fetch users with pending verification (submitted NIN but not verified)
    const getPendingUsers = useCallback(async () => {
        setPendingLoading(true);
        setPendingError(null);

        const response = await getRequest(`${baseUrl}/users/pendingusers`);

        setPendingLoading(false);
        if (response.error) {
            return setPendingError(response.message);
        }

        setPendingUsers(response);
    }, []);

    // Fetch users labeled as fake identity
    const getFakeUsers = useCallback(async () => {
        setFakeLoading(true);
        setFakeError(null);

        const response = await getRequest(`${baseUrl}/users/fakeusers`);

        setFakeLoading(false);
        if (response.error) {
            return setFakeError(response.message);
        }

        setFakeUsers(response);
    }, []);

    // Verify a User
    const verifyUser = useCallback(async (id) => {
        setVerifyLoading(true);
        setVerifyError(null);

        const response = await patchRequest(`${baseUrl}/users/verifyuser/${id}`);

        setVerifyLoading(false);
        if (response.error) {
            return setVerifyError(response.message);
        }

        // Refresh the users list after verification
        getVerifiedUsers();
        getUnverifiedUsers();
        getPendingUsers();
    }, []);

    // Unverify a User
    const unVerifyUser = useCallback(async (id) => {
        console.log("iidididiidd");
        
        setUnVerifyLoading(true);
        setUnVerifyError(null);

        const response = await patchRequest(`${baseUrl}/users/unverifyuser/${id}`);

        setUnVerifyLoading(false);
        if (response.error) {
            return setUnVerifyError(response.message);
        }

        // Refresh the users list after unverification
        getVerifiedUsers();
        getUnverifiedUsers();
        getPendingUsers();
    }, []);


    const markUserAsFake = useCallback(async (id) => {
        setMarkFakeLoading(true);
        setMarkFakeError(null);
    
        const response = await patchRequest(`${baseUrl}/users/markuserasfake/${id}`);
    
        setMarkFakeLoading(false);
        if (response.error) {
            return setMarkFakeError(response.message);
        }
    
        // Refresh lists since user is now unverified and fake
        getFakeUsers();
        getUnverifiedUsers();
    }, []);

    const unMarkUserAsFake = useCallback(async (id) => {
        setMarkFakeLoading(true);
        setMarkFakeError(null);
    
        const response = await patchRequest(`${baseUrl}/users/unmarkuserasfake/${id}`);
    
        setMarkFakeLoading(false);
        if (response.error) {
            return setMarkFakeError(response.message);
        }
    
        // Refresh lists since user is now unverified and fake
        getFakeUsers();
        getUnverifiedUsers();
    }, []);
    return <UserContext.Provider value={{
        getMyDetails,
        users,
        usersIsLoading,
        usersError,
        myDetails,
        myDetailsError,
        myDetailsIsLoading,
        getAllUsers,
        getOneUser,
        singleUser,
        userIsLoading,
        userError,
        isModalOpen,
        setIsModalOpen,
        deleteUser,
        updateUser,
        updateLoading,
        updateError,

        // Verified Users
        verifiedUsers,
        verifiedLoading,
        verifiedError,
        getVerifiedUsers,

        // Unverified Users
        unverifiedUsers,
        unverifiedLoading,
        unverifiedError,
        getUnverifiedUsers,

        // Users with NIN but Not Verified
        pendingUsers,
        pendingLoading,
        pendingError,
        getPendingUsers,

        // Fake Identity Users
        fakeUsers,
        fakeLoading,
        fakeError,
        getFakeUsers,

        // Marking a User as Fake
        markUserAsFake,
        markFakeLoading,
        markFakeError,

        verifyLoading,
        verifyError,
        verifyUser,

        unVerifyLoading,
        unVerifyError,
        unVerifyUser,

        unMarkUserAsFake
    }}>
        {children}
    </UserContext.Provider>;
}