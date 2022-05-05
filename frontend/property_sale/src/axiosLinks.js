// export const baseURL = 'http://192.168.1.70:8000';
export const baseURL = 'http://127.0.0.1:8000';
const wsURL = 'ws://127.0.0.1:8000';
// const wsURL = 'ws://192.168.1.70:8000';


const links = {
    googleLogin : `${baseURL}/dj-rest-auth/google/`,
    facebookLogin : ``,
    register : `${baseURL}/api/account/login/`,
    sendVerificationMail: `${baseURL}/api/account/registration/resend-email/`,
    registration : `${baseURL}/api/account/registration/`,
    tokenVerify : `${baseURL}/api/account/token/verify/`,
    refreshTokenVerify : `${baseURL}/api/account/token/refresh/`,
    login : `${baseURL}/api/account/login/`,
    logout : `${baseURL}/api/account/logout/`,
    sendPasswordResetMail : `${baseURL}/api/account/password/reset/`,
    passwordChange : `${baseURL}/password-reset/confirm`,
    retriveUser : `${baseURL}/api/retrive-user`,
    updateUser : `${baseURL}/api/update-user/`,
    retriveKyc : `${baseURL}/api/kyc-retrive`,
    createKyc : `${baseURL}/api/kyc-create/`,
    updateKyc : `${baseURL}/api/kyc-update/`,
    kycStatusWs : `${wsURL}/ws/status/`,
    foreignKeys : `${baseURL}/api/list-for-keys`,
    postLand : `${baseURL}/api/property/post-land/`,
    postHouse : `${baseURL}/api/property/post-house/`,
    getAllHouse : `${baseURL}/api/property/house/all/`,
    getAllLand : `${baseURL}/api/property/land/all/`,
    getMyHouse : `${baseURL}/api/list-user-house/`,
    getMyLand : `${baseURL}/api/list-user-land/`,
    getHouse : `${baseURL}/api/property/house/`,
    getLand : `${baseURL}/api/property/land/`,
    updateHouseStatus : `${baseURL}/api/update-house-status/`,
    updateLandStatus: `${baseURL}/api/update-land-status/`,
    searchLandByType : `${baseURL}/api/property/land/`,
    searchHouseByType : `${baseURL}/api/property/house/`,
    changePassword : `${baseURL}/api/account/password/change/`,
    noOfViewsHouse : `${wsURL}/ws/house/`,
    noOfViewsLand : `${wsURL}/ws/land/`,
    searchLands : `${baseURL}/api/property/land/all/?search=`,
    searchHouses : `${baseURL}/api/property/house/all/?search=`,
    listingNotification : `${wsURL}/ws/property/`
}

export default links;