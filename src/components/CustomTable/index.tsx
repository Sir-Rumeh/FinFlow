import { DataGrid, gridClasses } from '@mui/x-data-grid';
import TableLogo from 'assets/images/table_logo.png';
import { useEffect, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import 'assets/fonts/Gotham.css';
import ChevronLeft from 'assets/icons/ChevronLeft';
import ChevronRightIcon from 'assets/icons/ChevronRightIcon';

interface CustomTableProps {
  tableData: any;
  columns: any;
  rowCount: number;
}

function CustomTable({ tableData, columns, rowCount }: CustomTableProps): JSX.Element {
  const isSmallWidth = useMediaQuery('(max-width:1440px)');
  const [paginationData, setPaginationData] = useState({
    pageNumber: 1,
    pageSize: 10,
  });
  const [paginationCountArray, setPaginationCountArray] = useState<number[]>([]);
  const [paginationCount, setPaginationCount] = useState(0);
  const [paginationSplitPosition, setPaginationSplitPosition] = useState({
    x1: 0,
    x2: 5,
  });

  useEffect(() => {
    const pagiCount = Math.ceil(rowCount / 10);
    setPaginationCount(pagiCount);
    let arr = [];
    for (let i = 1; i <= pagiCount; i++) {
      arr.push(i);
    }
    const newArr = arr.splice(paginationSplitPosition.x1, paginationSplitPosition.x2);
    setPaginationCountArray(newArr);
  }, [rowCount, paginationSplitPosition]);

  return (
    <div className="slide-down w-full">
      {tableData?.length > 0 ? (
        <div className="w-full">
          <DataGrid
            rows={tableData}
            columns={columns}
            sx={{
              '& .MuiDataGrid-cell': {
                fontSize: isSmallWidth ? '12px' : '14px',
              },
              border: 0,
              [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: {
                outline: 'none',
              },
              [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
                {
                  outline: 'none',
                },
            }}
            rowHeight={70}
            columnHeaderHeight={70}
            disableRowSelectionOnClick
            disableColumnMenu
            pageSizeOptions={[10, 50, 100]}
            paginationModel={{ page: paginationData.pageNumber, pageSize: paginationData.pageSize }}
            paginationMode="server"
            rowCount={rowCount}
            hideFooterPagination
          />
          <div className="-mt-5 flex w-full items-center justify-start gap-x-5 p-3">
            <button
              onClick={() => {
                if (paginationSplitPosition.x1 > 0) {
                  setPaginationSplitPosition((prev) => {
                    return {
                      x1: (prev.x1 || 0) - 5,
                      x2: (prev.x2 || 0) - 5,
                    };
                  });
                }
              }}
              className="cursor-pointer"
            >
              <ChevronLeft />
            </button>
            <div className="no-scrollbar flex w-auto items-center justify-evenly gap-x-5 overflow-x-scroll">
              {paginationCountArray?.map((count: number) => {
                return (
                  <button
                    className={`flex cursor-pointer items-center rounded-sm border border-gray-300 ${paginationData.pageNumber === count ? 'bg-[#783593] text-white' : 'hover:bg-[#a772c4]'} px-3 py-[4px] text-center`}
                    onClick={() =>
                      setPaginationData((prev) => {
                        return {
                          ...prev,
                          pageSize: 10,
                          pageNumber: count,
                        };
                      })
                    }
                  >
                    {count}
                  </button>
                );
              })}
            </div>

            {paginationCountArray[paginationCountArray?.length - 1] !== paginationCount && (
              <div className="relative flex items-center justify-evenly gap-x-5">
                <span className="flex h-full items-end text-2xl">...</span>
                <button
                  className={`flex cursor-pointer items-center rounded-sm border border-gray-300 ${paginationData.pageNumber === paginationCount ? 'bg-[#783593] text-white' : 'hover:bg-[#a772c4]'} px-3 py-[4px] text-center`}
                  onClick={() => {
                    setPaginationData((prev) => {
                      return {
                        ...prev,
                        pageNumber: paginationCount,
                      };
                    });
                    setPaginationSplitPosition((prev) => {
                      return {
                        x1: paginationCount - 5,
                        x2: 5,
                      };
                    });
                  }}
                >
                  {paginationCount}
                </button>
              </div>
            )}

            <button
              className="cursor-pointer"
              onClick={() => {
                if (paginationData.pageNumber !== paginationSplitPosition.x2) {
                  setPaginationSplitPosition((prev) => {
                    return {
                      x1: (prev.x1 || 0) + 5,
                      x2: (prev.x2 || 0) + 5,
                    };
                  });
                }
              }}
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      ) : (
        <div className="slide-down mt-8 flex h-[30vh] flex-col items-center justify-center p-4 pb-8">
          <div>
            <img src={TableLogo} alt="group_logo" />
          </div>
          <div className="mt-8 text-center">
            <h3 className="text-2xl font-bold">Oops! No Active Data</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomTable;
