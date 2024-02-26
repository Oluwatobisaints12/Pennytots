type GroupParticipant = AccountProfileProp;

type GroupProps = {
  _id: string;
  image?: string;
  name: string;
  description?: string;
  createdBy: { first_name; last_name; _id; profile_picture?: string };
  participants: GroupParticipant[];
  muted?: boolean;
};

type AccountProfileProp = {
  _id: string;
  first_name: string;
  last_name: string;
  bio?: string;
  website?: string;
  linkedin?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  company?: string;
  company_position?: string;
  profile_picture?: string;
  interests?: string[];
  header_image?: string;
  muted?: boolean;
  age: string;
  city: string;
  state: string;
  gender: string;
  phone_number_verified: boolean;
  admin?: boolean;
};

//Interests / Tag Construct
interface IInterest {
  name: string;
  _id: string;
}

type ImageProp = {
  uri: string;
};

interface ITopic {
  name: string;
  content: string;
  image?: string;
  video?: string;
}
