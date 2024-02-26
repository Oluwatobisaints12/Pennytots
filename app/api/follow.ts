import { Axios } from 'app/api/axios';
import { user } from './user';

const followUser = async (userId: any) => {
  return await Axios.get(`/followers/follow/${userId}`);
};

const unfollowUser = async (userId: any) => {

  return await Axios.get(`/followers/unfollow/${userId}`);
};

const isFollowingUser = async (userId : string) => {
  return await Axios.get(`/followers/isFollowing/${userId}`);
}

// const followUser = async (userId: any) => {
//   // Mock response data
//   const mockResponse = {
//     success: true,
//     message: `User with ID ${userId} followed successfully`,
//   };

//   // Simulating an async operation (e.g., HTTP request)
//   return new Promise((resolve) => {
//     setTimeout(() => resolve(mockResponse), 500);
//   });
// };

// const unfollowUser = async (userId: any) => {
//   // Mock response data
//   const mockResponse = {
//     success: true,
//     message: `User with ID ${userId} unfollowed successfully`,
//   };

//   // Simulating an async operation
//   return new Promise((resolve) => {
//     setTimeout(() => resolve(mockResponse), 500);
//   });
// };

// const isFollowingUser = async (userId: string) => {
//   // Mock response data
//   const mockResponse = {
//     isFollowing: true, // or false, based on your test scenario
//     message: `User with ID ${userId} is currently followed/unfollowed`,
//   };

//   // Simulating an async operation
//   return new Promise((resolve) => {
//     setTimeout(() => resolve(mockResponse), 500);
//   });
// };



export const follow = {
  isFollowingUser,
  followUser,
  unfollowUser
};
