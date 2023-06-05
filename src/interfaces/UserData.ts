interface UserData {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  email: string;
  emailVerification: boolean;
  name: string;
  passwordUpdate: string;
  phone: string;
  phoneVerification: boolean;
  prefs: Record<string, any>; // You can replace 'any' with the specific type if known
  registration: string;
  status: boolean;
  // Add any other properties if applicable
}

export default UserData;
