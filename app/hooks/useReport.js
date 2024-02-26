import { group,topic,user } from 'app/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ShowAlert } from 'app/providers/toast';


export function useReport(reportType) {
  let reportFunction;

  switch (reportType) {
    case 'user':
      reportFunction = user.reportUser;
      break;
    case 'comment':
      reportFunction = topic.reportSubComments;
      break;
    case 'group':
      reportFunction = group.reportGroup;
      break;
    case 'topic':
      reportFunction = topic.reportTopic;
      break;
    case undefined:
      reportFunction = topic.reportTopic;
      break
    default:
      throw new Error("Unknown parameter")
  }

  
  const { mutateAsync: report, isLoading } = useMutation(reportFunction, 
    {
      onSuccess: (response, variables, context) => {
        showMessage({
          type: 'success',
          title: 'Success',
          message: response.message,
        });
      },
    }
  );
  // const handleReport = async (Id, description) => {
  //   await report({Id,description});
  // };

  return { report, isLoading };
}