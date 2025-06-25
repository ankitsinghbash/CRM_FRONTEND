import React, { useState } from 'react';

const DatabaseMain = ({theme}) => {
  // Dummy data structure
  const processData = [
    {
      id: 1,
      name: 'Customer Support',
      phs: [
        {
          id: 101,
          name: 'John Smith',
          tls: [
            {
              id: 1001,
              name: 'Sarah Johnson',
              agents: [
                { id: 10001, name: 'Alex Brown', email: 'alex@company.com', performance: 92 },
                { id: 10002, name: 'Maria Garcia', email: 'maria@company.com', performance: 88 },
                { id: 10003, name: 'James Wilson', email: 'james@company.com', performance: 95 },
              ]
            },
            {
              id: 1002,
              name: 'Michael Chen',
              agents: [
                { id: 10004, name: 'Emily Davis', email: 'emily@company.com', performance: 87 },
                { id: 10005, name: 'David Miller', email: 'david@company.com', performance: 91 },
              ]
            }
          ]
        },
        {
          id: 102,
          name: 'Emma Thompson',
          tls: [
            {
              id: 1003,
              name: 'Robert Lee',
              agents: [
                { id: 10006, name: 'Olivia Taylor', email: 'olivia@company.com', performance: 90 },
                { id: 10007, name: 'William Anderson', email: 'william@company.com', performance: 84 },
                { id: 10008, name: 'Sophia Martinez', email: 'sophia@company.com', performance: 89 },
              ]
            }
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'Technical Support',
      phs: [
        {
          id: 201,
          name: 'Daniel Kim',
          tls: [
            {
              id: 2001,
              name: 'Jennifer Park',
              agents: [
                { id: 20001, name: 'Ethan Brown', email: 'ethan@company.com', performance: 85 },
                { id: 20002, name: 'Ava Johnson', email: 'ava@company.com', performance: 93 },
              ]
            },
            {
              id: 2002,
              name: 'Kevin Patel',
              agents: [
                { id: 20003, name: 'Mia Williams', email: 'mia@company.com', performance: 89 },
                { id: 20004, name: 'Noah Davis', email: 'noah@company.com', performance: 87 },
                { id: 20005, name: 'Isabella Moore', email: 'isabella@company.com', performance: 91 },
              ]
            }
          ]
        }
      ]
    },
    {
      id: 3,
      name: 'Sales Process',
      phs: [
        {
          id: 301,
          name: 'Rachel Adams',
          tls: [
            {
              id: 3001,
              name: 'Thomas Clark',
              agents: [
                { id: 30001, name: 'Charlotte Rodriguez', email: 'charlotte@company.com', performance: 94 },
                { id: 30002, name: 'Liam Lewis', email: 'liam@company.com', performance: 86 },
              ]
            }
          ]
        }
      ]
    }
  ];

  // State management
  const [selectedProcess, setSelectedProcess] = useState(null);
  const [selectedPH, setSelectedPH] = useState(null);
  const [selectedTL, setSelectedTL] = useState(null);
  const [agents, setAgents] = useState([]);

  // Handler functions
  const handleProcessChange = (e) => {
    const processId = parseInt(e.target.value);
    const process = processData.find(p => p.id === processId);
    setSelectedProcess(process);
    setSelectedPH(null);
    setSelectedTL(null);
    setAgents([]);
  };

  const handlePHChange = (e) => {
    const phId = parseInt(e.target.value);
    const ph = selectedProcess.phs.find(p => p.id === phId);
    setSelectedPH(ph);
    setSelectedTL(null);
    setAgents([]);
  };

  const handleTLChange = (e) => {
    const tlId = parseInt(e.target.value);
    const tl = selectedPH.tls.find(t => t.id === tlId);
    setSelectedTL(tl);
    setAgents(tl.agents);
  };

  // Reset selections
  const resetSelections = () => {
    setSelectedProcess(null);
    setSelectedPH(null);
    setSelectedTL(null);
    setAgents([]);
  };

  return (
     <div className={`${theme} h-screen overflow-y-auto overflow-x-hidden p-6`}>
      <div className="w-full mx-auto">
        <header className="text-center py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Organizational Hierarchy Dashboard
          </h1>
          <p className="text-gray-600">
            Select a process to view its hierarchical structure
          </p>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Select Process */}
            <div className=" p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-blue-800 mb-3">
                Select Process
              </h2>
              <select
                className="w-full p-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                onChange={handleProcessChange}
                value={selectedProcess?.id || ""}
              >
                <option value="">Choose a process</option>
                {processData.map((process) => (
                  <option key={process.id} value={process.id}>
                    {process.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Select PH */}
            <div
              className={`bg-indigo-50 p-4 rounded-lg transition-all duration-300 ${
                selectedProcess ? "opacity-100" : "opacity-50"
              }`}
            >
              <h2 className="text-lg font-semibold text-indigo-800 mb-3">
                Select Process Head
              </h2>
              <select
                className={`w-full p-3 rounded-lg border border-indigo-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                  !selectedProcess ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
                onChange={handlePHChange}
                value={selectedPH?.id || ""}
                disabled={!selectedProcess}
              >
                <option value="">Choose a PH</option>
                {selectedProcess?.phs?.map((ph) => (
                  <option key={ph.id} value={ph.id}>
                    {ph.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Select TL */}
            <div
              className={`bg-purple-50 p-4 rounded-lg transition-all duration-300 ${
                selectedPH ? "opacity-100" : "opacity-50"
              }`}
            >
              <h2 className="text-lg font-semibold text-purple-800 mb-3">
                Select Team Lead
              </h2>
              <select
                className={`w-full p-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-500 focus:outline-none ${
                  !selectedPH ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
                onChange={handleTLChange}
                value={selectedTL?.id || ""}
                disabled={!selectedPH}
              >
                <option value="">Choose a TL</option>
                {selectedPH?.tls?.map((tl) => (
                  <option key={tl.id} value={tl.id}>
                    {tl.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={resetSelections}
              className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Reset Selections
            </button>
          </div>
        </div>

        {/* Agent Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-5 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">
              {agents.length > 0
                ? `${agents.length} Agents under ${selectedTL?.name}`
                : "No agents selected"}
            </h2>
            <p className="text-gray-600">
              {agents.length > 0
                ? `Team Lead: ${selectedTL?.name} | PH: ${selectedPH?.name} | Process: ${selectedProcess?.name}`
                : "Please select a Team Lead to view agents"}
            </p>
          </div>

          {agents.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Agent Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Performance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {agents.map((agent) => (
                    <tr key={agent.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {agent.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="bg-indigo-100 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                            <span className="text-indigo-800 font-medium">
                              {agent.name.charAt(0)}
                            </span>
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            {agent.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {agent.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-24 bg-gray-200 rounded-full h-2.5 mr-2">
                            <div
                              className={`h-2.5 rounded-full ${
                                agent.performance >= 90
                                  ? "bg-green-500"
                                  : agent.performance >= 85
                                  ? "bg-blue-500"
                                  : "bg-yellow-500"
                              }`}
                              style={{
                                width: `${agent.performance}%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            {agent.performance}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            agent.performance >= 90
                              ? "bg-green-100 text-green-800"
                              : agent.performance >= 85
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {agent.performance >= 90
                            ? "Excellent"
                            : agent.performance >= 85
                            ? "Good"
                            : "Average"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24 mx-auto opacity-30"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-500 mb-2">
                No agents to display
              </h3>
              <p className="text-gray-400">
                Please select a Process, Process Head, and Team Lead to view
                agents
              </p>
            </div>
          )}
        </div>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>© 2023 Organizational Hierarchy Dashboard. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default DatabaseMain;