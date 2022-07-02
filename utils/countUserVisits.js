module.exports = {
    activeVisits:(userBookingList) => {
        userBookingList.forEach(userBooking => {
            if (userBooking.status === "active") {
                const activeUserBooking = [userBooking];
                return activeUserBooking.length;
            }
        })
    },
    pendingVisits:(userBookingList) => {
        userBookingList.forEach(userBooking => {
            if (userBooking.status === "pending") {
                const pendingUserBooking = [userBooking];
                return pendingUserBooking.length;
            }
        })
    },
    endedVisits:(userBookingList) => {
        userBookingList.forEach(userBooking => {
            if (userBooking.status === "ended") {
                const endedUserBooking = [userBooking];
                return endedUserBooking.length;
            }
        })
    },
};