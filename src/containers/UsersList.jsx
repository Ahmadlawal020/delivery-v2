// import { UserCard } from "../components";
// import { useGetUsersQuery } from "../services/api/userApiSlice";

// const UsersList = () => {
//   const {
//     data: users,
//     isLoading,
//     isSuccess,
//     isError,
//     error,
//   } = useGetUsersQuery();
//   console.log(users);

//   let content; // Initialize content

//   if (isLoading) {
//     content = <h1>Loading ....</h1>;
//   } else if (isError) {
//     content = <p className="errmsg">{error?.data?.message}</p>;
//   } else if (isSuccess) {
//     const { ids } = users; // Ensure ids is always an array

//     const tableContent = ids.map((userId) => {
//       return <UserCard key={userId} userId={userId} />;
//     });

//     content = (
//       <table className="table table--notes">
//         <thead className="table__thead">
//           <tr>
//             <th scope="col" className="table__th user__username">
//               Username
//             </th>
//             <th scope="col" className="table__th user__roles">
//               Roles
//             </th>
//             <th scope="col" className="table__th user__edit">
//               Edit
//             </th>
//           </tr>
//         </thead>
//         <tbody>{tableContent}</tbody>
//       </table>
//     );
//   }

//   return content;
// };

// export default UsersList;

import { UserCard } from "../components";
import { useGetUsersQuery } from "../services/api/userApiSlice";

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery(null, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) {
    content = <h1 className="text-center text-lg font-semibold">Loading...</h1>;
  } else if (isError) {
    content = (
      <p className="text-red-500 text-center mt-4">
        {error?.data?.message || "An error occurred"}
      </p>
    );
  } else if (isSuccess) {
    const { ids } = users;

    content = ids.length ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ids.map((userId) => (
          <UserCard key={userId} userId={userId} />
        ))}
      </div>
    ) : (
      <p className="text-center py-4 text-gray-500">No users found</p>
    );
  }

  return <div className="p-4">{content}</div>;
};

export default UsersList;
