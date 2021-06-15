import { useMutation, useQuery } from "@apollo/client";
import ACCEPT_BREAK_INVITATION from "../graphql/acceptBreakInvitation.mutation";
import INITIATE_BREAK_MUTATION from "../graphql/initiateBreak.mutation";
import PENDING_BREAK_INVITATIONS_QUERY from "../graphql/pendingBreakInvitations.query";


export const usePendingBreakInvitations = () => useQuery(PENDING_BREAK_INVITATIONS_QUERY);

export const useIniateBreak = options => useMutation(INITIATE_BREAK_MUTATION, options);

export const useAcceptBreakInvitation = (options, invitation) => useMutation(ACCEPT_BREAK_INVITATION, {
    update: (cache, { data }) => updatePendingBreakInvitationsCache(cache, { data }, invitation), 
    ...options
});

const updatePendingBreakInvitationsCache = (cache, { data }) => {
    const invitationId = data.acceptBreakInvitation.invitation.id;
    const existingInvitations = cache.readQuery({ query: PENDING_BREAK_INVITATIONS_QUERY });
    const newInvitations = existingInvitations.pendingBreakInvitations.edges.filter(t => (t.id !== invitationId));
    cache.writeQuery({
      query: PENDING_BREAK_INVITATIONS_QUERY,
      data: {pendingBreakInvitations: newInvitations}
    });
} 