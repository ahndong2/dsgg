import { BizAccountSubDetail, BizAccountSub, BizAccountSubProject } from '@types';

export const sortBizAccountSubDetailList = (contents: BizAccountSubDetail[]) => {
  return contents.reduce((arr: BizAccountSubDetail[], cur: BizAccountSub) => {
    const {
      bizAccountSubId,
      bizAccountSubName,
      projectId,
      projectName,
      productId,
      productName,
      productOptionName,
      contractStartDate,
      contractEndDate,
      billingStartDate,
      status,
    } = cur;
    const item = {
      bizAccountSubId,
      bizAccountSubName,
      projects: [
        {
          projectId,
          projectName,
          products: [
            {
              productId,
              productName,
              productOptionName,
              contractStartDate,
              contractEndDate,
              billingStartDate,
              status,
            },
          ],
        },
      ],
    };
    if (!projectId) {
      item.projects = [];
    }
    // 배열에 bizAccountSubId가 있는지 확인
    if (arr.some((a: BizAccountSubDetail) => a.bizAccountSubId === bizAccountSubId)) {
      return arr.map((v: BizAccountSubDetail) => {
        const data = { ...v };
        if (data.bizAccountSubId === bizAccountSubId) {
          // projectId 확인
          const matchProject = data.projects.find(
            (v: BizAccountSubProject) => v.projectId === projectId
          );
          // 해당하는 projectId 가 있을때
          if (matchProject) {
            data.projects = data.projects.map((j: BizAccountSubProject) => {
              if (j.projectId === projectId) {
                j.products = j.products?.concat(item.projects[0].products);
              }
              return j;
            });
          } else {
            data.projects = data.projects.concat(item.projects);
          }
        }
        return data;
      });
    } else {
      return [...arr, item];
    }
  }, []);
};
