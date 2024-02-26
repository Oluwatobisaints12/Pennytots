import { Axios } from './axios';

const getGroup = async (groupId: string) => {
  const { data } = await Axios.get('/group/view/' + groupId);

  return data;
};

const getMyGroups = async () => {
  const { data } = await Axios.get('/group/my-groups');
  return data.groups.docs;
};

const getSuggestedGroups = async () => {
  const { data } = await Axios.get('/group/suggested-groups');
  return data.groups.docs;
};

const updateGroup = async (payload: any) => {
  const { data } = await Axios.patch(
    '/group/update/' + payload.id,
    payload.data,
  );

  return data;
};

const updateGroupPicture = async (payload: any) => {
  const { data } = await Axios.patch(
    '/group/update-group-picture/' + payload.id,
    payload.data,
  );

  return data;
};

const reportGroup = async (groupId: string,description: string) =>{
  const { data } = await Axios.post('/group/flag/' + groupId, {description});
  return data;
}



export const group = {
  getGroup,
  getMyGroups,
  getSuggestedGroups,
  updateGroup,
  updateGroupPicture,
  reportGroup
};
