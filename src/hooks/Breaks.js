import { useMutation, useQuery } from "@apollo/client";
import ACCEPT_BREAK_INVITATION from "../graphql/acceptBreakInvitation.mutation";
import BREAK_HISTORY_QUERY from "../graphql/breakHistory.query";
import DECLINE_BREAK_INVITATION from "../graphql/declineBreakInvitation.mutation";
import INITIATE_BREAK_MUTATION from "../graphql/initiateBreak.mutation";
import PENDING_BREAK_INVITATIONS_QUERY from "../graphql/pendingBreakInvitations.query";


export const useBreakHistory = () => useQuery(BREAK_HISTORY_QUERY);

export const usePendingBreakInvitations = (options) => useQuery(PENDING_BREAK_INVITATIONS_QUERY, {
    notifyOnNetworkStatusChange: true,
    ...options,
});

export const useIniateBreak = options => useMutation(INITIATE_BREAK_MUTATION, options);

export const useAcceptBreakInvitation = (options, invitation) => useMutation(ACCEPT_BREAK_INVITATION, {
    update: (cache, { data }) => updatePendingBreakInvitationsCache(cache, { data }, invitation), 
    ...options
});

export const useDeclineBreakInvitation = (options, invitation) => useMutation(DECLINE_BREAK_INVITATION, {
    update: (cache, { data }) => updatePendingBreakInvitationsCache(cache, { data }, invitation), 
    ...options
});

const updatePendingBreakInvitationsCache = (cache, { data }, invitation) => {
    const existingInvitations = cache.readQuery({ query: PENDING_BREAK_INVITATIONS_QUERY });
    const newInvitations = existingInvitations.pendingBreakInvitations.edges.filter(t => (t.id !== invitation.id));
    cache.writeQuery({
      query: PENDING_BREAK_INVITATIONS_QUERY,
      data: {pendingBreakInvitations: newInvitations}
    });
} 