/* eslint-disable */
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import ArrowDownIcon from 'assets/icons/ArrowDownIcon';
import { useEffect, useState } from 'react';

const NestedLink = ({ route }: { route: RoutesType }) => {
  const navigate = useNavigate();
  const [isChildrenOpen, setIsChildrenOpen] = useState(false);
  const [pathToMaintain, setPathToMaintain] = useState('');
  const initialRoute = route.layout + '/' + route.path;

  const activeRoute = (routeName: string) => {
    return location.pathname.includes(routeName);
  };
  const isParentRouteActive = activeRoute(route.path);

  useEffect(() => {
    setPathToMaintain(location.pathname);
    if (!location.pathname.includes(route.path)) {
      setIsChildrenOpen(false);
    }
  }, [location.pathname]);

  return (
    <>
      <Link
        key={route.layout + route.path}
        to={isParentRouteActive ? pathToMaintain : initialRoute}
        onClick={() => {
          setIsChildrenOpen(!isChildrenOpen);
          if (isParentRouteActive) {
            const firstChildPath = route.children?.[0].path;
            if (firstChildPath) {
              const isFirstChildRouteActive = location.pathname.includes(firstChildPath);
              if (!isFirstChildRouteActive) {
                navigate(`/admin`);
              }
            }
          }
        }}
        className={`${isParentRouteActive && !isChildrenOpen ? 'mb-3' : ''} ${
          isParentRouteActive
            ? 'relative flex border-r-[5px] border-yellowPrimary bg-[linear-gradient(89.92deg,_#60088C_0.07%,_#A11E90_92.22%)] px-2 py-4 hover:cursor-pointer'
            : 'relative mb-3 flex px-2 py-4 hover:cursor-pointer'
        }`}
      >
        <div className="w-full">
          <div className="my-[3px] flex cursor-pointer items-center justify-between px-5">
            <div className="flex items-center">
              <span
                className={`${
                  isParentRouteActive ? 'font-bold text-white' : 'font-medium text-white'
                }`}
              >
                {route.icon ? route.icon : <ArrowDownIcon />}{' '}
              </span>
              <p
                className={`leading-1 ml-4 flex ${
                  isParentRouteActive ? 'font-semibold text-white' : 'font-normal text-white'
                }`}
              >
                {route.name}
              </p>
            </div>
            <div className="flex items-center">
              <span
                className={`${
                  isParentRouteActive ? 'font-bold text-white' : 'font-medium text-white'
                }`}
              >
                <ArrowDownIcon />
              </span>
            </div>
          </div>
          {isParentRouteActive ? (
            <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-purpleGradient" />
          ) : null}
        </div>
      </Link>
      {isChildrenOpen && isParentRouteActive && (
        <div className="slide-down mb-3 p-1">
          <div className="mb-3 flex flex-col items-start justify-center gap-y-2 bg-purpleSecondary px-6 pb-8 pt-4">
            {route.children?.map((childRoute: any) => {
              const isChildRouteActive = activeRoute(childRoute.path);

              return (
                <Link
                  key={childRoute.path}
                  to={route.layout + '/' + route.path + '/' + childRoute.path}
                  className={`${
                    isChildRouteActive ? 'bg-yellowPrimary text-black' : 'text-white'
                  } w-full rounded-md p-3 pl-6 hover:bg-yellowPrimary hover:text-black`}
                >
                  {childRoute.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export const SidebarLinks = (props: { routes: RoutesType[] }): JSX.Element => {
  let location = useLocation();

  const { routes } = props;

  const activeRoute = (routeName: string) => {
    return location.pathname.includes(routeName);
  };

  const createLinks = (routes: RoutesType[]) => {
    return routes.map((route) => {
      const isRouteValid = route.layout === '/admin' || route.layout === '/merchant';
      const isRouteActive = activeRoute(route.path);

      if (isRouteValid) {
        if (route.children && route.children.length > 0) {
          return (
            <>
              <NestedLink route={route} />
            </>
          );
        } else {
          return (
            <Link key={route.layout + route.path} to={route.layout + '/' + route.path}>
              <div
                className={`${
                  isRouteActive
                    ? 'relative mb-3 flex border-r-[5px] border-yellowPrimary bg-[linear-gradient(89.92deg,_#60088C_0.07%,_#A11E90_92.22%)] px-2 py-4 hover:cursor-pointer'
                    : 'relative mb-3 flex px-2 py-4 hover:cursor-pointer'
                }`}
              >
                <li className="my-[3px] flex cursor-pointer items-center px-5">
                  <span
                    className={`${
                      isRouteActive ? 'font-bold text-white' : 'font-medium text-white'
                    }`}
                  >
                    {route.icon ? route.icon : <ArrowDownIcon />}{' '}
                  </span>
                  <p
                    className={`leading-1 ml-4 flex ${
                      isRouteActive ? 'font-semibold text-white' : 'font-normal text-white'
                    }`}
                  >
                    {route.name}
                  </p>
                </li>
                {isRouteActive ? (
                  <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-purpleGradient" />
                ) : null}
              </div>
            </Link>
          );
        }
      }
    });
  };

  return <>{createLinks(routes)}</>;
};

export default SidebarLinks;
