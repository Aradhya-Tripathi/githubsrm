import { useState } from "react";
import Link from "next/link";
import { ArrowIcon } from "../../utils/icons";

const JoinUs = () => {
  let [isContributor, setIsContributor] = useState<boolean>(true);

  const roles: {
    name: string;
    href: string;
    statement: string;
    description: string[];
    icon: JSX.Element;
    isContributor: boolean;
  }[] = [
    {
      name: "Contributor",
      href: "/join-us/contributor",
      statement: "mini desc",
      description: [
        "Regularly commit updates/changes to the project.",
        "Follow the code of conduct of contributing to the projects.",
        "Frequently update the documentation along with the code for the project.",
      ],
      icon: <ArrowIcon />,
      isContributor: true,
    },
    {
      name: "Maintainer",
      href: "/join-us/maintainer",
      statement: "mini desc",
      description: [
        "Maintain the workflow and the role assignment of all the contributors for the project.",
        "Maintain and manage all the Pull Requests for the projects.",
        "Keep an eye on following the rules for clean code for the projects.",
        "Work with the team to maintain proper documentation for the project.",
      ],
      icon: <ArrowIcon />,
      isContributor: false,
    },
  ];

  return (
    <div>
      <div className="font-medium">
        <h1 className="text-2xl md:text-4xl">There are 2</h1>
        <h2 className="md:text-xl md:mt-2">small text here</h2>
      </div>

      <div className="flex flex-col md:flex-row justify-evenly mt-8">
        <div className="w-full md:w-4/12 flex flex-col sm:flex-row md:flex-col items-center justify-start">
          {roles.map((role) => (
            <div key={role.name} className="flex mx-2 w-full">
              <div
                onClick={() => setIsContributor(role.isContributor)}
                className={`${
                  isContributor === role.isContributor
                    ? "border-base-green"
                    : "md:border-transparent"
                } border-b-4 md:border-b-0 md:border-r-4 w-full cursor-pointer py-4 flex items-center justify-between transform hover:md:-translate-x-4`}
              >
                <div>
                  <h3
                    className={`${
                      isContributor === role.isContributor ? "font-medium" : ""
                    } text-xl mb-2`}
                  >
                    {role.name}
                  </h3>
                  <p className="text-sm w-full">{role.statement}</p>
                </div>

                <div className="mx-4">
                  <span
                    className={`${
                      isContributor === role.isContributor
                        ? "bg-base-green bg-opacity-80"
                        : "bg-base-smoke"
                    } w-12 hidden md:flex justify-center items-center p-2 rounded-full`}
                  >
                    {role.icon}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full md:px-8 mt-8 md:mt-0">
          <div className="p-2 md:p-8 bg-gray-100 border-t-8 rounded-sm border-base-green">
            {roles.map(
              (role) =>
                role.isContributor === isContributor && (
                  <div key={role.name}>
                    <h2 className="text-2xl md:text-4xl mb-4">
                      Your Job as a <strong>{role.name}</strong>
                    </h2>
                    <ul className="list-disc">
                      {role.description.map((desc) => (
                        <li>{desc}</li>
                      ))}
                    </ul>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 items-center justify-center mt-10">
                      <span className="hidden lg:block" />
                      <span />
                      <Link href={role.href}>
                        <a className="text-white bg-base-green py-3 font-semibold rounded-lg text-center">
                          Apply Now!
                        </a>
                      </Link>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
