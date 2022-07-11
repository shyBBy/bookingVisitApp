const handlebarsHelpers = {
    isAdmin: (userRole) => {
        if(userRole === 'admin') {
            return true
        }
    },
    isStaff: (userRole) => {
        if(userRole === 'staff') {
            return true
        }
    },
    isActive: (status) => {
        if(status === 'active'){
            return true
        }
    },
    isPending: (status) => {
        if(status === 'pending'){
            return true
        }
    },
    isEnded: (status) => {
        if(status === 'ended'){
            return true
        }
    },
    isCanceled: (status) => {
        if(status === 'canceled'){
            return true
        }
    },
    // isCheckedUserIsLoggedUser: (idFromUrl, idFromSession) => {
    //     if(idFromUrl === idFromSession){
    //         return true
    //     }
    // }
    // isNotActiveEndedCanceled: (status) => {
    //     if(status === 'canceled'){
    //         return true
    //     }
    // },

    // handleUrlUserId: (userId) => {
    //     const qs = new URLSearchParams({
    //         userId: userId,
    //     });
    //     return qs.toString();
    // },
};

module.exports = {
    handlebarsHelpers,
};
