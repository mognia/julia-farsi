
export interface UserReceipt {
    status: string;
    _id: string;
    exchanger: string;
    exchangerEmail: string;
    amount: number;
    user: string;
    userEmail: string;
    verificationCode: string;
    codeExpiration: string;
    receiptNumber: number;
}

export interface UserInfo {
    KYCCode: string;
    KYCUpdated: Boolean;
    KYCVerified: true
    SignedContract: Boolean;
    balance: Number;
    birthDate: string;
    email: string;
    firstName: string;
    hasWallet: Boolean;
    imageAddress: string;
    lastName: string;
    passportImageAddress: string;
    registeredDate: string;
    telephone: string;
}