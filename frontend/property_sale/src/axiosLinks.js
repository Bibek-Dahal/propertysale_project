// const baseURL = 'http://192.168.1.70:8000';
const baseURL = 'http://127.0.0.1:8000';
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
    kycStatusWs : `${wsURL}/ws/status/`
}

export default links;