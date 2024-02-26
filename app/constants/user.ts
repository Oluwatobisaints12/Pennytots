import { t } from 'i18next';

const genders = [
  { label: 'Male', value:  t('EditProfile_genderM') },
  { label: 'Female', value: t("EditProfile_genderF") },
];

const ageRange = [
  { label: '18-25', value: '18-25' },
  { label: '26-35', value: '26-35' },
  { label: '36-45', value: '36-45' },
  { label: '46-55', value: '46-55' },
  { label: '56-65', value: '56-65' },
  { label: 'Over 65', value: 'Over 65' },
];

export const userConstants = {
  genders,
  ageRange,
};
