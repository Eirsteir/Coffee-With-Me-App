import { useQuery } from "@apollo/client";
import PENDING_BREAK_INVITATIONS_QUERY from "../graphql/pendingBreakInvitations.query";


export const usePendingBreakInvitations = () => useQuery(PENDING_BREAK_INVITATIONS_QUERY);
