import React, { useState } from 'react'
import { Spinner } from "@ui-kitten/components";
import { View } from "react-native"
import { useAcceptFriendRequest, useCancelFriendRequest, useRejectFriendRequest } from "../hooks/Friends";
import Button from "./Button"
import RemoveFriendButton from './RemoveFriendButton';
import AddFriendButton from './AddFriendButton';

const OutGoingFriendRequestButton = ({ user }) => {
    const [ hasCancelled, setHasCancelled ] = useState(false);
    const [ cancelFriendRequest, { data, loading, error}] = useCancelFriendRequest();
    
    const handleCancelFriendRequest = async () => {
        cancelFriendRequest({ variables: { toFriend: user.uuid } });
        setHasCancelled(true);
    }

    if (hasCancelled) {
        return <AddFriendButton user={user} />
    }

    return (
        <View>
            { error && error.message}
            <Button 
                children={loading ? <Spinner size='tiny' status='basic'/> : "Avbryt"}
                onPress={handleCancelFriendRequest}
            />
        </View>
    )
} 

export default OutGoingFriendRequestButton;