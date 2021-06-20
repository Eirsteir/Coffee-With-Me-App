import React, { useState } from 'react'
import { Spinner, useStyleSheet, StyleService, ButtonGroup } from "@ui-kitten/components";

import { useAcceptFriendRequest, useRejectFriendRequest } from "../../hooks/Friends";
import Button from "../Button"
import RemoveFriendButton from './RemoveFriendButton';
import AddFriendButton from './AddFriendButton';

const IncomingFriendRequestButton = ({ user }) => {
    const styles = useStyleSheet(themedStyles);
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
        <ButtonGroup style={styles.buttonGroup}>
            {/* { acceptError && acceptError.message}
            { rejectError && rejectError.message} */}
            <Button 
                children={acceptLoading ? <Spinner size='tiny' status='basic'/> : "Bekreft"}
                onPress={handleAcceptFriendRequest}
            />
            <Button 
                children={rejectLoading ? <Spinner size='tiny' status='basic'/> : "Slett"}
                onPress={handleRejectFriendRequest}
                // appearance='ghost'
                status='basic'
            />
        </ButtonGroup>
    )
} 

const themedStyles = StyleService.create({
    buttonGroup: {
        margin: 2,
      },    
});

export default IncomingFriendRequestButton;