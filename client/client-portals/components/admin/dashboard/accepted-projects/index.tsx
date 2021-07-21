import React, { useState, useEffect } from "react";
import { getAcceptedProjects } from "services/api";
import {
  Card,
  PaginationButtons,
  CSSLoader,
  Layout,
  Footer,
} from "@/shared/index";

const AcceptedProjectDashboard = () => {
  const [acceptedProjects, setAcceptedProjects] = useState([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [hasNextPage, sethasNextPage] = useState<boolean>(false);
  const [hasPrevPage, sethasPrevPage] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const _getAcceptedProjects = async () => {
    const token = sessionStorage.getItem("token");
    const res = await getAcceptedProjects(pageNo, token);
    if (res) {
      setAcceptedProjects(res.records);
      sethasNextPage(res.hasNextPage);
      sethasPrevPage(res.hasPreviousPage);
      setLoading(false);
    }
  };

  useEffect(() => {
    _getAcceptedProjects();
  }, [pageNo]);
  return (
    <>
      <Layout type="admin">
        {loading ? (
          <div className="flex flex-col items-center justify-center">
            <CSSLoader />
          </div>
        ) : (
          <div>
            {acceptedProjects?.length > 0 ? (
              <h1 className="text-center text-4xl mt-5 mb-10 font-extrabold text-white">
                All Accepted Projects
              </h1>
            ) : (
              <h1 className="text-center text-4xl mt-5 mb-10 font-extrabold text-white">
                No Accepted Projects Yet!
              </h1>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 ">
              {acceptedProjects?.map((item) => (
                <Card
                  url={`/admin/dashboard/accepted-projects/${item._id}`}
                  name={item.project_name}
                  desc={item.description}
                  key={item._id}
                />
              ))}
            </div>
            {acceptedProjects?.length > 0 && (
              <PaginationButtons
                hasNextPage={hasNextPage}
                hasPrevPage={hasPrevPage}
                pageNo={pageNo}
                setPageNo={setPageNo}
              />
            )}
          </div>
        )}
      </Layout>
      <div className="fixed bottom-0 w-full">
        <Footer />
      </div>
    </>
  );
};

export default AcceptedProjectDashboard;
