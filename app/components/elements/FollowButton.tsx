import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, Text,StyleSheet } from 'react-native';
import { useIsFollowingUser,useFollowUser,useUnfollowUser } from 'app/redux/follow/hooks';



interface FollowButtonProps {
  userId?: string;
}

const FollowButton = ({ userId }:FollowButtonProps) => {
  const {data, isLoading} = useIsFollowingUser(userId);
  const { mutateAsync:followUser, isLoading: loadings } = useFollowUser();
  const { mutateAsync: unfollowUser, isLoading: loading } = useUnfollowUser();
  const [isFollowing, setIsFollowing] = useState(false);
  const { t } = useTranslation();
  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await unfollowUser(userId);
        setIsFollowing(false); 
      } else {
        await followUser(userId);
        setIsFollowing(true); 
      }
    } catch (error) {
      console.error('Error updating follow status', error);
    }
  };

  useEffect(() => {
    setIsFollowing(data?.data?.isFollowing || false);
  }, [data]);

  // TODO: Fetch initial follow status from API


  return (
    <TouchableOpacity onPress={handleFollowToggle} style={[styles.button]}>
      <Text style={styles.buttonText}>
      {isFollowing ? 'Unfollow' : 'Follow'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 85,
    borderRadius: 12,
    borderWidth: 1,
    padding: 4,
    paddingHorizontal: 10,
    borderColor: "#FED830",
    backgroundColor: 'white', // Adjust as needed
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  
  buttonText: {
    color: '#48463E', 
    fontFamily: "regular",
    fontSize: 14
  },
});

export default FollowButton;