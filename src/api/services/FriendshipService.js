import FRIENDSHIP from '../friendship';

class FriendshipService {
    static getFriendingPossibilities = async () => {
        return FRIENDSHIP.getfriendingPossibilities();
    }
}

export default FriendshipService;