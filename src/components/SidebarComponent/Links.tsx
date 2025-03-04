/* eslint-disable */
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import ArrowDownIcon from 'assets/icons/ArrowDownIcon';
import { useEffect, useState } from 'react';
import { decodeToken, getUserFromLocalStorage, hasAccessToModule } from 'utils/helpers';

const NestedLink = ({
  route,
  closeSidebar,
}: {
  route: RoutesType;
  closeSidebar: React.MouseEventHandler<HTMLAnchorElement>;
}) => {
  const navigate = useNavigate();
  const [isChildrenOpen, setIsChildrenOpen] = useState(false);

  const activeRoute = (routeName: string, stringPosition: number) => {
    const pathSegments = location.pathname.split('/');
    const adminIndex = pathSegments.indexOf('admin');
    const merchantIndex = pathSegments.indexOf('merchant');

    if (adminIndex !== -1 && pathSegments.length > adminIndex + stringPosition) {
      return pathSegments[adminIndex + stringPosition] === routeName;
    } else if (
      adminIndex === -1 &&
      merchantIndex !== -1 &&
      pathSegments.length > merchantIndex + stringPosition
    ) {
      return pathSegments[merchantIndex + stringPosition] === routeName;
    }
    return false;
  };
  const isParentRouteActive = activeRoute(route.path, 1);

  useEffect(() => {
    if (!location.pathname.includes(route.path)) {
      setIsChildrenOpen(false);
    }
  }, [location.pathname]);

  return (
    <div key={route.layout + route.path} className="">
      <div
        key={route.layout + route.path}
        onClick={() => {
          setIsChildrenOpen(!isChildrenOpen);
        }}
        className={`flex px-2 py-3 ${isChildrenOpen ? '' : 'mb-3'} ${
          isParentRouteActive
            ? 'fade-in-right relative border-r-[5px] border-yellowPrimary bg-[linear-gradient(89.92deg,_#60088C_0.07%,_#A11E90_92.22%)] hover:cursor-pointer'
            : 'relative hover:cursor-pointer hover:bg-[#69397a]'
        }`}
      >
        <div className="w-full">
          <div className="my-[3px] flex cursor-pointer items-center justify-between px-3 2xl:px-6">
            <div className="flex items-center">
              <span
                className={`${
                  isParentRouteActive ? 'font-bold text-white' : 'font-medium text-white'
                }`}
              >
                {route.icon ? route.icon : <ArrowDownIcon />}{' '}
              </span>
              <p
                className={`leading-1 ml-4 flex text-sm 3xl:text-base ${
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
      </div>
      {isChildrenOpen && (
        <div className="fade-in-down mb-3 p-1">
          <div className="mb-3 flex flex-col items-start justify-center gap-y-1 bg-purpleSecondary px-3 pb-4 pt-2 2xl:px-6">
            {route.children?.map((childRoute: any) => {
              const isChildRouteActive = activeRoute(childRoute.path.replace('/*', ''), 2);
              const linkTo = `${route.layout}/${route.path}/${childRoute.path.replace('/*', '')}`;
              return (
                <Link
                  key={childRoute.path}
                  to={linkTo}
                  onClick={(e) => {
                    window.innerWidth < 1200 && closeSidebar(e);
                  }}
                  className={`${
                    isChildRouteActive
                      ? 'slide-right blur:none bg-yellowPrimary font-semibold text-black opacity-[100%]'
                      : 'text-white'
                  } w-full rounded-md px-3 py-2 pl-6 opacity-[100%] hover:bg-yellowPrimary hover:text-black`}
                >
                  <p className="z-[999] text-sm 3xl:text-base">{childRoute.name}</p>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export const SidebarLinks = (props: {
  routes: RoutesType[];
  closeSidebar: React.MouseEventHandler<HTMLAnchorElement>;
}): JSX.Element => {
  let location = useLocation();

  const { routes, closeSidebar } = props;

  const activeRoute = (routeName: string, stringPosition: number) => {
    const pathSegments = location.pathname.split('/');
    const adminIndex = pathSegments.indexOf('admin');
    const merchantIndex = pathSegments.indexOf('merchant');

    if (adminIndex !== -1 && pathSegments.length > adminIndex + stringPosition) {
      return pathSegments[adminIndex + stringPosition] === routeName;
    } else if (
      adminIndex === -1 &&
      merchantIndex !== -1 &&
      pathSegments.length > merchantIndex + stringPosition
    ) {
      return pathSegments[merchantIndex + stringPosition] === routeName;
    }
    return false;
  };

  const createLinks = (routes: RoutesType[]) => {
    return routes.map((route) => {
      const isRouteValid = route.layout === '/admin' || route.layout === '/merchant';
      const isRouteActive = activeRoute(route.path, 1);
      const user = getUserFromLocalStorage();
      const userDetails = decodeToken(user?.token);
      const isAccessAllowed = hasAccessToModule(userDetails?.permission, route.moduleValue);
      if (isRouteValid && isAccessAllowed) {
        const conditionToShowNestedLinks =
          route.willChildLinkShow && route.children && route.children.length > 0;
        if (conditionToShowNestedLinks) {
          return (
            <NestedLink
              route={route}
              key={route.layout + route.path + 'nested'}
              closeSidebar={closeSidebar}
            />
          );
        } else {
          return (
            <Link
              key={route.layout + route.path}
              to={route.layout + '/' + route.path}
              onClick={(e) => {
                window.innerWidth < 1200 && closeSidebar(e);
              }}
            >
              <div
                className={`mb-3 flex px-2 py-3 ${
                  isRouteActive
                    ? 'fade-in-right relative border-r-[5px] border-yellowPrimary bg-[linear-gradient(89.92deg,_#60088C_0.07%,_#A11E90_92.22%)] hover:cursor-pointer'
                    : 'relative hover:cursor-pointer hover:bg-[#69397a]'
                }`}
              >
                <li className="my-[3px] flex cursor-pointer items-center px-3 2xl:px-6">
                  <span
                    className={`${
                      isRouteActive ? 'font-bold text-white' : 'font-medium text-white'
                    }`}
                  >
                    {route.icon ? route.icon : <ArrowDownIcon />}{' '}
                  </span>
                  <p
                    className={`leading-1 ml-4 flex text-sm 3xl:text-base ${
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
