import React, { useState } from 'react'
import { Spinner } from "@ui-kitten/components";
import { View } from "react-native"
import { useAcceptFriendRequest, useRejectFriendRequest } from "../hooks/Friends";
import Button from "./Button"
import RemoveFriendButton from './RemoveFriendButton';
import AddFriendButton from './AddFriendButton';

const IncomingFriendRequestButton = ({ user }) => {
    const [ hasAccepted, setHasAccepted ] = useState(false);
    const [ hasRejected, setHasRejected ] = useState(false);
    const [ acceptFriendRequest, { data: acceptData, loading: acceptLoading, error: acceptError}] = useAcceptFriendRequest();
    const [ rejectFriendRequest, { data: rejectData, loading: rejectLoading, error: rejectError}] = useRejectFriendRequest();

    const handleAcceptFriendRequest = () => {
        acceptFriendRequest({ variables: { requester: user.uuid } });
        setHasAccepted(true);
    }

    const handleRejectFriendRequest = () => {
        rejectFriendRequest({ variables: { requester: user.uuid } });
        setHasRejected(true);
    }

    if (hasAccepted) {
        return <RemoveFriendButton user={user} />
    } else if (hasRejected) {
        return <AddFriendButton user={user} />
    }

    return (
        <View style={{ flex: 1 }}>
            { acceptError && acceptError.message}
            { rejectError && rejectError.message}
            <Button 
                children={acceptLoading ? <Spinner size='tiny' status='basic'/> : "Bekreft"}
                onPress={handleAcceptFriendRequest}
            />
            <Button 
                children={rejectLoading ? <Spinner size='tiny' status='basic'/> : "Avvis"}
                onPress={handleRejectFriendRequest}
            />
        </View>
    )
} 

export default IncomingFriendRequestButton;