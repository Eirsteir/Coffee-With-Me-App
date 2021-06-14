import { useMutation, useQuery } from "@apollo/client";
import ACCEPT_BREAK_INVITATION from "../graphql/acceptBreakInvitation.mutation";
import INITIATE_BREAK_MUTATION from "../graphql/initiateBreak.mutation";
import PENDING_BREAK_INVITATIONS_QUERY from "../graphql/pendingBreakInvitations.query";


export const usePendingBreakInvitations = () => useQuery(PENDING_BREAK_INVITATIONS_QUERY);

export const useIniateBreak = options => useMutation(INITIATE_BREAK_MUTATION, options);

export const useAcceptBreakInvitation = options => useMutation(ACCEPT_BREAK_INVITATION, options);