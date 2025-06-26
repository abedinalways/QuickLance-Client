import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import CountUp from 'react-countup';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../Context/AuthContext';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  // Fetch total tasks count
  const { data: totalTasks = 0, isLoading: totalTasksLoading } = useQuery({
    queryKey: ['totalTasks'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3000/tasks/count', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) throw new Error('Failed to fetch total tasks');
      const data = await res.json();
      return data.count;
    },
  });

  // Fetch user's applied tasks count (bids count)
  const { data: appliedTasks = 0, isLoading: appliedTasksLoading } = useQuery({
    queryKey: ['appliedTasks', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const token = await user.getIdToken();
      const res = await fetch(
        `http://localhost:3000/bids/count?email=${user.email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (!res.ok) throw new Error('Failed to fetch applied tasks count');
      const data = await res.json();
      return data.count;
    },
  });

  // Fetch all tasks for the "Total Jobs Data" table
  const { data: allTasks = [], isLoading: allTasksLoading } = useQuery({
    queryKey: ['allTasks'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3000/allTasks', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) throw new Error('Failed to fetch all tasks');
      return res.json();
    },
  });

  // Fetch user's bids with task details for the "User's Bids" table
  const { data: userBids = [], isLoading: userBidsLoading } = useQuery({
    queryKey: ['userBids', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const token = await user.getIdToken();
      const res = await fetch(
        `http://localhost:3000/bids?userEmail=${user.email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (!res.ok) throw new Error('Failed to fetch user bids');
      return res.json();
    },
  });

  // Columns for Total Jobs Data table
  const allTasksColumns = [
    { accessorKey: 'task', header: 'Task' },
    { accessorKey: 'category', header: 'Category' },
    { accessorKey: 'budget', header: 'Budget' },
    { accessorKey: 'description', header: 'Description' },
  ];

  // Columns for User's Bids table
  const userBidsColumns = [
    { accessorKey: 'task', header: 'Task' },
    { accessorKey: 'deadline', header: 'Deadline' },
    { accessorKey: 'budget', header: 'Budget' },
  ];

  // TanStack Table instances
  const allTasksTable = useReactTable({
    data: allTasks,
    columns: allTasksColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const userBidsTable = useReactTable({
    data: userBids,
    columns: userBidsColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4 font-[Suse] min-h-screen bg-gradient-to-br from-lime-100 via-emerald-100 to-teal-100 rounded-xl">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <h1 className="text-3xl font-bold mb-6 text-center text-emerald-700">
        Dashboard
      </h1>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="card bg-blue-100 shadow-lg p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-blue-800">Total Tasks</h2>
          {totalTasksLoading ? (
            <span className="loading loading-spinner text-blue-500"></span>
          ) : (
            <CountUp
              end={totalTasks}
              duration={10}
              className="text-4xl font-bold text-blue-600"
            />
          )}
        </div>
        <div className="card bg-green-100 shadow-lg p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-green-800">
            My Applied Tasks
          </h2>
          {appliedTasksLoading ? (
            <span className="loading loading-spinner text-green-500"></span>
          ) : (
            <CountUp
              end={appliedTasks}
              duration={7}
              className="text-4xl font-bold text-green-600"
            />
          )}
        </div>
      </div>

      {/* Tables Section */}
      <div className="space-y-12">
        {/* Total Jobs Data Table */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">
            All Task Data
          </h2>
          {allTasksLoading ? (
            <span className="loading loading-spinner text-blue-500"></span>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full shadow-lg rounded-lg bg-white">
                <thead className="bg-gray-100 text-blue-800">
                  {allTasksTable.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <th key={header.id} className="p-3">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {allTasksTable.getRowModel().rows.map(row => (
                    <tr key={row.id} className="hover:bg-gray-50 text-purple-800">
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id} className="p-3">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* User's Bids Table */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-green-800">
            My Bids
          </h2>
          {userBidsLoading ? (
            <span className="loading loading-spinner text-green-500"></span>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full shadow-lg rounded-lg bg-white">
                <thead className="bg-gray-100 text-green-800">
                  {userBidsTable.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <th key={header.id} className="p-3">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {userBidsTable.getRowModel().rows.map(row => (
                    <tr key={row.id} className="hover:bg-gray-50 text-blue-600">
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id} className="p-3">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
