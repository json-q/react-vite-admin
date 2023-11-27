import { layoutRouters } from '@/routers';
import { Breadcrumb } from 'antd';
import { useEffect, useState } from 'react';
import { matchRoutes, useLocation } from 'react-router-dom';

interface MatchRoute {
  route: {
    path: string;
    name: string;
    icon?: React.ReactNode;
  };
}

const HeaderBreadcrumb: React.FC = () => {
  const { pathname } = useLocation();
  const [breadcrumb, setBreadcrumb] = useState<{ title?: React.ReactNode }[]>([]);

  const generateBreadCrumb = (matched: MatchRoute[] = []) => {
    const crumb = [];
    for (let i = 1; i < matched.length; i++) {
      const data = matched[i].route;
      const crumbItem = {
        title: (
          <>
            {data?.icon}
            <span>{data.name}</span>
          </>
        ),
      };
      crumb.push(crumbItem);
    }
    setBreadcrumb(crumb);
  };

  useEffect(() => {
    const matched = matchRoutes(layoutRouters, pathname);
    generateBreadCrumb(matched as MatchRoute[]);
  }, [pathname]);

  return <Breadcrumb items={breadcrumb} />;
};

export default HeaderBreadcrumb;
