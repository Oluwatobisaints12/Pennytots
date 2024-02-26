import React, { FunctionComponent } from 'react';
import { ISVG } from './types';

import LoginHeaderSVG from 'app/assets/svg/login-header.svg';
import ProfileSVG from 'app/assets/svg/profile.svg';
import HomeTabSVG from 'app/assets/svg/home-tab.svg';
import SearchSVG from 'app/assets/svg/search.svg';
import GroupSVG from 'app/assets/svg/group.svg';
import CommentSVG from 'app/assets/svg/comment.svg';
import ProfileGoldSVG from 'app/assets/svg/profile-gold.svg';
import EmptySearchSVG from 'app/assets/svg/empty-search.svg';
import PostATopicSVG from 'app/assets/svg/post-a-topic.svg';
import CreateGroupSVG from 'app/assets/svg/create-group.svg';
import SettingsSVG from 'app/assets/svg/settings.svg';
import UpgradeSVG from 'app/assets/svg/upgrade.svg';
import LogoutSVG from 'app/assets/svg/logout.svg';
import HelpdeskSVG from 'app/assets/svg/helpdesk.svg';
import DarkLikeSVG from 'app/assets/svg/dark-like.svg';
import DarkGroupSVG from 'app/assets/svg/dark-group.svg';
import DarkChangePinSVG from 'app/assets/svg/dark-change-pin.svg';
import DarkBlockedChatSVG from 'app/assets/svg/dark-blocked-chat.svg';
import DarkUserTermSVG from 'app/assets/svg/dark-user-terms.svg';
import DarkAboutSVG from 'app/assets/svg/dark-about.svg';
import WarnInfoSVG from 'app/assets/svg/warn-info.svg';
import UploadPhotoSVG from 'app/assets/svg/upload-photo.svg';
import SignUpHeaderSVG from 'app/assets/svg/sign-up-header.svg';
import ConvoSVG from 'app/assets/svg/convo.svg';
import ForgotPasswordSVG from 'app/assets/svg/forgot-password.svg';
import Quiz from 'app/assets/svg/quiz.svg';

const SVG: FunctionComponent<ISVG> = ({ name, width, height, size }) => {
  if (size) {
    width = size;
    height = size;
  }

  const widthProps = width ? { width } : {};
  const heightProps = height ? { height } : {};

  switch (name) {
    case 'comment':
      return <CommentSVG {...widthProps} {...heightProps} />;
    case 'login-header':
      return <LoginHeaderSVG {...widthProps} {...heightProps} />;
    case 'home-tab':
      return <HomeTabSVG {...widthProps} {...heightProps} />;
    case 'group':
      return <GroupSVG {...widthProps} {...heightProps} />;
    case 'search':
      return <SearchSVG {...widthProps} {...heightProps} />;
    case 'conversation':
      return <ConvoSVG {...widthProps} {...heightProps} />;
    case 'forgot-password':
        return <ForgotPasswordSVG {...widthProps} {...heightProps} />;
    case 'quiz':
      return <Quiz {...widthProps} {...heightProps} />;
    default:
      return <CommentSVG {...widthProps} {...heightProps} />;
  }
};

export default SVG;
