const bcrypt = require("bcrypt");
const crypto = require('crypto');



const checkPwd = async () => {
    const passwordToCheck = 'testowehaslo';
    const hashedPasswordStoreInDb = '$2a$10$MJqSZc0FIm.2SoiaoLtKfeE.6UUfOtxTeyYeewKkSWPNkaFHoRNtq';

    const check = await bcrypt.compare(passwordToCheck, hashedPasswordStoreInDb);

    console.log(check)
    if (check) {
        console.log('HASLO OK')
    } else {
        console.log('ZLE HASLO')
    }
}

checkPwd();

