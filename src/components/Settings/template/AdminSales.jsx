import { useAppContext } from "../../../AppContext";
import Table from "../../../ui-components/AdminSales/Table";
const AdminSales = () => {
  const { adminSales } = useAppContext();
  return (
    <>
      <div class="w-full lg:w-1/2 px-4">
        <div class="bg-white border-t border-b sm:rounded sm:border shadow">
          <div class="border-b">
            <div class="flex justify-between px-6 -mb-px">
              <h3 class="text-blue-dark py-4 font-normal text-lg">
                Your sales
              </h3>
            </div>
          </div>
          <div>
            <div class="text-center">
              <div class="h-64 overflow-y-scroll">
                {adminSales && adminSales.length === 0 && (
                  <>
                    <div class="mb-4 py-8 px-6">
                      <svg
                        class="inline-block fill-current text-grey h-16 w-16"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M11.933 13.069s7.059-5.094 6.276-10.924a.465.465 0 0 0-.112-.268.436.436 0 0 0-.263-.115C12.137.961 7.16 8.184 7.16 8.184c-4.318-.517-4.004.344-5.974 5.076-.377.902.234 1.213.904.959l2.148-.811 2.59 2.648-.793 2.199c-.248.686.055 1.311.938.926 4.624-2.016 5.466-1.694 4.96-6.112zm1.009-5.916a1.594 1.594 0 0 1 0-2.217 1.509 1.509 0 0 1 2.166 0 1.594 1.594 0 0 1 0 2.217 1.509 1.509 0 0 1-2.166 0z" />
                      </svg>
                    </div>
                    <p class="text-2xl text-grey-darker font-medium mb-4">
                      No sells yet
                    </p>
                  </>
                )}
                {adminSales && adminSales.length > 0 && (
                  <>
                    <Table />
                  </>
                )}

                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminSales;
