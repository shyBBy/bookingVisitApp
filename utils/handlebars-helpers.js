const handlebarsHelpers = {
    isAdmin: (a) => {
        return !!a
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
