import React, { useState } from 'react'
import { Spinner } from "@ui-kitten/components";
import { Alert } from "react-native"
import { useCancelFriendRequest } from "../../hooks/Friends";
import Button from "../Button"
import AddFriendButton from './AddFriendButton';

// TODO: Invalider cache
const OutGoingFriendRequestButton = ({ user }) => {
    const [ hasCancelled, setHasCancelled ] = useState(false);
    const [ cancelFriendRequest, { data, loading, error}] = useCancelFriendRequest({ 
        variables: { toFriend: user.uuid },
        onCompleted: () => {
            Alert.alert("Du har avbrutt venneforespørselen til " + user.name);
            setHasCancelled(true);
          },
          onError: err => Alert.alert(err) 
    });

    if (hasCancelled) {
        return <AddFriendButton user={user} />
    }

    return (
        <Button 
            children={loading ? <Spinner size='tiny' status='basic'/> : "Avbryt"}
            onPress={cancelFriendRequest}
        />
    )
} 

export default OutGoingFriendRequestButton;