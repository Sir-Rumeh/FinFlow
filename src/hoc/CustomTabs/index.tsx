import ButtonComponent from 'components/FormElements/Button';
import { Dispatch } from 'react';
import { TabsListTabNames, TransactionsTabsListTabNames } from 'utils/enums';
import { TabsProps } from 'utils/interfaces';

interface CustomTabProps {
  tabs: TabsProps[];
  activeTab: string;
  width?: string;
  setActiveTab: Dispatch<
    React.SetStateAction<TabsListTabNames | TransactionsTabsListTabNames | any>
  >;
  backgroundColor?: string;
  showTabTotal?: boolean;
  performExtraAction?: () => void;
}

const CustomTabs = ({
  tabs,
  activeTab,
  setActiveTab,
  width,
  backgroundColor,
  showTabTotal = true,
  performExtraAction,
}: CustomTabProps) => {
  return (
    <>
      {tabs?.map((tab, index) => {
        return (
          <div
            className={`relative flex ${width ? width : 'w-[6rem] sm:w-[9rem]'} flex-col items-start justify-between`}
            key={index}
          >
            <ButtonComponent
              onClick={() => {
                if (!(activeTab === tab.tabName)) {
                  performExtraAction?.();
                  setActiveTab(tab.tabName);
                }
              }}
              textSize={40}
            >
              <span
                className={`flex w-full items-center justify-start gap-2 py-3 text-base ${activeTab === tab.tabName ? 'text-[#5C068C]' : 'text-blackInput'}`}
              >
                <span className={`flex items-center font-semibold`}>
                  {tab.tabName === TabsListTabNames.Declined ? 'Rejected' : tab.tabName}
                </span>
                {showTabTotal && (
                  <span className="rounded-2xl border border-purpleSecondary bg-purple-100 px-2">
                    {tab.tabTotal ? tab.tabTotal : 0}
                  </span>
                )}
              </span>
            </ButtonComponent>
            <div
              className={`mt-[0px] ${showTabTotal ? 'w-[90%]' : 'w-full'} ${activeTab === tab.tabName ? 'border-b-2 border-purplePrimary' : ''}`}
            ></div>
          </div>
        );
      })}
    </>
  );
};

export default CustomTabs;
