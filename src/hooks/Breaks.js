import { useMutation, useQuery } from "@apollo/client";
import INITIATE_BREAK_MUTATION from "../graphql/initiateBreak.mutation";
import PENDING_BREAK_INVITATIONS_QUERY from "../graphql/pendingBreakInvitations.query";


export const usePendingBreakInvitations = () => useQuery(PENDING_BREAK_INVITATIONS_QUERY);

export const useIniateBreak = () => useMutation(INITIATE_BREAK_MUTATION);